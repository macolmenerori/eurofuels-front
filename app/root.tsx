import React from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import '@fontsource-variable/manrope';
import '@fontsource-variable/jetbrains-mono';
import '@/i18n';

import { ThemeModeProvider } from '@/ui/ThemeModeProvider';

export function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App(): React.JSX.Element {
  return (
    <ThemeModeProvider>
      <Outlet />
    </ThemeModeProvider>
  );
}
