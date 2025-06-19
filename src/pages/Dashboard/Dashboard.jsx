import { useState } from "react";
import {
  IoBookOutline,
  IoCalendarOutline,
  IoCreateOutline,
  IoEyeOutline,
  IoFlashOutline,
  IoMedalOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoRibbonOutline,
  IoSchoolOutline,
  IoSchoolSharp,
  IoSettingsOutline,
  IoStarOutline,
  IoStatsChartOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";

// Import des composants
import DirectorCourses from "../../components/Dashboard/DirectorCourses/DirectorCourses";
import DirectorStudents from "../../components/Dashboard/DirectorStudents/DirectorStudents";
import Overview from "../../components/Dashboard/Overview/Overview";
import Progress from "../../components/Dashboard/Progress/Progress";
import Resources from "../../components/Dashboard/Ressources/Resources";
import Schedule from "../../components/Dashboard/Schedule/Schedule";
import TeacherCourses from "../../components/Dashboard/TeacherCourses/TeacherCourses";
import TeacherStudents from "../../components/Dashboard/TeacherStudents/TeacherStudents";
import UserManagement from "../../components/Dashboard/UserManagement/UserManagement";

import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Fonction pour obtenir les badges selon le rôle
  const getBadgesForRole = (role) => {
    if (role === "student") {
      return [
        {
          id: 1,
          name: "Premier pas",
          icon: IoStarOutline,
          earned: true,
          color: "#FFD700",
        },
        {
          id: 2,
          name: "Studieux",
          icon: IoBookOutline,
          earned: true,
          color: "#4CAF50",
        },
        {
          id: 3,
          name: "Conversationnel",
          icon: IoPersonOutline,
          earned: false,
          color: "#2196F3",
        },
        {
          id: 4,
          name: "Grammairien",
          icon: IoCreateOutline,
          earned: false,
          color: "#9C27B0",
        },
        {
          id: 5,
          name: "Expert",
          icon: IoTrophyOutline,
          earned: false,
          color: "#FF5722",
        },
      ];
    } else if (role === "teacher") {
      return [
        {
          id: 1,
          name: "Mentor",
          icon: IoSchoolOutline,
          earned: true,
          color: "#FFD700",
        },
        {
          id: 2,
          name: "Inspirant",
          icon: IoFlashOutline,
          earned: true,
          color: "#4CAF50",
        },
        {
          id: 3,
          name: "Expert pédagogue",
          icon: IoMedalOutline,
          earned: false,
          color: "#2196F3",
        },
      ];
    } else {
      return [
        {
          id: 1,
          name: "Leader",
          icon: MdAdminPanelSettings,
          earned: true,
          color: "#FFD700",
        },
        {
          id: 2,
          name: "Visionnaire",
          icon: IoEyeOutline,
          earned: true,
          color: "#4CAF50",
        },
        {
          id: 3,
          name: "Excellence",
          icon: IoRibbonOutline,
          earned: false,
          color: "#2196F3",
        },
      ];
    }
  };

  // Définir les onglets disponibles selon le rôle
  const getTabsForRole = (role) => {
    const baseTabs = [
      { id: "overview", label: "Vue d'ensemble", icon: <MdDashboard /> },
    ];

    if (role === "director") {
      // Directrice : accès à tout sauf Progress
      return [
        ...baseTabs,
        {
          id: "users",
          label: "Gestion utilisateurs",
          icon: <IoSettingsOutline />,
        },
        { id: "schedule", label: "Planning", icon: <IoCalendarOutline /> },
        { id: "resources", label: "Ressources", icon: <IoBookOutline /> },
        { id: "courses", label: "Tous les cours", icon: <IoSchoolSharp /> },
        {
          id: "students",
          label: "Tous les étudiants",
          icon: <IoPeopleOutline />,
        },
      ];
    } else if (role === "teacher") {
      // Professeurs : accès à tout sauf UserManagement et Progress
      return [
        ...baseTabs,
        { id: "schedule", label: "Planning", icon: <IoCalendarOutline /> },
        { id: "resources", label: "Ressources", icon: <IoBookOutline /> },
        { id: "courses", label: "Mes cours", icon: <IoBookOutline /> },
        { id: "students", label: "Mes étudiants", icon: <IoPeopleOutline /> },
      ];
    } else {
      // Étudiants : Overview, Progress, Resources, Schedule
      return [
        ...baseTabs,
        {
          id: "progress",
          label: "Ma progression",
          icon: <IoStatsChartOutline />,
        },
        { id: "resources", label: "Ressources", icon: <IoBookOutline /> },
        { id: "schedule", label: "Planning", icon: <IoCalendarOutline /> },
      ];
    }
  };

  // Fonction pour rendre le contenu selon l'onglet actif
  const renderContent = () => {
    const userRole = user?.role || "student";
    console.log("UserRole:", userRole, "ActiveTab:", activeTab); // Debug

    // Vérification des permissions d'accès
    const hasAccess = (tabId) => {
      const allowedTabs = getTabsForRole(userRole).map((tab) => tab.id);
      return allowedTabs.includes(tabId);
    };

    // Si l'utilisateur n'a pas accès à cet onglet, afficher un message d'erreur
    if (!hasAccess(activeTab)) {
      return (
        <div className="access-denied">
          <h3>❌ Accès non autorisé</h3>
          <p>
            Vous n'avez pas les permissions nécessaires pour accéder à cette
            section.
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case "overview":
        return <Overview user={user} getBadgesForRole={getBadgesForRole} />;

      case "progress":
        // Uniquement pour les étudiants
        return userRole === "student" ? (
          <Progress user={user} getBadgesForRole={getBadgesForRole} />
        ) : (
          <div>Accès non autorisé</div>
        );

      case "resources":
        return <Resources />;

      case "schedule":
        return <Schedule />;

      case "users":
        // Uniquement pour la directrice
        return userRole === "director" ? (
          <UserManagement />
        ) : (
          <div>Accès non autorisé</div>
        );

      case "courses":
        console.log("Rendering courses for:", userRole); // Debug
        if (userRole === "director") {
          console.log("Rendering DirectorCourses"); // Debug
          return <DirectorCourses />;
        } else if (userRole === "teacher") {
          return <TeacherCourses />;
        }
        return <div>Accès non autorisé</div>;

      case "students":
        console.log("Rendering students for:", userRole); // Debug
        if (userRole === "director") {
          console.log("Rendering DirectorStudents"); // Debug
          return <DirectorStudents />;
        } else if (userRole === "teacher") {
          return <TeacherStudents />;
        }
        return <div>Accès non autorisé</div>;

      default:
        return <Overview user={user} getBadgesForRole={getBadgesForRole} />;
    }
  };

  const tabs = getTabsForRole(user?.role || "student");

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1>
              Espace{" "}
              {user?.role === "director"
                ? "Direction"
                : user?.role === "teacher"
                ? "Professeur"
                : "Étudiant"}
            </h1>
            <p>Bienvenue, {user?.name || "Utilisateur"} !</p>
          </div>
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
    </div>
  );
};

export default Dashboard;
