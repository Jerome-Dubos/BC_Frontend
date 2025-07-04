/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import CTASection from "../../components/Home/CTASection";
import FeaturesSection from "../../components/Home/FeaturesSection";
import HeroSection from "../../components/Home/HeroSection";
import LanguagesSection from "../../components/Home/LanguagesSection";
import ScheduleSection from "../../components/Home/ScheduleSection";
import TestimonialsSection from "../../components/Home/TestimonialsSection";
import "./Home.css";

const Home = () => (
  <motion.div
    className="home"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <HeroSection />
    <FeaturesSection />
    <LanguagesSection />
    <ScheduleSection />
    <TestimonialsSection />
    <CTASection />
  </motion.div>
);

export default Home;
