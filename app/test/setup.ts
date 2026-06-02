import { cleanup } from '@testing-library/react';
import { mutate } from 'swr';
import { afterAll, afterEach, beforeAll } from 'vitest';

import '@testing-library/jest-dom/vitest';

import i18n from '@/i18n';
import { server } from '@/test/mocks/server';

// Force EN for all tests so assertions on translated strings are deterministic.
beforeAll(async () => {
  await i18n.changeLanguage('en');

  // Start MSW server — error on any unhandled request to catch missing handlers early.
  server.listen({ onUnhandledRequest: 'error' });
});

// Unmount components after each test to prevent state leaking across tests.
afterEach(async () => {
  cleanup();

  // Reset any runtime handler overrides so the next test gets the defaults.
  server.resetHandlers();

  // Purge the SWR global cache so fetch states don't bleed across tests.
  await mutate(() => true, undefined, { revalidate: false });
});

afterAll(() => {
  server.close();
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
