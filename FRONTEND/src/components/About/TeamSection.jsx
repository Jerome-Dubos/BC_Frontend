import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaClock, FaGraduationCap, FaUsers } from "react-icons/fa";
import "./TeamSection.css";

const TeamSection = () => {
  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 0,
      name: t("about.director_name"),
      role: t("about.director_role"),
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      description: t("about.director_desc"),
      expertise: [
        t("about.director_expertise_1"),
        t("about.director_expertise_2"),
        t("about.director_expertise_3"),
      ],
      stats: { experience: "10+", students: "500+", languages: "4" },
      languages: [
        t("languages.french"),
        t("languages.english"),
        t("languages.persian"),
        t("languages.spanish"),
      ],
    },
    {
      id: 1,
      name: t("about.teacher1_name"),
      role: t("about.teacher1_subject"),
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: t("about.teacher1_desc"),
      expertise: [
        t("about.teacher1_expertise_1"),
        t("about.teacher1_expertise_2"),
        t("about.teacher1_expertise_3"),
      ],
      stats: { experience: "8+", students: "300+", languages: "3" },
      languages: [
        t("languages.english"),
        t("languages.french"),
        t("languages.german"),
      ],
    },
    {
      id: 2,
      name: t("about.teacher2_name"),
      role: t("about.teacher2_subject"),
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description: t("about.teacher2_desc"),
      expertise: [
        t("about.teacher2_expertise_1"),
        t("about.teacher2_expertise_2"),
        t("about.teacher2_expertise_3"),
      ],
      stats: { experience: "6+", students: "250+", languages: "3" },
      languages: [
        t("languages.spanish"),
        t("languages.french"),
        t("languages.english"),
      ],
    },
    {
      id: 3,
      name: t("about.teacher3_name"),
      role: t("about.teacher3_subject"),
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: t("about.teacher3_desc"),
      expertise: [
        t("about.teacher3_expertise_1"),
        t("about.teacher3_expertise_2"),
        t("about.teacher3_expertise_3"),
      ],
      stats: { experience: "12+", students: "400+", languages: "3" },
      languages: [
        t("languages.french"),
        t("languages.english"),
        t("languages.spanish"),
      ],
    },
    {
      id: 4,
      name: t("about.teacher4_name"),
      role: t("about.teacher4_subject"),
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      description: t("about.teacher4_desc"),
      expertise: [
        t("about.teacher4_expertise_1"),
        t("about.teacher4_expertise_2"),
        t("about.teacher4_expertise_3"),
      ],
      stats: { experience: "7+", students: "180+", languages: "4" },
      languages: [
        t("languages.german"),
        t("languages.french"),
        t("languages.english"),
        t("languages.italian"),
      ],
    },
  ];

  const handleCardClick = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.classList.remove("modal-open");
  };

  // Fonction pour déterminer si une carte est seule sur sa ligne
  const isCardAlone = (index) => {
    const totalCards = teamMembers.length;
    const cardsPerRow = 3;
    const row = Math.floor(index / cardsPerRow);
    const cardsInThisRow = Math.min(
      cardsPerRow,
      totalCards - row * cardsPerRow
    );
    const isLastCardInRow =
      (index + 1) % cardsPerRow === 0 || index === totalCards - 1;

    // Si c'est la dernière carte de la ligne et qu'elle est seule
    return isLastCardInRow && cardsInThisRow === 1;
  };

  // Gestion de la touche Échap
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && selectedMember) {
        closeModal();
      }
    };

    // Ajouter/supprimer la classe modal-open sur le body
    if (selectedMember) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("modal-open");
    };
  }, [selectedMember]);

  return (
    <div className="team-section">
      <div className="team-section__header">
        <h2 className="team-section__title">{t("about.team_title")}</h2>
        <p className="team-section__subtitle">{t("about.team_subtitle")}</p>
      </div>

      <div className="team-section__content">
        <div className="team-section__grid">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`team-section__card ${
                isCardAlone(index) ? "team-section__card--alone" : ""
              }`}
              onClick={() => handleCardClick(member)}
            >
              <div className="team-section__card-image">
                <img src={member.photo} alt={member.name} loading="lazy" />

                {/* Overlay avec infos au hover */}
                <div className="team-section__card-overlay">
                  <div className="team-section__overlay-content">
                    <div className="team-section__overlay-role">
                      <span className="team-section__role-badge">
                        {member.role}
                      </span>
                    </div>

                    <div className="team-section__overlay-stats">
                      <div className="team-section__overlay-stat">
                        <FaClock />
                        <span>
                          {member.stats.experience} {t("about.years")}
                        </span>
                      </div>
                      <div className="team-section__overlay-stat">
                        <FaUsers />
                        <span>
                          {member.stats.students} {t("about.students")}
                        </span>
                      </div>
                      <div className="team-section__overlay-stat">
                        <FaGraduationCap />
                        <span>
                          {member.stats.languages || member.stats.subjects}{" "}
                          {member.stats.languages
                            ? t("about.languages_short")
                            : t("about.subjects_short")}
                        </span>
                      </div>
                    </div>

                    <div className="team-section__overlay-cta">
                      <span>{t("about.click_to_learn_more")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge avec le nom en bas */}
              <div className="team-section__card-badge">
                <h3 className="team-section__card-name">{member.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal pour les détails */}
      {selectedMember && (
        <div className="team-section__modal" onClick={closeModal}>
          <div
            className="team-section__modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="team-section__modal-close" onClick={closeModal}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="team-section__modal-header">
              <div className="team-section__modal-photo">
                <img src={selectedMember.photo} alt={selectedMember.name} />
              </div>
              <div className="team-section__modal-info">
                <h2 className="team-section__modal-name">
                  {selectedMember.name}
                </h2>
                <div className="team-section__modal-role">
                  <span className="team-section__role-badge">
                    {selectedMember.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="team-section__modal-body">
              <p className="team-section__modal-description">
                {selectedMember.description}
              </p>

              <div className="team-section__modal-sections">
                <div className="team-section__modal-section">
                  <h4>{t("about.expertise")}</h4>
                  <div className="team-section__expertise-tags">
                    {selectedMember.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="team-section__expertise-tag"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="team-section__modal-section">
                  <h4>{t("about.statistics")}</h4>
                  <div className="team-section__modal-stats">
                    {Object.entries(selectedMember.stats).map(
                      ([key, value]) => (
                        <div key={key} className="team-section__stat">
                          <span className="team-section__stat-number">
                            {value}
                          </span>
                          <span className="team-section__stat-label">
                            {key === "experience"
                              ? t("about.years_experience")
                              : key === "students"
                              ? t("about.students_accompanied")
                              : key === "languages"
                              ? t("about.languages_taught")
                              : key === "subjects"
                              ? t("about.subjects_taught")
                              : key}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="team-section__modal-section">
                  <h4>{t("about.languages")}</h4>
                  <div className="team-section__languages-list">
                    {selectedMember.languages.map((language, langIndex) => (
                      <span
                        key={langIndex}
                        className="team-section__language-tag"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSection;
