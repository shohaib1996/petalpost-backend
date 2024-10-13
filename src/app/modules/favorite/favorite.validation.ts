import { z } from "zod";
import mongoose from "mongoose";

export const favoriteValidation = z.object({
  body: z.object({
    userId: z
      .string()
      .refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: "Invalid userId format",
      })
      .optional(),
    postId: z
      .string()
      .refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: "Invalid postId format",
      }),
  }),
});
