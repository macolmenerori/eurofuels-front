import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { SWRConfig } from 'swr';
import { describe, expect, it } from 'vitest';

import { useMapData } from './useMapData';

import { server } from '@/test/mocks/server';

const ENDPOINT = import.meta.env.VITE_COUNTRY_DATA_ENDPOINT;

/** Isolated SWR cache per test — mirrors the SWRConfig in test-utils. */
function wrapper({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <SWRConfig
      value={{ provider: () => new Map(), dedupingInterval: 0, shouldRetryOnError: false }}
    >
      {children}
    </SWRConfig>
  );
}

describe('useMapData', () => {
  describe('loading state', () => {
    it('starts with isLoading true and no data', async () => {
      server.use(
        http.get(ENDPOINT, async () => {
          await delay('infinite');
          return HttpResponse.json([]);
        })
      );

      const { result } = renderHook(() => useMapData(), { wrapper });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeUndefined();
    });
  });

  describe('success state', () => {
    it('resolves with data for all 27 countries', async () => {
      const { result } = renderHook(() => useMapData(), { wrapper });

      await waitFor(() => expect(result.current.data).toBeDefined());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();
      expect(result.current.data).toHaveLength(27);
    });

    it('adds a 2-letter ISO_country to every row', async () => {
      const { result } = renderHook(() => useMapData(), { wrapper });

      await waitFor(() => expect(result.current.data).toBeDefined());

      const data = result.current.data!;
      for (const row of data) {
        expect(row.ISO_country).toMatch(/^[A-Z]{2}$/);
      }
    });

    it('maps Belgium to BE', async () => {
      const { result } = renderHook(() => useMapData(), { wrapper });

      await waitFor(() => expect(result.current.data).toBeDefined());

      const belgium = result.current.data!.find((r) => r.country === 'Belgium');
      expect(belgium).toBeDefined();
      expect(belgium!.ISO_country).toBe('BE');
    });

    it('preserves original country fields', async () => {
      const { result } = renderHook(() => useMapData(), { wrapper });

      await waitFor(() => expect(result.current.data).toBeDefined());

      const belgium = result.current.data!.find((r) => r.country === 'Belgium')!;
      expect(belgium.gasoline).toBe('1888.77');
      expect(belgium.diesel).toBe('2111.86');
    });
  });

  describe('error state', () => {
    it('sets error and returns no data when the request fails', async () => {
      server.use(
        http.get(ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const { result } = renderHook(() => useMapData(), { wrapper });

      await waitFor(() => expect(result.current.error).toBeDefined());

      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('unmapped country handling', () => {
    it('drops rows with unknown country names', async () => {
      server.use(
        http.get(ENDPOINT, () => {
          return HttpResponse.json([
            { country: 'Belgium', gasoline: '1888.77', diesel: '2111.86' },
            { country: 'Narnia', gasoline: '999', diesel: '888' }
          ]);
        })
      );

      const { result } = renderHook(() => useMapData(), { wrapper });

      await waitFor(() => expect(result.current.data).toBeDefined());

      expect(result.current.data).toHaveLength(1);
      expect(result.current.data![0].country).toBe('Belgium');
    });
  });
});
