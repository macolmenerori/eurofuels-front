import React from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import '@fontsource-variable/manrope';
import '@fontsource-variable/jetbrains-mono';
import '@macolmenerori/component-library/theme-switch-css';
import '@/i18n';

import 'mapbox-gl/dist/mapbox-gl.css';

import { CustomCookieConsent } from '@/components/CustomCookieConsent/CustomCookieConsent';
import { ThemeModeProvider } from '@/ui/ThemeModeProvider';

export function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#111f31" />
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link rel="icon" type="image/webp" href="/icons/favicon.webp" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
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
      <CustomCookieConsent />
    </ThemeModeProvider>
  );
}
