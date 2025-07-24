import { Check, Clock, Mail, MessageSquare, Phone, User } from "lucide-react";
import React, { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    message: "",
    preferenceContact: "email", // 'email' ou 'telephone'
    creneauxHoraires: {}, // { lundi: ['matin', 'soir'], mardi: ['flexible'], ... }
  });

  const [errors, setErrors] = useState({});
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  // Regex pour validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[\p{L}\s'-]{2,50}$/u;
  const messageRegex = /^[\s\S]{10,1000}$/;

  const jours = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
  const creneaux = [
    { id: "matin", label: "Matin", icon: "🌅", time: "7h-12h" },
    { id: "apres-midi", label: "Après-midi", icon: "☀️", time: "12h-17h" },
    { id: "soir", label: "Soir", icon: "🌙", time: "17h-21h" },
    { id: "flexible", label: "Flexible", icon: "⏰", time: "7h-21h" },
  ];

  // Fonction pour valider un numéro de téléphone avec react-phone-number-input
  const validatePhoneNumber = (value) => {
    if (!value || value.trim() === "") return false;

    // Utiliser la validation de la bibliothèque
    try {
      return isValidPhoneNumber(value);
    } catch {
      // Fallback si la validation échoue
      return value.length >= 8;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "preferenceContact") {
      if (value === "telephone") {
        setShowTimeSlots(true);
      } else {
        setShowTimeSlots(false);
        setSelectedDays([]);
        setSelectedTimeSlots([]);
        setFormData((prev) => ({ ...prev, creneauxHoraires: {} }));
      }
    }
  };

  // Fonction pour mettre à jour les créneaux horaires dans formData
  const updateCreneauxHoraires = (days, timeSlots) => {
    const creneauxHoraires = {};

    if (
      formData.preferenceContact === "telephone" &&
      days.length > 0 &&
      timeSlots.length > 0
    ) {
      days.forEach((day) => {
        creneauxHoraires[day] = timeSlots;
      });
    }

    setFormData((prev) => ({
      ...prev,
      creneauxHoraires,
    }));
  };

  const handleInputBlur = (field, value) => {
    // Validation complète quand on quitte le champ
    const newErrors = { ...errors };

    if (field === "nom" && value) {
      if (!nameRegex.test(value)) {
        newErrors.nom = "Lettres, espaces, tirets et apostrophes uniquement";
      } else {
        delete newErrors.nom;
      }
    }

    if (field === "prenom" && value) {
      if (!nameRegex.test(value)) {
        newErrors.prenom = "Lettres, espaces, tirets et apostrophes uniquement";
      } else {
        delete newErrors.prenom;
      }
    }

    if (field === "email" && value) {
      if (!emailRegex.test(value)) {
        newErrors.email = "Format d'email invalide";
      } else {
        delete newErrors.email;
      }
    }

    if (field === "telephone" && value) {
      if (!validatePhoneNumber(value)) {
        newErrors.telephone =
          "Format invalide (ex: 06 12 34 56 78, +33 6 12 34 56 78, +1 555 123 4567)";
      } else {
        delete newErrors.telephone;
      }
    }

    if (field === "message" && value) {
      if (!messageRegex.test(value)) {
        newErrors.message = "Minimum 10 caractères";
      } else {
        delete newErrors.message;
      }
    }

    setErrors(newErrors);
  };

  const handleDayToggle = (jour) => {
    setSelectedDays((prev) => {
      const newDays = prev.includes(jour)
        ? prev.filter((day) => day !== jour)
        : [...prev, jour];

      // Mettre à jour formData.creneauxHoraires
      updateCreneauxHoraires(newDays, selectedTimeSlots);

      return newDays;
    });
  };

  const isDaySelected = (jour) => {
    return selectedDays.includes(jour);
  };

  const handleTimeSlotToggle = (timeSlot) => {
    setSelectedTimeSlots((prev) => {
      let newSlots;

      // Si on clique sur "flexible", on désélectionne tout le reste
      if (timeSlot === "flexible") {
        if (prev.includes("flexible")) {
          newSlots = [];
        } else {
          newSlots = ["flexible"];
        }
      } else {
        // Si on clique sur un autre créneau
        if (prev.includes(timeSlot)) {
          // Désélectionner le créneau
          newSlots = prev.filter((slot) => slot !== timeSlot);
          // Retirer "flexible" si il était sélectionné
          newSlots = newSlots.filter((slot) => slot !== "flexible");
        } else {
          // Ajouter le créneau
          newSlots = [...prev, timeSlot];
          // Retirer "flexible" si il était sélectionné
          newSlots = newSlots.filter((slot) => slot !== "flexible");

          // Si on a maintenant 3 créneaux sélectionnés, sélectionner automatiquement "flexible"
          if (newSlots.length >= 3) {
            newSlots = ["flexible"];
          }
        }
      }

      // Mettre à jour formData.creneauxHoraires
      updateCreneauxHoraires(selectedDays, newSlots);

      return newSlots;
    });
  };

  const isTimeSlotSelected = (timeSlot) => {
    return selectedTimeSlots.includes(timeSlot);
  };

  const isFormValid = () => {
    const requiredFields = [
      "nom",
      "prenom",
      "email",
      "message",
      "preferenceContact",
    ];
    const hasRequiredFields = requiredFields.every((field) =>
      formData[field].trim()
    );

    const hasValidEmail = emailRegex.test(formData.email);
    const hasValidNames =
      nameRegex.test(formData.nom) && nameRegex.test(formData.prenom);
    const hasValidMessage = messageRegex.test(formData.message);

    let hasValidPhone = true;
    let hasTimeSlots = true;

    if (formData.preferenceContact === "telephone") {
      hasValidPhone = validatePhoneNumber(formData.telephone);
      hasTimeSlots = selectedDays.length > 0 && selectedTimeSlots.length > 0;
    }

    return (
      hasRequiredFields &&
      hasValidEmail &&
      hasValidNames &&
      hasValidMessage &&
      hasValidPhone &&
      hasTimeSlots &&
      Object.keys(errors).length === 0
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      // Construire l'objet creneauxHoraires à partir des états sélectionnés
      const creneauxHoraires = {};

      if (
        formData.preferenceContact === "telephone" &&
        selectedDays.length > 0 &&
        selectedTimeSlots.length > 0
      ) {
        selectedDays.forEach((day) => {
          creneauxHoraires[day] = selectedTimeSlots;
        });
      }

      const formDataToSubmit = {
        ...formData,
        creneauxHoraires,
      };

      console.log("Formulaire soumis:", formDataToSubmit);
      // Ici tu peux ajouter l'appel API
    }
  };

  return (
    <div className="contact-form-container">
      {/* Image du globe en arrière-plan */}
      <div className="globe-background">
        <img src="src/assets/images/globe.webp" alt="Globe" />
      </div>

      <div className="form-content">
        <div className="form-header">
          <h2 className="form-title">Parlons de votre projet</h2>
          <p className="form-subtitle">
            Contactez-nous pour discuter de vos objectifs d'apprentissage et
            découvrir nos solutions personnalisées
          </p>
        </div>

        <div className="form-grid">
          {/* Colonne gauche */}
          <div className="form-column">
            {/* Nom & Prénom */}
            <div className="form-group-row">
              <div className="form-group">
                <label className="form-label">
                  <User />
                  Nom *
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => handleInputChange("nom", e.target.value)}
                  onBlur={(e) => handleInputBlur("nom", e.target.value)}
                  className={`form-input contact-form-input ${
                    errors.nom ? "error" : ""
                  }`}
                  placeholder="Votre nom"
                />
                {errors.nom && (
                  <p className="contact-form-error-message">{errors.nom}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">
                  <User />
                  Prénom *
                </label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => handleInputChange("prenom", e.target.value)}
                  onBlur={(e) => handleInputBlur("prenom", e.target.value)}
                  className={`form-input contact-form-input ${
                    errors.prenom ? "error" : ""
                  }`}
                  placeholder="Votre prénom"
                />
                {errors.prenom && (
                  <p className="contact-form-error-message">{errors.prenom}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                <Mail />
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={(e) => handleInputBlur("email", e.target.value)}
                className={`form-input contact-form-input ${
                  errors.email ? "error" : ""
                }`}
                placeholder="votre.email@exemple.com"
              />
              {errors.email && (
                <p className="contact-form-error-message">{errors.email}</p>
              )}
            </div>

            {/* Téléphone */}
            <div className="form-group">
              <label className="form-label">
                <Phone />
                Téléphone {formData.preferenceContact === "telephone" && "*"}
              </label>
              <PhoneInput
                international
                defaultCountry="FR"
                value={formData.telephone}
                onChange={(value) => handleInputChange("telephone", value)}
                onBlur={() => handleInputBlur("telephone", formData.telephone)}
                className={`form-input contact-form-input ${
                  errors.telephone ? "error" : ""
                }`}
                placeholder="06 12 34 56 78"
              />
              {errors.telephone && (
                <p className="contact-form-error-message">{errors.telephone}</p>
              )}
            </div>

            {/* Préférence de contact */}
            <div className="form-group">
              <label className="form-label">
                <MessageSquare />
                Préférence de contact *
              </label>
              <div className="contact-preference">
                <button
                  type="button"
                  onClick={() =>
                    handleInputChange("preferenceContact", "email")
                  }
                  className={`preference-button ${
                    formData.preferenceContact === "email" ? "active" : ""
                  }`}
                >
                  <Mail />
                  Par email
                  {formData.preferenceContact === "email" && <Check />}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleInputChange("preferenceContact", "telephone")
                  }
                  className={`preference-button ${
                    formData.preferenceContact === "telephone" ? "active" : ""
                  }`}
                >
                  <Phone />
                  Par téléphone
                  {formData.preferenceContact === "telephone" && <Check />}
                </button>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="form-column">
            {/* Message */}
            <div className="form-group">
              <label className="form-label">
                <MessageSquare />
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                onBlur={(e) => handleInputBlur("message", e.target.value)}
                rows={6}
                className={`form-textarea contact-form-textarea ${
                  errors.message ? "error" : ""
                }`}
                placeholder="Parlez-nous de vos objectifs linguistiques, de votre niveau actuel et de vos disponibilités..."
              />
              {errors.message && (
                <p className="contact-form-error-message">{errors.message}</p>
              )}
            </div>

            {/* Créneaux horaires */}
            {showTimeSlots && (
              <div className="time-slots">
                <label className="form-label">
                  <Clock />
                  Créneaux de disponibilité *
                </label>

                {/* Sélection des jours */}
                <div className="days-selection">
                  {jours.map((jour) => (
                    <button
                      key={jour}
                      type="button"
                      onClick={() => handleDayToggle(jour)}
                      className={`day-button ${
                        isDaySelected(jour) ? "selected" : ""
                      }`}
                    >
                      {jour}
                    </button>
                  ))}
                </div>

                {/* Sélection des créneaux */}
                <div className="time-slots-grid">
                  {creneaux.map((creneau) => (
                    <button
                      key={creneau.id}
                      type="button"
                      onClick={() => handleTimeSlotToggle(creneau.id)}
                      className={`time-slot-card ${
                        isTimeSlotSelected(creneau.id) ? "selected" : ""
                      }`}
                    >
                      <div className="time-slot-label">{creneau.label}</div>
                      <div className="time-slot-time">{creneau.time}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bouton d'envoi */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`submit-button ${!isFormValid() ? "disabled" : ""}`}
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
