import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./TestEmailForm.css";
import { IoMailOutline, IoArrowForwardOutline } from "react-icons/io5";

const TestEmailForm = ({ onEmailSubmit, selectedLanguage }) => {
  const { t } = useTranslation();
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userEmail.trim() && userEmail.includes("@")) {
      onEmailSubmit(userEmail);
    }
  };

  return (
    <motion.div
      className="test-step email-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="step-header">
        <h2>{t("test.email_form_title")}</h2>
        <p>{t("test.email_form_desc")}</p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="email-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="form-group">
          <label htmlFor="email">
            <IoMailOutline className="label-icon" />
            {t("test.email_label")}
          </label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder={t("test.email_placeholder")}
            required
            autoFocus
          />
        </div>

        <motion.button
          type="submit"
          className="submit-btn"
          disabled={!userEmail.trim() || !userEmail.includes("@")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoArrowForwardOutline />
          {t("test.start_test")}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default TestEmailForm; 