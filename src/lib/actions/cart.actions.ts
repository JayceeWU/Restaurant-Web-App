"use server";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { TAXRATE } from "../constants";
import { revalidatePath } from "next/cache";

export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
    const cart = await getMyCart();
    const item = cartItemSchema.parse(data);
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error("Product not found");
    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
      });
      await prisma.cart.create({
        data: newCart,
      });
      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    } else {
      const items = cart.items as CartItem[];
      const existItem = items.find((x) => x.productId === item.productId);
      if (existItem) {
        existItem.qty = existItem.qty + 1;
      } else {
        items.push(item);
      }
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: items,
        },
      });
      revalidatePath(`/order/menu`);
      revalidatePath(`/order/checkout`);
      return {
        success: true,
        message: `${product.name} ${
          existItem ? "updated in" : "added to"
        } cart`,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: formatError(error, ""),
    };
  }
}

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");
    let items = cart.items as CartItem[];
    const existItem = items.find((x) => x.productId === productId);
    if (!existItem) throw new Error("Item not found");
    if (existItem.qty === 1) {
      items = items.filter((x) => x.productId !== productId);
    } else {
      existItem.qty = existItem.qty - 1;
    }
    await prisma.cart.update({
      where: { id: cart.id },
      data: { items: items },
    });
    revalidatePath(`/order/menu`);
    revalidatePath(`/order/checkout`);
    return {
      success: true,
      message: `${product.name} was removed from cart`,
    };
  } catch (error) {
    return { success: false, message: formatError(error, "") };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });
  if (!cart) return undefined;
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
  });
}

// Calculate checkout prices
const checkoutPrice = async (
  items: CartItem[],
  delivery: boolean,
  tip: number,
) => {
  let totalItemsPrice = 0;
  for (const item of items) {
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
      select: { price: true },
    });
    if (product) {
      const price = Number(product.price);
      totalItemsPrice += price * item.qty;
    }
  }
  const subtotal = round2(totalItemsPrice);
  const deliveryFee = round2(subtotal > 100 ? 0 : 5.99);
  const tax = round2(TAXRATE * subtotal);
  const totalPrice = delivery
    ? round2(subtotal + tax + deliveryFee + tip)
    : round2(subtotal + tax + tip);
  return {
    subtotal: subtotal.toFixed(2),
    deliveryFee: deliveryFee.toFixed(2),
    tax: tax.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};
