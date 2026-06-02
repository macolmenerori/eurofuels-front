import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  version: string;
};

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths() // wires @/* alias from tsconfig.json paths
  ],

  define: {
    // Mirror the production Vite global so components that read it don't throw.
    __APP_VERSION__: JSON.stringify(pkg.version)
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./app/test/setup.ts'],
    css: false, // skip CSS processing; component-library CSS imports are side-effects only

    // @macolmenerori/component-library ships ESM; inline it so Vitest transforms it.
    // Mirrors ssr.noExternal in vite.config.ts.
    server: {
      deps: {
        inline: ['@macolmenerori/component-library']
      }
    }
  }
});
