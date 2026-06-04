import { delay, http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import StatsPage from './StatsPage';

import { server } from '@/test/mocks/server';
import { render, screen } from '@/test/test-utils';

const ENDPOINT = import.meta.env.VITE_COUNTRY_DATA_ENDPOINT;

describe('StatsPage', () => {
  describe('title', () => {
    it('renders the page title', async () => {
      render(<StatsPage />);
      // Title is always present regardless of fetch state; wait for it to appear.
      expect(await screen.findByText('Fuel Prices Stats in the EU')).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('shows the loading spinner while the request is in flight', async () => {
      // Override handler with an infinite delay so the request never resolves.
      server.use(
        http.get(ENDPOINT, async () => {
          await delay('infinite');
          return HttpResponse.json([]);
        })
      );

      render(<StatsPage />);

      // Spinner should be visible synchronously on first render.
      expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
    });
  });

  describe('success state', () => {
    it('renders the prices table with country data', async () => {
      render(<StatsPage />);

      // Wait for the table to populate (default handler returns mockPrices).
      expect(await screen.findByText('Austria')).toBeInTheDocument();

      // No spinner or error card once data is loaded.
      expect(screen.queryByLabelText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });

    it('renders all 27 country rows', async () => {
      render(<StatsPage />);

      await screen.findByText('Austria');

      // One header row + 27 data rows.
      expect(screen.getAllByRole('row')).toHaveLength(28);
    });
  });

  describe('error state', () => {
    it('shows the error card when the request fails', async () => {
      server.use(
        http.get(ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      render(<StatsPage />);

      // StatusCard error title and message.
      expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Error fetching data')).toBeInTheDocument();

      // No spinner or table.
      expect(screen.queryByLabelText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });
});
