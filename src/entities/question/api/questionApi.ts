import { baseApi } from "@/shared/api/baseApi";
import { cleanParams } from "@/shared/lib/cleanParams";
import type { FetchQuestionsParams, GetQuestionsResponse } from "../model/types";

export type GetPublicQuestionsArgs = FetchQuestionsParams & {
  collection?: number;
};

export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPublicQuestions: build.query<GetQuestionsResponse, GetPublicQuestionsArgs>({
      query: (params) => ({
        url: "/questions/public-questions",
        params: cleanParams(params),
      }),
    }),
    getProfileQuestions: build.query<GetQuestionsResponse, string>({
      query: (id) => ({
        url: `/interview-preparation/learn/${id}`,
      }),
    }),
  }),
});

export const { useGetPublicQuestionsQuery, useGetProfileQuestionsQuery } = questionApi;
