import React from 'react';

import { describe, expect, it, vi } from 'vitest';

import type { CountryPriceWithIso } from '@/lib/types';
import { render, screen } from '@/test/test-utils';

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

// Prevent actual fetch calls for the geojson file during tests.
vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ type: 'FeatureCollection', features: [] })
    })
  )
);

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

  it('renders no visible text — the map is a canvas-only surface', () => {
    render(<MapDisplayComponent data={mockData} />);
    expect(screen.queryByText(/\w+/)).toBeNull();
  });
});
