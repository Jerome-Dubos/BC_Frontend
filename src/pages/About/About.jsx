// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  return (
    <motion.div
      className="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="about-hero">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Notre histoire
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Depuis plus de 10 ans, nous accompagnons nos étudiants dans leur
          apprentissage des langues avec passion et expertise.
        </motion.p>
      </section>

      <section className="about-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Notre approche
        </motion.h2>
        <div className="about-grid">
          <motion.div
            className="about-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Innovation pédagogique</h3>
            <p>
              Nous développons constamment de nouvelles méthodes d'apprentissage
              pour rendre l'expérience plus efficace et engageante.
            </p>
          </motion.div>
          <motion.div
            className="about-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>Excellence académique</h3>
            <p>
              Nos programmes sont conçus par des experts en linguistique et en
              pédagogie pour garantir les meilleurs résultats.
            </p>
          </motion.div>
          <motion.div
            className="about-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3>Communauté internationale</h3>
            <p>
              Rejoignez une communauté diverse d'apprenants et de professeurs du
              monde entier.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
