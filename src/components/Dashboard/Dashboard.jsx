import React from "react";
import { useStore } from "../../store/store";
import { calculateProgress } from "../../utils/gamification";
import "./Dashboard.css";

const Dashboard = () => {
  const { statistics, badges, progress } = useStore();
  const { currentLevel, progress: levelProgress } = calculateProgress(
    statistics.totalPoints
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Tableau de Bord</h1>
        <div className="level-info">
          <span className="level">Niveau {currentLevel}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <span className="progress-text">{Math.round(levelProgress)}%</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stats-card">
          <h2>Statistiques</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Tests complétés</span>
              <span className="stat-value">{statistics.testsCompleted}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Score moyen</span>
              <span className="stat-value">{statistics.averageScore}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Temps total</span>
              <span className="stat-value">
                {Math.round(statistics.timeSpent / 60)} min
              </span>
            </div>
          </div>
        </div>

        <div className="badges-card">
          <h2>Badges</h2>
          <div className="badges-grid">
            {badges.map((badge) => (
              <div key={badge.id} className="badge-item">
                <span className="badge-icon">{badge.icon}</span>
                <span className="badge-name">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="progress-card">
          <h2>Progression par langue</h2>
          <div className="languages-progress">
            {Object.entries(progress).map(([language, level]) => (
              <div key={language} className="language-progress">
                <span className="language-name">{language}</span>
                <div className="level-badge">{level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
