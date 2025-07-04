import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoCloseOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoTimeOutline,
} from "react-icons/io5";
import "./ScheduleSection.css";

const InterestModal = ({ course, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémenter l'envoi du formulaire
    console.log("Formulaire soumis:", formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <IoCloseOutline />
        </button>
        <h3>
          {t("home.schedule.interestModal.title", "Je suis intéressé(e)")}
        </h3>
        <div className="course-summary">
          <h4>
            {course.language} - Niveau {course.level}
          </h4>
          <p>
            <IoTimeOutline /> {course.time}
          </p>
          <p>
            <IoLocationOutline /> {course.room}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t("common.name", "Nom")}</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t("common.email", "Email")}</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">{t("common.phone", "Téléphone")}</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">{t("common.message", "Message")}</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn-submit">
            {t("home.schedule.interestModal.submit", "Envoyer ma demande")}
          </button>
        </form>
      </div>
    </div>
  );
};

const ScheduleSection = () => {
  const { t } = useTranslation();
  const [currentWeek] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Données de démonstration pour les cours
  const courses = {
    "2024-01-15": [
      {
        id: 1,
        language: "Anglais",
        level: "B1",
        time: "14:00",
        teacher: "Prof. Smith",
        maxStudents: 12,
        enrolledStudents: 8,
        room: "Salle 101",
      },
    ],
    "2024-01-16": [
      {
        id: 2,
        language: "Français",
        level: "A2",
        time: "10:00",
        teacher: "Prof. Dubois",
        maxStudents: 10,
        enrolledStudents: 5,
        room: "Salle 202",
      },
    ],
    "2024-01-17": [
      {
        id: 3,
        language: "Espagnol",
        level: "B2",
        time: "16:00",
        teacher: "Prof. Garcia",
        maxStudents: 8,
        enrolledStudents: 7,
        room: "Salle 103",
      },
    ],
  };

  const getWeekDays = (date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
    startDate.setDate(diff);

    for (let i = 0; i < 5; i++) {
      // On affiche que les jours de semaine
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const weekDays = getWeekDays(currentWeek);

  const handleInterest = (course) => {
    setSelectedCourse(course);
  };

  return (
    <section className="schedule-section">
      <div className="schedule-container">
        <h2>{t("home.schedule.title", "Cours en présentiel disponibles")}</h2>
        <p className="schedule-description">
          {t(
            "home.schedule.description",
            "Découvrez nos cours en présentiel et leurs disponibilités"
          )}
        </p>

        <div className="schedule-grid">
          {weekDays.map((day) => {
            const dateStr = formatDate(day);
            const dayEvents = courses[dateStr] || [];

            return (
              <div key={dateStr} className="schedule-day">
                <h3 className="day-header">
                  {day.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </h3>
                <div className="day-events">
                  {dayEvents.length > 0 ? (
                    dayEvents.map((course) => (
                      <div key={course.id} className="course-card">
                        <h4>
                          {course.language} - Niveau {course.level}
                        </h4>
                        <div className="course-info">
                          <p>
                            <IoTimeOutline /> {course.time}
                          </p>
                          <p>
                            <IoLocationOutline /> {course.room}
                          </p>
                          <p>
                            <IoPersonOutline /> {course.enrolledStudents}/
                            {course.maxStudents} places
                          </p>
                        </div>
                        <button
                          className="btn-interest"
                          onClick={() => handleInterest(course)}
                          disabled={
                            course.enrolledStudents >= course.maxStudents
                          }
                        >
                          {course.enrolledStudents >= course.maxStudents
                            ? t("home.schedule.fullCourse", "Cours complet")
                            : t(
                                "home.schedule.interestedButton",
                                "Je suis intéressé(e)"
                              )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="no-events">
                      {t("home.schedule.noEvents", "Pas de cours ce jour")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCourse && (
        <InterestModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </section>
  );
};

export default ScheduleSection;
