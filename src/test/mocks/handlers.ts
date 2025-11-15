import { http, HttpResponse } from 'msw';

import { FuelPricesData } from '@/components/PricesTable/PricesTable.types';

// Mock data that matches your API response structure
const mockFuelPricesData: FuelPricesData[] = [
  {
    country: 'Germany',
    gasoline: '1.65',
    diesel: '1.45'
  },
  {
    country: 'France',
    gasoline: '1.70',
    diesel: '1.50'
  },
  {
    country: 'Italy',
    gasoline: '1.75',
    diesel: '1.55'
  },
  {
    country: 'Spain',
    gasoline: '1.60',
    diesel: '1.40'
  }
];

export const handlers = [
  // Mock the fuel prices API
  http.get('https://eurofuels-bucket.s3.eu-west-1.amazonaws.com/eurofuels_data.json', () => {
    // Return the mock data as JSON string (since your component calls JSON.parse)
    return HttpResponse.json(mockFuelPricesData);
  }),

  // Handler for error scenarios
  http.get('https://eurofuels-bucket.s3.eu-west-1.amazonaws.com/eurofuels_data_error.json', () => {
    return HttpResponse.error();
  })
];
