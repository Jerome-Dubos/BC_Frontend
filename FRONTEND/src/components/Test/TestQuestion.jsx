import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import "./TestQuestion.css";

const TestQuestion = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);

  const handleAnswerClick = (answerIndex) => {
    setSelected(answerIndex);
    setTimeout(() => {
      onAnswer(answerIndex);
    }, 200); // Laisse le temps d'afficher l'état sélectionné
  };

  return (
    <motion.div
      className="test-step question"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="question-header">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
        <div className="question-counter">
          {t("test.question")} {currentQuestion + 1} / {totalQuestions}
        </div>
      </div>

      <div className="question-content">
        <h3 className="question-text">{question.question}</h3>

        <div className="answers-grid">
          {question.options.map((answer, index) => (
            <motion.button
              key={index}
              className={`option-btn${selected === index ? " selected" : ""}`}
              onClick={() => handleAnswerClick(index)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              tabIndex={0}
            >
              <div className="answer-letter">
                {String.fromCharCode(65 + index)}
              </div>
              <div className="answer-text">{answer}</div>
              <IoCheckmarkCircleOutline className="answer-icon" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TestQuestion;
