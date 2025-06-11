// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Home.css";

const Home = () => {
  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="hero">
        <div className="hero-content">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Maîtrisez les langues avec élégance
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Une approche unique pour apprendre les langues, combinant expertise
            pédagogique et innovation.
          </motion.p>
        </div>
        <ScrollLink
          to="features-section"
          smooth={true}
          duration={800}
          className="scroll-down-button"
          aria-label="Scroll down"
        >
          ↓
        </ScrollLink>
      </section>

      <section id="features-section" className="features">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Pourquoi choisir Bon Cours ?
        </motion.h2>
        <div className="features-grid">
          <motion.div
            className="feature-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Méthode unique</h3>
            <p>
              Une approche pédagogique innovante qui s'adapte à votre rythme et
              à vos objectifs.
            </p>
          </motion.div>
          <motion.div
            className="feature-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>Professeurs qualifiés</h3>
            <p>
              Des enseignants natifs et expérimentés, passionnés par
              l'enseignement des langues.
            </p>
          </motion.div>
          <motion.div
            className="feature-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3>Petits groupes</h3>
            <p>
              Un apprentissage personnalisé dans un environnement convivial et
              stimulant.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="cta">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Prêt à commencer votre voyage linguistique ?
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Passez notre test de niveau gratuit et découvrez votre parcours
          personnalisé.
        </motion.p>
        <Link to="/test">
          <motion.button
            className="cta-button"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Commencer le test
          </motion.button>
        </Link>
      </section>
    </motion.div>
  );
};

export default Home;
