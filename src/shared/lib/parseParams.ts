export const parsePositiveInt = (
  value: string | null,
  fallback = 1,
  max = 1_000_000,
): number => {
  if (value === null || !/^\d+$/.test(value)) return fallback;

  const n = Number(value);
  if (!Number.isSafeInteger(n) || n < 1) return fallback;

  return Math.min(n, max);
};

export const parseIdList = (value: string | null): number[] => {
  if (!value) return [];

  const ids = value
    .split(",")
    .filter((part) => /^[1-9]\d*$/.test(part))
    .map(Number)
    .filter(Number.isSafeInteger);

  return Array.from(new Set(ids));
};