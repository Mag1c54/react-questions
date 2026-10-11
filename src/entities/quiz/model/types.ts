import type { Question } from "@/entities/question/model/types";

export type QuizAnswer = "KNOWN" | "UNKNOWN";

export interface QuizSettings {
  specialization: number;
  skills: number[];
  complexity: number[];
  limit: number;
}

export interface MockQuiz {
  id: string;
  startDate: string;
  fullCount: number;
  skills: string[];
  response: {
    answers: { questionId: number; questionTitle: string; answer: QuizAnswer }[];
  };
  questions: Question[];
}