import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';

import '@testing-library/jest-dom/vitest';

import i18n from '@/i18n';

// Force EN for all tests so assertions on translated strings are deterministic.
beforeAll(async () => {
  await i18n.changeLanguage('en');
});

// Unmount components after each test to prevent state leaking across tests.
afterEach(() => {
  cleanup();
});

// jsdom has no matchMedia implementation. MUI theme resolution and useMediaQuery
// call it internally — tests crash without this stub.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    }) as MediaQueryList
});
