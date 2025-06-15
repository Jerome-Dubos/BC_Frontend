import { motion } from "framer-motion";
import React from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import "./Overview.css";

const Overview = ({ user, getBadgesForRole }) => {
  const renderBadges = () => {
    const badges = getBadgesForRole(user?.role || "student");

    return (
      <div className="achievements-section">
        <h3>
          Badges {user?.role === "student" ? "obtenus" : "de performance"}
        </h3>
        <div className="badges-container">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={badge.id}
                className={`achievement-badge ${
                  badge.earned ? "earned" : "locked"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: badge.id * 0.1 }}
                whileHover={{ scale: badge.earned ? 1.05 : 1 }}
              >
                <div className="badge-icon-wrapper">
                  <IconComponent
                    size={24}
                    style={{
                      color: badge.earned ? badge.color : "#6B7280",
                      filter: badge.earned ? "none" : "grayscale(100%)",
                    }}
                  />
                  {!badge.earned && (
                    <IoLockClosedOutline
                      size={12}
                      className="lock-icon"
                      style={{ color: "#6B7280" }}
                    />
                  )}
                </div>
                <span className="badge-title">{badge.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="overview-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stats-grid">
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>
              {user?.role === "student"
                ? "12"
                : user?.role === "teacher"
                ? "8"
                : "25"}
            </h3>
            <p>
              {user?.role === "student"
                ? "Cours suivis"
                : user?.role === "teacher"
                ? "Cours enseignés"
                : "Cours totaux"}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>
              {user?.role === "student"
                ? "45h"
                : user?.role === "teacher"
                ? "120h"
                : "350h"}
            </h3>
            <p>
              {user?.role === "student"
                ? "Temps d'étude"
                : user?.role === "teacher"
                ? "Heures enseignées"
                : "Heures totales"}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>
              {user?.role === "student"
                ? "B1"
                : user?.role === "teacher"
                ? "4.8/5"
                : "92%"}
            </h3>
            <p>
              {user?.role === "student"
                ? "Niveau actuel"
                : user?.role === "teacher"
                ? "Note moyenne"
                : "Satisfaction"}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>
              {user?.role === "student"
                ? "7"
                : user?.role === "teacher"
                ? "15"
                : "45"}
            </h3>
            <p>
              {user?.role === "student"
                ? "Badges obtenus"
                : user?.role === "teacher"
                ? "Certifications"
                : "Réussites totales"}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="recent-activity">
        <h3>Activité récente</h3>
        <div className="activity-list">
          <motion.div
            className="activity-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="activity-icon">📖</div>
            <span>
              {user?.role === "student"
                ? "Cours terminé : Grammaire avancée"
                : user?.role === "teacher"
                ? "Cours créé : Conversation B2"
                : "Nouveau professeur ajouté"}
            </span>
            <span className="activity-time">Il y a 2 heures</span>
          </motion.div>

          <motion.div
            className="activity-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="activity-icon">🎯</div>
            <span>
              {user?.role === "student"
                ? "Exercice réussi : Present Perfect"
                : user?.role === "teacher"
                ? "Évaluation notée : Marie Dupont"
                : "Rapport mensuel généré"}
            </span>
            <span className="activity-time">Hier</span>
          </motion.div>

          <motion.div
            className="activity-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="activity-icon">🏆</div>
            <span>
              {user?.role === "student"
                ? "Badge obtenu : Studieux"
                : user?.role === "teacher"
                ? "Badge obtenu : Mentor"
                : "Objectif atteint : 100 étudiants"}
            </span>
            <span className="activity-time">Il y a 3 jours</span>
          </motion.div>
        </div>
      </div>

      {renderBadges()}
    </motion.div>
  );
};

export default Overview;
