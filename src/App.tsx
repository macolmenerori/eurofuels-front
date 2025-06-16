import { CssBaseline } from '@mui/material';

import { MainLayoutProvider } from '@/ui/MainLayout/MainLayoutProvider';
import { ThemeProvider } from '@/ui/theme/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <MainLayoutProvider>
        <h1>Hello Eurofuels Refactor!</h1>
      </MainLayoutProvider>
    </ThemeProvider>
  );
}
