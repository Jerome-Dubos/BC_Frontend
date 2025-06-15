import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  IoAddOutline,
  IoBookOutline,
  IoCalendarOutline,
  IoCloseOutline,
  IoCreateOutline,
  IoEyeOutline,
  IoPersonOutline,
  IoSaveOutline,
  IoTimeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import "./TeacherCourses.css";

const TeacherCourses = () => {
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

  return (
    <motion.div
      className="teacher-courses"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="courses-header">
        <div className="header-content">
          <h3>Mes Cours</h3>
          <p>Gérez vos cours et suivez vos étudiants</p>
        </div>
        <button
          className="create-course-btn"
          onClick={() => setShowCreateForm(true)}
        >
          <IoAddOutline size={16} />
          Créer un cours
        </button>
      </div>

      <div className="courses-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <IoBookOutline size={24} />
          </div>
          <div className="stat-content">
            <h4>3</h4>
            <p>Cours actifs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <IoPersonOutline size={24} />
          </div>
          <div className="stat-content">
            <h4>30</h4>
            <p>Étudiants totaux</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <IoTimeOutline size={24} />
          </div>
          <div className="stat-content">
            <h4>5h15</h4>
            <p>Heures/semaine</p>
          </div>
        </div>
      </div>

      <div className="courses-grid">
        {courses.map((course) => {
          const levelStyle = getLevelColor(course.level);
          return (
            <motion.div
              key={course.id}
              className="course-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: course.id * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="course-header">
                <div className="course-title">
                  <h4>{course.title}</h4>
                  <span
                    className="level-badge"
                    style={{
                      background: levelStyle.bg,
                      color: levelStyle.color,
                      border: `1px solid ${levelStyle.border}`,
                    }}
                  >
                    {course.level}
                  </span>
                </div>
                <div className="course-actions">
                  <button className="action-btn view">
                    <IoEyeOutline size={14} />
                  </button>
                  <button className="action-btn edit">
                    <IoCreateOutline size={14} />
                  </button>
                  <button className="action-btn delete">
                    <IoTrashOutline size={14} />
                  </button>
                </div>
              </div>

              <div className="course-description">
                <p>{course.description}</p>
              </div>

              <div className="course-details">
                <div className="detail-item">
                  <IoTimeOutline size={16} />
                  <span>{course.duration}</span>
                </div>
                <div className="detail-item">
                  <IoCalendarOutline size={16} />
                  <span>{course.schedule}</span>
                </div>
                <div className="detail-item">
                  <IoPersonOutline size={16} />
                  <span>
                    {course.currentStudents}/{course.maxStudents} étudiants
                  </span>
                </div>
              </div>

              <div className="course-progress">
                <div className="progress-label">
                  <span>Capacité</span>
                  <span>
                    {Math.round(
                      (course.currentStudents / course.maxStudents) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        (course.currentStudents / course.maxStudents) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="course-footer">
                <button className="manage-btn">Gérer le cours</button>
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
              <h3>Créer un nouveau cours</h3>
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
                  <label>Titre du cours</label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, title: e.target.value })
                    }
                    placeholder="Ex: Grammaire Française B1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Niveau</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, level: e.target.value })
                    }
                  >
                    <option value="A1">A1 - Débutant</option>
                    <option value="A2">A2 - Élémentaire</option>
                    <option value="B1">B1 - Intermédiaire</option>
                    <option value="B2">B2 - Intermédiaire avancé</option>
                    <option value="C1">C1 - Avancé</option>
                    <option value="C2">C2 - Maîtrise</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  placeholder="Décrivez le contenu et les objectifs du cours..."
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Durée</label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, duration: e.target.value })
                    }
                    placeholder="Ex: 2h"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nombre max d'étudiants</label>
                  <input
                    type="number"
                    value={newCourse.maxStudents}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        maxStudents: e.target.value,
                      })
                    }
                    placeholder="15"
                    min="1"
                    max="30"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Horaire</label>
                <input
                  type="text"
                  value={newCourse.schedule}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, schedule: e.target.value })
                  }
                  placeholder="Ex: Lundi 14:00"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowCreateForm(false)}>
                  Annuler
                </button>
                <button type="submit">
                  <IoSaveOutline size={16} />
                  Créer le cours
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
