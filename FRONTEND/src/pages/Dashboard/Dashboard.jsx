import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Fonction pour obtenir les badges selon le rôle
  const getBadgesForRole = (role) => {
    if (role === "student") {
      return [
        {
          id: 1,
          name: t("dashboard.badges.student.firstStep"),
          icon: IoStarOutline,
          earned: true,
          color: "#FFD700",
        },
        {
          id: 2,
          name: t("dashboard.badges.student.studious"),
          icon: IoBookOutline,
          earned: true,
          color: "#4CAF50",
        },
        {
          id: 3,
          name: t("dashboard.badges.student.conversational"),
          icon: IoPersonOutline,
          earned: false,
          color: "#2196F3",
        },
        {
          id: 4,
          name: t("dashboard.badges.student.grammarian"),
          icon: IoCreateOutline,
          earned: false,
          color: "#9C27B0",
        },
        {
          id: 5,
          name: t("dashboard.badges.student.expert"),
          icon: IoTrophyOutline,
          earned: false,
          color: "#FF5722",
        },
      ];
    } else if (role === "teacher") {
      return [
        {
          id: 1,
          name: t("dashboard.badges.teacher.mentor"),
          icon: IoSchoolOutline,
          earned: true,
          color: "#FFD700",
        },
        {
          id: 2,
          name: t("dashboard.badges.teacher.inspiring"),
          icon: IoFlashOutline,
          earned: true,
          color: "#4CAF50",
        },
        {
          id: 3,
          name: t("dashboard.badges.teacher.expertTeacher"),
          icon: IoMedalOutline,
          earned: false,
          color: "#2196F3",
        },
      ];
    } else {
      return [
        {
          id: 1,
          name: t("dashboard.badges.director.leader"),
          icon: MdAdminPanelSettings,
          earned: true,
          color: "#FFD700",
        },
        {
          id: 2,
          name: t("dashboard.badges.director.visionary"),
          icon: IoEyeOutline,
          earned: true,
          color: "#4CAF50",
        },
        {
          id: 3,
          name: t("dashboard.badges.director.excellence"),
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
      {
        id: "overview",
        label: t("dashboard.tabs.overview"),
        icon: <MdDashboard />,
      },
    ];

    if (role === "director") {
      // Directrice : accès à tout sauf Progress
      return [
        ...baseTabs,
        {
          id: "users",
          label: t("dashboard.tabs.users"),
          icon: <IoSettingsOutline />,
        },
        {
          id: "schedule",
          label: t("dashboard.tabs.schedule"),
          icon: <IoCalendarOutline />,
        },
        {
          id: "resources",
          label: t("dashboard.tabs.resources"),
          icon: <IoBookOutline />,
        },
        {
          id: "courses",
          label: t("dashboard.tabs.courses.director"),
          icon: <IoSchoolSharp />,
        },
        {
          id: "students",
          label: t("dashboard.tabs.students.director"),
          icon: <IoPeopleOutline />,
        },
      ];
    } else if (role === "teacher") {
      // Professeurs : accès à tout sauf UserManagement et Progress
      return [
        ...baseTabs,
        {
          id: "schedule",
          label: t("dashboard.tabs.schedule"),
          icon: <IoCalendarOutline />,
        },
        {
          id: "resources",
          label: t("dashboard.tabs.resources"),
          icon: <IoBookOutline />,
        },
        {
          id: "courses",
          label: t("dashboard.tabs.courses.teacher"),
          icon: <IoBookOutline />,
        },
        {
          id: "students",
          label: t("dashboard.tabs.students.teacher"),
          icon: <IoPeopleOutline />,
        },
      ];
    } else {
      // Étudiants : Overview, Progress, Resources, Schedule
      return [
        ...baseTabs,
        {
          id: "progress",
          label: t("dashboard.tabs.progress"),
          icon: <IoStatsChartOutline />,
        },
        {
          id: "resources",
          label: t("dashboard.tabs.resources"),
          icon: <IoBookOutline />,
        },
        {
          id: "schedule",
          label: t("dashboard.tabs.schedule"),
          icon: <IoCalendarOutline />,
        },
      ];
    }
  };

  // Fonction pour rendre le contenu selon l'onglet actif
  const renderContent = () => {
    const userRole = user?.role || "student";

    // Vérification des permissions d'accès
    const hasAccess = (tabId) => {
      const allowedTabs = getTabsForRole(userRole).map((tab) => tab.id);
      return allowedTabs.includes(tabId);
    };

    // Si l'utilisateur n'a pas accès à cet onglet, afficher un message d'erreur
    if (!hasAccess(activeTab)) {
      return (
        <div className="dashboard-access-denied">
          <h3>{t("dashboard.accessDenied.title")}</h3>
          <p>{t("dashboard.accessDenied.description")}</p>
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
          <div>{t("dashboard.unauthorizedAccess")}</div>
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
          <div>{t("dashboard.unauthorizedAccess")}</div>
        );

      case "courses":
        if (userRole === "director") {
          return <DirectorCourses />;
        } else if (userRole === "teacher") {
          return <TeacherCourses />;
        }
        return <div>{t("dashboard.unauthorizedAccess")}</div>;

      case "students":
        if (userRole === "director") {
          return <DirectorStudents />;
        } else if (userRole === "teacher") {
          return <TeacherStudents />;
        }
        return <div>{t("dashboard.unauthorizedAccess")}</div>;

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
              {user?.role === "director"
                ? t("dashboard.title.director")
                : user?.role === "teacher"
                ? t("dashboard.title.teacher")
                : t("dashboard.title.student")}
            </h1>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`dashboard-nav-tab ${
                activeTab === tab.id ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="dashboard-tab-icon">{tab.icon}</span>
              <span className="dashboard-tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <main className="dashboard-main">
          <div className="dashboard-welcome-message">
            <p>
              {t("dashboard.welcome", { name: user?.name || "Utilisateur" })}
            </p>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
