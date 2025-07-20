import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TestEmailForm from "../../components/Test/TestEmailForm";
import TestLanguageSelection from "../../components/Test/TestLanguageSelection";
import TestQuestion from "../../components/Test/TestQuestion";
import TestResult from "../../components/Test/TestResult";
import { englishQuestions } from "../../tests/englishTest";
import { frenchQuestions } from "../../tests/frenchTest";
import { germanQuestions } from "../../tests/germanTest";
import { spanishQuestions } from "../../tests/spanishTest";
import { calculateLevel, levels as configLevels } from "../../tests/testConfig";
import "./Test.css";

const Test = () => {
  const { t } = useTranslation();
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
  const handleEmailSubmit = (email) => {
    setUserEmail(email);
    setCurrentStep("test");
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

  // Animation des icônes flottantes
  const floatingIcons = [
    { icon: "⭐", delay: 0, x: 20, y: -30 },
    { icon: "📚", delay: 0.5, x: -25, y: 40 },
    { icon: "🎯", delay: 1, x: 30, y: 20 },
    { icon: "✨", delay: 1.5, x: -40, y: -20 },
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
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <div className="test-container">
        {currentStep === "language" && (
          <TestLanguageSelection onLanguageSelect={handleLanguageSelect} />
        )}

        {currentStep === "email" && (
          <TestEmailForm 
            onEmailSubmit={handleEmailSubmit} 
            selectedLanguage={selectedLanguage} 
          />
        )}

        {currentStep === "test" && (
          <TestQuestion
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        )}

        {currentStep === "result" && testResult && (
          <TestResult result={testResult} onRestart={restartTest} />
        )}
      </div>
    </div>
  );
};

export default Test;
