import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { AppBar, Box, Stack, Typography } from '@mui/material';

import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

export function Navbar() {
  return (
    <AppBar position="static" component="nav" sx={{ padding: '0.35rem 1rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1}>
          <LocalGasStationIcon />
          <Typography textAlign="center" justifySelf="center" color="textSecondary" variant="h5">
            Eurofuels
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignSelf="end">
          <LanguageSwitcher />
          <ThemeToggle />
        </Stack>
      </Box>
    </AppBar>
  );
}
