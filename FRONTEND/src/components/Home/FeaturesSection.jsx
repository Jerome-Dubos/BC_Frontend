import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IoArrowForward,
  IoLanguageOutline,
  IoPeopleOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import "./FeaturesSection.css";

const FeaturesSection = ({ isMobile = false }) => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <IoLanguageOutline size={isMobile ? 32 : 48} />,
      title: t("home.feature_innovative"),
      description: t("home.feature_innovative_desc"),
      color: "#3498db",
      action: "test",
    },
    {
      icon: <IoPeopleOutline size={isMobile ? 32 : 48} />,
      title: t("home.feature_expert"),
      description: t("home.feature_expert_desc"),
      color: "#e74c3c",
      action: "about",
    },
    {
      icon: <IoTrophyOutline size={isMobile ? 32 : 48} />,
      title: t("home.feature_results"),
      description: t("home.feature_results_desc"),
      color: "#f39c12",
      action: "testimonials",
    },
    {
      icon: <IoTimeOutline size={isMobile ? 32 : 48} />,
      title: t("home.feature_flexible"),
      description: t("home.feature_flexible_desc"),
      color: "#2ecc71",
      action: "test",
    },
  ];

  const handleFeatureClick = (action) => {
    if (isMobile) {
      switch (action) {
        case "test":
          window.location.href = "/test";
          break;
        case "about":
          window.location.href = "/about";
          break;
        case "testimonials": {
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
        default:
          break;
      }
    }
  };

  // Rendu mobile simplifié
  const renderMobileFeature = (feature, index) => (
    <motion.div
      key={index}
      className="mobile-feature-card"
      onClick={() => handleFeatureClick(feature.action)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mobile-feature-content">
        <div className="mobile-feature-icon">{feature.icon}</div>
        <div className="mobile-feature-text">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
        <div className="mobile-feature-arrow">
          <IoArrowForward />
        </div>
      </div>
    </motion.div>
  );

  // Rendu desktop avec animations
  const renderDesktopFeature = (feature, index) => (
    <motion.div
      key={index}
      className="feature-card"
      style={{ "--accent-color": feature.color }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="feature-icon">{feature.icon}</div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </motion.div>
  );

  return (
    <section className="features">
      <h2>{t("home.why_choose")}</h2>
      <div className={isMobile ? "mobile-features-grid" : "features-grid"}>
        {features.map((feature, index) =>
          isMobile
            ? renderMobileFeature(feature, index)
            : renderDesktopFeature(feature, index)
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
