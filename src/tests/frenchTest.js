// Test de placement en français langue étrangère (FLE)

export const frenchQuestions = [
  // Niveau A1-A2
  {
    id: 1,
    question: "Bonjour, je _____ Marie.",
    options: ["suis", "es", "est", "sommes"],
    correct: 0,
    level: "A1",
  },
  {
    id: 2,
    question: "D'où _____ -vous?",
    options: ["viens", "vient", "venez", "viennent"],
    correct: 2,
    level: "A1",
  },
  {
    id: 3,
    question: "Je _____ à l'école tous les jours.",
    options: ["vais", "vas", "va", "allons"],
    correct: 0,
    level: "A1",
  },
  {
    id: 4,
    question: "Elle _____ très bien français.",
    options: ["parle", "parles", "parlons", "parlez"],
    correct: 0,
    level: "A2",
  },
  {
    id: 5,
    question: "Hier, je _____ au cinéma.",
    options: ["vais", "suis allé", "irai", "allais"],
    correct: 1,
    level: "A2",
  },

  // Niveau B1-B2
  {
    id: 6,
    question: "Si j'_____ toi, j'étudierais davantage.",
    options: ["suis", "étais", "serais", "ai été"],
    correct: 1,
    level: "B1",
  },
  {
    id: 7,
    question: "Le livre _____ par des millions de personnes.",
    options: ["a lu", "a été lu", "ont lu", "ont été lus"],
    correct: 1,
    level: "B1",
  },
  {
    id: 8,
    question: "Je souhaiterais que tu _____ plus de temps.",
    options: ["as", "aies", "avais", "auras"],
    correct: 1,
    level: "B1",
  },
  {
    id: 9,
    question: "La réunion _____ à la semaine prochaine.",
    options: ["a reporté", "a été reportée", "ont reporté", "reporte"],
    correct: 1,
    level: "B2",
  },
  {
    id: 10,
    question: "_____ la pluie, nous avons annulé le pique-nique.",
    options: ["Malgré", "Bien que", "À cause de", "Cependant"],
    correct: 2,
    level: "B2",
  },

  // Niveau C1-C2
  {
    id: 11,
    question:
      "La proposition a été accueillie par des critiques _____ du comité.",
    options: ["acerbes", "dispersées", "croissantes", "exploratrices"],
    correct: 0,
    level: "C1",
  },
  {
    id: 12,
    question: "Si j'avais su pour les embouteillages, je _____ plus tôt.",
    options: ["partirais", "serais parti", "partirai", "suis parti"],
    correct: 1,
    level: "C1",
  },
  {
    id: 13,
    question:
      "Le discours du politicien était plein de _____, sans propositions concrètes.",
    options: ["lieux communs", "attitudes", "latitudes", "gratitudes"],
    correct: 0,
    level: "C1",
  },
  {
    id: 14,
    question:
      "Non seulement il _____ le projet à temps, mais il a aussi dépassé les attentes.",
    options: ["a terminé", "avait terminé", "aurait terminé", "termine"],
    correct: 0,
    level: "C2",
  },
  {
    id: 15,
    question:
      "Le style _____ de l'auteur rend ses romans particulièrement captivants.",
    options: ["perspicace", "perspicace", "pernicieux", "tenace"],
    correct: 0,
    level: "C2",
  },
];
