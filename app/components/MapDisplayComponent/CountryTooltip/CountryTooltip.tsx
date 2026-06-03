import React from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { formatPrice } from '@/lib/format';

// Pixel gap between cursor/tap point and the tooltip edge.
const GAP = 8;

export interface CountryTooltipProps {
  name: string;
  gasoline: string;
  diesel: string;
  x: number;
  y: number;
  flipX: boolean;
  flipY: boolean;
}

export default function CountryTooltip({
  name,
  gasoline,
  diesel,
  x,
  y,
  flipX,
  flipY
}: CountryTooltipProps): React.JSX.Element {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  // Default: tooltip appears right of and above the cursor point.
  // flipX: shift to the left of the cursor.
  // flipY: shift below the cursor instead of above.
  const translateX = flipX ? '-100%' : '0';
  const translateY = flipY ? '0' : '-100%';

  return (
    <Box
      sx={{
        position: 'absolute',
        left: x + (flipX ? -GAP : GAP),
        top: y + (flipY ? GAP : -GAP),
        transform: `translate(${translateX}, ${translateY})`,
        pointerEvents: 'none',
        zIndex: 1000,
        backgroundColor: theme.ef.surfaceElevated,
        border: `1px solid ${theme.ef.borderStrong}`,
        borderRadius: `${theme.ef.radii.lg}px`,
        boxShadow: theme.ef.shadows.lg,
        minWidth: 144,
        px: 1.5,
        pt: 1.25,
        pb: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75
      }}
    >
      {/* Country name */}
      <Typography variant="labelMd" sx={{ color: 'text.primary', display: 'block' }}>
        {name}
      </Typography>

      {/* Divider */}
      <Box sx={{ height: '1px', backgroundColor: 'divider', mx: -1.5 }} />

      {/* Price rows */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}
        >
          <Typography variant="labelSm" sx={{ color: 'text.secondary' }}>
            {t('map.gasoline')}
          </Typography>
          <Typography variant="numericSm" sx={{ color: 'text.primary' }}>
            {formatPrice(gasoline, i18n.language)}
          </Typography>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}
        >
          <Typography variant="labelSm" sx={{ color: 'text.secondary' }}>
            {t('map.diesel')}
          </Typography>
          <Typography variant="numericSm" sx={{ color: 'text.primary' }}>
            {formatPrice(diesel, i18n.language)}
          </Typography>
        </Box>
      </Box>

      {/* Unit (muted, right-aligned) */}
      <Typography variant="numericXs" sx={{ color: 'text.disabled', textAlign: 'right' }}>
        {t('map.unit')}
      </Typography>
    </Box>
  );
}
