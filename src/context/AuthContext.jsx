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
    localStorage.removeItem("boncours_user");
    setUser(null);
    navigate("/");
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
    login,
    logout,
    register,
    isAuthenticated: !!user,
    // Helpers pour vérifier les rôles
    isStudent: user?.role === "student",
    isTeacher: user?.role === "teacher",
    isDirector: user?.role === "director",
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#364252",
        }}
      >
        Chargement...
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
