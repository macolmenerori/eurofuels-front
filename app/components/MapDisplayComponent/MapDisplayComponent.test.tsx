import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { CountryPriceWithIso } from '@/lib/types';
import { render, screen, waitFor } from '@/test/test-utils';

// mapbox-gl requires WebGL and DOM APIs unavailable in jsdom. Mock the entire
// module so the component mounts without throwing.
vi.mock('mapbox-gl', () => {
  const Map = vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    remove: vi.fn(),
    resize: vi.fn(),
    isStyleLoaded: vi.fn(() => false),
    getSource: vi.fn(() => undefined),
    getLayer: vi.fn(() => undefined),
    setStyle: vi.fn(),
    addSource: vi.fn(),
    addLayer: vi.fn(),
    fitBounds: vi.fn(),
    setPaintProperty: vi.fn()
  }));
  return { default: { Map, accessToken: '' } };
});

// Default fetch stub: successful GeoJSON response.
const fetchMock = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ type: 'FeatureCollection', features: [] })
  })
);

vi.stubGlobal('fetch', fetchMock);

beforeEach(() => {
  fetchMock.mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ type: 'FeatureCollection', features: [] })
    })
  );
});

// Static import — vi.mock is hoisted above imports so the mock is in place.
import MapDisplayComponent from './MapDisplayComponent';

const mockData: CountryPriceWithIso[] = [
  { country: 'Austria', gasoline: '1813', diesel: '1914', ISO_country: 'AT' },
  { country: 'Belgium', gasoline: '1888', diesel: '2111', ISO_country: 'BE' }
];

describe('MapDisplayComponent', () => {
  it('mounts without throwing and renders a container div', () => {
    const { container } = render(<MapDisplayComponent data={mockData} />);
    expect(container.querySelector('div')).toBeTruthy();
  });

  it('renders the legend unit text when valid data is supplied', () => {
    render(<MapDisplayComponent data={mockData} />);
    // MapLegend is visible when getPriceDomain returns a non-null domain.
    expect(screen.getByText('€/1000 L')).toBeTruthy();
  });

  it('renders no legend when data has no valid prices', () => {
    render(<MapDisplayComponent data={[]} />);
    expect(screen.queryByText('€/1000 L')).toBeNull();
  });

  it('shows error StatusCard when boundaries fetch returns a non-ok response', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ type: 'FeatureCollection', features: [] })
      })
    );

    render(<MapDisplayComponent data={mockData} />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeTruthy();
    });
  });

  it('shows error StatusCard when boundaries fetch rejects (network error)', async () => {
    fetchMock.mockImplementation(() => Promise.reject(new Error('Network error')));

    render(<MapDisplayComponent data={mockData} />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeTruthy();
    });
  });
});
