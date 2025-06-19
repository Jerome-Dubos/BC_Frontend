import React from "react";
import { IoLockClosedOutline, IoTrendingUpOutline } from "react-icons/io5";
import "./Overview.css";

const Overview = ({ user, getBadgesForRole }) => {
  const getProfileData = (role) => {
    if (role === "student") {
      return {
        stats: [
          {
            icon: "📚",
            value: "8",
            label: "Cours suivis",
            trend: "+2",
            trendPercent: "+15%",
            color: "#22C55E",
            detail: "Ce mois",
          },
          {
            icon: "⭐",
            value: "4.8",
            label: "Moyenne générale",
            trend: "+0.3",
            trendPercent: "+6%",
            color: "#F59E0B",
            detail: "En amélioration",
          },
          {
            icon: "🎯",
            value: "92%",
            label: "Assiduité",
            trend: "+5%",
            trendPercent: "+5%",
            color: "#3B82F6",
            detail: "Excellent",
          },
          {
            icon: "🏆",
            value: "12",
            label: "Badges obtenus",
            trend: "+3",
            trendPercent: "+33%",
            color: "#8B5CF6",
            detail: "Ce trimestre",
          },
        ],
        activities: [
          {
            icon: "📝",
            text: "Test d'anglais complété (18/20)",
            time: "Il y a 2 heures",
            type: "test",
          },
          {
            icon: "🎓",
            text: "Badge 'Premier de classe' obtenu",
            time: "Hier",
            type: "achievement",
          },
          {
            icon: "📖",
            text: "Nouveau cours d'espagnol ajouté",
            time: "Il y a 2 jours",
            type: "course",
          },
          {
            icon: "⚡",
            text: "Série de 7 jours consécutifs",
            time: "Il y a 3 jours",
            type: "streak",
          },
        ],
      };
    } else if (role === "teacher") {
      return {
        stats: [
          {
            icon: "👥",
            value: "156",
            label: "Étudiants",
            trend: "+12",
            trendPercent: "+8%",
            color: "#22C55E",
            detail: "Nouveau semestre",
          },
          {
            icon: "📚",
            value: "6",
            label: "Cours enseignés",
            trend: "+1",
            trendPercent: "+20%",
            color: "#3B82F6",
            detail: "Ce semestre",
          },
          {
            icon: "⭐",
            value: "4.9",
            label: "Note moyenne",
            trend: "+0.2",
            trendPercent: "+4%",
            color: "#F59E0B",
            detail: "Évaluations étudiants",
          },
          {
            icon: "📊",
            value: "87%",
            label: "Taux de réussite",
            trend: "+5%",
            trendPercent: "+6%",
            color: "#8B5CF6",
            detail: "Trimestre actuel",
          },
        ],
        activities: [
          {
            icon: "✅",
            text: "15 copies corrigées (Anglais B2)",
            time: "Il y a 1 heure",
            type: "grading",
          },
          {
            icon: "📅",
            text: "Planning mis à jour pour la semaine",
            time: "Il y a 3 heures",
            type: "schedule",
          },
          {
            icon: "🎯",
            text: "Objectif mensuel atteint (85% réussite)",
            time: "Hier",
            type: "goal",
          },
          {
            icon: "📧",
            text: "Nouveau message de l'administration",
            time: "Il y a 2 jours",
            type: "message",
          },
        ],
      };
    } else {
      return {
        stats: [
          {
            icon: "🏫",
            value: "324",
            label: "Étudiants totaux",
            trend: "+28",
            trendPercent: "+9%",
            color: "#22C55E",
            detail: "Nouveau record",
          },
          {
            icon: "👨‍🏫",
            value: "18",
            label: "Professeurs",
            trend: "+2",
            trendPercent: "+12%",
            color: "#3B82F6",
            detail: "Équipe agrandie",
          },
          {
            icon: "💰",
            value: "€45,750",
            label: "Revenus mensuels",
            trend: "+€8,200",
            trendPercent: "+22%",
            color: "#10B981",
            detail: "Mois exceptionnel",
          },
          {
            icon: "📈",
            value: "96%",
            label: "Satisfaction",
            trend: "+3%",
            trendPercent: "+3%",
            color: "#F59E0B",
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
      <div className="overview-badges-section">
        <div className="section-header">
          <h3 className="overview-section-title">
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
        <div className="overview-badges-grid">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={badge.id}
                className={`overview-achievement-badge ${
                  badge.earned ? "earned" : "locked"
                }`}
                title={
                  badge.earned
                    ? `Badge "${badge.name}" obtenu !`
                    : `Badge "${badge.name}" à débloquer`
                }
              >
                <div className="overview-badge-icon-wrapper">
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
                  {badge.earned && <div className="badge-glow" />}
                </div>
                <span className="overview-badge-title">{badge.name}</span>
                {badge.earned && (
                  <div className="badge-earned-indicator">✨</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="overview-section">
      {/* Statistiques améliorées */}
      <div className="overview-stats-grid">
        {profileData.stats.map((stat, index) => (
          <div key={index} className="overview-stat-card">
            <div className="overview-stat-header">
              <span className="overview-stat-icon">{stat.icon}</span>
              <div
                className="overview-stat-trend"
                style={{ color: stat.color }}
              >
                <IoTrendingUpOutline size={14} />
                <span>{stat.trend}</span>
              </div>
            </div>
            <div className="overview-stat-value">{stat.value}</div>
            <div className="overview-stat-label">{stat.label}</div>
            <div className="overview-stat-detail">
              <span className="trend-percent" style={{ color: stat.color }}>
                {stat.trendPercent}
              </span>
              <span> • {stat.detail}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-main-content">
        {/* Activité récente améliorée */}
        <div className="overview-recent-activity">
          <h3 className="overview-section-title">📈 Activité récente</h3>
          <div className="overview-activity-list">
            {profileData.activities.map((activity, index) => (
              <div
                key={index}
                className={`overview-activity-item overview-activity-type-${activity.type}`}
              >
                <div className="overview-activity-icon">{activity.icon}</div>
                <div className="overview-activity-content">
                  <div className="overview-activity-text">{activity.text}</div>
                  <div className="overview-activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        {renderBadges()}
      </div>
    </div>
  );
};

export default Overview;
