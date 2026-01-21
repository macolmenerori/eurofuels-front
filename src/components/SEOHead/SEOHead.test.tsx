import { HelmetProvider } from 'react-helmet-async';

import { render } from '@testing-library/react';

import { SEOHead } from './SEOHead';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'mainPage.title': 'Eurofuels',
        'mainPage.description': 'Prices are updated every week. Taxes included.'
      };
      return translations[key] || key;
    },
    i18n: {
      language: 'en'
    }
  })
}));

describe('SEOHead', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <SEOHead />
      </HelmetProvider>
    );
  });

  it('accepts custom title and description', () => {
    render(
      <HelmetProvider>
        <SEOHead title="Custom Title" description="Custom Description" />
      </HelmetProvider>
    );
  });

  it('accepts custom canonical URL and OG image', () => {
    render(
      <HelmetProvider>
        <SEOHead canonicalUrl="https://example.com" ogImage="https://example.com/image.png" />
      </HelmetProvider>
    );
  });
});
