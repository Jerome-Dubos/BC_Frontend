import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoAddCircleOutline,
  IoArrowBack,
  IoArrowForward,
  IoCalendarOutline,
  IoCheckmarkCircle,
  IoCloseOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoTimeOutline,
} from "react-icons/io5";
import "./Schedule.css";

const Schedule = () => {
  const { t } = useTranslation();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [newCourse, setNewCourse] = useState({
    title: "",
    language: "english",
    level: "A1",
    date: "",
    time: "",
    maxStudents: 10,
    room: "",
    mode: "offline",
  });

  // Données de démonstration enrichies
  const [courses, setCourses] = useState({
    "2024-01-15": [
      {
        id: 1,
        title: "Anglais - Conversation B1",
        language: "english",
        level: "B1",
        time: "14:00",
        teacher: "Prof. Smith",
        maxStudents: 12,
        enrolledStudents: 8,
        room: "Salle 101",
        mode: "offline",
        enrolled: false,
      },
      {
        id: 2,
        title: "Français - Grammaire A2",
        language: "french",
        level: "A2",
        time: "10:00",
        teacher: "Prof. Dubois",
        maxStudents: 10,
        enrolledStudents: 5,
        room: "Salle 202",
        mode: "offline",
        enrolled: true,
      },
    ],
    "2024-01-16": [
      {
        id: 3,
        title: "Espagnol - Conversation B2",
        language: "spanish",
        level: "B2",
        time: "16:00",
        teacher: "Prof. Garcia",
        maxStudents: 8,
        enrolledStudents: 7,
        room: "Salle 103",
        mode: "offline",
        enrolled: false,
      },
      {
        id: 4,
        title: "Allemand - Débutant A1",
        language: "german",
        level: "A1",
        time: "11:00",
        teacher: "Prof. Schmidt",
        maxStudents: 10,
        enrolledStudents: 3,
        room: "Salle 104",
        mode: "offline",
        enrolled: false,
      },
    ],
    "2024-01-17": [
      {
        id: 5,
        title: "Anglais - Business B2",
        language: "english",
        level: "B2",
        time: "09:00",
        teacher: "Prof. Johnson",
        maxStudents: 8,
        enrolledStudents: 6,
        room: "Salle 201",
        mode: "offline",
        enrolled: true,
      },
    ],
    "2024-01-18": [
      {
        id: 6,
        title: "Français - Culture C1",
        language: "french",
        level: "C1",
        time: "15:00",
        teacher: "Prof. Martin",
        maxStudents: 6,
        enrolledStudents: 4,
        room: "Salle 301",
        mode: "offline",
        enrolled: false,
      },
      {
        id: 7,
        title: "Espagnol - Débutant A1",
        language: "spanish",
        level: "A1",
        time: "18:00",
        teacher: "Prof. Rodriguez",
        maxStudents: 12,
        enrolledStudents: 5,
        room: "Salle 102",
        mode: "offline",
        enrolled: false,
      },
    ],
    "2024-01-19": [
      {
        id: 8,
        title: "Allemand - Culture B1",
        language: "german",
        level: "B1",
        time: "13:00",
        teacher: "Prof. Weber",
        maxStudents: 8,
        enrolledStudents: 7,
        room: "Salle 203",
        mode: "offline",
        enrolled: true,
      },
    ],
    "2024-01-20": [
      {
        id: 9,
        title: "Anglais - TOEIC Prep",
        language: "english",
        level: "B2",
        time: "10:00",
        teacher: "Prof. Wilson",
        maxStudents: 15,
        enrolledStudents: 12,
        room: "Salle 401",
        mode: "offline",
        enrolled: false,
      },
    ],
    "2024-01-21": [
      {
        id: 10,
        title: "Français - Conversation C2",
        language: "french",
        level: "C2",
        time: "14:00",
        teacher: "Prof. Petit",
        maxStudents: 6,
        enrolledStudents: 3,
        room: "Salle 302",
        mode: "offline",
        enrolled: false,
      },
      {
        id: 11,
        title: "Espagnol - Business B2",
        language: "spanish",
        level: "B2",
        time: "16:00",
        teacher: "Prof. Lopez",
        maxStudents: 8,
        enrolledStudents: 6,
        room: "Salle 204",
        mode: "offline",
        enrolled: true,
      },
    ],
  });

  const handleCreateCourse = () => {
    const dateStr = newCourse.date;
    const newId =
      Math.max(
        ...Object.values(courses)
          .flat()
          .map((c) => c.id),
        0
      ) + 1;

    const courseToAdd = {
      ...newCourse,
      id: newId,
      enrolledStudents: 0,
      teacher: "Prof. Smith", // À remplacer par le prof connecté
      enrolled: false,
    };

    setCourses((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), courseToAdd],
    }));

    setShowCreateModal(false);
    showFloatingNotification(
      "success",
      t("schedule.notifications.courseCreated")
    );
    setNewCourse({
      title: "",
      language: "english",
      level: "A1",
      date: "",
      time: "",
      maxStudents: 10,
      room: "",
      mode: "offline",
    });
  };

  const handleEnrollment = (courseId, dateStr) => {
    setCourses((prev) => {
      const updatedCourses = { ...prev };
      const courseIndex = updatedCourses[dateStr].findIndex(
        (c) => c.id === courseId
      );

      if (courseIndex !== -1) {
        const course = updatedCourses[dateStr][courseIndex];

        if (!course.enrolled && course.enrolledStudents < course.maxStudents) {
          course.enrolledStudents += 1;
          course.enrolled = true;
          showFloatingNotification(
            "success",
            t("schedule.notifications.enrolled")
          );
        } else if (course.enrolled) {
          course.enrolledStudents -= 1;
          course.enrolled = false;
          showFloatingNotification(
            "info",
            t("schedule.notifications.unenrolled")
          );
        } else {
          showFloatingNotification("error", t("schedule.notifications.full"));
          return prev;
        }
      }

      return updatedCourses;
    });
  };

  const showFloatingNotification = (type, message) => {
    setNotification({ type, message });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
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

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + direction * 7);
    setCurrentWeek(newDate);
  };

  const weekDays = getWeekDays(currentWeek);

  return (
    <div className="schedule-dashboard">
      <div className="schedule-header">
        <h2 className="schedule-title">
          <IoCalendarOutline />
          {t("schedule.title")}
        </h2>
        <div className="schedule-navigation">
          <div className="week-selector">
            <button className="nav-button" onClick={() => navigateWeek(-1)}>
              <IoArrowBack />
            </button>
            <span>
              {weekDays[0].toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
              })}
              {" - "}
              {weekDays[6].toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
              })}
            </span>
            <button className="nav-button" onClick={() => navigateWeek(1)}>
              <IoArrowForward />
            </button>
          </div>
          <button
            className="add-course-btn"
            onClick={() => setShowCreateModal(true)}
          >
            <IoAddCircleOutline />
            {t("schedule.addCourse")}
          </button>
        </div>
      </div>

      <div className="schedule-container">
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
                  })}
                </h3>
                <div className="day-events">
                  {dayEvents.length > 0 ? (
                    dayEvents.map((course) => (
                      <div key={course.id} className="course-card">
                        <div className="course-header">
                          <h4 className="course-title">{course.title}</h4>
                          <span className="course-level">{course.level}</span>
                        </div>
                        <div className="course-info">
                          <p className="info-item">
                            <IoTimeOutline />
                            {course.time}
                          </p>
                          <p className="info-item">
                            <IoLocationOutline />
                            {course.room}
                          </p>
                          <p className="info-item">
                            <IoPersonOutline />
                            {course.enrolledStudents}/{course.maxStudents}
                          </p>
                          <p className="info-item">
                            <IoSchoolOutline />
                            {course.teacher}
                          </p>
                        </div>
                        <div className="course-actions">
                          {course.enrolled ? (
                            <button
                              className="action-button btn-enrolled"
                              onClick={() =>
                                handleEnrollment(course.id, dateStr)
                              }
                            >
                              <IoCheckmarkCircle />
                              {t("schedule.enrolled")}
                            </button>
                          ) : course.enrolledStudents >= course.maxStudents ? (
                            <button className="action-button btn-full" disabled>
                              {t("schedule.full")}
                            </button>
                          ) : (
                            <button
                              className="action-button btn-enroll"
                              onClick={() =>
                                handleEnrollment(course.id, dateStr)
                              }
                            >
                              {t("schedule.enroll")}
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-events">{t("schedule.noEvents")}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{t("schedule.createCourse")}</h3>
              <button
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                <IoCloseOutline />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateCourse();
              }}
            >
              <div className="form-group">
                <label htmlFor="title">{t("schedule.form.title")}</label>
                <input
                  type="text"
                  id="title"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="language">{t("schedule.form.language")}</label>
                <select
                  id="language"
                  value={newCourse.language}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, language: e.target.value })
                  }
                >
                  <option value="english">English</option>
                  <option value="french">Français</option>
                  <option value="spanish">Español</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="level">{t("schedule.form.level")}</label>
                <select
                  id="level"
                  value={newCourse.level}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, level: e.target.value })
                  }
                >
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">{t("schedule.form.date")}</label>
                <input
                  type="date"
                  id="date"
                  value={newCourse.date}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, date: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">{t("schedule.form.time")}</label>
                <input
                  type="time"
                  id="time"
                  value={newCourse.time}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, time: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxStudents">
                  {t("schedule.form.maxStudents")}
                </label>
                <input
                  type="number"
                  id="maxStudents"
                  min="1"
                  max="20"
                  value={newCourse.maxStudents}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      maxStudents: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="room">{t("schedule.form.room")}</label>
                <input
                  type="text"
                  id="room"
                  value={newCourse.room}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, room: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowCreateModal(false)}
                >
                  {t("common.cancel")}
                </button>
                <button type="submit" className="btn-submit">
                  {t("common.create")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showNotification && (
          <motion.div
            className={`notification ${notification.type}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schedule;
