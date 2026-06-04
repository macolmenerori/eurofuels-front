import React from 'react';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

export type StatusCardStatus = 'success' | 'warning' | 'error' | 'info';

type StatusCardProps = {
  status: StatusCardStatus;
  title: string;
  message?: string;
  sx?: SxProps<Theme>;
};

const ICON_MAP = {
  success: CheckCircleOutlinedIcon,
  warning: WarningAmberIcon,
  error: ErrorOutlinedIcon,
  info: InfoOutlinedIcon
} as const;

export function StatusCard({ status, title, message, sx }: StatusCardProps): React.JSX.Element {
  const theme = useTheme();
  const tokens = theme.ef.status[status];
  const Icon = ICON_MAP[status];

  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        maxWidth: 600,
        width: '100%',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        padding: theme.spacing(4),
        borderRadius: `${theme.ef.radii.lg}px`,
        backgroundColor: tokens.bg,
        border: `1px solid ${tokens.border}`,
        color: tokens.text,
        ...sx
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(2) }}>
        <Icon sx={{ fontSize: 16, color: tokens.border }} aria-hidden="true" />
        <Typography
          variant="headlineSm"
          component="span"
          sx={{ color: tokens.text, lineHeight: 1.1 }}
        >
          {title}
        </Typography>
      </Box>

      {message !== undefined && (
        <Typography
          variant="bodySm"
          component="p"
          sx={{ color: tokens.text, m: 0, pl: theme.spacing(6) }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}
