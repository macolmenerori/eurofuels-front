import React from 'react';

import { delay, http, HttpResponse } from 'msw';
import { describe, expect, it, vi } from 'vitest';

import type { CountryPriceWithIso } from '@/lib/types';
import { server } from '@/test/mocks/server';
import { render, screen } from '@/test/test-utils';

// MapDisplayComponent imports mapbox-gl which requires WebGL — unavailable in jsdom.
// Mock the whole module with a lightweight stub so the success test can verify the
// data prop without any WebGL or fetch side-effects.
vi.mock('@/components/MapDisplayComponent/MapDisplayComponent', () => ({
  default: ({ data }: { data: CountryPriceWithIso[] }) => (
    <div data-testid="map-display">{data.length} countries</div>
  )
}));

// Static import — vi.mock is hoisted above imports so the mock is in place first.
import MapPage from './MapPage';

const ENDPOINT = import.meta.env.VITE_COUNTRY_DATA_ENDPOINT;

describe('MapPage', () => {
  describe('loading state', () => {
    it('shows the loading spinner while the request is in flight', async () => {
      // Override handler with an infinite delay so the request never resolves.
      server.use(
        http.get(ENDPOINT, async () => {
          await delay('infinite');
          return HttpResponse.json([]);
        })
      );

      render(<MapPage />);

      // Spinner should be visible synchronously on first render.
      expect(screen.getByLabelText('Loading...')).toBeInTheDocument();

      // No error card or map while loading.
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(screen.queryByTestId('map-display')).not.toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('shows the error card when the request fails', async () => {
      server.use(
        http.get(ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      render(<MapPage />);

      // StatusCard error title and message.
      expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Error loading map')).toBeInTheDocument();

      // No spinner or map on error.
      expect(screen.queryByLabelText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByTestId('map-display')).not.toBeInTheDocument();
    });
  });

  describe('success state', () => {
    it('renders the map with country data', async () => {
      render(<MapPage />);

      // Wait for MapDisplayComponent stub to appear (default handler returns 27 countries).
      const mapDisplay = await screen.findByTestId('map-display');
      expect(mapDisplay).toBeInTheDocument();
      expect(mapDisplay).toHaveTextContent('27 countries');

      // No spinner or error card once data is loaded.
      expect(screen.queryByLabelText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });
  });
});
