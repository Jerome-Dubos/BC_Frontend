import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoCheckmarkCircleOutline,
  IoCopyOutline,
  IoMailOutline,
  IoTimeOutline,
} from "react-icons/io5";
import "./ContactForm.css";

const ContactForm = () => {
  const { t } = useTranslation();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    language: "french",
    contactMethod: "email",
    preferredDays: [],
    timeSlot: "morning",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Expressions régulières pour validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^(?:\+33|0)[1-9](?:[0-9]{8})$/;
  const nameRegex = /^[a-zA-ZÀ-ÿ\u0100-\u017F\s'-]{2,50}$/;
  const subjectRegex = /^[a-zA-ZÀ-ÿ\u0100-\u017F0-9\s.,!?'-]{5,100}$/;

  // Validation en temps réel d'un champ
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) return "Le nom est requis";
        if (!nameRegex.test(value.trim())) return "Le nom ne doit contenir que des lettres, espaces, apostrophes et tirets (2-50 caractères)";
        return "";
      
      case 'email':
        if (!value.trim()) return "L'email est requis";
        if (!emailRegex.test(value.trim())) return "Format d'email invalide (ex: nom@domaine.com)";
        return "";
      
      case 'phone':
        if (!value.trim()) return "Le téléphone est requis";
        if (!phoneRegex.test(value.replace(/[\s.-]/g, ''))) return "Format de téléphone français invalide (ex: 01 23 45 67 89 ou +33 1 23 45 67 89)";
        return "";
      
      case 'subject':
        if (!value.trim()) return "Le sujet est requis";
        if (!subjectRegex.test(value.trim())) return "Le sujet doit contenir 5 à 100 caractères (lettres, chiffres, ponctuation de base)";
        return "";
      
      case 'message':
        if (!value.trim()) return "Le message est requis";
        if (value.trim().length < 10) return "Le message doit contenir au moins 10 caractères";
        if (value.trim().length > 1000) return "Le message ne peut pas dépasser 1000 caractères";
        return "";
      
      default:
        return "";
    }
  };

  // Validation complète du formulaire
  const validateForm = () => {
    const errors = {};

    errors.name = validateField('name', contactForm.name);
    errors.email = validateField('email', contactForm.email);
    errors.phone = validateField('phone', contactForm.phone);
    errors.subject = validateField('subject', contactForm.subject);
    errors.message = validateField('message', contactForm.message);

    if (contactForm.contactMethod === "phone" && contactForm.preferredDays.length === 0) {
      errors.preferredDays = "Veuillez sélectionner au moins un jour pour être contacté";
    }

    // Supprimer les erreurs vides
    Object.keys(errors).forEach(key => {
      if (!errors[key]) delete errors[key];
    });

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
        contactMethod: "email",
        preferredDays: [],
        timeSlot: "morning",
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

    // Validation en temps réel
    const error = validateField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleDayToggle = (day) => {
    setContactForm((prev) => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...prev.preferredDays, day]
    }));
  };

  const handleContactMethodChange = (method) => {
    setContactForm((prev) => ({
      ...prev,
      contactMethod: method
    }));
  };

  if (submitSuccess) {
    return (
      <motion.div
        className="contact-success"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <IoCheckmarkCircleOutline className="success-icon" />
        <h3>{t("about.contact_success")}</h3>
        <p>{t("about.contact_success_desc")}</p>
        <motion.button
          className="btn-primary"
          onClick={() => setSubmitSuccess(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("about.contact_send_another")}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="contact-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">{t("about.form_name")} *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={contactForm.name}
            onChange={handleInputChange}
            className={formErrors.name ? "error" : ""}
            placeholder={t("about.form_placeholder_name")}
          />
          {formErrors.name && <span className="error-message">{formErrors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">{t("about.form_email")} *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactForm.email}
            onChange={handleInputChange}
            className={formErrors.email ? "error" : ""}
            placeholder={t("about.form_placeholder_email")}
          />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">{t("about.form_phone")} *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactForm.phone}
            onChange={handleInputChange}
            className={formErrors.phone ? "error" : ""}
            placeholder={t("about.form_placeholder_phone")}
          />
          {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="language">{t("about.form_language")}</label>
          <select
            id="language"
            name="language"
            value={contactForm.language}
            onChange={handleInputChange}
          >
            <option value="french">{t("contact.language_french")}</option>
            <option value="english">{t("contact.language_english")}</option>
            <option value="spanish">{t("contact.language_spanish")}</option>
            <option value="german">{t("contact.language_german")}</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="subject">{t("about.form_subject")} *</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={contactForm.subject}
          onChange={handleInputChange}
          className={formErrors.subject ? "error" : ""}
          placeholder={t("about.form_placeholder_subject")}
        />
        {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">{t("about.form_message")} *</label>
        <textarea
          id="message"
          name="message"
          value={contactForm.message}
          onChange={handleInputChange}
          className={formErrors.message ? "error" : ""}
          placeholder={t("about.form_placeholder_message")}
          rows="6"
        />
        {formErrors.message && <span className="error-message">{formErrors.message}</span>}
        <div className="char-count">
          {contactForm.message.length}/1000 {t("contact.characters")}
        </div>
      </div>

      <div className="contact-preferences">
        <h4>{t("contact.preferences_title")}</h4>
        
        <div className="contact-method">
          <label>{t("contact.contact_method")}</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={contactForm.contactMethod === "email"}
                onChange={() => handleContactMethodChange("email")}
              />
              <IoMailOutline />
              {t("contact.by_email")}
            </label>
            <label>
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                checked={contactForm.contactMethod === "phone"}
                onChange={() => handleContactMethodChange("phone")}
              />
              <IoTimeOutline />
              {t("contact.by_phone")}
            </label>
          </div>
        </div>

        {contactForm.contactMethod === "phone" && (
          <div className="phone-preferences">
            <label>{t("contact.preferred_days")}</label>
            <div className="days-grid">
              {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((day) => (
                <label key={day} className="day-checkbox">
                  <input
                    type="checkbox"
                    checked={contactForm.preferredDays.includes(day)}
                    onChange={() => handleDayToggle(day)}
                  />
                  {t(`contact.${day}`)}
                </label>
              ))}
            </div>
            {formErrors.preferredDays && (
              <span className="error-message">{formErrors.preferredDays}</span>
            )}
          </div>
        )}
      </div>

      <motion.button
        type="submit"
        className="submit-btn"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? t("contact.sending") : t("about.form_submit")}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm; 