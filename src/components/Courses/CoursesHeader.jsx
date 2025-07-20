import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IoGlobeOutline,
  IoPeopleOutline,
  IoRibbonOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import "./CoursesHeader.css";

const CoursesHeader = () => {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Statistiques dynamiques
  const stats = [
    {
      number: 1200,
      suffix: "+",
      label: t("courses.stats_students"),
      icon: <IoPeopleOutline size={32} />,
    },
    {
      number: 15,
      suffix: "",
      label: t("courses.stats_languages"),
      icon: <IoGlobeOutline size={32} />,
    },
    {
      number: 95,
      suffix: "%",
      label: t("courses.stats_success"),
      icon: <IoTrophyOutline size={32} />,
    },
    {
      number: 8,
      suffix: "",
      label: t("courses.stats_experience"),
      icon: <IoRibbonOutline size={32} />,
    },
  ];

  return (
    <motion.section
      className="courses-hero"
      style={{ y }}
    >
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("courses.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("courses.subtitle")}
        </motion.p>
      </div>

      <motion.div
        className="stats-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.05 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">
              {stat.number}
              {stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default CoursesHeader; 