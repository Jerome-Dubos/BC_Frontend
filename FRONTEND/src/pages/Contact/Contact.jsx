import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ContactForm from "../../components/Contact/ContactForm";
import ContactInfo from "../../components/Contact/ContactInfo";
import "./Contact.css";

const Contact = () => {
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

  return (
    <motion.div
      className="contact"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <motion.div
        className="contact-header"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1>{t("contact.title")}</h1>
        <p>{t("contact.subtitle")}</p>
      </motion.div>

      <div className="contact-content">
        <div className="contact-form-section">
          <ContactForm />
        </div>
        
        <div className="contact-info-section">
          <ContactInfo />
        </div>
      </div>
    </motion.div>
  );
};

export default Contact; 