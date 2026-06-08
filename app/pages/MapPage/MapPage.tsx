import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MetaFunction } from 'react-router';

import { CircularProgress, Typography } from '@mui/material';
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
      <Typography
        component="h1"
        sx={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px'
        }}
      >
        {t('map.h1')}
      </Typography>
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
