import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const signUpFormSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    ),
});

export const signInValidationSchema = z.object({
  email_username: z
    .string()
    .nonempty("Cannot be empty. Enter either username or email."),
  password: z.string().nonempty("Password is required"),
});
