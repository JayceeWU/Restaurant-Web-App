"use server";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
    const product = await prisma.product.findFirst({
      where: { id: data.productId },
    });
    if (!product) throw new Error("Product not found");
    const cart = await prisma.cart.findFirst({
      where: userId ? { userId } : { sessionCartId },
    });
    if (!cart) {
      await prisma.cart.create({
        data: {
          userId,
          sessionCartId,
          items: {
            create: {
              productId: data.productId,
              qty: 1,
            },
          },
        },
      });
    } else {
      await prisma.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: data.productId,
          },
        },
        update: { qty: { increment: 1 } },
        create: {
          cartId: cart.id,
          productId: data.productId,
          qty: 1,
        },
      });
    }
    revalidatePath(`/order/menu`);
    revalidatePath(`/order/checkout`);
    return {
      success: true,
      message: `${product.name} added to cart`,
    };
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
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");
    const existItem = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
      include: { product: true },
    });
    if (!existItem) throw new Error("Item not found");
    if (existItem.qty === 1) {
      await prisma.cartItem.delete({
        where: { id: existItem.id },
      });
    } else {
      await prisma.cartItem.update({
        where: { id: existItem.id },
        data: { qty: { decrement: 1 } },
      });
    }
    revalidatePath(`/order/menu`);
    revalidatePath(`/order/checkout`);
    return {
      success: true,
      message: `${existItem.product.name} removed from cart`,
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
    where: userId ? { userId } : { sessionCartId },
    include: { items: { include: { product: true } } },
  });
  if (!cart) return undefined;
  const subtotal = cart.items.reduce((acc, item) => {
    const price = Number(item.product.price);
    return acc + price * item.qty;
  }, 0);
  return convertToPlainObject({
    ...cart,
    subtotal: subtotal.toFixed(2),
  });
}
