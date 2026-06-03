import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MetaFunction } from 'react-router';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useSWR from 'swr';

import { PricesTable } from '@/components/PricesTable/PricesTable';
import { StatusCard } from '@/components/StatusCard/StatusCard';
import { fetcher } from '@/lib/fetcher';
import type { CountryPrice } from '@/lib/types';

export const meta: MetaFunction = () => [
  { title: 'Statistics – EuroFuels' },
  { name: 'description', content: 'Fuel price statistics and trends across the European Union.' }
];

export default function StatsPage(): React.JSX.Element {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data, error, isLoading } = useSWR<CountryPrice[]>(
    import.meta.env.VITE_COUNTRY_DATA_ENDPOINT,
    fetcher
  );

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(6)
      }}
    >
      <Typography
        variant="headlineSm"
        component="h1"
        sx={{ mb: theme.spacing(4), textAlign: 'center' }}
      >
        {t('stats.title')}
      </Typography>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress aria-label={t('stats.loading')} />
        </Box>
      )}
      {error && (
        <StatusCard status="error" title={t('stats.errorTitle')} message={t('stats.error')} />
      )}
      {data && <PricesTable data={data} />}
    </Box>
  );
}
