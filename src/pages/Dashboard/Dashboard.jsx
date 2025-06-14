// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  IoAddOutline,
  IoBookOutline,
  IoCalendarOutline,
  IoCloseOutline,
  IoCreateOutline,
  IoEyeOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoStatsChartOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student",
    language: "french",
    level: "A1",
  });

  // Données simulées pour la démo
  useEffect(() => {
    // Simulation de données étudiants
    setStudents([
      {
        id: 1,
        name: "Pierre Martin",
        email: "pierre.martin@email.com",
        role: "student",
        language: "Anglais",
        level: "B1",
        progress: 65,
        lastActivity: "2024-01-15",
        status: "active",
      },
      {
        id: 2,
        name: "Sophie Dubois",
        email: "sophie.dubois@email.com",
        role: "student",
        language: "Espagnol",
        level: "A2",
        progress: 45,
        lastActivity: "2024-01-14",
        status: "active",
      },
      {
        id: 3,
        name: "Marc Leroy",
        email: "marc.leroy@email.com",
        role: "teacher",
        language: "Allemand",
        level: "C2",
        progress: 100,
        lastActivity: "2024-01-15",
        status: "active",
      },
    ]);

    // Simulation de données cours
    setCourses([
      {
        id: 1,
        name: "Anglais B1 - Groupe A",
        teacher: "Sarah Johnson",
        students: 8,
        maxStudents: 10,
        schedule: "Mar-Jeu 18h-20h",
        nextClass: "2024-01-16 18:00",
        progress: 60,
      },
      {
        id: 2,
        name: "Espagnol A2 - Intensif",
        teacher: "Carlos Rodriguez",
        students: 6,
        maxStudents: 8,
        schedule: "Lun-Ven 9h-13h",
        nextClass: "2024-01-16 09:00",
        progress: 40,
      },
    ]);
  }, []);

  const handleCreateUser = (e) => {
    e.preventDefault();
    // Simulation de création d'utilisateur
    const newUserData = {
      id: students.length + 1,
      ...newUser,
      progress: 0,
      lastActivity: new Date().toISOString().split("T")[0],
      status: "active",
    };

    setStudents([...students, newUserData]);
    setNewUser({
      name: "",
      email: "",
      role: "student",
      language: "french",
      level: "A1",
    });
    setShowCreateForm(false);
  };

  const getTabsForRole = (role) => {
    const baseTabs = [
      { id: "overview", label: "Vue d'ensemble", icon: <MdDashboard /> },
    ];

    if (role === "director") {
      return [
        ...baseTabs,
        {
          id: "users",
          label: "Gestion utilisateurs",
          icon: <IoPeopleOutline />,
        },
        { id: "courses", label: "Tous les cours", icon: <IoBookOutline /> },
        { id: "stats", label: "Statistiques", icon: <IoStatsChartOutline /> },
      ];
    } else if (role === "teacher") {
      return [
        ...baseTabs,
        { id: "courses", label: "Mes cours", icon: <IoBookOutline /> },
        { id: "students", label: "Mes étudiants", icon: <IoPeopleOutline /> },
        { id: "schedule", label: "Planning", icon: <IoCalendarOutline /> },
      ];
    } else {
      return [
        ...baseTabs,
        {
          id: "progress",
          label: "Ma progression",
          icon: <IoStatsChartOutline />,
        },
        { id: "schedule", label: "Planning", icon: <IoCalendarOutline /> },
        { id: "resources", label: "Ressources", icon: <IoBookOutline /> },
      ];
    }
  };

  const renderOverview = () => (
    <div className="overview-section">
      <div className="stats-grid">
        {user?.role === "student" && (
          <>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>{students.length}</h3>
                <p>Total étudiants</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3>{courses.length}</h3>
                <p>Cours actifs</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h3>{user?.role === "student" ? "B1" : "4.8"}</h3>
                <p>Niveau actuel</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>{user?.role === "student" ? "24h" : "92%"}</h3>
                <p>Temps d'étude</p>
              </div>
            </motion.div>
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>{students.length}</h3>
                <p>Étudiants</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3>{courses.length}</h3>
                <p>Cours actifs</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h3>{user?.role === "teacher" ? "4.9" : "4.8"}</h3>
                <p>Note moyenne</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>{user?.role === "teacher" ? "95%" : "92%"}</h3>
                <p>Assiduité</p>
              </div>
            </motion.div>
          </>
        )}

        {user?.role === "director" && (
          <>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>{students.length}</h3>
                <p>Étudiants</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-icon">👨‍🏫</div>
              <div className="stat-content">
                <h3>{students.length}</h3>
                <p>Professeurs</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3>{courses.length}</h3>
                <p>Cours actifs</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>{user?.role === "director" ? "€12,450" : "€12,450"}</h3>
                <p>CA mensuel</p>
              </div>
            </motion.div>
          </>
        )}
      </div>

      <div className="recent-activity">
        <h3>Activité récente</h3>
        <div className="activity-list">
          {user?.role === "director" && (
            <>
              <div className="activity-item">
                <span className="activity-icon">👤</span>
                <span>Nouvel étudiant inscrit : Sophie Dubois</span>
                <span className="activity-time">Il y a 2h</span>
              </div>
              <div className="activity-item">
                <span className="activity-icon">📚</span>
                <span>Cours d'espagnol A2 terminé</span>
                <span className="activity-time">Il y a 4h</span>
              </div>
            </>
          )}
          {user?.role === "teacher" && (
            <>
              <div className="activity-item">
                <span className="activity-icon">✅</span>
                <span>Cours d'anglais B1 - Groupe A terminé</span>
                <span className="activity-time">Il y a 1h</span>
              </div>
              <div className="activity-item">
                <span className="activity-icon">📝</span>
                <span>Évaluations corrigées (8/8)</span>
                <span className="activity-time">Il y a 3h</span>
              </div>
            </>
          )}
          {user?.role === "student" && (
            <>
              <div className="activity-item">
                <span className="activity-icon">🎯</span>
                <span>Exercice de grammaire complété</span>
                <span className="activity-time">Il y a 30min</span>
              </div>
              <div className="activity-item">
                <span className="activity-icon">📖</span>
                <span>Leçon 12 : Les temps du passé</span>
                <span className="activity-time">Il y a 2h</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderStudentsManagement = () => (
    <div className="management-section">
      <div className="section-header">
        <h3>Gestion des étudiants</h3>
        <button className="create-btn" onClick={() => setShowCreateForm(true)}>
          <span>➕</span>
          Créer un compte
        </button>
      </div>

      {showCreateForm && (
        <motion.div
          className="create-form-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.form
            className="create-form"
            onSubmit={handleCreateUser}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h4>Créer un nouveau compte</h4>

            <div className="form-group">
              <label>Nom complet</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Rôle</label>
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="student">Étudiant</option>
                <option value="teacher">Professeur</option>
              </select>
            </div>

            <div className="form-group">
              <label>Langue</label>
              <select
                value={newUser.language}
                onChange={(e) =>
                  setNewUser({ ...newUser, language: e.target.value })
                }
              >
                <option value="french">Français</option>
                <option value="english">Anglais</option>
                <option value="spanish">Espagnol</option>
                <option value="german">Allemand</option>
              </select>
            </div>

            <div className="form-group">
              <label>Niveau</label>
              <select
                value={newUser.level}
                onChange={(e) =>
                  setNewUser({ ...newUser, level: e.target.value })
                }
              >
                <option value="A1">A1 - Débutant</option>
                <option value="A2">A2 - Élémentaire</option>
                <option value="B1">B1 - Intermédiaire</option>
                <option value="B2">B2 - Avancé</option>
                <option value="C1">C1 - Autonome</option>
                <option value="C2">C2 - Maîtrise</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowCreateForm(false)}>
                Annuler
              </button>
              <button type="submit">Créer le compte</button>
            </div>
          </motion.form>
        </motion.div>
      )}

      <div className="students-table">
        <div className="table-header">
          <span>Nom</span>
          <span>Email</span>
          <span>Rôle</span>
          <span>Langue</span>
          <span>Niveau</span>
          <span>Progression</span>
          <span>Statut</span>
          <span>Actions</span>
        </div>

        {students.map((student) => (
          <div key={student.id} className="table-row">
            <span className="student-name">{student.name}</span>
            <span className="student-email">{student.email}</span>
            <span className={`role-badge ${student.role}`}>
              {student.role === "student"
                ? "Étudiant"
                : student.role === "teacher"
                ? "Professeur"
                : "Directeur"}
            </span>
            <span>{student.language}</span>
            <span className="level-badge">{student.level}</span>
            <span className="progress-cell">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${student.progress}%` }}
                ></div>
              </div>
              <span>{student.progress}%</span>
            </span>
            <span className={`status-badge ${student.status}`}>
              {student.status === "active" ? "Actif" : "Inactif"}
            </span>
            <span className="actions">
              <button className="action-btn edit">✏️</button>
              <button className="action-btn delete">🗑️</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudentProgress = () => (
    <div className="progress-section">
      <h3>Ma progression</h3>

      <div className="progress-overview">
        <div className="current-level">
          <h4>Niveau actuel : B1 Intermédiaire</h4>
          <div className="level-progress">
            <div className="progress-bar large">
              <div className="progress-fill" style={{ width: "65%" }}></div>
            </div>
            <span>65% vers B2</span>
          </div>
        </div>

        <div className="skills-breakdown">
          <h4>Compétences</h4>
          <div className="skills-grid">
            <div className="skill-item">
              <span>Compréhension orale</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "70%" }}></div>
              </div>
              <span>70%</span>
            </div>
            <div className="skill-item">
              <span>Expression orale</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "60%" }}></div>
              </div>
              <span>60%</span>
            </div>
            <div className="skill-item">
              <span>Compréhension écrite</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "75%" }}></div>
              </div>
              <span>75%</span>
            </div>
            <div className="skill-item">
              <span>Expression écrite</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "55%" }}></div>
              </div>
              <span>55%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="achievements">
        <h4>Badges obtenus</h4>
        <div className="badges-grid">
          <div className="badge earned">
            <span className="badge-icon">🎯</span>
            <span className="badge-name">Premier cours</span>
          </div>
          <div className="badge earned">
            <span className="badge-icon">📚</span>
            <span className="badge-name">Studieux</span>
          </div>
          <div className="badge earned">
            <span className="badge-icon">⭐</span>
            <span className="badge-name">Excellent</span>
          </div>
          <div className="badge locked">
            <span className="badge-icon">🏆</span>
            <span className="badge-name">Expert</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="user-management">
      <div className="management-header">
        <h3>Gestion des utilisateurs</h3>
        <button
          className="create-user-btn"
          onClick={() => setShowCreateForm(true)}
        >
          <IoAddOutline size={16} />
          Créer un utilisateur
        </button>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role === "teacher" && <IoPersonOutline size={12} />}
                    {user.role === "student" && <IoSchoolOutline size={12} />}
                    {user.role === "director" && (
                      <MdAdminPanelSettings size={12} />
                    )}
                    {user.role === "teacher"
                      ? "Professeur"
                      : user.role === "student"
                      ? "Étudiant"
                      : "Directeur"}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status === "active" ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de création d'utilisateur */}
      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Créer un nouvel utilisateur</h3>
              <button
                className="close-modal"
                onClick={() => setShowCreateForm(false)}
              >
                <IoCloseOutline size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="create-user-form">
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Rôle</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="student">Étudiant</option>
                  <option value="teacher">Professeur</option>
                  <option value="director">Directeur</option>
                </select>
              </div>
              <div className="form-group">
                <label>Mot de passe temporaire</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowCreateForm(false)}>
                  Annuler
                </button>
                <button type="submit">
                  <IoAddOutline size={16} />
                  Créer l'utilisateur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "users":
        return user?.role === "director" ? (
          renderUserManagement()
        ) : (
          <div>Accès non autorisé</div>
        );
      case "progress":
        return renderStudentProgress();
      case "courses":
        return (
          <div className="courses-content">
            <h3>
              {user?.role === "teacher"
                ? "Mes cours"
                : user?.role === "director"
                ? "Tous les cours"
                : "Mes cours"}
            </h3>
            <div className="courses-list">
              <p>Liste des cours à venir...</p>
            </div>
          </div>
        );
      case "students":
        return (
          <div className="students-content">
            <h3>Mes étudiants</h3>
            <div className="students-list">
              <p>Liste des étudiants à venir...</p>
            </div>
          </div>
        );
      case "schedule":
        return (
          <div className="schedule-content">
            <h3>Planning</h3>
            <div className="schedule-calendar">
              <p>Calendrier à venir...</p>
            </div>
          </div>
        );
      case "stats":
        return (
          <div className="stats-content">
            <h3>Statistiques détaillées</h3>
            <div className="detailed-stats">
              <p>Statistiques avancées à venir...</p>
            </div>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  const tabs = getTabsForRole(user?.role || "student");

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="dashboard-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Espace{" "}
          {user?.role === "director"
            ? "Direction"
            : user?.role === "teacher"
            ? "Professeur"
            : "Étudiant"}
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Bienvenue, {user?.name || "Utilisateur"} !
        </motion.p>
      </div>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <main className="dashboard-main">{renderContent()}</main>
      </div>
    </motion.div>
  );
};

export default Dashboard;
