import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import type { GeoJSONSource, Map as MapboxMap } from 'mapbox-gl';

import CountryTooltip from './CountryTooltip';
import { buildFillColor, getPriceDomain, mergePrices } from './mapColor';
import { buildPriceLookup, computeFlip } from './tooltipHelpers';

import type { CountryPriceWithIso } from '@/lib/types';
import { useThemeMode } from '@/ui/ThemeModeProvider';

// EU bounding box [SW, NE] used for fitBounds.
const EU_BOUNDS: [[number, number], [number, number]] = [
  [-25, 34],
  [45, 72]
];

function getStyleUrl(mode: 'dark' | 'light'): string {
  return mode === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11';
}

interface MapDisplayComponentProps {
  data: CountryPriceWithIso[];
}

interface HoverState {
  iso: string;
  /** GeoJSON feature NAME — used as fallback when no price row exists for the ISO. */
  name: string;
  x: number;
  y: number;
  flipX: boolean;
  flipY: boolean;
}

export default function MapDisplayComponent({ data }: MapDisplayComponentProps): React.JSX.Element {
  const theme = useTheme();
  const { mode } = useThemeMode();

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const geojsonRef = useRef<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);

  // Refs that keep the latest values accessible inside async callbacks and
  // event handlers without requiring effect re-runs.
  const dataRef = useRef(data);
  const modeRef = useRef(mode);
  const themeRef = useRef(theme);

  // ─── Tooltip state ───────────────────────────────────────────────────────────
  const [hoverState, setHoverState] = useState<HoverState | null>(null);
  // Mirror of hoverState readable inside Mapbox event handlers without stale closures.
  const hoverStateRef = useRef<HoverState | null>(null);

  // O(1) ISO→row lookup built once per data update; used in render to get prices.
  const lookup = useMemo(() => buildPriceLookup(data), [data]);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // ─── Init effect (mount only) ────────────────────────────────────────────────
  // Dynamic import keeps mapbox-gl out of the SSR eval graph; the prerendered
  // '/' route would crash with "window is not defined" otherwise.
  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    let mapInstance: MapboxMap | null = null;
    let resizeObserver: ResizeObserver | null = null;

    function addEuLayers(map: MapboxMap): void {
      const t = themeRef.current;
      const d = dataRef.current;
      const rawGj = geojsonRef.current;
      if (!rawGj) return;

      const merged = mergePrices(rawGj, d);
      const domain = getPriceDomain(d);
      const { fill, stroke, scale } = t.ef.map;
      const fillExpr = domain ? buildFillColor(domain, { ...scale, neutral: fill }) : fill;

      map.addSource('eu', { type: 'geojson', data: merged });
      map.addLayer({
        id: 'eu-fill',
        type: 'fill',
        source: 'eu',
        paint: { 'fill-color': fillExpr, 'fill-opacity': 1 }
      });
      map.addLayer({
        id: 'eu-line',
        type: 'line',
        source: 'eu',
        paint: { 'line-color': stroke, 'line-width': 0.75 }
      });

      map.fitBounds(EU_BOUNDS, { padding: 20, animate: false });
    }

    void (async () => {
      const [{ default: mapboxgl }, rawGeojson] = await Promise.all([
        import('mapbox-gl'),
        fetch('/data/eu_boundaries.json').then(
          (r) => r.json() as Promise<FeatureCollection<Geometry, GeoJsonProperties>>
        )
      ]);

      if (cancelled || !containerRef.current) return;

      geojsonRef.current = rawGeojson;
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: getStyleUrl(modeRef.current),
        minZoom: 2,
        maxZoom: 10,
        maxBounds: [
          [-50, 20],
          [70, 80]
        ],
        dragRotate: false,
        pitchWithRotate: false,
        touchPitch: false
      });

      // 'style.load' fires after every style load (initial + setStyle calls).
      // Re-add source and layers each time so theme swaps don't wipe them.
      map.on('style.load', () => {
        addEuLayers(map);
      });

      mapRef.current = map;
      mapInstance = map;

      // ─── Hover / touch tooltip handlers ─────────────────────────────────────
      // Bind once at mount; layer-scoped listeners fire whenever the 'eu-fill'
      // layer is present (re-added after every setStyle theme swap by the
      // style.load handler above). Gate by pointer capability so touch devices
      // use click instead of mousemove, avoiding stuck "ghost" tooltips.
      const coarse = window.matchMedia('(hover: none)').matches;

      if (!coarse) {
        // Desktop / fine-pointer: tooltip follows cursor.
        map.on('mousemove', 'eu-fill', (e) => {
          const feature = e.features?.[0];
          if (!feature) return;
          const iso = feature.properties?.ISO_A2 as string | undefined;
          const name = feature.properties?.NAME as string | undefined;
          if (!iso || !name) return;
          const containerW = containerRef.current?.offsetWidth ?? 0;
          const containerH = containerRef.current?.offsetHeight ?? 0;
          const { flipX, flipY } = computeFlip(e.point.x, e.point.y, containerW, containerH);
          const state: HoverState = { iso, name, x: e.point.x, y: e.point.y, flipX, flipY };
          hoverStateRef.current = state;
          setHoverState(state);
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'eu-fill', () => {
          hoverStateRef.current = null;
          setHoverState(null);
          map.getCanvas().style.cursor = '';
        });
      } else {
        // Touch / coarse-pointer: tap to show/swap; tap empty or same to dismiss.
        map.on('click', (e) => {
          const features = map.queryRenderedFeatures(e.point, { layers: ['eu-fill'] });
          const feature = features[0];
          if (feature) {
            const iso = feature.properties?.ISO_A2 as string | undefined;
            const name = feature.properties?.NAME as string | undefined;
            if (!iso || !name) return;
            // Tap same country again → dismiss.
            if (hoverStateRef.current?.iso === iso) {
              hoverStateRef.current = null;
              setHoverState(null);
              return;
            }
            const containerW = containerRef.current?.offsetWidth ?? 0;
            const containerH = containerRef.current?.offsetHeight ?? 0;
            const { flipX, flipY } = computeFlip(e.point.x, e.point.y, containerW, containerH);
            const state: HoverState = { iso, name, x: e.point.x, y: e.point.y, flipX, flipY };
            hoverStateRef.current = state;
            setHoverState(state);
          } else {
            hoverStateRef.current = null;
            setHoverState(null);
          }
        });
      }

      resizeObserver = new ResizeObserver(() => {
        map.resize();
      });
      resizeObserver.observe(containerRef.current!);
    })();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      mapInstance?.remove();
      mapRef.current = null;
    };
    // Mount only — modeRef/themeRef/dataRef keep values current without re-running.
  }, []);

  // ─── Data update effect ──────────────────────────────────────────────────────
  // When data changes, update the GeoJSON source and recompute fill-color
  // without rebuilding the entire map.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !geojsonRef.current) return;

    const source = map.getSource('eu') as GeoJSONSource | undefined;
    if (!source) return;

    const merged = mergePrices(geojsonRef.current, data);
    source.setData(merged);

    if (map.getLayer('eu-fill')) {
      const { fill, scale } = theme.ef.map;
      const domain = getPriceDomain(data);
      const fillExpr = domain ? buildFillColor(domain, { ...scale, neutral: fill }) : fill;
      map.setPaintProperty('eu-fill', 'fill-color', fillExpr);
    }
  }, [data, theme.ef.map]);

  // ─── Theme switch effect ─────────────────────────────────────────────────────
  // Swap the hosted Mapbox base style on mode toggle. setStyle wipes all custom
  // sources and layers; they are re-added inside the 'style.load' handler above.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mapRef.current?.setStyle(getStyleUrl(mode));
  }, [mode]);

  const tooltipRow = hoverState !== null ? lookup.get(hoverState.iso) : null;

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {hoverState !== null && (
        <CountryTooltip
          name={tooltipRow?.country ?? hoverState.name}
          gasoline={tooltipRow?.gasoline ?? ''}
          diesel={tooltipRow?.diesel ?? ''}
          x={hoverState.x}
          y={hoverState.y}
          flipX={hoverState.flipX}
          flipY={hoverState.flipY}
        />
      )}
    </div>
  );
}
