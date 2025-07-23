/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import AboutHeader from "../../components/About/AboutHeader";
import AboutTabs from "../../components/About/AboutTabs";
import "./About.css";

const About = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  // Animations variants
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

  // Récupérer le paramètre tab depuis l'URL
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      // Passer le paramètre tab au composant AboutTabs
      const event = new CustomEvent("setActiveTab", { detail: tabParam });
      window.dispatchEvent(event);
    }
  }, [searchParams]);

  return (
    <motion.div
      className="about"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <AboutHeader />
      <AboutTabs />
    </motion.div>
  );
};

export default About;
