import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IoBookOutline,
  IoGlobeOutline,
  IoStarOutline,
} from "react-icons/io5";
import "./AboutHeader.css";

const AboutHeader = () => {
  const { t } = useTranslation();

  const floatingIconVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {/* Éléments décoratifs flottants */}
      <motion.div
        className="floating-icon floating-icon-1"
        variants={floatingIconVariants}
        animate="animate"
      >
        <IoBookOutline />
      </motion.div>
      <motion.div
        className="floating-icon floating-icon-2"
        variants={floatingIconVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <IoGlobeOutline />
      </motion.div>
      <motion.div
        className="floating-icon floating-icon-3"
        variants={floatingIconVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
      >
        <IoStarOutline />
      </motion.div>
    </>
  );
};

export default AboutHeader; 