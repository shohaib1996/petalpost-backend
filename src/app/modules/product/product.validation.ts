import { z } from "zod";

const productSchema = z.object({
  body: z.object({
    image: z.string().min(1, "Image URL is required"),
    title: z.string().min(1, "Title is required").trim(),
    brand: z.string().min(1, "Brand is required").trim(),
    quantity: z.number().nonnegative("Quantity must be 0 or more"),
    price: z.number().nonnegative("Price must be 0 or more"),
    rating: z
      .number()
      .min(0, "Rating must be 0 or more")
      .max(5, "Rating must be 5 or less"),
    description: z.string().min(1, "Description is required").trim(),
  }),
});

const updateProductValidation = z.object({
  body: z.object({
    image: z.string().min(1, "Image URL is required").optional(),
    title: z.string().min(1, "Title is required").trim().optional(),
    brand: z.string().min(1, "Brand is required").trim().optional(),
    quantity: z.number().nonnegative("Quantity must be 0 or more").optional(),
    price: z.number().nonnegative("Price must be 0 or more").optional(),
    rating: z
      .number()
      .min(0, "Rating must be 0 or more")
      .max(5, "Rating must be 5 or less")
      .optional(),
    description: z.string().min(1, "Description is required").trim().optional(),
  }),
});

export const productValidationSchema = {
  productSchema,
  updateProductValidation,
};
