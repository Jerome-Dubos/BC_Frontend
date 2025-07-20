import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { MdDirections, MdStreetview } from "react-icons/md";
import "./ContactInfo.css";

const ContactInfo = () => {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);

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

  const handleEmailClick = () => {
    const email = "contact@boncours.fr";
    window.location.href = `mailto:${email}`;
  };

  const handleScheduleClick = () => {
    // Ouvrir une modal ou faire défiler vers les horaires
    console.log("Afficher les horaires détaillés");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    });
  };

  return (
    <div className="contact-info">
      <motion.div
        className="info-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ y: -5 }}
      >
        <div className="card-header">
          <IoLocationOutline className="card-icon" />
          <h3>{t("about.address_title")}</h3>
        </div>
        <div className="card-content">
          <p>{t("about.address_content")}</p>
          <p>{t("about.address_location")}</p>
          <div className="card-actions">
            <motion.button
              className="action-btn"
              onClick={handleAddressClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("contact.view_on_map")}
            </motion.button>
            <motion.button
              className="action-btn secondary"
              onClick={handleDirections}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MdDirections />
              {t("about.map_btn_directions")}
            </motion.button>
            <motion.button
              className="action-btn secondary"
              onClick={handleStreetView}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MdStreetview />
              {t("about.map_btn_view")}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="info-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <div className="card-header">
          <IoCallOutline className="card-icon" />
          <h3>{t("about.phone_title")}</h3>
        </div>
        <div className="card-content">
          <p>{t("about.phone_number")}</p>
          <p>{t("about.phone_hours")}</p>
          <div className="card-actions">
            <motion.button
              className="action-btn"
              onClick={handlePhoneClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("contact.call_now")}
            </motion.button>
            <motion.button
              className="action-btn secondary"
              onClick={() => copyToClipboard("+33123456789")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("contact.copy_number")}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="info-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ y: -5 }}
      >
        <div className="card-header">
          <IoMailOutline className="card-icon" />
          <h3>{t("contact.email_title")}</h3>
        </div>
        <div className="card-content">
          <p>contact@boncours.fr</p>
          <p>{t("contact.email_response")}</p>
          <div className="card-actions">
            <motion.button
              className="action-btn"
              onClick={handleEmailClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("contact.send_email")}
            </motion.button>
            <motion.button
              className="action-btn secondary"
              onClick={() => copyToClipboard("contact@boncours.fr")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("contact.copy_email")}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="info-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        whileHover={{ y: -5 }}
      >
        <div className="card-header">
          <IoTimeOutline className="card-icon" />
          <h3>Horaires</h3>
        </div>
        <div className="card-content">
          <div className="schedule-grid">
            <div className="schedule-item">
              <span className="day">Lundi - Vendredi</span>
              <span className="time">9h00 - 18h00</span>
            </div>
            <div className="schedule-item">
              <span className="day">Samedi</span>
              <span className="time">9h00 - 16h00</span>
            </div>
            <div className="schedule-item">
              <span className="day">Dimanche</span>
              <span className="time">Fermé</span>
            </div>
          </div>
          <div className="card-actions">
            <motion.button
              className="action-btn"
              onClick={handleScheduleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir les horaires détaillés
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showTooltip && (
        <motion.div
          className="tooltip"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          Copié dans le presse-papiers !
        </motion.div>
      )}
    </div>
  );
};

export default ContactInfo; 