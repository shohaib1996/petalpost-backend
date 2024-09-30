import { z } from "zod";

const userSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").trim(),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required")
      .transform((email) => email.toLowerCase().trim()),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["user", "admin"]).optional(),
    avatar: z.string().url("Avatar must be a valid URL").optional(),
    isPremium: z.boolean().optional().default(false),
  }),
});
const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required")
      .transform((email) => email.toLowerCase().trim()),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

const updateUserProfileSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email").optional(),
    avatar: z.string().url("Avatar must be a valid URL").optional(),
  }),
});

export const userValidationSchema = {
  userSchema,
  loginSchema,
  updateUserProfileSchema,
};
