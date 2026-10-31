import { getApiErrorCode } from "@/shared/lib/getApiErrorCode";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";

export const describeProfileError = (error: unknown): string => {
  const code = getApiErrorCode(error);

  if (
    code === "user.user.owner_or_admin_required" ||
    code === "auth.roles.admin_or_owner_required"
  ) {
    return "Можно редактировать только свой профиль";
  }
  if (code === "user.user.id.not_found" || code === "profile.profile.not_found") {
    return "Профиль не найден, обновите страницу";
  }

  return getErrorMessage(error);
};
