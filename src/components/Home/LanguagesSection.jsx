import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const LanguagesSection = () => {
  const [flippedCards, setFlippedCards] = useState([]);
  const lastClickTime = useRef(0);
  const lastClickedIndex = useRef(null);

  const toggleCard = (index) => {
    const now = Date.now();
    if (
      lastClickedIndex.current === index &&
      now - lastClickTime.current < 300
    ) {
      return;
    }
    lastClickTime.current = now;
    lastClickedIndex.current = index;

    setFlippedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const languages = [
    {
      name: "Français",
      flag: (
        <ReactCountryFlag
          countryCode="FR"
          svg
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ),
      students: "120+",
      level: "Tous niveaux",
      certification: "Certification",
    },
    {
      name: "Anglais",
      flag: (
        <ReactCountryFlag
          countryCode="GB"
          svg
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ),
      students: "200+",
      level: "Tous niveaux",
      certification: "Certification",
    },
    {
      name: "Espagnol",
      flag: (
        <ReactCountryFlag
          countryCode="ES"
          svg
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ),
      students: "85+",
      level: "Tous niveaux",
      certification: "Certification",
    },
    {
      name: "Allemand",
      flag: (
        <ReactCountryFlag
          countryCode="DE"
          svg
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ),
      students: "65+",
      level: "Tous niveaux",
      certification: "Certification",
    },
  ];

  return (
    <section className="languages">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Nos langues enseignées
      </motion.h2>
      <div className="languages-grid">
        {languages.map((language, index) => (
          <motion.div
            key={index}
            className="language-card"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleCard(index);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            style={{ cursor: "pointer" }}
          >
            <AnimatePresence mode="wait">
              {!flippedCards.includes(index) ? (
                <motion.div
                  key="front"
                  className="language-card-front"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="flag-container">{language.flag}</div>
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  className="language-card-back"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    transform: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "var(--spacing-lg)",
                    boxSizing: "border-box",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.5rem",
                      textAlign: "center",
                    }}
                  >
                    {language.name}
                  </h3>
                  <p
                    className="student-count"
                    style={{ margin: "var(--spacing-sm) 0" }}
                  >
                    {language.students} étudiants
                  </p>
                  <div
                    className="language-features"
                    style={{ width: "100%", gap: "var(--spacing-sm)" }}
                  >
                    <div className="feature-item">
                      <IoCheckmarkCircleOutline size={16} />
                      <span>{language.level}</span>
                    </div>
                    <div className="feature-item">
                      <IoCheckmarkCircleOutline size={16} />
                      <span>{language.certification}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LanguagesSection;
