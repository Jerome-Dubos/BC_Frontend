import PropTypes from "prop-types";
import React from "react";
import "./TestResults.css";

const TestResults = ({ results, questions }) => {
  const { score, points, timeSpent } = results;

  return (
    <div className="test-results">
      <div className="results-header">
        <h2>Résultats du Test</h2>
        <div className="results-summary">
          <div className="score-circle">
            <span className="score-value">{Math.round(score)}%</span>
            <span className="score-label">Score</span>
          </div>
          <div className="results-details">
            <div className="detail-item">
              <span className="detail-label">Points gagnés</span>
              <span className="detail-value">{points}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Temps</span>
              <span className="detail-value">
                {Math.round(timeSpent / 60)} min
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="questions-review">
        <h3>Détail des réponses</h3>
        {questions.map((question, index) => {
          const userAnswer = results.answers[index];
          const isCorrect = userAnswer === question.correct;

          return (
            <div
              key={question.id}
              className={`question-review ${
                isCorrect ? "correct" : "incorrect"
              }`}
            >
              <div className="question-header">
                <span className="question-number">Question {index + 1}</span>
                <span className="question-coefficient">
                  Coefficient: {question.coefficient}
                </span>
              </div>

              <div className="question-content">
                <p className="question-text">{question.question}</p>
                <div className="options-review">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`option-review ${
                        optIndex === question.correct
                          ? "correct-answer"
                          : optIndex === userAnswer
                          ? "user-answer"
                          : ""
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>

              {!isCorrect && (
                <div className="explanation">
                  <strong>Explication :</strong> {question.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

TestResults.propTypes = {
  results: PropTypes.shape({
    score: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    timeSpent: PropTypes.number.isRequired,
    answers: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correct: PropTypes.number.isRequired,
      coefficient: PropTypes.number.isRequired,
      explanation: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TestResults;
