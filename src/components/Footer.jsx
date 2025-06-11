import { useState } from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import "./Footer.css";
import LegalModal from "./LegalModal";
import PrivacyModal from "./PrivacyModal";
import TermsModal from "./TermsModal";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // États pour contrôler l'ouverture des modales
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          {/* Section À propos */}
          <div className="footer-section">
            <div className="footer-logo">
              <h2>Bon Cours</h2>
              <p>Excellence en apprentissage des langues</p>
            </div>
            <p>
              Depuis plus de 10 ans, nous accompagnons nos étudiants dans leur
              apprentissage des langues avec passion et expertise. Notre
              approche innovante garantit des résultats exceptionnels.
            </p>
            <div className="footer-social">
              <h3>Suivez-nous</h3>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Section Contact */}
          <div className="footer-section footer-contact">
            <h3>Contact</h3>
            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <a
                href="https://maps.google.com/?q=123+Rue+de+l'Éducation,+75001+Paris"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-text contact-link"
              >
                123 Rue de l'Éducation, 75001 Paris
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <a
                href="tel:+33123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-text contact-link"
              >
                +33 1 23 45 67 89
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <a
                href="mailto:contact@boncours.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-text contact-link"
              >
                contact@boncours.fr
              </a>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="footer-divider"></div>

        {/* Bas du footer */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>© {currentYear} Bon Cours. Tous droits réservés.</span>
          </div>
          <div className="footer-links">
            <button
              className="footer-link-button"
              onClick={() => setIsLegalModalOpen(true)}
            >
              Mentions légales
            </button>
            <button
              className="footer-link-button"
              onClick={() => setIsPrivacyModalOpen(true)}
            >
              Politique de confidentialité
            </button>
            <button
              className="footer-link-button"
              onClick={() => setIsTermsModalOpen(true)}
            >
              CGU
            </button>
          </div>
        </div>

        {/* Ligne développeur */}
        <div className="footer-developer">
          <p>
            Conçu et développé avec <span className="heart">❤</span> à
            Schiltigheim, France.
            <br />
            Une solution{" "}
            <a
              href="https://www.duboswebservices.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="dubos-link"
            >
              DUBOS WEB SERVICES
            </a>
            .
          </p>
        </div>
      </div>

      {/* Bouton retour en haut */}
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
      >
        ↑
      </button>

      {/* Modales */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
