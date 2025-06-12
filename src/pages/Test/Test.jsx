import { motion } from "framer-motion";
import { useState } from "react";
import "./Test.css";

// Import des tests et configuration
import { englishQuestions } from "../../tests/englishTest";
import { frenchQuestions } from "../../tests/frenchTest";
import { germanQuestions } from "../../tests/germanTest";
import { spanishQuestions } from "../../tests/spanishTest";
import { calculateLevel, languages, levels } from "../../tests/testConfig";

const Test = () => {
  const [currentStep, setCurrentStep] = useState("language"); // 'language', 'email', 'test', 'result'
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [testResult, setTestResult] = useState(null);

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

  return (
    <div className="test-page">
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
              <h1>Test de Placement</h1>
              <p>Choisissez la langue que vous souhaitez évaluer</p>
            </div>

            <div className="language-grid">
              {Object.entries(languages).map(([key, language]) => (
                <motion.button
                  key={key}
                  className="language-card"
                  onClick={() => handleLanguageSelect(key)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: Object.keys(languages).indexOf(key) * 0.1,
                  }}
                >
                  <div className="language-flag">{language.flag}</div>
                  <h3>{language.name}</h3>
                  <p>{language.description}</p>
                  <div className="language-code">{language.code}</div>
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
              <h1>Test de {languages[selectedLanguage]?.name}</h1>
              <p>Évaluez votre niveau selon le Cadre Européen (CECRL)</p>
            </div>

            <div className="email-form-container">
              <div className="selected-language-header">
                <div className="selected-language">
                  <span className="language-flag-large">
                    {languages[selectedLanguage]?.flag}
                  </span>
                  <span>Test de {languages[selectedLanguage]?.name}</span>
                </div>
                <button
                  className="change-language-btn"
                  onClick={() => setCurrentStep("language")}
                  title="Changer de langue"
                >
                  <span className="change-icon">🔄</span>
                  <span>Changer de langue</span>
                </button>
              </div>

              <h2>Avant de commencer</h2>
              <p>
                Veuillez saisir votre adresse email pour recevoir vos résultats
                détaillés
              </p>

              <form onSubmit={handleEmailSubmit} className="email-form">
                <div className="form-group">
                  <label htmlFor="email">Adresse email</label>
                  <input
                    type="email"
                    id="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <button type="submit" className="start-test-btn">
                  Commencer le test
                </button>
              </form>

              <div className="test-info">
                <div className="info-item">
                  <span className="info-icon">⏱️</span>
                  <span>Durée : 10-15 minutes</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">📝</span>
                  <span>15 questions progressives</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">🎯</span>
                  <span>Niveau CECRL (A1 à C2)</span>
                </div>
              </div>
            </div>
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
            <div className="test-header-mini">
              <div className="test-language-info">
                <span className="language-flag-test">
                  {languages[selectedLanguage]?.flag}
                </span>
                <span className="language-name">
                  Test de {languages[selectedLanguage]?.name}
                </span>
                <button
                  className="change-language-test-btn"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Êtes-vous sûr de vouloir changer de langue ? Votre progression sera perdue.`
                      )
                    ) {
                      setCurrentStep("language");
                      setCurrentQuestion(0);
                      setAnswers([]);
                    }
                  }}
                  title="Changer de langue (progression perdue)"
                >
                  <span className="change-icon-small">🔄</span>
                </button>
              </div>
            </div>

            <div className="test-progress">
              <div className="progress-info">
                <span>
                  Question {currentQuestion + 1} sur {questions.length}
                </span>
                <div className="language-indicator">
                  <span className="language-flag-small">
                    {languages[selectedLanguage]?.flag}
                  </span>
                  <span>Niveau: {questions[currentQuestion].level}</span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="question-container">
              <h2 className="question-text">
                {questions[currentQuestion].question}
              </h2>

              <div className="options-grid">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className="option-btn"
                    onClick={() => handleAnswer(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="option-text">{option}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Étape 3: Résultats */}
        {currentStep === "result" && testResult && (
          <motion.div
            className="result-step"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="result-header">
              <h1>Félicitations !</h1>
              <p>Votre test de {testResult.languageInfo.name} est terminé</p>
            </div>

            <div className="result-card">
              <div
                className="level-badge"
                style={{ backgroundColor: testResult.levelInfo.color }}
              >
                <div className="result-language">
                  <span className="language-flag-result">
                    {testResult.languageInfo.flag}
                  </span>
                  <span>{testResult.languageInfo.name}</span>
                </div>
                <h2>{testResult.levelInfo.name}</h2>
                <div className="score">{testResult.score}%</div>
              </div>

              <div className="result-details">
                <p className="level-description">
                  {testResult.levelInfo.description}
                </p>

                <div className="score-breakdown">
                  <div className="score-item">
                    <span>Bonnes réponses:</span>
                    <strong>
                      {testResult.correctAnswers}/{testResult.totalQuestions}
                    </strong>
                  </div>
                  <div className="score-item">
                    <span>Pourcentage:</span>
                    <strong>{testResult.score}%</strong>
                  </div>
                  <div className="score-item">
                    <span>Niveau CECRL:</span>
                    <strong>{testResult.level}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="result-actions">
              <div className="email-notification">
                <p>
                  ✅ Vos résultats détaillés ont été envoyés à{" "}
                  <strong>{testResult.userEmail}</strong>
                </p>
                <p>
                  📧 Notre équipe vous contactera sous 24h pour un entretien
                  personnalisé
                </p>
              </div>

              <div className="action-buttons">
                <button className="retry-btn" onClick={restartTest}>
                  Tester une autre langue
                </button>
                <button className="contact-btn">Nous contacter</button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Test;
