# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**eurofuels-front** is a React web application that displays current fuel prices across European Union countries. The app fetches data from AWS S3 (populated by a Lambda function) and presents it in a responsive, internationalized interface with Material-UI components.

Data source: [EU Weekly Oil Bulletin](https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en)

## Core Development Commands

### Essential Commands

```bash
pnpm i                   # Install dependencies
pnpm start               # Start dev server on port 3000
pnpm build               # Production build
pnpm test                # Run all Jest tests
pnpm test <filename>     # Run specific test file
pnpm types               # Type-check without emitting files
pnpm lint                # Lint and auto-fix with ESLint
pnpm prettify            # Format code with Prettier
pnpm verify              # Run all checks: lint, prettify, types, test, audit, build
```

### Requirements

- Node.js: `>=22.11.0`
- Package manager: `pnpm>=10.12.1`

## Architecture

### Tech Stack

- **Build System**: Webpack 5 (via `webpack.config.cjs`)
- **Framework**: React 19 with TypeScript
- **UI Library**: Material-UI v7 (with Emotion for styling)
- **Data Fetching**: SWR for caching and revalidation
- **Internationalization**: react-i18next with browser language detection
- **Testing**: Jest + Testing Library + MSW (Mock Service Worker)

### Project Structure

```
src/
├── components/          # React components (each in own folder with tests)
│   ├── PricesTable/    # Main data display component
│   ├── Navbar/
│   ├── LanguageSwitcher/
│   ├── ThemeToggle/
│   └── ...
├── ui/
│   ├── MainLayout/     # Main layout wrapper
│   └── theme/          # MUI theme configuration and ThemeContext
├── test/
│   ├── mocks/          # MSW handlers for API mocking
│   └── setupTests.tsx  # Jest setup file
├── types/              # TypeScript type definitions
├── i18n.ts            # i18next configuration
└── index.tsx          # Application entry point
```

### Key Architectural Patterns

**1. Data Fetching (PricesTable.tsx)**

- Uses SWR to fetch JSON data from AWS S3 bucket
- API endpoint: `https://eurofuels-bucket.s3.eu-west-1.amazonaws.com/eurofuels_data.json`
- Returns stringified JSON that must be parsed with `JSON.parse()`
- Component handles loading, error, and success states

**2. Theme Management (ui/theme/)**

- Custom ThemeContext wraps MUI ThemeProvider
- Persists theme preference to localStorage
- Responds to system theme changes when no explicit preference set
- Access via `useTheme()` hook

**3. Internationalization**

- Translation files: `public/locales/{en,es}.json`
- Configured in `src/i18n.ts` with automatic language detection
- Access translations via `useTranslation()` hook from react-i18next

**4. Import Paths**

- Aliased paths configured: `@/*` maps to `src/*`
- Works in both TypeScript (tsconfig.json) and Webpack (webpack.config.cjs)
- Example: `import { MainLayout } from '@/ui/MainLayout/MainLayout'`

**5. Component Organization**

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

### Build Configuration (webpack.config.cjs)

- Production builds use content hashing for cache busting
- CSS extraction in production (inline styles in dev)
- Console logs removed in production builds
- Dev server on port 3000 with HMR enabled
- Static assets (locales, images, fonts) copied to build directory
- Path alias `@` configured for imports

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
