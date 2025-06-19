import React, { useState } from "react";
import {
  IoAddOutline,
  IoCalendarOutline,
  IoEyeOutline,
  IoPencilOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTimeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import "./DirectorCourses.css";

const DirectorCourses = () => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
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

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Actif";
      case "completed":
        return "Terminé";
      case "scheduled":
        return "Programmé";
      default:
        return status;
    }
  };

  return (
    <div className="director-courses">
      <div className="courses-header">
        <h3>📚 Gestion des cours</h3>
        <button className="primary-btn">
          <IoAddOutline size={20} />
          Nouveau cours
        </button>
      </div>

      <div className="courses-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h4>25</h4>
            <p>Cours actifs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-info">
            <h4>18</h4>
            <p>Professeurs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h4>324</h4>
            <p>Étudiants inscrits</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h4>4.8</h4>
            <p>Note moyenne</p>
          </div>
        </div>
      </div>

      <div className="courses-filters">
        <div className="filter-group">
          <label>Niveau :</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="">Tous les niveaux</option>
            <option value="A1">A1 - Débutant</option>
            <option value="A2">A2 - Élémentaire</option>
            <option value="B1">B1 - Intermédiaire</option>
            <option value="B2">B2 - Intermédiaire avancé</option>
            <option value="C1">C1 - Avancé</option>
            <option value="C2">C2 - Maîtrise</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Langue :</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">Toutes les langues</option>
            <option value="Anglais">Anglais</option>
            <option value="Français">Français</option>
            <option value="Espagnol">Espagnol</option>
            <option value="Allemand">Allemand</option>
            <option value="Italien">Italien</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Statut :</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="completed">Terminé</option>
            <option value="scheduled">Programmé</option>
          </select>
        </div>
        <div className="search-group">
          <input
            type="text"
            placeholder="Rechercher un cours ou professeur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoSearchOutline />
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <div className="course-title">
                <h4>{course.title}</h4>
                <div className="course-tags">
                  <span className={`level-badge ${course.level.toLowerCase()}`}>
                    {course.level}
                  </span>
                  <span className={`status-badge ${course.status}`}>
                    {getStatusText(course.status)}
                  </span>
                </div>
              </div>
              <div className="course-actions">
                <button className="action-btn view" title="Voir détails">
                  <IoEyeOutline />
                </button>
                <button className="action-btn edit" title="Modifier">
                  <IoPencilOutline />
                </button>
                <button className="action-btn delete" title="Supprimer">
                  <IoTrashOutline />
                </button>
              </div>
            </div>

            <div className="course-info">
              <div className="info-item">
                <IoPersonOutline />
                <span>Prof : {course.teacher}</span>
              </div>
              <div className="info-item">
                <IoPeopleOutline />
                <span>{course.students} étudiants</span>
              </div>
              <div className="info-item">
                <IoTimeOutline />
                <span>{course.schedule}</span>
              </div>
              <div className="info-item">
                <IoCalendarOutline />
                <span>
                  {course.startDate} → {course.endDate}
                </span>
              </div>
            </div>

            <div className="course-progress">
              <div className="progress-header">
                <span>Progression</span>
                <span>{course.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="no-results">
          <p>Aucun cours trouvé avec les critères sélectionnés.</p>
        </div>
      )}
    </div>
  );
};

export default DirectorCourses;
