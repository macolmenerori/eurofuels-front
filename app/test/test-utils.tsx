import React from 'react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router';

import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@/i18n'; // ensure i18n instance is initialised before any component renders

import { ThemeModeProvider } from '@/ui/ThemeModeProvider';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Initial history entries for MemoryRouter — defaults to ['/'] */
  initialEntries?: MemoryRouterProps['initialEntries'];
}

/**
 * Custom render wrapping the component tree with all app-level providers:
 *  - ThemeModeProvider (MUI ThemeProvider + theme context)
 *  - MemoryRouter (NavLink / useNavigate etc.)
 *
 * i18n is global (side-effect init in @/i18n) so no provider is needed; the
 * language is forced to 'en' in app/test/setup.ts.
 */
function customRender(
  ui: React.ReactElement,
  { initialEntries = ['/'], ...options }: CustomRenderOptions = {}
): RenderResult {
  function Wrapper({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeModeProvider>{children}</ThemeModeProvider>
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

// Re-export everything from RTL so tests only need to import from this file.
export * from '@testing-library/react';
export { userEvent };

// Override the RTL render with our custom one.
export { customRender as render };
