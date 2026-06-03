import { PricesAverages } from './PricesAverages/PricesAverages';
import { PricesTable } from './PricesTable/PricesTable';

import { CountryPrice } from '@/lib/types';

interface PricesStatsProps {
  data: CountryPrice[];
}

export function PricesStats({ data }: PricesStatsProps) {
  return (
    <>
      <PricesAverages data={data} />
      <PricesTable data={data} />
    </>
  );
}
