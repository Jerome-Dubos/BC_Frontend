import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoCalendarOutline,
  IoCloseOutline,
  IoCloudDownloadOutline,
  IoCreateOutline,
  IoEyeOutline,
  IoSaveOutline,
  IoTimeOutline,
} from "react-icons/io5";
import "./TeacherCourses.css";

const TeacherCourses = () => {
  const { t } = useTranslation();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    level: "A1",
    duration: "",
    maxStudents: "",
    schedule: "",
  });

  const courses = [
    {
      id: 1,
      title: "Grammaire Française B1",
      description: "Cours complet de grammaire niveau intermédiaire",
      level: "B1",
      duration: "2h",
      maxStudents: 15,
      currentStudents: 12,
      schedule: "Lundi 14:00",
      status: "active",
    },
    {
      id: 2,
      title: "Conversation A2",
      description: "Pratique de la conversation pour débutants avancés",
      level: "A2",
      duration: "1h30",
      maxStudents: 10,
      currentStudents: 8,
      schedule: "Mercredi 16:00",
      status: "active",
    },
    {
      id: 3,
      title: "Vocabulaire Professionnel",
      description: "Français des affaires et vocabulaire professionnel",
      level: "B2",
      duration: "1h45",
      maxStudents: 12,
      currentStudents: 10,
      schedule: "Vendredi 10:30",
      status: "active",
    },
  ];

  const handleCreateCourse = (e) => {
    e.preventDefault();
    console.log("Nouveau cours:", newCourse);
    setShowCreateForm(false);
    setNewCourse({
      title: "",
      description: "",
      level: "A1",
      duration: "",
      maxStudents: "",
      schedule: "",
    });
  };

  const getLevelColor = (level) => {
    const colors = {
      A1: {
        bg: "rgba(34, 197, 94, 0.2)",
        color: "#22C55E",
        border: "rgba(34, 197, 94, 0.3)",
      },
      A2: {
        bg: "rgba(59, 130, 246, 0.2)",
        color: "#3B82F6",
        border: "rgba(59, 130, 246, 0.3)",
      },
      B1: {
        bg: "rgba(245, 158, 11, 0.2)",
        color: "#F59E0B",
        border: "rgba(245, 158, 11, 0.3)",
      },
      B2: {
        bg: "rgba(239, 68, 68, 0.2)",
        color: "#EF4444",
        border: "rgba(239, 68, 68, 0.3)",
      },
      C1: {
        bg: "rgba(139, 92, 246, 0.2)",
        color: "#8B5CF6",
        border: "rgba(139, 92, 246, 0.3)",
      },
      C2: {
        bg: "rgba(236, 72, 153, 0.2)",
        color: "#EC4899",
        border: "rgba(236, 72, 153, 0.3)",
      },
    };
    return colors[level] || colors.A1;
  };

  const handleGoogleDriveImport = () => {
    console.log("Import depuis Google Drive...");
    alert(t("teacherCourses.notifications.importAlert"));
  };

  return (
    <motion.div
      className="teacher-courses-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="teacher-courses-header">
        <div className="teacher-courses-header-left">
          <h3 className="teacher-courses-title">{t("teacherCourses.title")}</h3>
        </div>
        <div className="teacher-courses-header-right">
          <button
            className="google-drive-import-btn"
            onClick={handleGoogleDriveImport}
          >
            <IoCloudDownloadOutline size={20} />
            {t("teacherCourses.importButton")}
          </button>
        </div>
      </div>

      <div className="teacher-courses-stats">
        <div className="teacher-courses-stat">
          <div className="teacher-courses-stat-value">3</div>
          <div className="teacher-courses-stat-label">
            {t("teacherCourses.stats.activeCourses")}
          </div>
        </div>
        <div className="teacher-courses-stat">
          <div className="teacher-courses-stat-value">30</div>
          <div className="teacher-courses-stat-label">
            {t("teacherCourses.stats.totalStudents")}
          </div>
        </div>
        <div className="teacher-courses-stat">
          <div className="teacher-courses-stat-value">5h15</div>
          <div className="teacher-courses-stat-label">
            {t("teacherCourses.stats.weeklyHours")}
          </div>
        </div>
      </div>

      <div className="teacher-courses-grid">
        {courses.map((course) => {
          const levelStyle = getLevelColor(course.level);
          return (
            <motion.div
              key={course.id}
              className="teacher-course-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: course.id * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="teacher-course-header">
                <div className="teacher-course-info">
                  <h3>{course.title}</h3>
                  <span
                    className="teacher-course-level"
                    style={{
                      background: levelStyle.bg,
                      color: levelStyle.color,
                      border: `1px solid ${levelStyle.border}`,
                    }}
                  >
                    {course.level}
                  </span>
                </div>
                <div className="teacher-course-students">
                  <div className="teacher-course-students-count">
                    {course.currentStudents}
                  </div>
                  <div className="teacher-course-students-label">
                    {t("teacherCourses.courseInfo.students")}
                  </div>
                </div>
              </div>
              <div className="teacher-course-details">
                <div className="teacher-course-detail-item">
                  <IoTimeOutline className="teacher-course-detail-icon" />
                  <span>{course.duration}</span>
                </div>
                <div className="teacher-course-detail-item">
                  <IoCalendarOutline className="teacher-course-detail-icon" />
                  <span>{course.schedule}</span>
                </div>
              </div>
              <div className="teacher-course-actions">
                <button className="teacher-course-action-btn primary">
                  <IoEyeOutline size={14} />
                  {t("teacherCourses.actions.view")}
                </button>
                <button className="teacher-course-action-btn secondary">
                  <IoCreateOutline size={14} />
                  {t("teacherCourses.actions.edit")}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal de création de cours */}
      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{t("teacherCourses.createForm.title")}</h3>
              <button
                className="close-modal"
                onClick={() => setShowCreateForm(false)}
              >
                <IoCloseOutline size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateCourse} className="create-course-form">
              <div className="form-row">
                <div className="form-group">
                  <label>{t("teacherCourses.createForm.courseTitle")}</label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, title: e.target.value })
                    }
                    placeholder={t(
                      "teacherCourses.createForm.courseTitlePlaceholder"
                    )}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t("teacherCourses.createForm.level")}</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, level: e.target.value })
                    }
                  >
                    <option value="A1">
                      {t("teacherCourses.createForm.levels.a1")}
                    </option>
                    <option value="A2">
                      {t("teacherCourses.createForm.levels.a2")}
                    </option>
                    <option value="B1">
                      {t("teacherCourses.createForm.levels.b1")}
                    </option>
                    <option value="B2">
                      {t("teacherCourses.createForm.levels.b2")}
                    </option>
                    <option value="C1">
                      {t("teacherCourses.createForm.levels.c1")}
                    </option>
                    <option value="C2">
                      {t("teacherCourses.createForm.levels.c2")}
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>{t("teacherCourses.createForm.description")}</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  placeholder={t(
                    "teacherCourses.createForm.descriptionPlaceholder"
                  )}
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t("teacherCourses.createForm.duration")}</label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, duration: e.target.value })
                    }
                    placeholder={t(
                      "teacherCourses.createForm.durationPlaceholder"
                    )}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t("teacherCourses.createForm.maxStudents")}</label>
                  <input
                    type="number"
                    value={newCourse.maxStudents}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        maxStudents: e.target.value,
                      })
                    }
                    placeholder={t(
                      "teacherCourses.createForm.maxStudentsPlaceholder"
                    )}
                    min="1"
                    max="30"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t("teacherCourses.createForm.schedule")}</label>
                <input
                  type="text"
                  value={newCourse.schedule}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, schedule: e.target.value })
                  }
                  placeholder={t(
                    "teacherCourses.createForm.schedulePlaceholder"
                  )}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowCreateForm(false)}>
                  {t("teacherCourses.createForm.cancel")}
                </button>
                <button type="submit">
                  <IoSaveOutline size={16} />
                  {t("teacherCourses.createForm.create")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TeacherCourses;
