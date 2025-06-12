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

      <section className="team-section">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Notre équipe
        </motion.h2>

        {/* Directeur */}
        <div className="director-section">
          <motion.div
            className="director-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="director-image">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
                alt="Directrice de l'école"
              />
            </div>
            <div className="director-info">
              <h3>Shirin Hosseini</h3>
              <p className="director-title">Directrice Générale</p>
              <p className="director-description">
                Avec plus de 15 ans d'expérience dans l'enseignement des
                langues, Shirin dirige notre établissement avec passion et
                expertise. Originaire d'Iran et diplômée en linguistique
                appliquée, elle apporte une perspective multiculturelle unique à
                notre vision pédagogique vers l'excellence.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Professeurs */}
        <div className="teachers-grid">
          <motion.div
            className="teacher-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="teacher-image">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur d'anglais"
              />
            </div>
            <h4>Sarah Johnson</h4>
            <p className="teacher-subject">Professeure d'Anglais</p>
            <p className="teacher-experience">8 ans d'expérience</p>
            <p className="teacher-description">
              Native d'Angleterre, Sarah apporte l'authenticité britannique à
              nos cours d'anglais.
            </p>
          </motion.div>

          <motion.div
            className="teacher-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="teacher-image">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur d'espagnol"
              />
            </div>
            <h4>Carlos Rodriguez</h4>
            <p className="teacher-subject">Professeur d'Espagnol</p>
            <p className="teacher-experience">10 ans d'expérience</p>
            <p className="teacher-description">
              Originaire de Madrid, Carlos transmet la richesse de la culture
              hispanique.
            </p>
          </motion.div>

          <motion.div
            className="teacher-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="teacher-image">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur d'allemand"
              />
            </div>
            <h4>Anna Schmidt</h4>
            <p className="teacher-subject">Professeure d'Allemand</p>
            <p className="teacher-experience">12 ans d'expérience</p>
            <p className="teacher-description">
              Berlinoise passionnée, Anna rend l'allemand accessible et
              captivant.
            </p>
          </motion.div>

          <motion.div
            className="teacher-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="teacher-image">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur d'italien"
              />
            </div>
            <h4>Marco Rossi</h4>
            <p className="teacher-subject">Professeur d'Italien</p>
            <p className="teacher-experience">7 ans d'expérience</p>
            <p className="teacher-description">
              Romain de naissance, Marco partage sa passion pour la langue de
              Dante.
            </p>
          </motion.div>

          <motion.div
            className="teacher-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="teacher-image">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur de français"
              />
            </div>
            <h4>Sophie Moreau</h4>
            <p className="teacher-subject">Professeure de Français</p>
            <p className="teacher-experience">15 ans d'expérience</p>
            <p className="teacher-description">
              Parisienne experte, Sophie enseigne les subtilités de la langue
              française.
            </p>
          </motion.div>

          <motion.div
            className="teacher-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="teacher-image">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                alt="Professeur de mandarin"
              />
            </div>
            <h4>Li Wei</h4>
            <p className="teacher-subject">Professeur de Mandarin</p>
            <p className="teacher-experience">9 ans d'expérience</p>
            <p className="teacher-description">
              Pékinois natif, Li Wei ouvre les portes de la culture chinoise
              moderne.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
