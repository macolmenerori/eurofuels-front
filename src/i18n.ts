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

i18next.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'en' // Default language english
});

export default i18next;
