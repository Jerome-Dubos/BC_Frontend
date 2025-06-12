import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    closeMobileMenu();
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const getUserPhoto = (user) => {
    // Photos IA générées par utilisateur - URLs plus fiables
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

    // Retourner la photo correspondante ou une photo par défaut
    return (
      photoMap[user.name] ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name
        .toLowerCase()
        .replace(/\s+/g, "-")}&style=professional`
    );
  };

  const getUserNavigationLinks = () => {
    if (!currentUser) return [];

    const commonLinks = [
      { path: "/dashboard", label: "Tableau de bord", icon: "🏠" },
      { path: "/profile", label: "Mon Profil", icon: "👤" },
    ];

    const roleSpecificLinks = {
      director: [
        { path: "/admin", label: "Administration", icon: "⚙️" },
        { path: "/library", label: "Bibliothèque", icon: "📚" },
        { path: "/social", label: "Réseau Social", icon: "👥" },
        { path: "/video-call", label: "Visioconférence", icon: "📹" },
      ],
      teacher: [
        { path: "/library", label: "Mes Documents", icon: "📚" },
        { path: "/social", label: "Réseau Social", icon: "👥" },
        { path: "/video-call", label: "Mes Cours en Ligne", icon: "📹" },
      ],
      student: [
        { path: "/library", label: "Mes Cours", icon: "📚" },
        { path: "/social", label: "Réseau Social", icon: "👥" },
        { path: "/video-call", label: "Cours en Ligne", icon: "📹" },
      ],
    };

    return [...commonLinks, ...(roleSpecificLinks[currentUser.role] || [])];
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

  const publicNavLinks = [
    { path: "/", label: "Accueil" },
    { path: "/about", label: "À propos" },
    { path: "/test", label: "Test" },
  ];

  const navLinksToShow = isAuthenticated
    ? []
    : [...publicNavLinks, { path: "/login", label: "Connexion" }];

  return (
    <motion.nav
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={isAuthenticated ? "/dashboard" : "/"}
        className="navbar-logo"
        onClick={() => handleNavLinkClick(isAuthenticated ? "/dashboard" : "/")}
      >
        Bon Cours
      </Link>

      <button
        className="mobile-menu-button"
        onClick={toggleMobileMenu}
        aria-label="Menu"
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      <motion.div
        className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Liens publics ou navigation non-connectée */}
        {navLinksToShow.map((link) => (
          <motion.div
            key={link.path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={link.path}
              className={`nav-link ${
                location.pathname === link.path ? "active" : ""
              }`}
              onClick={() => handleNavLinkClick(link.path)}
            >
              {link.label}
            </Link>
          </motion.div>
        ))}

        {/* Menu utilisateur connecté */}
        {isAuthenticated && currentUser && (
          <div className="user-menu-container">
            <motion.button
              className="user-menu-button"
              onClick={toggleUserMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={getUserPhoto(currentUser)}
                alt={currentUser.name}
                className="user-avatar"
              />
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">
                  {getRoleLabel(currentUser.role)}
                </span>
              </div>
              <span className="dropdown-arrow">
                {isUserMenuOpen ? "▲" : "▼"}
              </span>
            </motion.button>

            {isUserMenuOpen && (
              <motion.div
                className="user-dropdown"
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", duration: 0.3 }}
              >
                <div className="user-dropdown-header">
                  <img
                    src={getUserPhoto(currentUser)}
                    alt={currentUser.name}
                    className="user-avatar-large"
                  />
                  <div>
                    <div className="user-name-large">{currentUser.name}</div>
                    <div className="user-role-large">
                      {getRoleLabel(currentUser.role)}
                    </div>
                    <div className="user-id">{currentUser.identifiant}</div>
                  </div>
                </div>

                <div className="user-dropdown-divider"></div>

                <div className="user-dropdown-links">
                  {getUserNavigationLinks().map((link) => (
                    <motion.div key={link.path} whileHover={{ x: 8 }}>
                      <Link
                        to={link.path}
                        className={`user-dropdown-link ${
                          location.pathname === link.path ? "active" : ""
                        }`}
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          closeMobileMenu();
                        }}
                      >
                        <span className="link-icon">{link.icon}</span>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="user-dropdown-divider"></div>

                <motion.button
                  className="logout-button"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🚪 Déconnexion
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
