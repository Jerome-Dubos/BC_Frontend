// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  IoGlobeOutline,
  IoHomeOutline,
  IoSadOutline,
  IoSearchOutline,
  IoSparklesOutline,
  IoStarOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const { t } = useTranslation();

  // Animations pour les éléments décoratifs
  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.2, 0.6, 0.2],
      rotate: [0, 180, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.7, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="error-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Éléments décoratifs flottants */}
      <motion.div
        className="floating-error-icon floating-error-icon-1"
        variants={floatingVariants}
        animate="animate"
      >
        <IoSadOutline />
      </motion.div>
      <motion.div
        className="floating-error-icon floating-error-icon-2"
        variants={sparkleVariants}
        animate="animate"
      >
        <IoSparklesOutline />
      </motion.div>
      <motion.div
        className="floating-error-icon floating-error-icon-3"
        variants={pulseVariants}
        animate="animate"
      >
        <IoSearchOutline />
      </motion.div>
      <motion.div
        className="floating-error-icon floating-error-icon-4"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1.5 }}
      >
        <IoWarningOutline />
      </motion.div>
      <motion.div
        className="floating-error-icon floating-error-icon-5"
        variants={sparkleVariants}
        animate="animate"
        transition={{ delay: 0.8 }}
      >
        <IoStarOutline />
      </motion.div>
      <motion.div
        className="floating-error-icon floating-error-icon-6"
        variants={pulseVariants}
        animate="animate"
        transition={{ delay: 2 }}
      >
        <IoGlobeOutline />
      </motion.div>

      <motion.div
        className="error-content"
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        whileHover={{ y: -8, scale: 1.02 }}
      >
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {t("error.title")}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <IoSadOutline className="inline-icon" />
          {t("error.description")}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Link to="/" className="home-button">
            <motion.div
              className="button-content"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <IoHomeOutline size={20} />
              {t("error.backToHome")}
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Error;
