import { createSlice } from "@reduxjs/toolkit";

const InitialState = localStorage.getItem("token");
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: InitialState,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});
export const AuthActions = AuthSlice.actions;
export default AuthSlice;
