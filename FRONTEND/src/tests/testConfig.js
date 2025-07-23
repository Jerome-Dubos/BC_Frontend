// Configuration générale des tests de langues

export const levels = {
  A1: {
    name: "Débutant (A1)",
    description:
      "Vous pouvez comprendre et utiliser des expressions familières et quotidiennes ainsi que des énoncés très simples.",
    color: "#ff6b6b",
  },
  A2: {
    name: "Élémentaire (A2)",
    description:
      "Vous pouvez communiquer lors de tâches simples et habituelles ne demandant qu'un échange simple et direct d'informations.",
    color: "#ffa726",
  },
  B1: {
    name: "Intermédiaire (B1)",
    description:
      "Vous pouvez comprendre les points essentiels quand un langage clair et standard est utilisé sur des sujets familiers.",
    color: "#ffca28",
  },
  B2: {
    name: "Intermédiaire supérieur (B2)",
    description:
      "Vous pouvez comprendre le contenu essentiel de sujets concrets ou abstraits dans un texte complexe.",
    color: "#66bb6a",
  },
  C1: {
    name: "Avancé (C1)",
    description:
      "Vous pouvez comprendre une grande gamme de textes longs et exigeants, ainsi que saisir des significations implicites.",
    color: "#42a5f5",
  },
  C2: {
    name: "Maîtrise (C2)",
    description:
      "Vous pouvez comprendre sans effort pratiquement tout ce que vous lisez ou entendez.",
    color: "#ab47bc",
  },
};

export const languages = {
  english: {
    name: "Anglais",
    flag: "🇬🇧",
    code: "EN",
    description: "Test de placement en anglais selon le CECRL",
  },
  spanish: {
    name: "Espagnol",
    flag: "🇪🇸",
    code: "ES",
    description: "Test de placement en espagnol selon le CECRL",
  },
  german: {
    name: "Allemand",
    flag: "🇩🇪",
    code: "DE",
    description: "Test de placement en allemand selon le CECRL",
  },
  french: {
    name: "Français",
    flag: "🇫🇷",
    code: "FR",
    description: "Test de français langue étrangère (FLE) selon le CECRL",
  },
};

// Calcul du niveau basé sur les réponses
export const calculateLevel = (userAnswers, questions) => {
  let correctAnswers = 0;

  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].correct) {
      correctAnswers++;
    }
  });

  const percentage = (correctAnswers / questions.length) * 100;

  if (percentage >= 90) return "C2";
  if (percentage >= 80) return "C1";
  if (percentage >= 70) return "B2";
  if (percentage >= 60) return "B1";
  if (percentage >= 40) return "A2";
  return "A1";
};
