import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaAward,
  FaBookOpen,
  FaCertificate,
  FaChalkboardTeacher,
  FaCheck,
  FaChild,
  FaClock,
  FaComments,
  FaEnvelope,
  FaGlobe,
  FaGraduationCap,
  FaPhone,
  FaSpinner,
  FaStar,
  FaTimes,
  FaUser,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { MdGroup, MdSchool } from "react-icons/md";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./Courses.css";

const Courses = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("adult");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    message: "",
    preferenceContact: "email",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isHiding, setIsHiding] = useState(false);
  // Données des cours basées sur HeroSection
  const coursesData = [
    // Cours pour adultes
    {
      id: 1,
      name: t("languages.french"),
      flag: "🇫🇷",
      type: "adult",
      description:
        "Cours de français pour adultes, tous niveaux. Approche communicative et personnalisée.",
      features: [
        { icon: FaUsers, text: "8 élèves max par groupe" },
        { icon: FaClock, text: "1h30 par séance" },
        { icon: FaGraduationCap, text: "Tous niveaux" },
      ],
      price: 25,
      teacher: "Marie Dubois",
      duration: "30 séances",
      level: "Tous niveaux",
      schedule: "Mardi et Jeudi 18h-19h30",
      objectives: [
        "Maîtriser la grammaire française",
        "Développer l'expression orale",
        "Améliorer la compréhension écrite",
        "Préparer les certifications",
      ],
    },
    {
      id: 2,
      name: t("languages.english"),
      flag: "🇬🇧",
      type: "adult",
      description:
        "Cours d'anglais pour adultes avec préparation aux certifications internationales.",
      features: [
        { icon: FaUsers, text: "8 élèves max par groupe" },
        { icon: FaClock, text: "1h30 par séance" },
        { icon: FaCertificate, text: "Préparation TOEIC/TOEFL" },
      ],
      price: 28,
      teacher: "Sarah Johnson",
      duration: "30 séances",
      level: "Tous niveaux",
      schedule: "Lundi et Mercredi 19h-20h30",
      objectives: [
        "Préparation aux examens internationaux",
        "Anglais professionnel",
        "Conversation fluide",
        "Grammaire avancée",
      ],
    },
    {
      id: 3,
      name: t("languages.spanish"),
      flag: "🇪🇸",
      type: "adult",
      description:
        "Cours d'espagnol avec approche communicative et culture hispanique.",
      features: [
        { icon: FaUsers, text: "6 élèves max par groupe" },
        { icon: FaClock, text: "1h30 par séance" },
        { icon: FaGlobe, text: "Culture hispanique" },
      ],
      price: 22,
      teacher: "Carlos Rodriguez",
      duration: "30 séances",
      level: "Tous niveaux",
      schedule: "Mardi et Jeudi 20h-21h30",
      objectives: [
        "Apprendre l'espagnol d'Espagne",
        "Découvrir la culture hispanique",
        "Conversation pratique",
        "Grammaire et vocabulaire",
      ],
    },
    {
      id: 4,
      name: t("languages.german"),
      flag: "🇩🇪",
      type: "adult",
      description:
        "Cours d'allemand structuré avec approche méthodique et culture germanique.",
      features: [
        { icon: FaUsers, text: "8 élèves max par groupe" },
        { icon: FaClock, text: "1h30 par séance" },
        { icon: FaGraduationCap, text: "Méthode structurée" },
      ],
      price: 26,
      teacher: "Hans Mueller",
      duration: "30 séances",
      level: "Tous niveaux",
      schedule: "Vendredi 16h-17h30",
      objectives: [
        "Maîtriser la grammaire allemande",
        "Préparation aux examens Goethe",
        "Culture germanique",
        "Allemand professionnel",
      ],
    },
    {
      id: 5,
      name: t("languages.turkish"),
      flag: "🇹🇷",
      type: "adult",
      description: "Découvrez la langue turque et sa culture fascinante.",
      features: [
        { icon: FaUsers, text: "6 élèves max par groupe" },
        { icon: FaClock, text: "1h30 par séance" },
        { icon: FaGlobe, text: "Culture turque" },
      ],
      price: 20,
      teacher: "Ayşe Yılmaz",
      duration: "30 séances",
      level: "Débutant à intermédiaire",
      schedule: "Samedi 10h-11h30",
      objectives: [
        "Apprendre l'alphabet turc",
        "Grammaire de base",
        "Conversation quotidienne",
        "Culture turque",
      ],
    },
    {
      id: 6,
      name: t("languages.arabic"),
      flag: "🇸🇦",
      type: "adult",
      description:
        "Cours d'arabe classique et moderne avec approche culturelle et linguistique.",
      features: [
        { icon: FaUsers, text: "6 élèves max par groupe" },
        { icon: FaClock, text: "1h30 par séance" },
        { icon: FaGlobe, text: "Arabe classique et moderne" },
      ],
      price: 24,
      teacher: "Ahmed Hassan",
      duration: "30 séances",
      level: "Tous niveaux",
      schedule: "Dimanche 14h-15h30",
      objectives: [
        "Apprendre l'alphabet arabe",
        "Arabe classique et dialectal",
        "Calligraphie arabe",
        "Culture du monde arabe",
      ],
    },
    {
      id: 7,
      name: t("languages.greek"),
      flag: "🇬🇷",
      type: "adult",
      description:
        "Plongez dans la langue grecque moderne et son héritage culturel millénaire.",
      features: [
        { icon: FaUsers, text: "6 élèves max par groupe" },
        { icon: FaClock, text: "1h30 par séance" },
        { icon: FaGlobe, text: "Culture grecque" },
      ],
      price: 23,
      teacher: "Eleni Papadopoulos",
      duration: "30 séances",
      level: "Débutant à intermédiaire",
      schedule: "Mercredi 19h-20h30",
      objectives: [
        "Alphabet grec moderne",
        "Grammaire de base",
        "Conversation pratique",
        "Histoire et culture grecques",
      ],
    },
    // Cours pour enfants
    {
      id: 8,
      name: t("languages.french"),
      flag: "🇫🇷",
      type: "child",
      description:
        "Cours de français ludique pour enfants avec approche par le jeu.",
      features: [
        { icon: FaChild, text: "6 enfants max par groupe" },
        { icon: FaClock, text: "1h par séance" },
        { icon: FaStar, text: "Approche ludique" },
      ],
      price: 15,
      teacher: "Sophie Martin",
      duration: "30 séances",
      level: "6-12 ans",
      schedule: "Mercredi 14h-15h",
      objectives: [
        "Découverte du français par le jeu",
        "Chansons et comptines",
        "Vocabulaire de base",
        "Confiance à l'oral",
      ],
    },
    {
      id: 9,
      name: t("languages.english"),
      flag: "🇬🇧",
      type: "child",
      description:
        "Cours d'anglais ludique pour enfants avec approche par le jeu.",
      features: [
        { icon: FaChild, text: "6 enfants max par groupe" },
        { icon: FaClock, text: "1h par séance" },
        { icon: FaStar, text: "Approche ludique" },
      ],
      price: 15,
      teacher: "Emma Wilson",
      duration: "30 séances",
      level: "6-12 ans",
      schedule: "Mercredi 14h-15h",
      objectives: [
        "Découverte de l'anglais par le jeu",
        "Chansons et comptines",
        "Vocabulaire de base",
        "Confiance à l'oral",
      ],
    },
    {
      id: 10,
      name: t("languages.spanish"),
      flag: "🇪🇸",
      type: "child",
      description: "Cours d'espagnol pour enfants avec activités interactives.",
      features: [
        { icon: FaChild, text: "4 enfants max par groupe" },
        { icon: FaClock, text: "1h par séance" },
        { icon: FaStar, text: "Activités interactives" },
      ],
      price: 12,
      teacher: "Ana Garcia",
      duration: "30 séances",
      level: "8-14 ans",
      schedule: "Samedi 10h-11h",
      objectives: [
        "Espagnol par les histoires",
        "Jeux interactifs",
        "Culture hispanique",
        "Expression créative",
      ],
    },
    {
      id: 11,
      name: t("languages.german"),
      flag: "🇩🇪",
      type: "child",
      description:
        "Cours d'allemand pour enfants avec approche ludique et culturelle.",
      features: [
        { icon: FaChild, text: "6 enfants max par groupe" },
        { icon: FaClock, text: "1h par séance" },
        { icon: FaStar, text: "Approche ludique" },
      ],
      price: 14,
      teacher: "Klaus Weber",
      duration: "30 séances",
      level: "8-14 ans",
      schedule: "Samedi 11h-12h",
      objectives: [
        "Découverte de l'allemand par le jeu",
        "Culture germanique",
        "Vocabulaire de base",
        "Confiance à l'oral",
      ],
    },
    {
      id: 12,
      name: t("languages.turkish"),
      flag: "🇹🇷",
      type: "child",
      description:
        "Cours de turc pour enfants avec approche ludique et culturelle.",
      features: [
        { icon: FaChild, text: "6 enfants max par groupe" },
        { icon: FaClock, text: "1h par séance" },
        { icon: FaStar, text: "Approche ludique" },
      ],
      price: 13,
      teacher: "Ayşe Yılmaz",
      duration: "30 séances",
      level: "8-14 ans",
      schedule: "Samedi 14h-15h",
      objectives: [
        "Découverte de la culture turque",
        "Vocabulaire de base",
        "Chansons et jeux",
        "Confiance à l'oral",
      ],
    },
    {
      id: 13,
      name: t("languages.arabic"),
      flag: "🇸🇦",
      type: "child",
      description:
        "Cours d'arabe pour enfants avec approche ludique et culturelle.",
      features: [
        { icon: FaChild, text: "6 enfants max par groupe" },
        { icon: FaClock, text: "1h par séance" },
        { icon: FaStar, text: "Approche ludique" },
      ],
      price: 14,
      teacher: "Ahmed Hassan",
      duration: "30 séances",
      level: "8-14 ans",
      schedule: "Dimanche 10h-11h",
      objectives: [
        "Découverte de l'alphabet arabe",
        "Culture du monde arabe",
        "Vocabulaire de base",
        "Confiance à l'oral",
      ],
    },
    {
      id: 14,
      name: t("languages.greek"),
      flag: "🇬🇷",
      type: "child",
      description:
        "Cours de grec pour enfants avec approche ludique et culturelle.",
      features: [
        { icon: FaChild, text: "6 enfants max par groupe" },
        { icon: FaClock, text: "1h par séance" },
        { icon: FaStar, text: "Approche ludique" },
      ],
      price: 13,
      teacher: "Eleni Papadopoulos",
      duration: "30 séances",
      level: "8-14 ans",
      schedule: "Samedi 16h-17h",
      objectives: [
        "Découverte de la culture grecque",
        "Vocabulaire de base",
        "Chansons et jeux",
        "Confiance à l'oral",
      ],
    },
    {
      id: 15,
      name: "Soutien Scolaire",
      icon: FaChalkboardTeacher,
      type: "child",
      description:
        "Accompagnement scolaire personnalisé de la primaire au lycée.",
      features: [
        { icon: FaUsers, text: "6 élèves max par groupe" },
        { icon: FaClock, text: "1h par séance" },
        { icon: MdSchool, text: "Primaire au lycée" },
      ],
      price: 18,
      teacher: "Équipe pédagogique",
      duration: "30 séances",
      level: "Primaire au lycée",
      schedule: "Après-midi et mercredi",
      objectives: [
        "Soutien dans toutes les matières",
        "Méthodologie de travail",
        "Préparation aux examens",
        "Confiance en soi",
      ],
    },
  ];

  // Étapes du parcours de formation
  const courseSteps = [
    {
      number: 1,
      title: "Évaluation initiale",
      description:
        "Test de niveau personnalisé pour déterminer vos objectifs et votre niveau actuel.",
      icon: FaBookOpen,
    },
    {
      number: 2,
      title: "Plan de formation",
      description:
        "Élaboration d'un programme sur mesure adapté à vos besoins et objectifs.",
      icon: FaGraduationCap,
    },
    {
      number: 3,
      title: "Cours en groupe",
      description:
        "Séances interactives en petits groupes pour progresser ensemble.",
      icon: MdGroup,
    },
    {
      number: 4,
      title: "Suivi personnalisé",
      description:
        "Bilans réguliers et ajustements du programme selon vos progrès.",
      icon: FaComments,
    },
    {
      number: 5,
      title: "Évaluation finale",
      description:
        "Test de fin de formation pour mesurer vos acquis et progrès.",
      icon: FaCheck,
    },
    {
      number: 6,
      title: "Diplôme de fin de formation",
      description: "Obtention de votre certificat de formation reconnu.",
      icon: FaAward,
    },
  ];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleInterestClick = () => {
    setShowInterestForm(true);
  };

  const closeInterestForm = () => {
    setShowInterestForm(false);
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      message: "",
      preferenceContact: "email",
    });
    setFormErrors({});
  };

  const handleFormInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Supprimer l'erreur si elle existe
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFormInputBlur = (field, value) => {
    // Validation uniquement au blur (quand on quitte l'input)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[\p{L}\s'-]{2,30}$/u;
    const messageRegex = /^[\s\S]{10,500}$/;

    let error = "";

    switch (field) {
      case "nom":
        if (value.trim() && !nameRegex.test(value)) {
          error =
            "Le nom doit contenir 2 à 30 caractères (lettres, espaces, tirets, apostrophes)";
        }
        break;
      case "prenom":
        if (value.trim() && !nameRegex.test(value)) {
          error =
            "Le prénom doit contenir 2 à 30 caractères (lettres, espaces, tirets, apostrophes)";
        }
        break;
      case "email":
        if (value.trim() && !emailRegex.test(value)) {
          error = "Format d'email invalide (exemple: nom@domaine.com)";
        }
        break;
      case "telephone":
        if (value.trim() && !isValidPhoneNumber(value)) {
          error = "Format de téléphone invalide";
        }
        break;
      case "message":
        if (value.trim() && !messageRegex.test(value)) {
          error = "Le message doit contenir entre 10 et 500 caractères";
        }
        break;
      default:
        break;
    }

    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const errors = {};

    // Regex plus strictes
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[\p{L}\s'-]{2,30}$/u;
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
    const messageRegex = /^[\s\S]{10,500}$/;

    // Validation du nom
    if (!formData.nom.trim()) {
      errors.nom = "Le nom est requis";
    } else if (!nameRegex.test(formData.nom)) {
      errors.nom =
        "Le nom doit contenir 2 à 30 caractères (lettres, espaces, tirets, apostrophes)";
    }

    // Validation du prénom
    if (!formData.prenom.trim()) {
      errors.prenom = "Le prénom est requis";
    } else if (!nameRegex.test(formData.prenom)) {
      errors.prenom =
        "Le prénom doit contenir 2 à 30 caractères (lettres, espaces, tirets, apostrophes)";
    }

    // Validation de l'email
    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Format d'email invalide (exemple: nom@domaine.com)";
    }

    // Validation du téléphone (si préférence téléphone)
    if (formData.preferenceContact === "telephone") {
      if (!formData.telephone.trim()) {
        errors.telephone = "Le téléphone est requis";
      } else if (!phoneRegex.test(formData.telephone.replace(/\s/g, ""))) {
        errors.telephone =
          "Format de téléphone invalide (exemple: 0612345678 ou +33123456789)";
      }
    }

    // Validation du message
    if (!formData.message.trim()) {
      errors.message = "Le message est requis";
    } else if (!messageRegex.test(formData.message)) {
      errors.message = "Le message doit contenir entre 10 et 500 caractères";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isFormValid = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[\p{L}\s'-]{2,30}$/u;
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
    const messageRegex = /^[\s\S]{10,500}$/;

    const hasValidName = nameRegex.test(formData.nom.trim());
    const hasValidPrenom = nameRegex.test(formData.prenom.trim());
    const hasValidEmail = emailRegex.test(formData.email.trim());
    const hasValidMessage = messageRegex.test(formData.message.trim());

    let hasValidPhone = true;
    if (formData.preferenceContact === "telephone") {
      hasValidPhone = phoneRegex.test(formData.telephone.replace(/\s/g, ""));
    }

    return (
      hasValidName &&
      hasValidPrenom &&
      hasValidEmail &&
      hasValidMessage &&
      hasValidPhone
    );
  };

  const showLocalNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setIsHiding(false);

    // Commencer l'animation de disparition après 2.5 secondes
    setTimeout(() => {
      setIsHiding(true);
      // Supprimer complètement après l'animation
      setTimeout(() => {
        setShowNotification(false);
        setIsHiding(false);
      }, 300);
    }, 2500);
  };

  const handleFormSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);

      // Log détaillé des données envoyées
      const formDataToLog = {
        ...formData,
        course: selectedCourse.name,
        courseType: selectedCourse.type, // adulte ou enfant
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent, // Informations sur le navigateur (version, OS, etc.)
      };

      console.log("=== FORMULAIRE D'INTÉRÊT ENVOYÉ ===");
      console.log("Données du formulaire:", formDataToLog);
      console.log("=====================================");

      try {
        // Simulation d'un appel API
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simuler un succès (90% de chance)
        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
          showLocalNotification("Votre demande a été envoyée avec succès !");
          closeInterestForm();
          closeModal();
        } else {
          showLocalNotification("Une erreur est survenue. Veuillez réessayer.");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi:", error);
        showLocalNotification("Une erreur est survenue. Veuillez réessayer.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("=== ERREURS DE VALIDATION ===");
      console.log("Erreurs:", formErrors);
      console.log("Données actuelles:", formData);
      console.log("=============================");
      showLocalNotification(
        "Veuillez corriger les erreurs dans le formulaire."
      );
    }
  };

  // Gestion de la touche Échap
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const filteredCourses = coursesData.filter((course) => {
    return course.type === activeFilter;
  });

  return (
    <div className={`courses-page ${isModalOpen ? "modal-open" : ""}`}>
      {/* Particules de fond */}
      <div className="courses-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="courses-container">
        {/* En-tête */}
        <div className="courses-header">
          <h1 className="courses-title">Nos Cours de Langues</h1>
          <p className="courses-subtitle">
            Découvrez notre gamme complète de cours pour adultes et enfants. Des
            formations personnalisées pour tous les niveaux avec un suivi
            pédagogique de qualité.
          </p>
        </div>

        {/* Filtres */}
        <div className="courses-filters">
          <button
            className={`filter-button ${
              activeFilter === "adult" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("adult")}
          >
            <FaUserGraduate /> Adultes
          </button>
          <button
            className={`filter-button ${
              activeFilter === "child" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("child")}
          >
            <FaChild /> Enfants
          </button>
        </div>

        {/* Grille des cours */}
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              {/* En-tête de la carte */}
              <div className="course-header">
                {course.flag ? (
                  <span
                    className="course-flag"
                    role="img"
                    aria-label={`Drapeau ${course.name}`}
                  >
                    {course.flag}
                  </span>
                ) : (
                  <course.icon className="course-icon" />
                )}
                <div>
                  <h3 className="course-title">{course.name}</h3>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className="course-content">
                <p className="course-description">{course.description}</p>

                <div className="course-features">
                  {course.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="course-feature">
                      <feature.icon className="course-feature-icon" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prix et CTA */}
              <div className="course-footer">
                <div>
                  <div className="course-price">{course.price}€</div>
                  <div className="course-price-ttc">TTC par séance</div>
                </div>
                <button
                  className="course-cta"
                  onClick={() => handleCourseClick(course)}
                >
                  En savoir plus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section des étapes */}
        <div className="course-steps">
          <h2 className="steps-title">Votre Parcours de Formation</h2>
          <div className="timeline">
            {courseSteps.map((step) => (
              <div key={step.number} className="timeline-item">
                <div className="timeline-marker">
                  <div className="step-number">{step.number}</div>
                </div>
                <div className="timeline-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modale de détail du cours */}
      <AnimatePresence>
        {isModalOpen && selectedCourse && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "var(--spacing-lg)",
            }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "var(--primary-blue)",
                borderRadius: "var(--border-radius-xl)",
                padding: "var(--spacing-xxl)",
                maxWidth: "600px",
                width: "100%",
                maxHeight: "90vh",
                overflow: "auto",
                position: "relative",
                border: "1px solid rgba(234, 189, 131, 0.3)",
              }}
            >
              {/* Bouton fermer */}
              <button
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "var(--spacing-md)",
                  right: "var(--spacing-md)",
                  background: "none",
                  border: "none",
                  color: "var(--text-light)",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  zIndex: 1,
                }}
              >
                <FaTimes />
              </button>

              {/* En-tête de la modale */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-md)",
                  marginBottom: "var(--spacing-lg)",
                }}
              >
                {selectedCourse.flag ? (
                  <span
                    style={{ fontSize: "3rem" }}
                    role="img"
                    aria-label={`Drapeau ${selectedCourse.name}`}
                  >
                    {selectedCourse.flag}
                  </span>
                ) : (
                  <selectedCourse.icon
                    style={{ fontSize: "3rem", color: "var(--secondary-gold)" }}
                  />
                )}
                <div>
                  <h2 style={{ color: "var(--text-light)", margin: 0 }}>
                    {selectedCourse.name}
                  </h2>
                  <p
                    style={{
                      color: "var(--secondary-gold)",
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {selectedCourse.format === "presentiel"
                      ? "Présentiel"
                      : "Visioconférence"}{" "}
                    - {selectedCourse.type === "adult" ? "Adulte" : "Enfant"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "var(--spacing-lg)",
                }}
              >
                {selectedCourse.description}
              </p>

              {/* Informations détaillées */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "var(--spacing-lg)",
                  marginBottom: "var(--spacing-lg)",
                }}
              >
                <div>
                  <h4
                    style={{
                      color: "var(--secondary-gold)",
                      marginBottom: "var(--spacing-sm)",
                    }}
                  >
                    Informations pratiques
                  </h4>
                  <div
                    style={{ color: "var(--text-light)", fontSize: "0.9rem" }}
                  >
                    <p>
                      <strong>Professeur :</strong> {selectedCourse.teacher}
                    </p>
                    <p>
                      <strong>Durée :</strong> {selectedCourse.duration}
                    </p>
                    <p>
                      <strong>Niveau :</strong> {selectedCourse.level}
                    </p>
                    <p>
                      <strong>Horaires :</strong> {selectedCourse.schedule}
                    </p>
                  </div>
                </div>

                <div>
                  <h4
                    style={{
                      color: "var(--secondary-gold)",
                      marginBottom: "var(--spacing-sm)",
                    }}
                  >
                    Objectifs
                  </h4>
                  <ul
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.9rem",
                      paddingLeft: "var(--spacing-md)",
                    }}
                  >
                    {selectedCourse.objectives.map((objective, idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: "var(--spacing-xs)" }}
                      >
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Prix */}
              <div
                style={{
                  background: "rgba(234, 189, 131, 0.1)",
                  padding: "var(--spacing-lg)",
                  borderRadius: "var(--border-radius-lg)",
                  textAlign: "center",
                  marginBottom: "var(--spacing-lg)",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "var(--secondary-gold)",
                  }}
                >
                  {selectedCourse.price}€
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  TTC par séance
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleInterestClick}
                style={{
                  width: "100%",
                  padding: "var(--spacing-md)",
                  background: "var(--secondary-gold)",
                  color: "var(--text-dark)",
                  border: "none",
                  borderRadius: "var(--border-radius-md)",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all var(--transition-normal)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "var(--secondary-gold-light)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "var(--secondary-gold)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Ce cours m'intéresse
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification locale discrète */}
      {showNotification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.95)",
            color: "#333",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "0.9rem",
            fontWeight: "500",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            maxWidth: "200px",
            animation: isHiding
              ? "slideOutRight 0.3s ease-in"
              : "slideInRight 0.3s ease-out",
          }}
        >
          {notificationMessage}
        </div>
      )}

      {/* Formulaire d'intérêt */}
      <AnimatePresence>
        {showInterestForm && selectedCourse && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeInterestForm}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1001,
              padding: "var(--spacing-lg)",
            }}
          >
            <motion.div
              className="interest-form-modal course-interest-form"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "var(--primary-blue)",
                borderRadius: "var(--border-radius-xl)",
                padding: "var(--spacing-xxl)",
                maxWidth: "500px",
                width: "100%",
                maxHeight: "90vh",
                overflow: "auto",
                position: "relative",
                border: "1px solid rgba(234, 189, 131, 0.3)",
              }}
            >
              {/* Bouton fermer */}
              <button
                onClick={closeInterestForm}
                style={{
                  position: "absolute",
                  top: "var(--spacing-md)",
                  right: "var(--spacing-md)",
                  background: "none",
                  border: "none",
                  color: "var(--text-light)",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  zIndex: 1,
                }}
              >
                <FaTimes />
              </button>

              {/* En-tête du formulaire */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "var(--spacing-xl)",
                }}
              >
                <h2
                  style={{
                    color: "var(--text-light)",
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  Intérêt pour le cours de {selectedCourse.name}
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Remplissez ce formulaire pour nous faire part de votre intérêt
                </p>
              </div>

              {/* Formulaire */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--spacing-lg)",
                }}
              >
                {/* Nom et Prénom */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--spacing-md)",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--spacing-sm)",
                        marginBottom: "var(--spacing-sm)",
                        color: "var(--text-light)",
                        fontSize: "0.875rem",
                      }}
                    >
                      <FaUser />
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) =>
                        handleFormInputChange("nom", e.target.value)
                      }
                      onBlur={(e) => handleFormInputBlur("nom", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "var(--spacing-md)",
                        borderRadius: "var(--border-radius-md)",
                        border: `2px solid ${
                          formErrors.nom ? "#ef4444" : "transparent"
                        }`,
                        background: "var(--primary-blue-light)",
                        color: "var(--text-light)",
                        fontSize: "1rem",
                      }}
                      placeholder="Votre nom"
                    />
                    {formErrors.nom && (
                      <p
                        style={{
                          color: "#ef4444",
                          fontSize: "0.75rem",
                          marginTop: "var(--spacing-xs)",
                        }}
                      >
                        {formErrors.nom}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--spacing-sm)",
                        marginBottom: "var(--spacing-sm)",
                        color: "var(--text-light)",
                        fontSize: "0.875rem",
                      }}
                    >
                      <FaUser />
                      Prénom *
                    </label>
                    <input
                      type="text"
                      value={formData.prenom}
                      onChange={(e) =>
                        handleFormInputChange("prenom", e.target.value)
                      }
                      onBlur={(e) =>
                        handleFormInputBlur("prenom", e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: "var(--spacing-md)",
                        borderRadius: "var(--border-radius-md)",
                        border: `2px solid ${
                          formErrors.prenom ? "#ef4444" : "transparent"
                        }`,
                        background: "var(--primary-blue-light)",
                        color: "var(--text-light)",
                        fontSize: "1rem",
                      }}
                      placeholder="Votre prénom"
                    />
                    {formErrors.prenom && (
                      <p
                        style={{
                          color: "#ef4444",
                          fontSize: "0.75rem",
                          marginTop: "var(--spacing-xs)",
                        }}
                      >
                        {formErrors.prenom}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--spacing-sm)",
                      marginBottom: "var(--spacing-sm)",
                      color: "var(--text-light)",
                      fontSize: "0.875rem",
                    }}
                  >
                    <FaEnvelope />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleFormInputChange("email", e.target.value)
                    }
                    onBlur={(e) => handleFormInputBlur("email", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "var(--spacing-md)",
                      borderRadius: "var(--border-radius-md)",
                      border: `2px solid ${
                        formErrors.email ? "#ef4444" : "transparent"
                      }`,
                      background: "var(--primary-blue-light)",
                      color: "var(--text-light)",
                      fontSize: "1rem",
                    }}
                    placeholder="votre@email.com"
                  />
                  {formErrors.email && (
                    <p
                      style={{
                        color: "#ef4444",
                        fontSize: "0.75rem",
                        marginTop: "var(--spacing-xs)",
                      }}
                    >
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Préférence de contact */}
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--spacing-sm)",
                      marginBottom: "var(--spacing-sm)",
                      color: "var(--text-light)",
                      fontSize: "0.875rem",
                    }}
                  >
                    <FaComments />
                    Préférence de contact *
                  </label>
                  <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
                    <button
                      type="button"
                      onClick={() =>
                        handleFormInputChange("preferenceContact", "email")
                      }
                      style={{
                        flex: 1,
                        padding: "var(--spacing-md)",
                        borderRadius: "var(--border-radius-md)",
                        border: `2px solid ${
                          formData.preferenceContact === "email"
                            ? "var(--secondary-gold-light)"
                            : "transparent"
                        }`,
                        background:
                          formData.preferenceContact === "email"
                            ? "rgba(240, 201, 163, 0.1)"
                            : "var(--primary-blue-light)",
                        color:
                          formData.preferenceContact === "email"
                            ? "var(--secondary-gold-light)"
                            : "var(--text-muted)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "var(--spacing-sm)",
                      }}
                    >
                      <FaEnvelope />
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleFormInputChange("preferenceContact", "telephone")
                      }
                      style={{
                        flex: 1,
                        padding: "var(--spacing-md)",
                        borderRadius: "var(--border-radius-md)",
                        border: `2px solid ${
                          formData.preferenceContact === "telephone"
                            ? "var(--secondary-gold-light)"
                            : "transparent"
                        }`,
                        background:
                          formData.preferenceContact === "telephone"
                            ? "rgba(240, 201, 163, 0.1)"
                            : "var(--primary-blue-light)",
                        color:
                          formData.preferenceContact === "telephone"
                            ? "var(--secondary-gold-light)"
                            : "var(--text-muted)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "var(--spacing-sm)",
                      }}
                    >
                      <FaPhone />
                      Téléphone
                    </button>
                  </div>
                </div>

                {/* Téléphone (conditionnel) */}
                {formData.preferenceContact === "telephone" && (
                  <div>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--spacing-sm)",
                        marginBottom: "var(--spacing-sm)",
                        color: "var(--text-light)",
                        fontSize: "0.875rem",
                      }}
                    >
                      <FaPhone />
                      Téléphone *
                    </label>
                    <PhoneInput
                      international
                      defaultCountry="FR"
                      value={formData.telephone}
                      onChange={(value) =>
                        handleFormInputChange("telephone", value)
                      }
                      onBlur={() =>
                        handleFormInputBlur("telephone", formData.telephone)
                      }
                      className={
                        formErrors.telephone ? "PhoneInput--error" : ""
                      }
                      placeholder="06 12 34 56 78"
                    />
                    {formErrors.telephone && (
                      <p
                        style={{
                          color: "#ef4444",
                          fontSize: "0.75rem",
                          marginTop: "var(--spacing-xs)",
                        }}
                      >
                        {formErrors.telephone}
                      </p>
                    )}
                  </div>
                )}

                {/* Message */}
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--spacing-sm)",
                      marginBottom: "var(--spacing-sm)",
                      color: "var(--text-light)",
                      fontSize: "0.875rem",
                    }}
                  >
                    <FaComments />
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      handleFormInputChange("message", e.target.value)
                    }
                    onBlur={(e) =>
                      handleFormInputBlur("message", e.target.value)
                    }
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "var(--spacing-md)",
                      borderRadius: "var(--border-radius-md)",
                      border: `2px solid ${
                        formErrors.message ? "#ef4444" : "transparent"
                      }`,
                      background: "var(--primary-blue-light)",
                      color: "var(--text-light)",
                      fontSize: "1rem",
                      resize: "none",
                    }}
                    placeholder="Décrivez votre projet d'apprentissage..."
                  />
                  {formErrors.message && (
                    <p
                      style={{
                        color: "#ef4444",
                        fontSize: "0.75rem",
                        marginTop: "var(--spacing-xs)",
                      }}
                    >
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Bouton d'envoi */}
                <button
                  onClick={handleFormSubmit}
                  disabled={!isFormValid() || isSubmitting}
                  style={{
                    width: "100%",
                    padding: "var(--spacing-md)",
                    background:
                      isFormValid() && !isSubmitting
                        ? "var(--secondary-gold)"
                        : "var(--primary-blue-dark)",
                    color:
                      isFormValid() && !isSubmitting
                        ? "var(--text-dark)"
                        : "var(--text-muted)",
                    border: "none",
                    borderRadius: "var(--border-radius-md)",
                    fontWeight: "600",
                    cursor:
                      isFormValid() && !isSubmitting
                        ? "pointer"
                        : "not-allowed",
                    transition: "all var(--transition-normal)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    opacity: isFormValid() && !isSubmitting ? 1 : 0.6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "var(--spacing-sm)",
                  }}
                  onMouseEnter={(e) => {
                    if (isFormValid() && !isSubmitting) {
                      e.target.style.background = "var(--secondary-gold-light)";
                      e.target.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFormValid() && !isSubmitting) {
                      e.target.style.background = "var(--secondary-gold)";
                      e.target.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {isSubmitting && (
                    <FaSpinner
                      style={{
                        animation: "spin 1s linear infinite",
                        fontSize: "1rem",
                      }}
                    />
                  )}
                  {isSubmitting
                    ? "Envoi en cours..."
                    : isFormValid()
                    ? "Envoyer ma demande"
                    : "Veuillez remplir tous les champs"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courses;
