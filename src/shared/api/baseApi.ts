import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (
      getState() as { session: { accessToken: string | null } }
    ).session;
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

const AUTH_PATHS = ["/auth/login", "/auth/signUp", "/auth/refresh", "/auth/logout"];

const isAuthRequest = (args: string | FetchArgs) => {
  const url = typeof args === "string" ? args : args.url;
  return AUTH_PATHS.some((path) => url.startsWith(path));
};

let refreshPromise: Promise<string | null> | null = null;

const requestNewToken = async (api: BaseQueryApi, extraOptions: object) => {
  const result = await rawBaseQuery(
    { url: "/auth/refresh", method: "GET", cache: "no-store" },
    api,
    extraOptions,
  );
  const token = (result.data as { access_token?: string } | undefined)?.access_token ?? null;
  if (token) api.dispatch({ type: "session/setAccessToken", payload: token });
  return token;
};

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401 && !isAuthRequest(args)) {
      refreshPromise ??= requestNewToken(api, extraOptions).finally(() => {
        refreshPromise = null;
      });
      const token = await refreshPromise;

      if (token) result = await rawBaseQuery(args, api, extraOptions);
      else api.dispatch({ type: "session/logout" });
    }

    return result;
  };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Collection"],
  endpoints: () => ({}),
});