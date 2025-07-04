import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoStarOutline } from "react-icons/io5";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Marie L.",
      course: "B2 English",
      text: t("home.testimonial_1"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Pierre M.",
      course: "A2 Spanish",
      text: t("home.testimonial_2"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Sophie D.",
      course: "B1 German",
      text: t("home.testimonial_3"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="testimonials">
      <h2>{t("home.testimonials_title")}</h2>

      <div className="testimonials-carousel">
        <div className="testimonial-card">
          <div className="testimonial-avatar">
            <img
              src={testimonials[currentTestimonial].avatar}
              alt={testimonials[currentTestimonial].name}
              loading="lazy"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${testimonials[currentTestimonial].name}&background=eabd83&color=364252&size=150`;
              }}
            />
          </div>
          <div className="testimonial-rating">
            {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
              <div key={i}>
                <IoStarOutline size={20} />
              </div>
            ))}
          </div>
          <p>"{testimonials[currentTestimonial].text}"</p>
          <div className="testimonial-author">
            <strong>{testimonials[currentTestimonial].name}</strong>
            <span>{testimonials[currentTestimonial].course}</span>
          </div>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentTestimonial ? "active" : ""}`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
