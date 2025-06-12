// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(""); // Effacer l'erreur quand l'utilisateur tape
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = login(formData.emailOrUsername, formData.password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
  };

  const handleDemoLogin = (emailOrId, password) => {
    setFormData({ emailOrUsername: emailOrId, password });
    const result = login(emailOrId, password);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  const demoAccounts = [
    {
      type: "Directeur",
      name: "Marie Dubois",
      email: "marie.dubois@lecole.fr",
      identifiant: "DIR001",
      password: "directeur123",
      color: "bg-purple-100 text-purple-800",
    },
    {
      type: "Professeur",
      name: "Jean Martin (Anglais)",
      email: "jean.martin@lecole.fr",
      identifiant: "PROF001",
      password: "teacher123",
      color: "bg-blue-100 text-blue-800",
    },
    {
      type: "Professeur",
      name: "Sophie Leroy (Espagnol)",
      email: "sophie.leroy@lecole.fr",
      identifiant: "PROF002",
      password: "teacher123",
      color: "bg-blue-100 text-blue-800",
    },
    {
      type: "Étudiant",
      name: "Lucas Petit (Anglais B2)",
      email: "lucas.petit@lecole.fr",
      identifiant: "ETU001",
      password: "student123",
      color: "bg-green-100 text-green-800",
    },
    {
      type: "Étudiant",
      name: "Emma Garcia (Espagnol B1)",
      email: "emma.garcia@lecole.fr",
      identifiant: "ETU002",
      password: "student123",
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <motion.div
      className="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="auth-container"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          École Internationale de Langues
        </motion.h1>

        <motion.p
          className="admin-notice"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Connectez-vous avec votre email ou identifiant
        </motion.p>

        <form onSubmit={handleSubmit}>
          <motion.div
            className="form-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label htmlFor="emailOrUsername">Email ou Identifiant</label>
            <input
              type="text"
              id="emailOrUsername"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              placeholder="ex: jean.martin@lecole.fr ou PROF001"
              required
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </motion.div>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                color: "red",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="submit-button"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Se connecter
          </motion.button>
        </form>

        {/* Bouton pour afficher les comptes de démonstration */}
        <motion.button
          type="button"
          onClick={() => setShowDemoAccounts(!showDemoAccounts)}
          className="demo-toggle-button"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            marginTop: "1rem",
            background: "transparent",
            border: "1px solid #ddd",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            color: "#666",
          }}
        >
          {showDemoAccounts ? "Masquer" : "Voir"} les comptes de démonstration
        </motion.button>

        {/* Comptes de démonstration */}
        {showDemoAccounts && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginTop: "1rem" }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "1rem",
                color: "#333",
              }}
            >
              Comptes de démonstration
            </h3>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {demoAccounts.map((account, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    padding: "0.75rem",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${account.color}`}
                      >
                        {account.type}
                      </span>
                      <p style={{ margin: "0.25rem 0", fontWeight: "bold" }}>
                        {account.name}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.85rem",
                          color: "#666",
                        }}
                      >
                        Email: {account.email}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.85rem",
                          color: "#666",
                        }}
                      >
                        ID: {account.identifiant}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() =>
                          handleDemoLogin(account.email, account.password)
                        }
                        style={{
                          background: "#3b82f6",
                          color: "white",
                          border: "none",
                          padding: "0.4rem 0.8rem",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                      >
                        Email
                      </button>
                      <button
                        onClick={() =>
                          handleDemoLogin(account.identifiant, account.password)
                        }
                        style={{
                          background: "#059669",
                          color: "white",
                          border: "none",
                          padding: "0.4rem 0.8rem",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                      >
                        ID
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Login;
