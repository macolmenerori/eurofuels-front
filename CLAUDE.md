# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**eurofuels-front** is a React web application that displays current fuel prices across European Union countries. The app fetches data from AWS S3 (populated by a Lambda function) and presents it in a responsive, internationalized interface with Material-UI components.

Data source: [EU Weekly Oil Bulletin](https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en)

## Core Development Commands

### Essential Commands

```bash
pnpm i                   # Install dependencies
pnpm dev                 # Alias for pnpm start (SSG dev server)
pnpm build               # Generate sitemap + TypeScript check + SSG build
pnpm preview             # Preview SSG production build locally on port 3000
pnpm test                # Run all Jest tests
pnpm test <filename>     # Run specific test file
pnpm types               # Type-check without emitting files
pnpm lint                # Lint and auto-fix with ESLint
pnpm prettify            # Format code with Prettier
pnpm verify              # Run all checks: lint, prettify, types, test, audit, build
```

### Requirements

- Node.js: `>=24.11.0`
- Package manager: `pnpm>=10.12.1`

## Architecture

### Tech Stack

- **Build System**: Vite 7 with React plugin and TypeScript support
- **Framework**: React 19 with TypeScript
- **Static Site Generation**: vite-react-ssg for pre-rendering and SEO
- **UI Library**: Material-UI v7 (with Emotion for styling)
- **Data Fetching**: SWR for caching and revalidation
- **Internationalization**: react-i18next with browser language detection (SSR-compatible)
- **SEO**: react-helmet-async for meta tags and structured data
- **Testing**: Jest + Testing Library + MSW (Mock Service Worker)

### Project Structure

```
src/
├── components/          # React components (each in own folder with tests)
│   ├── PricesTable/    # Main data display component
│   ├── SEOHead/        # SEO meta tags and structured data
│   ├── Navbar/
│   ├── LanguageSwitcher/
│   ├── ThemeToggle/
│   └── ...
├── ui/
│   ├── MainLayout/     # Main layout wrapper (includes SEO components)
│   └── theme/          # MUI theme configuration and ThemeContext
├── test/
│   ├── mocks/          # MSW handlers for API mocking
│   └── setupTests.tsx  # Jest setup file
├── types/              # TypeScript type definitions
├── i18n.ts            # i18next configuration (with SSR guards)
└── index.tsx          # SSG entry point (ViteReactSSG)
scripts/
└── generate-sitemap.ts # Automatic sitemap generation for SEO
public/
├── locales/            # Translation files
├── robots.txt          # Search engine crawler directives
└── sitemap.xml         # Auto-generated sitemap (via build script)
```

### Key Architectural Patterns

**1. Data Fetching (PricesTable.tsx)**

- Uses SWR to fetch JSON data from AWS S3 bucket
- API endpoint: `https://eurofuels-bucket.s3.eu-west-1.amazonaws.com/eurofuels_data.json`
- Returns stringified JSON that must be parsed with `JSON.parse()`
- Component handles loading, error, and success states

**2. Theme Management (ui/theme/)**

- Custom ThemeContext wraps MUI ThemeProvider
- Persists theme preference to localStorage (with SSR guards)
- Responds to system theme changes when no explicit preference set
- Defaults to 'light' theme during SSG, switches after client hydration
- Access via `useTheme()` hook

**3. Static Site Generation & SEO**

- Entry point uses `ViteReactSSG` for static pre-rendering
- SSR-compatible with guards for browser-only APIs (`window`, `localStorage`)
- SEO components in `src/components/SEOHead/`:
  - `SEOHead.tsx`: Meta tags, Open Graph, Twitter Cards, canonical URLs
  - `JsonLd.tsx`: Structured data (WebApplication schema)
- Automatic sitemap generation before each build (`scripts/generate-sitemap.ts`)
- Pre-rendered HTML improves SEO and perceived performance

**4. Internationalization**

- Translation files: `public/locales/{en,es}.json`
- Configured in `src/i18n.ts` with automatic language detection
- SSR guards prevent browser-only `LanguageDetector` from running during build
- Defaults to English during SSG, switches to browser preference after hydration
- Access translations via `useTranslation()` hook from react-i18next

