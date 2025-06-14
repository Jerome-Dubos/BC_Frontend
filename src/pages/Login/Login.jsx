// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoKeyOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoShieldCheckmarkOutline,
  IoSparklesOutline,
  IoStarOutline,
} from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur quand l'utilisateur tape
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation minimale pour la démo
    if (!formData.identifier.trim()) {
      setError("Veuillez saisir un identifiant");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await login(formData.identifier, formData.password);
      if (result.success) {
        // Rediriger vers le dashboard après connexion réussie
        navigate("/dashboard");
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (identifier) => {
    setFormData({ identifier, password: "demo" });
    setIsLoading(true);
    setError("");

    try {
      const result = await login(identifier, "demo");
      if (result.success) {
        navigate("/dashboard");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="login loading-screen">
        <motion.div
          className="loading-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-spinner-large"></div>
          <p>Chargement...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
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

      <motion.div
        className="login-card"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        whileHover={{ y: -5 }}
      >
        <motion.div
          className="login-header"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1>Connexion</h1>
          <p>Bienvenue dans votre espace d'apprentissage personnalisé</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="login-form"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="form-group">
            <label htmlFor="identifier">
              <IoPersonOutline className="label-icon" />
              Identifiant
            </label>
            <motion.input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Votre identifiant"
              required
              autoFocus
              autoComplete="username"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <IoKeyOutline className="label-icon" />
              Mot de passe
            </label>
            <div className="password-input-wrapper">
              <motion.input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
                autoComplete="current-password"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="login-button"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Connexion en cours...
              </>
            ) : (
              <>
                <IoKeyOutline size={20} />
                Se connecter
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Comptes de démo */}
        <motion.div
          className="demo-accounts"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3>
            <IoSparklesOutline className="section-icon" />
            Comptes de démonstration
          </h3>
          <p>Cliquez sur un profil pour vous connecter instantanément :</p>

          <div className="demo-buttons">
            <motion.button
              className="demo-btn director"
              onClick={() => handleDemoLogin("directrice")}
              disabled={isLoading}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <MdAdminPanelSettings size={24} />
              <div>
                <strong>Directrice</strong>
                <span>Shirin Hosseini</span>
              </div>
            </motion.button>

            <motion.button
              className="demo-btn teacher"
              onClick={() => handleDemoLogin("prof")}
              disabled={isLoading}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <IoPersonOutline size={24} />
              <div>
                <strong>Professeure</strong>
                <span>Marie Dubois</span>
              </div>
            </motion.button>

            <motion.button
              className="demo-btn student"
              onClick={() => handleDemoLogin("etudiant")}
              disabled={isLoading}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <IoSchoolOutline size={24} />
              <div>
                <strong>Étudiant</strong>
                <span>Pierre Martin</span>
              </div>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="login-info"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>
            <IoShieldCheckmarkOutline className="info-icon" />
            <strong>Mode démo :</strong> Vous pouvez aussi utiliser n'importe
            quel identifiant pour créer un compte étudiant temporaire.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
