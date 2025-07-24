import React from "react";
import { useTranslation } from "react-i18next";
import AboutTabs from "../../components/About/AboutTabs";
import "./About.css";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="about-page__header">
        <div className="about-page__container">
          <h1 className="about-page__title">{t("nav.about")}</h1>
          <p className="about-page__subtitle">{t("about.subtitle")}</p>
        </div>
      </div>

      <div className="about-page__content">
        <AboutTabs />
      </div>
    </div>
  );
};

export default About;
