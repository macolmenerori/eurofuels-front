import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import i18n from 'i18next';

import '@testing-library/jest-dom';

import enTranslation from '@/../public/locales/en.json';
import esTranslation from '@/../public/locales/es.json';
import { createAppTheme } from '@/ui/theme/theme';

// // Add TextEncoder and TextDecoder polyfills
// if (typeof global.TextEncoder === 'undefined') {
//   // eslint-disable-next-line @typescript-eslint/no-require-imports
//   const { TextEncoder, TextDecoder } = require('util');
//   global.TextEncoder = TextEncoder;
//   global.TextDecoder = TextDecoder;
// }

// Initialize i18n for testing
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  resources: {
    en: {
      translation: enTranslation
    },
    es: {
      translation: esTranslation
    }
  }
});

interface ExtendedRenderOptions {
  theme?: 'light' | 'dark';
  lng?: string; // Allow overriding language for specific tests
}

function renderWithProviders(
  ui: React.ReactElement,
  options = {},
  extended: ExtendedRenderOptions = {}
) {
  const theme = createAppTheme(extended.theme || 'light');

  // If a specific language is provided for this test, change it
  if (extended.lng && extended.lng !== i18n.language) {
    i18n.changeLanguage(extended.lng);
  }

  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </I18nextProvider>
    );
  };

  return render(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react';
export { renderWithProviders as render };
export { i18n }; // Export i18n instance for direct manipulation in tests if needed
