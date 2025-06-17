import { Stack } from '@mui/material';

import HeaderComponent from '@/components/HeaderComponent/HeaderComponent';
import { Navbar } from '@/components/Navbar/Navbar';
import PricesTable from '@/components/PricesTable/PricesTable';

export function MainLayout() {
  return (
    <Stack spacing={3}>
      <Navbar />
      <main>
        <HeaderComponent />
        <PricesTable />
      </main>
      <footer>{/* TODO: footer with copyright & sponsor button */}</footer>
    </Stack>
  );
}
