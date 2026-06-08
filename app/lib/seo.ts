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
    { tagName: 'link', rel: 'canonical', href: SITE_URL + path }
  ];
}
