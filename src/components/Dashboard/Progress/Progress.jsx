import { motion } from "framer-motion";
import React from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import "./Progress.css";

const Progress = ({ user, getBadgesForRole }) => {
  return (
    <div className="progress-section">
      <h3>Ma progression</h3>

      <div className="current-level">
        <h4>Niveau actuel : B1 Intermédiaire</h4>
        <div className="level-progress">
          <div className="progress-bar large">
            <div className="progress-fill" style={{ width: "65%" }}></div>
          </div>
          <span>65% vers B2</span>
        </div>
      </div>

      <div className="skills-breakdown">
        <h4>Compétences</h4>
        <div className="skills-grid">
          <div className="skill-item">
            <span>Compréhension orale</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "70%" }}></div>
            </div>
            <span>70%</span>
          </div>
          <div className="skill-item">
            <span>Expression orale</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "60%" }}></div>
            </div>
            <span>60%</span>
          </div>
          <div className="skill-item">
            <span>Compréhension écrite</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "75%" }}></div>
            </div>
            <span>75%</span>
          </div>
          <div className="skill-item">
            <span>Expression écrite</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "55%" }}></div>
            </div>
            <span>55%</span>
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h4>Badges obtenus</h4>
        <div className="badges-container">
          {getBadgesForRole(user?.role || "student").map((badge) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={badge.id}
                className={`achievement-badge ${
                  badge.earned ? "earned" : "locked"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: badge.id * 0.1 }}
                whileHover={{ scale: badge.earned ? 1.05 : 1 }}
              >
                <div className="badge-icon-wrapper">
                  <IconComponent
                    size={24}
                    style={{
                      color: badge.earned ? badge.color : "#6B7280",
                      filter: badge.earned ? "none" : "grayscale(100%)",
                    }}
                  />
                  {!badge.earned && (
                    <IoLockClosedOutline
                      size={12}
                      className="lock-icon"
                      style={{ color: "#6B7280" }}
                    />
                  )}
                </div>
                <span className="badge-title">{badge.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Progress;
