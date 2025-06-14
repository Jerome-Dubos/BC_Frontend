import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404</h1>
        <h2>Page non trouvée</h2>
        <p>Désolé, la page que vous recherchez n'existe pas.</p>
        <Link to="/" className="home-button">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Error;
