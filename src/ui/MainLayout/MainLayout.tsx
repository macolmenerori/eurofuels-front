import Stack from '@mui/material/Stack';

import FooterComponent from '@/components/FooterComponent/FooterComponent';
import HeaderComponent from '@/components/HeaderComponent/HeaderComponent';
import { Navbar } from '@/components/Navbar/Navbar';
import PricesTable from '@/components/PricesTable/PricesTable';
import { JsonLd, SEOHead } from '@/components/SEOHead';

export function MainLayout() {
  return (
    <>
      <SEOHead />
      <JsonLd />
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
    </>
  );
}
