import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./TestLanguageSelection.css";

const TestLanguageSelection = ({ onLanguageSelect }) => {
  const { t } = useTranslation();

  // Configuration des langues avec traductions
  const languages = {
    english: {
      name: t("test.languages.english.name"),
      flag: "🇬🇧",
      code: "EN",
      description: t("test.languages.english.description"),
    },
    spanish: {
      name: t("test.languages.spanish.name"),
      flag: "🇪🇸",
      code: "ES",
      description: t("test.languages.spanish.description"),
    },
    german: {
      name: t("test.languages.german.name"),
      flag: "🇩🇪",
      code: "DE",
      description: t("test.languages.german.description"),
    },
    french: {
      name: t("test.languages.french.name"),
      flag: "🇫🇷",
      code: "FR",
      description: t("test.languages.french.description"),
    },
  };

  return (
    <motion.div
      className="test-step language-selection"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="step-header">
        <h2>{t("test.language_selection_title")}</h2>
        <p>{t("test.language_selection_desc")}</p>
      </div>

      <div className="languages-grid">
        {Object.entries(languages).map(([key, language]) => (
          <motion.button
            key={key}
            className="language-card"
            onClick={() => onLanguageSelect(key)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="language-flag">{language.flag}</div>
            <div className="language-info">
              <h3>{language.name}</h3>
              <p>{language.description}</p>
            </div>
            <div className="language-code">{language.code}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TestLanguageSelection; 