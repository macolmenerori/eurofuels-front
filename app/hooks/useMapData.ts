import { useMemo } from 'react';

import useSWR from 'swr';

import { countryToIso } from '@/lib/countryIso';
import { fetcher } from '@/lib/fetcher';
import type { CountryPrice, CountryPriceWithIso } from '@/lib/types';

export interface UseMapDataResult {
  data: CountryPriceWithIso[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

/**
 * Fetches EU fuel price data and enriches each row with an ISO_country field
 * (ISO 3166-1 alpha-2) derived from the English country name. Rows whose country
 * name cannot be mapped are dropped — the map layer can only render known codes.
 */
export function useMapData(): UseMapDataResult {
  const {
    data: rawData,
    isLoading,
    error
  } = useSWR<CountryPrice[]>(import.meta.env.VITE_COUNTRY_DATA_ENDPOINT, fetcher);

  const data = useMemo<CountryPriceWithIso[] | undefined>(() => {
    if (rawData === undefined) return undefined;

    return rawData.reduce<CountryPriceWithIso[]>((acc, row) => {
      const iso = countryToIso(row.country);
      if (iso !== undefined) {
        acc.push({ ...row, ISO_country: iso });
      }
      return acc;
    }, []);
  }, [rawData]);

  return { data, isLoading, error };
}
