import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SessionStatus = "checking" | "authenticated" | "guest";

interface SessionState {
  accessToken: string | null;
  status: SessionStatus;
}

const initialState: SessionState = {
  accessToken: null,
  status: "checking",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.status = "authenticated";
    },
    logout(state) {
      state.accessToken = null;
      state.status = "guest";
    },
  },
});

export const { setAccessToken, logout } = sessionSlice.actions;

export const selectIsAuth = (state: { session: SessionState }) =>
  state.session.status === "authenticated";

export const selectSessionStatus = (state: { session: SessionState }) =>
  state.session.status;