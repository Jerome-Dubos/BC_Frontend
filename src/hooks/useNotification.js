import { useCallback, useState } from "react";

const NOTIFICATION_TYPES = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  ACHIEVEMENT: "achievement",
};

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(
    (message, type = NOTIFICATION_TYPES.INFO) => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message, type }]);

      // Supprimer la notification après 5 secondes
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id)
        );
      }, 5000);
    },
    []
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const showInfo = useCallback(
    (message) => {
      addNotification(message, NOTIFICATION_TYPES.INFO);
    },
    [addNotification]
  );

  const showSuccess = useCallback(
    (message) => {
      addNotification(message, NOTIFICATION_TYPES.SUCCESS);
    },
    [addNotification]
  );

  const showError = useCallback(
    (message) => {
      addNotification(message, NOTIFICATION_TYPES.ERROR);
    },
    [addNotification]
  );

  const showWarning = useCallback(
    (message) => {
      addNotification(message, NOTIFICATION_TYPES.WARNING);
    },
    [addNotification]
  );

  const showAchievement = useCallback(
    (message) => {
      addNotification(message, NOTIFICATION_TYPES.ACHIEVEMENT);
    },
    [addNotification]
  );

  return {
    notifications,
    showInfo,
    showSuccess,
    showError,
    showWarning,
    showAchievement,
    removeNotification,
  };
};
