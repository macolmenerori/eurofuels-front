import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MetaFunction } from 'react-router';

import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

import MapDisplayComponent from '@/components/MapDisplayComponent/MapDisplayComponent';
import { StatusCard } from '@/components/StatusCard/StatusCard';
import { useMapData } from '@/hooks/useMapData';
import { buildMeta, websiteJsonLd } from '@/lib/seo';

export const meta: MetaFunction = () => [
  ...buildMeta({
    path: '/',
    title: 'EuroFuels – EU Fuel Prices Map',
    description: 'Real-time fuel prices across 27 EU member states.'
  }),
  websiteJsonLd()
];

export default function MapPage(): React.JSX.Element {
  const { t } = useTranslation();
  const { data, isLoading, error } = useMapData();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress aria-label={t('map.loading')} />
        </Box>
      )}
      {error && <StatusCard status="error" title={t('map.errorTitle')} message={t('map.error')} />}
      <Box sx={{ flex: 1, minHeight: 0 }}>{data && <MapDisplayComponent data={data} />}</Box>
    </Box>
  );
}
