import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AdminPanel.css";

const AdminPanel = () => {
  const { isDirector, createUser, getUsersByRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    role: "eleve",
    matiere: "",
    classe: "",
  });
  const [generatedCredentials, setGeneratedCredentials] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Redirection si l'utilisateur n'est pas directrice
  useEffect(() => {
    if (!isDirector) {
      navigate("/dashboard");
    }
  }, [isDirector, navigate]);

  // Générateur d'identifiant
  const generateUsername = (nom, prenom, dateNaissance) => {
    const nomClean = nom.toLowerCase().replace(/[^a-z]/g, "");
    const prenomClean = prenom.toLowerCase().replace(/[^a-z]/g, "");
    const year = dateNaissance ? dateNaissance.split("-")[0] : "";
    return `${prenomClean.substring(0, 3)}${nomClean.substring(0, 3)}${year}`;
  };

  // Générateur de mot de passe sécurisé
  const generateSecurePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    const username = generateUsername(
      formData.nom,
      formData.prenom,
      formData.dateNaissance
    );
    const password = generateSecurePassword();

    const newUser = createUser({
      ...formData,
      username,
      password,
      avatar:
        formData.role === "professeur"
          ? Math.random() > 0.5
            ? "👨‍🏫"
            : "👩‍🏫"
          : Math.random() > 0.5
          ? "🧑‍🎓"
          : "👩‍🎓",
    });

    setGeneratedCredentials({
      ...newUser,
      username,
      password,
    });

    setShowSuccess(true);
    setFormData({
      nom: "",
      prenom: "",
      dateNaissance: "",
      role: "eleve",
      matiere: "",
      classe: "",
    });

    setTimeout(() => setShowSuccess(false), 5000);
  };

  const sendCredentials = (credentials) => {
    // Simulation d'envoi par email/SMS
    alert(
      `✅ Identifiants envoyés à ${credentials.prenom} ${credentials.nom}\n\nEmail: ${credentials.email}\nIdentifiant: ${credentials.username}\nMot de passe: ${credentials.password}`
    );
  };

  if (!isDirector) {
    return null;
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-header-content">
            <h1 className="admin-title">🏫 Panneau d'Administration</h1>
            <p className="admin-subtitle">
              Gérez votre établissement scolaire de manière efficace
            </p>
            <div className="admin-user-info">
              <div className="user-role">Connectée en tant que</div>
              <div className="user-title">Directrice</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="admin-nav">
          <div className="nav-tabs">
            <button
              onClick={() => setActiveTab("users")}
              className={`nav-tab ${activeTab === "users" ? "active" : ""}`}
            >
              👥 Utilisateurs
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`nav-tab ${activeTab === "settings" ? "active" : ""}`}
            >
              ⚙️ Paramètres
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`nav-tab ${activeTab === "stats" ? "active" : ""}`}
            >
              📊 Statistiques
            </button>
          </div>

          {/* Contenu des onglets */}
          <div className="tab-content">
            {activeTab === "users" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="users-panel"
              >
                <h2 className="panel-title">Gestion des utilisateurs</h2>

                {showSuccess && (
                  <div className="create-user-form">
                    <div className="form-success">
                      ✅ Nouvel utilisateur créé avec succès !
                    </div>
                  </div>
                )}

                <form onSubmit={handleCreateUser} className="user-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Prénom *</label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nom *</label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Date de naissance *</label>
                      <input
                        type="date"
                        name="dateNaissance"
                        value={formData.dateNaissance}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Rôle *</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      >
                        <option value="eleve">Élève</option>
                        <option value="professeur">Professeur</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Classe (pour les élèves)
                      </label>
                      <select
                        name="classe"
                        value={formData.classe}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="">Sélectionner une classe</option>
                        {[
                          "6ème A",
                          "6ème B",
                          "5ème A",
                          "5ème B",
                          "4ème A",
                          "4ème B",
                          "3ème A",
                          "3ème B",
                        ].map((classe) => (
                          <option key={classe} value={classe}>
                            {classe}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="create-user-button">
                    ➕ Créer l'utilisateur
                  </button>
                </form>

                {/* Affichage des identifiants générés */}
                {generatedCredentials && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="credentials-display"
                  >
                    <h3 className="section-title">🔑 Identifiants générés</h3>
                    <div className="credentials-grid">
                      <div>
                        <strong>Nom complet:</strong>{" "}
                        {generatedCredentials.prenom} {generatedCredentials.nom}
                      </div>
                      <div>
                        <strong>Email:</strong> {generatedCredentials.email}
                      </div>
                      <div>
                        <strong>Identifiant:</strong>{" "}
                        <code className="code-sample">
                          {generatedCredentials.username}
                        </code>
                      </div>
                      <div>
                        <strong>Mot de passe:</strong>{" "}
                        <code className="code-sample">
                          {generatedCredentials.password}
                        </code>
                      </div>
                    </div>
                    <button
                      onClick={() => sendCredentials(generatedCredentials)}
                      className="send-credentials-button"
                    >
                      📧 Envoyer les identifiants par email
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="settings-panel"
              >
                <h2 className="panel-title">Paramètres de l'établissement</h2>

                <div className="settings-grid">
                  <div className="setting-card">
                    <h3 className="setting-title">🎓 Informations générales</h3>
                    <div className="setting-content">
                      {/* Add general information display logic here */}
                    </div>
                  </div>

                  <div className="setting-card">
                    <h3 className="setting-title">📝 Actions rapides</h3>
                    <div className="setting-content">
                      {/* Add quick actions display logic here */}
                    </div>
                  </div>

                  <div className="setting-card">
                    <h3 className="setting-title">🔧 Configuration</h3>
                    <div className="setting-content">
                      <button className="config-button">
                        🗂️ Gérer les classes
                      </button>
                      <button className="config-button">
                        📚 Gérer les matières
                      </button>
                      <button className="config-button">🔒 Permissions</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "stats" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="stats-panel"
              >
                <h2 className="panel-title">Tableau de bord</h2>

                <div className="stats-overview">
                  <div className="stat-card blue">
                    <div className="stat-number">
                      {getUsersByRole("professeur").length}
                    </div>
                    <div className="stat-label">Professeurs</div>
                  </div>
                  <div className="stat-card green">
                    <div className="stat-number">
                      {getUsersByRole("eleve").length}
                    </div>
                    <div className="stat-label">Élèves</div>
                  </div>
                  <div className="stat-card purple">
                    <div className="stat-number">8</div>
                    <div className="stat-label">Classes</div>
                  </div>
                  <div className="stat-card orange">
                    <div className="stat-number">95%</div>
                    <div className="stat-label">Taux de connexion</div>
                  </div>
                </div>

                <div className="activity-summary">
                  <h3 className="section-title">Activité récente</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <span>Nouveaux comptes créés cette semaine:</span>
                      <span className="activity-count positive">3</span>
                    </div>
                    <div className="activity-item">
                      <span>Documents téléversés:</span>
                      <span className="activity-count">12</span>
                    </div>
                    <div className="activity-item">
                      <span>Cours en ligne organisés:</span>
                      <span className="activity-count">8</span>
                    </div>
                    <div className="activity-item">
                      <span>Total des connexions:</span>
                      <span className="activity-count">247</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
