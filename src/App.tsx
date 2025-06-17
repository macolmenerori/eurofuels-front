import { CssBaseline } from '@mui/material';

import { MainLayout } from '@/ui/MainLayout/MainLayout';
import { ThemeProvider } from '@/ui/theme/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <MainLayout />
    </ThemeProvider>
  );
}
