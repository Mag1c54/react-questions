import type { QuizSettings } from "../model/types";

export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;

export const COMPLEXITY_RANGES = [
  { label: "1-3", levels: [1, 2, 3] },
  { label: "4-6", levels: [4, 5, 6] },
  { label: "7-8", levels: [7, 8] },
  { label: "9-10", levels: [9, 10] },
];

const parseNumbers = (value: string | null): number[] =>
  value ? value.split(",").map(Number).filter(Number.isFinite) : [];

export const parseQuizSettings = (params: URLSearchParams): QuizSettings | null => {
  const specialization = Number(params.get("specialization"));
  if (!specialization) return null;

  return {
    specialization,
    skills: parseNumbers(params.get("skills")),
    complexity: parseNumbers(params.get("complexity")),
    limit: Number(params.get("limit")) || DEFAULT_LIMIT,
  };
};

export const buildQuizSearch = (settings: QuizSettings): string => {
  const params = new URLSearchParams();
  params.set("specialization", String(settings.specialization));
  if (settings.skills.length) params.set("skills", settings.skills.join(","));
  if (settings.complexity.length) params.set("complexity", settings.complexity.join(","));
  params.set("limit", String(settings.limit));
  return `?${params.toString()}`;
};