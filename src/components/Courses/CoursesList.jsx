import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFlagUsa } from "react-icons/fa";
import {
  IoBriefcaseOutline,
  IoCalendarOutline,
  IoFilterOutline,
  IoFlagOutline,
  IoLanguageOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoPlayCircleOutline,
  IoPricetagOutline,
  IoRibbonOutline,
  IoSchoolOutline,
  IoStarOutline,
  IoTimeOutline,
} from "react-icons/io5";
import "./CoursesList.css";

const CoursesList = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");

  // Données des cours
  const courses = [
    {
      id: 1,
      title: t("courses.course_french_beginner_title"),
      language: "french",
      level: "A1-A2",
      format: "group",
      duration: t("courses.course_duration_3months"),
      sessions: t("courses.course_sessions_2week"),
      hours: "60h",
      price: "299€",
      teacher: t("courses.course_teacher_marie"),
      startDate: t("courses.course_start_jan15"),
      description: t("courses.course_french_beginner_desc"),
      features: [
        t("courses.course_french_beginner_feature1"),
        t("courses.course_french_beginner_feature2"),
        t("courses.course_french_beginner_feature3"),
        t("courses.course_french_beginner_feature4"),
      ],
    },
    {
      id: 2,
      title: t("courses.course_english_business_title"),
      language: "english",
      level: "B2-C1",
      format: "private",
      duration: t("courses.course_duration_2months"),
      sessions: t("courses.course_sessions_1week"),
      hours: "16h",
      price: "640€",
      teacher: t("courses.course_teacher_sarah"),
      startDate: t("courses.course_start_jan22"),
      description: t("courses.course_english_business_desc"),
      features: [
        t("courses.course_english_business_feature1"),
        t("courses.course_english_business_feature2"),
        t("courses.course_english_business_feature3"),
        t("courses.course_english_business_feature4"),
      ],
    },
    {
      id: 3,
      title: t("courses.course_spanish_intensive_title"),
      language: "spanish",
      level: "A2-B1",
      format: "intensive",
      duration: t("courses.course_duration_2weeks"),
      sessions: t("courses.course_sessions_daily"),
      hours: "40h",
      price: "450€",
      teacher: t("courses.course_teacher_carlos"),
      startDate: t("courses.course_start_feb5"),
      description: t("courses.course_spanish_intensive_desc"),
      features: [
        t("courses.course_spanish_intensive_feature1"),
        t("courses.course_spanish_intensive_feature2"),
        t("courses.course_spanish_intensive_feature3"),
        t("courses.course_spanish_intensive_feature4"),
      ],
    },
    {
      id: 4,
      title: t("courses.course_german_intermediate_title"),
      language: "german",
      level: "B1-B2",
      format: "group",
      duration: t("courses.course_duration_4months"),
      sessions: t("courses.course_sessions_2week"),
      hours: "80h",
      price: "399€",
      teacher: t("courses.course_teacher_anna"),
      startDate: t("courses.course_start_jan29"),
      description: t("courses.course_german_intermediate_desc"),
      features: [
        t("courses.course_german_intermediate_feature1"),
        t("courses.course_german_intermediate_feature2"),
        t("courses.course_german_intermediate_feature3"),
        t("courses.course_german_intermediate_feature4"),
      ],
    },
    {
      id: 5,
      title: t("courses.course_french_advanced_title"),
      language: "french",
      level: "C1-C2",
      format: "group",
      duration: t("courses.course_duration_6months"),
      sessions: t("courses.course_sessions_1week"),
      hours: "60h",
      price: "449€",
      teacher: t("courses.course_teacher_marie"),
      startDate: t("courses.course_start_feb12"),
      description: t("courses.course_french_advanced_desc"),
      features: [
        t("courses.course_french_advanced_feature1"),
        t("courses.course_french_advanced_feature2"),
        t("courses.course_french_advanced_feature3"),
        t("courses.course_french_advanced_feature4"),
      ],
    },
    {
      id: 6,
      title: t("courses.course_english_conversation_title"),
      language: "english",
      level: "B1-B2",
      format: "group",
      duration: t("courses.course_duration_3months"),
      sessions: t("courses.course_sessions_2week"),
      hours: "48h",
      price: "329€",
      teacher: t("courses.course_teacher_sarah"),
      startDate: t("courses.course_start_feb8"),
      description: t("courses.course_english_conversation_desc"),
      features: [
        t("courses.course_english_conversation_feature1"),
        t("courses.course_english_conversation_feature2"),
        t("courses.course_english_conversation_feature3"),
        t("courses.course_english_conversation_feature4"),
      ],
    },
  ];

  const getLanguageIcon = (language) => {
    switch (language) {
      case "english":
        return <FaFlagUsa />;
      case "french":
        return <IoFlagOutline />;
      case "spanish":
        return <IoFlagOutline />;
      case "german":
        return <IoFlagOutline />;
      default:
        return <IoLanguageOutline />;
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case "private":
        return <IoPersonOutline />;
      case "group":
        return <IoPeopleOutline />;
      case "intensive":
        return <IoRibbonOutline />;
      default:
        return <IoSchoolOutline />;
    }
  };

  // Filtrer les cours
  const filteredCourses = courses.filter((course) => {
    const languageMatch = selectedLanguage === "all" || course.language === selectedLanguage;
    const levelMatch = selectedLevel === "all" || course.level === selectedLevel;
    const formatMatch = selectedFormat === "all" || course.format === selectedFormat;
    return languageMatch && levelMatch && formatMatch;
  });

  return (
    <section className="courses-section">
      <motion.div
        className="filters-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="filters-header">
          <IoFilterOutline />
          <h3>Filtrer les cours</h3>
        </div>
        
        <div className="filters-grid">
          <div className="filter-group">
            <label>Langue</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="all">Toutes les langues</option>
              <option value="french">Français</option>
              <option value="english">Anglais</option>
              <option value="spanish">Espagnol</option>
              <option value="german">Allemand</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Niveau</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="all">Tous les niveaux</option>
              <option value="A1-A2">Débutant (A1-A2)</option>
              <option value="B1-B2">Intermédiaire (B1-B2)</option>
              <option value="C1-C2">Avancé (C1-C2)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              <option value="all">Tous les formats</option>
              <option value="group">Groupe</option>
              <option value="private">Cours particulier</option>
              <option value="intensive">Intensif</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="courses-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            className="course-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="course-header">
              <div className="course-badges">
                <span className="badge language">
                  {getLanguageIcon(course.language)}
                  {course.language}
                </span>
                <span className="badge level">{course.level}</span>
                <span className="badge format">
                  {getFormatIcon(course.format)}
                  {course.format}
                </span>
              </div>
              <div className="course-price">{course.price}</div>
            </div>

            <div className="course-content">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              
              <div className="course-details">
                <div className="detail-item">
                  <IoTimeOutline />
                  <span>{course.duration}</span>
                </div>
                <div className="detail-item">
                  <IoCalendarOutline />
                  <span>{course.sessions}</span>
                </div>
                <div className="detail-item">
                  <IoSchoolOutline />
                  <span>{course.hours}</span>
                </div>
                <div className="detail-item">
                  <IoPersonOutline />
                  <span>{course.teacher}</span>
                </div>
              </div>

              <div className="course-features">
                <h4>Ce qui est inclus :</h4>
                <ul>
                  {course.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <IoStarOutline />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="course-footer">
              <div className="course-start">
                <IoCalendarOutline />
                <span>Début : {course.startDate}</span>
              </div>
              <motion.button
                className="enroll-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IoPlayCircleOutline />
                S'inscrire
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredCourses.length === 0 && (
        <motion.div
          className="no-courses"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <IoFilterOutline />
          <h3>Aucun cours trouvé</h3>
          <p>Essayez de modifier vos filtres pour voir plus de cours.</p>
        </motion.div>
      )}
    </section>
  );
};

export default CoursesList; 