import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist-react",
  },
  server: {
    port: 5555,
    // make sure to remove this line if trying to run ipc within react components
    // the callbacks are made twice if used
    strictPort: true,
  },
});
