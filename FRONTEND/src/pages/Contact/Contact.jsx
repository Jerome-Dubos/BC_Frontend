import React from "react";
import ContactForm from "../../components/Contact/ContactForm";
import ContactInfo from "../../components/Contact/ContactInfo";
import "./Contact.css";

const Contact = () => {
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
