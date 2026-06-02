import type { CSSProperties } from 'react';

import {
  createTheme,
  type PaletteColor,
  type PaletteColorOptions,
  type Theme
} from '@mui/material/styles';

export type ThemeMode = 'light' | 'dark';

// ─── Font families (Fontsource variable packages, imported in root.tsx) ───────
const MANROPE = '"Manrope Variable", sans-serif';
const MONO = '"JetBrains Mono Variable", monospace';

// ─── Brand colors (theme-invariant) ──────────────────────────────────────────
const brand = {
  primary: '#1e40af',
  primaryStrong: '#1e3a8a',
  accentBright: '#60A5FA',
  onPrimary: '#FFFFFF'
} as const;

// ─── EuroFuel custom token namespace (tokens with no native MUI home) ─────────
interface EfRadii {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

interface EfMap {
  fill: string;
  stroke: string;
}

interface EfShadows {
  sm: string;
  lg: string;
  glowHover: string;
}

interface EfStatusVariant {
  bg: string;
  border: string;
  text: string;
}

interface EfStatus {
  success: EfStatusVariant;
  warning: EfStatusVariant;
  error: EfStatusVariant;
  info: EfStatusVariant;
}

interface EfTokens {
  surfaceElevated: string;
  borderStrong: string;
  primaryFaded: string;
  primaryGlow: string;
  map: EfMap;
  dotPattern: string;
  radii: EfRadii;
  shadows: EfShadows;
  status: EfStatus;
}

// Radii scale is theme-invariant (DESIGN `rounded`).
const radii: EfRadii = { none: 0, sm: 6, md: 8, lg: 10, xl: 12, full: 999 };

const lightEf: EfTokens = {
  surfaceElevated: '#FFFFFF',
  borderStrong: '#0F172A24',
  primaryFaded: '#1e40af14',
  primaryGlow: '#1e40af33',
  map: { fill: '#E5E2D2', stroke: '#FAF9F2' },
  dotPattern: '#0F172A0F',
  radii,
  shadows: {
    sm: '0 1px 3px rgba(15, 23, 42, 0.08)',
    lg: '0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px rgba(15, 23, 42, 0.08)',
    glowHover: 'drop-shadow(0 4px 14px #1e40af33)'
  },
  status: {
    success: { bg: '#dcfce7', border: '#16a34a', text: '#15803d' },
    warning: { bg: '#fef9c3', border: '#ca8a04', text: '#a16207' },
    error: { bg: '#fee2e2', border: '#dc2626', text: '#b91c1c' },
    info: { bg: '#f1f5f9', border: '#64748b', text: '#475569' }
  }
};

const darkEf: EfTokens = {
  surfaceElevated: '#152C46',
  borderStrong: '#FFFFFF24',
  primaryFaded: '#60A5FA1A',
  primaryGlow: '#60A5FA47',
  map: { fill: '#1A2D47', stroke: '#0A1A2B' },
  dotPattern: '#FFFFFF0A',
  radii,
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.4)',
    lg: '0 1px 2px rgba(0, 0, 0, 0.4), 0 16px 40px rgba(0, 0, 0, 0.5)',
    glowHover: 'drop-shadow(0 4px 14px #60A5FA47)'
  },
  status: {
    success: { bg: 'rgba(22, 163, 74, 0.12)', border: '#4ade80', text: '#86efac' },
    warning: { bg: 'rgba(234, 179, 8, 0.12)', border: '#facc15', text: '#fde047' },
    error: { bg: 'rgba(248, 113, 113, 0.15)', border: '#f87171', text: '#fca5a5' },
    info: { bg: 'rgba(148, 163, 184, 0.12)', border: '#94a3b8', text: '#cbd5e1' }
  }
};

// ─── Typography variants (DESIGN type styles as named MUI variants) ───────────
const numericBase: CSSProperties = {
  fontFamily: MONO,
  fontWeight: 600,
  lineHeight: 1,
  fontFeatureSettings: '"tnum" 1',
  fontVariantNumeric: 'tabular-nums'
};

