import { z } from "zod";
import { PAYMENT_METHODS } from "./constants";

const currency = z.coerce.number().transform((v) => v.toFixed(2));

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
  options: z.any().nullable(),
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.uuid().nullable(),
});

export const deliveryAddressSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  streetAddress: z.string().min(3, "Address must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
});

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  });

export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  subtotal: currency,
  deliveryFee: currency,
  tax: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Invalid payment method",
  }),
  deliveryAddress: deliveryAddressSchema,
});

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string().nullable(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

export const insertReviewSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  userId: z.string().min(1, "User is required"),
  like: z.boolean().default(false),
  description: z.string().min(3, "Description must be at least 3 characters"),
});
