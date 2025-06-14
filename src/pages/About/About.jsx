// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import {
  IoCallOutline,
  IoCheckmarkCircleOutline,
  IoLocationOutline,
  IoMailOutline,
  IoSendOutline,
  IoTimeOutline,
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

  return (
    <motion.div
      className="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="about-hero">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Notre histoire
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Depuis plus de 10 ans, nous accompagnons nos étudiants dans leur
          apprentissage des langues avec passion et expertise.
        </motion.p>
      </section>

      <section className="about-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Notre approche
        </motion.h2>
        <div className="about-grid">
          <motion.div
            className="about-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Innovation pédagogique</h3>
            <p>
              Nous développons constamment de nouvelles méthodes d'apprentissage
              pour rendre l'expérience plus efficace et engageante.
            </p>
          </motion.div>
          <motion.div
            className="about-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>Excellence académique</h3>
            <p>
              Nos programmes sont conçus par des experts en linguistique et en
              pédagogie pour garantir les meilleurs résultats.
            </p>
          </motion.div>
          <motion.div
            className="about-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3>Communauté internationale</h3>
            <p>
              Rejoignez une communauté diverse d'apprenants et de professeurs du
              monde entier.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="team-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Notre équipe
        </motion.h2>

        {/* Directeur */}
        <div className="director-section">
          <motion.div
            className="director-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="director-image">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
                alt="Directrice de l'école"
              />
            </div>
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
        </div>

        {/* Professeurs */}
        <div className="teachers-grid">
          <motion.div
            className="teacher-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="teacher-image">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur d'anglais"
              />
            </div>
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
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="teacher-image">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur d'espagnol"
              />
            </div>
            <h4>Carlos Rodriguez</h4>
            <p className="teacher-subject">Professeur d'Espagnol</p>
            <p className="teacher-experience">10 ans d'expérience</p>
            <p className="teacher-description">
              Originaire de Madrid, Carlos transmet la richesse de la culture
              hispanique.
            </p>
          </motion.div>

          <motion.div
            className="teacher-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="teacher-image">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur d'allemand"
              />
            </div>
            <h4>Anna Schmidt</h4>
            <p className="teacher-subject">Professeure d'Allemand</p>
            <p className="teacher-experience">12 ans d'expérience</p>
            <p className="teacher-description">
              Berlinoise passionnée, Anna rend l'allemand accessible et
              captivant.
            </p>
          </motion.div>

          <motion.div
            className="teacher-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="teacher-image">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur de français"
              />
            </div>
            <h4>Marie Dubois</h4>
            <p className="teacher-subject">Professeure de Français</p>
            <p className="teacher-experience">6 ans d'expérience</p>
            <p className="teacher-description">
              Parisienne de cœur, Marie partage l'élégance de la langue
              française.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Informations Pratiques */}
      <section className="practical-info-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Informations pratiques
        </motion.h2>

        <div className="info-grid">
          <motion.div
            className="info-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="info-icon">
              <IoLocationOutline size={32} />
            </div>
            <h3>Adresse</h3>
            <p>
              123 Rue de l'Éducation
              <br />
              75001 Paris, France
            </p>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="info-icon">
              <IoCallOutline size={32} />
            </div>
            <h3>Téléphone</h3>
            <p>
              +33 1 23 45 67 89
              <br />
              +33 6 12 34 56 78
            </p>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="info-icon">
              <IoTimeOutline size={32} />
            </div>
            <h3>Horaires</h3>
            <p>
              Lun-Ven: 8h00 - 20h00
              <br />
              Sam: 9h00 - 17h00
              <br />
              Dim: Fermé
            </p>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="info-icon">
              <IoMailOutline size={32} />
            </div>
            <h3>Email</h3>
            <p>
              contact@boncours.fr
              <br />
              info@boncours.fr
            </p>
          </motion.div>
        </div>
      </section>

      {/* Carte Interactive */}
      <section className="map-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Nous trouver
        </motion.h2>

        <motion.div
          className="map-container"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="map-placeholder">
            <div className="map-overlay">
              <div className="map-marker">
                <IoLocationOutline size={32} />
              </div>
              <h3>Bon Cours - École de Langues</h3>
              <p>123 Rue de l'Éducation, 75001 Paris</p>
              <div className="map-actions">
                <button className="map-btn">
                  <MdDirections size={16} />
                  Itinéraire
                </button>
                <button className="map-btn">
                  <MdStreetview size={16} />
                  Street View
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Formulaire de Contact */}
      <section className="contact-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Contactez-nous
        </motion.h2>

        <motion.div
          className="contact-container"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {submitSuccess ? (
            <div className="success-message">
              <div className="success-icon">
                <IoCheckmarkCircleOutline size={48} />
              </div>
              <h3>Message envoyé avec succès !</h3>
              <p>Nous vous répondrons dans les plus brefs délais.</p>
              <button
                className="reset-btn"
                onClick={() => setSubmitSuccess(false)}
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? "error" : ""}
                    placeholder="Votre nom complet"
                  />
                  {formErrors.name && (
                    <span className="error-text">{formErrors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? "error" : ""}
                    placeholder="votre@email.com"
                  />
                  {formErrors.email && (
                    <span className="error-text">{formErrors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Téléphone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? "error" : ""}
                    placeholder="+33 1 23 45 67 89"
                  />
                  {formErrors.phone && (
                    <span className="error-text">{formErrors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="language">Langue d'intérêt</label>
                  <select
                    id="language"
                    name="language"
                    value={contactForm.language}
                    onChange={handleInputChange}
                  >
                    <option value="french">Français</option>
                    <option value="english">Anglais</option>
                    <option value="spanish">Espagnol</option>
                    <option value="german">Allemand</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  className={formErrors.subject ? "error" : ""}
                  placeholder="Objet de votre message"
                />
                {formErrors.subject && (
                  <span className="error-text">{formErrors.subject}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  className={formErrors.message ? "error" : ""}
                  placeholder="Décrivez votre demande..."
                  rows="5"
                ></textarea>
                {formErrors.message && (
                  <span className="error-text">{formErrors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <IoSendOutline size={20} />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default About;