**5. Import Paths**

- Aliased paths configured: `@/*` maps to `src/*`
- Works in both TypeScript (tsconfig.json) and Vite (vite.config.ts via vite-tsconfig-paths plugin)
- Example: `import { MainLayout } from '@/ui/MainLayout/MainLayout'`

**6. Component Organization**

- Each component in its own folder with co-located test file
- Test files use `.test.tsx` suffix
- Components export default, but some use named exports (e.g., MainLayout)

### Testing Setup

- **Environment**: `jest-fixed-jsdom` (for React 19 compatibility)
- **MSW**: Mock API responses in `src/test/mocks/handlers.ts`
- **Setup**: Global test setup in `src/test/setupTests.tsx`
- **Coverage**: Configured to exclude `*.d.ts` and `index.tsx`
- Import alias `@/*` mapped in jest.config.ts
- Always try to use userEvent instead of fireEvent on tests when performing user actions
- **Important**: `transformIgnorePatterns` configured to transform `.pnpm` directory for pnpm's symlink structure (required for msw and its dependencies like until-async)

### Linting and Formatting

- **ESLint**: TypeScript-ESLint with React, Hooks, JSX A11y, Testing Library plugins
- **Import Sorting**: `simple-import-sort` enforces React-first, then external, then internal imports
- **Prettier**: Integrated as ESLint rule (errors on formatting issues)
- Notable rules:
  - `@typescript-eslint/no-explicit-any`: warn
  - `no-console`: warn
  - `react/prop-types`: off (TypeScript handles this)

### Build Configuration (vite.config.ts)

- **SSG Configuration**: `vite-react-ssg` for static site generation
- **SSR Externals**: `react-helmet-async` configured as SSR-compatible
- **SSG Options**: HTML minification enabled for production
- Production builds use content hashing for cache busting
- CSS extraction in production (Vite handles automatically)
- Console logs removed in production builds via terser
- Dev server on port 3000 with fast HMR
- Preview server on port 3000 for testing SSG production builds
- Static assets served from `public/` directory (Vite automatic handling)
- Build output directory: `dist/` (Vite default)
- Path alias `@` configured via vite-tsconfig-paths plugin
- Function-based manual code splitting: react-vendor and mui-vendor chunks (SSR-compatible)
- PostCSS with autoprefixer and postcss-preset-env for CSS processing
- Build process: Sitemap generation → TypeScript check → SSG build

## Key Implementation Details

### Adding New Translations

1. Add key-value pairs to `public/locales/en.json` and `public/locales/es.json`
2. Access in components via: `const { t } = useTranslation(); t('your.key.path')`

### Adding New Tests

- MSW handlers in `src/test/mocks/handlers.ts` intercept fetch requests
- Mock API responses for consistent test data
- Test files automatically discovered by Jest (pattern: `*.test.tsx`)

### Theme Customization

- Theme definition in `src/ui/theme/theme.ts`
- `createAppTheme(mode)` function creates MUI theme with light/dark variants
- ThemeContext provides `mode` and `toggleTheme()` to all components

### SEO and Static Site Generation

**Meta Tags and Structured Data:**

- `SEOHead` component manages all meta tags dynamically
- Supports multilingual meta tags (en/es)
- Open Graph tags for social media sharing
- Twitter Card tags for Twitter previews
- Canonical URLs to prevent duplicate content
- JSON-LD structured data (WebApplication schema)

**Sitemap:**

- Auto-generated before each build via `tsx scripts/generate-sitemap.ts`
- Includes multilingual support (hreflang tags)
- Weekly change frequency (matches data update schedule)
- Production URL: `https://eurofuels.miguelangelcolmenero.es`

**SSR Compatibility:**

- All browser-only APIs guarded with `typeof window !== 'undefined'`
- Theme and language preferences set after client hydration
- SWR data fetching happens client-side only
- Pre-rendered HTML provides immediate content visibility

**robots.txt:**

- Allows all search engine crawlers
- References sitemap location
- Blocks build artifacts and node_modules
