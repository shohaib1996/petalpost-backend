import mongoose from "mongoose";
import { z } from "zod";

const replySchemaZod = z.object({
  body: z.object({
    comment: z.string().min(1, { message: "Comment content is required" }),
  }),
});

const commentSchemaZod = z.object({
  body: z.object({
    postId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid Post ID",
    }),
    userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid User ID",
    }),
    comment: z.string().min(1, { message: "Comment content is required" }),
    replies: z.array(replySchemaZod).optional(),
  }),
});

const updateSchemaZod = z.object({
  body: z.object({
    postId: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid Post ID",
      })
      .optional(),
    userId: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid User ID",
      })
      .optional(),
    comment: z.string().min(1, { message: "Comment content is required" }),
    replies: z.array(replySchemaZod).optional(),
  }),
});

export const CommentSchemaValidation = {
  commentSchemaZod,
  replySchemaZod,
  updateSchemaZod,
};
