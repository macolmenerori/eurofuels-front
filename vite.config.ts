import { readFileSync } from "node:fs";
import { defineConfig, Plugin } from "vite";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8")) as {
  version: string;
};

export default defineConfig({
  plugins: [],

  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    tsconfigPaths: true,
  },

  // Build configuration (prod)
  build: {
    outDir: "dist",
    sourcemap: false, // User preference: no source maps in production
    assetsInlineLimit: 4096, // 4KB - Vite default (user preference)
    cssCodeSplit: true,
    // Minification (no console removal per user preference)
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

  // SSR configuration - handle CSS imports in component library
  ssr: {
    noExternal: ["@macolmenerori/component-library"],
  },
});
