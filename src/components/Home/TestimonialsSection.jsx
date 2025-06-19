import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoStarOutline } from "react-icons/io5";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
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
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            className="testimonial-card active"
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
        </AnimatePresence>

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
