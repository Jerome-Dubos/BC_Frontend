/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  FaArrowRight,
  FaCertificate,
  FaChalkboardTeacher,
  FaGlobe,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import "./HeroSection.css";

const HeroSection = () => {
  const { t } = useTranslation();
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Détection responsive
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleCardClick = (language) => {
    if (isMobile) {
      // Sur mobile, navigation directe vers les cours
      window.location.href = "/courses";
    } else {
      // Sur desktop, flip de la carte
      setActiveCard(activeCard === language ? null : language);
    }
  };

  const handleBadgeClick = (action, event) => {
    event.stopPropagation();
    setActiveCard(null);

    switch (action) {
      case "students": {
        const testimonialsElement = document.getElementById("testimonials");
        if (testimonialsElement) {
          const offset = 100;
          const elementPosition = testimonialsElement.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
        break;
      }
      case "courses":
        window.location.href = "/courses";
        break;
      case "about":
        window.location.href = "/about";
        break;
      default:
        break;
    }
  };

  const languages = [
    {
      name: t("home.hero_languages.french"),
      flag: "🇫🇷",
      students: "150+",
      level: t("home.hero_levels.all_levels"),
      certification: t("home.hero_certifications.certification"),
      color: "#4CAF50",
      bgColor: "rgba(76, 175, 80, 0.1)",
    },
    {
      name: t("home.hero_languages.english"),
      flag: "🇬🇧",
      students: "200+",
      level: t("home.hero_levels.all_levels"),
      certification: t("home.hero_certifications.certification"),
      color: "#2196F3",
      bgColor: "rgba(33, 150, 243, 0.1)",
    },
    {
      name: t("home.hero_languages.spanish"),
      flag: "🇪🇸",
      students: "120+",
      level: t("home.hero_levels.all_levels"),
      certification: t("home.hero_certifications.certification"),
      color: "#FF9800",
      bgColor: "rgba(255, 152, 0, 0.1)",
    },
    {
      name: t("home.hero_languages.german"),
      flag: "🇩🇪",
      students: "80+",
      level: t("home.hero_levels.all_levels"),
      certification: t("home.hero_certifications.certification"),
      color: "#9C27B0",
      bgColor: "rgba(156, 39, 176, 0.1)",
    },
    {
      name: t("home.hero_languages.turkish"),
      flag: "🇹🇷",
      students: "60+",
      level: t("home.hero_levels.all_levels"),
      certification: t("home.hero_certifications.certification"),
      color: "#E91E63",
      bgColor: "rgba(233, 30, 99, 0.1)",
    },
    {
      name: t("home.hero_languages.arabic"),
      flag: "🇸🇦",
      students: "70+",
      level: t("home.hero_levels.all_levels"),
      certification: t("home.hero_certifications.certification"),
      color: "#795548",
      bgColor: "rgba(121, 85, 72, 0.1)",
    },
    {
      name: t("home.hero_languages.greek"),
      flag: "🇬🇷",
      students: "40+",
      level: t("home.hero_levels.all_levels"),
      certification: t("home.hero_certifications.certification"),
      color: "#607D8B",
      bgColor: "rgba(96, 125, 139, 0.1)",
    },
    {
      name: t("home.hero_languages.school_support"),
      icon: FaChalkboardTeacher,
      students: "300+",
      level: t("home.hero_levels.primary_to_high_school"),
      certification: t("home.hero_certifications.certified_teachers"),
      color: "#E91E63",
      bgColor: "rgba(233, 30, 99, 0.1)",
      iconColor: "#FFFFFF",
    },
  ];

  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.05, y: -5 },
    active: { scale: 1.02, y: -2 },
  };

  const flipVariants = {
    initial: { rotateY: 0 },
    flipped: { rotateY: 180 },
  };

  const backVariants = {
    initial: { rotateY: 180 },
    flipped: { rotateY: 360 },
  };

  // Rendu mobile simplifié
  const renderMobileCard = (lang, index) => (
    <motion.div
      key={lang.name}
      className="mobile-language-card"
      onClick={() => handleCardClick(lang.name)}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="active"
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="mobile-card-content">
        <div className="mobile-flag-container">
          {lang.flag ? (
            <span
              className="mobile-flag-emoji"
              role="img"
              aria-label={`Drapeau ${lang.name}`}
            >
              {lang.flag}
            </span>
          ) : (
            <lang.icon
              className="mobile-flag-icon"
              aria-label={`Icône ${lang.name}`}
              style={{ color: lang.iconColor || "var(--text-light)" }}
            />
          )}
        </div>
        <div className="mobile-card-text">
          <h3>{lang.name}</h3>
          <p className="mobile-card-subtitle">{lang.level}</p>
        </div>
        <div className="mobile-card-arrow">
          <FaArrowRight />
        </div>
      </div>
    </motion.div>
  );

  // Rendu desktop avec animations
  const renderDesktopCard = (lang, index) => (
    <motion.div
      key={lang.name}
      className="flag-card-container"
      onClick={() => handleCardClick(lang.name)}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="active"
      layout
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        layout: { duration: 0.4 },
      }}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flag-card">
        {/* Recto de la carte */}
        <motion.div
          className="flag-card-front"
          variants={flipVariants}
          animate={activeCard === lang.name ? "flipped" : "initial"}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ backgroundColor: lang.bgColor }}
          initial="initial"
        >
          <div className="flag-container">
            {lang.flag ? (
              <span
                className="flag-emoji"
                role="img"
                aria-label={`Drapeau ${lang.name}`}
              >
                {lang.flag}
              </span>
            ) : (
              <lang.icon
                className="flag-icon"
                aria-label={`Icône ${lang.name}`}
                style={{ color: lang.iconColor || "var(--text-light)" }}
              />
            )}
          </div>
          <div className="flag-card-content">
            <h3>{lang.name}</h3>
          </div>
        </motion.div>

        {/* Verso de la carte */}
        <motion.div
          className="flag-card-back"
          variants={backVariants}
          animate={activeCard === lang.name ? "flipped" : "initial"}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ backgroundColor: lang.color }}
          initial="initial"
        >
          <div className="card-back-content">
            <div className="back-info">
              <div className="back-badges">
                <button
                  className="back-badge"
                  onClick={(e) => handleBadgeClick("students", e)}
                  aria-label={`Voir les ${lang.students} ${t(
                    "home.hero_students"
                  )}`}
                >
                  <FaUsers />
                  <span>
                    {lang.students} {t("home.hero_students")}
                  </span>
                </button>
                <button
                  className="back-badge"
                  onClick={(e) => handleBadgeClick("courses", e)}
                  aria-label={`Voir les cours ${lang.level}`}
                >
                  <MdSchool />
                  <span>{lang.level}</span>
                </button>
                <button
                  className="back-badge"
                  onClick={(e) => handleBadgeClick("about", e)}
                  aria-label={`En savoir plus sur ${lang.certification}`}
                >
                  <FaCertificate />
                  <span>{lang.certification}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section className="hero" id="home">
      {/* Particules de fond - seulement sur desktop */}
      {!isMobile && (
        <div className="hero-particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Éléments décoratifs - seulement sur desktop */}
      {!isMobile && (
        <div className="floating-elements">
          <motion.div
            className="floating-decoration decoration-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaGlobe />
          </motion.div>
          <motion.div
            className="floating-decoration decoration-2"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <FaGraduationCap />
          </motion.div>
          <motion.div
            className="floating-decoration decoration-3"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          >
            <MdSchool />
          </motion.div>
        </div>
      )}

      <div className="hero-content">
        <h1>
          {t("home.hero_title")}{" "}
          <span className="typed-text">{t("home.hero_subtitle")}</span>
        </h1>

        {/* Section des cartes de langues */}
        <div className={isMobile ? "mobile-hero-flags" : "hero-flags"}>
          {languages.map((lang, index) =>
            isMobile
              ? renderMobileCard(lang, index)
              : renderDesktopCard(lang, index)
          )}
        </div>

        <p className="hero-description">{t("home.hero_desc")}</p>

        <div className="hero-buttons">
          <button
            className="btn btn-primary"
            onClick={() => (window.location.href = "/test")}
            aria-label={t("home.cta_test")}
          >
            {t("home.cta_test")}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => (window.location.href = "/about")}
            aria-label={t("home.cta_learn_more")}
          >
            {t("home.cta_learn_more")} <AiOutlineQuestionCircle />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
