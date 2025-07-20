/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import {
  IoCheckmarkCircleOutline,
  IoGlobeOutline,
  IoPlayCircleOutline,
  IoRocketOutline,
  IoSchoolOutline,
  IoStarOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const fullText = t("home.hero_title");
  const [typedText, setTypedText] = useState("");
  const [flippedCards, setFlippedCards] = useState([]);
  const lastClickTime = useRef(0);
  const lastClickedIndex = useRef(null);

  // Effet de typing optimisé
  useEffect(() => {
    setTypedText(fullText);
  }, [fullText]);

  const toggleCard = (index) => {
    const now = Date.now();
    if (
      lastClickedIndex.current === index &&
      now - lastClickTime.current < 300
    ) {
      return;
    }
    lastClickTime.current = now;
    lastClickedIndex.current = index;

    setFlippedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const scrollToTestimonials = () => {
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
      const offsetTop = testimonialsSection.offsetTop - 100; // 100px d'offset vers le haut
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const scrollToCourses = () => {
    // Scroll vers la section des cours
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Puis naviguer vers la page cours après un délai
    setTimeout(() => {
      window.location.href = '/courses';
    }, 500);
  };

  const scrollToAbout = () => {
    // Scroll vers la section des cours ou about pour les certifications
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Puis naviguer vers la page à propos après un délai  
    setTimeout(() => {
      window.location.href = '/about';
    }, 500);
  };

  const languages = [
    {
      name: "Français",
      flag: "FR",
      students: "120+",
      level: "Tous niveaux",
      certification: "Certification",
    },
    {
      name: "Anglais", 
      flag: "GB",
      students: "200+",
      level: "Tous niveaux",
      certification: "Certification",
    },
    {
      name: "Espagnol",
      flag: "ES",
      students: "85+",
      level: "Tous niveaux",
      certification: "Certification",
    },
    {
      name: "Allemand",
      flag: "DE",
      students: "65+",
      level: "Tous niveaux",
      certification: "Certification",
    },
  ];

  return (
    <section className="hero">
      {/* Particules simplifiées */}
      <div className="hero-particles">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Décorations flottantes */}
      <div className="floating-elements">
        <motion.div
          className="floating-decoration decoration-1"
          animate={{ y: [-10, 10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <IoGlobeOutline />
        </motion.div>
        <motion.div
          className="floating-decoration decoration-2"
          animate={{ y: [10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <IoRocketOutline />
        </motion.div>
        <motion.div
          className="floating-decoration decoration-3"
          animate={{ y: [-8, 8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <IoStarOutline />
        </motion.div>
      </div>

      <div className="hero-content">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="typed-text">{typedText}</span>
        </motion.h1>

        {/* Section des langues intégrée avec flip */}
        <motion.div 
          className="hero-languages"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {languages.map((language, index) => (
            <motion.div
              key={language.name}
              className="language-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleCard(index);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              style={{ cursor: "pointer" }}
            >
              <AnimatePresence mode="wait">
                {!flippedCards.includes(index) ? (
                  <motion.div
                    key="front"
                    className="language-card-front"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <ReactCountryFlag
                      countryCode={language.flag}
                      svg
                      style={{
                        width: 'calc(100% - 10px)',
                        height: 'calc(100% - 10px)',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    className="language-card-back"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="language-header">
                      <h3>{language.name}</h3>
                      <p 
                        className="student-count"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToTestimonials();
                        }}
                      >
                        {language.students} étudiants
                      </p>
                    </div>
                    <div className="language-features">
                      <div 
                        className="feature-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToCourses();
                        }}
                      >
                        <IoCheckmarkCircleOutline />
                        <span>{language.level}</span>
                      </div>
                      <div 
                        className="feature-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToAbout();
                        }}
                      >
                        <IoCheckmarkCircleOutline />
                        <span>{language.certification}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="hero-description"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("home.hero_desc")}
        </motion.p>

        <motion.div 
          className="hero-buttons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/test" className="btn btn-primary">
            <IoPlayCircleOutline />
            {t("home.cta_test")}
          </Link>
          <Link to="/courses" className="btn btn-secondary">
            <IoSchoolOutline />
            {t("home.cta_courses")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
