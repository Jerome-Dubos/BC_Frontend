import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CoursesHeader from "../../components/Courses/CoursesHeader";
import CoursesList from "../../components/Courses/CoursesList";
import "./Courses.css";

const Courses = () => {
  const { t } = useTranslation();

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      className="courses"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <CoursesHeader />
      <CoursesList />
    </motion.div>
  );
};

export default Courses;
