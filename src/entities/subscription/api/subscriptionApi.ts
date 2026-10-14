import { baseApi } from "@/shared/api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    activateTrial: build.mutation<void, void>({
      query: () => ({ url: "/subscriptions/trial", method: "GET", cache: "no-store" }),
    }),
  }),
});

export const { useActivateTrialMutation } = subscriptionApi;
