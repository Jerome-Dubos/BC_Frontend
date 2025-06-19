import { motion } from "framer-motion";
import { IoPeopleOutline, IoPlayCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const CTASection = () => (
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
        Rejoignez notre communauté d'apprenants et découvrez une nouvelle façon
        d'apprendre les langues.
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
);

export default CTASection;
