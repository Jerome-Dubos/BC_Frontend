import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll vers le haut de la page lors du changement de route
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Animation fluide
    });
  }, [pathname]);

  return null; // Ce composant ne rend rien visuellement
};

export default ScrollToTop;
