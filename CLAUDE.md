# CLAUDE.md

## Project

EuroFuels — web app showing fuel prices across 27 EU member states. Map is the primary UI; everything else serves it. Desktop-first.

## Stack

- **React 19** + **TypeScript** (strict, `noImplicitAny`, `noUnusedLocals`)
- **Vite 8** bundler — dev port 3000, no source maps in prod
- **MUI v9** (`@mui/material`) + Emotion for styling — all styles via MUI `ThemeProvider`, no hardcoded hex values in components
- **React Router v7** in framework mode — routes configured in `app/routes.ts`, page modules under `app/pages/`
- **i18next** + `react-i18next` + `i18next-browser-languagedetector` for i18n
- **SWR** for data fetching
- **MSW** for API mocking in tests
- **mapbox-gl v3** — map rendering. Import CSS in `root.tsx`: `import 'mapbox-gl/dist/mapbox-gl.css'`. Dynamic import inside `useEffect` to keep it out of the SSR eval graph (prerendering would crash on `window`).
- **pnpm** as package manager (node ≥ 24.11.0)
- **`@macolmenerori/component-library`** — internal component library; handle CSS imports via SSR `noExternal` config (already set in `vite.config.ts`). Each component subpackage ships its own CSS — import the CSS side-effect in `root.tsx` alongside fonts (e.g. `import '@macolmenerori/component-library/theme-switch-css'`). Import the component from its subpath: `import { ThemeSwitch } from '@macolmenerori/component-library/theme-switch'`.

## Path aliases

`@/*` maps to `./app/*`. Use `@/components/Foo` not relative paths.

## App structure (target)

```
app/
  pages/           # React Router v7 file-based routes
  components/      # shared UI components
  ui/              # MUI theme config (light + dark)
  i18n/
    index.ts       # side-effect init module (imported in root.tsx)
    i18next.d.ts   # TS module augmentation — t() keys typed against en.json
    locales/       # Translation files
  hooks/           # custom React hooks
  lib/             # utilities, API clients
  root.tsx         # app root (ThemeProvider, RouterProvider, i18n init)
public/            # static assets
```

## Design system (from DESIGN.md)

Read `DESIGN.md` for the full spec. Key rules:

**Colors**

- Never hardcode hex values — always read from MUI theme.
- Dark theme is the **default** for first-time users; persist choice to `localStorage` key `eurofuel:theme`.

**Typography**

- **Manrope** for all UI text. Loaded via Fontsource variable package `@fontsource-variable/manrope` (imported in `app/root.tsx`); CSS family `"Manrope Variable"`.
- **JetBrains Mono** for every numeral — prices, ISO codes, language codes. CSS family `"JetBrains Mono Variable"`. Always with `font-variant-numeric: tabular-nums`. Never use a proportional font for numbers.

**Layout**

- Fixed viewport, no scroll: `height: 100vh; overflow: hidden`.
- Navbar 64px fixed; map area `flex: 1`.

**Motion**

- Transitions 120–280ms, `ease` curves only. Max 320ms. No springs/bounces.
- Wrap all keyframe animations in `@media (prefers-reduced-motion: reduce)`.
- Three named keyframes: `ef-fadein` (160ms, dropdowns), `ef-pop` (140ms, tooltip), `ef-shimmer` (1.6s, skeleton).

**Theme swap**: transitions `background-color` and `color` on root over 280ms.

## Theming

Theme lives in `app/ui/`:

- **`theme.ts`** — `createAppTheme(mode)` factory builds both light/dark themes from one source. Full DESIGN.md token set encoded (hybrid placement):
  - `theme.ef` — custom namespace for tokens with no MUI home: `surfaceElevated`, `borderStrong`, `primaryFaded`, `primaryGlow`, `map.{fill,stroke,scale.{low,mid,high}}`, `dotPattern`, `radii`, `shadows.{sm,lg,glowHover}`. `map.scale` holds the choropleth color ramp (green→amber→red); differs between light and dark themes.
  - TS module augmentation in the same file keeps `theme.ef`, `palette.accent`, and custom variants typed.
- **`ThemeModeProvider.tsx`** — holds active mode, wraps MUI `ThemeProvider` + `CssBaseline` + foundational `GlobalStyles` (viewport lock, 280ms theme-swap, reduced-motion guard). Mode defaults to `dark`, persisted to `localStorage['eurofuel:theme']`. Consume via `useThemeMode()` → `{ mode, setMode, toggleMode }` (throws outside provider). Read theme tokens via MUI's own `useTheme()`.

## i18n

Supported languages: EN (default/fallback) and ES. Translations live under `app/i18n/locales/`.

- Key shape: nested by area — `common`, `nav`, `map`, `stats`, `about`, `notFound`. `en.json` is the canonical key set; always add keys there first.
- Use `useTranslation` hook in components; never hardcode user-visible strings.

## Routing notes

- The root `/` route uses `<NavLink to="/" end>` — the `end` prop is required to prevent it matching as active on every nested route.

## Static assets

- `public/data/eu_boundaries.json` — GeoJSON `FeatureCollection` of EU country boundaries.

## Testing

- MSW fully wired: `app/test/mocks/handlers.ts` intercepts `VITE_COUNTRY_DATA_ENDPOINT`, `app/test/mocks/server.ts` exports the MSW node server. Setup in `app/test/setup.ts`: server started `beforeAll`, reset `afterEach`, closed `afterAll`.
- SWR cache isolated per render: `test-utils.tsx` wraps renders in `<SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0, shouldRetryOnError: false }}>`. SWR global cache also purged via `mutate()` in `afterEach`.
- **mapbox-gl in tests**: requires WebGL + DOM APIs absent in jsdom — always mock the entire module with `vi.mock('mapbox-gl', ...)`. Also stub `fetch` to prevent real GeoJSON network calls. See `MapDisplayComponent.test.tsx` for the canonical mock shape.

## TypeScript notes

- `__APP_VERSION__` global is injected by Vite from `package.json`.
