import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { createAppTheme, type ThemeMode } from './theme';

const EUROFUEL_THEME_KEY = 'eurofuel:theme';

interface ThemeModeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

export function ThemeModeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  // SSR-safe default: dark for first-time users. The persisted choice is read
  // from localStorage after mount (server cannot read it).
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    const stored = window.localStorage.getItem(EUROFUEL_THEME_KEY);
    if (isThemeMode(stored)) {
      // Persisted choice is only readable on the client; sync it after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(EUROFUEL_THEME_KEY, mode);
  }, [mode]);

  const value = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }),
    [mode]
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            'html, body': { height: '100%', overflow: 'hidden', margin: 0 },
            // Theme swap transitions background + color on the root over 280ms.
            body: { transition: 'background-color 280ms ease, color 280ms ease' },
            '@media (prefers-reduced-motion: reduce)': {
              '*, *::before, *::after': {
                transitionDuration: '0.01ms !important',
                animationDuration: '0.01ms !important'
              }
            }
          }}
        />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}

/**
 * Access the active theme mode and switching controls. Throws if used outside
 * `ThemeModeProvider`.
 */
export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (ctx === undefined) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return ctx;
}
