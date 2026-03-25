import { readFileSync } from 'node:fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  version: string;
};

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      react(),
      viteTsconfigPaths() // Handles @ → src/ alias from tsconfig
    ],

    define: {
      __APP_VERSION__: JSON.stringify(pkg.version)
    },

    server: {
      port: 3000,
      open: false,
      host: true
    },

    preview: {
      port: 3000
    },

    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd
        }
      },
      rollupOptions: {
        output: {
          // Use function-based manualChunks to avoid SSR external module conflicts
          manualChunks: (id) => {
            // Only apply chunking for node_modules during client build
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              if (id.includes('@mui/material') || id.includes('@mui/icons-material')) {
                return 'mui-vendor';
              }
            }
            return undefined;
          }
        }
      },
      chunkSizeWarningLimit: 600
    },

    publicDir: 'public',

    optimizeDeps: {
      include: ['react', 'react-dom', '@mui/material']
    },

    ssr: {
      noExternal: ['react-helmet-async', '@macolmenerori/component-library']
    },

    ssgOptions: {
      formatting: 'minify'
    }
  };
});
