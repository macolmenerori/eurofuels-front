import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: 'Statistics – EuroFuels' },
  { name: 'description', content: 'Fuel price statistics and trends across the European Union.' }
];

export default function StatsPage(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('stats.title')}</h1>
      {/* Stats component will go here */}
    </div>
  );
}
