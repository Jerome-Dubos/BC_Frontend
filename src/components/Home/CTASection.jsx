/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoPeopleOutline, IoPlayCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const CTASection = () => {
  const { t } = useTranslation();
  return (
    <section className="cta">
      <motion.div
        className="cta-content"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>{t("home.cta_section_title")}</h2>
        <p>{t("home.cta_section_desc")}</p>
        <div className="cta-buttons">
          <Link to="/test" className="btn btn-primary pulse-strong">
            <IoPlayCircleOutline size={20} />
            {t("home.cta_free_test")}
          </Link>
          <Link to="/about" className="btn btn-outline">
            <IoPeopleOutline size={20} />
            {t("home.cta_learn_more")}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
