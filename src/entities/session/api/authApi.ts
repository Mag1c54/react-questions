import { baseApi } from "@/shared/api/baseApi";
import { logout, setAccessToken } from "../model/sessionSlice";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  AuthUser,
} from "../model/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccessToken(data.access_token));
        } catch {
          // error from form
        }
      },
    }),

    register: build.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({ url: "/auth/signUp", method: "POST", body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccessToken(data.access_token));
        } catch {
          // error from form
        }
      },
    }),

    refresh: build.query<TokenResponse, void>({
      query: () => ({ url: "/auth/refresh", method: "GET", cache: "no-store" }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccessToken(data.access_token));
        } catch {
          dispatch(logout());
        }
      },
    }),

    logout: build.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "GET", cache: "no-store" }),
    }),
    getProfile: build.query<AuthUser, void>({
      query: () => "/auth/profile",
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetProfileQuery } =
  authApi;
