import { baseApi } from "@/shared/api/baseApi";
import type {
  CreateProfilePayload,
  Profile,
  UpdateProfilePayload,
  UpdateUserPayload,
} from "../model/types";
import type { AuthUser } from "@/entities/session/model/types";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateUser: build.mutation<unknown, { id: string; body: UpdateUserPayload }>({
      query: ({ id, body }) => ({ url: `/users/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Profile"],
    }),

    createProfile: build.mutation<Profile, CreateProfilePayload>({
      query: (body) => ({ url: "/profiles", method: "POST", body }),
      invalidatesTags: ["Profile"],
    }),

    updateProfile: build.mutation<Profile, { id: string; body: UpdateProfilePayload }>({
      query: ({ id, body }) => ({ url: `/profiles/${id}`, method: "PUT", body }),
      invalidatesTags: ["Profile"],
    }),
    getProfile: build.query<AuthUser, void>({
      query: () => "/auth/profile",
      providesTags: ["Profile"],
    }),
    getUserById: build.query<AuthUser, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Profile", id }],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useGetUserByIdQuery,
} = profileApi;
