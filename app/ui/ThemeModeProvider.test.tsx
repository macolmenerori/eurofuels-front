import React from 'react';

import { act, render, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ThemeModeProvider, useThemeMode } from './ThemeModeProvider';

const THEME_KEY = 'eurofuel:theme';

function wrapper({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <ThemeModeProvider>{children}</ThemeModeProvider>;
}

describe('ThemeModeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('defaults to dark mode when no persisted value', () => {
    const { result } = renderHook(() => useThemeMode(), { wrapper });
    expect(result.current.mode).toBe('dark');
  });

  it('reads persisted mode from localStorage on mount', async () => {
    localStorage.setItem(THEME_KEY, 'light');

    const { result } = renderHook(() => useThemeMode(), { wrapper });

    // The effect runs after mount — wait for it.
    await act(async () => {});

    expect(result.current.mode).toBe('light');
  });

  it('toggleMode switches dark → light → dark', () => {
    const { result } = renderHook(() => useThemeMode(), { wrapper });

    expect(result.current.mode).toBe('dark');

    act(() => {
      result.current.toggleMode();
    });
    expect(result.current.mode).toBe('light');

    act(() => {
      result.current.toggleMode();
    });
    expect(result.current.mode).toBe('dark');
  });

  it('setMode persists choice to localStorage', async () => {
    const { result } = renderHook(() => useThemeMode(), { wrapper });

    act(() => {
      result.current.setMode('light');
    });

    await act(async () => {});

    expect(localStorage.getItem(THEME_KEY)).toBe('light');
  });

  it('renders children', () => {
    render(
      <ThemeModeProvider>
        <span>hello</span>
      </ThemeModeProvider>
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('useThemeMode throws outside provider', () => {
    // Suppress the React error boundary console noise.
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useThemeMode())).toThrow(
      'useThemeMode must be used within a ThemeModeProvider'
    );
    consoleSpy.mockRestore();
  });
});
