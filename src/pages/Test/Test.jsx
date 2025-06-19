import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./Test.css";

// Import des icônes React Icons
import {
  FaArrowRight,
  FaBook,
  FaBullseye,
  FaClock,
  FaCrosshairs,
  FaEnvelope,
  FaFileAlt,
  FaMagic,
  FaPhone,
  FaStar,
  FaSync,
} from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";

// Import des tests et configuration
import { englishQuestions } from "../../tests/englishTest";
import { frenchQuestions } from "../../tests/frenchTest";
import { germanQuestions } from "../../tests/germanTest";
import { spanishQuestions } from "../../tests/spanishTest";
import { calculateLevel, levels as configLevels } from "../../tests/testConfig";

const Test = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("language"); // 'language', 'email', 'test', 'result'
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [testResult, setTestResult] = useState(null);

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

  // Configuration des niveaux avec traductions
  const levels = {
    A1: {
      name: t("test.levels.A1.name"),
      description: t("test.levels.A1.description"),
      color: configLevels.A1.color,
    },
    A2: {
      name: t("test.levels.A2.name"),
      description: t("test.levels.A2.description"),
      color: configLevels.A2.color,
    },
    B1: {
      name: t("test.levels.B1.name"),
      description: t("test.levels.B1.description"),
      color: configLevels.B1.color,
    },
    B2: {
      name: t("test.levels.B2.name"),
      description: t("test.levels.B2.description"),
      color: configLevels.B2.color,
    },
    C1: {
      name: t("test.levels.C1.name"),
      description: t("test.levels.C1.description"),
      color: configLevels.C1.color,
    },
    C2: {
      name: t("test.levels.C2.name"),
      description: t("test.levels.C2.description"),
      color: configLevels.C2.color,
    },
  };

  // Sélection des questions selon la langue
  const getQuestions = () => {
    switch (selectedLanguage) {
      case "english":
        return englishQuestions;
      case "spanish":
        return spanishQuestions;
      case "german":
        return germanQuestions;
      case "french":
        return frenchQuestions;
      default:
        return englishQuestions;
    }
  };

  const questions = getQuestions();

  // Gestion de la sélection de langue
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setCurrentStep("email");
  };

  // Gestion de la soumission de l'email
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (userEmail.trim() && userEmail.includes("@")) {
      setCurrentStep("test");
    }
  };

  // Gestion de la réponse à une question
  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Test terminé, calculer le résultat
      const level = calculateLevel(newAnswers, questions);
      const correctCount = newAnswers.filter(
        (answer, index) => answer === questions[index].correct
      ).length;

      const result = {
        language: selectedLanguage,
        languageInfo: languages[selectedLanguage],
        level,
        levelInfo: levels[level],
        score: Math.round((correctCount / questions.length) * 100),
        correctAnswers: correctCount,
        totalQuestions: questions.length,
        userEmail,
      };

      setTestResult(result);
      setCurrentStep("result");

      // Simulation d'envoi d'email
      sendResultByEmail(result);
    }
  };

  // Simulation d'envoi d'email
  const sendResultByEmail = async (result) => {
    try {
      // Ici vous intégreriez votre service d'email (EmailJS, Nodemailer, etc.)
      console.log("Envoi du résultat par email:", {
        to: result.userEmail,
        admin: "admin@boncours.fr",
        result: result,
      });

      // Simulation d'une requête API
      // await fetch('/api/send-test-result', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(result)
      // });
    } catch (error) {
      console.error("Erreur envoi email:", error);
    }
  };

  // Redémarrer le test
  const restartTest = () => {
    setCurrentStep("language");
    setSelectedLanguage("");
    setUserEmail("");
    setCurrentQuestion(0);
    setAnswers([]);
    setTestResult(null);
  };

  // Navigation vers la page contact
  const handleContactClick = () => {
    navigate("/about");
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

  // Animation des icônes flottantes
  const floatingIcons = [
    { icon: FaStar, delay: 0, x: 20, y: -30 },
    { icon: FaBook, delay: 0.5, x: -25, y: 40 },
    { icon: FaBullseye, delay: 1, x: 30, y: 20 },
    { icon: FaMagic, delay: 1.5, x: -40, y: -20 },
  ];

  return (
    <div className="test-page">
      {/* Éléments décoratifs flottants */}
      <div className="floating-elements">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="floating-icon"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.2,
              scale: 1,
              x: [0, item.x, 0],
              y: [0, item.y, 0],
            }}
            transition={{
              duration: 6,
              delay: item.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <item.icon />
          </motion.div>
        ))}
      </div>

      <div className="test-container">
        {/* Étape 0: Sélection de la langue */}
        {currentStep === "language" && (
          <motion.div
            className="language-step"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="test-header">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {t("test.title")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {t("test.language_selection_desc")}
              </motion.p>
            </div>

            <div className="language-grid">
              {Object.entries(languages).map(([key, language], index) => (
                <motion.button
                  key={key}
                  className="language-card"
                  onClick={() => handleLanguageSelect(key)}
                  whileHover={{
                    scale: 1.02,
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <motion.div
                    className="language-flag"
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    {language.flag}
                  </motion.div>
                  <h3>{language.name}</h3>
                  <p>{language.description}</p>
                  <div className="language-code">{language.code}</div>

                  {/* Effet de particules au hover */}
                  <div className="card-particles">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`particle particle-${i + 1}`}
                      ></div>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Étape 1: Saisie de l'email */}
        {currentStep === "email" && (
          <motion.div
            className="email-step"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="test-header">
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {t("test.test_of")} {languages[selectedLanguage]?.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {t("test.evaluation_desc")}
              </motion.p>
            </div>

            <motion.div
              className="email-form-container"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                className="selected-language-header"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="selected-language">
                  <motion.span
                    className="language-flag-large"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    {languages[selectedLanguage]?.flag}
                  </motion.span>
                  <span>
                    {t("test.test_of")} {languages[selectedLanguage]?.name}
                  </span>
                </div>
                <motion.button
                  className="change-language-btn"
                  onClick={() => setCurrentStep("language")}
                  title={t("test.change_language")}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HiOutlineRefresh className="change-icon" />
                  <span>{t("test.change_language")}</span>
                </motion.button>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {t("test.before_start")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {t("test.email_instruction")}
              </motion.p>

              <motion.form
                onSubmit={handleEmailSubmit}
                className="email-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="form-group">
                  <label htmlFor="email">{t("test.email_label")}</label>
                  <motion.input
                    type="email"
                    id="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder={t("test.email_placeholder")}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="start-test-btn"
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    boxShadow: "0 20px 40px rgba(234, 189, 131, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span>{t("test.start_test")}</span>
                  <motion.span
                    className="btn-arrow"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </motion.button>
              </motion.form>

              <motion.div
                className="test-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {[
                  { icon: FaClock, text: t("test.duration") },
                  { icon: FaFileAlt, text: t("test.questions_count") },
                  { icon: FaCrosshairs, text: t("test.level_cecrl") },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="info-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <item.icon className="info-icon" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Étape 2: Test en cours */}
        {currentStep === "test" && (
          <motion.div
            className="test-step"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="test-header-mini"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="test-language-info">
                <motion.span
                  className="language-flag-test"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {languages[selectedLanguage]?.flag}
                </motion.span>
                <span className="language-name">
                  {t("test.test_of")} {languages[selectedLanguage]?.name}
                </span>
                <motion.button
                  className="change-language-test-btn"
                  onClick={() => {
                    if (window.confirm(t("test.change_language_warning"))) {
                      setCurrentStep("language");
                      setCurrentQuestion(0);
                      setAnswers([]);
                    }
                  }}
                  title={t("test.change_language")}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <HiOutlineRefresh className="change-icon-small" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="test-progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="progress-info">
                <motion.span
                  key={currentQuestion}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("test.question_of")} {currentQuestion + 1} {t("test.of")}{" "}
                  {questions.length}
                </motion.span>
                <div className="language-indicator">
                  <span className="language-flag-small">
                    {languages[selectedLanguage]?.flag}
                  </span>
                  <motion.span
                    key={questions[currentQuestion].level}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {t("test.level")} {questions[currentQuestion].level}
                  </motion.span>
                </div>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                ></motion.div>
              </div>
            </motion.div>

            <motion.div
              className="question-container"
              key={currentQuestion}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="question-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {questions[currentQuestion].question}
              </motion.h2>

              <div className="options-grid">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className="option-btn"
                    onClick={() => handleAnswer(index)}
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      boxShadow: "0 15px 30px rgba(234, 189, 131, 0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <motion.span
                      className="option-letter"
                      whileHover={{ scale: 1.2 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </motion.span>
                    <span className="option-text">{option}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Étape 3: Résultats */}
        {currentStep === "result" && testResult && (
          <motion.div
            className="result-step"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="result-header"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1>{t("test.congratulations")}</h1>
              <p>
                {t("test.test_completed")} {testResult.languageInfo.name}{" "}
                {t("test.is_completed")}
              </p>
            </motion.div>

            <motion.div
              className="result-card"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                type: "spring",
                stiffness: 80,
              }}
            >
              <motion.div
                className="level-badge"
                style={{ backgroundColor: testResult.levelInfo.color }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.6,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="result-language">
                  <motion.span
                    className="language-flag-result"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    {testResult.languageInfo.flag}
                  </motion.span>
                  <span>{testResult.languageInfo.name}</span>
                </div>
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {testResult.levelInfo.name}
                </motion.h2>
                <motion.div
                  className="score"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {testResult.score}%
                </motion.div>
              </motion.div>

              <motion.div
                className="result-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <p className="level-description">
                  {testResult.levelInfo.description}
                </p>

                <div className="score-breakdown">
                  {[
                    {
                      label: t("test.correct_answers"),
                      value: `${testResult.correctAnswers}/${testResult.totalQuestions}`,
                    },
                    {
                      label: t("test.percentage"),
                      value: `${testResult.score}%`,
                    },
                    { label: t("test.cecrl_level"), value: testResult.level },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="score-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="result-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <motion.div
                className="email-notification"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                <p>
                  <FaEnvelope
                    style={{ marginRight: "8px", color: "#4CAF50" }}
                  />
                  {t("test.email_sent")} <strong>{testResult.userEmail}</strong>
                </p>
                <p>
                  <FaPhone style={{ marginRight: "8px", color: "#4CAF50" }} />
                  {t("test.contact_info")}
                </p>
              </motion.div>

              <div className="action-buttons">
                <motion.button
                  className="retry-btn"
                  onClick={restartTest}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    boxShadow: "0 15px 30px rgba(234, 189, 131, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSync style={{ marginRight: "8px" }} />
                  {t("test.test_another_language")}
                </motion.button>
                <motion.button
                  className="contact-btn"
                  onClick={handleContactClick}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    boxShadow: "0 15px 30px rgba(54, 66, 82, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope style={{ marginRight: "8px" }} />
                  {t("test.contact_us")}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Test;
