// eslint-disable-next-line no-unused-vars
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFlagUsa } from "react-icons/fa";
import {
  IoBriefcaseOutline,
  IoCalendarOutline,
  IoCallOutline,
  IoCardOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoFilterOutline,
  IoFlagOutline,
  IoGlobeOutline,
  IoLanguageOutline,
  IoMailOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoPlayCircleOutline,
  IoPricetagOutline,
  IoRibbonOutline,
  IoSchoolOutline,
  IoStarOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

const Courses = () => {
  // Composant de compteur animé (déplacé à l'intérieur)
  const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (isInView) {
        let startTime;
        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min(
            (currentTime - startTime) / (duration * 1000),
            1
          );

          setCount(Math.floor(progress * end));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }
    }, [isInView, end, duration]);

    return (
      <span ref={ref}>
        {count}
        {suffix}
      </span>
    );
  };
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const navigate = useNavigate();

  // Statistiques dynamiques
  const stats = [
    {
      number: 1200,
      suffix: "+",
      label: t("courses.stats_students"),
      icon: <IoPeopleOutline size={32} />,
    },
    {
      number: 15,
      suffix: "",
      label: t("courses.stats_languages"),
      icon: <IoGlobeOutline size={32} />,
    },
    {
      number: 95,
      suffix: "%",
      label: t("courses.stats_success"),
      icon: <IoTrophyOutline size={32} />,
    },
    {
      number: 8,
      suffix: "",
      label: t("courses.stats_experience"),
      icon: <IoRibbonOutline size={32} />,
    },
  ];

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

  // Plans tarifaires
  const pricingPlans = [
    {
      name: t("courses.pricing_private_title"),
      price: "40€",
      period: t("courses.pricing_hour"),
      icon: <IoPersonOutline size={32} />,
      features: [
        t("courses.pricing_private_feature1"),
        t("courses.pricing_private_feature2"),
        t("courses.pricing_private_feature3"),
        t("courses.pricing_private_feature4"),
        t("courses.pricing_private_feature5"),
      ],
      popular: false,
    },
    {
      name: t("courses.pricing_group_title"),
      price: "299€",
      period: t("courses.pricing_quarter"),
      icon: <IoPeopleOutline size={32} />,
      features: [
        t("courses.pricing_group_feature1"),
        t("courses.pricing_group_feature2"),
        t("courses.pricing_group_feature3"),
        t("courses.pricing_group_feature4"),
        t("courses.pricing_group_feature5"),
      ],
      popular: true,
    },
    {
      name: t("courses.pricing_intensive_title"),
      price: "450€",
      period: t("courses.pricing_2weeks"),
      icon: <IoTrophyOutline size={32} />,
      features: [
        t("courses.pricing_intensive_feature1"),
        t("courses.pricing_intensive_feature2"),
        t("courses.pricing_intensive_feature3"),
        t("courses.pricing_intensive_feature4"),
        t("courses.pricing_intensive_feature5"),
      ],
      popular: false,
    },
    {
      name: t("courses.pricing_pro_title"),
      price: t("courses.pricing_quote"),
      period: "",
      icon: <IoBriefcaseOutline size={32} />,
      features: [
        t("courses.pricing_pro_feature1"),
        t("courses.pricing_pro_feature2"),
        t("courses.pricing_pro_feature3"),
        t("courses.pricing_pro_feature4"),
        t("courses.pricing_pro_feature5"),
      ],
      popular: false,
    },
  ];

  // Filtrage des cours optimisé
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      return (
        (selectedLanguage === "all" || course.language === selectedLanguage) &&
        (selectedLevel === "all" || course.level.includes(selectedLevel)) &&
        (selectedFormat === "all" || course.format === selectedFormat)
      );
    });
  }, [selectedLanguage, selectedLevel, selectedFormat]);

  // Fonction pour obtenir l'icône de la langue
  const getLanguageIcon = (language) => {
    switch (language) {
      case "french":
        return <IoFlagOutline size={20} style={{ color: "#0055A4" }} />;
      case "english":
        return <FaFlagUsa size={20} />;
      case "spanish":
        return <IoFlagOutline size={20} style={{ color: "#AA151B" }} />;
      case "german":
        return <IoFlagOutline size={20} style={{ color: "#000000" }} />;
      default:
        return <IoLanguageOutline size={20} />;
    }
  };

  // Fonction pour obtenir l'icône du format
  const getFormatIcon = (format) => {
    switch (format) {
      case "private":
        return <IoPersonOutline size={16} />;
      case "group":
        return <IoPeopleOutline size={16} />;
      case "intensive":
        return <IoTrophyOutline size={16} />;
      default:
        return <IoSchoolOutline size={16} />;
    }
  };

  return (
    <motion.div
      className="courses"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <motion.section className="courses-hero" style={{ y }} role="banner">
        <motion.div
          className="hero-background"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          aria-hidden="true"
        />
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            type: "spring",
            stiffness: 100,
          }}
        >
          {t("courses.hero_title")}
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            type: "spring",
            stiffness: 100,
          }}
        >
          {t("courses.hero_desc")}
        </motion.p>

        {/* Statistiques animées */}
        <motion.div
          className="hero-stats"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          role="region"
          aria-label="Statistiques de l'école"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              role="figure"
              aria-label={`${stat.number}${stat.suffix} ${stat.label}`}
            >
              <div className="stat-icon" aria-hidden="true">
                {stat.icon}
              </div>
              <div className="stat-number">
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Filtres */}
      <section
        className="filters-section"
        role="search"
        aria-label="Filtres de recherche"
      >
        <motion.div
          className="filters-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="filter-header">
            <IoFilterOutline size={24} aria-hidden="true" />
            <h3>{t("courses.filters_title")}</h3>
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="language-filter">
                {t("courses.filter_language")}
              </label>
              <select
                id="language-filter"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                aria-describedby="language-help"
              >
                <option value="all">{t("courses.filter_all_languages")}</option>
                <option value="french">{t("courses.filter_french")}</option>
                <option value="english">{t("courses.filter_english")}</option>
                <option value="spanish">{t("courses.filter_spanish")}</option>
                <option value="german">{t("courses.filter_german")}</option>
              </select>
              <div id="language-help" className="sr-only">
                Sélectionnez une langue pour filtrer les cours
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="level-filter">{t("courses.filter_level")}</label>
              <select
                id="level-filter"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                aria-describedby="level-help"
              >
                <option value="all">{t("courses.filter_all_levels")}</option>
                <option value="A1">{t("courses.filter_beginner")}</option>
                <option value="A2">{t("courses.filter_elementary")}</option>
                <option value="B1">{t("courses.filter_intermediate")}</option>
                <option value="B2">
                  {t("courses.filter_intermediate_plus")}
                </option>
                <option value="C1">{t("courses.filter_advanced")}</option>
                <option value="C2">{t("courses.filter_mastery")}</option>
              </select>
              <div id="level-help" className="sr-only">
                Sélectionnez un niveau pour filtrer les cours
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="format-filter">
                {t("courses.filter_format")}
              </label>
              <select
                id="format-filter"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                aria-describedby="format-help"
              >
                <option value="all">{t("courses.filter_all_formats")}</option>
                <option value="private">{t("courses.filter_private")}</option>
                <option value="group">{t("courses.filter_group")}</option>
                <option value="intensive">
                  {t("courses.filter_intensive")}
                </option>
              </select>
              <div id="format-help" className="sr-only">
                Sélectionnez un format pour filtrer les cours
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Catalogue des cours */}
      <section className="courses-catalog">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t("courses.catalog_title")} ({filteredCourses.length})
        </motion.h2>

        <div className="courses-grid">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              className="course-card"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="course-header">
                <div className="course-language">
                  {getLanguageIcon(course.language)}
                  <span>{course.title}</span>
                </div>
                <div className="course-level">{course.level}</div>
              </div>

              <div className="course-info">
                <div className="course-detail">
                  <IoTimeOutline size={16} />
                  <span>
                    {course.duration} • {course.hours}
                  </span>
                </div>
                <div className="course-detail">
                  <IoCalendarOutline size={16} />
                  <span>{course.sessions}</span>
                </div>
                <div className="course-detail">
                  {getFormatIcon(course.format)}
                  <span>
                    {course.format === "private" && t("courses.filter_private")}
                    {course.format === "group" && t("courses.filter_group")}
                    {course.format === "intensive" &&
                      t("courses.filter_intensive")}
                  </span>
                </div>
                <div className="course-detail">
                  <IoPersonOutline size={16} />
                  <span>{course.teacher}</span>
                </div>
              </div>

              <p className="course-description">{course.description}</p>

              <div className="course-features">
                {course.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">
                    <IoCheckmarkCircleOutline size={12} />
                    {feature}
                  </span>
                ))}
              </div>

              <div className="course-footer">
                <div className="course-price">
                  <IoPricetagOutline size={16} />
                  <span className="price">{course.price}</span>
                </div>
                <div className="course-start">
                  <IoCalendarOutline size={16} />
                  <span>
                    {t("courses.course_start")} {course.startDate}
                  </span>
                </div>
              </div>

              <motion.button
                className="course-btn"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(234, 189, 131, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label={`S'inscrire au cours ${course.title}`}
                onClick={() => {
                  // Navigation vers formulaire d'inscription
                }}
              >
                <IoPlayCircleOutline size={16} aria-hidden="true" />
                {t("courses.course_register")}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <motion.div
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <IoSchoolOutline size={48} />
            <h3>{t("courses.no_results_title")}</h3>
            <p>{t("courses.no_results_desc")}</p>
          </motion.div>
        )}
      </section>

      {/* Grilles tarifaires */}
      <section className="pricing-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t("courses.pricing_title")}
        </motion.h2>

        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
              initial={{ y: 50, opacity: 0, rotateX: 15 }}
              whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 80,
              }}
              whileHover={{
                y: -15,
                scale: 1.03,
                rotateY: plan.popular ? 0 : 3,
                transition: { duration: 0.3 },
              }}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <IoStarOutline size={16} />
                  {t("courses.pricing_popular")}
                </div>
              )}

              <div className="pricing-header">
                <div className="pricing-icon">{plan.icon}</div>
                <h3>{plan.name}</h3>
                <div className="pricing-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
              </div>

              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <IoCheckmarkCircleOutline size={16} />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                className="pricing-btn"
                whileHover={{
                  scale: 1.05,
                  backgroundImage:
                    "linear-gradient(135deg, var(--secondary-gold), var(--secondary-gold-light))",
                  boxShadow: "0 15px 35px rgba(234, 189, 131, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label={`Choisir le plan ${plan.name} à ${plan.price}${plan.period}`}
                onClick={() => {
                  // Navigation vers processus de commande
                }}
              >
                <IoCardOutline size={16} aria-hidden="true" />
                {t("courses.pricing_choose")}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modalités d'inscription */}
      <section className="enrollment-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t("courses.enrollment_title")}
        </motion.h2>

        <div className="enrollment-steps">
          <motion.div
            className="step-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="step-number">1</div>
            <div className="step-icon">
              <IoDocumentTextOutline size={32} />
            </div>
            <h3>{t("courses.enrollment_step1_title")}</h3>
            <p>{t("courses.enrollment_step1_desc")}</p>
            <motion.button
              className="step-btn"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(234, 189, 131, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              aria-label="Étape 1: Faire le test de niveau gratuitement"
              onClick={() => navigate("/test")}
            >
              {t("courses.enrollment_step1_btn")}
            </motion.button>
          </motion.div>

          <motion.div
            className="step-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="step-number">2</div>
            <div className="step-icon">
              <IoSchoolOutline size={32} />
            </div>
            <h3>{t("courses.enrollment_step2_title")}</h3>
            <p>{t("courses.enrollment_step2_desc")}</p>
            <motion.button
              className="step-btn"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(234, 189, 131, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              aria-label="Étape 2: Voir les cours disponibles et choisir"
              onClick={() => {
                // Scroll vers la section courses-catalog
                document
                  .querySelector(".courses-catalog")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("courses.enrollment_step2_btn")}
            </motion.button>
          </motion.div>

          <motion.div
            className="step-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="step-number">3</div>
            <div className="step-icon">
              <IoCardOutline size={32} />
            </div>
            <h3>{t("courses.enrollment_step3_title")}</h3>
            <p>{t("courses.enrollment_step3_desc")}</p>
            <motion.button
              className="step-btn"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(234, 189, 131, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              aria-label="Étape 3: S'inscrire et effectuer le paiement"
              onClick={() => {
                // Navigation vers formulaire d'inscription
              }}
            >
              {t("courses.enrollment_step3_btn")}
            </motion.button>
          </motion.div>

          <motion.div
            className="step-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="step-number">4</div>
            <div className="step-icon">
              <IoPlayCircleOutline size={32} />
            </div>
            <h3>{t("courses.enrollment_step4_title")}</h3>
            <p>{t("courses.enrollment_step4_desc")}</p>
            <motion.button
              className="step-btn"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(234, 189, 131, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              aria-label="Étape 4: Commencer l'apprentissage avec nos professeurs"
              onClick={() => {
                // Navigation vers dashboard/connexion
              }}
            >
              {t("courses.enrollment_step4_btn")}
            </motion.button>
          </motion.div>
        </div>

        {/* Informations pratiques */}
        <motion.div
          className="enrollment-info"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="info-grid">
            <div className="info-item">
              <IoCardOutline size={24} />
              <div>
                <h4>{t("courses.enrollment_payment_title")}</h4>
                <p>{t("courses.enrollment_payment_desc")}</p>
              </div>
            </div>
            <div className="info-item">
              <IoCheckmarkCircleOutline size={24} />
              <div>
                <h4>{t("courses.enrollment_commitment_title")}</h4>
                <p>{t("courses.enrollment_commitment_desc")}</p>
              </div>
            </div>
            <div className="info-item">
              <IoTrophyOutline size={24} />
              <div>
                <h4>{t("courses.enrollment_objectives_title")}</h4>
                <p>{t("courses.enrollment_objectives_desc")}</p>
              </div>
            </div>
            <div className="info-item">
              <IoCallOutline size={24} />
              <div>
                <h4>{t("courses.enrollment_support_title")}</h4>
                <p>{t("courses.enrollment_support_desc")}</p>
              </div>
            </div>
          </div>

          <div className="contact-cta">
            <h3>{t("courses.contact_question")}</h3>
            <p>{t("courses.contact_desc")}</p>
            <div className="contact-buttons">
              <motion.button
                className="contact-btn primary"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(234, 189, 131, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label="Appeler Bon Cours au +33 1 23 45 67 89"
                onClick={() => window.open("tel:+33123456789", "_self")}
              >
                <IoCallOutline size={16} aria-hidden="true" />
                +33 1 23 45 67 89
              </motion.button>
              <motion.button
                className="contact-btn secondary"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(234, 189, 131, 0.15)",
                  borderColor: "rgba(234, 189, 131, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label="Envoyer un email à contact@boncours.fr"
                onClick={() =>
                  window.open(
                    "mailto:contact@boncours.fr?subject=Demande%20d'information",
                    "_self"
                  )
                }
              >
                <IoMailOutline size={16} aria-hidden="true" />
                contact@boncours.fr
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Courses;
