"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { z } from "zod";
import { productCustomizationOptionsSchema } from "@/lib/validators";

// Get all products
export async function getAllProducts() {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
      customizations: true,
    },
  });
  const formattedData = data.map((product) => ({
    ...product,
    price: product.price.toString(),
    category: product.category?.name ?? null,
    customizations: product.customizations.map((c) => ({
      ...c,
      options: (
        c.options as unknown as z.infer<
          typeof productCustomizationOptionsSchema
        >[]
      ).map((option) => ({
        ...option,
        additionalPrice: option.additionalPrice.toString(),
      })),
    })),
  }));
  return convertToPlainObject(formattedData);
}

// Get all categories
export async function getAllCategories() {
  const data = await prisma.category.findMany({
    select: { name: true },
    orderBy: { sequence: "asc" },
  });
  return data.map((c) => c.name);
}
