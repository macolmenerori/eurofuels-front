import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { formatPrice } from '@/lib/format';
import type { CountryPrice } from '@/lib/types';

type PricesTableProps = {
  data: CountryPrice[];
};

export function PricesTable({ data }: PricesTableProps): React.JSX.Element {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <Typography variant="h5" component="h2" sx={{ mb: theme.spacing(4), textAlign: 'center' }}>
        {t('stats.pricesStats.pricesTable.title')}
      </Typography>
      <TableContainer
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          bgcolor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: `${theme.ef.radii.lg}px`,
          boxShadow: theme.ef.shadows.sm,
          overflow: 'hidden',
          flexShrink: 0
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  bgcolor: theme.ef.surfaceElevated,
                  borderBottom: `2px solid ${theme.ef.borderStrong}`,
                  ...theme.typography.labelMd,
                  fontWeight: 700
                }}
              >
                {t('stats.table.country')}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: theme.ef.surfaceElevated,
                  borderBottom: `2px solid ${theme.ef.borderStrong}`,
                  ...theme.typography.labelMd,
                  fontWeight: 700
                }}
              >
                {t('stats.table.petrol')}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: theme.ef.surfaceElevated,
                  borderBottom: `2px solid ${theme.ef.borderStrong}`,
                  ...theme.typography.labelMd,
                  fontWeight: 700
                }}
              >
                {t('stats.table.diesel')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.country} hover>
                <TableCell>{row.country}</TableCell>
                <TableCell align="right">
                  <Typography variant="numericMd">
                    {formatPrice(row.gasoline, i18n.language)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="numericMd">
                    {formatPrice(row.diesel, i18n.language)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
