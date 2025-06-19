// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();

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
    const scheduleText = `Horaires Bon Cours :\n${t(
      "about.hours_weekdays"
    )}\n${t("about.hours_saturday")}`;

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
          alert(
            `Horaires :\n${t("about.hours_weekdays")}\n${t(
              "about.hours_saturday"
            )}`
          );
        });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas clipboard
      alert(
        `Horaires :\n${t("about.hours_weekdays")}\n${t("about.hours_saturday")}`
      );
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
          <motion.h1 variants={itemVariants}>
            {t("about.history_title")}
          </motion.h1>
          <motion.p variants={itemVariants}>{t("about.history_desc")}</motion.p>
        </motion.div>
      </section>

      <section className="about-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {t("about.approach_title")}
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
            <h3>{t("about.approach_innovation_title")}</h3>
            <p>{t("about.approach_innovation_desc")}</p>
          </motion.div>
          <motion.div
            className="about-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="card-icon">
              <IoTrophyOutline />
            </div>
            <h3>{t("about.approach_excellence_title")}</h3>
            <p>{t("about.approach_excellence_desc")}</p>
          </motion.div>
          <motion.div
            className="about-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="card-icon">
              <IoPeopleOutline />
            </div>
            <h3>{t("about.approach_community_title")}</h3>
            <p>{t("about.approach_community_desc")}</p>
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
          {t("about.team_title")}
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
              <h3>{t("about.director_name")}</h3>
              <p className="director-title">{t("about.director_role")}</p>
              <p className="director-description">{t("about.director_desc")}</p>
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
            <h4>{t("about.teacher1_name")}</h4>
            <p className="teacher-subject">{t("about.teacher1_subject")}</p>
            <p className="teacher-experience">{t("about.teacher1_exp")}</p>
            <p className="teacher-description">{t("about.teacher1_desc")}</p>
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
            <h4>{t("about.teacher2_name")}</h4>
            <p className="teacher-subject">{t("about.teacher2_subject")}</p>
            <p className="teacher-experience">{t("about.teacher2_exp")}</p>
            <p className="teacher-description">{t("about.teacher2_desc")}</p>
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
            <h4>{t("about.teacher3_name")}</h4>
            <p className="teacher-subject">{t("about.teacher3_subject")}</p>
            <p className="teacher-experience">{t("about.teacher3_exp")}</p>
            <p className="teacher-description">{t("about.teacher3_desc")}</p>
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
          {t("about.practical_title")}
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
            <h3>{t("about.address_title")}</h3>
            <p>
              {t("about.address_content")}
              <br />
              {t("about.address_location")}
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
            <h3>{t("about.phone_title")}</h3>
            <p>
              {t("about.phone_number")}
              <br />
              {t("about.phone_hours")}
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
            <h3>{t("about.hours_title")}</h3>
            <p>
              {t("about.hours_weekdays")}
              <br />
              {t("about.hours_saturday")}
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
          {t("about.find_us_title")}
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
              <h3>{t("about.map_name")}</h3>
              <p>{t("about.map_address")}</p>
              <div className="map-actions">
                <motion.button
                  className="map-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDirections}
                >
                  <MdDirections />
                  {t("about.map_btn_directions")}
                </motion.button>
                <motion.button
                  className="map-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStreetView}
                >
                  <MdStreetview />
                  {t("about.map_btn_view")}
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
          {t("about.contact_title")}
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
              <h3>{t("about.contact_success")}</h3>
              <p>{t("about.contact_success_desc")}</p>
              <motion.button
                className="reset-btn"
                onClick={() => setSubmitSuccess(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("about.contact_send_another")}
              </motion.button>
            </motion.div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    {t("about.form_name")} <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    placeholder={t("about.form_placeholder_name")}
                    className={formErrors.name ? "error" : ""}
                    required
                  />
                  {formErrors.name && (
                    <span className="error-message">{formErrors.name}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    {t("about.form_email")} <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    placeholder={t("about.form_placeholder_email")}
                    className={formErrors.email ? "error" : ""}
                    required
                  />
                  {formErrors.email && (
                    <span className="error-message">{formErrors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    {t("about.form_phone")} <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    placeholder={t("about.form_placeholder_phone")}
                    className={formErrors.phone ? "error" : ""}
                    required
                  />
                  {formErrors.phone && (
                    <span className="error-message">{formErrors.phone}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="language">{t("about.form_language")}</label>
                  <select
                    id="language"
                    name="language"
                    value={contactForm.language}
                    onChange={handleInputChange}
                  >
                    <option value="french">Français</option>
                    <option value="english">English</option>
                    <option value="spanish">Español</option>
                    <option value="german">Deutsch</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  {t("about.form_subject")} <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  placeholder={t("about.form_placeholder_subject")}
                  className={formErrors.subject ? "error" : ""}
                  required
                />
                {formErrors.subject && (
                  <span className="error-message">{formErrors.subject}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  {t("about.form_message")} <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  placeholder={t("about.form_placeholder_message")}
                  className={formErrors.message ? "error" : ""}
                  required
                  rows={6}
                />
                {formErrors.message && (
                  <span className="error-message">{formErrors.message}</span>
                )}
              </div>

              <motion.button
                className="submit-btn"
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <IoSendOutline /> {t("about.form_submit")}
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Message flottant de confirmation */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="copy-tooltip"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <IoCopyOutline />
            {t("about.copy_tooltip")}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default About;
