import { act } from 'react';

import { afterEach, describe, expect, it } from 'vitest';

import { PricesAverages } from './PricesAverages';

import i18n from '@/i18n';
import type { CountryPrice } from '@/lib/types';
import mockPrices from '@/test/mocks/mockPrices.json';
import { render, screen } from '@/test/test-utils';

const data = mockPrices as CountryPrice[];

afterEach(async () => {
  await act(async () => {
    await i18n.changeLanguage('en');
  });
});

describe('PricesAverages', () => {
  describe('titles & labels', () => {
    it('renders petrol and diesel section titles', () => {
      render(<PricesAverages data={data} />);
      expect(screen.getByText('Petrol (€/1000 L)')).toBeInTheDocument();
      expect(screen.getByText('Diesel (€/1000 L)')).toBeInTheDocument();
    });

    it('renders one Average label per section', () => {
      render(<PricesAverages data={data} />);
      expect(screen.getAllByText('Average')).toHaveLength(2);
    });
  });

  describe('cheapest & most expensive', () => {
    it('shows petrol min price (Malta 1,340.00)', () => {
      render(<PricesAverages data={data} />);
      expect(screen.getByText('1,340.00')).toBeInTheDocument();
    });

    it('shows petrol max price (Netherlands 2,388.04)', () => {
      render(<PricesAverages data={data} />);
      expect(screen.getByText('2,388.04')).toBeInTheDocument();
    });

    it('shows diesel min price (Malta 1,210.00)', () => {
      render(<PricesAverages data={data} />);
      expect(screen.getByText('1,210.00')).toBeInTheDocument();
    });

    it('shows diesel max price (Netherlands 2,284.71)', () => {
      render(<PricesAverages data={data} />);
      expect(screen.getByText('2,284.71')).toBeInTheDocument();
    });

    it('shows Malta country label in both sections (min petrol and diesel)', () => {
      render(<PricesAverages data={data} />);
      expect(screen.getAllByText('Malta')).toHaveLength(2);
    });

    it('shows Netherlands country label in both sections (max petrol and diesel)', () => {
      render(<PricesAverages data={data} />);
      expect(screen.getAllByText('Netherlands')).toHaveLength(2);
    });
  });

  describe('average computation', () => {
    const simpleData: CountryPrice[] = [
      { country: 'A', gasoline: '100', diesel: '1000' },
      { country: 'B', gasoline: '200', diesel: '2000' },
      { country: 'C', gasoline: '300', diesel: '3000' }
    ];

    it('computes petrol average correctly', () => {
      render(<PricesAverages data={simpleData} />);
      expect(screen.getByText('200.00')).toBeInTheDocument();
    });

    it('computes diesel average correctly', () => {
      render(<PricesAverages data={simpleData} />);
      expect(screen.getByText('2,000.00')).toBeInTheDocument();
    });

    it('shows correct petrol min and max', () => {
      render(<PricesAverages data={simpleData} />);
      expect(screen.getByText('100.00')).toBeInTheDocument();
      expect(screen.getByText('300.00')).toBeInTheDocument();
    });

    it('shows correct diesel min and max', () => {
      render(<PricesAverages data={simpleData} />);
      expect(screen.getByText('1,000.00')).toBeInTheDocument();
      expect(screen.getByText('3,000.00')).toBeInTheDocument();
    });

    it('shows min country A in both sections', () => {
      render(<PricesAverages data={simpleData} />);
      expect(screen.getAllByText('A')).toHaveLength(2);
    });

    it('shows max country C in both sections', () => {
      render(<PricesAverages data={simpleData} />);
      expect(screen.getAllByText('C')).toHaveLength(2);
    });

    it('does not show average country B', () => {
      render(<PricesAverages data={simpleData} />);
      expect(screen.queryByText('B')).not.toBeInTheDocument();
    });
  });

  describe('NaN filtering', () => {
    const dataWithNaN: CountryPrice[] = [
      { country: 'Z', gasoline: 'abc', diesel: 'x' },
      { country: 'Valid1', gasoline: '1000', diesel: '2000' },
      { country: 'Valid2', gasoline: '2000', diesel: '4000' }
    ];

    it('excludes NaN country from rendering', () => {
      render(<PricesAverages data={dataWithNaN} />);
      expect(screen.queryByText('Z')).not.toBeInTheDocument();
    });

    it('computes min/max/avg only from valid rows', () => {
      render(<PricesAverages data={dataWithNaN} />);
      // petrol: min=1000, avg=1500, max=2000; diesel: min=2000, avg=3000, max=4000
      expect(screen.getByText('1,000.00')).toBeInTheDocument();
      expect(screen.getByText('1,500.00')).toBeInTheDocument();
      // 2,000.00 appears as petrol max AND diesel min
      expect(screen.getAllByText('2,000.00')).toHaveLength(2);
      expect(screen.getByText('3,000.00')).toBeInTheDocument();
      expect(screen.getByText('4,000.00')).toBeInTheDocument();
    });
  });

  describe('ties — first occurrence wins', () => {
    const tiedData: CountryPrice[] = [
      { country: 'First', gasoline: '1000', diesel: '1000' },
      { country: 'Second', gasoline: '1000', diesel: '1000' },
      { country: 'Third', gasoline: '2000', diesel: '2000' }
    ];

    it('shows first country on tie for min', () => {
      render(<PricesAverages data={tiedData} />);
      expect(screen.getAllByText('First')).toHaveLength(2);
    });

    it('does not show second country when it ties min', () => {
      render(<PricesAverages data={tiedData} />);
      expect(screen.queryByText('Second')).not.toBeInTheDocument();
    });
  });

  describe('partial data — only one fuel valid', () => {
    const petrolOnlyData: CountryPrice[] = [
      { country: 'X', gasoline: '1000', diesel: 'bad' },
      { country: 'Y', gasoline: '2000', diesel: 'bad' }
    ];

    it('renders petrol section', () => {
      render(<PricesAverages data={petrolOnlyData} />);
      expect(screen.getByText('Petrol (€/1000 L)')).toBeInTheDocument();
    });

    it('does not render diesel section title', () => {
      render(<PricesAverages data={petrolOnlyData} />);
      expect(screen.queryByText('Diesel (€/1000 L)')).not.toBeInTheDocument();
    });

    it('renders only one Average label', () => {
      render(<PricesAverages data={petrolOnlyData} />);
      expect(screen.getAllByText('Average')).toHaveLength(1);
    });
  });

  describe('empty data', () => {
    it('renders nothing when data is empty', () => {
      const { container } = render(<PricesAverages data={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it('shows no Average label when data is empty', () => {
      render(<PricesAverages data={[]} />);
      expect(screen.queryByText('Average')).not.toBeInTheDocument();
    });
  });

  describe('ES locale', () => {
    it('renders ES section titles after language change', async () => {
      render(<PricesAverages data={data} />);
      await act(async () => {
        await i18n.changeLanguage('es');
      });
      expect(screen.getByText('Gasolina (€/1000 L)')).toBeInTheDocument();
      expect(screen.getByText('Gasóleo (€/1000 L)')).toBeInTheDocument();
    });

    it('renders Media label instead of Average', async () => {
      render(<PricesAverages data={data} />);
      await act(async () => {
        await i18n.changeLanguage('es');
      });
      expect(screen.getAllByText('Media')).toHaveLength(2);
    });

    it('formats numbers with ES locale (comma decimal)', async () => {
      render(<PricesAverages data={data} />);
      await act(async () => {
        await i18n.changeLanguage('es');
      });
      // Malta petrol: "1340" → "1340,00" (ES CLDR suppresses thousands sep below 10000)
      expect(screen.getByText('1340,00')).toBeInTheDocument();
    });
  });
});
