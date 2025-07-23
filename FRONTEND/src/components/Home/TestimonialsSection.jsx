import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoChevronBack,
  IoChevronForward,
  IoStar,
  IoStarOutline,
} from "react-icons/io5";
import "./TestimonialsSection.css";

const TestimonialsSection = ({ isMobile = false }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("Toutes");
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);
  const { t } = useTranslation();

  // Charger les témoignages depuis le JSON
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await fetch("/data/testimonials.json");
        const data = await response.json();
        setTestimonials(data.testimonials);
        setFilteredTestimonials(data.testimonials);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des témoignages:", error);
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // Obtenir les langues uniques
  const languages = ["Toutes", ...new Set(testimonials.map((t) => t.language))];

  // Filtrer par langue
  const handleLanguageFilter = (language) => {
    setSelectedLanguage(language);
    if (language === "Toutes") {
      setFilteredTestimonials(testimonials);
    } else {
      setFilteredTestimonials(
        testimonials.filter((t) => t.language === language)
      );
    }
    setCurrentIndex(0);
  };

  // Navigation du carousel
  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === filteredTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Gestion des gestes tactiles pour mobile
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Auto-play du carousel (désactivé sur mobile pour une meilleure UX)
  useEffect(() => {
    if (filteredTestimonials.length <= 1 || isMobile) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(timer);
  }, [filteredTestimonials.length, currentIndex, isMobile]);

  // Rendu des étoiles
  const renderStars = (rating) => {
    const starSize = isMobile ? 18 : 20;
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="star">
        {index < rating ? (
          <IoStar size={starSize} />
        ) : (
          <IoStarOutline size={starSize} />
        )}
      </span>
    ));
  };

  if (isLoading) {
    return (
      <section className="testimonials" id="testimonials">
        <div className="testimonials-loading">
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="testimonials" id="testimonials">
        <div className="testimonials-loading">
          <div className="loading-spinner"></div>
          <p>Chargement des témoignages...</p>
        </div>
      </section>
    );
  }

  if (filteredTestimonials.length === 0) {
    return (
      <section className="testimonials" id="testimonials">
        <div className="testimonials-empty">
          <h2>{t("home.testimonials_title")}</h2>
          <p>Aucun témoignage disponible pour cette langue.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <h2>{t("home.testimonials_title")}</h2>

        {/* Filtres par langue */}
        <div className="testimonials-filters">
          {languages.map((language) => (
            <button
              key={language}
              className={`filter-btn ${
                selectedLanguage === language ? "active" : ""
              }`}
              onClick={() => handleLanguageFilter(language)}
            >
              {language}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div
          className="testimonials-carousel"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Boutons de navigation - masqués sur mobile */}
          {filteredTestimonials.length > 1 && !isMobile && (
            <>
              <button
                className="carousel-nav prev"
                onClick={prevTestimonial}
                aria-label="Témoignage précédent"
              >
                <IoChevronBack size={24} />
              </button>
              <button
                className="carousel-nav next"
                onClick={nextTestimonial}
                aria-label="Témoignage suivant"
              >
                <IoChevronForward size={24} />
              </button>
            </>
          )}

          {/* Témoignage actuel */}
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-info">
                <h3 className="testimonial-name">
                  {filteredTestimonials[currentIndex]?.name}
                </h3>
                <p className="testimonial-course">
                  {filteredTestimonials[currentIndex]?.language} -{" "}
                  {filteredTestimonials[currentIndex]?.courseType}
                </p>
              </div>
              <div className="testimonial-rating">
                {renderStars(filteredTestimonials[currentIndex]?.rating)}
              </div>
            </div>

            <blockquote className="testimonial-text">
              "{filteredTestimonials[currentIndex]?.text}"
            </blockquote>
          </div>

          {/* Indicateurs */}
          {filteredTestimonials.length > 1 && (
            <div className="testimonial-indicators">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
