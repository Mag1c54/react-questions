export const getErrorMessage = (error: unknown): string => {
  const status = (error as { status?: unknown } | null)?.status;

  if (status === "FETCH_ERROR") return "Нет соединения с сервером";
  if (status === 429) return "Слишком много попыток, попробуйте позже";
  if (typeof status === "number" && status >= 500) {
    return "Ошибка сервера, попробуйте позже";
  }

  return "Что-то пошло не так, попробуйте ещё раз";
};