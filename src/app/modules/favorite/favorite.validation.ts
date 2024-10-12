import { z } from "zod";
import mongoose from "mongoose";

export const favoriteValidation = z.object({
  body: z.object({
    userId: z.instanceof(mongoose.Types.ObjectId, {
      message: "Invalid userId format",
    }),
    postId: z.array(z.instanceof(mongoose.Types.ObjectId), {
      message: "Invalid postId format",
    }),
  }),
});
