import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
import { Prisma } from "@/generated/prisma/client";

const currency = z
  .union([z.string(), z.number()])
  .transform((v) => formatNumberWithDecimal(Number(v)))
  .refine(
    (s) => /^\d+(\.\d{2})$/.test(s),
    "Price must have exactly two decimal places",
  )
  .transform((s) => new Prisma.Decimal(s));

// Schema for inserting products
export const insertProductSchema = z.object({
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  nameChinese: z.string().nullable(),
  category: z.string().nullable(),
  description: z.string().nullable(),
  price: currency,
  image: z.string().nullable(),
  isFeatured: z.boolean().default(false),
  outOfStock: z.boolean().default(false),
});

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
