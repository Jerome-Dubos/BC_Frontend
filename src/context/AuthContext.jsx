import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

// Utilisateurs de démo avec différents rôles
const DEMO_USERS = [
  {
    id: 1,
    identifier: "directrice",
    password: "demo",
    name: "Shirin Hosseini",
    role: "director",
    email: "shirin@boncours.fr",
  },
  {
    id: 2,
    identifier: "prof",
    password: "demo",
    name: "Marie Dubois",
    role: "teacher",
    email: "marie@boncours.fr",
  },
  {
    id: 3,
    identifier: "etudiant",
    password: "demo",
    name: "Pierre Martin",
    role: "student",
    email: "pierre@boncours.fr",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem("boncours_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("boncours_user");
      }
    }
    setLoading(false);
  }, []);

  // Fonction de connexion pour la démo
  const login = async (identifier, password) => {
    setLoading(true);

    // Simuler un délai réseau réaliste
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      // Mode démo : accepter n'importe quel identifiant/mot de passe
      // Mais proposer des comptes prédéfinis pour tester les rôles
      let userData;

      // Vérifier si c'est un compte de démo prédéfini
      const demoUser = DEMO_USERS.find(
        (user) =>
          user.identifier.toLowerCase() === identifier.toLowerCase() ||
          user.email.toLowerCase() === identifier.toLowerCase()
      );

      if (demoUser) {
        userData = { ...demoUser };
      } else {
        // Pour tout autre identifiant, créer un utilisateur étudiant par défaut
        userData = {
          id: Date.now(),
          identifier: identifier,
          name: identifier.includes("@")
            ? identifier.split("@")[0]
            : identifier,
          role: "student",
          email: identifier.includes("@")
            ? identifier
            : `${identifier}@demo.com`,
        };
      }

      // Stocker les données utilisateur
      localStorage.setItem("boncours_user", JSON.stringify(userData));
      setUser(userData);
      setLoading(false);

      return { success: true, user: userData };
    } catch (error) {
      setLoading(false);
      throw new Error("Erreur de connexion");
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    console.log("🔄 Début de la déconnexion...");
    setIsLoggingOut(true);

    // Délai plus long pour une transition complètement fluide
    setTimeout(() => {
      localStorage.removeItem("boncours_user");
      setUser(null);

      // Délai supplémentaire avant navigation pour éviter tout flash
      setTimeout(() => {
        console.log("✅ Redirection vers l'accueil");

        // Option 1: Navigation React Router (plus fluide)
        navigate("/");

        // Option 2: Si le flash persiste, décommenter la ligne suivante pour forcer un rechargement
        // window.location.href = "/";

        // Reset de l'état après navigation
        setTimeout(() => {
          setIsLoggingOut(false);
        }, 100);
      }, 200);
    }, 150);
  };

  // Fonction d'inscription simulée (pour extension future)
  const register = async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      identifier: userData.email,
      role: "student",
    };

    localStorage.setItem("boncours_user", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const value = {
    user,
    loading,
    isLoggingOut,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    // Helpers pour vérifier les rôles
    isStudent: user?.role === "student",
    isTeacher: user?.role === "teacher",
    isDirector: user?.role === "director",
  };

  if (loading || isLoggingOut) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#ffffff",
          background:
            "linear-gradient(135deg, var(--primary-blue-dark) 0%, var(--primary-blue) 100%)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid rgba(255, 255, 255, 0.3)",
            borderTop: "4px solid #ffffff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "20px",
          }}
        />
        <div style={{ fontSize: "16px", opacity: 0.9 }}>
          {isLoggingOut ? "Déconnexion en cours..." : "Chargement..."}
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
