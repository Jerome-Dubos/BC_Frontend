// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import "./Resources.css";

const Resources = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="resources-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="resources-header">
        <h3>{t("resources.title")}</h3>
        <p>{t("resources.subtitle")}</p>
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
            <h4>{t("resources.categories.manuals.title")}</h4>
            <span className="category-count">
              {t("resources.categories.manuals.count", { count: 12 })}
            </span>
          </div>
          <div className="category-content">
            <div className="resource-item">
              <div className="resource-info">
                <h5>
                  {t("resources.categories.manuals.items.frenchGrammar.title")}
                </h5>
                <p>
                  {t(
                    "resources.categories.manuals.items.frenchGrammar.description"
                  )}
                </p>
                <span className="resource-type">PDF</span>
              </div>
              <button className="download-btn">
                {t("resources.buttons.download")}
              </button>
            </div>
            <div className="resource-item">
              <div className="resource-info">
                <h5>
                  {t("resources.categories.manuals.items.essentialVocab.title")}
                </h5>
                <p>
                  {t(
                    "resources.categories.manuals.items.essentialVocab.description"
                  )}
                </p>
                <span className="resource-type">PDF</span>
              </div>
              <button className="download-btn">
                {t("resources.buttons.download")}
              </button>
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
            <h4>{t("resources.categories.audio.title")}</h4>
            <span className="category-count">
              {t("resources.categories.audio.count", { count: 8 })}
            </span>
          </div>
          <div className="category-content">
            <div className="resource-item">
              <div className="resource-info">
                <h5>{t("resources.categories.audio.items.dialogues.title")}</h5>
                <p>
                  {t("resources.categories.audio.items.dialogues.description")}
                </p>
                <span className="resource-type">MP3</span>
              </div>
              <button className="download-btn">
                {t("resources.buttons.listen")}
              </button>
            </div>
            <div className="resource-item">
              <div className="resource-info">
                <h5>
                  {t("resources.categories.audio.items.pronunciation.title")}
                </h5>
                <p>
                  {t(
                    "resources.categories.audio.items.pronunciation.description"
                  )}
                </p>
                <span className="resource-type">MP3</span>
              </div>
              <button className="download-btn">
                {t("resources.buttons.listen")}
              </button>
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
            <h4>{t("resources.categories.exercises.title")}</h4>
            <span className="category-count">
              {t("resources.categories.exercises.count", { count: 25 })}
            </span>
          </div>
          <div className="category-content">
            <div className="resource-item">
              <div className="resource-info">
                <h5>
                  {t("resources.categories.exercises.items.conjugation.title")}
                </h5>
                <p>
                  {t(
                    "resources.categories.exercises.items.conjugation.description"
                  )}
                </p>
                <span className="resource-type">Interactive</span>
              </div>
              <button className="download-btn">
                {t("resources.buttons.start")}
              </button>
            </div>
            <div className="resource-item">
              <div className="resource-info">
                <h5>
                  {t("resources.categories.exercises.items.reading.title")}
                </h5>
                <p>
                  {t(
                    "resources.categories.exercises.items.reading.description"
                  )}
                </p>
                <span className="resource-type">PDF</span>
              </div>
              <button className="download-btn">
                {t("resources.buttons.download")}
              </button>
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
            <h4>{t("resources.categories.videos.title")}</h4>
            <span className="category-count">
              {t("resources.categories.videos.count", { count: 15 })}
            </span>
          </div>
          <div className="category-content">
            <div className="resource-item">
              <div className="resource-info">
                <h5>{t("resources.categories.videos.items.culture.title")}</h5>
                <p>
                  {t("resources.categories.videos.items.culture.description")}
                </p>
                <span className="resource-type">MP4</span>
              </div>
              <button className="download-btn">
                {t("resources.buttons.watch")}
              </button>
            </div>
            <div className="resource-item">
              <div className="resource-info">
                <h5>{t("resources.categories.videos.items.grammar.title")}</h5>
                <p>
                  {t("resources.categories.videos.items.grammar.description")}
                </p>
                <span className="resource-type">MP4</span>
              </div>
              <button className="download-btn">
                {t("resources.buttons.watch")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="recent-resources">
        <h4>{t("resources.recent.title")}</h4>
        <div className="recent-list">
          <motion.div className="recent-item" whileHover={{ scale: 1.02 }}>
            <div className="recent-icon">📚</div>
            <div className="recent-info">
              <h5>
                {t("resources.categories.manuals.items.frenchGrammar.title")}
              </h5>
              <p>{t("resources.recent.timeAgo.hours", { count: 2 })}</p>
            </div>
            <button className="quick-access-btn">
              {t("resources.buttons.open")}
            </button>
          </motion.div>

          <motion.div className="recent-item" whileHover={{ scale: 1.02 }}>
            <div className="recent-icon">🎧</div>
            <div className="recent-info">
              <h5>{t("resources.categories.audio.items.dialogues.title")}</h5>
              <p>{t("resources.recent.timeAgo.yesterday")}</p>
            </div>
            <button className="quick-access-btn">
              {t("resources.buttons.listen")}
            </button>
          </motion.div>

          <motion.div className="recent-item" whileHover={{ scale: 1.02 }}>
            <div className="recent-icon">📝</div>
            <div className="recent-info">
              <h5>
                {t("resources.categories.exercises.items.conjugation.title")}
              </h5>
              <p>{t("resources.recent.timeAgo.days", { count: 3 })}</p>
            </div>
            <button className="quick-access-btn">
              {t("resources.buttons.resume")}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Resources;
