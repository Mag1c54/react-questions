import { baseApi } from "@/shared/api/baseApi";
import type { GetSpecializationsResponse } from "../model/types";

export const specializationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSpecializations: build.query<GetSpecializationsResponse, void>({
      query: () => ({ url: "/specializations", params: { page: 1, limit: 100 } }),
    }),
  }),
});

export const { useGetSpecializationsQuery } = specializationApi;