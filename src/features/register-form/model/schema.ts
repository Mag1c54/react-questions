import { z } from "zod";
import { emailSchema, newPasswordSchema, usernameSchema } from "@/shared/lib/validation";

const requiredConsent = (message: string) => z.boolean().refine((value) => value, message);

export const registerSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, "Повторите пароль"),
    personalDataConsent: requiredConsent("Нужно согласие на обработку ПД"),
    offerConsent: requiredConsent("Нужно подтвердить ознакомление"),
    marketingConsent: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
