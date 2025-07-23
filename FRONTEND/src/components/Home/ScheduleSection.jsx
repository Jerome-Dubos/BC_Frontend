import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoChevronDownOutline,
  IoCloseOutline,
  IoDesktopOutline,
  IoPeopleOutline,
  IoSchoolOutline,
  IoStopwatchOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { translateScheduleData } from "../../utils/translationUtils";
import "./ScheduleSection.css";

/*
 * BACKEND INTEGRATION NOTES:
 *
 * 1. Services API à créer:
 *    - GET /api/courses/schedule?week={date}&type={presentiel|visio}
 *    - POST /api/courses/{courseId}/interest
 *    - GET /api/courses/{courseId}/details
 *
 * 2. Structure de données attendue du backend:
 *    Course {
 *      id: number,
 *      language: string,
 *      level: string (adulte, enfant),
 *      startTime: string (HH:MM),
 *      endTime: string (HH:MM),
 *      duration: string (1h, 1h30),
 *      teacher: string,
 *      maxStudents: number,
 *      enrolledStudents: number,
 *      type: 'presentiel' | 'visio',
 *      date: string (YYYY-MM-DD)
 *    }
 *
 * 3. État de chargement à gérer:
 *    - Loading states pour les appels API
 *    - Error handling
 *    - Refresh automatique des données
 *
 * 4. Fichiers à créer:
 *    - src/services/coursesService.js
 *    - src/hooks/useCourses.js (optionnel)
 */

