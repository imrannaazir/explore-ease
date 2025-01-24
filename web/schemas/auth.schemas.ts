import { z } from "zod";

export const signUpValidator = z
  .object({
    fullName: z.string({ required_error: "Full name is require" }),
    email: z.string({ required_error: "Email is required." }),
    password: z.string({ required_error: "Password is require." }).min(6),
    confirmPassword: z.string({
      required_error: "Confirm Password  is require.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not matched.",
    path: ["confirmPassword"],
  });

export const signInValidator = z.object({
  email: z.string({ required_error: "Email is required." }),
  password: z.string({ required_error: "Password is require." }).min(6),
});
