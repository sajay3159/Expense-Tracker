/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // allows using 'describe', 'test' without importing
    environment: "jsdom", // simulate browser DOM
    setupFiles: "./src/setupTests.js", // optional, for jest-dom setup
  },
});
