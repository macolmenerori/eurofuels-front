import type { CountryPriceWithIso } from '@/lib/types';

/**
 * Build a Map from ISO alpha-2 code → CountryPriceWithIso for O(1) lookup
 * inside Mapbox hover/click event handlers.
 */
export function buildPriceLookup(data: CountryPriceWithIso[]): Map<string, CountryPriceWithIso> {
  const map = new Map<string, CountryPriceWithIso>();
  for (const row of data) {
    map.set(row.ISO_country, row);
  }
  return map;
}

export interface FlipResult {
  flipX: boolean;
  flipY: boolean;
}

// Estimated tooltip dimensions used for edge detection (pixels).
const DEFAULT_TT_W = 160;
const DEFAULT_TT_H = 88;
// Gap between the cursor/tap point and the tooltip edge.
const GAP = 8;

/**
 * Determine whether the tooltip should flip horizontally/vertically to avoid
 * clipping against the container edges.
 *
 * @param x          Cursor/tap x in px, relative to container
 * @param y          Cursor/tap y in px, relative to container
 * @param containerW Container width in px
 * @param containerH Container height in px
 * @param ttW        Estimated tooltip width  (defaults to 160)
 * @param ttH        Estimated tooltip height (defaults to 88)
 */
export function computeFlip(
  x: number,
  y: number,
  containerW: number,
  containerH: number,
  ttW: number = DEFAULT_TT_W,
  ttH: number = DEFAULT_TT_H
): FlipResult {
  return {
    flipX: x + GAP + ttW > containerW,
    flipY: y - GAP - ttH < 0
  };
}
