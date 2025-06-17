import { Stack } from '@mui/material';

import FooterComponent from '@/components/FooterComponent/FooterComponent';
import HeaderComponent from '@/components/HeaderComponent/HeaderComponent';
import { Navbar } from '@/components/Navbar/Navbar';
import PricesTable from '@/components/PricesTable/PricesTable';

export function MainLayout() {
  return (
    <Stack spacing={3}>
      <header>
        <Navbar />
      </header>
      <main>
        <HeaderComponent />
        <PricesTable />
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </Stack>
  );
}
