// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  IoKeyOutline,
  IoPersonOutline,
  IoSchoolOutline,
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
    } catch (err) {
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
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <motion.div
      className="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="login-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="login-header">
          <h1>Connexion</h1>
          <p>
            Bienvenue ! Connectez-vous pour accéder à votre espace personnel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="identifier">Identifiant</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Votre identifiant"
              required
              autoFocus
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Connexion...
              </>
            ) : (
              <>
                <IoKeyOutline size={20} />
                Se connecter
              </>
            )}
          </button>
        </form>

        {/* Comptes de démo */}
        <div className="demo-accounts">
          <h3>Comptes de démonstration</h3>
          <p>Cliquez sur un profil pour vous connecter instantanément :</p>

          <div className="demo-buttons">
            <button
              className="demo-btn director"
              onClick={() => handleDemoLogin("directrice")}
              disabled={isLoading}
            >
              <MdAdminPanelSettings size={20} />
              <div>
                <strong>Directrice</strong>
                <span>Shirin Hosseini</span>
              </div>
            </button>

            <button
              className="demo-btn teacher"
              onClick={() => handleDemoLogin("prof")}
              disabled={isLoading}
            >
              <IoPersonOutline size={20} />
              <div>
                <strong>Professeure</strong>
                <span>Marie Dubois</span>
              </div>
            </button>

            <button
              className="demo-btn student"
              onClick={() => handleDemoLogin("etudiant")}
              disabled={isLoading}
            >
              <IoSchoolOutline size={20} />
              <div>
                <strong>Étudiant</strong>
                <span>Pierre Martin</span>
              </div>
            </button>
          </div>
        </div>

        <div className="login-info">
          <p>
            <strong>Mode démo :</strong> Vous pouvez aussi utiliser n'importe
            quel identifiant pour créer un compte étudiant temporaire.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
