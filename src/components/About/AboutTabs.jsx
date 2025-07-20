import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoFlashOutline,
  IoPeopleOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import "./AboutTabs.css";

const AboutTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("history");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -6,
      scale: 1.03,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.3 }
    }
  };

  const tabs = [
    { id: "history", label: t("about.tab_history", "Notre histoire"), icon: "📚" },
    { id: "approach", label: t("about.tab_approach", "Notre approche"), icon: "🎯" },
    { id: "team", label: t("about.tab_team", "Notre équipe"), icon: "👥" }
  ];

  return (
    <section className="about-tabs-section">
      {/* Navigation des onglets */}
      <motion.div 
        className="tabs-navigation"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Contenu des onglets */}
      <motion.div className="tab-content">
        <AnimatePresence mode="wait">
          {activeTab === "history" && (
            <motion.div
              key="history"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="tab-panel"
            >
              <motion.h2 className="tab-title">
                {t("about.history_title")}
              </motion.h2>
              <motion.p className="tab-description">
                {t("about.history_desc")}
              </motion.p>
            </motion.div>
          )}

          {activeTab === "approach" && (
            <motion.div
              key="approach"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="tab-panel"
            >
              <motion.h2 className="tab-title">
                {t("about.approach_title")}
              </motion.h2>
              <motion.div
                className="about-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="about-card"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="card-icon">
                    <IoFlashOutline />
                  </div>
                  <h3>{t("about.approach_innovation_title")}</h3>
                  <p>{t("about.approach_innovation_desc")}</p>
                </motion.div>
                <motion.div
                  className="about-card"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="card-icon">
                    <IoTrophyOutline />
                  </div>
                  <h3>{t("about.approach_excellence_title")}</h3>
                  <p>{t("about.approach_excellence_desc")}</p>
                </motion.div>
                <motion.div
                  className="about-card"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="card-icon">
                    <IoPeopleOutline />
                  </div>
                  <h3>{t("about.approach_community_title")}</h3>
                  <p>{t("about.approach_community_desc")}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div
              key="team"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="tab-panel"
            >
              <motion.h2 className="tab-title">
                {t("about.team_title")}
              </motion.h2>
              {/* Contenu de l'équipe sera ajouté ici */}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default AboutTabs; 