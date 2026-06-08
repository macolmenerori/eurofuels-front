import type { MetaDescriptor } from 'react-router';

export const SITE_URL = 'https://eurofuels.miguelangelcolmenero.es';

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
    { property: 'og:url', content: SITE_URL + path }
  ];
}
