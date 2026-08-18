import type { MetaDescriptor } from 'react-router';

export const SITE_URL = 'https://eurofuels.miguelcolmenero.net';
export const SITE_DESCRIPTION = 'Real-time fuel prices across 27 EU member states.';

export function buildMeta({
  path,
  title,
  description
}: {
  path: string;
  title: string;
  description: string;
}): MetaDescriptor[] {
  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: SITE_URL + path },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'EuroFuels' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: SITE_URL + path },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description }
  ];
}

export function websiteJsonLd(): MetaDescriptor {
  return {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'EuroFuels',
      url: SITE_URL,
      description: SITE_DESCRIPTION
    }
  };
}
