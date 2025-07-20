import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { 
  IoCheckmarkCircleOutline,
  IoMailOutline,
  IoRefreshOutline,
  IoStarOutline,
  IoTrophyOutline,
} from "react-icons/io5";

const TestResult = ({ result, onRestart }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
    // Attendre que la navigation soit terminée puis faire défiler vers le formulaire
    setTimeout(() => {
      const contactForm = document.getElementById("contact-form");
      if (contactForm) {
        contactForm.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // Si l'élément n'est pas encore trouvé, essayer une fois de plus
        setTimeout(() => {
          const contactFormRetry = document.getElementById("contact-form");
          if (contactFormRetry) {
            contactFormRetry.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 500);
      }
    }, 300);
  };

  return (
    <motion.div
      className="test-step result"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <div className="result-header">
        <motion.div
          className="result-icon"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <IoTrophyOutline />
        </motion.div>
        <h2>{t("test.result_title")}</h2>
        <p>{t("test.result_subtitle")}</p>
      </div>

      <div className="result-content">
        <div className="result-card">
          <div className="result-language">
            <span className="language-flag">{result.languageInfo.flag}</span>
            <h3>{result.languageInfo.name}</h3>
          </div>

          <div className="result-level">
            <div className="level-badge" style={{ backgroundColor: result.levelInfo.color }}>
              {result.level}
            </div>
            <h4>{result.levelInfo.name}</h4>
            <p>{result.levelInfo.description}</p>
          </div>

          <div className="result-stats">
            <div className="stat-item">
              <IoStarOutline />
              <span className="stat-label">{t("test.score")}</span>
              <span className="stat-value">{result.score}%</span>
            </div>
            <div className="stat-item">
              <IoCheckmarkCircleOutline />
              <span className="stat-label">{t("test.correct_answers")}</span>
              <span className="stat-value">{result.correctAnswers}/{result.totalQuestions}</span>
            </div>
          </div>
        </div>

        <div className="result-actions">
          <motion.button
            className="action-btn primary"
            onClick={handleContactClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoMailOutline />
            {t("test.contact_us")}
          </motion.button>

          <motion.button
            className="action-btn secondary"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoRefreshOutline />
            {t("test.restart_test")}
          </motion.button>
        </div>

        <div className="result-info">
          <p>
            <IoMailOutline />
            {t("test.email_sent")} <strong>{result.userEmail}</strong>
          </p>
          <p>{t("test.result_info")}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestResult; 