import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 8;

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Введите почту")
  .email("Введите корректную почту");

export const usernameSchema = z
  .string()
  .trim()
  .min(1, "Введите никнейм")
  .min(3, "Минимум 3 символа")
  .regex(/^[\p{L}\p{N}]+$/u, "Только буквы и цифры");

export const newPasswordSchema = z
  .string()
  .min(1, "Введите пароль")
  .min(PASSWORD_MIN_LENGTH, "Минимум 8 символов")
  .regex(/\p{Lu}/u, "Нужна хотя бы одна заглавная буква")
  .regex(/\d/, "Нужна хотя бы одна цифра")
  .regex(/[^\p{L}\p{N}\s]/u, "Нужен хотя бы один спецсимвол");

export const loginPasswordSchema = z
  .string()
  .min(1, "Введите пароль")
  .min(PASSWORD_MIN_LENGTH, "Минимум 8 символов");
