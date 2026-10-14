export const getApiErrorCode = (error: unknown): string | null => {
  const data = (error as { data?: unknown } | null)?.data;
  const body = Array.isArray(data) ? data[0] : data;
  const message = (body as { message?: unknown } | undefined)?.message;
  return typeof message === "string" ? message : null;
};
