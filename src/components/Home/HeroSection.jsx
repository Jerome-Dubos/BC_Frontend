/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoGlobeOutline,
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

  // Effet de typing optimisé
  useEffect(() => {
    setTypedText(fullText);
  }, [fullText]);

  return (
    <section className="hero">
      {/* Réduction du nombre de particules et simplification des animations */}
      <div className="hero-particles">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${i * 12.5}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Réduction des décorations flottantes et simplification des animations */}
      <div className="floating-elements">
        <motion.div
          className="floating-decoration decoration-1"
          animate={{
            y: [-8, 8],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <IoGlobeOutline size={32} />
        </motion.div>
        <motion.div
          className="floating-decoration decoration-2"
          animate={{
            y: [8, -8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <IoRocketOutline size={28} />
        </motion.div>
        <motion.div
          className="floating-decoration decoration-3"
          animate={{
            y: [-8, 8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <IoStarOutline size={24} />
        </motion.div>
      </div>

      <div className="hero-content">
        <h1>
          <span className="typed-text">{typedText}</span>
        </h1>
        <p>{t("home.hero_desc")}</p>
        <div className="hero-buttons">
          <Link to="/test" className="btn btn-primary">
            <IoPlayCircleOutline size={20} />
            {t("home.cta_test")}
          </Link>
          <Link to="/courses" className="btn btn-secondary">
            <IoSchoolOutline size={20} />
            {t("home.cta_courses")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
