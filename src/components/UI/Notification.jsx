import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import "./Notification.css";

const Notification = ({ notifications, onRemove }) => {
  return (
    <div className="notification-container">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={`notification ${notification.type}`}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <div className="notification-content">
              <span className="notification-message">
                {notification.message}
              </span>
              <button
                className="notification-close"
                onClick={() => onRemove(notification.id)}
                aria-label="Fermer la notification"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

Notification.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        "info",
        "success",
        "error",
        "warning",
        "achievement",
      ]).isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Notification;
