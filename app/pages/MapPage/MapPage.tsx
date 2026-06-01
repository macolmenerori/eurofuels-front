import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: 'EuroFuels – EU Fuel Prices Map' },
  { name: 'description', content: 'Real-time fuel prices across 27 EU member states.' }
];

export default function MapPage(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('map.title')}</h1>
      {/* Map component will go here */}
    </div>
  );
}
