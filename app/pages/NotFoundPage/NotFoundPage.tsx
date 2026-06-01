import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: '404 – EuroFuels' },
  { name: 'description', content: 'Page not found.' }
];

export default function NotFoundPage(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('notFound.title')}</h1>
    </div>
  );
}
