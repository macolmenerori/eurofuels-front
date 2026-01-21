import { HelmetProvider } from 'react-helmet-async';

import { CssBaseline } from '@mui/material';

import { MainLayout } from '@/ui/MainLayout/MainLayout';
import { ThemeProvider } from '@/ui/theme/ThemeContext';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <CssBaseline />
        <MainLayout />
      </ThemeProvider>
    </HelmetProvider>
  );
}
