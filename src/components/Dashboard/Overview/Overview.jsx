import { motion } from "framer-motion";
import React from "react";
import { IoLockClosedOutline, IoTrendingUpOutline } from "react-icons/io5";
import "./Overview.css";

const Overview = ({ user, getBadgesForRole }) => {
  // Données dynamiques selon le profil pour la démo
  const getProfileData = (role) => {
    switch (role) {
      case "student":
        return {
          stats: [
            {
              icon: "📚",
              value: "12",
              label: "Cours suivis",
              trend: "+2",
              trendPercent: "+18%",
              color: "#4CAF50",
              detail: "2 nouveaux ce mois",
            },
            {
              icon: "⏱️",
              value: "45h",
              label: "Temps d'étude",
              trend: "+8h",
              trendPercent: "+22%",
              color: "#2196F3",
              detail: "Cette semaine",
            },
            {
              icon: "🎯",
              value: "B1",
              label: "Niveau actuel",
              trend: "↗️",
              trendPercent: "En progression",
              color: "#FF9800",
              detail: "Vers B2 bientôt",
            },
            {
              icon: "🏆",
              value: "7",
              label: "Badges obtenus",
              trend: "+2",
              trendPercent: "+40%",
              color: "#9C27B0",
              detail: "Ce mois-ci",
            },
          ],
          activities: [
            {
              icon: "📖",
              text: "Cours terminé : Grammaire avancée",
              time: "Il y a 2 heures",
              type: "success",
            },
            {
              icon: "🎯",
              text: "Exercice réussi : Present Perfect (95%)",
              time: "Hier",
              type: "achievement",
            },
            {
              icon: "🏆",
              text: "Badge obtenu : Studieux",
              time: "Il y a 3 jours",
              type: "badge",
            },
            {
              icon: "📝",
              text: "Devoir rendu : Essay sur la culture",
              time: "Il y a 5 jours",
              type: "task",
            },
          ],
        };

      case "teacher":
        return {
          stats: [
            {
              icon: "📚",
              value: "8",
              label: "Cours enseignés",
              trend: "+1",
              trendPercent: "+15%",
              color: "#4CAF50",
              detail: "Nouveau cours ajouté",
            },
            {
              icon: "⏱️",
              value: "120h",
              label: "Heures enseignées",
              trend: "+25h",
              trendPercent: "+26%",
              color: "#2196F3",
              detail: "Ce mois-ci",
            },
            {
              icon: "🎯",
              value: "4.8/5",
              label: "Note moyenne",
              trend: "+0.3",
              trendPercent: "+6%",
              color: "#FF9800",
              detail: "Excellente évaluation",
            },
            {
              icon: "🏆",
              value: "15",
              label: "Certifications",
              trend: "+3",
              trendPercent: "+25%",
              color: "#9C27B0",
              detail: "Nouveaux accomplissements",
            },
          ],
          activities: [
            {
              icon: "📖",
              text: "Cours créé : Conversation B2",
              time: "Il y a 2 heures",
              type: "creation",
            },
            {
              icon: "🎯",
              text: "Évaluation notée : Marie Dupont (18/20)",
              time: "Hier",
              type: "evaluation",
            },
            {
              icon: "🏆",
              text: "Badge obtenu : Mentor",
              time: "Il y a 3 jours",
              type: "badge",
            },
            {
              icon: "👥",
              text: "Nouveau étudiant assigné : Jean Martin",
              time: "Il y a 5 jours",
              type: "student",
            },
          ],
        };

      default: // director
        return {
          stats: [
            {
              icon: "📚",
              value: "25",
              label: "Cours totaux",
              trend: "+3",
              trendPercent: "+14%",
              color: "#4CAF50",
              detail: "Nouveaux programmes",
            },
            {
              icon: "⏱️",
              value: "350h",
              label: "Heures totales",
              trend: "+45h",
              trendPercent: "+15%",
              color: "#2196F3",
              detail: "Ce trimestre",
            },
            {
              icon: "🎯",
              value: "92%",
              label: "Satisfaction",
              trend: "+5%",
              trendPercent: "+5.7%",
              color: "#FF9800",
              detail: "Taux record !",
            },
            {
              icon: "🏆",
              value: "45",
              label: "Réussites totales",
              trend: "+12",
              trendPercent: "+36%",
              color: "#9C27B0",
              detail: "Mois exceptionnel",
            },
          ],
          activities: [
            {
              icon: "👨‍🏫",
              text: "Nouveau professeur ajouté : Dr. Laurent",
              time: "Il y a 2 heures",
              type: "hire",
            },
            {
              icon: "📊",
              text: "Rapport mensuel généré (↗️ +15%)",
              time: "Hier",
              type: "report",
            },
            {
              icon: "🎯",
              text: "Objectif atteint : 100 étudiants",
              time: "Il y a 3 jours",
              type: "milestone",
            },
            {
              icon: "💰",
              text: "Revenus mensuels : +22% vs l'an passé",
              time: "Il y a 5 jours",
              type: "financial",
            },
          ],
        };
    }
  };

  const profileData = getProfileData(user?.role || "student");

  const renderBadges = () => {
    const badges = getBadgesForRole(user?.role || "student");

    return (
      <motion.div
        className="achievements-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="section-header">
          <h3>
            {user?.role === "student"
              ? "🎖️ Badges obtenus"
              : user?.role === "teacher"
              ? "🏅 Badges de performance"
              : "🏆 Badges de leadership"}
          </h3>
          <span className="badge-count">
            {badges.filter((b) => b.earned).length}/{badges.length}
          </span>
        </div>
        <div className="badges-container">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={badge.id}
                className={`achievement-badge ${
                  badge.earned ? "earned" : "locked"
                }`}
                initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  delay: 0.7 + index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: badge.earned ? 1.1 : 1.02,
                  rotateY: badge.earned ? 15 : 0,
                  transition: { duration: 0.3 },
                }}
                title={
                  badge.earned
                    ? `Badge "${badge.name}" obtenu !`
                    : `Badge "${badge.name}" à débloquer`
                }
              >
                <div className="badge-icon-wrapper">
                  <IconComponent
                    size={28}
                    style={{
                      color: badge.earned ? badge.color : "#6B7280",
                      filter: badge.earned ? "none" : "grayscale(100%)",
                    }}
                  />
                  {!badge.earned && (
                    <IoLockClosedOutline
                      size={14}
                      className="lock-icon"
                      style={{ color: "#6B7280" }}
                    />
                  )}
                  {badge.earned && (
                    <motion.div
                      className="badge-glow"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </div>
                <span className="badge-title">{badge.name}</span>
                {badge.earned && (
                  <motion.div
                    className="badge-earned-indicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                  >
                    ✨
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="overview-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Statistiques améliorées */}
      <div className="stats-grid">
        {profileData.stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card enhanced"
            initial={{ opacity: 0, scale: 0.9, rotateX: 45 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{
              delay: 0.1 + index * 0.1,
              duration: 0.6,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.02,
              rotateX: -2,
              boxShadow: "0 20px 40px rgba(234, 189, 131, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="stat-icon-enhanced">
              <span className="icon-emoji">{stat.icon}</span>
              <motion.div
                className="icon-pulse"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="stat-content">
              <div className="stat-value-container">
                <motion.h3
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.h3>
                <motion.div
                  className="stat-trend"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  style={{ color: stat.color }}
                >
                  <IoTrendingUpOutline size={14} />
                  <span>{stat.trend}</span>
                </motion.div>
              </div>
              <p>{stat.label}</p>
              <motion.div
                className="stat-detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <span className="trend-percent" style={{ color: stat.color }}>
                  {stat.trendPercent}
                </span>
                <span className="detail-text">{stat.detail}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activité récente améliorée */}
      <motion.div
        className="recent-activity enhanced"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="section-header">
          <h3>📈 Activité récente</h3>
          <span className="activity-count">
            {profileData.activities.length} événements
          </span>
        </div>
        <div className="activity-list">
          {profileData.activities.map((activity, index) => (
            <motion.div
              key={index}
              className={`activity-item enhanced ${activity.type}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{
                x: 10,
                backgroundColor: "rgba(234, 189, 131, 0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="activity-icon enhanced"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {activity.icon}
              </motion.div>
              <div className="activity-content">
                <span className="activity-text">{activity.text}</span>
                <span className="activity-time">{activity.time}</span>
              </div>
              <motion.div
                className="activity-status"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                ✓
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Badges */}
      {renderBadges()}
    </motion.div>
  );
};

export default Overview;
