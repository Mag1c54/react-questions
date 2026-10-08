import { baseApi } from "@/shared/api/baseApi";
import type {
  Collection,
  GetCollectionsParams,
  GetCollectionsResponse,
} from "../model/types";

export const collectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCollections: build.query<GetCollectionsResponse, GetCollectionsParams>({
      query: ({ specializations, keywords, companies, ...rest }) => ({
        url: "/collections/public",
        params: {
          ...rest,
          specializations: specializations?.length ? specializations.join(",") : undefined,
          keywords: keywords?.length ? keywords.join(",") : undefined,
          companies: companies?.length ? companies.join(",") : undefined,
        },
      }),
      providesTags: ["Collection"],
    }),

    getCollectionById: build.query<Collection, string>({
      query: (id) => `/collections/${id}/public`,
      providesTags: (_result, _error, id) => [{ type: "Collection", id }],
    }),
  }),
});

export const { useGetCollectionsQuery, useGetCollectionByIdQuery } = collectionApi;