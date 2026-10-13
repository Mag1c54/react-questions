import { baseApi } from "@/shared/api/baseApi";
import { cleanParams } from "@/shared/lib/cleanParams";
import type { FetchQuestionsParams, GetPublicQuestionsResponse } from "../model/types";

export type GetPublicQuestionsArgs = FetchQuestionsParams & {
  collection?: number;
};

export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPublicQuestions: build.query<GetPublicQuestionsResponse, GetPublicQuestionsArgs>({
      query: (params) => ({
        url: "/questions/public-questions",
        params: cleanParams(params),
      }),
    }),
  }),
});

export const { useGetPublicQuestionsQuery } = questionApi;
