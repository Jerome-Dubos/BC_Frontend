/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoGlobeOutline,
  IoLanguageOutline,
  IoPlayCircleOutline,
  IoRocketOutline,
  IoSchoolOutline,
  IoStarOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const fullText = t("home.hero_title");
  const [typedText, setTypedText] = useState("");

  // Effet de typing (redémarre quand la langue change)
  useEffect(() => {
    let index = 0;
    setTypedText("");
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section className="hero">
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
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

      {/* Décorations flottantes */}
      <div className="floating-elements">
        <motion.div
          className="floating-decoration decoration-1"
          animate={{
            y: [-12, 12, -12],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <IoGlobeOutline size={32} />
        </motion.div>
        <motion.div
          className="floating-decoration decoration-2"
          animate={{
            y: [10, -15, 10],
            rotate: [360, 180, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <IoRocketOutline size={28} />
        </motion.div>
        <motion.div
          className="floating-decoration decoration-3"
          animate={{
            y: [-8, 12, -8],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <IoStarOutline size={24} />
        </motion.div>
        <motion.div
          className="floating-decoration decoration-4"
          animate={{
            y: [5, -10, 5],
            rotate: [0, -90, -180],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <IoSchoolOutline size={26} />
        </motion.div>
        <motion.div
          className="floating-decoration decoration-5"
          animate={{
            y: [-6, 14, -6],
            rotate: [0, 45, 90],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        >
          <IoLanguageOutline size={22} />
        </motion.div>
      </div>

      <motion.div
        className="hero-content"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1>
          <span className="typed-text">{typedText}</span>
          <span className="cursor">|</span>
        </h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {t("home.hero_desc")}
        </motion.p>
        <motion.div
          className="hero-buttons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <Link to="/test" className="btn btn-primary pulse">
            <IoPlayCircleOutline size={20} />
            {t("home.cta_test")}
          </Link>
          <Link to="/courses" className="btn btn-secondary">
            <IoSchoolOutline size={20} />
            {t("home.cta_courses")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
