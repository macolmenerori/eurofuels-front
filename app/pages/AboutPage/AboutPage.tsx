import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: 'About – EuroFuels' },
  { name: 'description', content: 'About the EuroFuels project.' }
];

export default function AboutPage(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('about.title')}</h1>
      {/* About component will go here */}
    </div>
  );
}
