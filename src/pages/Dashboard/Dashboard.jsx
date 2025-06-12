import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// React Icons
import {
  MdAccessTime,
  MdAdminPanelSettings,
  MdBarChart,
  MdGroup,
  MdLibraryBooks,
  MdNotifications,
  MdPerson,
  MdSwapHoriz,
  MdTrendingUp,
  MdVideoCall,
} from "react-icons/md";

const Dashboard = () => {
  const { currentUser, isDirector, isTeacher, isStudent, switchUser, users } =
    useAuth();
  const [showUserSwitcher, setShowUserSwitcher] = useState(false);

  const handleUserSwitch = (userId) => {
    switchUser(userId);
    setShowUserSwitcher(false);
  };

  const quickActions = {
    director: [
      {
        icon: MdAdminPanelSettings,
        title: "Administration",
        desc: "Gérer les comptes utilisateurs et les paramètres",
        path: "/admin",
        color: "#dc2626",
        bgColor: "linear-gradient(135deg, #fef2f2, #fee2e2)",
        iconBg: "#fef2f2",
      },
      {
        icon: MdLibraryBooks,
        title: "Bibliothèque",
        desc: "Gérer les documents et ressources",
        path: "/library",
        color: "#2563eb",
        bgColor: "linear-gradient(135deg, #eff6ff, #dbeafe)",
        iconBg: "#eff6ff",
      },
      {
        icon: MdGroup,
        title: "Réseau Social",
        desc: "Suivre les activités et interactions",
        path: "/social",
        color: "#059669",
        bgColor: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
        iconBg: "#f0fdf4",
      },
      {
        icon: MdVideoCall,
        title: "Visioconférence",
        desc: "Organiser et planifier des réunions",
        path: "/video-call",
        color: "#7c3aed",
        bgColor: "linear-gradient(135deg, #faf5ff, #f3e8ff)",
        iconBg: "#faf5ff",
      },
    ],
    teacher: [
      {
        icon: MdLibraryBooks,
        title: "Mes Documents",
        desc: "Cours et ressources pédagogiques",
        path: "/library",
        color: "#2563eb",
        bgColor: "linear-gradient(135deg, #eff6ff, #dbeafe)",
        iconBg: "#eff6ff",
      },
      {
        icon: MdGroup,
        title: "Réseau Social",
        desc: "Partager et communiquer avec les élèves",
        path: "/social",
        color: "#059669",
        bgColor: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
        iconBg: "#f0fdf4",
      },
      {
        icon: MdVideoCall,
        title: "Cours en Ligne",
        desc: "Créer et animer des visioconférences",
        path: "/video-call",
        color: "#7c3aed",
        bgColor: "linear-gradient(135deg, #faf5ff, #f3e8ff)",
        iconBg: "#faf5ff",
      },
      {
        icon: MdPerson,
        title: "Mon Profil",
        desc: "Gérer mes informations personnelles",
        path: "/profile",
        color: "#ea580c",
        bgColor: "linear-gradient(135deg, #fff7ed, #fed7aa)",
        iconBg: "#fff7ed",
      },
    ],
    student: [
      {
        icon: MdLibraryBooks,
        title: "Mes Cours",
        desc: "Accéder aux documents de classe",
        path: "/library",
        color: "#2563eb",
        bgColor: "linear-gradient(135deg, #eff6ff, #dbeafe)",
        iconBg: "#eff6ff",
      },
      {
        icon: MdGroup,
        title: "Réseau Social",
        desc: "Voir les actualités et communiquer",
        path: "/social",
        color: "#059669",
        bgColor: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
        iconBg: "#f0fdf4",
      },
      {
        icon: MdVideoCall,
        title: "Cours en Ligne",
        desc: "Rejoindre les visioconférences",
        path: "/video-call",
        color: "#7c3aed",
        bgColor: "linear-gradient(135deg, #faf5ff, #f3e8ff)",
        iconBg: "#faf5ff",
      },
      {
        icon: MdPerson,
        title: "Mon Profil",
        desc: "Consulter mes informations",
        path: "/profile",
        color: "#ea580c",
        bgColor: "linear-gradient(135deg, #fff7ed, #fed7aa)",
        iconBg: "#fff7ed",
      },
    ],
  };

  const getRoleActions = () => {
    if (isDirector) return quickActions.director;
    if (isTeacher) return quickActions.teacher;
    if (isStudent) return quickActions.student;
    return [];
  };

  const getRoleMessage = () => {
    if (isDirector) return "Gérez votre école de langues efficacement";
    if (isTeacher) return "Enseignez les langues avec passion";
    if (isStudent) return "Apprenez de nouvelles langues";
    return "";
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "director":
        return "Directeur";
      case "teacher":
        return "Professeur";
      case "student":
        return "Étudiant";
      default:
        return role;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        padding: "24px",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.05) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                         radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.04) 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* User Switcher */}
        <div
          style={{
            position: "fixed",
            top: "120px",
            right: "24px",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setShowUserSwitcher(!showUserSwitcher)}
            style={{
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9))",
              color: "white",
              padding: "12px 20px",
              borderRadius: "50px",
              border: "none",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              boxShadow:
                "0 8px 32px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              opacity: 0.9,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px) scale(1.02)";
              e.target.style.opacity = "1";
              e.target.style.boxShadow =
                "0 12px 40px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.opacity = "0.9";
              e.target.style.boxShadow =
                "0 8px 32px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            <MdSwapHoriz size={18} />
            DÉMO
          </button>

          {showUserSwitcher && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              style={{
                position: "absolute",
                right: "0",
                top: "calc(100% + 20px)",
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(20px)",
                borderRadius: "20px",
                boxShadow:
                  "0 25px 80px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.15)",
                minWidth: "320px",
                padding: "20px",
                maxHeight: "400px",
                overflowY: "auto",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {users.map((user, index) => (
                <motion.button
                  key={user.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleUserSwitch(user.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "18px",
                    borderRadius: "16px",
                    border: "none",
                    background:
                      currentUser?.id === user.id
                        ? "linear-gradient(135deg, #f59e0b, #d97706)"
                        : "transparent",
                    cursor: "pointer",
                    marginBottom: "10px",
                    color: currentUser?.id === user.id ? "white" : "#1f2937",
                    transition: "all 0.3s ease",
                    boxShadow:
                      currentUser?.id === user.id
                        ? "0 8px 25px rgba(245, 158, 11, 0.3)"
                        : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (currentUser?.id !== user.id) {
                      e.target.style.background = "rgba(59, 130, 246, 0.1)";
                      e.target.style.transform = "translateX(8px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentUser?.id !== user.id) {
                      e.target.style.background = "transparent";
                      e.target.style.transform = "translateX(0)";
                    }
                  }}
                >
                  <div
                    style={{
                      fontWeight: "700",
                      marginBottom: "8px",
                      fontSize: "17px",
                    }}
                  >
                    {user.name}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      opacity: 0.9,
                      fontWeight: "500",
                    }}
                  >
                    {getRoleLabel(user.role)} • {user.identifiant}
                  </div>
                  {user.subject && (
                    <div
                      style={{
                        fontSize: "12px",
                        opacity: 0.7,
                        marginTop: "6px",
                        fontStyle: "italic",
                      }}
                    >
                      {user.subject}
                    </div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            textAlign: "center",
            marginBottom: "80px",
            paddingTop: "80px",
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "900",
              background: "linear-gradient(135deg, #ffffff, #cbd5e1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "20px",
              textShadow: "0 8px 32px rgba(0,0,0,0.3)",
              letterSpacing: "-0.02em",
            }}
          >
            👋 Bonjour {currentUser?.name} !
          </h1>
          <p
            style={{
              fontSize: "1.4rem",
              color: "#cbd5e1",
              marginBottom: "40px",
              fontWeight: "400",
              opacity: 0.9,
            }}
          >
            {getRoleMessage()}
          </p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "16px 32px",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              color: "#1f2937",
              borderRadius: "50px",
              fontWeight: "700",
              boxShadow:
                "0 12px 48px rgba(0,0,0,0.15), 0 4px 16px rgba(255,255,255,0.1) inset",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              fontSize: "16px",
            }}
          >
            <span style={{ fontSize: "1.4rem", marginRight: "12px" }}>
              {isDirector ? "👩‍💼" : isTeacher ? "👨‍🏫" : "👨‍🎓"}
            </span>
            {getRoleLabel(currentUser?.role)}
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            marginBottom: "80px",
            padding: "0 16px",
          }}
        >
          {getRoleActions().map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
                whileHover={{ y: -16, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={action.path}
                  style={{
                    display: "block",
                    background: "rgba(255, 255, 255, 0.98)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "28px",
                    padding: "40px",
                    textDecoration: "none",
                    color: "#1f2937",
                    textAlign: "center",
                    boxShadow:
                      "0 16px 64px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 32px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 16px 64px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)";
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.98)";
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "5px",
                      background: action.bgColor,
                    }}
                  />

                  {/* Icon container */}
                  <motion.div
                    style={{
                      width: "100px",
                      height: "100px",
                      background: action.bgColor,
                      borderRadius: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 32px auto",
                      border: `3px solid ${action.color}20`,
                      position: "relative",
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent size={44} color={action.color} />
                  </motion.div>

                  <h3
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "800",
                      marginBottom: "16px",
                      color: "#111827",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {action.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "1.05rem",
                      color: "#6b7280",
                      lineHeight: "1.6",
                      margin: "0",
                      fontWeight: "500",
                    }}
                  >
                    {action.desc}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            borderRadius: "32px",
            padding: "48px",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            margin: "0 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <motion.div
              style={{
                width: "64px",
                height: "64px",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "20px",
                boxShadow: "0 12px 32px rgba(245, 158, 11, 0.3)",
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MdBarChart size={28} color="white" />
            </motion.div>
            <div>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "#111827",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Activité récente
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#6b7280",
                  margin: "4px 0 0 0",
                  fontWeight: "500",
                }}
              >
                Suivi en temps réel de vos activités
              </p>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {isDirector && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "28px",
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    borderRadius: "20px",
                    border: "2px solid #bbf7d0",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "6px",
                      background: "linear-gradient(180deg, #22c55e, #16a34a)",
                    }}
                  />
                  <div style={{ paddingLeft: "20px" }}>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#065f46",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <MdTrendingUp size={20} />3 nouveaux comptes créés
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#047857",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MdAccessTime size={16} />
                      Cette semaine
                    </div>
                  </div>
                  <motion.span
                    style={{
                      padding: "12px 20px",
                      borderRadius: "16px",
                      fontSize: "1rem",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      color: "white",
                      boxShadow: "0 8px 24px rgba(34, 197, 94, 0.3)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +3
                  </motion.span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "28px",
                    background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                    borderRadius: "20px",
                    border: "2px solid #93c5fd",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "6px",
                      background: "linear-gradient(180deg, #3b82f6, #2563eb)",
                    }}
                  />
                  <div style={{ paddingLeft: "20px" }}>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#1e40af",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <MdVideoCall size={20} />8 visioconférences organisées
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#1d4ed8",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MdAccessTime size={16} />
                      Cette semaine
                    </div>
                  </div>
                  <motion.span
                    style={{
                      padding: "12px 20px",
                      borderRadius: "16px",
                      fontSize: "1rem",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                      color: "white",
                      boxShadow: "0 8px 24px rgba(59, 130, 246, 0.3)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +8
                  </motion.span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "28px",
                    background: "linear-gradient(135deg, #faf5ff, #f3e8ff)",
                    borderRadius: "20px",
                    border: "2px solid #c4b5fd",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "6px",
                      background: "linear-gradient(180deg, #8b5cf6, #7c3aed)",
                    }}
                  />
                  <div style={{ paddingLeft: "20px" }}>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#7c3aed",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <MdLibraryBooks size={20} />
                      12 nouveaux documents uploadés
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#8b5cf6",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MdAccessTime size={16} />
                      Ce mois-ci
                    </div>
                  </div>
                  <motion.span
                    style={{
                      padding: "12px 20px",
                      borderRadius: "16px",
                      fontSize: "1rem",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                      color: "white",
                      boxShadow: "0 8px 24px rgba(139, 92, 246, 0.3)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +12
                  </motion.span>
                </motion.div>
              </>
            )}

            {isTeacher && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "28px",
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    borderRadius: "20px",
                    border: "2px solid #bbf7d0",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "6px",
                      background: "linear-gradient(180deg, #22c55e, #16a34a)",
                    }}
                  />
                  <div style={{ paddingLeft: "20px" }}>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#065f46",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <MdLibraryBooks size={20} />5 documents partagés
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#047857",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MdAccessTime size={16} />
                      Cette semaine
                    </div>
                  </div>
                  <motion.span
                    style={{
                      padding: "12px 20px",
                      borderRadius: "16px",
                      fontSize: "1rem",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      color: "white",
                      boxShadow: "0 8px 24px rgba(34, 197, 94, 0.3)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +5
                  </motion.span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "28px",
                    background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                    borderRadius: "20px",
                    border: "2px solid #93c5fd",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "6px",
                      background: "linear-gradient(180deg, #3b82f6, #2563eb)",
                    }}
                  />
                  <div style={{ paddingLeft: "20px" }}>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#1e40af",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <MdGroup size={20} />
                      23 élèves connectés
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#1d4ed8",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MdAccessTime size={16} />
                      Aujourd'hui
                    </div>
                  </div>
                  <motion.span
                    style={{
                      padding: "12px 20px",
                      borderRadius: "16px",
                      fontSize: "1rem",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                      color: "white",
                      boxShadow: "0 8px 24px rgba(59, 130, 246, 0.3)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    23
                  </motion.span>
                </motion.div>
              </>
            )}

            {isStudent && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "28px",
                    background: "linear-gradient(135deg, #faf5ff, #f3e8ff)",
                    borderRadius: "20px",
                    border: "2px solid #c4b5fd",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "6px",
                      background: "linear-gradient(180deg, #8b5cf6, #7c3aed)",
                    }}
                  />
                  <div style={{ paddingLeft: "20px" }}>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#7c3aed",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <MdNotifications size={20} />3 nouveaux cours disponibles
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#8b5cf6",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MdLibraryBooks size={16} />
                      Mathématiques
                    </div>
                  </div>
                  <motion.span
                    style={{
                      padding: "12px 20px",
                      borderRadius: "16px",
                      fontSize: "1rem",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                      color: "white",
                      boxShadow: "0 8px 24px rgba(139, 92, 246, 0.3)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Nouveau
                  </motion.span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "28px",
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    borderRadius: "20px",
                    border: "2px solid #bbf7d0",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "6px",
                      background: "linear-gradient(180deg, #22c55e, #16a34a)",
                    }}
                  />
                  <div style={{ paddingLeft: "20px" }}>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#065f46",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <MdTrendingUp size={20} />
                      Devoir rendu
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#047857",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MdLibraryBooks size={16} />
                      Français - Rédaction
                    </div>
                  </div>
                  <motion.span
                    style={{
                      padding: "12px 20px",
                      borderRadius: "16px",
                      fontSize: "1.4rem",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      color: "white",
                      boxShadow: "0 8px 24px rgba(34, 197, 94, 0.3)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✓
                  </motion.span>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