const variants = {
  brandWordmark: {
    fontFamily: MANROPE,
    fontSize: 17,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: '-0.02em'
  },
  brandTagline: {
    fontFamily: MANROPE,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: '0.06em'
  },
  headlineSm: {
    fontFamily: MANROPE,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.01em'
  },
  eyebrow: {
    fontFamily: MANROPE,
    fontSize: 10,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '0.10em',
    textTransform: 'uppercase'
  },
  bodyMd: { fontFamily: MANROPE, fontSize: 14, fontWeight: 500, lineHeight: 1 },
  bodySm: { fontFamily: MANROPE, fontSize: 12, fontWeight: 500, lineHeight: 1 },
  labelMd: { fontFamily: MANROPE, fontSize: 13, fontWeight: 500, lineHeight: 1.2 },
  labelSm: { fontFamily: MANROPE, fontSize: 11, fontWeight: 500, lineHeight: 1 },
  caption: { fontFamily: MANROPE, fontSize: 11, fontWeight: 500, lineHeight: 1 },
  numericDisplay: { ...numericBase, fontSize: 18, letterSpacing: '-0.01em' },
  numericMd: { ...numericBase, fontSize: 14, letterSpacing: '-0.01em' },
  numericSm: { ...numericBase, fontSize: 13, letterSpacing: '0.04em' },
  numericXs: { ...numericBase, fontSize: 10, letterSpacing: '0.06em' }
} satisfies Record<string, CSSProperties>;

// Render custom variants on sensible elements (default fallback is <span>).
const variantMapping: Record<string, string> = {
  brandWordmark: 'span',
  brandTagline: 'span',
  headlineSm: 'h2',
  eyebrow: 'span',
  bodyMd: 'p',
  bodySm: 'p',
  labelMd: 'span',
  labelSm: 'span',
  numericDisplay: 'span',
  numericMd: 'span',
  numericSm: 'span',
  numericXs: 'span'
};

/**
 * Build the EuroFuel MUI theme for the given mode. Single factory for both
 * light and dark — the active mode is owned by `ThemeModeProvider`.
 */
export function createAppTheme(mode: ThemeMode): Theme {
  const isDark = mode === 'dark';
  const ef = isDark ? darkEf : lightEf;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: brand.primary,
        dark: brand.primaryStrong,
        contrastText: brand.onPrimary
      },
      // Theme-resolved accent: `primary` in light, `accent-bright` in dark.
      accent: { main: isDark ? brand.accentBright : brand.primary },
      background: {
        default: isDark ? '#0A1A2B' : '#FAF9F2',
        paper: isDark ? '#0F2238' : '#FFFFFF'
      },
      text: {
        primary: isDark ? '#F1F5F9' : '#0F172A',
        secondary: isDark ? '#94A3B8' : '#475569',
        disabled: isDark ? '#64748B' : '#94A3B8'
      },
      divider: isDark ? '#FFFFFF12' : '#0F172A14'
    },
    ef,
    shape: { borderRadius: radii.md },
    // Strict 4px base unit: theme.spacing(1) === '4px'.
    spacing: (factor: number) => `${factor * 4}px`,
    typography: {
      fontFamily: MANROPE,
      ...variants
    },
    components: {
      MuiTypography: {
        defaultProps: { variantMapping }
      }
    }
  });
}

// ─── TypeScript module augmentation ──────────────────────────────────────────
declare module '@mui/material/styles' {
  interface Theme {
    ef: EfTokens;
  }
  interface ThemeOptions {
    ef?: EfTokens;
  }
  interface Palette {
    accent: PaletteColor;
  }
  interface PaletteOptions {
    accent?: PaletteColorOptions;
  }
  interface TypographyVariants {
    brandWordmark: CSSProperties;
    brandTagline: CSSProperties;
    headlineSm: CSSProperties;
    eyebrow: CSSProperties;
    bodyMd: CSSProperties;
    bodySm: CSSProperties;
    labelMd: CSSProperties;
    labelSm: CSSProperties;
    numericDisplay: CSSProperties;
    numericMd: CSSProperties;
    numericSm: CSSProperties;
    numericXs: CSSProperties;
  }
  interface TypographyVariantsOptions {
    brandWordmark?: CSSProperties;
    brandTagline?: CSSProperties;
    headlineSm?: CSSProperties;
    eyebrow?: CSSProperties;
    bodyMd?: CSSProperties;
    bodySm?: CSSProperties;
    labelMd?: CSSProperties;
    labelSm?: CSSProperties;
    numericDisplay?: CSSProperties;
    numericMd?: CSSProperties;
    numericSm?: CSSProperties;
    numericXs?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    brandWordmark: true;
    brandTagline: true;
    headlineSm: true;
    eyebrow: true;
    bodyMd: true;
    bodySm: true;
    labelMd: true;
    labelSm: true;
    numericDisplay: true;
    numericMd: true;
    numericSm: true;
    numericXs: true;
  }
}
