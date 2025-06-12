// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    in: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="error-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Éléments de décoration d'arrière-plan */}
      <div className="error-bg-decoration">
        <div className="error-glow"></div>
        <div className="error-glow"></div>
        <div className="error-particles"></div>
      </div>

      <div className="error-content">
        {/* Icône d'erreur animée */}
        <motion.div
          className="error-icon"
          variants={iconVariants}
          initial="initial"
          animate="in"
        >
          <span className="error-number">404</span>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Oops ! Page introuvable
        </motion.h1>

        {/* Description */}
        <motion.p
          className="error-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          La page que vous recherchez semble avoir pris des vacances. Peut-être
          qu'elle apprend une nouvelle langue ?
        </motion.p>

        {/* Boutons d'action */}
        <motion.div
          className="error-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link to="/" className="btn-primary">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Retourner à l'accueil
            </motion.button>
          </Link>

          <button
            className="btn-secondary"
            onClick={() => window.history.back()}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Page précédente
            </motion.span>
          </button>
        </motion.div>

        {/* Suggestion d'alternatives */}
        <motion.div
          className="error-suggestions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <h3>Que diriez-vous d'explorer :</h3>
          <div className="suggestions-grid">
            <Link to="/about" className="suggestion-card">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="suggestion-icon">📖</span>
                <span>À propos</span>
              </motion.div>
            </Link>

            <Link to="/test" className="suggestion-card">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="suggestion-icon">🎯</span>
                <span>Test de niveau</span>
              </motion.div>
            </Link>

            <Link to="/login" className="suggestion-card">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="suggestion-icon">🔐</span>
                <span>Connexion</span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Error;
