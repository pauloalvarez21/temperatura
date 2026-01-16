import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import es from './locales/es.json';
import en from './locales/en.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
};

const getSystemLanguage = (): 'es' | 'en' => {
  const locales = RNLocalize.getLocales();

  if (locales.length > 0) {
    const languageCode = locales[0].languageCode;
    return languageCode === 'en' ? 'en' : 'es';
  }

  return 'es';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getSystemLanguage(), // 👈 idioma del sistema
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
