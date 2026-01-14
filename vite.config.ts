import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Renderer (UI) build only. Electron main/preload are plain ESM .mjs files.
export default defineConfig({
  root: path.resolve(__dirname, "src/renderer"),
  base: "./",
  resolve: {
    alias: {
      "war3-model": path.resolve(__dirname, "index.ts"),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    fs: {
      allow: [".."],
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/renderer"),
    emptyOutDir: true,
  },
});
