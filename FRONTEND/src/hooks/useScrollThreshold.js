import { useEffect, useState } from "react";

/**
 * Hook permettant de savoir si le scroll a dépassé un seuil donné.
 * @param {number} threshold - Valeur en pixels à partir de laquelle l'état passe à `true`.
 * @returns {boolean} `true` si la page est scrollée au-delà du seuil.
 */
export default function useScrollThreshold(threshold = 20) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > threshold);
    };

    // Vérification immédiate au montage
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return hasScrolled;
}
