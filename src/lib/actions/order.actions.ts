"use server";

import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItem, PaymentResult, DeliveryAddress } from "@/types";
import { paypal } from "../paypal";
import { revalidatePath } from "next/cache";
// import { sendPurchaseReceipt } from '@/email';
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { TAXRATE } from "../constants";
import { round2 } from "../utils";

// Calculate order prices
const calcPrice = async (items: CartItem[], delivery: boolean, tip: number) => {
  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: {
      id: true,
      price: true,
      name: true,
      slug: true,
      image: true,
    },
  });
  let totalItemsPrice = 0;
  const productMap: Record<string, (typeof products)[0]> = {};
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      const price = Number(product.price);
      totalItemsPrice += price * item.qty;
      productMap[item.productId] = product;
    }
  }
  const subtotal = round2(totalItemsPrice);
  const deliveryFee = round2(subtotal > 100 ? 0 : 5.99);
  const tax = round2(TAXRATE * subtotal);
  const totalPrice = delivery
    ? round2(subtotal + tax + deliveryFee + tip)
    : round2(subtotal + tax + tip);
  return {
    productMap,
    subtotal: subtotal.toFixed(2),
    deliveryFee: deliveryFee.toFixed(2),
    tax: tax.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

// Create order and create the order items
export async function createOrder() {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not authenticated");
    const cart = await getMyCart();
    const userId = session?.user?.id;
    if (!userId) throw new Error("User not found");
    const user = await getUserById();
    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
        redirectTo: "/cart",
      };
    }
    const delivery = false;
    const tip = 5;
    // if (!user.address) {
    //   return {
    //     success: false,
    //     message: 'No shipping address',
    //     redirectTo: '/shipping-address',
    //   };    }
    // if (!user.paymentInfo) {
    //   return {
    //     success: false,
    //     message: 'No payment method',
    //     redirectTo: '/payment-method',
    //   };
    // }
    const prices = await calcPrice(cart.items, delivery, tip);
    const order = insertOrderSchema.parse({
      userId: user.id,
      deliveryAddress: user.address,
      paymentMethod: user.paymentInfo,
      subtotal: prices.subtotal,
      deliveryFee: prices.deliveryFee,
      tax: prices.tax,
      totalPrice: prices.totalPrice,
    });
    // Create a transaction to create order and order items in database
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      const insertedOrder = await tx.order.create({ data: order });
      for (const item of cart.items as CartItem[]) {
        const productDetail = prices.productMap[item.productId];
        await tx.orderItem.create({
          data: {
            ...item,
            price: productDetail.price,
            name: productDetail.name,
            slug: productDetail.slug,
            image: productDetail.image,
            orderId: insertedOrder.id,
          },
        });
      }
      // Clear cart
      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
      return insertedOrder.id;
    });
    if (!insertedOrderId) throw new Error("Order not created");
    return {
      success: true,
      message: "Order created",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: formatError(error, "") };
  }
}

// Get order by id
export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderItems: true,
      user: { select: { name: true, email: true } },
    },
  });
  return convertToPlainObject(data);
}

export async function createPayPalOrder(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });
    if (order) {
      const paypalOrder = await paypal.createOrder(Number(order.totalPrice));
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentResult: {
            id: paypalOrder.id,
            email_address: "",
            status: "",
            pricePaid: 0,
          },
        },
      });
      return {
        success: true,
        message: "Item order created successfully",
        data: paypalOrder.id,
      };
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    return { success: false, message: formatError(error, "") };
  }
}

// Approve paypal order and update order to paid
export async function approvePayPalOrder(
  orderId: string,
  data: { orderID: string },
) {
  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });
    if (!order) throw new Error("Order not found");
    const captureData = await paypal.capturePayment(data.orderID);
    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResult)?.id ||
      captureData.status !== "COMPLETED"
    ) {
      throw new Error("Error in PayPal payment");
    }
    // Update order to paid
    await updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
        pricePaid:
          captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
      },
    });
    revalidatePath(`/order/${orderId}`);
    return {
      success: true,
      message: "Your order has been paid",
    };
  } catch (error) {
    return { success: false, message: formatError(error, "") };
  }
}

// Update order to paid
export async function updateOrderToPaid({
  orderId,
  paymentResult,
}: {
  orderId: string;
  paymentResult?: PaymentResult;
}) {
  const order = await prisma.order.findFirst({
    where: { id: orderId },
    include: { orderItems: true },
  });
  if (!order) throw new Error("Order not found");
  if (order.isPaid) throw new Error("Order is already paid");
  // Update order
  await prisma.order.update({
    where: { id: orderId },
    data: {
      isPaid: true,
      paidAt: new Date(),
      paymentResult,
    },
  });
  // Get updated order after transaction
  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderItems: true,
      user: { select: { name: true, email: true } },
    },
  });
  if (!updatedOrder) throw new Error("Order not found");
  // sendPurchaseReceipt({
  //   order: {
  //     ...updatedOrder,
  //     DeliveryAddress: updatedOrder.DeliveryAddress as DeliveryAddress,
  //     paymentResult: updatedOrder.paymentResult as PaymentResult,
  //   },
  // });
}
