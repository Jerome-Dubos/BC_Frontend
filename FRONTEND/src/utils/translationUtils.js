/**
 * Utilitaires pour la gestion des traductions des données dynamiques
 * Permet de traduire les clés de données stockées dans le JSON/DB
 */

/**
 * Traduit une clé de données en utilisant la fonction de traduction fournie
 * @param {string} key - Clé de traduction (ex: "languages.english")
 * @param {Function} t - Fonction de traduction de react-i18next
 * @param {string} fallback - Valeur de fallback si la traduction échoue
 * @returns {string} Texte traduit
 */
export const translateDataKey = (key, t, fallback = "") => {
  if (!key || !t) return fallback;

  try {
    const translated = t(key);
    // Si la traduction retourne la clé elle-même, c'est qu'elle n'existe pas
    return translated === key ? fallback : translated;
  } catch (error) {
    console.warn(`Erreur de traduction pour la clé: ${key}`, error);
    return fallback;
  }
};

/**
 * Traduit un objet de cours complet
 * @param {Object} course - Objet cours avec des clés de traduction
 * @param {Function} t - Fonction de traduction
 * @returns {Object} Objet cours avec les valeurs traduites
 */
export const translateCourse = (course, t) => {
  if (!course || !t) return course;

  return {
    ...course,
    language: translateDataKey(course.languageKey, t, course.languageKey),
    level: translateDataKey(course.levelKey, t, course.levelKey),
    type: translateDataKey(course.typeKey, t, course.typeKey),
  };
};

/**
 * Traduit une liste de cours
 * @param {Array} courses - Liste des cours
 * @param {Function} t - Fonction de traduction
 * @returns {Array} Liste des cours traduits
 */
export const translateCourses = (courses, t) => {
  if (!Array.isArray(courses) || !t) return courses;

  return courses.map((course) => translateCourse(course, t));
};

/**
 * Traduit les données de planning complètes
 * @param {Object} scheduleData - Données de planning
 * @param {Function} t - Fonction de traduction
 * @returns {Object} Données de planning traduites
 */
export const translateScheduleData = (scheduleData, t) => {
  if (!scheduleData || !t) return scheduleData;

  const translated = {};

  // Parcourir les niveaux (adult, child)
  Object.keys(scheduleData).forEach((levelKey) => {
    if (levelKey === "metadata") {
      translated[levelKey] = scheduleData[levelKey];
      return;
    }

    translated[levelKey] = {};

    // Parcourir les types (presentiel, visio)
    Object.keys(scheduleData[levelKey]).forEach((typeKey) => {
      translated[levelKey][typeKey] = {};

      // Parcourir les dates
      Object.keys(scheduleData[levelKey][typeKey]).forEach((dateKey) => {
        const courses = scheduleData[levelKey][typeKey][dateKey];
        translated[levelKey][typeKey][dateKey] = translateCourses(courses, t);
      });
    });
  });

  return translated;
};

/**
 * Valide qu'une clé de traduction existe dans les fichiers de langue
 * @param {string} key - Clé à valider
 * @param {Object} translations - Objet des traductions
 * @returns {boolean} True si la clé existe
 */
export const validateTranslationKey = (key, translations) => {
  if (!key || !translations) return false;

  const keys = key.split(".");
  let current = translations;

  for (const k of keys) {
    if (!current || typeof current !== "object" || !(k in current)) {
      return false;
    }
    current = current[k];
  }

  return typeof current === "string";
};

/**
 * Extrait toutes les clés de traduction utilisées dans les données
 * @param {Object} data - Données à analyser
 * @returns {Set} Ensemble des clés de traduction
 */
export const extractTranslationKeys = (data) => {
  const keys = new Set();

  const extractKeys = (obj) => {
    if (!obj || typeof obj !== "object") return;

    Object.values(obj).forEach((value) => {
      if (typeof value === "string" && value.includes(".")) {
        // Vérifier si c'est une clé de traduction (contient un point)
        keys.add(value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => extractKeys(item));
      } else if (typeof value === "object") {
        extractKeys(value);
      }
    });
  };

  extractKeys(data);
  return keys;
};
