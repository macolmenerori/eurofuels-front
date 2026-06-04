import { readFileSync } from "node:fs";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8")) as {
  version: string;
};

export default defineConfig({
  plugins: [reactRouter()],

  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    tsconfigPaths: true,
  },

  // Build configuration (prod)
  build: {
    sourcemap: false,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    minify: true,
    target: "es2020",
  },

  // Server configuration (dev)
  server: {
    port: 3000,
    open: false,
    host: true,
  },

  // Preview server (production preview)
  preview: {
    port: 3000,
    open: false,
    host: true,
  },

  optimizeDeps: {
    include: ["react-cookie-consent"],
  },

  // SSR configuration - handle CSS imports in component library
  ssr: {
    noExternal: ["@macolmenerori/component-library", "react-cookie-consent"],
  },
});
