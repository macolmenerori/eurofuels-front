import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { formatPrice } from '@/lib/format';
import type { CountryPrice } from '@/lib/types';

interface PricesAveragesProps {
  data: CountryPrice[];
}

type StatusVariant = 'success' | 'warning' | 'error';

interface FuelStats {
  min: { value: number; country: string };
  avg: number;
  max: { value: number; country: string };
}

function computeStats(data: CountryPrice[], field: 'gasoline' | 'diesel'): FuelStats | null {
  const valid = data
    .map((row) => ({ value: parseFloat(row[field]), country: row.country }))
    .filter((row) => !Number.isNaN(row.value));

  if (valid.length === 0) return null;

  let min = valid[0];
  let max = valid[0];
  let sum = 0;

  for (const row of valid) {
    if (row.value < min.value) min = row;
    if (row.value > max.value) max = row;
    sum += row.value;
  }

  return { min, avg: sum / valid.length, max };
}

interface StatCardProps {
  variant: StatusVariant;
  price: string;
  sublabel: string;
  sublabelVariant: 'labelMd' | 'eyebrow';
  fullWidth?: boolean;
}

function StatCard({
  variant,
  price,
  sublabel,
  sublabelVariant,
  fullWidth = false
}: StatCardProps): React.JSX.Element {
  const theme = useTheme();
  const status = theme.ef.status[variant];

  return (
    <Paper
      elevation={0}
      sx={{
        flex: fullWidth ? '1 1 100%' : '1 1 160px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(1),
        p: theme.spacing(4),
        bgcolor: status.bg,
        border: `1px solid ${status.border}`,
        borderRadius: `${theme.ef.radii.lg}px`,
        boxShadow: theme.ef.shadows.sm
      }}
    >
      <Typography variant="numericDisplay" sx={{ fontSize: 24, color: status.text }}>
        {price}
      </Typography>
      <Typography variant={sublabelVariant} sx={{ color: status.text }}>
        {sublabel}
      </Typography>
    </Paper>
  );
}

export function PricesAverages({ data }: PricesAveragesProps): React.JSX.Element | null {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const gasolineStats = useMemo(() => computeStats(data, 'gasoline'), [data]);
  const dieselStats = useMemo(() => computeStats(data, 'diesel'), [data]);

  if (!gasolineStats && !dieselStats) return null;

  const averageLabel = t('stats.pricesStats.pricesAverages.average');

  function renderRow(stats: FuelStats | null, title: string): React.JSX.Element | null {
    if (!stats) return null;

    return (
      <Box sx={{ maxWidth: 600, margin: '0 auto', mb: theme.spacing(6) }}>
        <Typography variant="h5" component="h2" sx={{ mb: theme.spacing(4), textAlign: 'center' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(3) }}>
          <StatCard
            variant="success"
            price={formatPrice(String(stats.min.value), i18n.language)}
            sublabel={stats.min.country}
            sublabelVariant="labelMd"
          />
          <StatCard
            variant="error"
            price={formatPrice(String(stats.max.value), i18n.language)}
            sublabel={stats.max.country}
            sublabelVariant="labelMd"
          />
          <StatCard
            variant="warning"
            price={formatPrice(String(stats.avg), i18n.language)}
            sublabel={averageLabel}
            sublabelVariant="eyebrow"
            fullWidth
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      {renderRow(gasolineStats, t('stats.table.petrol'))}
      {renderRow(dieselStats, t('stats.table.diesel'))}
    </>
  );
}
