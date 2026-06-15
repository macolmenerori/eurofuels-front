import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vitest/config';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  version: string;
};

// Parse .env manually so import.meta.env.VITE_* variables are available in tests.
// Vitest exposes these via define rather than relying on runtime env-file injection.
function parseEnvFile(path: string): Record<string, string> {
  try {
    return Object.fromEntries(
      readFileSync(path, 'utf-8')
        .split('\n')
        .filter((line) => line.trim() && !line.startsWith('#'))
        .map((line) => {
          const [key, ...rest] = line.split('=');
          return [key.trim(), rest.join('=').trim()] as [string, string];
        })
    );
  } catch {
    return {};
  }
}
const dotenv = parseEnvFile('.env');

export default defineConfig({
  plugins: [
    react(),
  ],

  resolve: {
    tsconfigPaths: true, // wires @/* alias from tsconfig.json paths (native Vite 8)
    alias: {
      // MUI v9.1.0 imports 'react-transition-group/TransitionGroupContext' (bare subpath)
      // but RTG 4.x has no `exports` field, so Node ESM can't resolve the directory import.
      // Map it explicitly to the ESM file so vitest can load @mui/material transitions.
      'react-transition-group/TransitionGroupContext':
        'react-transition-group/esm/TransitionGroupContext.js'
    }
  },

  define: {
    // Mirror the production Vite global so components that read it don't throw.
    __APP_VERSION__: JSON.stringify(pkg.version),
    // Expose VITE_* env vars so import.meta.env.VITE_* resolves in test files.
    // Fall back to a deterministic placeholder when .env is absent (e.g. CI) —
    // the value is arbitrary; MSW intercepts the same constant, so any non-empty
    // string makes the handler match.
    'import.meta.env.VITE_COUNTRY_DATA_ENDPOINT': JSON.stringify(
      dotenv.VITE_COUNTRY_DATA_ENDPOINT || 'http://localhost/test/country-data.json'
    )
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
        inline: ['@macolmenerori/component-library', '@mui/material']
      }
    }
  }
});
