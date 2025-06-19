import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  IoBookOutline,
  IoFilterOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import "./DirectorStudents.css";

const DirectorStudents = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const studentsData = [
    {
      id: 1,
      name: "Marie Dupont",
      email: "marie.dupont@email.com",
      avatar: "👩",
      course: "Anglais B2",
      level: "B2",
      progress: 85,
      lastAccess: "Il y a 2h",
      status: "active",
      joinDate: "2024-01-15",
      completedCourses: 3,
    },
    {
      id: 2,
      name: "Jean Martin",
      email: "jean.martin@email.com",
      avatar: "👨",
      course: "Français A2",
      level: "A2",
      progress: 70,
      lastAccess: "Hier",
      status: "active",
      joinDate: "2024-02-01",
      completedCourses: 1,
    },
    {
      id: 3,
      name: "Sophie Bernard",
      email: "sophie.bernard@email.com",
      avatar: "👩",
      course: "Espagnol A1",
      level: "A1",
      progress: 45,
      lastAccess: "Il y a 3j",
      status: "active",
      joinDate: "2024-03-01",
      completedCourses: 0,
    },
    {
      id: 4,
      name: "Pierre Durand",
      email: "pierre.durand@email.com",
      avatar: "👨",
      course: "Anglais C1",
      level: "C1",
      progress: 95,
      lastAccess: "Il y a 1h",
      status: "graduated",
      joinDate: "2023-09-01",
      completedCourses: 5,
    },
    {
      id: 5,
      name: "Claire Moreau",
      email: "claire.moreau@email.com",
      avatar: "👩",
      course: "Allemand B1",
      level: "B1",
      progress: 60,
      lastAccess: "Il y a 5h",
      status: "active",
      joinDate: "2024-01-20",
      completedCourses: 2,
    },
    {
      id: 6,
      name: "Lucas Silva",
      email: "lucas.silva@email.com",
      avatar: "👨",
      course: "Italien C1",
      level: "C1",
      progress: 100,
      lastAccess: "Il y a 1 semaine",
      status: "graduated",
      joinDate: "2023-06-15",
      completedCourses: 4,
    },
    {
      id: 7,
      name: "Emma Leroy",
      email: "emma.leroy@email.com",
      avatar: "👩",
      course: "Anglais A2",
      level: "A2",
      progress: 30,
      lastAccess: "Il y a 2 semaines",
      status: "suspended",
      joinDate: "2024-02-15",
      completedCourses: 0,
    },
    {
      id: 8,
      name: "Antoine Blanc",
      email: "antoine.blanc@email.com",
      avatar: "👨",
      course: "Espagnol B2",
      level: "B2",
      progress: 80,
      lastAccess: "Il y a 4h",
      status: "active",
      joinDate: "2023-11-01",
      completedCourses: 3,
    },
  ];

  const courses = [
    "Français A1",
    "Conversation B1",
    "Français B2",
    "Grammaire A2",
    "Français C1",
  ];
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "all" || student.course === selectedCourse;
    const matchesLevel =
      selectedLevel === "all" || student.level === selectedLevel;

    return matchesSearch && matchesCourse && matchesLevel;
  });

  const totalStudents = studentsData.length;
  const averageProgress = Math.round(
    studentsData.reduce((sum, student) => sum + student.progress, 0) /
      studentsData.length
  );
  const averageAttendance = Math.round(
    studentsData.reduce((sum, student) => sum + student.progress, 0) /
      studentsData.length
  );
  const averageGrade =
    Math.round(
      (studentsData.reduce((sum, student) => sum + student.progress, 0) /
        studentsData.length) *
        10
    ) / 10;

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Actif";
      case "graduated":
        return "Diplômé";
      case "suspended":
        return "Suspendu";
      default:
        return status;
    }
  };

  return (
    <motion.div
      className="director-students-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="director-students-header">
        <h3 className="director-students-title">Gestion des Étudiants</h3>
        <p>Vue d'ensemble de tous les étudiants de l'école</p>
      </div>

      <div className="director-students-overview">
        <div className="director-students-stat-card">
          <div className="director-students-stat-value">{totalStudents}</div>
          <div className="director-students-stat-label">Étudiants Total</div>
        </div>
        <div className="director-students-stat-card">
          <div className="director-students-stat-value">{averageProgress}%</div>
          <div className="director-students-stat-label">Progrès Moyen</div>
        </div>
        <div className="director-students-stat-card">
          <div className="director-students-stat-value">
            {averageAttendance}%
          </div>
          <div className="director-students-stat-label">Assiduité Moyenne</div>
        </div>
        <div className="director-students-stat-card">
          <div className="director-students-stat-value">{averageGrade}/20</div>
          <div className="director-students-stat-label">Note Moyenne</div>
        </div>
      </div>

      <div className="director-students-filters">
        <div className="director-students-search-bar">
          <IoSearchOutline size={20} />
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="director-students-filter-group">
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
        </div>

        <div className="director-students-filter-group">
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

      <div className="director-students-grid">
        {filteredStudents.map((student) => (
          <motion.div
            key={student.id}
            className={`director-student-card status-${student.status}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: student.id * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="director-student-header">
              <div className="director-student-avatar">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="director-student-info">
                <h4>{student.name}</h4>
                <p>{student.email}</p>
                <span className="director-student-course">
                  {student.course}
                </span>
              </div>
            </div>

            <div className="director-student-teacher">
              <IoPersonOutline className="director-student-teacher-icon" />
              {student.teacher}
            </div>

            <div className="director-student-stats">
              <div className="director-student-stat">
                <div className="director-student-stat-value">
                  {student.progress}%
                </div>
                <div className="director-student-stat-label">Progrès</div>
              </div>
              <div className="director-student-stat">
                <div className="director-student-stat-value">
                  {student.attendance}%
                </div>
                <div className="director-student-stat-label">Assiduité</div>
              </div>
              <div className="director-student-stat">
                <div className="director-student-stat-value">
                  {student.grade}/20
                </div>
                <div className="director-student-stat-label">Note</div>
              </div>
            </div>

            <div className="director-student-actions">
              <button className="director-student-action-btn primary">
                <IoStatsChartOutline size={14} />
                Détails
              </button>
              <button className="director-student-action-btn secondary">
                <IoBookOutline size={14} />
                Cours
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DirectorStudents;
