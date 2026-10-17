import { z } from "zod";

export const TITLE_MAX = 100;
export const DESCRIPTION_MAX = 1000;

export const specializationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Введите название")
    .max(TITLE_MAX, `Максимум ${TITLE_MAX} символов`),
  description: z
    .string()
    .trim()
    .min(1, "Введите описание")
    .max(DESCRIPTION_MAX, `Максимум ${DESCRIPTION_MAX} символов`),
  image: z.string().min(1, "Добавьте картинку"),
});

export type SpecializationFormValues = z.infer<typeof specializationSchema>;
