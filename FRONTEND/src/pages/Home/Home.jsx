/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CTASection from "../../components/Home/CTASection";
import FeaturesSection from "../../components/Home/FeaturesSection";
import HeroSection from "../../components/Home/HeroSection";
import ScheduleSection from "../../components/Home/ScheduleSection";
import TestimonialsSection from "../../components/Home/TestimonialsSection";
import "./Home.css";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Détection responsive
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection />
      <FeaturesSection isMobile={isMobile} />
      <ScheduleSection isMobile={isMobile} />
      <TestimonialsSection isMobile={isMobile} />
      <CTASection isMobile={isMobile} />
    </motion.div>
  );
};

export default Home;
