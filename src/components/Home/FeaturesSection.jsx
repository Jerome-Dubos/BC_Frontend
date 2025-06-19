/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IoLanguageOutline,
  IoPeopleOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from "react-icons/io5";

const FeaturesSection = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <IoLanguageOutline size={48} />,
      title: t("home.feature_innovative"),
      description: t("home.feature_innovative_desc"),
      color: "#3498db",
    },
    {
      icon: <IoPeopleOutline size={48} />,
      title: t("home.feature_expert"),
      description: t("home.feature_expert_desc"),
      color: "#e74c3c",
    },
    {
      icon: <IoTrophyOutline size={48} />,
      title: t("home.feature_results"),
      description: t("home.feature_results_desc"),
      color: "#f39c12",
    },
    {
      icon: <IoTimeOutline size={48} />,
      title: t("home.feature_flexible"),
      description: t("home.feature_flexible_desc"),
      color: "#2ecc71",
    },
  ];

  return (
    <section className="features">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {t("home.why_choose")}
      </motion.h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }}
            style={{ "--accent-color": feature.color }}
          >
            <motion.div
              className="feature-icon"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              {feature.icon}
            </motion.div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div className="feature-glow" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
