import { describe, expect, it } from 'vitest';

import { buildPriceLookup, computeFlip } from './tooltipHelpers';

import type { CountryPriceWithIso } from '@/lib/types';

const mockData: CountryPriceWithIso[] = [
  { country: 'Austria', gasoline: '1813', diesel: '1914', ISO_country: 'AT' },
  { country: 'Belgium', gasoline: '1888', diesel: '2111', ISO_country: 'BE' }
];

describe('buildPriceLookup', () => {
  it('maps ISO codes to their rows', () => {
    const lookup = buildPriceLookup(mockData);
    expect(lookup.get('AT')?.country).toBe('Austria');
    expect(lookup.get('BE')?.gasoline).toBe('1888');
    expect(lookup.get('BE')?.diesel).toBe('2111');
  });

  it('returns undefined for an unknown ISO code', () => {
    const lookup = buildPriceLookup(mockData);
    expect(lookup.get('DE')).toBeUndefined();
  });

  it('returns an empty map for empty data', () => {
    expect(buildPriceLookup([]).size).toBe(0);
  });

  it('size equals number of rows', () => {
    const lookup = buildPriceLookup(mockData);
    expect(lookup.size).toBe(mockData.length);
  });
});

describe('computeFlip', () => {
  it('does not flip when cursor is near the center', () => {
    const { flipX, flipY } = computeFlip(500, 300, 1000, 600);
    expect(flipX).toBe(false);
    expect(flipY).toBe(false);
  });

  it('flips X when cursor is near the right edge', () => {
    // x + GAP(8) + ttW(160) = 900 + 168 = 1068 > 1000 → flip
    const { flipX } = computeFlip(900, 300, 1000, 600);
    expect(flipX).toBe(true);
  });

  it('does not flip X when cursor has enough space on the right', () => {
    // x + GAP(8) + ttW(160) = 100 + 168 = 268 < 1000 → no flip
    const { flipX } = computeFlip(100, 300, 1000, 600);
    expect(flipX).toBe(false);
  });

  it('flips Y when cursor is near the top edge', () => {
    // y - GAP(8) - ttH(88) = 50 - 96 = -46 < 0 → flip
    const { flipY } = computeFlip(500, 50, 1000, 600);
    expect(flipY).toBe(true);
  });

  it('does not flip Y when cursor has enough space above', () => {
    // y - GAP(8) - ttH(88) = 300 - 96 = 204 > 0 → no flip
    const { flipY } = computeFlip(500, 300, 1000, 600);
    expect(flipY).toBe(false);
  });

  it('flips both near the top-right corner', () => {
    const { flipX, flipY } = computeFlip(950, 30, 1000, 600);
    expect(flipX).toBe(true);
    expect(flipY).toBe(true);
  });

  it('respects custom ttW and ttH overrides', () => {
    // With ttW=50: x + GAP(8) + ttW(50) = 900 + 58 = 958 < 1000 → no flip
    const { flipX } = computeFlip(900, 300, 1000, 600, 50, 30);
    expect(flipX).toBe(false);
  });
});
