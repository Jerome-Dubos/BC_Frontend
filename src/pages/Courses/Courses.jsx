// eslint-disable-next-line no-unused-vars
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
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

// Composant de compteur animé
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

const Courses = () => {
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
      label: "Étudiants formés",
      icon: <IoPeopleOutline size={32} />,
    },
    {
      number: 15,
      suffix: "",
      label: "Langues enseignées",
      icon: <IoGlobeOutline size={32} />,
    },
    {
      number: 95,
      suffix: "%",
      label: "Taux de réussite",
      icon: <IoTrophyOutline size={32} />,
    },
    {
      number: 8,
      suffix: "",
      label: "Années d'expérience",
      icon: <IoRibbonOutline size={32} />,
    },
  ];

  // Données des cours
  const courses = [
    {
      id: 1,
      title: "Français Débutant",
      language: "french",
      level: "A1-A2",
      format: "group",
      duration: "3 mois",
      sessions: "2 fois/semaine",
      hours: "60h",
      price: "299€",
      teacher: "Marie Dubois",
      startDate: "15 janvier 2024",
      description:
        "Apprenez les bases du français avec notre méthode interactive.",
      features: [
        "Grammaire de base",
        "Vocabulaire essentiel",
        "Conversation simple",
        "Culture française",
      ],
    },
    {
      id: 2,
      title: "English Business",
      language: "english",
      level: "B2-C1",
      format: "private",
      duration: "2 mois",
      sessions: "1 fois/semaine",
      hours: "16h",
      price: "640€",
      teacher: "Sarah Johnson",
      startDate: "22 janvier 2024",
      description: "Perfectionnez votre anglais professionnel.",
      features: [
        "Anglais des affaires",
        "Présentations",
        "Négociations",
        "Emails professionnels",
      ],
    },
    {
      id: 3,
      title: "Español Intensivo",
      language: "spanish",
      level: "A2-B1",
      format: "intensive",
      duration: "2 semaines",
      sessions: "Tous les jours",
      hours: "40h",
      price: "450€",
      teacher: "Carlos Rodriguez",
      startDate: "5 février 2024",
      description: "Stage intensif pour progresser rapidement en espagnol.",
      features: [
        "Immersion totale",
        "Conversation intensive",
        "Culture hispanique",
        "Certification",
      ],
    },
    {
      id: 4,
      title: "Deutsch Mittelstufe",
      language: "german",
      level: "B1-B2",
      format: "group",
      duration: "4 mois",
      sessions: "2 fois/semaine",
      hours: "80h",
      price: "399€",
      teacher: "Anna Schmidt",
      startDate: "29 janvier 2024",
      description: "Approfondissez vos connaissances en allemand.",
      features: [
        "Grammaire avancée",
        "Expression écrite",
        "Compréhension orale",
        "Culture allemande",
      ],
    },
    {
      id: 5,
      title: "Français Avancé",
      language: "french",
      level: "C1-C2",
      format: "group",
      duration: "6 mois",
      sessions: "1 fois/semaine",
      hours: "60h",
      price: "449€",
      teacher: "Marie Dubois",
      startDate: "12 février 2024",
      description: "Maîtrisez parfaitement la langue française.",
      features: [
        "Littérature française",
        "Débats",
        "Rédaction avancée",
        "Préparation DALF",
      ],
    },
    {
      id: 6,
      title: "English Conversation",
      language: "english",
      level: "B1-B2",
      format: "group",
      duration: "3 mois",
      sessions: "2 fois/semaine",
      hours: "48h",
      price: "329€",
      teacher: "Sarah Johnson",
      startDate: "8 février 2024",
      description: "Améliorez votre expression orale en anglais.",
      features: [
        "Conversation libre",
        "Débats",
        "Jeux de rôle",
        "Accent britannique",
      ],
    },
  ];

  // Plans tarifaires
  const pricingPlans = [
    {
      name: "Cours Particulier",
      price: "40€",
      period: "/heure",
      icon: <IoPersonOutline size={32} />,
      features: [
        "Cours personnalisé",
        "Horaires flexibles",
        "Progression rapide",
        "Attention individuelle",
        "Matériel inclus",
      ],
      popular: false,
    },
    {
      name: "Cours en Groupe",
      price: "299€",
      period: "/trimestre",
      icon: <IoPeopleOutline size={32} />,
      features: [
        "Groupes de 6-8 personnes",
        "Interaction sociale",
        "Méthode collaborative",
        "Prix avantageux",
        "Certificat de fin",
      ],
      popular: true,
    },
    {
      name: "Stage Intensif",
      price: "450€",
      period: "/2 semaines",
      icon: <IoTrophyOutline size={32} />,
      features: [
        "Immersion totale",
        "Progression accélérée",
        "Cours quotidiens",
        "Activités culturelles",
        "Certification officielle",
      ],
      popular: false,
    },
    {
      name: "Formation Pro",
      price: "Sur devis",
      period: "",
      icon: <IoBriefcaseOutline size={32} />,
      features: [
        "Programme sur mesure",
        "Formation en entreprise",
        "Objectifs spécifiques",
        "Suivi personnalisé",
        "Financement possible",
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
          Nos Cours & Programmes
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
          Découvrez notre large gamme de cours de langues adaptés à tous les
          niveaux et tous les objectifs.
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
            <h3>Filtrer les cours</h3>
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="language-filter">Langue</label>
              <select
                id="language-filter"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                aria-describedby="language-help"
              >
                <option value="all">Toutes les langues</option>
                <option value="french">Français</option>
                <option value="english">Anglais</option>
                <option value="spanish">Espagnol</option>
                <option value="german">Allemand</option>
              </select>
              <div id="language-help" className="sr-only">
                Sélectionnez une langue pour filtrer les cours
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="level-filter">Niveau</label>
              <select
                id="level-filter"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                aria-describedby="level-help"
              >
                <option value="all">Tous les niveaux</option>
                <option value="A1">Débutant (A1)</option>
                <option value="A2">Élémentaire (A2)</option>
                <option value="B1">Intermédiaire (B1)</option>
                <option value="B2">Intermédiaire+ (B2)</option>
                <option value="C1">Avancé (C1)</option>
                <option value="C2">Maîtrise (C2)</option>
              </select>
              <div id="level-help" className="sr-only">
                Sélectionnez un niveau pour filtrer les cours
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="format-filter">Format</label>
              <select
                id="format-filter"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                aria-describedby="format-help"
              >
                <option value="all">Tous les formats</option>
                <option value="private">Cours particulier</option>
                <option value="group">Cours en groupe</option>
                <option value="intensive">Stage intensif</option>
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
          Catalogue des cours ({filteredCourses.length})
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
                    {course.format === "private" && "Cours particulier"}
                    {course.format === "group" && "Cours en groupe"}
                    {course.format === "intensive" && "Stage intensif"}
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
                  <span>Début: {course.startDate}</span>
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
                S'inscrire
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
            <h3>Aucun cours trouvé</h3>
            <p>Essayez de modifier vos critères de recherche.</p>
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
          Nos tarifs
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
                  Populaire
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
                Choisir ce plan
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
          Comment s'inscrire ?
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
            <h3>Test de niveau</h3>
            <p>
              Évaluez gratuitement votre niveau actuel avec notre test en ligne
              ou en présentiel.
            </p>
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
              Faire le test
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
            <h3>Choix du cours</h3>
            <p>
              Sélectionnez le cours qui correspond à vos objectifs et votre
              emploi du temps.
            </p>
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
              Voir les cours
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
            <h3>Inscription</h3>
            <p>
              Remplissez le formulaire d'inscription et effectuez le paiement
              sécurisé.
            </p>
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
              S'inscrire
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
            <h3>Début des cours</h3>
            <p>
              Commencez votre apprentissage avec nos professeurs expérimentés.
            </p>
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
              Commencer
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
                <h4>Paiement flexible</h4>
                <p>Possibilité de paiement en 3 fois sans frais</p>
              </div>
            </div>
            <div className="info-item">
              <IoCheckmarkCircleOutline size={24} />
              <div>
                <h4>Sans engagement</h4>
                <p>Aucun prérequis, tous les niveaux acceptés</p>
              </div>
            </div>
            <div className="info-item">
              <IoTrophyOutline size={24} />
              <div>
                <h4>Objectifs clairs</h4>
                <p>Progression mesurable et certification</p>
              </div>
            </div>
            <div className="info-item">
              <IoCallOutline size={24} />
              <div>
                <h4>Support inclus</h4>
                <p>Accompagnement personnalisé tout au long</p>
              </div>
            </div>
          </div>

          <div className="contact-cta">
            <h3>Des questions ?</h3>
            <p>Notre équipe est là pour vous accompagner dans votre choix.</p>
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
