"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";

// Get all products
export async function getAllProducts() {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(data);
}
