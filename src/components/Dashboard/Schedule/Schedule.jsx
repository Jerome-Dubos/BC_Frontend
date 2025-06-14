import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  IoCallOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoGlobeOutline,
  IoInformationCircleOutline,
  IoLocationOutline,
  IoMicOffOutline,
  IoMicOutline,
  IoPersonOutline,
  IoTimeOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import "./Schedule.css";

const Schedule = ({ setShowClassInfoModal, setSelectedClass }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showVideoModal, setShowVideoModalLocal] = useState(false);
  const [selectedClassLocal, setSelectedClassLocal] = useState(null);
  const [videoControls, setVideoControls] = useState({
    mic: true,
    camera: true,
  });

  // États pour les modales et notifications
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationInfo, setLocationInfo] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour afficher une notification flottante
  const showFloatingNotification = (type, message) => {
    setNotification({ type, message });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  // Fonction pour simuler le chargement
  const simulateLoading = (duration = 2000) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, duration);
  };

  const getWeekDays = (date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(currentWeek);
  const today = new Date();

  // Données de démonstration enrichies avec mode présentiel/visio
  const events = {
    "2024-01-15": [
      {
        id: 1,
        title: "Grammaire B1",
        time: "09:00",
        type: "grammar",
        teacher: "Prof. Martin",
        students: 12,
        status: "confirmed",
        mode: "offline", // présentiel
        room: "Salle 101",
        building: "Bâtiment A - 1er étage",
        address: "15 Rue de la Paix, 75001 Paris",
      },
      {
        id: 2,
        title: "Conversation A2",
        time: "14:00",
        type: "conversation",
        teacher: "Prof. Dubois",
        students: 8,
        status: "confirmed",
        mode: "online", // visio
        room: "Zoom",
        meetingId: "123-456-789",
        password: "BonCours2024",
      },
    ],
    "2024-01-16": [
      {
        id: 3,
        title: "Vocabulaire B2",
        time: "10:30",
        type: "vocabulary",
        teacher: "Prof. Leroy",
        students: 15,
        status: "confirmed",
        mode: "offline",
        room: "Salle 203",
        building: "Bâtiment B - 2ème étage",
        address: "15 Rue de la Paix, 75001 Paris",
      },
      {
        id: 4,
        title: "Écoute B2",
        time: "16:00",
        type: "listening",
        teacher: "Prof. Bernard",
        students: 10,
        status: "pending",
        mode: "online",
        room: "Teams",
        meetingId: "987-654-321",
        password: "Ecoute2024",
      },
    ],
    "2024-01-17": [
      {
        id: 5,
        title: "Expression Orale",
        time: "09:30",
        type: "speaking",
        teacher: "Prof. Moreau",
        students: 6,
        status: "confirmed",
        mode: "online",
        room: "Google Meet",
        meetingId: "abc-def-ghi",
        password: "Expression2024",
      },
      {
        id: 6,
        title: "Atelier Écriture",
        time: "15:00",
        type: "writing",
        teacher: "Prof. Rousseau",
        students: 12,
        status: "confirmed",
        mode: "offline",
        room: "Salle 105",
        building: "Bâtiment A - 1er étage",
        address: "15 Rue de la Paix, 75001 Paris",
      },
    ],
    "2024-01-18": [
      {
        id: 7,
        title: "Préparation DELF",
        time: "11:00",
        type: "exam",
        teacher: "Prof. Laurent",
        students: 8,
        status: "confirmed",
        mode: "offline",
        room: "Salle d'examen",
        building: "Bâtiment C - Rez-de-chaussée",
        address: "15 Rue de la Paix, 75001 Paris",
      },
    ],
    "2024-01-19": [
      {
        id: 8,
        title: "Culture Française",
        time: "13:30",
        type: "culture",
        teacher: "Prof. Petit",
        students: 20,
        status: "confirmed",
        mode: "online",
        room: "Webex",
        meetingId: "456-789-123",
        password: "Culture2024",
      },
      {
        id: 9,
        title: "Phonétique",
        time: "17:00",
        type: "pronunciation",
        teacher: "Prof. Blanc",
        students: 10,
        status: "pending",
        mode: "offline",
        room: "Lab Audio",
        building: "Bâtiment B - Sous-sol",
        address: "15 Rue de la Paix, 75001 Paris",
      },
    ],
  };

  // Prochains cours avec mode présentiel/visio
  const upcomingClasses = [
    {
      id: 1,
      title: "Grammaire avancée",
      time: "Demain à 14:00",
      type: "grammar",
      teacher: "Prof. Martin",
      students: 12,
      level: "B2",
      room: "Salle 101",
      mode: "offline",
      building: "Bâtiment A - 1er étage",
      address: "15 Rue de la Paix, 75001 Paris",
    },
    {
      id: 2,
      title: "Conversation libre",
      time: "Aujourd'hui à 16:30",
      type: "conversation",
      teacher: "Prof. Dubois",
      students: 8,
      level: "B1",
      room: "Zoom",
      mode: "online",
      meetingId: "555-666-777",
      password: "Conversation2024",
    },
    {
      id: 3,
      title: "Atelier Prononciation",
      time: "Vendredi à 10:00",
      type: "pronunciation",
      teacher: "Prof. Blanc",
      students: 6,
      level: "A2",
      room: "Google Meet",
      mode: "online",
      meetingId: "111-222-333",
      password: "Prononciation2024",
    },
  ];

  // Participants simulés pour la modale vidéo
  const participants = [
    { id: 1, name: "Marie Dupont", avatar: "MD", status: "online" },
    { id: 2, name: "Jean Martin", avatar: "JM", status: "online" },
    { id: 3, name: "Sophie Laurent", avatar: "SL", status: "online" },
    { id: 4, name: "Pierre Dubois", avatar: "PD", status: "online" },
    { id: 5, name: "Emma Wilson", avatar: "EW", status: "online" },
  ];

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const isToday = (date) => {
    return formatDate(date) === formatDate(today);
  };

  const navigateWeek = (direction) => {
    simulateLoading(1500);
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + direction * 7);
    setCurrentWeek(newDate);
    showFloatingNotification(
      "info",
      `Planning mis à jour pour la semaine du ${newDate.toLocaleDateString(
        "fr-FR"
      )}`
    );
  };

  const handleClassClick = (event) => {
    simulateLoading(1000);
    setSelectedClass && setSelectedClass(event);
    setShowClassInfoModal && setShowClassInfoModal(true);
  };

  // Fonction pour rejoindre un cours
  const handleJoinClass = (classInfo) => {
    if (classInfo.mode === "online") {
      // Cours en visio - simuler connexion puis ouvrir la modale vidéo
      simulateLoading(3000);
      setTimeout(() => {
        setSelectedClassLocal(classInfo);
        setShowVideoModalLocal(true);
        showFloatingNotification(
          "success",
          `Connexion établie au cours "${classInfo.title}"`
        );
      }, 3000);
    } else {
      // Cours en présentiel - afficher la modale de localisation
      setLocationInfo(classInfo);
      setShowLocationModal(true);
    }
  };

  // Fonction pour voir les infos d'un cours
  const handleViewInfo = (classInfo) => {
    simulateLoading(800);
    setSelectedClass && setSelectedClass(classInfo);
    setShowClassInfoModal && setShowClassInfoModal(true);
  };

  // Contrôles vidéo
  const toggleMic = () => {
    setVideoControls((prev) => ({ ...prev, mic: !prev.mic }));
    showFloatingNotification(
      videoControls.mic ? "info" : "success",
      videoControls.mic ? "Microphone désactivé" : "Microphone activé"
    );
  };

  const toggleCamera = () => {
    setVideoControls((prev) => ({ ...prev, camera: !prev.camera }));
    showFloatingNotification(
      videoControls.camera ? "info" : "success",
      videoControls.camera ? "Caméra désactivée" : "Caméra activée"
    );
  };

  const leaveCall = () => {
    simulateLoading(1000);
    setTimeout(() => {
      setShowVideoModalLocal(false);
      setSelectedClassLocal(null);
      showFloatingNotification("info", "Vous avez quitté le cours");
    }, 1000);
  };

  return (
    <>
      <motion.div
        className="schedule-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Barre de chargement */}
        <div className={`loading-bar ${isLoading ? "active" : ""}`}></div>

        <div className="schedule-header">
          <h3>Planning de la semaine</h3>
          <div className="week-navigation">
            <motion.button
              onClick={() => navigateWeek(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isLoading}
            >
              ‹
            </motion.button>
            <span>
              {weekDays[0].toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
              })}{" "}
              -{" "}
              {weekDays[6].toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <motion.button
              onClick={() => navigateWeek(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isLoading}
            >
              ›
            </motion.button>
          </div>
        </div>

        <div className="calendar-container">
          <div className="calendar-header">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
              (day, index) => (
                <div key={day} className="day-header">
                  <span className="day-name">{day}</span>
                  <span className="day-number">
                    {weekDays[index].getDate()}
                  </span>
                </div>
              )
            )}
          </div>

          <div className="calendar-grid">
            {weekDays.map((day, index) => {
              const dateKey = formatDate(day);
              const dayEvents = events[dateKey] || [];

              return (
                <div
                  key={index}
                  className={`calendar-day ${isToday(day) ? "today" : ""}`}
                >
                  {dayEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      className={`event ${event.type} ${event.status}`}
                      onClick={() => handleClassClick(event)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: event.id * 0.1 }}
                    >
                      <div className="event-time">{event.time}</div>
                      <div className="event-title">{event.title}</div>
                      <div className="event-teacher">{event.teacher}</div>
                      <div className="event-students">
                        {event.students} élèves
                      </div>
                      <div className={`event-mode ${event.mode}`}>
                        {event.mode === "online" ? "VISIO" : "PRÉSENTIEL"}
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="schedule-bottom-section">
          <div className="upcoming-classes">
            <h4>Prochains cours</h4>
            <div className="classes-list">
              {upcomingClasses.map((classItem, index) => (
                <motion.div
                  key={classItem.id}
                  className="class-item"
                  whileHover={{ scale: 1.02, x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="class-info">
                    <h5>{classItem.title}</h5>
                    <p>{classItem.time}</p>
                    <div className="class-details">
                      <span className={`class-type ${classItem.type}`}>
                        {classItem.level}
                      </span>
                      <span className="class-room">
                        {classItem.mode === "online" ? "💻" : "📍"}{" "}
                        {classItem.room}
                      </span>
                      <span className={`class-mode ${classItem.mode}`}>
                        {classItem.mode === "online" ? "VISIO" : "PRÉSENTIEL"}
                      </span>
                    </div>
                  </div>
                  <div className="class-actions">
                    <motion.button
                      onClick={() => handleJoinClass(classItem)}
                      className="join-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      {classItem.mode === "online" ? "Rejoindre" : "Localiser"}
                    </motion.button>
                    <motion.button
                      onClick={() => handleViewInfo(classItem)}
                      className="info-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      Infos
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="study-reminders"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4>Rappels d'étude</h4>
            <div className="reminders-list">
              <motion.div
                className="reminder-item"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <div className="reminder-icon">📚</div>
                <div className="reminder-content">
                  <p>Révision vocabulaire</p>
                  <span>Dans 2 heures</span>
                </div>
              </motion.div>
              <motion.div
                className="reminder-item"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <div className="reminder-icon">🎧</div>
                <div className="reminder-content">
                  <p>Écoute audio - Leçon 12</p>
                  <span>Demain 14:00</span>
                </div>
              </motion.div>
              <motion.div
                className="reminder-item"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <div className="reminder-icon">✍️</div>
                <div className="reminder-content">
                  <p>Exercices Present Perfect</p>
                  <span>Avant vendredi</span>
                </div>
              </motion.div>
              <motion.div
                className="reminder-item"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <div className="reminder-icon">🗣️</div>
                <div className="reminder-content">
                  <p>Pratique conversation</p>
                  <span>Ce weekend</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Notification flottante */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className={`floating-notification ${notification.type}`}
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="notification-icon">
              {notification.type === "success" && <IoCheckmarkCircleOutline />}
              {notification.type === "info" && <IoInformationCircleOutline />}
            </div>
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modale de localisation pour cours en présentiel */}
      <AnimatePresence>
        {showLocationModal && locationInfo && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) =>
              e.target === e.currentTarget && setShowLocationModal(false)
            }
          >
            <motion.div
              className="location-modal"
              initial={{ opacity: 0, scale: 0.9, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header">
                <h3>📍 Localisation du cours</h3>
                <button
                  className="modal-close"
                  onClick={() => setShowLocationModal(false)}
                >
                  <IoCloseOutline />
                </button>
              </div>

              <div className="modal-content">
                <div className="location-info">
                  <h4>{locationInfo.title}</h4>
                  <p className="course-time">⏰ {locationInfo.time}</p>
                  <p className="course-teacher">👨‍🏫 {locationInfo.teacher}</p>

                  <div className="location-details">
                    <div className="location-item">
                      <IoLocationOutline className="location-icon" />
                      <div>
                        <strong>{locationInfo.room}</strong>
                        <p>{locationInfo.building}</p>
                        <p>{locationInfo.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <motion.button
                  className="primary-btn"
                  onClick={() => {
                    setShowLocationModal(false);
                    showFloatingNotification(
                      "success",
                      "Itinéraire copié dans le presse-papiers"
                    );
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Obtenir l'itinéraire
                </motion.button>
                <motion.button
                  className="secondary-btn"
                  onClick={() => setShowLocationModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Fermer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modale Vidéo */}
      <AnimatePresence>
        {showVideoModal && selectedClassLocal && (
          <motion.div
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) =>
              e.target === e.currentTarget && setShowVideoModalLocal(false)
            }
          >
            <motion.div
              className="video-modal"
              initial={{ opacity: 0, scale: 0.9, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="video-modal-header">
                <h3>{selectedClassLocal.title}</h3>
                <button
                  className="video-modal-close"
                  onClick={() => setShowVideoModalLocal(false)}
                >
                  <IoCloseOutline />
                </button>
              </div>

              <div className="video-modal-content">
                <div className="video-main-area">
                  <div className="teacher-video-container">
                    <div className="video-placeholder">
                      <div className="teacher-avatar">
                        {selectedClassLocal.teacher
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <h4>{selectedClassLocal.teacher}</h4>
                      <p>Cours en direct</p>
                    </div>
                  </div>

                  <div className="video-controls">
                    <motion.button
                      className={`video-control-btn ${
                        videoControls.mic ? "active" : ""
                      }`}
                      onClick={toggleMic}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {videoControls.mic ? (
                        <IoMicOutline />
                      ) : (
                        <IoMicOffOutline />
                      )}
                    </motion.button>

                    <motion.button
                      className={`video-control-btn ${
                        videoControls.camera ? "active" : ""
                      }`}
                      onClick={toggleCamera}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {videoControls.camera ? (
                        <IoVideocamOutline />
                      ) : (
                        <IoVideocamOffOutline />
                      )}
                    </motion.button>

                    <motion.button
                      className="video-control-btn leave"
                      onClick={leaveCall}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IoCallOutline />
                    </motion.button>
                  </div>
                </div>

                <div className="video-sidebar">
                  <div className="class-info-section">
                    <h4>Informations du cours</h4>

                    <div className="class-info-item">
                      <div className="class-info-icon">
                        <IoTimeOutline />
                      </div>
                      <div className="class-info-text">
                        <p>Horaire</p>
                        <span>{selectedClassLocal.time}</span>
                      </div>
                    </div>

                    <div className="class-info-item">
                      <div className="class-info-icon">
                        <IoPersonOutline />
                      </div>
                      <div className="class-info-text">
                        <p>Professeur</p>
                        <span>{selectedClassLocal.teacher}</span>
                      </div>
                    </div>

                    <div className="class-info-item">
                      <div className="class-info-icon">
                        <IoGlobeOutline />
                      </div>
                      <div className="class-info-text">
                        <p>Plateforme</p>
                        <span>{selectedClassLocal.room}</span>
                      </div>
                    </div>

                    {selectedClassLocal.meetingId && (
                      <div className="class-info-item">
                        <div className="class-info-icon">
                          <IoInformationCircleOutline />
                        </div>
                        <div className="class-info-text">
                          <p>ID de réunion</p>
                          <span>{selectedClassLocal.meetingId}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="class-info-section">
                    <h4>Participants ({participants.length})</h4>
                    <div className="participants-list">
                      {participants.map((participant) => (
                        <div key={participant.id} className="participant-item">
                          <div className="participant-avatar">
                            {participant.avatar}
                          </div>
                          <div className="participant-name">
                            {participant.name}
                          </div>
                          <div className="participant-status"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Schedule;
