import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./HistoryMethodology.css";

const HistoryMethodology = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      id: 0,
      title: t("about.history_title"),
      subtitle: t("about.history_desc"),
      content: t("about.history_content"),
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 1,
      title: t("about.approach_title"),
      subtitle: t("about.approach_innovation_title"),
      content: t("about.approach_innovation_desc"),
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&crop=center",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: t("about.school_support_title"),
      subtitle: t("about.school_support_subtitle"),
      content: t("about.school_support_content"),
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&crop=center",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 10V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="2"
            y="10"
            width="20"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M6 16V14M12 16V14M18 16V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  const handleSectionChange = (index) => {
    setActiveSection(index);
  };

  return (
    <div className="history-methodology">
      <div className="history-methodology__container">
        <div className="history-methodology__navigation">
          {sections.map((section, index) => (
            <button
              key={section.id}
              className={`history-methodology__nav-item ${
                activeSection === index ? "active" : ""
              }`}
              onClick={() => handleSectionChange(index)}
              aria-label={`Voir la section ${section.title}`}
              aria-pressed={activeSection === index}
            >
              <div className="history-methodology__nav-icon">
                {section.icon}
              </div>
              <div className="history-methodology__nav-content">
                <h3 className="history-methodology__nav-title">
                  {section.title}
                </h3>
                <p className="history-methodology__nav-subtitle">
                  {section.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="history-methodology__content">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`history-methodology__section ${
                activeSection === index ? "active" : ""
              }`}
              role="tabpanel"
              aria-hidden={activeSection !== index}
              aria-labelledby={`section-${section.id}`}
            >
              <div className="history-methodology__section-content">
                <div className="history-methodology__section-text">
                  <h2
                    className="history-methodology__section-title"
                    id={`section-${section.id}`}
                  >
                    {section.title}
                  </h2>
                  <p className="history-methodology__section-subtitle">
                    {section.subtitle}
                  </p>
                  <div className="history-methodology__section-body">
                    <p>{section.content}</p>
                  </div>
                </div>

                <div className="history-methodology__section-image">
                  <img
                    src={section.image}
                    alt={section.title}
                    loading="lazy"
                    onLoad={(e) => {
                      // Add fade-in effect for images
                      e.target.style.opacity = "1";
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="history-methodology__cta">
          <div className="history-methodology__cta-content">
            <h3 className="history-methodology__cta-title">
              {t("about.cta_title")}
            </h3>
            <p className="history-methodology__cta-text">
              {t("about.cta_text")}
            </p>
            <a
              href="/contact"
              className="history-methodology__cta-button"
              aria-label="Contactez-nous pour plus d'informations"
            >
              {t("about.contact_us")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryMethodology;
