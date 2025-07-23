import React from "react";
import { useTranslation } from "react-i18next";
import { IoLockClosedOutline, IoTrendingUpOutline } from "react-icons/io5";
import "./Overview.css";

const Overview = ({ user, getBadgesForRole }) => {
  const { t } = useTranslation();

  const getProfileData = (role) => {
    if (role === "student") {
      return {
        stats: [
          {
            icon: "📚",
            value: "8",
            label: t("dashboard.stats.student.coursesFollowed"),
            trend: "+2",
            trendPercent: "+15%",
            color: "#22C55E",
            detail: t("dashboard.stats.student.thisMonth"),
          },
          {
            icon: "⭐",
            value: "4.8",
            label: t("dashboard.stats.student.averageGrade"),
            trend: "+0.3",
            trendPercent: "+6%",
            color: "#F59E0B",
            detail: t("dashboard.stats.student.improving"),
          },
          {
            icon: "🎯",
            value: "92%",
            label: t("dashboard.stats.student.attendance"),
            trend: "+5%",
            trendPercent: "+5%",
            color: "#3B82F6",
            detail: t("dashboard.stats.student.excellent"),
          },
          {
            icon: "🏆",
            value: "12",
            label: t("dashboard.stats.student.badgesEarned"),
            trend: "+3",
            trendPercent: "+33%",
            color: "#8B5CF6",
            detail: t("dashboard.stats.student.thisQuarter"),
          },
        ],
        activities: [
          {
            icon: "📝",
            text: t("dashboard.activities.student.testCompleted", {
              score: 18,
            }),
            time: t("dashboard.activities.student.timeAgo.hours", { count: 2 }),
            type: "test",
          },
          {
            icon: "🎓",
            text: t("dashboard.activities.student.badgeEarned", {
              badge: "Premier de classe",
            }),
            time: t("dashboard.activities.student.timeAgo.yesterday"),
            type: "achievement",
          },
          {
            icon: "📖",
            text: t("dashboard.activities.student.newCourse"),
            time: t("dashboard.activities.student.timeAgo.days", { count: 2 }),
            type: "course",
          },
          {
            icon: "⚡",
            text: t("dashboard.activities.student.streak", { days: 7 }),
            time: t("dashboard.activities.student.timeAgo.days", { count: 3 }),
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
            label: t("dashboard.stats.teacher.students"),
            trend: "+12",
            trendPercent: "+8%",
            color: "#22C55E",
            detail: t("dashboard.stats.teacher.newSemester"),
          },
          {
            icon: "📚",
            value: "6",
            label: t("dashboard.stats.teacher.coursesTaught"),
            trend: "+1",
            trendPercent: "+20%",
            color: "#3B82F6",
            detail: t("dashboard.stats.teacher.thisSemester"),
          },
          {
            icon: "⭐",
            value: "4.9",
            label: t("dashboard.stats.teacher.averageRating"),
            trend: "+0.2",
            trendPercent: "+4%",
            color: "#F59E0B",
            detail: t("dashboard.stats.teacher.studentEvaluations"),
          },
          {
            icon: "📊",
            value: "87%",
            label: t("dashboard.stats.teacher.successRate"),
            trend: "+5%",
            trendPercent: "+6%",
            color: "#8B5CF6",
            detail: t("dashboard.stats.teacher.currentQuarter"),
          },
        ],
        activities: [
          {
            icon: "✅",
            text: t("dashboard.activities.teacher.gradingCompleted", {
              count: 15,
              subject: "Anglais B2",
            }),
            time: t("dashboard.activities.student.timeAgo.hours", { count: 1 }),
            type: "grading",
          },
          {
            icon: "📅",
            text: t("dashboard.activities.teacher.scheduleUpdated"),
            time: t("dashboard.activities.student.timeAgo.hours", { count: 3 }),
            type: "schedule",
          },
          {
            icon: "🎯",
            text: t("dashboard.activities.teacher.goalAchieved", {
              percentage: 85,
            }),
            time: t("dashboard.activities.student.timeAgo.yesterday"),
            type: "goal",
          },
          {
            icon: "📧",
            text: t("dashboard.activities.teacher.newMessage"),
            time: t("dashboard.activities.student.timeAgo.days", { count: 2 }),
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
            label: t("dashboard.stats.director.totalStudents"),
            trend: "+28",
            trendPercent: "+9%",
            color: "#22C55E",
            detail: t("dashboard.stats.director.newRecord"),
          },
          {
            icon: "👨‍🏫",
            value: "18",
            label: t("dashboard.stats.director.teachers"),
            trend: "+2",
            trendPercent: "+12%",
            color: "#3B82F6",
            detail: t("dashboard.stats.director.expandedTeam"),
          },
          {
            icon: "💰",
            value: "€45,750",
            label: t("dashboard.stats.director.monthlyRevenue"),
            trend: "+€8,200",
            trendPercent: "+22%",
            color: "#10B981",
            detail: t("dashboard.stats.director.exceptionalMonth"),
          },
          {
            icon: "📈",
            value: "96%",
            label: t("dashboard.stats.director.satisfaction"),
            trend: "+3%",
            trendPercent: "+3%",
            color: "#F59E0B",
            detail: t("dashboard.stats.director.exceptionalMonth"),
          },
        ],
        activities: [
          {
            icon: "👨‍🏫",
            text: t("dashboard.activities.director.newTeacher", {
              name: "Dr. Laurent",
            }),
            time: t("dashboard.activities.student.timeAgo.hours", { count: 2 }),
            type: "hire",
          },
          {
            icon: "📊",
            text: t("dashboard.activities.director.reportGenerated", {
              percentage: 15,
            }),
            time: t("dashboard.activities.student.timeAgo.yesterday"),
            type: "report",
          },
          {
            icon: "🎯",
            text: t("dashboard.activities.director.milestoneReached", {
              count: 100,
            }),
            time: t("dashboard.activities.student.timeAgo.days", { count: 3 }),
            type: "milestone",
          },
          {
            icon: "💰",
            text: t("dashboard.activities.director.revenueUpdate", {
              percentage: 22,
            }),
            time: t("dashboard.activities.student.timeAgo.days", { count: 5 }),
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
              ? t("dashboard.badges.section.student")
              : user?.role === "teacher"
              ? t("dashboard.badges.section.teacher")
              : t("dashboard.badges.section.director")}
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
                    ? t("dashboard.badges.earned", { name: badge.name })
                    : t("dashboard.badges.locked", { name: badge.name })
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
          <h3 className="overview-section-title">
            {t("dashboard.activities.title")}
          </h3>
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
