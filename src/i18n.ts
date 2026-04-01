import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

//Import all translation files
import English from '../public/locales/en.json';
import Spanish from '../public/locales/es.json';

const resources = {
  en: {
    translation: English
  },
  es: {
    translation: Spanish
  }
};

// SSR Guard: Only use LanguageDetector in browser
if (typeof window !== 'undefined') {
  i18next.use(LanguageDetector);
}

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: 'en', // Default language
  // SSR Guard: Set language explicitly during SSR, let detector handle in browser
  lng: typeof window === 'undefined' ? 'en' : undefined
});

export default i18next;
