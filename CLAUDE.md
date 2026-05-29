# CLAUDE.md

## Project

EuroFuels — web app showing fuel prices across 27 EU member states. Map is the primary UI; everything else serves it. Desktop-first.

## Stack

- **React 19** + **TypeScript** (strict, `noImplicitAny`, `noUnusedLocals`)
- **Vite 8** bundler — dev port 3000, no source maps in prod
- **MUI v9** (`@mui/material`) + Emotion for styling — all styles via MUI `ThemeProvider`, no hardcoded hex values in components
- **React Router v7** in framework mode — file-based routes under `app/routes/`
- **i18next** + `react-i18next` + `i18next-browser-languagedetector` for i18n
- **SWR** for data fetching
- **MSW** for API mocking in tests
- **pnpm** as package manager (node ≥ 24.11.0)
- **`@macolmenerori/component-library`** — internal component library; handle CSS imports via SSR `noExternal` config (already set in `vite.config.ts`)

## Path aliases

`@/*` maps to `./app/*`. Use `@/components/Foo` not relative paths.

## App structure (target)

```
app/
  routes/          # React Router v7 file-based routes
  components/      # shared UI components
  theme/           # MUI theme config (light + dark)
  i18n/            # i18next setup + translation files
  hooks/           # custom React hooks
  lib/             # utilities, API clients
  root.tsx         # app root (ThemeProvider, RouterProvider, i18n init)
public/            # static assets
```

## Design system (from DESIGN.md)

Read `DESIGN.md` for the full spec. Key rules:

**Colors**

- Never hardcode hex values — always read from MUI theme.
- `primary` (`#1e40af`) = brand-only (logo, fixed elements). Never for interactive highlights in dark mode.
- `accent-bright` (`#60A5FA`) = dark-mode-only interactive highlights (hovered countries, active nav, dropdown selection). Resolves automatically via the theme.
- Dark theme is the **default** for first-time users; persist choice to `localStorage` key `eurofuel:theme`.

**Typography**

- **Manrope** for all UI text (load from Google Fonts, weights 300–800).
- **JetBrains Mono** for every numeral — prices, ISO codes, language codes. Always with `font-variant-numeric: tabular-nums`. Never use a proportional font for numbers.

**Layout**

- Fixed viewport, no scroll: `height: 100vh; overflow: hidden`.
- Navbar 64px fixed; map area `flex: 1`.
- Spacing is strict 4px base unit (xs=4, sm=8, md=12, lg=16, xl=24, xxl=32).

**Motion**
4px fixed; map area `flex: 1`.

- Spacing is strict 4px base unit (xs=4, sm=8, md=12, lg=16, xl=24, xxl=32).

**Motion**

- Transitions 120–280ms, `ease` curves only. Max 320ms. No springs/bounces.
- Wrap all keyframe animations in `@media (prefers-reduced-motion: reduce)`.
- Three named keyframes: `ef-fadein` (160ms, dropdowns), `ef-pop` (140ms, tooltip), `ef-shimmer` (1.6s, skeleton).

**Theme swap**: transitions `background-color` and `color` on root over 280ms.

## i18n

Supported languages: EN and ES for the moment, EN by default. Translations live under `app/i18n/locales/`. Use `useTranslation` hook; never hardcode user-visible strings.

## TypeScript notes

- `__APP_VERSION__` global is injected by Vite from `package.json`.
