import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialEmail = localStorage.getItem("email");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken || null,
    email: initialEmail || "",
    profileCompleted: false,
    emailVerified: false,
  },
  reducers: {
    login(state, action) {
      const { token, email } = action.payload;
      state.token = token;
      state.email = email;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    },
    logout(state) {
      state.token = null;
      state.email = "";
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
    markProfileCompleted(state) {
      state.profileCompleted = true;
    },
    setEmailVerified(state, action) {
      state.emailVerified = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
