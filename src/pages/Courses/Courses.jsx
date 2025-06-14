// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
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
  IoLanguageOutline,
  IoMailOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoPlayCircleOutline,
  IoPricetagOutline,
  IoSchoolOutline,
  IoStarOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import "./Courses.css";

const Courses = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");

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

  // Filtrage des cours
  const filteredCourses = courses.filter((course) => {
    return (
      (selectedLanguage === "all" || course.language === selectedLanguage) &&
      (selectedLevel === "all" || course.level.includes(selectedLevel)) &&
      (selectedFormat === "all" || course.format === selectedFormat)
    );
  });

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
      <section className="courses-hero">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Nos Cours & Programmes
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Découvrez notre large gamme de cours de langues adaptés à tous les
          niveaux et tous les objectifs.
        </motion.p>
      </section>

      {/* Filtres */}
      <section className="filters-section">
        <motion.div
          className="filters-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="filter-header">
            <IoFilterOutline size={24} />
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
                <option value="A1">Débutant (A1)</option>
                <option value="A2">Élémentaire (A2)</option>
                <option value="B1">Intermédiaire (B1)</option>
                <option value="B2">Intermédiaire+ (B2)</option>
                <option value="C1">Avancé (C1)</option>
                <option value="C2">Maîtrise (C2)</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Format</label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
              >
                <option value="all">Tous les formats</option>
                <option value="private">Cours particulier</option>
                <option value="group">Cours en groupe</option>
                <option value="intensive">Stage intensif</option>
              </select>
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
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
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

              <button className="course-btn">
                <IoPlayCircleOutline size={16} />
                S'inscrire
              </button>
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
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
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

              <button className="pricing-btn">
                <IoCardOutline size={16} />
                Choisir ce plan
              </button>
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
            <button className="step-btn">Faire le test</button>
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
            <button className="step-btn">Voir les cours</button>
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
            <button className="step-btn">S'inscrire</button>
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
            <button className="step-btn">Commencer</button>
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
              <button className="contact-btn primary">
                <IoCallOutline size={16} />
                +33 1 23 45 67 89
              </button>
              <button className="contact-btn secondary">
                <IoMailOutline size={16} />
                contact@boncours.fr
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Courses;
