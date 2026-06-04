import React from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import type { PriceDomain } from '../mapColor';

import { formatPrice } from '@/lib/format';

export interface MapLegendProps {
  domain: PriceDomain;
}

export default function MapLegend({ domain }: MapLegendProps): React.JSX.Element {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { low, mid, high } = theme.ef.map.scale;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: { xs: theme.spacing(1), sm: theme.spacing(1.5) },
        right: { xs: theme.spacing(1), sm: theme.spacing(1.5) },
        zIndex: 900,
        pointerEvents: 'none',
        backgroundColor: theme.ef.surfaceElevated,
        border: `1px solid ${theme.ef.borderStrong}`,
        borderRadius: `${theme.ef.radii.lg}px`,
        boxShadow: theme.ef.shadows.lg,
        width: { xs: 120, sm: 160 },
        px: 1.5,
        py: 1.25,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75
      }}
    >
      {/* Gradient bar: green (cheap) → amber (mean) → red (expensive) */}
      <Box
        data-testid="legend-gradient-bar"
        sx={{
          height: 8,
          borderRadius: `${theme.ef.radii.sm}px`,
          background: `linear-gradient(90deg, ${low} 0%, ${mid} 50%, ${high} 100%)`
        }}
      />

      {/* Price labels: min (left) / max (right) */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="numericXs" sx={{ color: 'text.primary' }}>
          {formatPrice(String(domain.min), i18n.language)}
        </Typography>
        <Typography variant="numericXs" sx={{ color: 'text.primary' }}>
          {formatPrice(String(domain.max), i18n.language)}
        </Typography>
      </Box>

      {/* Unit (muted, right-aligned) */}
      <Typography variant="numericXs" sx={{ color: 'text.disabled', textAlign: 'right' }}>
        {t('map.unit')}
      </Typography>
    </Box>
  );
}
