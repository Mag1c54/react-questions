import { baseApi } from "@/shared/api/baseApi";
import { cleanParams } from "@/shared/lib/cleanParams";
import type {
  DeleteResponse,
  GetSpecializationsParams,
  GetSpecializationsResponse,
  Specialization,
  SpecializationPayload,
} from "../model/types";

export const specializationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSpecializations: build.query<GetSpecializationsResponse, void>({
      query: () => ({ url: "/specializations", params: { page: 1, limit: 100 } }),
      providesTags: ["Specialization"],
    }),

    getSpecializationList: build.query<GetSpecializationsResponse, GetSpecializationsParams>({
      query: (params) => ({ url: "/specializations", params: cleanParams(params) }),
      providesTags: ["Specialization"],
    }),

    createSpecialization: build.mutation<Specialization, SpecializationPayload>({
      query: (body) => ({ url: "/specializations", method: "POST", body }),
      invalidatesTags: ["Specialization"],
    }),

    updateSpecialization: build.mutation<
      Specialization,
      { id: number; body: Partial<SpecializationPayload> }
    >({
      query: ({ id, body }) => ({ url: `/specializations/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Specialization"],
    }),

    deleteSpecialization: build.mutation<DeleteResponse, number>({
      query: (id) => ({ url: `/specializations/${id}`, method: "DELETE" }),
      invalidatesTags: ["Specialization"],
    }),
  }),
});

export const {
  useGetSpecializationsQuery,
  useGetSpecializationListQuery,
  useCreateSpecializationMutation,
  useUpdateSpecializationMutation,
  useDeleteSpecializationMutation,
} = specializationApi;
