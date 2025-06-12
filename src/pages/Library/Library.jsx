import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Library.css";

const Library = () => {
  const { user, isDirector, isTeacher, isStudent } = useAuth();
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("tous");
  const [uploadForm, setUploadForm] = useState({
    title: "",
    subject: "",
    type: "cours",
    description: "",
    file: null,
  });

  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "Théorème de Pythagore - Cours complet",
      subject: "Mathématiques",
      type: "cours",
      author: "Jean Martin",
      authorRole: "professeur",
      uploadDate: "2024-12-01",
      downloadCount: 45,
      description:
        "Cours détaillé sur le théorème de Pythagore avec exercices corrigés",
      fileSize: "2.4 MB",
      icon: "📐",
      isFavorite: false,
    },
    {
      id: 2,
      title: "Analyse du Petit Prince - Exercices",
      subject: "Français",
      type: "exercices",
      author: "Sophie Leroy",
      authorRole: "professeur",
      uploadDate: "2024-11-28",
      downloadCount: 32,
      description:
        "Exercices d'analyse littéraire sur l'œuvre de Saint-Exupéry",
      fileSize: "1.8 MB",
      icon: "📝",
      isFavorite: false,
    },
    {
      id: 3,
      title: "La Révolution française - Fiche de révision",
      subject: "Histoire-Géographie",
      type: "revision",
      author: "Marie Dubois",
      authorRole: "directrice",
      uploadDate: "2024-11-25",
      downloadCount: 67,
      description:
        "Fiche synthétique sur les causes et conséquences de la Révolution",
      fileSize: "950 KB",
      icon: "📋",
      isFavorite: false,
    },
    {
      id: 4,
      title: "Expériences de Chimie - Protocoles",
      subject: "Sciences",
      type: "tp",
      author: "Jean Martin",
      authorRole: "professeur",
      uploadDate: "2024-11-20",
      downloadCount: 28,
      description: "Protocoles détaillés pour les TP de chimie niveau 3ème",
      fileSize: "3.2 MB",
      icon: "🧪",
      isFavorite: false,
    },
    {
      id: 5,
      title: "Conjugaison anglaise - Tableau récapitulatif",
      subject: "Anglais",
      type: "reference",
      author: "Sophie Leroy",
      authorRole: "professeur",
      uploadDate: "2024-11-15",
      downloadCount: 89,
      description: "Tableau complet des temps et conjugaisons en anglais",
      fileSize: "1.1 MB",
      icon: "📊",
      isFavorite: false,
    },
  ]);

  const subjects = [
    "all",
    "Mathématiques",
    "Français",
    "Sciences",
    "Histoire-Géographie",
    "Anglais",
    "EPS",
  ];
  const documentTypes = ["cours", "exercices", "tp", "revision", "reference"];

  const filteredDocuments = documents.filter(
    (doc) => selectedSubject === "all" || doc.subject === selectedSubject
  );

  const handleUploadFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setUploadForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    // Simulation d'upload
    alert(`✅ Document "${uploadForm.title}" ajouté avec succès !`);
    setUploadForm({
      title: "",
      subject: "",
      type: "cours",
      description: "",
      file: null,
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "cours":
        return "📚";
      case "exercices":
        return "📝";
      case "tp":
        return "🧪";
      case "revision":
        return "📋";
      case "reference":
        return "📊";
      default:
        return "📄";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "cours":
        return "bg-blue-100 text-blue-800";
      case "exercices":
        return "bg-green-100 text-green-800";
      case "tp":
        return "bg-purple-100 text-purple-800";
      case "revision":
        return "bg-orange-100 text-orange-800";
      case "reference":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleFavorite = (id) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
      )
    );
  };

  return (
    <div className="library-page">
      <div className="library-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="library-header"
        >
          <h1 className="library-title">Bibliothèque</h1>
          <p className="library-subtitle">
            {isDirector &&
              "Gérez et organisez tous les documents de l'établissement"}
            {isTeacher &&
              "Partagez vos ressources pédagogiques et consultez les documents"}
            {isStudent &&
              "Accédez aux ressources et documents partagés par vos professeurs"}
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="library-nav">
          <div className="nav-tabs">
            <button
              onClick={() => setActiveTab("browse")}
              className={`nav-tab ${activeTab === "browse" ? "active" : ""}`}
            >
              🔍 Parcourir
            </button>
            {(isDirector || isTeacher) && (
              <button
                onClick={() => setActiveTab("upload")}
                className={`nav-tab ${activeTab === "upload" ? "active" : ""}`}
              >
                ⬆️ Téléverser
              </button>
            )}
            <button
              onClick={() => setActiveTab("stats")}
              className={`nav-tab ${activeTab === "stats" ? "active" : ""}`}
            >
              📊 Statistiques
            </button>
          </div>

          {/* Contenu des onglets */}
          <div className="tab-content">
            {activeTab === "browse" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="browse-panel"
              >
                {/* Filtres */}
                <div className="filter-section">
                  <span className="filter-label">Filtrer par :</span>
                  <div className="filter-buttons">
                    {["Tous", "Documents", "Vidéos", "Images", "Audio"].map(
                      (filter) => (
                        <button
                          key={filter}
                          onClick={() =>
                            setSelectedFilter(filter.toLowerCase())
                          }
                          className={`filter-button ${
                            selectedFilter === filter.toLowerCase()
                              ? "active"
                              : ""
                          }`}
                        >
                          {filter}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Grille de documents */}
                <div className="documents-grid">
                  {filteredDocuments.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="document-card"
                    >
                      <div className="document-header">
                        <div className="document-icon">{doc.icon}</div>
                        <div className="document-actions">
                          <button
                            onClick={() => toggleFavorite(doc.id)}
                            className={`favorite-button ${
                              doc.isFavorite ? "active" : ""
                            }`}
                          >
                            {doc.isFavorite ? "⭐" : "☆"}
                          </button>
                          <span className="document-type">{doc.type}</span>
                        </div>
                      </div>

                      <h3 className="document-title">{doc.title}</h3>
                      <p className="document-description">{doc.description}</p>

                      <div className="document-meta">
                        <div className="meta-row">
                          <span className="meta-label">Auteur:</span>
                          <span className="meta-value">{doc.author}</span>
                        </div>
                        <div className="meta-row">
                          <span className="meta-label">Ajouté:</span>
                          <span className="meta-value">
                            {new Date(doc.uploadDate).toLocaleDateString(
                              "fr-FR"
                            )}
                          </span>
                        </div>
                        <div className="meta-row">
                          <span className="meta-label">Taille:</span>
                          <span className="meta-value">{doc.fileSize}</span>
                        </div>
                      </div>

                      <div className="document-footer">
                        <button className="download-button">
                          📥 Télécharger
                        </button>
                        <button className="share-button">📤</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "upload" && (isDirector || isTeacher) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="upload-panel"
              >
                <h2 className="panel-title">Téléverser un nouveau document</h2>

                <form onSubmit={handleUploadSubmit} className="upload-form">
                  <div className="form-group">
                    <label className="form-label">Titre du document *</label>
                    <input
                      type="text"
                      name="title"
                      value={uploadForm.title}
                      onChange={handleUploadFormChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Catégorie *</label>
                      <select
                        name="type"
                        value={uploadForm.type}
                        onChange={handleUploadFormChange}
                        className="form-input"
                        required
                      >
                        <option value="">Sélectionner une catégorie</option>
                        {documentTypes.map((type) => (
                          <option key={type} value={type}>
                            {getTypeIcon(type)}{" "}
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Matière</label>
                      <select
                        name="subject"
                        value={uploadForm.subject}
                        onChange={handleUploadFormChange}
                        className="form-input"
                      >
                        <option value="">Toutes les matières</option>
                        {subjects.slice(1).map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={uploadForm.description}
                      onChange={handleUploadFormChange}
                      className="form-input"
                      rows="3"
                      placeholder="Décrivez le contenu du document..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Fichier *</label>
                    <div className="file-upload-zone">
                      <input
                        type="file"
                        name="file"
                        onChange={handleUploadFormChange}
                        className="file-input"
                        required
                      />
                      <div className="upload-placeholder">
                        <div className="upload-icon">📁</div>
                        <div className="upload-text">
                          Cliquez ici pour sélectionner un fichier
                        </div>
                        <div className="upload-hint">
                          Formats acceptés: PDF, DOC, DOCX, PPT, PPTX (Max 50MB)
                        </div>
                      </div>
                      {uploadForm.file && (
                        <div className="selected-file">
                          ✅ Fichier sélectionné: {uploadForm.file.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="upload-submit-button">
                    📤 Téléverser le document
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === "stats" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="stats-panel"
              >
                <h2 className="panel-title">Statistiques de la bibliothèque</h2>

                <div className="stats-grid">
                  <div className="stat-card">
                    <h3 className="stat-title">📄 Contenus</h3>
                    <div className="stat-content">
                      <div className="stat-row">
                        <span className="stat-label">Total documents:</span>
                        <span className="stat-value">{documents.length}</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Cette semaine:</span>
                        <span className="stat-value">+5</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Ce mois:</span>
                        <span className="stat-value positive">+12</span>
                      </div>
                    </div>
                  </div>

                  <div className="stat-card">
                    <h3 className="stat-title">🔧 Actions</h3>
                    <div className="stat-content">
                      <button className="action-button">
                        🗂️ Organiser par dossiers
                      </button>
                      <button className="action-button">
                        🗑️ Nettoyer les anciens fichiers
                      </button>
                      <button className="action-button">
                        📊 Rapport détaillé
                      </button>
                      <button className="action-button">
                        ⚙️ Gérer les permissions
                      </button>
                    </div>
                  </div>

                  <div className="stat-card">
                    <h3 className="stat-title">📈 Analyse</h3>
                    <div className="stat-content">
                      <div className="analytics-info">
                        📊 Documents les plus consultés:
                        <br />
                        1. Cours de Mathématiques - Chapitre 1<br />
                        2. Exercices de Français
                        <br />
                        3. Guide méthodologique
                      </div>
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

export default Library;
