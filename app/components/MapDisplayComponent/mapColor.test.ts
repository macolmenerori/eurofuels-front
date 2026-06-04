import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { describe, expect, it } from 'vitest';

import { buildFillColor, getPriceDomain, mergePrices } from './mapColor';

import type { CountryPriceWithIso } from '@/lib/types';

// ─── Fixtures ────────────────────────────────────────────────────────────────

const makeRow = (country: string, iso: string, gasoline: string): CountryPriceWithIso => ({
  country,
  gasoline,
  diesel: '1500',
  ISO_country: iso
});

const makeGeojson = (
  features: Array<{ name: string; iso: string }>
): FeatureCollection<Geometry, GeoJsonProperties> => ({
  type: 'FeatureCollection',
  features: features.map(({ name, iso }) => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [0, 0] },
    properties: { NAME: name, ISO_A2: iso }
  }))
});

// ─── getPriceDomain ───────────────────────────────────────────────────────────

describe('getPriceDomain', () => {
  it('returns null for empty data', () => {
    expect(getPriceDomain([])).toBeNull();
  });

  it('drops NaN rows and returns null when all prices are invalid', () => {
    const data = [makeRow('A', 'AT', 'N/A'), makeRow('B', 'BE', '')];
    expect(getPriceDomain(data)).toBeNull();
  });

  it('drops NaN rows and computes domain from valid prices', () => {
    const data = [
      makeRow('A', 'AT', '1000'),
      makeRow('B', 'BE', '2000'),
      makeRow('C', 'CY', 'N/A')
    ];
    const result = getPriceDomain(data);
    expect(result).not.toBeNull();
    expect(result!.min).toBe(1000);
    expect(result!.max).toBe(2000);
    expect(result!.mean).toBe(1500);
  });

  it('computes correct arithmetic mean', () => {
    const data = [
      makeRow('A', 'AT', '1000'),
      makeRow('B', 'BE', '2000'),
      makeRow('C', 'CY', '3000')
    ];
    const result = getPriceDomain(data);
    expect(result!.mean).toBeCloseTo(2000);
  });

  it('nudges degenerate domain (all prices identical) so stops are strictly ascending', () => {
    const data = [makeRow('A', 'AT', '1500'), makeRow('B', 'BE', '1500')];
    const result = getPriceDomain(data);
    expect(result).not.toBeNull();
    expect(result!.min).toBeLessThan(result!.mean);
    expect(result!.mean).toBeLessThanOrEqual(result!.max);
    expect(result!.min).toBeLessThan(result!.max);
  });

  it('clamps mean strictly between min and max', () => {
    const data = [makeRow('A', 'AT', '1000'), makeRow('B', 'BE', '2000')];
    const result = getPriceDomain(data);
    expect(result!.mean).toBeGreaterThan(result!.min);
    expect(result!.mean).toBeLessThan(result!.max);
  });
});

// ─── mergePrices ─────────────────────────────────────────────────────────────

describe('mergePrices', () => {
  it('attaches numeric gasoline to matched features', () => {
    const geojson = makeGeojson([{ name: 'Austria', iso: 'AT' }]);
    const data = [makeRow('Austria', 'AT', '1813')];
    const result = mergePrices(geojson, data);
    expect(result.features[0].properties?.gasoline).toBe(1813);
  });

  it('leaves unmatched features without gasoline property', () => {
    const geojson = makeGeojson([{ name: 'Austria', iso: 'AT' }]);
    const data = [makeRow('Belgium', 'BE', '1888')];
    const result = mergePrices(geojson, data);
    expect(result.features[0].properties?.gasoline).toBeUndefined();
  });

  it('does not attach gasoline when price is NaN', () => {
    const geojson = makeGeojson([{ name: 'Austria', iso: 'AT' }]);
    const data = [makeRow('Austria', 'AT', 'N/A')];
    const result = mergePrices(geojson, data);
    expect(result.features[0].properties?.gasoline).toBeUndefined();
  });

  it('preserves existing properties', () => {
    const geojson = makeGeojson([{ name: 'Austria', iso: 'AT' }]);
    const data = [makeRow('Austria', 'AT', '1813')];
    const result = mergePrices(geojson, data);
    expect(result.features[0].properties?.NAME).toBe('Austria');
    expect(result.features[0].properties?.ISO_A2).toBe('AT');
  });

  it('does not mutate the original geojson', () => {
    const geojson = makeGeojson([{ name: 'Austria', iso: 'AT' }]);
    const original = JSON.stringify(geojson);
    mergePrices(geojson, [makeRow('Austria', 'AT', '1813')]);
    expect(JSON.stringify(geojson)).toBe(original);
  });
});

// ─── buildFillColor ───────────────────────────────────────────────────────────

describe('buildFillColor', () => {
  const domain = { min: 1000, mean: 1500, max: 2000 };
  const scale = { low: '#00ff00', mid: '#ffff00', high: '#ff0000', neutral: '#888888' };

  it('returns a case expression as the root', () => {
    const expr = buildFillColor(domain, scale);
    expect(expr[0]).toBe('case');
  });

  it('uses ["has","gasoline"] as the condition', () => {
    const expr = buildFillColor(domain, scale);
    expect(expr[1]).toEqual(['has', 'gasoline']);
  });

  it('places an interpolate expression as the truthy branch', () => {
    const expr = buildFillColor(domain, scale);
    const interpolate = expr[2] as unknown[];
    expect(interpolate[0]).toBe('interpolate');
  });

  it('encodes min→low, mean→mid, max→high in the interpolate stops', () => {
    const expr = buildFillColor(domain, scale);
    const interpolate = expr[2] as unknown[];
    // interpolate structure: ['interpolate', ['linear'], ['get','gasoline'], min, low, mean, mid, max, high]
    expect(interpolate[3]).toBe(domain.min);
    expect(interpolate[4]).toBe(scale.low);
    expect(interpolate[5]).toBe(domain.mean);
    expect(interpolate[6]).toBe(scale.mid);
    expect(interpolate[7]).toBe(domain.max);
    expect(interpolate[8]).toBe(scale.high);
  });

  it('uses neutral fill as the falsy branch', () => {
    const expr = buildFillColor(domain, scale);
    expect(expr[3]).toBe(scale.neutral);
  });
});
