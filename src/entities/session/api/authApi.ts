import { baseApi } from "@/shared/api/baseApi";
import { logout, setAccessToken } from "../model/sessionSlice";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string | null;
  isVerified: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
}

export interface AuthResponse extends TokenResponse {
  user: AuthUser;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccessToken(data.access_token));
        } catch {
          //
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
          //
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
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;