import React from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "../../components/Contact/ContactForm";
import ContactInfo from "../../components/Contact/ContactInfo";
import "./Contact.css";

const Contact = () => {
  const { t } = useTranslation();
  
  return (
    <div className="contact-page">
      <div className="contact-container">
        <ContactForm />
        <div className="contact-separator"></div>
        <ContactInfo />
      </div>
    </div>
  );
};

export default Contact;
