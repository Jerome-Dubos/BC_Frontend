import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Données fictives pour la démo - École de Langues
const mockUsers = [
  // Directeur
  {
    id: 1,
    identifiant: "DIR001",
    name: "Marie Dubois",
    email: "marie.dubois@lecole.fr",
    password: "directeur123",
    role: "director",
    phone: "+33 1 42 34 56 78",
    bio: "Directrice de l'École Internationale de Langues, passionnée par l'apprentissage multiculturel.",
    dateCreation: "2020-09-01",
    specialty: "Administration & Pédagogie",
  },

  // Professeurs de langues
  {
    id: 2,
    identifiant: "PROF001",
    name: "Jean Martin",
    email: "jean.martin@lecole.fr",
    password: "teacher123",
    role: "teacher",
    phone: "+33 1 42 34 56 79",
    bio: "Professeur d'anglais natif, spécialisé en anglais des affaires et préparation TOEFL.",
    dateCreation: "2021-08-15",
    subject: "Anglais",
    specialty: "Business English & Certifications",
    experience: "8 ans",
  },
  {
    id: 3,
    identifiant: "PROF002",
    name: "Sophie Leroy",
    email: "sophie.leroy@lecole.fr",
    password: "teacher123",
    role: "teacher",
    phone: "+33 1 42 34 56 80",
    bio: "Professeure d'espagnol diplômée de l'Universidad de Salamanca.",
    dateCreation: "2020-08-20",
    subject: "Espagnol",
    specialty: "Culture Hispanique & DELE",
    experience: "10 ans",
  },
  {
    id: 4,
    identifiant: "PROF003",
    name: "Marco Rossi",
    email: "marco.rossi@lecole.fr",
    password: "teacher123",
    role: "teacher",
    phone: "+33 1 42 34 56 81",
    bio: "Professeur d'italien natif de Rome, expert en culture et littérature italiennes.",
    dateCreation: "2022-01-10",
    subject: "Italien",
    specialty: "Culture & Littérature",
    experience: "5 ans",
  },

  // Étudiants par niveaux de langues
  {
    id: 5,
    identifiant: "ETU001",
    name: "Lucas Petit",
    email: "lucas.petit@lecole.fr",
    password: "student123",
    role: "student",
    bio: "Étudiant passionné par les langues, souhaite travailler dans le commerce international.",
    dateCreation: "2023-09-01",
    birthDate: "2005-03-15",
    class: "Anglais Avancé B2",
    mainLanguage: "Anglais",
    secondaryLanguage: "Espagnol",
    level: "B2",
    objectives: "Préparation TOEFL + Stage à l'étranger",
  },
  {
    id: 6,
    identifiant: "ETU002",
    name: "Emma Garcia",
    email: "emma.garcia@lecole.fr",
    password: "student123",
    role: "student",
    bio: "Étudiante en langues, future traductrice, aime découvrir de nouvelles cultures.",
    dateCreation: "2023-09-01",
    birthDate: "2004-07-22",
    class: "Espagnol Intermédiaire B1",
    mainLanguage: "Espagnol",
    secondaryLanguage: "Italien",
    level: "B1",
    objectives: "Certification DELE + Échange Erasmus",
  },
  {
    id: 7,
    identifiant: "ETU003",
    name: "Thomas Dubois",
    email: "thomas.dubois@lecole.fr",
    password: "student123",
    role: "student",
    bio: "Étudiant débutant en italien, passionné par la culture méditerranéenne.",
    dateCreation: "2023-10-01",
    birthDate: "2006-01-10",
    class: "Italien Débutant A1",
    mainLanguage: "Italien",
    secondaryLanguage: "Anglais",
    level: "A1",
    objectives: "Bases solides + Voyage en Italie",
  },
  {
    id: 8,
    identifiant: "ETU004",
    name: "Léa Martin",
    email: "lea.martin@lecole.fr",
    password: "student123",
    role: "student",
    bio: "Étudiante trilingue, prépare un master en relations internationales.",
    dateCreation: "2023-09-15",
    birthDate: "2003-11-08",
    class: "Anglais Expert C1",
    mainLanguage: "Anglais",
    secondaryLanguage: "Espagnol",
    level: "C1",
    objectives: "Certification IELTS + Cambridge Advanced",
  },
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(mockUsers);

  // Simulation de la connexion automatique pour la démo
  useEffect(() => {
    // Pour la démo, on connecte automatiquement le directeur
    const director = users.find((u) => u.role === "director");
    if (director) {
      setCurrentUser(director);
      setIsAuthenticated(true);
    }
  }, []);

  // Fonction de connexion avec email OU identifiant
  const login = (emailOrId, password) => {
    const user = users.find(
      (u) =>
        (u.email === emailOrId || u.identifiant === emailOrId) &&
        u.password === password
    );

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { success: true, user };
    }

    return { success: false, error: "Identifiants incorrects" };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  // Pour les démonstrations - changement rapide d'utilisateur
  const switchUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  };

  // Génération automatique d'identifiant pour nouveaux utilisateurs
  const generateIdentifier = (role) => {
    const rolePrefix = {
      director: "DIR",
      teacher: "PROF",
      student: "ETU",
    };

    const existingIds = users
      .filter((u) => u.role === role)
      .map((u) => u.identifiant)
      .filter((id) => id.startsWith(rolePrefix[role]));

    const nextNumber = existingIds.length + 1;
    return `${rolePrefix[role]}${nextNumber.toString().padStart(3, "0")}`;
  };

  // Génération automatique de mot de passe sécurisé
  const generateSecurePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const createUser = (userData) => {
    const newUser = {
      ...userData,
      id: users.length + 1,
      identifiant: generateIdentifier(userData.role),
      password: generateSecurePassword(),
      email: `${userData.name.toLowerCase().replace(" ", ".")}@lecole.fr`,
      dateCreation: new Date().toISOString().split("T")[0],
    };

    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const getAllUsers = () => users;

  const getUsersByRole = (role) => {
    return users.filter((user) => user.role === role);
  };

  // Classes disponibles pour l'école de langues
  const getAvailableClasses = () => [
    // Anglais
    "Anglais Débutant A1",
    "Anglais Élémentaire A2",
    "Anglais Intermédiaire B1",
    "Anglais Avancé B2",
    "Anglais Expert C1",
    "Anglais Maître C2",

    // Espagnol
    "Espagnol Débutant A1",
    "Espagnol Élémentaire A2",
    "Espagnol Intermédiaire B1",
    "Espagnol Avancé B2",
    "Espagnol Expert C1",

    // Italien
    "Italien Débutant A1",
    "Italien Élémentaire A2",
    "Italien Intermédiaire B1",
    "Italien Avancé B2",

    // Allemand
    "Allemand Débutant A1",
    "Allemand Élémentaire A2",
    "Allemand Intermédiaire B1",

    // Français (pour étrangers)
    "Français Langue Étrangère A1",
    "Français Langue Étrangère A2",
    "Français Langue Étrangère B1",
    "Français Langue Étrangère B2",
  ];

  const value = {
    currentUser,
    isAuthenticated,
    users,
    login,
    logout,
    switchUser,
    createUser,
    getUsersByRole,
    getAllUsers,
    getAvailableClasses,
    generateIdentifier,
    generateSecurePassword,

    // Helpers pour les rôles
    isDirector: currentUser?.role === "director",
    isTeacher: currentUser?.role === "teacher",
    isStudent: currentUser?.role === "student",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
