export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("ru-RU");
};
