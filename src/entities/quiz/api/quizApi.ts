import { baseApi } from "@/shared/api/baseApi";
import type { MockQuiz, QuizSettings } from "../model/types";

export const quizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMockQuiz: build.query<MockQuiz, QuizSettings>({
      query: ({ skills, complexity, specialization, limit }) => {
        const params = new URLSearchParams();
        params.set("specialization", String(specialization));
        params.set("limit", String(limit));
        if (complexity.length) params.set("complexity", complexity.join(","));
        skills.forEach((id) => params.append("skills", String(id)));

        return `/interview-preparation/quizzes/mock/new?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetMockQuizQuery } = quizApi;