import { useTranslation } from 'react-i18next';

import useSWR from 'swr';

import ErrorLoadingCard from '../ErrorLoadingCard/ErrorLoadingCard';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

import PricesTableComponent from './PricesTableComponent/PricesTableComponent';
import { FuelPricesData } from './PricesTable.types';

export default function PricesTable() {
  const { t } = useTranslation();

  const FUEL_PRICES_URL = 'https://eurofuels-bucket.s3.eu-west-1.amazonaws.com/eurofuels_data.json';

  const { data, error, isLoading } = useSWR(FUEL_PRICES_URL, () =>
    fetch(FUEL_PRICES_URL).then(async (res) => {
      return res.json();
    })
  );

  return (
    <>
      {isLoading ? <LoadingSpinner position="center" /> : null}
      {error ? (
        <ErrorLoadingCard
          title={t('components.errorLoadingCard.title')}
          message={t('components.errorLoadingCard.message')}
          showReload={true}
        />
      ) : null}
      {data ? <PricesTableComponent tableData={JSON.parse(data) as FuelPricesData[]} /> : null}
    </>
  );
}
