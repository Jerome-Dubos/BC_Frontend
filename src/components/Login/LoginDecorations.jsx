import { motion } from "framer-motion";
import "./LoginDecorations.css";
import {
  IoShieldCheckmarkOutline,
  IoSparklesOutline,
  IoStarOutline,
} from "react-icons/io5";

const LoginDecorations = () => {
  // Animations pour les éléments décoratifs
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
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
        variants={floatingVariants}
        animate="animate"
      >
        <IoSparklesOutline />
      </motion.div>
      <motion.div
        className="floating-icon floating-icon-2"
        variants={sparkleVariants}
        animate="animate"
      >
        <IoStarOutline />
      </motion.div>
      <motion.div
        className="floating-icon floating-icon-3"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      >
        <IoShieldCheckmarkOutline />
      </motion.div>
    </>
  );
};

export default LoginDecorations; 