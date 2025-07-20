import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import AboutHeader from "../../components/About/AboutHeader";
import AboutTabs from "../../components/About/AboutTabs";
import "./About.css";

const About = () => {
  const { t } = useTranslation();

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
