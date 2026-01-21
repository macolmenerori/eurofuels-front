import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

type SEOHeadProps = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
};

export function SEOHead({
  title,
  description,
  canonicalUrl = 'https://eurofuels.miguelangelcolmenero.es',
  ogImage = 'https://eurofuels.miguelangelcolmenero.es/icons/android-icon-192x192.png'
}: SEOHeadProps) {
  const { t, i18n } = useTranslation();

  const pageTitle = title || t('mainPage.title');
  const pageDescription = description || t('mainPage.description');
  const currentLanguage = i18n.language || 'en';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={currentLanguage} />
      <title>{pageTitle} - European Fuel Prices</title>
      <meta name="title" content={`${pageTitle} - European Fuel Prices`} />
      <meta name="description" content={pageDescription} />
      <meta
        name="keywords"
        content="fuel prices, gasoline prices, diesel prices, European Union, EU, petrol prices, gas prices Europe, combustibles, precios"
      />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={`${pageTitle} - European Fuel Prices`} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={currentLanguage === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:site_name" content="Eurofuels" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={`${pageTitle} - European Fuel Prices`} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="macolmenerori" />
      <meta name="language" content={currentLanguage} />

      {/* Geo Tags for European context */}
      <meta name="geo.region" content="EU" />
      <meta name="geo.placename" content="European Union" />
    </Helmet>
  );
}
