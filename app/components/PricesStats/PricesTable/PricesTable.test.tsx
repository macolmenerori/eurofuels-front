import { act } from 'react';

import { afterEach, describe, expect, it } from 'vitest';

import { PricesTable } from './PricesTable';

import i18n from '@/i18n';
import type { CountryPrice } from '@/lib/types';
import mockPrices from '@/test/mocks/mockPrices.json';
import { render, screen } from '@/test/test-utils';

const data = mockPrices as CountryPrice[];

afterEach(async () => {
  // Always restore EN so locale state doesn't leak between tests.
  await act(async () => {
    await i18n.changeLanguage('en');
  });
});

describe('PricesTable', () => {
  describe('headers', () => {
    it('renders EN column headers', () => {
      render(<PricesTable data={data} />);
      expect(screen.getByText('Prices by Country')).toBeInTheDocument();
      expect(screen.getByText('Country')).toBeInTheDocument();
      expect(screen.getByText('Petrol (€/1000 L)')).toBeInTheDocument();
      expect(screen.getByText('Diesel (€/1000 L)')).toBeInTheDocument();
    });

    it('renders ES column headers after language change', async () => {
      render(<PricesTable data={data} />);
      await act(async () => {
        await i18n.changeLanguage('es');
      });
      expect(screen.getByText('Precios por país')).toBeInTheDocument();
      expect(screen.getByText('País')).toBeInTheDocument();
      expect(screen.getByText('Gasolina (€/1000 L)')).toBeInTheDocument();
      expect(screen.getByText('Gasóleo (€/1000 L)')).toBeInTheDocument();
    });
  });

  describe('rows', () => {
    it('renders one row per country plus the header row', () => {
      render(<PricesTable data={data} />);
      // getAllByRole('row') returns header + 27 data rows = 28
      expect(screen.getAllByRole('row')).toHaveLength(data.length + 1);
    });

    it('renders every country name', () => {
      render(<PricesTable data={data} />);
      for (const row of data) {
        expect(screen.getByText(row.country)).toBeInTheDocument();
      }
    });
  });

  describe('number formatting — EN locale', () => {
    it('formats integer price to 2 decimal places with thousands separator', () => {
      render(<PricesTable data={data} />);
      // Austria gasoline: "1813" → "1,813.00"
      expect(screen.getByText('1,813.00')).toBeInTheDocument();
    });

    it('preserves existing 2-decimal price', () => {
      render(<PricesTable data={data} />);
      // Belgium diesel: "2111.86" → "2,111.86"
      expect(screen.getByText('2,111.86')).toBeInTheDocument();
    });

    it('rounds long-decimal price to 2 dp', () => {
      render(<PricesTable data={data} />);
      // Denmark gasoline: "2338.993483467812" → "2,338.99"
      expect(screen.getByText('2,338.99')).toBeInTheDocument();
    });
  });

  describe('number formatting — ES locale', () => {
    it('uses comma decimal separator after language change', async () => {
      render(<PricesTable data={data} />);
      await act(async () => {
        await i18n.changeLanguage('es');
      });
      // Austria gasoline: "1813" → "1813,00" (ES CLDR minimumGroupingDigits=2 suppresses thousands sep)
      expect(screen.getByText('1813,00')).toBeInTheDocument();
    });

    it('rounds long-decimal price to 2 dp in ES locale', async () => {
      render(<PricesTable data={data} />);
      await act(async () => {
        await i18n.changeLanguage('es');
      });
      // Denmark gasoline: "2338.993483467812" → "2338,99"
      expect(screen.getByText('2338,99')).toBeInTheDocument();
    });
  });

  describe('empty data', () => {
    it('still renders headers with an empty dataset', () => {
      render(<PricesTable data={[]} />);
      expect(screen.getByText('Country')).toBeInTheDocument();
      expect(screen.getByText('Petrol (€/1000 L)')).toBeInTheDocument();
      expect(screen.getByText('Diesel (€/1000 L)')).toBeInTheDocument();
    });

    it('renders only the header row when data is empty', () => {
      render(<PricesTable data={[]} />);
      expect(screen.getAllByRole('row')).toHaveLength(1);
    });
  });
});
