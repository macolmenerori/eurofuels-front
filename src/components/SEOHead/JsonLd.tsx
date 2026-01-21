import { Helmet } from 'react-helmet-async';

export function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Eurofuels',
    description:
      'Compare current fuel prices across European Union countries. Updated weekly with official EU data including taxes.',
    url: 'https://eurofuels.miguelangelcolmenero.es',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    },
    author: {
      '@type': 'Person',
      name: 'macolmenerori',
      url: 'https://github.com/macolmenerori'
    },
    inLanguage: ['en', 'es'],
    keywords: 'fuel prices, gasoline prices, diesel prices, European Union, EU, petrol prices',
    sourceOrganization: {
      '@type': 'Organization',
      name: 'European Commission',
      url: 'https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en'
    },
    about: {
      '@type': 'Thing',
      name: 'Fuel Prices',
      description: 'Current gasoline and diesel prices in European Union member countries'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
