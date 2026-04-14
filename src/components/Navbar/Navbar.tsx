import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { AppBar, Box, Stack, Typography } from '@mui/material';

import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

export function Navbar() {
  return (
    <AppBar position="static" component="nav" sx={{ padding: '0.35rem 1rem' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Stack direction="row" spacing={1}>
          <LocalGasStationIcon />
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              justifySelf: 'center',
              color: 'text.secondary'
            }}
          >
            Eurofuels
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignSelf: 'end',
            alignItems: 'center'
          }}
        >
          <LanguageSwitcher />
          <ThemeToggle />
        </Stack>
      </Box>
    </AppBar>
  );
}
