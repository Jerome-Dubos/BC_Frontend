import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  IoBookOutline,
  IoCheckmarkCircleOutline,
  IoEyeOutline,
  IoFilterOutline,
  IoMailOutline,
  IoSearchOutline,
  IoStatsChartOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import "./TeacherStudents.css";

const TeacherStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const students = [
    {
      id: 1,
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      phone: "+33 1 23 45 67 89",
      course: "Grammaire Française B1",
      level: "B1",
      progress: 85,
      attendance: 92,
      lastActivity: "Il y a 2 heures",
      status: "active",
      avatar: "👩‍🎓",
      badges: ["Studieuse", "Ponctuelle"],
    },
    {
      id: 2,
      name: "Jean Martin",
      email: "jean.martin@email.com",
      phone: "+33 1 98 76 54 32",
      course: "Conversation A2",
      level: "A2",
      progress: 72,
      attendance: 88,
      lastActivity: "Il y a 1 jour",
      status: "active",
      avatar: "👨‍🎓",
      badges: ["Participatif"],
    },
    {
      id: 3,
      name: "Sophie Laurent",
      email: "sophie.laurent@email.com",
      phone: "+33 1 11 22 33 44",
      course: "Vocabulaire Professionnel",
      level: "B2",
      progress: 94,
      attendance: 96,
      lastActivity: "Il y a 30 minutes",
      status: "active",
      avatar: "👩‍💼",
      badges: ["Excellente", "Assidue", "Leader"],
    },
    {
      id: 4,
      name: "Pierre Moreau",
      email: "pierre.moreau@email.com",
      phone: "+33 1 55 66 77 88",
      course: "Grammaire Française B1",
      level: "B1",
      progress: 58,
      attendance: 75,
      lastActivity: "Il y a 3 jours",
      status: "warning",
      avatar: "👨‍💻",
      badges: [],
    },
  ];

  const courses = [
    "Grammaire Française B1",
    "Conversation A2",
    "Vocabulaire Professionnel",
  ];
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "all" || student.course === selectedCourse;
    const matchesLevel =
      selectedLevel === "all" || student.level === selectedLevel;

    return matchesSearch && matchesCourse && matchesLevel;
  });

  const getProgressColor = (progress) => {
    if (progress >= 80) return "#22C55E";
    if (progress >= 60) return "#F59E0B";
    return "#EF4444";
  };

  const getStatusColor = (status) => {
    const colors = {
      active: {
        bg: "rgba(34, 197, 94, 0.2)",
        color: "#22C55E",
        border: "rgba(34, 197, 94, 0.3)",
      },
      warning: {
        bg: "rgba(245, 158, 11, 0.2)",
        color: "#F59E0B",
        border: "rgba(245, 158, 11, 0.3)",
      },
      inactive: {
        bg: "rgba(239, 68, 68, 0.2)",
        color: "#EF4444",
        border: "rgba(239, 68, 68, 0.3)",
      },
    };
    return colors[status] || colors.active;
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
      className="teacher-students-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="teacher-students-header">
        <h3 className="teacher-students-title">Mes Étudiants</h3>
        <p>Suivez les progrès et gérez vos étudiants</p>
      </div>

      <div className="teacher-students-filters">
        <div className="teacher-students-search-bar">
          <IoSearchOutline size={20} />
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="teacher-students-filter-group">
          <IoFilterOutline size={16} />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">Tous les cours</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="all">Tous les niveaux</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="students-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <IoBookOutline size={24} />
          </div>
          <div className="stat-content">
            <h4>{filteredStudents.length}</h4>
            <p>Étudiants</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <IoStatsChartOutline size={24} />
          </div>
          <div className="stat-content">
            <h4>
              {Math.round(
                filteredStudents.reduce((acc, s) => acc + s.progress, 0) /
                  filteredStudents.length
              )}
              %
            </h4>
            <p>Progrès moyen</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <IoCheckmarkCircleOutline size={24} />
          </div>
          <div className="stat-content">
            <h4>
              {Math.round(
                filteredStudents.reduce((acc, s) => acc + s.attendance, 0) /
                  filteredStudents.length
              )}
              %
            </h4>
            <p>Assiduité moyenne</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <IoTrophyOutline size={24} />
          </div>
          <div className="stat-content">
            <h4>
              {filteredStudents.filter((s) => s.status === "active").length}
            </h4>
            <p>Actifs</p>
          </div>
        </div>
      </div>

      <div className="teacher-students-grid">
        {filteredStudents.map((student) => {
          const statusStyle = getStatusColor(student.status);
          const levelStyle = getLevelColor(student.level);

          return (
            <motion.div
              key={student.id}
              className={`teacher-student-card status-${student.status}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: student.id * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="teacher-student-header">
                <div className="teacher-student-avatar">
                  <span>{student.avatar}</span>
                </div>
                <div className="teacher-student-info">
                  <h4>{student.name}</h4>
                  <p>{student.email}</p>
                  <span
                    className="teacher-student-level"
                    style={{
                      background: levelStyle.bg,
                      color: levelStyle.color,
                      border: `1px solid ${levelStyle.border}`,
                    }}
                  >
                    {student.level}
                  </span>
                </div>
              </div>

              <div className="teacher-student-badges">
                {student.badges.map((badge, index) => (
                  <span key={index} className="teacher-student-badge">
                    <IoTrophyOutline size={12} />
                    {badge}
                  </span>
                ))}
              </div>

              <div className="student-progress">
                <div className="progress-item">
                  <div className="progress-label">
                    <IoStatsChartOutline size={16} />
                    <span>Progrès</span>
                    <span>{student.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${student.progress}%`,
                        backgroundColor: getProgressColor(student.progress),
                      }}
                    ></div>
                  </div>
                </div>

                <div className="progress-item">
                  <div className="progress-label">
                    <IoCheckmarkCircleOutline size={16} />
                    <span>Assiduité</span>
                    <span>{student.attendance}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${student.attendance}%`,
                        backgroundColor: getProgressColor(student.attendance),
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="student-activity">
                <div className="activity-item">
                  <IoTimeOutline size={16} />
                  <span>Dernière activité: {student.lastActivity}</span>
                </div>
              </div>

              <div className="teacher-student-actions">
                <button className="teacher-student-action-btn primary">
                  <IoEyeOutline size={16} />
                  Profil
                </button>
                <button className="teacher-student-action-btn secondary">
                  <IoMailOutline size={16} />
                </button>
              </div>

              <div className="teacher-student-last-activity">
                Dernière activité: {student.lastActivity}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredStudents.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h4>Aucun étudiant trouvé</h4>
          <p>Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </motion.div>
  );
};

export default TeacherStudents;
