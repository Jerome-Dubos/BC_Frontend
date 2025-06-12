import { motion } from "framer-motion";
import React from "react";
import {
  FiArrowLeft,
  FiAward,
  FiCalendar,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUserPlus,
} from "react-icons/fi";
import { MdSchool, MdSupervisorAccount, MdVerified } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./UserProfile.css";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { users } = useAuth();

  const user = users.find((u) => u.id === parseInt(userId));

  if (!user) {
    return (
      <div className="user-profile-page">
        <div className="user-profile-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="not-found-card"
          >
            <div className="not-found-content">
              <div className="not-found-icon">❌</div>
              <h1>Utilisateur non trouvé</h1>
              <p>
                L'utilisateur que vous recherchez n'existe pas ou a été
                supprimé.
              </p>
              <motion.button
                onClick={() => navigate(-1)}
                className="back-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiArrowLeft />
                Retour
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const getRoleLabel = (role) => {
    switch (role) {
      case "director":
        return "Directrice";
      case "teacher":
        return "Professeur";
      case "student":
        return "Apprenant";
      default:
        return role;
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "director":
        return <MdSupervisorAccount />;
      case "teacher":
        return <FiShield />;
      case "student":
        return <MdSchool />;
      default:
        return <FiShield />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "director":
        return "director";
      case "teacher":
        return "teacher";
      case "student":
        return "student";
      default:
        return "default";
    }
  };

  const getUserInitials = (user) => {
    const firstName = user.prenom || user.name?.split(" ")[0] || "";
    const lastName = user.nom || user.name?.split(" ")[1] || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getProfileStats = () => {
    return {
      memberSince: new Date(
        user.dateInscription || "2024-01-01"
      ).toLocaleDateString("fr-FR"),
      status: "Actif",
      rating: 4.8,
      connections: Math.floor(Math.random() * 50) + 10,
    };
  };

  const stats = getProfileStats();

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="profile-hero-header"
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="hero-back-button"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowLeft />
          </motion.button>

          <div className="hero-header-content">
            <h1 className="hero-title">
              Profil de{" "}
              {user.prenom || user.name?.split(" ")[0] || "Utilisateur"}
            </h1>
            <p className="hero-subtitle">
              Découvrez les informations et les réalisations de ce membre
            </p>
          </div>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="user-profile-card"
        >
          {/* Profile Header */}
          <div className="user-profile-header">
            <div className="profile-header-bg">
              <div className="header-gradient"></div>
              <div className="header-pattern"></div>
            </div>

            <div className="profile-header-content">
              <div className="profile-main-section">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="profile-avatar-container"
                >
                  <div className="profile-avatar-wrapper">
                    <div className="profile-avatar-large">
                      {getUserInitials(user)}
                    </div>
                    <div className="avatar-status-indicator">
                      <div className="status-dot-large"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Main Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="profile-main-info"
                >
                  <div className="profile-name-section">
                    <h2 className="profile-display-name">
                      {user.prenom || user.name?.split(" ")[0] || ""}{" "}
                      {user.nom || user.name?.split(" ")[1] || ""}
                    </h2>

                    <div
                      className={`profile-role-badge ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {getRoleIcon(user.role)}
                      <span>{getRoleLabel(user.role)}</span>
                      <MdVerified className="verified-icon" />
                    </div>
                  </div>

                  <div className="profile-contact-grid">
                    <div className="contact-item">
                      <FiMail className="contact-icon" />
                      <span>{user.email}</span>
                    </div>
                    {user.telephone && (
                      <div className="contact-item">
                        <FiPhone className="contact-icon" />
                        <span>{user.telephone}</span>
                      </div>
                    )}
                    {user.adresse && (
                      <div className="contact-item">
                        <FiMapPin className="contact-icon" />
                        <span>{user.adresse}</span>
                      </div>
                    )}
                    <div className="contact-item">
                      <FiCalendar className="contact-icon" />
                      <span>Membre depuis {stats.memberSince}</span>
                    </div>
                  </div>

                  {user.bio && (
                    <div className="profile-bio-section">
                      <p>{user.bio}</p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="quick-stats-section"
              >
                <div className="quick-stat-card">
                  <FiStar className="stat-icon" />
                  <span className="stat-value">{stats.rating}</span>
                  <span className="stat-label">Note</span>
                </div>
                <div className="quick-stat-card">
                  <FiUserPlus className="stat-icon" />
                  <span className="stat-value">{stats.connections}</span>
                  <span className="stat-label">Connexions</span>
                </div>
                <div className="quick-stat-card">
                  <FiAward className="stat-icon" />
                  <span className="stat-value">12</span>
                  <span className="stat-label">Réalisations</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="user-profile-content">
            {/* Information Sections */}
            <div className="info-sections-grid">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="info-section personal-info"
              >
                <div className="section-header">
                  <div className="section-icon personal">
                    <FiShield />
                  </div>
                  <h3 className="section-title">Informations Personnelles</h3>
                </div>

                <div className="info-items-grid">
                  <div className="info-item">
                    <span className="info-label">Date de naissance</span>
                    <span className="info-value">
                      {user.dateNaissance
                        ? new Date(user.dateNaissance).toLocaleDateString(
                            "fr-FR"
                          )
                        : "Non renseignée"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Téléphone</span>
                    <span className="info-value">
                      {user.telephone || "Non renseigné"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Adresse</span>
                    <span className="info-value">
                      {user.adresse || "Non renseignée"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Statut</span>
                    <span className="info-value status-active">
                      <div className="status-indicator"></div>
                      {stats.status}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Academic Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="info-section academic-info"
              >
                <div className="section-header">
                  <div className="section-icon academic">
                    <MdSchool />
                  </div>
                  <h3 className="section-title">Informations Académiques</h3>
                </div>

                <div className="info-items-grid">
                  <div className="info-item">
                    <span className="info-label">Classe</span>
                    <span className="info-value">
                      {user.classe || "Non assignée"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Matières</span>
                    <span className="info-value">
                      {user.matieres?.join(", ") || "Non renseignées"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Niveau</span>
                    <span className="info-value">
                      {user.niveau || "Non renseigné"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Performance</span>
                    <span className="info-value performance">
                      <FiTrendingUp className="performance-icon" />
                      Excellente
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="profile-actions-section"
            >
              <div className="actions-header">
                <h3>Actions</h3>
                <p>
                  Interagir avec{" "}
                  {user.prenom || user.name?.split(" ")[0] || "cet utilisateur"}
                </p>
              </div>

              <div className="action-buttons-grid">
                <motion.button
                  className="action-button primary"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiMessageCircle />
                  <span>Envoyer un message</span>
                </motion.button>

                <motion.button
                  className="action-button secondary"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiPhone />
                  <span>Appeler</span>
                </motion.button>

                <motion.button
                  className="action-button tertiary"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiUserPlus />
                  <span>Ajouter aux contacts</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
