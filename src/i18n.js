import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

// Config de base : ajouter d'autres langues simplement dans resources
const resources = {
  fr: { translation: fr },
  en: { translation: en },
};

i18n
  .use(LanguageDetector) // détecte la langue navigateur et la stocke dans localStorage
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false, // React se charge déjà de l'échappement
    },
  });

export default i18n;
