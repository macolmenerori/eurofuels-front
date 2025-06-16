// src/types/i18n.d.ts
import 'react-i18next';

import about from '../../public/locales/en/about.json';
import common from '../../public/locales/en/common.json';
import home from '../../public/locales/en/home.json';

// Extend the i18next TypeScript declarations
declare module 'react-i18next' {
  // Extend i18n interface to ensure typings
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      common: typeof common;
      home: typeof home;
      about: typeof about;
    };
    // custom namespace type, if you changed it
    defaultNS: 'common';
    // other custom types
  }
}
