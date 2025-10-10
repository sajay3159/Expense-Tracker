import { createSlice } from "@reduxjs/toolkit";

const initialTheme = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialTheme,
  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
