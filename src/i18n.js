import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import arTranslation from './locales/ar/translation.json';
import enTranslation from './locales/en/translation.json';

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      ar: {
        translation: arTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
    fallbackLng: 'ar', // Default language
    lng: localStorage.getItem('i18nextLng') || 'ar', // Get saved language or default to Arabic
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Update HTML direction based on language
const updateDirection = (lng) => {
  const direction = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = direction;
  document.documentElement.lang = lng;
  document.body.setAttribute('dir', direction);
};

// Set initial direction
updateDirection(i18n.language);

// Update direction when language changes
i18n.on('languageChanged', (lng) => {
  updateDirection(lng);
});

export default i18n;

