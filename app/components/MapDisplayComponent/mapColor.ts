import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import type { ExpressionSpecification } from 'mapbox-gl';

import type { CountryPriceWithIso } from '@/lib/types';

export interface PriceDomain {
  min: number;
  mean: number;
  max: number;
}

export interface MapScale {
  low: string;
  mid: string;
  high: string;
  neutral: string;
}

/**
 * Compute min, arithmetic mean, and max from the gasoline prices in the
 * dataset. Non-numeric values are dropped. Returns null when no valid prices
 * exist (caller should fall back to a neutral flat fill).
 */
export function getPriceDomain(data: CountryPriceWithIso[]): PriceDomain | null {
  const prices = data.map((row) => parseFloat(row.gasoline)).filter((n) => Number.isFinite(n));

  if (prices.length === 0) return null;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const mean = prices.reduce((sum, n) => sum + n, 0) / prices.length;

  // Degenerate domain (all prices identical): nudge so interpolate stops are
  // strictly ascending — mapbox requires distinct stop values.
  if (min === max) {
    return { min: min - 0.001, mean, max: max + 0.001 };
  }

  // Clamp mean strictly between min and max to avoid floating-point edge cases.
  const clampedMean = Math.min(Math.max(mean, min + 0.0001), max - 0.0001);
  return { min, mean: clampedMean, max };
}

/**
 * Clone the FeatureCollection and attach a numeric `gasoline` property to each
 * feature whose `ISO_A2` matches an entry in `data`. Features with no match or
 * an unparseable price are left without the property so the fill-color
 * expression can apply a neutral fallback via `['has', 'gasoline']`.
 */
export function mergePrices(
  geojson: FeatureCollection<Geometry, GeoJsonProperties>,
  data: CountryPriceWithIso[]
): FeatureCollection<Geometry, GeoJsonProperties> {
  const priceByIso = new Map<string, number>();
  for (const row of data) {
    const price = parseFloat(row.gasoline);
    if (Number.isFinite(price)) {
      priceByIso.set(row.ISO_country, price);
    }
  }

  return {
    ...geojson,
    features: geojson.features.map((feature) => {
      const iso = feature.properties?.ISO_A2 as string | undefined;
      const price = iso !== undefined ? priceByIso.get(iso) : undefined;
      if (price === undefined) return feature;
      return { ...feature, properties: { ...feature.properties, gasoline: price } };
    })
  };
}

/**
 * Build a Mapbox GL expression for `fill-color`:
 * - If the feature has a `gasoline` property, interpolate linearly between
 *   low (min price) → mid (mean) → high (max price).
 * - Otherwise, render the neutral fill color.
 */
export function buildFillColor(domain: PriceDomain, scale: MapScale): ExpressionSpecification {
  return [
    'case',
    ['has', 'gasoline'],
    [
      'interpolate',
      ['linear'],
      ['get', 'gasoline'],
      domain.min,
      scale.low,
      domain.mean,
      scale.mid,
      domain.max,
      scale.high
    ],
    scale.neutral
  ];
}
