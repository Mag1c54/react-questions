import { baseApi } from "@/shared/api/baseApi";
import type { GetSkillsParams, GetSkillsResponse } from "../model/types";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSkills: build.query<GetSkillsResponse, GetSkillsParams>({
      query: ({ specializations, page = 1, limit = 100, ...rest }) => ({
        url: "/skills",
        params: {
          ...rest,
          page,
          limit,
          specializations: specializations.length ? specializations.join(",") : undefined,
        },
      }),
    }),
  }),
});

export const { useGetSkillsQuery } = skillApi;