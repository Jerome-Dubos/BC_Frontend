// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  IoCheckmarkCircleOutline,
  IoGlobeOutline,
  IoLanguageOutline,
  IoPeopleOutline,
  IoPlayCircleOutline,
  IoRocketOutline,
  IoSchoolOutline,
  IoStarOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [typedText, setTypedText] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const fullText = "Apprenez les langues avec Bon Cours";

  // Protection contre les doubles clics
  const lastClickTime = useRef(0);
  const lastClickedIndex = useRef(null);

  // Fonction pour toggle une carte
  const toggleCard = (index) => {
    const now = Date.now();

    // Ignorer si le même bouton a été cliqué il y a moins de 300ms
    if (
      lastClickedIndex.current === index &&
      now - lastClickTime.current < 300
    ) {
      return;
    }

    lastClickTime.current = now;
    lastClickedIndex.current = index;

    // Utiliser l'état actuel directement pour éviter les problèmes de synchronisation
    const isCurrentlyFlipped = flippedCards.includes(index);

    if (isCurrentlyFlipped) {
      const newArray = flippedCards.filter((i) => i !== index);
      setFlippedCards(newArray);
    } else {
      const newArray = [...flippedCards, index];
      setFlippedCards(newArray);
    }
  };

  // Effet de typing pour le titre
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Carrousel automatique pour les témoignages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <IoLanguageOutline size={48} />,
      title: "Méthodes innovantes",
      description:
        "Apprentissage interactif et personnalisé pour tous les niveaux",
      color: "#3498db",
    },
    {
      icon: <IoPeopleOutline size={48} />,
      title: "Professeurs experts",
      description: "Équipe pédagogique native et expérimentée",
      color: "#e74c3c",
    },
    {
      icon: <IoTrophyOutline size={48} />,
      title: "Résultats garantis",
      description: "95% de réussite aux certifications",
      color: "#f39c12",
    },
    {
      icon: <IoTimeOutline size={48} />,
      title: "Horaires flexibles",
      description: "Cours adaptés à votre emploi du temps",
      color: "#2ecc71",
    },
  ];

  const languages = [
    {
      name: "Français",
      flag: (
        <ReactCountryFlag
          countryCode="FR"
          svg
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
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
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
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
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
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
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ),
      students: "65+",
      level: "Tous niveaux",
      certification: "Certification",
    },
  ];

  const testimonials = [
    {
      name: "Marie L.",
      course: "Anglais B2",
      text: "Excellente école ! J'ai progressé rapidement grâce aux méthodes innovantes.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Pierre M.",
      course: "Espagnol A2",
      text: "Professeurs très compétents et ambiance conviviale. Je recommande !",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Sophie D.",
      course: "Allemand B1",
      text: "Formation de qualité avec un suivi personnalisé exceptionnel.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Éléments décoratifs discrets en arrière-plan */}
        <div className="floating-elements">
          <motion.div
            className="floating-decoration decoration-1"
            animate={{
              y: [-12, 12, -12],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <IoGlobeOutline size={32} />
          </motion.div>

          <motion.div
            className="floating-decoration decoration-2"
            animate={{
              y: [10, -15, 10],
              rotate: [360, 180, 0],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          >
            <IoRocketOutline size={28} />
          </motion.div>

          <motion.div
            className="floating-decoration decoration-3"
            animate={{
              y: [-8, 12, -8],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <IoStarOutline size={24} />
          </motion.div>

          <motion.div
            className="floating-decoration decoration-4"
            animate={{
              y: [5, -10, 5],
              rotate: [0, -90, -180],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          >
            <IoSchoolOutline size={26} />
          </motion.div>

          <motion.div
            className="floating-decoration decoration-5"
            animate={{
              y: [-6, 14, -6],
              rotate: [0, 45, 90],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5,
            }}
          >
            <IoLanguageOutline size={22} />
          </motion.div>
        </div>

        <motion.div
          className="hero-content"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1>
            <span className="typed-text">{typedText}</span>
            <span className="cursor">|</span>
          </h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Découvrez notre méthode d'apprentissage innovante et rejoignez plus
            de 500 étudiants qui ont déjà transformé leur avenir linguistique.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <Link to="/test" className="btn btn-primary pulse">
              <IoPlayCircleOutline size={20} />
              Commencer le test
            </Link>
            <Link to="/courses" className="btn btn-secondary">
              <IoSchoolOutline size={20} />
              Voir nos cours
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Hero image content if needed */}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Pourquoi choisir Bon Cours ?
        </motion.h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              style={{ "--accent-color": feature.color }}
            >
              <motion.div
                className="feature-icon"
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-glow"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Languages Section */}
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
              style={{
                cursor: "pointer",
              }}
            >
              <AnimatePresence mode="wait">
                {!flippedCards.includes(index) ? (
                  <motion.div
                    key="front"
                    className="language-card-front"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
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
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
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
                        margin: "0",
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

      {/* Testimonials Section */}
      <section className="testimonials">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ce que disent nos étudiants
        </motion.h2>

        <div className="testimonials-carousel">
          <motion.div
            className="testimonial-card active"
            key={currentTestimonial}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="testimonial-avatar">
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${testimonials[currentTestimonial].name}&background=eabd83&color=364252&size=150`;
                }}
              />
            </div>
            <div className="testimonial-rating">
              {[...Array(testimonials[currentTestimonial].rating)].map(
                (_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <IoStarOutline size={20} />
                  </motion.div>
                )
              )}
            </div>
            <p>"{testimonials[currentTestimonial].text}"</p>
            <div className="testimonial-author">
              <strong>{testimonials[currentTestimonial].name}</strong>
              <span>{testimonials[currentTestimonial].course}</span>
            </div>
          </motion.div>

          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${
                  index === currentTestimonial ? "active" : ""
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <motion.div
          className="cta-content"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Prêt à commencer votre apprentissage ?</h2>
          <p>
            Rejoignez notre communauté d'apprenants et découvrez une nouvelle
            façon d'apprendre les langues.
          </p>
          <div className="cta-buttons">
            <Link to="/test" className="btn btn-primary pulse-strong">
              <IoPlayCircleOutline size={20} />
              Faire le test gratuit
            </Link>
            <Link to="/about" className="btn btn-outline">
              <IoPeopleOutline size={20} />
              En savoir plus
            </Link>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
