import { API_BASE_URL } from "@/shared/api/config";
import type {
  FetchQuestionsParams,
  GetPublicQuestionsResponse,
} from "../model/types";

import { baseApi } from "@/shared/api/baseApi";


export async function fetchQuestions(
  params: FetchQuestionsParams,
  signal?: AbortSignal,
): Promise<GetPublicQuestionsResponse> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        queryParams.append(key, value.join(","));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  const response = await fetch(
    `${API_BASE_URL}/questions/public-questions?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status}`);
  }

  return response.json();
}



export type GetPublicQuestionsArgs = FetchQuestionsParams & {
  collection?: number;
};

export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPublicQuestions: build.query<GetPublicQuestionsResponse, GetPublicQuestionsArgs>({
      query: (params) => ({ url: "/questions/public-questions", params }),
    }),
  }),
});

export const { useGetPublicQuestionsQuery } = questionApi;