import { motion } from "framer-motion";
import React, { useState } from "react";
import "./Schedule.css";

const Schedule = ({
  setShowVideoModal,
  setShowClassInfoModal,
  setSelectedClass,
}) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

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

  const events = {
    "2024-01-15": [
      {
        id: 1,
        title: "Grammaire B1",
        time: "09:00",
        type: "grammar",
        teacher: "Prof. Martin",
        students: 12,
      },
    ],
    "2024-01-16": [
      {
        id: 2,
        title: "Conversation",
        time: "14:00",
        type: "conversation",
        teacher: "Prof. Dubois",
        students: 8,
      },
    ],
    "2024-01-17": [
      {
        id: 3,
        title: "Vocabulaire",
        time: "10:30",
        type: "vocabulary",
        teacher: "Prof. Leroy",
        students: 15,
      },
      {
        id: 4,
        title: "Écoute B2",
        time: "16:00",
        type: "listening",
        teacher: "Prof. Bernard",
        students: 10,
      },
    ],
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const isToday = (date) => {
    return formatDate(date) === formatDate(today);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + direction * 7);
    setCurrentWeek(newDate);
  };

  const handleClassClick = (event) => {
    setSelectedClass(event);
    setShowClassInfoModal(true);
  };

  return (
    <motion.div
      className="schedule-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="schedule-header">
        <h3>Planning de la semaine</h3>
        <div className="week-navigation">
          <button onClick={() => navigateWeek(-1)}>‹</button>
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
          <button onClick={() => navigateWeek(1)}>›</button>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
            (day, index) => (
              <div key={day} className="day-header">
                <span className="day-name">{day}</span>
                <span className="day-number">{weekDays[index].getDate()}</span>
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
                    className={`event ${event.type}`}
                    onClick={() => handleClassClick(event)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="event-time">{event.time}</div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-teacher">{event.teacher}</div>
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
            <motion.div className="class-item" whileHover={{ scale: 1.02 }}>
              <div className="class-info">
                <h5>Grammaire avancée</h5>
                <p>Demain à 14:00</p>
                <span className="class-type grammar">Grammaire</span>
              </div>
              <div className="class-actions">
                <button
                  onClick={() => {
                    setSelectedClass({
                      title: "Grammaire avancée",
                      teacher: "Prof. Martin",
                      time: "14:00",
                      students: 12,
                    });
                    setShowVideoModal(true);
                  }}
                  className="join-btn"
                >
                  Rejoindre
                </button>
                <button
                  onClick={() => {
                    setSelectedClass({
                      title: "Grammaire avancée",
                      teacher: "Prof. Martin",
                      time: "14:00",
                      students: 12,
                    });
                    setShowClassInfoModal(true);
                  }}
                  className="info-btn"
                >
                  Infos
                </button>
              </div>
            </motion.div>

            <motion.div className="class-item" whileHover={{ scale: 1.02 }}>
              <div className="class-info">
                <h5>Conversation B2</h5>
                <p>Mercredi à 10:30</p>
                <span className="class-type conversation">Conversation</span>
              </div>
              <div className="class-actions">
                <button
                  onClick={() => {
                    setSelectedClass({
                      title: "Conversation B2",
                      teacher: "Prof. Dubois",
                      time: "10:30",
                      students: 8,
                    });
                    setShowVideoModal(true);
                  }}
                  className="join-btn"
                >
                  Rejoindre
                </button>
                <button
                  onClick={() => {
                    setSelectedClass({
                      title: "Conversation B2",
                      teacher: "Prof. Dubois",
                      time: "10:30",
                      students: 8,
                    });
                    setShowClassInfoModal(true);
                  }}
                  className="info-btn"
                >
                  Infos
                </button>
              </div>
            </motion.div>
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
            <div className="reminder-item">
              <div className="reminder-icon">📚</div>
              <div className="reminder-content">
                <p>Révision vocabulaire</p>
                <span>Dans 2 heures</span>
              </div>
            </div>
            <div className="reminder-item">
              <div className="reminder-icon">🎧</div>
              <div className="reminder-content">
                <p>Écoute audio - Leçon 12</p>
                <span>Demain 14:00</span>
              </div>
            </div>
            <div className="reminder-item">
              <div className="reminder-icon">✍️</div>
              <div className="reminder-content">
                <p>Exercices Present Perfect</p>
                <span>Avant vendredi</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Schedule;
