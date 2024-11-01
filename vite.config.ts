import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [["@swc/plugin-styled-components", {}]],
    }),
    tsConfigPaths(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src/") }],
  },
});
