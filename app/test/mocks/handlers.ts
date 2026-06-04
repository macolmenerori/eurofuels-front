import { http, HttpResponse } from 'msw';

import mockPrices from './mockPrices.json';

export const handlers = [
  http.get(import.meta.env.VITE_COUNTRY_DATA_ENDPOINT, () => {
    return HttpResponse.json(mockPrices);
  })
];
