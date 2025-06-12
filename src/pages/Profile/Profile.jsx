import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBookOpen,
  FiCalendar,
  FiCheck,
  FiEdit3,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSettings,
  FiTrendingUp,
  FiUser,
  FiUsers,
  FiX,
  FiAward,
  FiStar,
  FiShield,
  FiTarget,
  FiActivity,
  FiClock,
  FiEye,
  FiHeart,
} from "react-icons/fi";
import {
  MdSchool,
  MdSupervisorAccount,
  MdVerified,
  MdTrendingUp,
  MdAdminPanelSettings,
  MdLibraryBooks,
  MdGroup,
  MdVideoCall,
} from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { currentUser: user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);

  // Déterminer le rôle de l'utilisateur
  const isEleve = user?.role === "student";
  const isProfesseur = user?.role === "teacher";
  const isDirecteur = user?.role === "director";

  useEffect(() => {
    if (user) {
      setProfileData({
        prenom: user.name?.split(" ")[0] || "",
        nom: user.name?.split(" ")[1] || "",
        email: user.email || "",
        telephone: user.phone || "",
        dateNaissance: user.birthDate || "",
        adresse: user.address || "",
        bio:
          user.bio ||
          "Passionné par l'enseignement et l'apprentissage des langues.",
      });
    }
  }, [user]);

  const getUserPhoto = (userData) => {
    const photoMap = {
      "Marie Dubois":
        "https://api.dicebear.com/7.x/avataaars/svg?seed=marie-dubois&style=professional&hair=short&eyes=friendly&mouth=smile&accessories=glasses",
      "Jean Martin":
        "https://api.dicebear.com/7.x/avataaars/svg?seed=jean-martin&style=professional&hair=brown&eyes=confident&mouth=smile&accessories=none",
      "Sophie Leroy":
        "https://api.dicebear.com/7.x/avataaars/svg?seed=sophie-leroy&style=professional&hair=long&eyes=sparkle&mouth=smile&accessories=earrings",
      "Marco Rossi":
        "https://api.dicebear.com/7.x/avataaars/svg?seed=marco-rossi&style=professional&hair=black&eyes=friendly&mouth=smile&accessories=beard",
      "Lucas Petit":
        "https://api.dicebear.com/7.x/avataaars/svg?seed=lucas-petit&style=young&hair=blonde&eyes=excited&mouth=grin&accessories=none",
      "Emma Garcia":
        "https://api.dicebear.com/7.x/avataaars/svg?seed=emma-garcia&style=young&hair=curly&eyes=bright&mouth=smile&accessories=glasses",
      "Thomas Dubois":
        "https://api.dicebear.com/7.x/avataaars/svg?seed=thomas-dubois&style=young&hair=brown&eyes=curious&mouth=smile&accessories=none",
      "Léa Martin":
        "https://api.dicebear.com/7.x/avataaars/svg?seed=lea-martin&style=young&hair=long&eyes=sparkle&mouth=smile&accessories=earrings",
    };

    return (
      photoMap[userData.name] ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name
        ?.toLowerCase()
        .replace(/\s+/g, "-")}&style=professional`
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log("Données sauvegardées :", profileData);
    setIsEditing(false);
  };

  const getRoleIcon = () => {
    if (isDirecteur) return <MdSupervisorAccount />;
    if (isProfesseur) return <FiUser />;
    if (isEleve) return <MdSchool />;
    return <FiUser />;
  };

  const getRoleTitle = () => {
    if (isDirecteur) return "Directrice École de Langues";
    if (isProfesseur) return "Professeur de Langues";
    if (isEleve) return "Apprenant Linguistique";
    return "Profil Utilisateur";
  };

  const getRoleBadge = () => {
    if (isDirecteur) return { text: "Directrice", color: "director" };
    if (isProfesseur) return { text: "Professeur", color: "teacher" };
    if (isEleve) return { text: "Apprenant", color: "student" };
    return { text: user?.role, color: "default" };
  };

  const getQuickActions = () => {
    if (isDirecteur) {
      return [
        {
          icon: MdAdminPanelSettings,
          title: "Administration",
          desc: "Gérer les comptes utilisateurs et les paramètres",
          path: "/admin",
          color: "#dc2626",
        },
        {
          icon: MdLibraryBooks,
          title: "Bibliothèque",
          desc: "Gérer les documents et ressources",
          path: "/library",
          color: "#2563eb",
        },
        {
          icon: MdGroup,
          title: "Réseau Social",
          desc: "Suivre les activités et interactions",
          path: "/social",
          color: "#059669",
        },
        {
          icon: MdVideoCall,
          title: "Visioconférence",
          desc: "Organiser et planifier des réunions",
          path: "/video-call",
          color: "#7c3aed",
        },
      ];
    }
    if (isProfesseur) {
      return [
        {
          icon: MdLibraryBooks,
          title: "Mes Documents",
          desc: "Gérer vos ressources pédagogiques",
          path: "/library",
          color: "#2563eb",
        },
        {
          icon: MdGroup,
          title: "Réseau Social",
          desc: "Échanger avec vos collègues",
          path: "/social",
          color: "#059669",
        },
        {
          icon: MdVideoCall,
          title: "Mes Cours en Ligne",
          desc: "Organiser vos visioconférences",
          path: "/video-call",
          color: "#7c3aed",
        },
      ];
    }
    if (isEleve) {
      return [
        {
          icon: MdLibraryBooks,
          title: "Mes Cours",
          desc: "Accéder aux documents de classe",
          path: "/library",
          color: "#2563eb",
        },
        {
          icon: MdGroup,
          title: "Réseau Social",
          desc: "Voir les actualités et communiquer",
          path: "/social",
          color: "#059669",
        },
        {
          icon: MdVideoCall,
          title: "Cours en Ligne",
          desc: "Rejoindre les visioconférences",
          path: "/video-call",
          color: "#7c3aed",
        },
      ];
    }
    return [];
  };

  const getProfileStats = () => {
    if (isDirecteur) {
      return {
        memberSince: "01/09/2020",
        progress: { profil: 95, pedagogie: 88, administration: 92 },
        administration: {
          etudiants: 247,
          professeurs: 18,
          langues: 6,
          certifications: 189,
        },
        insights: {
          satisfaction: 96,
          retention: 94,
          croissance: 12,
        },
      };
    }
    if (isProfesseur) {
      return {
        memberSince: "15/09/2021",
        progress: { profil: 90, pedagogie: 85, evaluation: 78 },
        teaching: {
          etudiants: 32,
          langues: 2,
          heuresParSemaine: 24,
          certifications: 47,
        },
        insights: {
          satisfaction: 94,
          engagement: 89,
          reussite: 91,
        },
      };
    }
    if (isEleve) {
      return {
        memberSince: "01/09/2023",
        progress: { profil: 75, apprentissage: 68, objectifs: 82 },
        academic: {
          langues: 2,
          niveauCECRL: "B1",
          heuresParSemaine: 8,
          assiduite: 94,
        },
        insights: {
          progression: 92,
          participation: 88,
          amelioration: 15,
        },
      };
    }
    return {};
  };

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: <FiActivity /> },
    { id: "stats", label: "Statistiques", icon: <FiTrendingUp /> },
    { id: "achievements", label: "Réalisations", icon: <FiAward /> },
  ];

  if (!user) {
    return (
      <div className="profile-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h3>Chargement de votre profil...</h3>
          <p>Préparation de votre espace personnel</p>
        </div>
      </div>
    );
  }

  const stats = getProfileStats();
  const roleBadge = getRoleBadge();

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="profile-hero"
        >
          <div className="hero-background">
            <div className="hero-gradient"></div>
            <div className="hero-pattern"></div>
          </div>

          <div className="hero-content">
            <div className="hero-text">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="hero-badge"
              >
                {getRoleIcon()}
                <span>{getRoleTitle()}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="hero-title"
              >
                Votre Profil Personnel
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="hero-subtitle"
              >
                Gérez vos informations et suivez votre progression
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hero-stats"
            >
              <div className="quick-stat">
                <FiEye className="quick-stat-icon" />
                <span className="quick-stat-value">125</span>
                <span className="quick-stat-label">Vues profil</span>
              </div>
              <div className="quick-stat">
                <FiHeart className="quick-stat-icon" />
                <span className="quick-stat-value">
                  {stats.insights?.satisfaction || 95}%
                </span>
                <span className="quick-stat-label">Satisfaction</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="main-profile-card"
        >
          {/* Profile Header */}
          <div className="profile-card-header">
            <div className="profile-header-content">
              <div className="profile-avatar-section">
                <motion.div
                  className="profile-avatar-container"
                  onHoverStart={() => setIsPhotoHovered(true)}
                  onHoverEnd={() => setIsPhotoHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="profile-avatar-main">
                    <img
                      src={getUserPhoto(user)}
                      alt={user.name}
                      className="profile-avatar-image"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "flex";
                      }}
                    />
                    <div
                      className="profile-avatar-fallback"
                      style={{ display: "none" }}
                    >
                      {user.name?.charAt(0) || "?"}
                    </div>

                    <AnimatePresence>
                      {isPhotoHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="avatar-overlay"
                        >
                          <FiEdit3 />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="profile-status-indicator">
                    <div className="status-dot"></div>
                    <span>En ligne</span>
                  </div>
                </motion.div>

                <div className="profile-basic-info">
                  <h2 className="profile-name">{user.name}</h2>
                  <div className={`profile-role-badge ${roleBadge.color}`}>
                    {getRoleIcon()}
                    <span>{roleBadge.text}</span>
                    <MdVerified className="verified-icon" />
                  </div>

                  <div className="profile-meta">
                    <div className="meta-item">
                      <FiMail className="meta-icon" />
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="meta-item">
                        <FiPhone className="meta-icon" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    <div className="meta-item">
                      <FiCalendar className="meta-icon" />
                      <span>Membre depuis {stats.memberSince}</span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(!isEditing)}
                className="edit-profile-button"
              >
                <FiEdit3 />
                <span>Modifier le profil</span>
              </motion.button>
            </div>

            {user.bio && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="profile-bio"
              >
                <p>{user.bio}</p>
              </motion.div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="profile-tabs">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="profile-content">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="tab-content"
                >
                  <div className="overview-grid">
                    {/* Quick Actions Cards */}
                    <div className="quick-actions-section">
                      <h3 className="section-title">
                        <FiTarget />
                        Actions Rapides
                      </h3>
                      <div className="quick-actions-grid">
                        {getQuickActions().map((action, index) => (
                          <motion.div
                            key={action.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                            className="quick-action-card"
                            whileHover={{ y: -4, scale: 1.02 }}
                            onClick={() => navigate(action.path)}
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              className="action-icon-container"
                              style={{ color: action.color }}
                            >
                              <action.icon />
                            </div>
                            <div className="action-content">
                              <h4 className="action-title">{action.title}</h4>
                              <p className="action-description">
                                {action.desc}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Cards */}
                    <div className="progress-section">
                      <h3 className="section-title">
                        <MdTrendingUp />
                        Progression Générale
                      </h3>

                      <div className="progress-cards">
                        {Object.entries(stats.progress || {}).map(
                          ([key, value]) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.5 }}
                              className="progress-card"
                              whileHover={{ y: -4, scale: 1.02 }}
                            >
                              <div className="progress-header">
                                <span className="progress-title">
                                  {key === "profil"
                                    ? "Profil Complété"
                                    : key === "pedagogie"
                                    ? "Pédagogie"
                                    : key === "evaluation"
                                    ? "Évaluation"
                                    : key === "gestion"
                                    ? "Gestion"
                                    : key}
                                </span>
                                <span className="progress-value">{value}%</span>
                              </div>

                              <div className="progress-bar-container">
                                <motion.div
                                  className="progress-bar-fill"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${value}%` }}
                                  transition={{
                                    delay: 0.5,
                                    duration: 1,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>

                              <div className="progress-trend">
                                <FiTrendingUp className="trend-icon positive" />
                                <span>
                                  +{Math.floor(Math.random() * 10 + 1)}% ce mois
                                </span>
                              </div>
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Insights Section */}
                    <div className="insights-section">
                      <h3 className="section-title">
                        <FiTarget />
                        Indicateurs Clés
                      </h3>

                      <div className="insights-grid">
                        {Object.entries(stats.insights || {}).map(
                          ([key, value], index) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: 0.2 + index * 0.1,
                                duration: 0.5,
                              }}
                              className="insight-card"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="insight-icon">
                                {key === "satisfaction" && <FiHeart />}
                                {key === "retention" && <FiShield />}
                                {key === "croissance" && <FiTrendingUp />}
                                {key === "engagement" && <FiActivity />}
                                {key === "reussite" && <FiAward />}
                                {key === "progression" && <FiTrendingUp />}
                                {key === "participation" && <FiUsers />}
                                {key === "amelioration" && <FiTarget />}
                              </div>

                              <div className="insight-content">
                                <span className="insight-value">
                                  {typeof value === "number" && value > 50
                                    ? `${value}%`
                                    : value}
                                </span>
                                <span className="insight-label">
                                  {key === "satisfaction"
                                    ? "Satisfaction"
                                    : key === "retention"
                                    ? "Rétention"
                                    : key === "croissance"
                                    ? "Croissance"
                                    : key === "engagement"
                                    ? "Engagement"
                                    : key === "reussite"
                                    ? "Réussite"
                                    : key === "progression"
                                    ? "Progression"
                                    : key === "participation"
                                    ? "Participation"
                                    : key === "amelioration"
                                    ? "Amélioration"
                                    : key}
                                </span>
                              </div>
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "stats" && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="tab-content"
                >
                  <div className="stats-grid">
                    <div className="admin-overview">
                      <h3 className="section-title">
                        <FiUsers />
                        {isDirecteur
                          ? "Administration"
                          : isProfesseur
                          ? "Enseignement"
                          : "Académique"}
                      </h3>

                      <div className="admin-stats-grid">
                        {isDirecteur && stats.administration && (
                          <>
                            <div className="admin-stat-card">
                              <div className="stat-icon admin">
                                <FiUsers />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.administration.etudiants}
                                </span>
                                <span className="stat-label">Élèves</span>
                              </div>
                            </div>
                            <div className="admin-stat-card">
                              <div className="stat-icon teachers">
                                <FiUser />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.administration.professeurs}
                                </span>
                                <span className="stat-label">Enseignants</span>
                              </div>
                            </div>
                            <div className="admin-stat-card">
                              <div className="stat-icon subjects">
                                <FiBookOpen />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.administration.langues}
                                </span>
                                <span className="stat-label">Langues</span>
                              </div>
                            </div>
                            <div className="admin-stat-card">
                              <div className="stat-icon certifications">
                                <FiAward />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.administration.certifications}
                                </span>
                                <span className="stat-label">
                                  Certifications
                                </span>
                              </div>
                            </div>
                          </>
                        )}

                        {isProfesseur && stats.teaching && (
                          <>
                            <div className="admin-stat-card">
                              <div className="stat-icon classes">
                                <FiBookOpen />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.teaching.etudiants}
                                </span>
                                <span className="stat-label">Étudiants</span>
                              </div>
                            </div>
                            <div className="admin-stat-card">
                              <div className="stat-icon subjects">
                                <FiBookOpen />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.teaching.langues}
                                </span>
                                <span className="stat-label">Langues</span>
                              </div>
                            </div>
                            <div className="admin-stat-card">
                              <div className="stat-icon heuresParSemaine">
                                <FiClock />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.teaching.heuresParSemaine}
                                </span>
                                <span className="stat-label">
                                  Heures par semaine
                                </span>
                              </div>
                            </div>
                            <div className="admin-stat-card">
                              <div className="stat-icon certifications">
                                <FiAward />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.teaching.certifications}
                                </span>
                                <span className="stat-label">
                                  Certifications
                                </span>
                              </div>
                            </div>
                          </>
                        )}

                        {isEleve && stats.academic && (
                          <>
                            <div className="admin-stat-card">
                              <div className="stat-icon langues">
                                <FiBookOpen />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.academic.langues}
                                </span>
                                <span className="stat-label">Langues</span>
                              </div>
                            </div>
                            <div className="admin-stat-card">
                              <div className="stat-icon niveauCECRL">
                                <FiStar />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.academic.niveauCECRL}
                                </span>
                                <span className="stat-label">Niveau CECRL</span>
                              </div>
                            </div>
                            <div className="admin-stat-card">
                              <div className="stat-icon heuresParSemaine">
                                <FiClock />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.academic.heuresParSemaine}
                                </span>
                                <span className="stat-label">
                                  Heures par semaine
                                </span>
                              </div>
                            </div>
                            <div className="admin-stat-card">
                              <div className="stat-icon assiduite">
                                <FiCheck />
                              </div>
                              <div className="stat-content">
                                <span className="stat-number">
                                  {stats.academic.assiduite}
                                </span>
                                <span className="stat-label">Assiduité</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "achievements" && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="tab-content"
                >
                  <div className="achievements-section">
                    <h3 className="section-title">
                      <FiAward />
                      Réalisations & Badges
                    </h3>

                    <div className="achievements-grid">
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="achievement-card earned"
                      >
                        <div className="achievement-icon">
                          <FiStar />
                        </div>
                        <h4>Expert Confirmé</h4>
                        <p>Plus de 2 ans d'expérience</p>
                        <div className="achievement-date">
                          Obtenu le 15 Sept 2021
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="achievement-card earned"
                      >
                        <div className="achievement-icon">
                          <FiHeart />
                        </div>
                        <h4>Très Apprécié</h4>
                        <p>Note de satisfaction > 95%</p>
                        <div className="achievement-date">
                          Obtenu le 20 Jan 2024
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="achievement-card locked"
                      >
                        <div className="achievement-icon">
                          <FiTarget />
                        </div>
                        <h4>Perfectionniste</h4>
                        <p>Compléter tous les objectifs</p>
                        <div className="achievement-progress">
                          Progression: 88%
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Edit Section */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="edit-section"
            >
              <div className="edit-card">
                <div className="edit-header">
                  <h3>
                    <FiSettings />
                    Modifier votre profil
                  </h3>
                  <div className="edit-actions">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveProfile}
                      className="save-button"
                    >
                      <FiCheck />
                      Sauvegarder
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(false)}
                      className="cancel-button"
                    >
                      <FiX />
                      Annuler
                    </motion.button>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="edit-form">
                  <div className="form-section">
                    <h4 className="form-section-title">
                      Informations personnelles
                    </h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">
                          <FiUser />
                          Prénom
                        </label>
                        <input
                          type="text"
                          name="prenom"
                          value={profileData.prenom}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Votre prénom"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <FiUser />
                          Nom
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={profileData.nom}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Votre nom"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <FiMail />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="votre@email.com"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <FiPhone />
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="telephone"
                          value={profileData.telephone}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="+33 1 42 34 56 78"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <FiCalendar />
                          Date de naissance
                        </label>
                        <input
                          type="date"
                          name="dateNaissance"
                          value={profileData.dateNaissance}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <FiMapPin />
                          Adresse
                        </label>
                        <input
                          type="text"
                          name="adresse"
                          value={profileData.adresse}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Votre adresse"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4 className="form-section-title">À propos de vous</h4>
                    <div className="form-group full-width">
                      <label className="form-label">
                        <FiUser />
                        Biographie
                      </label>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        className="form-textarea"
                        placeholder="Parlez-nous de vous, vos passions, vos objectifs..."
                        rows="5"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;
