import { getApiErrorCode } from "@/shared/lib/getApiErrorCode";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";

export interface SpecializationFormError {
  field?: "title";
  message: string;
}

const FIELD_ERRORS: Record<string, SpecializationFormError> = {
  "specialization.specialization.title.conflict": {
    field: "title",
    message: "Специализация с таким названием уже существует",
  },
};

const COMMON_ERRORS: Record<string, string> = {
  "auth.roles.admin": "Нужны права администратора",
  "auth.user.verified": "Подтвердите почту, чтобы управлять специализациями",
  "specialization.user.not_found": "Пользователь не найден, войдите заново",
  "specialization.specialization.not_found": "Специализация не найдена",
};

export const resolveSpecializationError = (error: unknown): SpecializationFormError => {
  const code = getApiErrorCode(error);

  if (code && FIELD_ERRORS[code]) return FIELD_ERRORS[code];
  if (code && COMMON_ERRORS[code]) return { message: COMMON_ERRORS[code] };

  if ((error as { status?: number } | null)?.status === 400) {
    return { message: "Сервер не принял данные. Попробуйте другую картинку" };
  }

  return { message: getErrorMessage(error) };
};

const DELETE_ERRORS: Record<string, string> = {
  "specialization.specialization.not_found": "уже удалена",
  "specialization.specialization.constraint.foreign_key_violation": "связана с другими данными",
  "specialization.question.constraint.foreign_key_violation": "используется в вопросах",
  "specialization.collection.constraint.foreign_key_violation": "используется в коллекциях",
  "auth.roles.admin": "нужны права администратора",
  "auth.user.verified": "нужно подтвердить почту",
};

export const describeDeleteError = (error: unknown): string => {
  const code = getApiErrorCode(error);

  if (code && DELETE_ERRORS[code]) return DELETE_ERRORS[code];
  if ((error as { status?: number } | null)?.status === 403) return "недостаточно прав";

  return getErrorMessage(error);
};
