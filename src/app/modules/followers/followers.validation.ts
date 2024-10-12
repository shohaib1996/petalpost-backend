import { z } from "zod";

const FollowersUserZodSchema = z.object({
  body: z.object({
    userId: z.string(),
    followingId: z.string(),
  }),
});

export const FollowersValidation = {
  FollowersUserZodSchema,
};
