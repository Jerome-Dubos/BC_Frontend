/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import useScrollThreshold from "../../hooks/useScrollThreshold";
import "./Navbar.css";

const Navbar = () => {
  const isScrolled = useScrollThreshold(20);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

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
  };

  // Navigation links selon l'état d'authentification
  const getNavLinks = () => {
    const baseLinks = [
      { path: "/", label: t("nav.home"), icon: <IoHomeOutline size={18} /> },
      {
        path: "/about",
        label: t("nav.about"),
        icon: <IoInformationCircleOutline size={18} />,
      },
      {
        path: "/courses",
        label: t("nav.courses"),
        icon: <IoSchoolOutline size={18} />,
      },
      {
        path: "/test",
        label: t("nav.test"),
        icon: <IoFlaskOutline size={18} />,
      },
    ];

    if (user) {
      return [
        ...baseLinks,
        {
          path: "/dashboard",
          label: t("nav.dashboard"),
          icon: <MdDashboard size={18} />,
        },
      ];
    } else {
      return [
        ...baseLinks,
        {
          path: "/login",
          label: t("nav.login"),
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
        <IoSchoolOutline size={24} aria-hidden="true" />
        Bon Cours
      </Link>

      {/* Section droite mobile uniquement - sélecteur langue + bouton menu */}
      <div className="navbar-right">
        {/* Sélecteur de langue mobile */}
        <div className="language-select-container mobile-only">
          <select
            className="language-select"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            aria-label={t("nav.selectLanguage", "Choisir la langue")}
          >
            <option value="fr">🇫🇷 FR</option>
            <option value="en">🇬🇧 EN</option>
          </select>
        </div>

        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <IoCloseOutline size={28} />
          ) : (
            <IoMenuOutline size={28} />
          )}
        </button>
      </div>

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
              aria-label={link.label}
            >
              <span aria-hidden="true">{link.icon}</span>
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
                  ? t("nav.roles.director", "Directrice")
                  : user.role === "teacher"
                  ? t("nav.roles.teacher", "Professeur")
                  : t("nav.roles.student", "Étudiant")}
              </span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <IoLogOutOutline size={16} aria-hidden="true" />
              {t("nav.logout")}
            </button>
          </motion.div>
        )}

        {/* Sélecteur de langue desktop - dans nav-links */}
        <div className="language-select-container desktop-only">
          <select
            className="language-select"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            aria-label={t("nav.selectLanguage", "Choisir la langue")}
          >
            <option value="fr">🇫🇷 FR</option>
            <option value="en">🇬🇧 EN</option>
          </select>
        </div>
      </motion.div>
    </motion.nav>
  );
};

Navbar.propTypes = {
  // Aucune prop directement injectée pour le moment, mais on prépare la structure
};

export default Navbar;
