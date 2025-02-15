import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  /* Config Alias */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@pages": `${path.resolve(__dirname, "./src/pages/")}`,
      "@services": `${path.resolve(__dirname, "./src/services/")}`,
      "@api": `${path.resolve(__dirname, "./src/apis/")}`,
      "@fb": `${path.resolve(__dirname, "./src/firebase/")}`,
      "@routes": `${path.resolve(__dirname, "./src/routes/")}`,
      "@utils": `${path.resolve(__dirname, "./src/utils/")}`,
      "@slices": `${path.resolve(__dirname, "./src/stores/slices/")}`,
      "@pictures": `${path.resolve(__dirname, "./src/pictures/")}`,
      "@videos": `${path.resolve(__dirname, "./src/videos/")}`,
      "@scss": `${path.resolve(__dirname, "./src/scss/")}`,
    },
  },

  /* Config Global Scss Variable */
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "src/scss/index.scss";` },
    },
  },
});
