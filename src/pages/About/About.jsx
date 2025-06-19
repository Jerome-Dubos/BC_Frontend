// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  IoBookOutline,
  IoCallOutline,
  IoCheckmarkCircleOutline,
  IoCopyOutline,
  IoFlashOutline,
  IoGlobeOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoSendOutline,
  IoStarOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { MdDirections, MdStreetview } from "react-icons/md";
import "./About.css";

const About = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    language: "french",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -6,
      scale: 1.03,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  const floatingIconVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Validation du formulaire
  const validateForm = () => {
    const errors = {};

    if (!contactForm.name.trim()) {
      errors.name = "Le nom est requis";
    }

    if (!contactForm.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = "Format d'email invalide";
    }

    if (!contactForm.phone.trim()) {
      errors.phone = "Le téléphone est requis";
    } else if (!/^[\d\s\-+()]{10,}$/.test(contactForm.phone)) {
      errors.phone = "Format de téléphone invalide";
    }

    if (!contactForm.subject.trim()) {
      errors.subject = "Le sujet est requis";
    }

    if (!contactForm.message.trim()) {
      errors.message = "Le message est requis";
    } else if (contactForm.message.length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères";
    }

    return errors;
  };

  // Gestion de la soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    // Simulation d'envoi (remplacer par vraie API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        language: "french",
      });
    } catch (error) {
      console.error("Erreur envoi:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur quand l'utilisateur tape
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Fonctions pour les boutons de la carte
  const handleDirections = () => {
    const address = "123 Rue de l'Éducation, 75001 Paris, France";
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`;
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  const handleStreetView = () => {
    const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=48.8566,2.3522&heading=-45&pitch=38&fov=80`;
    window.open(streetViewUrl, "_blank", "noopener,noreferrer");
  };

  // Fonctions pour les cartes d'informations pratiques
  const handleAddressClick = () => {
    const address = "123 Rue de l'Éducation, 75001 Paris, France";
    const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
      address
    )}`;
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  const handlePhoneClick = () => {
    const phoneNumber = "+33123456789";
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleScheduleClick = () => {
    const scheduleText = "Horaires Bon Cours :\nLun-Ven: 9h-19h\nSam: 9h-17h";

    // Afficher l'infobulle de confirmation
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2500);

    // Essayer de copier dans le presse-papier
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(scheduleText)
        .then(() => {
          // Copie réussie silencieusement
        })
        .catch(() => {
          // Fallback si la copie échoue
          alert("Horaires :\nLun-Ven: 9h-19h\nSam: 9h-17h");
        });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas clipboard
      alert("Horaires :\nLun-Ven: 9h-19h\nSam: 9h-17h");
    }
  };

  return (
    <motion.div
      className="about"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      {/* Éléments décoratifs flottants */}
      <motion.div
        className="floating-icon floating-icon-1"
        variants={floatingIconVariants}
        animate="animate"
      >
        <IoBookOutline />
      </motion.div>
      <motion.div
        className="floating-icon floating-icon-2"
        variants={floatingIconVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <IoGlobeOutline />
      </motion.div>
      <motion.div
        className="floating-icon floating-icon-3"
        variants={floatingIconVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
      >
        <IoStarOutline />
      </motion.div>

      <section className="about-hero">
        <motion.div className="hero-content" variants={itemVariants}>
          <motion.h1 variants={itemVariants}>Notre histoire</motion.h1>
          <motion.p variants={itemVariants}>
            Depuis plus de 10 ans, nous accompagnons nos étudiants dans leur
            apprentissage des langues avec passion et expertise.
          </motion.p>
        </motion.div>
      </section>

      <section className="about-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          Notre approche
        </motion.h2>
        <motion.div
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="about-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="card-icon">
              <IoFlashOutline />
            </div>
            <h3>Innovation pédagogique</h3>
            <p>
              Nous développons constamment de nouvelles méthodes d'apprentissage
              pour rendre l'expérience plus efficace et engageante.
            </p>
          </motion.div>
          <motion.div
            className="about-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="card-icon">
              <IoTrophyOutline />
            </div>
            <h3>Excellence académique</h3>
            <p>
              Nos programmes sont conçus par des experts en linguistique et en
              pédagogie pour garantir les meilleurs résultats.
            </p>
          </motion.div>
          <motion.div
            className="about-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="card-icon">
              <IoPeopleOutline />
            </div>
            <h3>Communauté internationale</h3>
            <p>
              Rejoignez une communauté diverse d'apprenants et de professeurs du
              monde entier.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="team-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          Notre équipe
        </motion.h2>

        {/* Directeur */}
        <motion.div
          className="director-section"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="director-card"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(234, 189, 131, 0.15)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="director-image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
                alt="Directrice de l'école"
              />
            </motion.div>
            <div className="director-info">
              <h3>Shirin Hosseini</h3>
              <p className="director-title">Directrice Générale</p>
              <p className="director-description">
                Avec plus de 15 ans d'expérience dans l'enseignement des
                langues, Shirin dirige notre établissement avec passion et
                expertise. Originaire d'Iran et diplômée en linguistique
                appliquée, elle apporte une perspective multiculturelle unique à
                notre vision pédagogique vers l'excellence.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Professeurs */}
        <motion.div
          className="teachers-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="teacher-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div
              className="teacher-image"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d88e9218df?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur d'anglais"
              />
            </motion.div>
            <h4>Sarah Johnson</h4>
            <p className="teacher-subject">Professeure d'Anglais</p>
            <p className="teacher-experience">8 ans d'expérience</p>
            <p className="teacher-description">
              Native d'Angleterre, Sarah apporte l'authenticité britannique à
              nos cours d'anglais.
            </p>
          </motion.div>

          <motion.div
            className="teacher-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div
              className="teacher-image"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur d'espagnol"
              />
            </motion.div>
            <h4>Carlos Rodriguez</h4>
            <p className="teacher-subject">Professeur d'Espagnol</p>
            <p className="teacher-experience">6 ans d'expérience</p>
            <p className="teacher-description">
              Originaire de Madrid, Carlos partage la richesse de la culture
              hispanique avec enthousiasme.
            </p>
          </motion.div>

          <motion.div
            className="teacher-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div
              className="teacher-image"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616c1c76c0a?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur de français"
              />
            </motion.div>
            <h4>Marie Dubois</h4>
            <p className="teacher-subject">Professeure de Français</p>
            <p className="teacher-experience">12 ans d'expérience</p>
            <p className="teacher-description">
              Passionnée de langue française, Marie enseigne la finesse de notre
              belle langue avec expertise.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="practical-info-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          Informations pratiques
        </motion.h2>
        <motion.div
          className="info-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="info-card clickable"
            variants={cardVariants}
            whileHover="hover"
            onClick={handleAddressClick}
            style={{ cursor: "pointer" }}
          >
            <motion.div
              className="info-icon"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <IoLocationOutline />
            </motion.div>
            <h3>Adresse</h3>
            <p>
              123 Rue de l'Éducation
              <br />
              75001 Paris, France
            </p>
          </motion.div>
          <motion.div
            className="info-card clickable"
            variants={cardVariants}
            whileHover="hover"
            onClick={handlePhoneClick}
            style={{ cursor: "pointer" }}
          >
            <motion.div
              className="info-icon"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <IoCallOutline />
            </motion.div>
            <h3>Téléphone</h3>
            <p>
              +33 1 23 45 67 89
              <br />
              Du lundi au vendredi
            </p>
          </motion.div>
          <motion.div
            className="info-card clickable"
            variants={cardVariants}
            whileHover="hover"
            onClick={handleScheduleClick}
            style={{ cursor: "pointer" }}
          >
            <motion.div
              className="info-icon"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <IoTimeOutline />
            </motion.div>
            <h3>Horaires</h3>
            <p>
              Lun-Ven: 9h-19h
              <br />
              Sam: 9h-17h
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="map-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          Nous trouver
        </motion.h2>
        <motion.div
          className="map-container"
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="map-placeholder">
            <div className="map-overlay">
              <motion.div
                className="map-marker"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <IoLocationOutline />
              </motion.div>
              <h3>Bon Cours - École de Langues</h3>
              <p>123 Rue de l'Éducation, 75001 Paris</p>
              <div className="map-actions">
                <motion.button
                  className="map-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDirections}
                >
                  <MdDirections />
                  Itinéraire
                </motion.button>
                <motion.button
                  className="map-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStreetView}
                >
                  <MdStreetview />
                  Vue 360°
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="contact-form" className="contact-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          Contactez-nous
        </motion.h2>
        <motion.div
          className="contact-container"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          {submitSuccess ? (
            <motion.div
              className="success-message"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="success-icon"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              >
                <IoCheckmarkCircleOutline />
              </motion.div>
              <h3>Message envoyé avec succès !</h3>
              <p>Nous vous répondrons dans les plus brefs délais.</p>
              <motion.button
                className="reset-btn"
                onClick={() => setSubmitSuccess(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Envoyer un autre message
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              layout
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nom complet *</label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? "error" : ""}
                    placeholder="Votre nom complet"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                  {formErrors.name && (
                    <motion.span
                      className="error-text"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formErrors.name}
                    </motion.span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? "error" : ""}
                    placeholder="votre@email.com"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                  {formErrors.email && (
                    <motion.span
                      className="error-text"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formErrors.email}
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Téléphone *</label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? "error" : ""}
                    placeholder="+33 1 23 45 67 89"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                  {formErrors.phone && (
                    <motion.span
                      className="error-text"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formErrors.phone}
                    </motion.span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="language">Langue d'intérêt</label>
                  <motion.select
                    id="language"
                    name="language"
                    value={contactForm.language}
                    onChange={handleInputChange}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="french">Français</option>
                    <option value="english">Anglais</option>
                    <option value="spanish">Espagnol</option>
                    <option value="german">Allemand</option>
                    <option value="italian">Italien</option>
                    <option value="other">Autre</option>
                  </motion.select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet *</label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  className={formErrors.subject ? "error" : ""}
                  placeholder="Sujet de votre message"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                {formErrors.subject && (
                  <motion.span
                    className="error-text"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {formErrors.subject}
                  </motion.span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  className={formErrors.message ? "error" : ""}
                  placeholder="Votre message..."
                  rows="5"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                {formErrors.message && (
                  <motion.span
                    className="error-text"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {formErrors.message}
                  </motion.span>
                )}
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <IoSendOutline />
                    Envoyer le message
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </motion.div>
      </section>

      {/* Infobulle de confirmation globale */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="copy-tooltip"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <IoCopyOutline />
            <span>Horaires copiés !</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default About;
