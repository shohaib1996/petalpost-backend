import mongoose from "mongoose";
import { z } from "zod";

const postSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    author: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid author ID",
    }),
    images: z.array(z.string().url()).optional(),
    videos: z.array(z.string().url()).optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    upvotes: z.number().min(0),
    downvotes: z.number().min(0),
    isPremium: z.boolean(),
  }),
});
const updatePostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    content: z.string().min(1, "Content is required").optional(),
    author: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid author ID",
      })
      .optional(),
    images: z.array(z.string().url()).optional(),
    videos: z.array(z.string().url()).optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    upvotes: z.number().min(0).optional(),
    downvotes: z.number().min(0).optional(),
    isPremium: z.boolean().optional(),
  }),
});

export const PostValidationSchema = {
  postSchema,
  updatePostValidationSchema,
};
