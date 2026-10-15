import { z } from "zod";
import { isHttpUrl } from "@/shared/lib/isHttpUrl";
import { usernameSchema } from "@/shared/lib/validation";

export const ABOUT_MAX = 1000;

const linkSchema = z
  .string()
  .trim()
  .refine((value) => value === "" || isHttpUrl(value), "Введите ссылку, начиная с https://");

export const createProfileEditSchema = (currentUsername: string) =>
  z.object({
    username: z
      .string()
      .trim()
      .superRefine((value, ctx) => {
        if (value === currentUsername) return;

        const result = usernameSchema.safeParse(value);
        if (!result.success) {
          ctx.addIssue({ code: "custom", message: result.error.issues[0].message });
        }
      }),
    country: z.string().trim().max(100, "Максимум 100 символов"),
    city: z.string().trim().max(100, "Максимум 100 символов"),
    newAvatar: z.string().nullable(),
    description: z.string().trim().max(ABOUT_MAX, `Максимум ${ABOUT_MAX} символов`),
    skills: z.array(z.number()),
    links: z.record(z.string(), linkSchema),
  });

export type ProfileEditValues = z.infer<ReturnType<typeof createProfileEditSchema>>;
