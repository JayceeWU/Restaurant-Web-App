import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .union([z.string(), z.number()])
  .transform((v) => formatNumberWithDecimal(Number(v)))
  .refine(
    (s) => /^\d+(\.\d{2})$/.test(s),
    "Price must have exactly two decimal places",
  )

// Inserting product customization options
export const productCustomizationOptionsSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  subname: z.string().nullable(),
  additionalPrice: currency,
});

// Inserting product customizations
export const productCustomizationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  subname: z.string().nullable(),
  required: z.boolean().default(false),
  maxOptions: z
    .int()
    .nonnegative("Quantity must be a positive number")
    .nullable(),
  minOptions: z
    .int()
    .nonnegative("Quantity must be a positive number")
    .nullable(),
  options: z.array(productCustomizationOptionsSchema),
});

// Inserting products
export const insertProductSchema = z.object({
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  subname: z.string().nullable(),
  category: z.string().nullable(),
  description: z.string().nullable(),
  price: currency,
  image: z.string().nullable(),
  isFeatured: z.boolean().default(false),
  outOfStock: z.boolean().default(false),
  customizations: z.array(productCustomizationSchema).nullable(),
});

// Updating products
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, "Id is required"),
});

// Signing users in
export const signInFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Signing up a user
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

// Cart Schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
  streetAddress: z.string().min(3, 'Address must be at least 3 characters'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
});
