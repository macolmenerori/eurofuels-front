import { AppBar, Box } from '@mui/material';

import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export function Navbar() {
  return (
    <AppBar position="static" component="nav" sx={{ padding: '0.35rem 1rem' }}>
      <Box sx={{ alignSelf: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <LanguageSwitcher />
          <ThemeToggle />
        </Box>
      </Box>
    </AppBar>
  );
}
