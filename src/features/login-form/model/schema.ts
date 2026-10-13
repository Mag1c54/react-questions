import { z } from "zod";
import { emailSchema, loginPasswordSchema } from "@/shared/lib/validation";

export const loginSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
