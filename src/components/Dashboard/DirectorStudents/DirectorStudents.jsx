import React, { useState } from "react";
import {
  IoAddOutline,
  IoEyeOutline,
  IoMailOutline,
  IoPencilOutline,
  IoSearchOutline,
  IoTrashOutline,
} from "react-icons/io5";
import "./DirectorStudents.css";

const DirectorStudents = () => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
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

  const filteredStudents = studentsData.filter((student) => {
    return (
      (selectedLevel === "" || student.level === selectedLevel) &&
      (selectedCourse === "" || student.course.includes(selectedCourse)) &&
      (selectedStatus === "" || student.status === selectedStatus) &&
      (searchTerm === "" ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

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
    <div className="director-students">
      <div className="students-header">
        <h3>👥 Gestion des étudiants</h3>
        <button className="primary-btn">
          <IoAddOutline size={20} />
          Nouvel étudiant
        </button>
      </div>

      <div className="students-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h4>324</h4>
            <p>Étudiants actifs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <h4>89</h4>
            <p>Diplômés ce mois</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h4>92%</h4>
            <p>Taux de réussite</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h4>4.6</h4>
            <p>Satisfaction moyenne</p>
          </div>
        </div>
      </div>

      <div className="students-filters">
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
          <label>Cours :</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Tous les cours</option>
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
            <option value="graduated">Diplômé</option>
            <option value="suspended">Suspendu</option>
          </select>
        </div>
        <div className="search-group">
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoSearchOutline />
        </div>
      </div>

      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Étudiant</th>
              <th>Email</th>
              <th>Cours</th>
              <th>Niveau</th>
              <th>Progression</th>
              <th>Dernier accès</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  <div className="student-info">
                    <span className="student-avatar">{student.avatar}</span>
                    <div className="student-details">
                      <span className="student-name">{student.name}</span>
                      <span className="student-join-date">
                        Inscrit le {student.joinDate}
                      </span>
                    </div>
                  </div>
                </td>
                <td>{student.email}</td>
                <td>
                  <span className="course-badge">{student.course}</span>
                  <div className="completed-courses">
                    {student.completedCourses} cours terminés
                  </div>
                </td>
                <td>
                  <span
                    className={`level-badge ${student.level.toLowerCase()}`}
                  >
                    {student.level}
                  </span>
                </td>
                <td>
                  <div className="progress-cell">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span>{student.progress}%</span>
                  </div>
                </td>
                <td>{student.lastAccess}</td>
                <td>
                  <span className={`status-badge ${student.status}`}>
                    {getStatusText(student.status)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="Voir profil">
                      <IoEyeOutline />
                    </button>
                    <button className="action-btn edit" title="Modifier">
                      <IoPencilOutline />
                    </button>
                    <button
                      className="action-btn message"
                      title="Envoyer message"
                    >
                      <IoMailOutline />
                    </button>
                    <button className="action-btn delete" title="Supprimer">
                      <IoTrashOutline />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <div className="no-results">
          <p>Aucun étudiant trouvé avec les critères sélectionnés.</p>
        </div>
      )}
    </div>
  );
};

export default DirectorStudents;
