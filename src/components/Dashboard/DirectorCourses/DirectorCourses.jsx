// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoBookOutline,
  IoCalendarOutline,
  IoCloudDownloadOutline,
  IoPencilOutline,
  IoPersonOutline,
  IoTimeOutline,
  IoTrashOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import "./DirectorCourses.css";

const DirectorCourses = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [selectedLevel, setSelectedLevel] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedLanguage, setSelectedLanguage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedStatus, setSelectedStatus] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState("");

  const coursesData = [
    {
      id: 1,
      title: "Anglais Conversation B2",
      language: "Anglais",
      level: "B2",
      teacher: "Dr. Sarah Johnson",
      students: 15,
      progress: 75,
      status: "active",
      schedule: "Lun-Mer-Ven 14h-15h30",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
    },
    {
      id: 2,
      title: "Français Business A2",
      language: "Français",
      level: "A2",
      teacher: "Marie Dubois",
      students: 12,
      progress: 60,
      status: "active",
      schedule: "Mar-Jeu 16h-17h30",
      startDate: "2024-02-01",
      endDate: "2024-07-01",
    },
    {
      id: 3,
      title: "Espagnol Débutant A1",
      language: "Espagnol",
      level: "A1",
      teacher: "Carlos Rodriguez",
      students: 20,
      progress: 30,
      status: "active",
      schedule: "Lun-Mer 18h-19h30",
      startDate: "2024-03-01",
      endDate: "2024-08-01",
    },
    {
      id: 4,
      title: "Allemand Intermédiaire B1",
      language: "Allemand",
      level: "B1",
      teacher: "Hans Mueller",
      students: 8,
      progress: 45,
      status: "active",
      schedule: "Mer-Ven 10h-11h30",
      startDate: "2024-02-15",
      endDate: "2024-07-15",
    },
    {
      id: 5,
      title: "Italien Avancé C1",
      language: "Italien",
      level: "C1",
      teacher: "Lucia Rossi",
      students: 6,
      progress: 90,
      status: "completed",
      schedule: "Sam 9h-12h",
      startDate: "2023-09-01",
      endDate: "2024-01-31",
    },
    {
      id: 6,
      title: "Anglais Préparation TOEFL C1",
      language: "Anglais",
      level: "C1",
      teacher: "Dr. Sarah Johnson",
      students: 10,
      progress: 85,
      status: "active",
      schedule: "Sam 14h-17h",
      startDate: "2024-01-01",
      endDate: "2024-05-31",
    },
  ];

  const filteredCourses = coursesData.filter((course) => {
    return (
      (selectedLevel === "" || course.level === selectedLevel) &&
      (selectedLanguage === "" || course.language === selectedLanguage) &&
      (selectedStatus === "" || course.status === selectedStatus) &&
      (searchTerm === "" ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.teacher.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // eslint-disable-next-line no-unused-vars
  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return t("directorCourses.status.active");
      case "completed":
        return t("directorCourses.status.completed");
      case "scheduled":
        return t("directorCourses.status.scheduled");
      default:
        return status;
    }
  };

  const getLevelColor = (level) => {
    const colors = {
      A1: { bg: "rgba(34, 197, 94, 0.2)", color: "#22C55E" },
      A2: { bg: "rgba(59, 130, 246, 0.2)", color: "#3B82F6" },
      B1: { bg: "rgba(245, 158, 11, 0.2)", color: "#F59E0B" },
      B2: { bg: "rgba(239, 68, 68, 0.2)", color: "#EF4444" },
      C1: { bg: "rgba(139, 92, 246, 0.2)", color: "#8B5CF6" },
      C2: { bg: "rgba(236, 72, 153, 0.2)", color: "#EC4899" },
    };
    return colors[level] || colors.A1;
  };

  const handleGoogleDriveImport = () => {
    // TODO: Implémenter l'intégration Google Drive API
    console.log("Import depuis Google Drive...");
    // Placeholder pour la logique d'import
    alert("Fonctionnalité d'import Google Drive en cours de développement !");
  };

  return (
    <motion.div
      className="director-courses-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="director-courses-header">
        <div className="director-courses-header-content">
          <div className="director-courses-title-section">
            <h3 className="director-courses-title">
              {t("directorCourses.title")}
            </h3>
            <p>{t("directorCourses.subtitle")}</p>
          </div>
          <button
            className="director-courses-import-btn"
            onClick={handleGoogleDriveImport}
          >
            <IoCloudDownloadOutline size={20} />
            {t("directorCourses.importButton")}
          </button>
        </div>
      </div>

      <div className="director-courses-stats">
        <div className="director-courses-stat-card">
          <div className="director-courses-stat-value">
            {filteredCourses.length}
          </div>
          <div className="director-courses-stat-label">
            {t("directorCourses.stats.totalCourses")}
          </div>
        </div>
        <div className="director-courses-stat-card">
          <div className="director-courses-stat-value">
            {
              filteredCourses.filter((course) => course.status === "active")
                .length
            }
          </div>
          <div className="director-courses-stat-label">
            {t("directorCourses.stats.activeCourses")}
          </div>
        </div>
        <div className="director-courses-stat-card">
          <div className="director-courses-stat-value">
            {filteredCourses.reduce((sum, course) => sum + course.students, 0)}
          </div>
          <div className="director-courses-stat-label">
            {t("directorCourses.stats.enrolledStudents")}
          </div>
        </div>
        <div className="director-courses-stat-card">
          <div className="director-courses-stat-value">
            {Math.round(
              filteredCourses.reduce(
                (sum, course) => sum + course.progress,
                0
              ) / filteredCourses.length
            )}
            %
          </div>
          <div className="director-courses-stat-label">
            {t("directorCourses.stats.occupationRate")}
          </div>
        </div>
      </div>

      <div className="director-courses-grid">
        {filteredCourses.map((course) => {
          const levelStyle = getLevelColor(course.level);
          return (
            <motion.div
              key={course.id}
              className={`director-course-card ${
                course.status === "full"
                  ? "status-full"
                  : course.status === "low"
                  ? "status-low"
                  : ""
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: course.id * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="director-course-header">
                <div className="director-course-info">
                  <h3>{course.title}</h3>
                  <span
                    className="director-course-level"
                    style={{
                      background: levelStyle.bg,
                      color: levelStyle.color,
                    }}
                  >
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="director-course-teacher">
                <IoPersonOutline className="director-course-teacher-icon" />
                {course.teacher}
              </div>

              <div className="director-course-details">
                <div className="director-course-detail-item">
                  <IoTimeOutline className="director-course-detail-icon" />
                  <span>{course.schedule}</span>
                </div>
                <div className="director-course-detail-item">
                  <IoCalendarOutline className="director-course-detail-icon" />
                  <span>
                    {course.startDate} → {course.endDate}
                  </span>
                </div>
                <div className="director-course-detail-item">
                  <IoBookOutline className="director-course-detail-icon" />
                  <span>{course.students} étudiants</span>
                </div>
                <div className="director-course-detail-item">
                  <IoTrendingUpOutline className="director-course-detail-icon" />
                  <span>{course.progress}%</span>
                </div>
              </div>

              <div className="director-course-progress">
                <div className="director-course-progress-header">
                  <span className="director-course-progress-label">
                    Occupation
                  </span>
                  <span className="director-course-progress-value">
                    {Math.round((course.students / course.maxStudents) * 100)}%
                  </span>
                </div>
                <div className="director-course-progress-bar">
                  <div
                    className="director-course-progress-fill"
                    style={{
                      width: `${(course.students / course.maxStudents) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="director-course-actions">
                <button className="director-course-action-btn secondary">
                  <IoPencilOutline size={16} />
                  Modifier
                </button>
                <button className="director-course-action-btn delete">
                  <IoTrashOutline size={16} />
                  Supprimer
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="no-results">
          <p>Aucun cours trouvé avec les critères sélectionnés.</p>
        </div>
      )}
    </motion.div>
  );
};

export default DirectorCourses;
