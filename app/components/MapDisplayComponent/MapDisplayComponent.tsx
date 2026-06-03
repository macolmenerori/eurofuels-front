import React, { useEffect, useRef } from 'react';

import { useTheme } from '@mui/material/styles';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import type { GeoJSONSource, Map as MapboxMap } from 'mapbox-gl';

import { buildFillColor, getPriceDomain, mergePrices } from './mapColor';

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

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />;
}
