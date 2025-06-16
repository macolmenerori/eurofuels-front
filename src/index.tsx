import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import './i18n';

import App from './App';

import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Suspense fallback={<LoadingSpinner position="center" />}>
    <App />
  </Suspense>
);