// Composant Modal pour l'intérêt
const InterestModal = ({ course, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // États de validation
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Regex de validation
  const validationRegex = {
    name: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
  };

  // Formatage automatique du téléphone
  const formatPhoneNumber = (value) => {
    // Supprimer tous les caractères non numériques
    const numbers = value.replace(/\D/g, "");

    // Limiter à 10 chiffres maximum
    if (numbers.length > 10) {
      return value.slice(0, -1);
    }

    // Formatage français : 06 12 34 56 78
    if (numbers.length === 0) return "";
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4)
      return `${numbers.slice(0, 2)} ${numbers.slice(2)}`;
    if (numbers.length <= 6)
      return `${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(
        4
      )}`;
    if (numbers.length <= 8)
      return `${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(
        4,
        6
      )} ${numbers.slice(6)}`;
    return `${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(
      4,
      6
    )} ${numbers.slice(6, 8)} ${numbers.slice(8)}`;
  };

  // Empêcher le scroll de la page quand la modale est ouverte
  useEffect(() => {
    // Sauvegarder l'état original
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;
    const originalPosition = originalStyle.position;
    const originalTop = originalStyle.top;

    // Bloquer le scroll de manière plus robuste
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = "100%";

    // Nettoyer à la fermeture
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = "";

      // Restaurer la position de scroll
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
  }, []);

  // Gestion de la fermeture avec la touche Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Gestion du clic en dehors de la modale
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Empêcher le scroll sur le backdrop
  const handleBackdropScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Validation en temps réel
  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) {
        error = "Le nom est requis";
      } else if (!validationRegex.name.test(value.trim())) {
        error =
          "Le nom doit contenir entre 2 et 50 caractères (lettres et espaces uniquement)";
      }
    } else if (name === "email") {
      if (!value.trim()) {
        error = "L'email est requis";
      } else if (!validationRegex.email.test(value.trim())) {
        error = "Veuillez entrer un email valide";
      }
    } else if (name === "phone" && value.trim()) {
      // Vérifier si le numéro a exactement 10 chiffres
      const numbers = value.replace(/\D/g, "");
      if (numbers.length > 0 && numbers.length !== 10) {
        error = "Numéro incomplet";
      } else if (
        numbers.length === 10 &&
        !validationRegex.phone.test(value.trim())
      ) {
        error = "Format invalide. Exemple : 06 12 34 56 78";
      }
    }

    return error;
  };

  // Gestion des changements de formulaire avec validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;

    // Formatage automatique pour le téléphone
    if (name === "phone") {
      processedValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Validation en temps réel
    const error = validateField(name, processedValue);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Vérification si le formulaire est valide
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      !validationErrors.name &&
      !validationErrors.email &&
      !validationErrors.phone
    );
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation finale avant soumission
    const finalValidation = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
    };

    setValidationErrors(finalValidation);

    // Vérifier s'il y a des erreurs
    if (Object.values(finalValidation).some((error) => error)) {
      return;
    }

    console.log("Formulaire soumis:", { course, formData });
    // TODO: Backend Integration - POST /api/courses/{courseId}/interest
    onClose();
  };

  return (
    <div
      className="course-interest-modal-backdrop"
      onClick={handleBackdropClick}
      onWheel={handleBackdropScroll}
      onTouchMove={handleBackdropScroll}
    >
      <div className="course-interest-modal">
        {/* En-tête de la modale */}
        <div className="course-interest-modal__header">
          <h3 className="course-interest-modal__title">
            {t("home.schedule.modal.title", "Je suis intéressé(e)")}
          </h3>
          <button
            className="course-interest-modal__close"
            onClick={onClose}
            aria-label={t("common.close", "Fermer")}
          >
            <IoCloseOutline />
          </button>
        </div>

        {/* Informations du cours */}
        <div className="course-interest-modal__course-info">
          <div className="course-interest-modal__course-title">
            {course.language} - Niveau {course.level}
          </div>
          <div className="course-interest-modal__course-details">
            <div className="course-interest-modal__detail">
              <IoTimeOutline />
              <span>
                {course.startTime} - {course.endTime} ({course.duration})
              </span>
            </div>
            <div className="course-interest-modal__detail">
              <IoPeopleOutline />
              <span>
                {course.enrolledStudents}/{course.maxStudents} places
                disponibles
              </span>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <form className="course-interest-modal__form" onSubmit={handleSubmit}>
          <div className="course-interest-modal__form-group">
            <label
              htmlFor="name"
              className="course-interest-modal__label course-interest-modal__label--required"
            >
              {t("home.schedule.modal.name", "NOM")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`course-interest-modal__input ${
                validationErrors.name
                  ? "course-interest-modal__input--error"
                  : ""
              }`}
              placeholder="Votre nom complet"
            />
            {validationErrors.name && (
              <div className="course-interest-modal__error">
                {validationErrors.name}
              </div>
            )}
          </div>

          <div className="course-interest-modal__form-group">
            <label
              htmlFor="email"
              className="course-interest-modal__label course-interest-modal__label--required"
            >
              {t("home.schedule.modal.email", "EMAIL")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`course-interest-modal__input ${
                validationErrors.email
                  ? "course-interest-modal__input--error"
                  : ""
              }`}
              placeholder="votre.email@exemple.com"
            />
            {validationErrors.email && (
              <div className="course-interest-modal__error">
                {validationErrors.email}
              </div>
            )}
          </div>

          <div className="course-interest-modal__form-group">
            <label htmlFor="phone" className="course-interest-modal__label">
              {t("home.schedule.modal.phone", "TÉLÉPHONE")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              maxLength={14}
              className={`course-interest-modal__input ${
                validationErrors.phone
                  ? "course-interest-modal__input--error"
                  : ""
              }`}
              placeholder="06 12 34 56 78"
            />
            {validationErrors.phone && (
              <div className="course-interest-modal__error">
                {validationErrors.phone}
              </div>
            )}
          </div>

          <div className="course-interest-modal__form-group">
            <label htmlFor="message" className="course-interest-modal__label">
              {t("home.schedule.modal.message", "MESSAGE")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="course-interest-modal__textarea"
              rows="4"
              placeholder={t(
                "home.schedule.modal.messagePlaceholder",
                "Votre message (optionnel)"
              )}
            />
          </div>

          <div className="course-interest-modal__actions">
            <button
              type="button"
              className="course-interest-modal__btn-secondary"
              onClick={onClose}
            >
              {t("common.cancel", "Annuler")}
            </button>
            <button
              type="submit"
              className={`course-interest-modal__btn-primary ${
                !isFormValid()
                  ? "course-interest-modal__btn-primary--disabled"
                  : ""
              }`}
              disabled={!isFormValid()}
            >
              {t("home.schedule.modal.submit", "Envoyer")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ScheduleSection = () => {
  const { t } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [activeLevel, setActiveLevel] = useState("adult");

  const [activeType, setActiveType] = useState("presentiel");
  const [expandedDay, setExpandedDay] = useState(null);

  // États pour la gestion des données
  const [coursesData, setCoursesData] = useState(null);
  const [translatedCoursesData, setTranslatedCoursesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Backend Integration - Remplacer par un appel API
  // Cette fonction charge les données depuis le fichier JSON en attendant l'API
  // Une fois le backend prêt, remplacer par: await fetch('/api/courses/schedule')
  useEffect(() => {
    const loadCoursesData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Chargement depuis le fichier JSON public
        // TODO: Remplacer par l'URL de l'API backend
        const response = await fetch("/data/courses.json");

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
        }

        const data = await response.json();
        setCoursesData(data);

        // Traduire les données avec la langue actuelle
        const translated = translateScheduleData(data, t);
        setTranslatedCoursesData(translated);
      } catch (err) {
        console.error("Erreur lors du chargement des cours:", err);
        setError(err.message);
        // Fallback: données par défaut en cas d'erreur
        setCoursesData({ presentiel: {}, visio: {} });
        setTranslatedCoursesData({ presentiel: {}, visio: {} });
      } finally {
        setLoading(false);
      }
    };

    loadCoursesData();
  }, [t]);

  // Mettre à jour les traductions quand la langue change
  useEffect(() => {
    if (coursesData) {
      const translated = translateScheduleData(coursesData, t);
      setTranslatedCoursesData(translated);
    }
  }, [t, coursesData]);

  // Utilitaires pour la gestion des dates
  const getWeekDays = () => {
    const week = [];
    // Utiliser une date fixe pour correspondre aux données du JSON
    const startDate = new Date("2024-01-15"); // Lundi 15 janvier 2024

    for (let i = 0; i < 7; i++) {
      // On affiche tous les jours de la semaine (lundi à dimanche)
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // TODO: Backend Integration - Remplacer par un appel API pour manifester l'intérêt
  // Cette fonction devra envoyer les données à l'API backend
  const handleInterest = (course) => {
    console.log("Intérêt exprimé pour le cours:", course);
    // Futur: POST /api/courses/{courseId}/interest
    setSelectedCourse(course);
  };

  // Gestion de l'expansion des jours
  const handleDayClick = (dateStr) => {
    if (expandedDay === dateStr) {
      setExpandedDay(null);
    } else {
      setExpandedDay(dateStr);
    }
  };

  // Configuration des onglets de niveau (adulte/enfant)
  const levelTabs = [
    {
      id: "adult",
      label: t("home.schedule.levels.adult", "Cours adulte"),
      icon: <IoPeopleOutline />,
      description: "Pour les adultes",
    },
    {
      id: "child",
      label: t("home.schedule.levels.child", "Cours enfant"),
      icon: <IoSchoolOutline />,
      description: "Pour les enfants",
    },
  ];

  // Configuration des onglets de type (présentiel/visio)
  const typeTabs = [
    {
      id: "presentiel",
      label: t("home.schedule.tabs.presentiel", "Présentiel"),
      icon: <IoSchoolOutline />,
      description: t("home.schedule.types.presentiel", "En salle de classe"),
    },
    {
      id: "visio",
      label: t("home.schedule.tabs.visio", "Visioconférence"),
      icon: <IoDesktopOutline />,
      description: t("home.schedule.types.visio", "En ligne depuis chez vous"),
    },
  ];

  // Affichage pendant le chargement
  if (loading) {
    return (
      <section className="schedule-section">
        <div className="schedule-container">
          <div className="schedule-header">
            <div className="schedule-header__content">
              <h2>{t("home.schedule.title", "Planning des cours")}</h2>
              <p className="schedule-description">
                {t("common.loading", "Chargement en cours...")}
              </p>
            </div>
          </div>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <section className="schedule-section">
        <div className="schedule-container">
          <div className="schedule-header">
            <div className="schedule-header__content">
              <h2>{t("home.schedule.title", "Planning des cours")}</h2>
              <div className="error-message">
                <p>
                  {t(
                    "home.schedule.error",
                    "Erreur lors du chargement des données :"
                  )}
                </p>
                <span className="error-details">{error}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Récupération des données pour l'affichage
  const weekDays = getWeekDays();
  const currentCourses =
    translatedCoursesData?.[activeLevel]?.[activeType] || {};

  // Debug pour voir les données
  console.log("Debug ScheduleSection:", {
    coursesData,
    translatedCoursesData,
    activeLevel,
    activeType,
    currentCourses,
    weekDays: weekDays.map((day) => formatDate(day)),
  });

  return (
    <section id="schedule" className="schedule-section">
      <div className="schedule-container">
        {/* En-tête de section - Position modifiée */}
        <div className="schedule-header">
          <div className="schedule-header__content">
            <h2>{t("home.schedule.title", "Planning des cours")}</h2>
            <p className="schedule-description">
              {t(
                "home.schedule.description",
                "Découvrez nos cours disponibles en présentiel et en visioconférence"
              )}
            </p>
          </div>
        </div>

        {/* Filtres unifiés sur une ligne */}
        <div className="course-filters-container">
          {/* Onglets de niveau (adulte/enfant) */}
          <div className="course-level-selector">
            {levelTabs.map((tab) => (
              <button
                key={tab.id}
                className={`course-level-btn ${
                  activeLevel === tab.id ? "course-level-btn--active" : ""
                }`}
                onClick={() => setActiveLevel(tab.id)}
                aria-pressed={activeLevel === tab.id}
              >
                <div className="course-level-btn__icon">{tab.icon}</div>
                <div className="course-level-btn__content">
                  <span className="course-level-btn__title">{tab.label}</span>
                  <span className="course-level-btn__subtitle">
                    {tab.description}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Séparateur visuel */}
          <div className="course-filters-separator"></div>

          {/* Onglets de type (présentiel/visio) */}
          <div className="course-type-selector">
            {typeTabs.map((tab) => (
              <button
                key={tab.id}
                className={`course-type-btn ${
                  activeType === tab.id ? "course-type-btn--active" : ""
                }`}
                onClick={() => setActiveType(tab.id)}
                aria-pressed={activeType === tab.id}
              >
                <div className="course-type-btn__icon">{tab.icon}</div>
                <div className="course-type-btn__content">
                  <span className="course-type-btn__title">{tab.label}</span>
                  <span className="course-type-btn__subtitle">
                    {tab.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Planning de la semaine - Système d'expansion */}
        <div className="weekly-schedule">
          {/* Debug: Afficher toutes les données disponibles */}
          {Object.keys(currentCourses).length === 0 && (
            <div
              style={{ padding: "20px", color: "white", textAlign: "center" }}
            >
              <p>
                Debug: Aucun cours trouvé pour {activeLevel} - {activeType}
              </p>
              <p>
                Données disponibles:{" "}
                {JSON.stringify(Object.keys(coursesData || {}))}
              </p>
              {coursesData && coursesData[activeLevel] && (
                <p>
                  Niveaux disponibles:{" "}
                  {JSON.stringify(Object.keys(coursesData[activeLevel]))}
                </p>
              )}
            </div>
          )}

          <div className="weekdays-row">
            {weekDays.map((day) => {
              const dateStr = formatDate(day);
              const dayEvents = currentCourses[dateStr] || [];
              const hasEvents = dayEvents.length > 0;
              const isWeekend = day.getDay() === 0 || day.getDay() === 6;
              const isExpanded = expandedDay === dateStr;

              return (
                <div
                  key={dateStr}
                  className={`weekday-item ${hasEvents ? "has-events" : ""} ${
                    isWeekend ? "weekend" : ""
                  } ${isExpanded ? "expanded" : ""}`}
                >
                  {/* Jour cliquable */}
                  <button
                    className="weekday-button"
                    onClick={() => handleDayClick(dateStr)}
                    disabled={!hasEvents}
                  >
                    <div className="weekday-info">
                      <div className="weekday-name">
                        {day.toLocaleDateString("fr-FR", { weekday: "short" })}
                      </div>
                      <div className="weekday-date">
                        {day.toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </div>
                    </div>

                    {hasEvents && (
                      <div className="events-badge">{dayEvents.length}</div>
                    )}

                    {hasEvents && (
                      <div
                        className={`expand-icon ${
                          isExpanded ? "expanded" : ""
                        }`}
                      >
                        <IoChevronDownOutline />
                      </div>
                    )}
                  </button>

                  {/* Zone d'expansion pour les cours */}
                  {isExpanded && hasEvents && (
                    <div className="courses-expansion">
                      <div className="courses-list">
                        {dayEvents.map((course) => (
                          <article key={course.id} className="course-card">
                            {/* En-tête du cours */}
                            <header className="course-header">
                              <div className="course-title">
                                <h4 className="course-language">
                                  {t(course.languageKey)}
                                </h4>
                                <span
                                  className={`course-level ${
                                    course.levelKey === "levels.adult"
                                      ? "adulte"
                                      : "enfant"
                                  }`}
                                >
                                  {t(course.levelKey)}
                                </span>
                              </div>
                            </header>

                            {/* Détails du cours */}
                            <div className="course-details">
                              <div className="course-timing">
                                <div className="course-schedule">
                                  <IoTimeOutline />
                                  <span className="time-range">
                                    {course.startTime} - {course.endTime}
                                  </span>
                                </div>
                                <div className="course-duration">
                                  <IoStopwatchOutline />
                                  <span>{course.duration}</span>
                                </div>
                              </div>

                              <div className="course-capacity">
                                <IoPeopleOutline />
                                <span className="capacity-info">
                                  {course.enrolledStudents} /{" "}
                                  {course.maxStudents}
                                </span>
                                <span className="capacity-label">places</span>
                              </div>
                            </div>

                            {/* Bouton d'action */}
                            <div className="course-action">
                              <button
                                className={`btn-interest ${
                                  course.enrolledStudents >= course.maxStudents
                                    ? "disabled"
                                    : ""
                                }`}
                                onClick={() => handleInterest(course)}
                                disabled={
                                  course.enrolledStudents >= course.maxStudents
                                }
                              >
                                {course.enrolledStudents >= course.maxStudents
                                  ? t("home.schedule.fullCourse", "Complet")
                                  : t(
                                      "home.schedule.interestedButton",
                                      "Je m'inscris"
                                    )}
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modale d'intérêt */}
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
