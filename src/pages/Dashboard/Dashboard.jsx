// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  IoAddOutline,
  IoBookmarkOutline,
  IoBookOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoCreateOutline,
  IoEyeOutline,
  IoFlashOutline,
  IoLockClosedOutline,
  IoMedalOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoRibbonOutline,
  IoSchoolOutline,
  IoStarOutline,
  IoStatsChartOutline,
  IoTimeOutline,
  IoTrashOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";
import Overview from "../../components/Dashboard/Overview/Overview";
import Progress from "../../components/Dashboard/Progress/Progress";
import Resources from "../../components/Dashboard/Ressources/Resources";
import Schedule from "../../components/Dashboard/Schedule/Schedule";
import UserManagement from "../../components/Dashboard/UserManagement/UserManagement";
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

  // États pour les modals
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showClassInfoModal, setShowClassInfoModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // États pour les sections collapsibles de la modal vidéo
  const [showMeetingInfo, setShowMeetingInfo] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);

  // États pour l'édition de profil
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    bio: "",
    language: "french",
    level: user?.role === "student" ? "B1" : "",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
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

  const getBadgesForRole = (role) => {
    if (role === "student") {
      return [
        {
          id: 1,
          icon: IoCheckmarkCircleOutline,
          name: "Premier cours",
          earned: true,
          color: "#10B981",
        },
        {
          id: 2,
          icon: IoBookmarkOutline,
          name: "Studieux",
          earned: true,
          color: "#3B82F6",
        },
        {
          id: 3,
          icon: IoStarOutline,
          name: "Excellent",
          earned: true,
          color: "#F59E0B",
        },
        {
          id: 4,
          icon: IoFlashOutline,
          name: "Rapide",
          earned: true,
          color: "#8B5CF6",
        },
        {
          id: 5,
          icon: IoMedalOutline,
          name: "Perfectionniste",
          earned: false,
          color: "#6B7280",
        },
        {
          id: 6,
          icon: IoTrophyOutline,
          name: "Expert",
          earned: false,
          color: "#6B7280",
        },
      ];
    } else if (role === "teacher") {
      return [
        {
          id: 1,
          icon: IoRibbonOutline,
          name: "Mentor",
          earned: true,
          color: "#10B981",
        },
        {
          id: 2,
          icon: IoStarOutline,
          name: "Top évaluations",
          earned: true,
          color: "#F59E0B",
        },
        {
          id: 3,
          icon: IoPeopleOutline,
          name: "Populaire",
          earned: true,
          color: "#3B82F6",
        },
        {
          id: 4,
          icon: IoTimeOutline,
          name: "Ponctuel",
          earned: true,
          color: "#8B5CF6",
        },
        {
          id: 5,
          icon: IoRibbonOutline,
          name: "Innovation",
          earned: false,
          color: "#6B7280",
        },
        {
          id: 6,
          icon: IoTrophyOutline,
          name: "Maître",
          earned: false,
          color: "#6B7280",
        },
      ];
    } else if (role === "director") {
      return [
        {
          id: 1,
          icon: MdAdminPanelSettings,
          name: "Leadership",
          earned: true,
          color: "#10B981",
        },
        {
          id: 2,
          icon: IoStatsChartOutline,
          name: "Analyste",
          earned: true,
          color: "#3B82F6",
        },
        {
          id: 3,
          icon: IoTrophyOutline,
          name: "Excellence",
          earned: true,
          color: "#F59E0B",
        },
        {
          id: 4,
          icon: IoPeopleOutline,
          name: "Équipe unie",
          earned: true,
          color: "#8B5CF6",
        },
        {
          id: 5,
          icon: IoFlashOutline,
          name: "Visionnaire",
          earned: false,
          color: "#6B7280",
        },
        {
          id: 6,
          icon: IoMedalOutline,
          name: "Légende",
          earned: false,
          color: "#6B7280",
        },
      ];
    }
    return [];
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
              transition={{ delay: 0.2 }}
            >
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h3>B1</h3>
                <p>Niveau actuel</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>24h</h3>
                <p>Temps d'étude</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-icon">📖</div>
              <div className="stat-content">
                <h3>12</h3>
                <p>Leçons complétées</p>
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

      {renderBadges()}
    </div>
  );

  const renderStudentProgress = () => (
    <div className="progress-section">
      <h3>Ma progression</h3>

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

      <div className="achievements-section">
        <h4>Badges obtenus</h4>
        <div className="badges-container">
          {getBadgesForRole(user?.role || "student").map((badge) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={badge.id}
                className={`achievement-badge ${
                  badge.earned ? "earned" : "locked"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: badge.id * 0.1 }}
                whileHover={{ scale: badge.earned ? 1.05 : 1 }}
              >
                <div className="badge-icon-wrapper">
                  <IconComponent
                    size={24}
                    style={{
                      color: badge.earned ? badge.color : "#6B7280",
                      filter: badge.earned ? "none" : "grayscale(100%)",
                    }}
                  />
                  {!badge.earned && (
                    <IoLockClosedOutline
                      size={12}
                      className="lock-icon"
                      style={{ color: "#6B7280" }}
                    />
                  )}
                </div>
                <span className="badge-title">{badge.name}</span>
              </motion.div>
            );
          })}
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

  const renderTeacherCourses = () => (
    <motion.div
      className="teacher-courses-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-header">
        <h3>Mes cours</h3>
        <p>Gérez vos cours et suivez la progression de vos groupes</p>
      </div>

      <div className="courses-grid">
        <motion.div
          className="course-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="course-header">
            <div className="course-info">
              <h4>Anglais B1 - Groupe A</h4>
              <p>Cours principal • Lun-Mer-Ven 18h-19h30</p>
            </div>
            <div className="course-status active">
              <span className="status-dot"></span>
              Actif
            </div>
          </div>

          <div className="course-stats">
            <div className="stat-item">
              <span className="stat-icon">👥</span>
              <div className="stat-info">
                <span className="stat-number">8/10</span>
                <span className="stat-label">Étudiants</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📚</span>
              <div className="stat-info">
                <span className="stat-number">12/20</span>
                <span className="stat-label">Leçons</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📊</span>
              <div className="stat-info">
                <span className="stat-number">75%</span>
                <span className="stat-label">Progression</span>
              </div>
            </div>
          </div>

          <div className="course-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "75%" }}></div>
            </div>
          </div>

          <div className="course-actions">
            <button className="action-btn primary">📝 Prendre présences</button>
            <button className="action-btn secondary">📋 Voir détails</button>
          </div>

          <div className="next-class">
            <span className="next-label">Prochain cours :</span>
            <span className="next-time">Lundi 18:00 - Salle 2</span>
          </div>
        </motion.div>

        <motion.div
          className="course-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="course-header">
            <div className="course-info">
              <h4>Conversation Anglaise B1</h4>
              <p>Cours de conversation • Jeu 19h-20h</p>
            </div>
            <div className="course-status active">
              <span className="status-dot"></span>
              Actif
            </div>
          </div>

          <div className="course-stats">
            <div className="stat-item">
              <span className="stat-icon">👥</span>
              <div className="stat-info">
                <span className="stat-number">6/8</span>
                <span className="stat-label">Étudiants</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📹</span>
              <div className="stat-info">
                <span className="stat-number">En ligne</span>
                <span className="stat-label">Format</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📊</span>
              <div className="stat-info">
                <span className="stat-number">85%</span>
                <span className="stat-label">Participation</span>
              </div>
            </div>
          </div>

          <div className="course-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "85%" }}></div>
            </div>
          </div>

          <div className="course-actions">
            <button className="action-btn primary">🎥 Démarrer visio</button>
            <button className="action-btn secondary">📋 Voir détails</button>
          </div>

          <div className="next-class">
            <span className="next-label">Prochain cours :</span>
            <span className="next-time">Jeudi 19:00 - Visioconférence</span>
          </div>
        </motion.div>

        <motion.div
          className="course-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="course-header">
            <div className="course-info">
              <h4>Anglais A2 - Groupe B</h4>
              <p>Cours débutant • Mar-Jeu 17h-18h30</p>
            </div>
            <div className="course-status paused">
              <span className="status-dot"></span>
              En pause
            </div>
          </div>

          <div className="course-stats">
            <div className="stat-item">
              <span className="stat-icon">👥</span>
              <div className="stat-info">
                <span className="stat-number">5/8</span>
                <span className="stat-label">Étudiants</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📚</span>
              <div className="stat-info">
                <span className="stat-number">8/16</span>
                <span className="stat-label">Leçons</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📊</span>
              <div className="stat-info">
                <span className="stat-number">50%</span>
                <span className="stat-label">Progression</span>
              </div>
            </div>
          </div>

          <div className="course-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "50%" }}></div>
            </div>
          </div>

          <div className="course-actions">
            <button className="action-btn secondary">⏸️ Reprendre cours</button>
            <button className="action-btn secondary">📋 Voir détails</button>
          </div>

          <div className="next-class">
            <span className="next-label">Reprise prévue :</span>
            <span className="next-time">À définir</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderTeacherStudents = () => (
    <motion.div
      className="teacher-students-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-header">
        <h3>Mes étudiants</h3>
        <p>Suivez la progression et les performances de vos étudiants</p>
      </div>

      <div className="students-filters">
        <div className="filter-group">
          <label>Cours :</label>
          <select className="filter-select">
            <option value="all">Tous les cours</option>
            <option value="b1-a">Anglais B1 - Groupe A</option>
            <option value="conv">Conversation B1</option>
            <option value="a2-b">Anglais A2 - Groupe B</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Statut :</label>
          <select className="filter-select">
            <option value="all">Tous</option>
            <option value="active">Actifs</option>
            <option value="absent">Absents récents</option>
            <option value="difficulty">En difficulté</option>
          </select>
        </div>
      </div>

      <div className="students-grid">
        <motion.div
          className="student-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="student-header">
            <div className="student-avatar">
              <span>👨‍🎓</span>
            </div>
            <div className="student-info">
              <h4>Pierre Martin</h4>
              <p>Anglais B1 - Groupe A</p>
              <span className="student-level">Niveau B1</span>
            </div>
            <div className="student-status excellent">
              <span className="status-dot"></span>
              Excellent
            </div>
          </div>

          <div className="student-stats">
            <div className="stat-row">
              <span className="stat-label">Progression générale</span>
              <div className="stat-value">
                <div className="progress-bar small">
                  <div className="progress-fill" style={{ width: "85%" }}></div>
                </div>
                <span>85%</span>
              </div>
            </div>
            <div className="stat-row">
              <span className="stat-label">Assiduité</span>
              <div className="stat-value">
                <div className="progress-bar small">
                  <div className="progress-fill" style={{ width: "95%" }}></div>
                </div>
                <span>95%</span>
              </div>
            </div>
            <div className="stat-row">
              <span className="stat-label">Dernière note</span>
              <div className="stat-value">
                <span className="grade excellent">18/20</span>
              </div>
            </div>
          </div>

          <div className="student-actions">
            <button className="action-btn primary">📊 Voir profil</button>
            <button className="action-btn secondary">💬 Contacter</button>
          </div>
        </motion.div>

        <motion.div
          className="student-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="student-header">
            <div className="student-avatar">
              <span>👩‍🎓</span>
            </div>
            <div className="student-info">
              <h4>Sophie Laurent</h4>
              <p>Conversation B1</p>
              <span className="student-level">Niveau B1</span>
            </div>
            <div className="student-status good">
              <span className="status-dot"></span>
              Bon
            </div>
          </div>

          <div className="student-stats">
            <div className="stat-row">
              <span className="stat-label">Progression générale</span>
              <div className="stat-value">
                <div className="progress-bar small">
                  <div className="progress-fill" style={{ width: "70%" }}></div>
                </div>
                <span>70%</span>
              </div>
            </div>
            <div className="stat-row">
              <span className="stat-label">Assiduité</span>
              <div className="stat-value">
                <div className="progress-bar small">
                  <div className="progress-fill" style={{ width: "80%" }}></div>
                </div>
                <span>80%</span>
              </div>
            </div>
            <div className="stat-row">
              <span className="stat-label">Dernière note</span>
              <div className="stat-value">
                <span className="grade good">14/20</span>
              </div>
            </div>
          </div>

          <div className="student-actions">
            <button className="action-btn primary">📊 Voir profil</button>
            <button className="action-btn secondary">💬 Contacter</button>
          </div>
        </motion.div>

        <motion.div
          className="student-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="student-header">
            <div className="student-avatar">
              <span>👨‍🎓</span>
            </div>
            <div className="student-info">
              <h4>Marc Dubois</h4>
              <p>Anglais A2 - Groupe B</p>
              <span className="student-level">Niveau A2</span>
            </div>
            <div className="student-status attention">
              <span className="status-dot"></span>À suivre
            </div>
          </div>

          <div className="student-stats">
            <div className="stat-row">
              <span className="stat-label">Progression générale</span>
              <div className="stat-value">
                <div className="progress-bar small">
                  <div className="progress-fill" style={{ width: "45%" }}></div>
                </div>
                <span>45%</span>
              </div>
            </div>
            <div className="stat-row">
              <span className="stat-label">Assiduité</span>
              <div className="stat-value">
                <div className="progress-bar small">
                  <div className="progress-fill" style={{ width: "60%" }}></div>
                </div>
                <span>60%</span>
              </div>
            </div>
            <div className="stat-row">
              <span className="stat-label">Dernière note</span>
              <div className="stat-value">
                <span className="grade attention">9/20</span>
              </div>
            </div>
          </div>

          <div className="student-actions">
            <button className="action-btn primary">📊 Voir profil</button>
            <button className="action-btn secondary">💬 Contacter</button>
          </div>
        </motion.div>

        <motion.div
          className="student-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="student-header">
            <div className="student-avatar">
              <span>👩‍🎓</span>
            </div>
            <div className="student-info">
              <h4>Emma Wilson</h4>
              <p>Anglais B1 - Groupe A</p>
              <span className="student-level">Niveau B1</span>
            </div>
            <div className="student-status good">
              <span className="status-dot"></span>
              Bon
            </div>
          </div>

          <div className="student-stats">
            <div className="stat-row">
              <span className="stat-label">Progression générale</span>
              <div className="stat-value">
                <div className="progress-bar small">
                  <div className="progress-fill" style={{ width: "78%" }}></div>
                </div>
                <span>78%</span>
              </div>
            </div>
            <div className="stat-row">
              <span className="stat-label">Assiduité</span>
              <div className="stat-value">
                <div className="progress-bar small">
                  <div className="progress-fill" style={{ width: "90%" }}></div>
                </div>
                <span>90%</span>
              </div>
            </div>
            <div className="stat-row">
              <span className="stat-label">Dernière note</span>
              <div className="stat-value">
                <span className="grade good">15/20</span>
              </div>
            </div>
          </div>

          <div className="student-actions">
            <button className="action-btn primary">📊 Voir profil</button>
            <button className="action-btn secondary">💬 Contacter</button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderResources = () => (
    <motion.div
      className="resources-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="resources-header">
        <h3>Ressources de cours</h3>
        <p>
          Documents et supports pédagogiques mis à disposition par vos
          professeurs
        </p>
      </div>

      <div className="resources-categories">
        <motion.div
          className="category-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="category-header">
            <div className="category-icon">📚</div>
            <h4>Cours d'Anglais B1</h4>
            <span className="resources-count">8 ressources</span>
          </div>
          <div className="resources-list">
            <div className="resource-item">
              <div className="resource-icon">📄</div>
              <div className="resource-info">
                <span className="resource-name">
                  Grammaire - Present Perfect
                </span>
                <span className="resource-meta">
                  PDF • 2.4 MB • Ajouté le 15/01/2024
                </span>
              </div>
              <button className="download-btn">⬇️</button>
            </div>
            <div className="resource-item">
              <div className="resource-icon">🎵</div>
              <div className="resource-info">
                <span className="resource-name">
                  Audio - Pronunciation Practice
                </span>
                <span className="resource-meta">
                  MP3 • 15 min • Ajouté le 12/01/2024
                </span>
              </div>
              <button className="download-btn">⬇️</button>
            </div>
            <div className="resource-item">
              <div className="resource-icon">🎥</div>
              <div className="resource-info">
                <span className="resource-name">
                  Vidéo - Daily Conversations
                </span>
                <span className="resource-meta">
                  MP4 • 8 min • Ajouté le 10/01/2024
                </span>
              </div>
              <button className="download-btn">⬇️</button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="category-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="category-header">
            <div className="category-icon">📖</div>
            <h4>Exercices Pratiques</h4>
            <span className="resources-count">5 ressources</span>
          </div>
          <div className="resources-list">
            <div className="resource-item">
              <div className="resource-icon">📝</div>
              <div className="resource-info">
                <span className="resource-name">
                  Exercices - Les temps du passé
                </span>
                <span className="resource-meta">
                  PDF • 1.8 MB • Ajouté le 08/01/2024
                </span>
              </div>
              <button className="download-btn">⬇️</button>
            </div>
            <div className="resource-item">
              <div className="resource-icon">🔤</div>
              <div className="resource-info">
                <span className="resource-name">
                  Vocabulaire - Business English
                </span>
                <span className="resource-meta">
                  PDF • 950 KB • Ajouté le 05/01/2024
                </span>
              </div>
              <button className="download-btn">⬇️</button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="category-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="category-header">
            <div className="category-icon">🌟</div>
            <h4>Ressources Supplémentaires</h4>
            <span className="resources-count">3 ressources</span>
          </div>
          <div className="resources-list">
            <div className="resource-item">
              <div className="resource-icon">🔗</div>
              <div className="resource-info">
                <span className="resource-name">
                  Liens Utiles - Sites de pratique
                </span>
                <span className="resource-meta">
                  Document • Ajouté le 20/12/2023
                </span>
              </div>
              <button className="download-btn">⬇️</button>
            </div>
            <div className="resource-item">
              <div className="resource-icon">📱</div>
              <div className="resource-info">
                <span className="resource-name">Applications Recommandées</span>
                <span className="resource-meta">
                  Liste • Ajouté le 18/12/2023
                </span>
              </div>
              <button className="download-btn">⬇️</button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="recent-uploads"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h4>Récemment ajoutées</h4>
        <div className="recent-resources">
          <div className="recent-resource">
            <div className="resource-icon">📄</div>
            <div className="resource-info">
              <span className="resource-name">
                Guide de Conversation - Restaurant
              </span>
              <span className="resource-meta">
                Ajouté par Marie Dubois • Il y a 2 jours
              </span>
            </div>
            <button className="download-btn">⬇️</button>
          </div>
          <div className="recent-resource">
            <div className="resource-icon">🎵</div>
            <div className="resource-info">
              <span className="resource-name">
                Prononciation - Sons difficiles
              </span>
              <span className="resource-meta">
                Ajouté par Marie Dubois • Il y a 1 semaine
              </span>
            </div>
            <button className="download-btn">⬇️</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Fonction pour fermer les modals
  const closeModals = () => {
    setShowVideoModal(false);
    setShowClassInfoModal(false);
    setShowProfileModal(false);
    setSelectedClass(null);
  };

  // Fonction pour sauvegarder le profil
  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Simulation de sauvegarde
    console.log("Profil sauvegardé:", profileData);
    setShowProfileModal(false);
    // Ici on pourrait mettre à jour le contexte utilisateur
  };

  // Gestion de la touche Échap
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeModals();
      }
    };

    if (showVideoModal || showClassInfoModal || showProfileModal) {
      document.addEventListener("keydown", handleEscapeKey);
      // Empêcher le scroll du body quand une modal est ouverte
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [showVideoModal, showClassInfoModal, showProfileModal]);

  // Fonction pour rejoindre un cours
  const joinClass = (classInfo) => {
    setSelectedClass(classInfo);
    if (classInfo.type === "online") {
      setShowVideoModal(true);
    } else {
      setShowClassInfoModal(true);
    }
  };

  // Fonction pour rendre les modales avec createPortal
  const renderModals = () => {
    const modals = (
      <>
        {/* Modal de visioconférence */}
        {showVideoModal && (
          <motion.div
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModals}
          >
            <motion.div
              className="video-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="video-header">
                <h3>{selectedClass?.title}</h3>
                <button className="close-btn" onClick={closeModals}>
                  ✕
                </button>
              </div>

              <div className="video-content">
                <div className="video-main">
                  <div className="teacher-video">
                    <div className="video-placeholder">
                      <div className="teacher-avatar">
                        <span>👩‍🏫</span>
                        <p>{selectedClass?.teacher}</p>
                      </div>
                    </div>
                    <div className="video-controls">
                      <button className="control-btn active">🎤</button>
                      <button className="control-btn active">📹</button>
                      <button className="control-btn">📺</button>
                      <button className="control-btn leave">📞</button>
                    </div>
                  </div>

                  <div className="student-video">
                    <div className="video-placeholder small">
                      <div className="student-avatar">
                        <span>👨‍🎓</span>
                        <p>Vous</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="video-sidebar">
                  <div className="meeting-info">
                    <div
                      className="section-header"
                      onClick={() => setShowMeetingInfo(!showMeetingInfo)}
                    >
                      <h4>Informations du cours</h4>
                      <span
                        className={`toggle-icon ${
                          showMeetingInfo ? "open" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                    {showMeetingInfo && (
                      <div className="section-content">
                        <p>
                          <strong>ID de réunion:</strong>{" "}
                          {selectedClass?.meetingId}
                        </p>
                        <p>
                          <strong>Heure:</strong> {selectedClass?.time}
                        </p>
                        <p>
                          <strong>Professeur:</strong> {selectedClass?.teacher}
                        </p>
                        <p>
                          <strong>Durée:</strong> 1h30
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="participants">
                    <div
                      className="section-header"
                      onClick={() => setShowParticipants(!showParticipants)}
                    >
                      <h4>Participants (3)</h4>
                      <span
                        className={`toggle-icon ${
                          showParticipants ? "open" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                    {showParticipants && (
                      <div className="section-content">
                        <div className="participant-list">
                          <div className="participant">
                            <span className="participant-avatar">👩‍🏫</span>
                            <span>Marie Dubois (Professeur)</span>
                          </div>
                          <div className="participant">
                            <span className="participant-avatar">👨‍🎓</span>
                            <span>Pierre Martin (Vous)</span>
                          </div>
                          <div className="participant">
                            <span className="participant-avatar">👩‍🎓</span>
                            <span>Sophie Laurent</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="chat-section">
                    <h4>Chat</h4>
                    <div className="chat-messages">
                      <div className="message">
                        <strong>Marie:</strong> Bonjour tout le monde ! Prêts
                        pour notre session de conversation ?
                      </div>
                      <div className="message">
                        <strong>Sophie:</strong> Bonjour ! Oui, j'ai hâte de
                        pratiquer ! 👋
                      </div>
                      <div className="message">
                        <strong>Pierre:</strong> Hello everyone! Ready to
                        practice English! 🇬🇧
                      </div>
                      <div className="message">
                        <strong>Marie:</strong> Perfect! Today we'll practice
                        ordering food at a restaurant. Sophie, can you start?
                      </div>
                      <div className="message">
                        <strong>Sophie:</strong> Sure! "Excuse me, could I have
                        the menu please?"
                      </div>
                      <div className="message">
                        <strong>Marie:</strong> Excellent pronunciation! Pierre,
                        your turn to be the waiter.
                      </div>
                      <div className="message">
                        <strong>Pierre:</strong> "Of course! Here's our menu.
                        Would you like something to drink first?"
                      </div>
                      <div className="message">
                        <strong>Sophie:</strong> "Yes, I'll have a glass of
                        water, please."
                      </div>
                    </div>
                    <div className="chat-input">
                      <input type="text" placeholder="Tapez votre message..." />
                      <button>Envoyer</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal d'information pour cours en présentiel */}
        {showClassInfoModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModals}
          >
            <motion.div
              className="class-info-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>📍 Cours en Présentiel</h3>
                <button className="close-btn" onClick={closeModals}>
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <div className="class-details">
                  <div className="detail-item">
                    <span className="detail-icon">📚</span>
                    <div className="detail-info">
                      <h4>{selectedClass?.title}</h4>
                      <p>Cours principal</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">👩‍🏫</span>
                    <div className="detail-info">
                      <h4>{selectedClass?.teacher}</h4>
                      <p>Professeur</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">🏫</span>
                    <div className="detail-info">
                      <h4>{selectedClass?.location}</h4>
                      <p>Lieu du cours</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">🕐</span>
                    <div className="detail-info">
                      <h4>18:00 - 19:30</h4>
                      <p>Horaire</p>
                    </div>
                  </div>
                </div>

                <div className="location-map">
                  <div className="map-placeholder">
                    <div className="map-icon">🗺️</div>
                    <p>Plan de l'école</p>
                    <div className="directions">
                      <p>📍 École Bon Cours - Campus Principal</p>
                      <p>123 Avenue de l'Éducation</p>
                      <p>75015 Paris, France</p>
                      <p>🚇 Métro : Ligne 8 - École Militaire (5 min à pied)</p>
                    </div>
                  </div>
                </div>

                <div className="preparation-tips">
                  <h4>💡 Conseils de préparation</h4>
                  <ul>
                    <li>Arrivez 10 minutes avant le début du cours</li>
                    <li>
                      Apportez votre manuel "English Grammar B1" et un carnet
                    </li>
                    <li>
                      N'oubliez pas votre carte d'étudiant pour l'accès au
                      bâtiment
                    </li>
                    <li>Préparez vos exercices de la leçon précédente</li>
                    <li>Pensez à apporter une bouteille d'eau</li>
                  </ul>
                </div>
              </div>

              <div className="modal-actions">
                <button className="secondary-btn" onClick={closeModals}>
                  Fermer
                </button>
                <button className="primary-btn">Ajouter au calendrier</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal d'édition de profil */}
        {showProfileModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModals}
          >
            <motion.div
              className="profile-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>👤 Éditer mon profil</h3>
                <button className="close-btn" onClick={closeModals}>
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSaveProfile} className="profile-form">
                  <div className="form-section">
                    <h4>Informations personnelles</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Nom complet</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Téléphone</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                      <div className="form-group">
                        <label>Adresse</label>
                        <input
                          type="text"
                          value={profileData.address}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              address: e.target.value,
                            })
                          }
                          placeholder="123 Rue de la Paix, 75001 Paris"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Informations académiques</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Langue principale</label>
                        <select
                          value={profileData.language}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              language: e.target.value,
                            })
                          }
                        >
                          <option value="french">Français</option>
                          <option value="english">Anglais</option>
                          <option value="spanish">Espagnol</option>
                          <option value="german">Allemand</option>
                        </select>
                      </div>
                      {user?.role === "student" && (
                        <div className="form-group">
                          <label>Niveau actuel</label>
                          <div className="readonly-input">
                            {profileData.level} -{" "}
                            {profileData.level === "A1"
                              ? "Débutant"
                              : profileData.level === "A2"
                              ? "Élémentaire"
                              : profileData.level === "B1"
                              ? "Intermédiaire"
                              : profileData.level === "B2"
                              ? "Intermédiaire supérieur"
                              : profileData.level === "C1"
                              ? "Avancé"
                              : profileData.level === "C2"
                              ? "Maîtrise"
                              : "Non défini"}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>À propos de moi</h4>
                    <div className="form-group">
                      <label>Biographie</label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bio: e.target.value,
                          })
                        }
                        placeholder="Parlez-nous de vous, vos objectifs d'apprentissage, vos centres d'intérêt..."
                        rows="4"
                      />
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Préférences de notification</h4>
                    <div className="notifications-grid">
                      <div className="notification-item">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={profileData.notifications.email}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                notifications: {
                                  ...profileData.notifications,
                                  email: e.target.checked,
                                },
                              })
                            }
                          />
                          <span className="checkmark"></span>
                          <div className="notification-info">
                            <span className="notification-title">
                              📧 Notifications par email
                            </span>
                            <span className="notification-desc">
                              Recevoir les rappels de cours et les actualités
                            </span>
                          </div>
                        </label>
                      </div>
                      <div className="notification-item">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={profileData.notifications.sms}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                notifications: {
                                  ...profileData.notifications,
                                  sms: e.target.checked,
                                },
                              })
                            }
                          />
                          <span className="checkmark"></span>
                          <div className="notification-info">
                            <span className="notification-title">
                              📱 Notifications SMS
                            </span>
                            <span className="notification-desc">
                              Recevoir les rappels urgents par SMS
                            </span>
                          </div>
                        </label>
                      </div>
                      <div className="notification-item">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={profileData.notifications.push}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                notifications: {
                                  ...profileData.notifications,
                                  push: e.target.checked,
                                },
                              })
                            }
                          />
                          <span className="checkmark"></span>
                          <div className="notification-info">
                            <span className="notification-title">
                              🔔 Notifications push
                            </span>
                            <span className="notification-desc">
                              Recevoir les notifications dans le navigateur
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={closeModals}
                    >
                      Annuler
                    </button>
                    <button type="submit" className="primary-btn">
                      💾 Sauvegarder
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </>
    );

    // Utiliser createPortal pour rendre les modales dans le body
    return createPortal(modals, document.body);
  };

  const renderSchedule = () => (
    <motion.div
      className="schedule-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="schedule-header">
        <h3>Mon Planning</h3>
        <p>Vos cours et activités de la semaine</p>
      </div>

      <div className="schedule-content">
        <motion.div
          className="current-week"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="week-header">
            <h4>Semaine du 15 - 21 Janvier 2024</h4>
            <div className="week-navigation">
              <button className="nav-btn">‹</button>
              <span>Aujourd'hui</span>
              <button className="nav-btn">›</button>
            </div>
          </div>

          <div className="calendar-grid">
            <div className="calendar-day-header">Lun</div>
            <div className="calendar-day-header">Mar</div>
            <div className="calendar-day-header">Mer</div>
            <div className="calendar-day-header">Jeu</div>
            <div className="calendar-day-header">Ven</div>
            <div className="calendar-day-header">Sam</div>
            <div className="calendar-day-header">Dim</div>

            <div className="calendar-day">
              <span className="day-number">15</span>
              <div className="day-events">
                <div className="event english online">
                  <span className="event-time">18:00</span>
                  <span className="event-title">Anglais B1 📹</span>
                </div>
              </div>
            </div>

            <div className="calendar-day">
              <span className="day-number">16</span>
              <div className="day-events">
                <div className="event english">
                  <span className="event-time">18:00</span>
                  <span className="event-title">Anglais B1 🏫</span>
                </div>
              </div>
            </div>

            <div className="calendar-day">
              <span className="day-number">17</span>
            </div>

            <div className="calendar-day today">
              <span className="day-number">18</span>
              <div className="day-events">
                <div className="event conversation online">
                  <span className="event-time">19:00</span>
                  <span className="event-title">Conversation 📹</span>
                </div>
              </div>
            </div>

            <div className="calendar-day">
              <span className="day-number">19</span>
              <div className="day-events">
                <div className="event english">
                  <span className="event-time">18:00</span>
                  <span className="event-title">Anglais B1 🏫</span>
                </div>
              </div>
            </div>

            <div className="calendar-day">
              <span className="day-number">20</span>
            </div>

            <div className="calendar-day">
              <span className="day-number">21</span>
            </div>
          </div>
        </motion.div>

        <div className="schedule-bottom-section">
          <motion.div
            className="upcoming-classes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4>Prochains cours</h4>
            <div className="classes-list">
              <div className="class-item today online">
                <div className="class-mode">
                  <span className="mode-icon">📹</span>
                  <span className="mode-text">En ligne</span>
                </div>
                <div className="class-time">
                  <span className="time">19:00</span>
                  <span className="date">Aujourd'hui</span>
                </div>
                <div className="class-info">
                  <h5>Conversation Anglaise</h5>
                  <p>Groupe B1 • Visioconférence • Marie Dubois</p>
                  <div className="class-topics">
                    <span className="topic">Restaurant & Nourriture</span>
                    <span className="topic">Expressions courantes</span>
                  </div>
                </div>
                <button
                  className="join-btn"
                  onClick={() =>
                    joinClass({
                      title: "Conversation Anglaise",
                      type: "online",
                      teacher: "Marie Dubois",
                      time: "19:00",
                      meetingId: "BC-CONV-B1-240118",
                    })
                  }
                >
                  Rejoindre la visio
                </button>
              </div>

              <div className="class-item in-person">
                <div className="class-mode">
                  <span className="mode-icon">🏫</span>
                  <span className="mode-text">Présentiel</span>
                </div>
                <div className="class-time">
                  <span className="time">18:00</span>
                  <span className="date">Demain</span>
                </div>
                <div className="class-info">
                  <h5>Grammaire Anglaise B1</h5>
                  <p>Cours principal • Salle 1 • Marie Dubois</p>
                  <div className="class-topics">
                    <span className="topic">Present Perfect</span>
                    <span className="topic">Exercices pratiques</span>
                  </div>
                </div>
                <button
                  className="prepare-btn"
                  onClick={() =>
                    joinClass({
                      title: "Grammaire Anglaise B1",
                      type: "in-person",
                      location: "Salle 1",
                      teacher: "Marie Dubois",
                    })
                  }
                >
                  Voir les détails
                </button>
              </div>

              <div className="class-item online">
                <div className="class-mode">
                  <span className="mode-icon">📹</span>
                  <span className="mode-text">En ligne</span>
                </div>
                <div className="class-time">
                  <span className="time">18:00</span>
                  <span className="date">Lundi</span>
                </div>
                <div className="class-info">
                  <h5>Grammaire Anglaise B1</h5>
                  <p>Cours principal • Visioconférence • Marie Dubois</p>
                  <div className="class-topics">
                    <span className="topic">Past Tenses</span>
                    <span className="topic">Storytelling</span>
                  </div>
                </div>
                <button
                  className="prepare-btn"
                  onClick={() =>
                    joinClass({
                      title: "Grammaire Anglaise B1",
                      type: "online",
                      teacher: "Marie Dubois",
                      time: "18:00",
                      meetingId: "BC-GRAM-B1-240122",
                    })
                  }
                >
                  Se préparer
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="study-reminders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4>Rappels d'étude</h4>
            <div className="reminders-list">
              <div className="reminder-item">
                <div className="reminder-icon">📚</div>
                <div className="reminder-content">
                  <p>Révision vocabulaire</p>
                  <span>Dans 2 heures</span>
                </div>
              </div>
              <div className="reminder-item">
                <div className="reminder-icon">🎧</div>
                <div className="reminder-content">
                  <p>Écoute audio - Leçon 12</p>
                  <span>Demain 14:00</span>
                </div>
              </div>
              <div className="reminder-item">
                <div className="reminder-icon">✍️</div>
                <div className="reminder-content">
                  <p>Exercices Present Perfect</p>
                  <span>Avant vendredi</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  const renderBadges = () => {
    const badges = getBadgesForRole(user?.role || "student");

    return (
      <div className="achievements-section">
        <h3>
          Badges {user?.role === "student" ? "obtenus" : "de performance"}
        </h3>
        <div className="badges-container">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={badge.id}
                className={`achievement-badge ${
                  badge.earned ? "earned" : "locked"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: badge.id * 0.1 }}
                whileHover={{ scale: badge.earned ? 1.05 : 1 }}
              >
                <div className="badge-icon-wrapper">
                  <IconComponent
                    size={24}
                    style={{
                      color: badge.earned ? badge.color : "#6B7280",
                      filter: badge.earned ? "none" : "grayscale(100%)",
                    }}
                  />
                  {!badge.earned && (
                    <IoLockClosedOutline
                      size={12}
                      className="lock-icon"
                      style={{ color: "#6B7280" }}
                    />
                  )}
                </div>
                <span className="badge-title">{badge.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview user={user} getBadgesForRole={getBadgesForRole} />;
      case "users":
        return user?.role === "director" ? (
          <UserManagement
            students={students}
            showCreateForm={showCreateForm}
            setShowCreateForm={setShowCreateForm}
            newUser={newUser}
            setNewUser={setNewUser}
            handleCreateUser={handleCreateUser}
          />
        ) : (
          <div>Accès non autorisé</div>
        );
      case "progress":
        return <Progress user={user} getBadgesForRole={getBadgesForRole} />;
      case "courses":
        return user?.role === "teacher" ? (
          renderTeacherCourses()
        ) : (
          <div className="courses-content">
            <h3>
              {user?.role === "director" ? "Tous les cours" : "Mes cours"}
            </h3>
            <div className="courses-list">
              <p>Liste des cours à venir...</p>
            </div>
          </div>
        );
      case "students":
        return user?.role === "teacher" ? (
          renderTeacherStudents()
        ) : (
          <div className="students-content">
            <h3>Mes étudiants</h3>
            <div className="students-list">
              <p>Liste des étudiants à venir...</p>
            </div>
          </div>
        );
      case "schedule":
        return (
          <Schedule
            setShowVideoModal={setShowVideoModal}
            setShowClassInfoModal={setShowClassInfoModal}
            setSelectedClass={setSelectedClass}
            joinClass={joinClass}
          />
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
      case "resources":
        return <Resources />;
      default:
        return <Overview user={user} getBadgesForRole={getBadgesForRole} />;
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
        <div className="header-content">
          <div className="header-text">
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
          <motion.button
            className="profile-edit-btn"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setShowProfileModal(true)}
          >
            <span className="profile-icon">👤</span>
            <span>Éditer profil</span>
          </motion.button>
        </div>
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

      {renderModals()}
    </motion.div>
  );
};

export default Dashboard;
