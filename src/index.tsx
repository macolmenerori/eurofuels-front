import { StrictMode, Suspense } from 'react';

import { ViteReactSSG } from 'vite-react-ssg/single-page';

import './i18n';

import App from './App';

import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';

export const createRoot = ViteReactSSG(
  <StrictMode>
    <Suspense fallback={<LoadingSpinner position="center" />}>
      <App />
    </Suspense>
  </StrictMode>
);
