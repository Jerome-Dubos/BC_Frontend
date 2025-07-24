import React from "react";
import ContactForm from "../../components/Contact/ContactForm";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
