import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../locales/en/translation.json';
import faTranslation from '../locales/fa/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  fa: {
    translation: faTranslation
  }
};

const rtlLanguages = ['fa', 'ar', 'he', 'ur'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

// Set document direction and font based on language
const setDocumentDirection = (language: string) => {
  const isRTL = rtlLanguages.includes(language);
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
  
  // Set font for Persian language
  if (language === 'fa') {
    document.documentElement.style.fontFamily = 'var(--font-vazir)';
  } else {
    document.documentElement.style.fontFamily = '';
  }
};

// Set initial direction
setDocumentDirection(i18n.language);

// Update direction when language changes
i18n.on('languageChanged', setDocumentDirection);

export default i18n;
