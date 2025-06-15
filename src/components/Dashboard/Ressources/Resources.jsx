import { motion } from "framer-motion";
import React from "react";
import "./Resources.css";

const Resources = () => {
  return (
    <motion.div
      className="resources-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="resources-header">
        <h3>Ressources pédagogiques</h3>
        <p>Accédez à tous vos supports de cours et exercices</p>
      </div>

      <div className="resources-categories">
        <motion.div
          className="category-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="category-header">
            <div className="category-icon">📚</div>
            <h4>Manuels</h4>
            <span className="category-count">12 documents</span>
          </div>
          <div className="category-content">
            <div className="resource-item">
              <div className="resource-info">
                <h5>Grammaire Française B1</h5>
                <p>Manuel complet - 240 pages</p>
                <span className="resource-type">PDF</span>
              </div>
              <button className="download-btn">Télécharger</button>
            </div>
            <div className="resource-item">
              <div className="resource-info">
                <h5>Vocabulaire Essentiel</h5>
                <p>1000 mots les plus utilisés</p>
                <span className="resource-type">PDF</span>
              </div>
              <button className="download-btn">Télécharger</button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="category-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="category-header">
            <div className="category-icon">🎧</div>
            <h4>Audio</h4>
            <span className="category-count">8 fichiers</span>
          </div>
          <div className="category-content">
            <div className="resource-item">
              <div className="resource-info">
                <h5>Dialogues B1</h5>
                <p>Conversations du quotidien</p>
                <span className="resource-type">MP3</span>
              </div>
              <button className="download-btn">Écouter</button>
            </div>
            <div className="resource-item">
              <div className="resource-info">
                <h5>Prononciation</h5>
                <p>Exercices de phonétique</p>
                <span className="resource-type">MP3</span>
              </div>
              <button className="download-btn">Écouter</button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="category-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="category-header">
            <div className="category-icon">📝</div>
            <h4>Exercices</h4>
            <span className="category-count">25 exercices</span>
          </div>
          <div className="category-content">
            <div className="resource-item">
              <div className="resource-info">
                <h5>Conjugaison</h5>
                <p>Temps du passé - Niveau B1</p>
                <span className="resource-type">Interactive</span>
              </div>
              <button className="download-btn">Commencer</button>
            </div>
            <div className="resource-item">
              <div className="resource-info">
                <h5>Compréhension écrite</h5>
                <p>Textes avec questions</p>
                <span className="resource-type">PDF</span>
              </div>
              <button className="download-btn">Télécharger</button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="category-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="category-header">
            <div className="category-icon">🎥</div>
            <h4>Vidéos</h4>
            <span className="category-count">15 vidéos</span>
          </div>
          <div className="category-content">
            <div className="resource-item">
              <div className="resource-info">
                <h5>Culture française</h5>
                <p>Documentaire - 45 minutes</p>
                <span className="resource-type">MP4</span>
              </div>
              <button className="download-btn">Regarder</button>
            </div>
            <div className="resource-item">
              <div className="resource-info">
                <h5>Cours de grammaire</h5>
                <p>Les temps du passé expliqués</p>
                <span className="resource-type">MP4</span>
              </div>
              <button className="download-btn">Regarder</button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="recent-resources">
        <h4>Récemment consultés</h4>
        <div className="recent-list">
          <motion.div className="recent-item" whileHover={{ scale: 1.02 }}>
            <div className="recent-icon">📚</div>
            <div className="recent-info">
              <h5>Grammaire Française B1</h5>
              <p>Consulté il y a 2 heures</p>
            </div>
            <button className="quick-access-btn">Ouvrir</button>
          </motion.div>

          <motion.div className="recent-item" whileHover={{ scale: 1.02 }}>
            <div className="recent-icon">🎧</div>
            <div className="recent-info">
              <h5>Dialogues B1</h5>
              <p>Consulté hier</p>
            </div>
            <button className="quick-access-btn">Écouter</button>
          </motion.div>

          <motion.div className="recent-item" whileHover={{ scale: 1.02 }}>
            <div className="recent-icon">📝</div>
            <div className="recent-info">
              <h5>Exercices de conjugaison</h5>
              <p>Consulté il y a 3 jours</p>
            </div>
            <button className="quick-access-btn">Reprendre</button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Resources;
