import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  IoCloseOutline,
  IoFlaskOutline,
  IoHomeOutline,
  IoInformationCircleOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoSchoolOutline,
} from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
    closeMobileMenu();
    setShowUserMenu(false);
  };

  // Navigation links selon l'état d'authentification
  const getNavLinks = () => {
    const baseLinks = [
      { path: "/", label: "Accueil", icon: <IoHomeOutline size={18} /> },
      {
        path: "/about",
        label: "À propos",
        icon: <IoInformationCircleOutline size={18} />,
      },
      { path: "/courses", label: "Cours", icon: <IoSchoolOutline size={18} /> },
      { path: "/test", label: "Test", icon: <IoFlaskOutline size={18} /> },
    ];

    if (user) {
      return [
        ...baseLinks,
        {
          path: "/dashboard",
          label: "Dashboard",
          icon: <MdDashboard size={18} />,
        },
      ];
    } else {
      return [
        ...baseLinks,
        {
          path: "/login",
          label: "Connexion",
          icon: <IoLogInOutline size={18} />,
        },
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <motion.nav
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/"
        className="navbar-logo"
        onClick={() => handleNavLinkClick("/")}
      >
        <IoSchoolOutline size={24} />
        Bon Cours
      </Link>

      <button
        className="mobile-menu-button"
        onClick={toggleMobileMenu}
        aria-label="Menu"
      >
        {isMobileMenuOpen ? (
          <IoCloseOutline size={24} />
        ) : (
          <IoMenuOutline size={24} />
        )}
      </button>

      <motion.div
        className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {navLinks.map((link) => (
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
              {link.icon}
              {link.label}
            </Link>
          </motion.div>
        ))}

        {user && (
          <motion.div
            className="user-menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">
                {user.role === "director"
                  ? "Directrice"
                  : user.role === "teacher"
                  ? "Professeur"
                  : "Étudiant"}
              </span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <IoLogOutOutline size={16} />
              Se déconnecter
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
