// Test de placement en français langue étrangère (FLE)

export const frenchQuestions = [
  // Niveau A1-A2
  {
    id: 1,
    question: "Bonjour, je _____ Marie.",
    options: ["suis", "es", "est", "sommes"],
    correct: 0,
    level: "A1",
    coefficient: 1,
    explanation: "À la première personne du singulier, on utilise 'suis'.",
  },
  {
    id: 2,
    question: "D'où _____ -vous?",
    options: ["viens", "vient", "venez", "viennent"],
    correct: 2,
    level: "A1",
    coefficient: 1,
    explanation: "Avec 'vous', on utilise la forme 'venez'.",
  },
  {
    id: 3,
    question: "Je _____ à l'école tous les jours.",
    options: ["vais", "vas", "va", "allons"],
    correct: 0,
    level: "A1",
    coefficient: 1,
    explanation: "À la première personne du singulier, on utilise 'vais'.",
  },
  {
    id: 4,
    question: "Elle _____ très bien français.",
    options: ["parle", "parles", "parlons", "parlez"],
    correct: 0,
    level: "A2",
    coefficient: 1.5,
    explanation: "À la troisième personne du singulier, on utilise 'parle'.",
  },
  {
    id: 5,
    question: "Hier, je _____ au cinéma.",
    options: ["vais", "suis allé", "irai", "allais"],
    correct: 1,
    level: "A2",
    coefficient: 1.5,
    explanation:
      "Pour exprimer une action passée, on utilise le passé composé 'suis allé'.",
  },

  // Niveau B1-B2
  {
    id: 6,
    question: "Si j'_____ toi, j'étudierais davantage.",
    options: ["suis", "étais", "serais", "ai été"],
    correct: 1,
    level: "B1",
    coefficient: 2,
    explanation:
      "Dans une condition irréelle au présent, on utilise l'imparfait 'étais'.",
  },
  {
    id: 7,
    question: "Le livre _____ par des millions de personnes.",
    options: ["a lu", "a été lu", "ont lu", "ont été lus"],
    correct: 1,
    level: "B1",
    coefficient: 2,
    explanation:
      "À la voix passive, on utilise 'a été lu' pour un sujet singulier.",
  },
  {
    id: 8,
    question: "Je souhaiterais que tu _____ plus de temps.",
    options: ["as", "aies", "avais", "auras"],
    correct: 1,
    level: "B1",
    coefficient: 2,
    explanation:
      "Après 'souhaiter que', on utilise le subjonctif présent 'aies'.",
  },
  {
    id: 9,
    question: "La réunion _____ à la semaine prochaine.",
    options: ["a reporté", "a été reportée", "ont reporté", "reporte"],
    correct: 1,
    level: "B2",
    coefficient: 2.5,
    explanation:
      "À la voix passive, on utilise 'a été reportée' pour un sujet féminin singulier.",
  },
  {
    id: 10,
    question: "_____ la pluie, nous avons annulé le pique-nique.",
    options: ["Malgré", "Bien que", "À cause de", "Cependant"],
    correct: 2,
    level: "B2",
    coefficient: 2.5,
    explanation: "'À cause de' exprime la cause d'une conséquence négative.",
  },

  // Niveau C1-C2
  {
    id: 11,
    question:
      "La proposition a été accueillie par des critiques _____ du comité.",
    options: ["acerbes", "dispersées", "croissantes", "exploratrices"],
    correct: 0,
    level: "C1",
    coefficient: 3,
    explanation:
      "'Acerbes' qualifie des critiques particulièrement sévères et amères.",
  },
  {
    id: 12,
    question: "Si j'avais su pour les embouteillages, je _____ plus tôt.",
    options: ["partirais", "serais parti", "partirai", "suis parti"],
    correct: 1,
    level: "C1",
    coefficient: 3,
    explanation:
      "Dans une condition irréelle au passé, on utilise le conditionnel passé 'serais parti'.",
  },
  {
    id: 13,
    question:
      "Le discours du politicien était plein de _____, sans propositions concrètes.",
    options: ["lieux communs", "attitudes", "latitudes", "gratitudes"],
    correct: 0,
    level: "C1",
    coefficient: 3,
    explanation:
      "'Lieux communs' désigne des idées ou expressions banales et répétitives.",
  },
  {
    id: 14,
    question:
      "Non seulement il _____ le projet à temps, mais il a aussi dépassé les attentes.",
    options: ["a terminé", "avait terminé", "aurait terminé", "termine"],
    correct: 0,
    level: "C2",
    coefficient: 3.5,
    explanation:
      "Le passé composé 'a terminé' est utilisé pour une action achevée dans le passé.",
  },
  {
    id: 15,
    question:
      "Le style _____ de l'auteur rend ses romans particulièrement captivants.",
    options: ["perspicace", "perspicace", "pernicieux", "tenace"],
    correct: 0,
    level: "C2",
    coefficient: 3.5,
    explanation:
      "'Perspicace' qualifie un style qui montre une grande finesse d'analyse.",
  },
];
