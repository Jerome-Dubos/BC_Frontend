// Système de badges
export const BADGES = {
  FIRST_TEST: {
    id: "first_test",
    name: "Premier Pas",
    description: "Compléter votre premier test",
    icon: "🎯",
  },
  PERFECT_SCORE: {
    id: "perfect_score",
    name: "Parfait !",
    description: "Obtenir un score parfait à un test",
    icon: "🌟",
  },
  LANGUAGE_MASTER: {
    id: "language_master",
    name: "Maître des Langues",
    description: "Atteindre le niveau C2 dans une langue",
    icon: "👑",
  },
  CONSISTENT: {
    id: "consistent",
    name: "Régulier",
    description: "Compléter 7 tests en 7 jours",
    icon: "📅",
  },
  SPEED_DEMON: {
    id: "speed_demon",
    name: "Rapide comme l'éclair",
    description: "Compléter un test en moins de 5 minutes",
    icon: "⚡",
  },
};

// Système de points
export const POINTS = {
  TEST_COMPLETION: 100,
  PERFECT_SCORE: 500,
  LEVEL_UP: 1000,
  DAILY_STREAK: 50,
  SPEED_BONUS: 200,
};

// Calcul des points avec coefficients
export const calculatePoints = (testResult) => {
  let points = POINTS.TEST_COMPLETION;
  let totalCoefficient = 0;
  let weightedScore = 0;

  // Calcul du score pondéré
  testResult.answers.forEach((answer, index) => {
    const question = testResult.questions[index];
    totalCoefficient += question.coefficient;

    if (answer === question.correct) {
      weightedScore += question.coefficient;
    }
  });

  const finalScore = (weightedScore / totalCoefficient) * 100;

  // Bonus pour score parfait
  if (finalScore === 100) {
    points += POINTS.PERFECT_SCORE;
  }

  // Bonus pour rapidité
  if (testResult.timeSpent < 300) {
    // moins de 5 minutes
    points += POINTS.SPEED_BONUS;
  }

  return {
    points,
    score: finalScore,
  };
};

// Vérification des badges
export const checkBadges = (userStats) => {
  const newBadges = [];

  // Premier test
  if (userStats.testsCompleted === 1) {
    newBadges.push(BADGES.FIRST_TEST);
  }

  // Score parfait
  if (userStats.perfectScores > 0) {
    newBadges.push(BADGES.PERFECT_SCORE);
  }

  // Maître des langues
  Object.entries(userStats.languageLevels).forEach(([language, level]) => {
    if (level === "C2") {
      newBadges.push(BADGES.LANGUAGE_MASTER);
    }
  });

  // Régulier
  if (userStats.currentStreak >= 7) {
    newBadges.push(BADGES.CONSISTENT);
  }

  return newBadges;
};

// Calcul du niveau d'expérience
export const calculateLevel = (totalPoints) => {
  return Math.floor(Math.sqrt(totalPoints / 100)) + 1;
};

// Calcul de la progression vers le prochain niveau
export const calculateProgress = (totalPoints) => {
  const currentLevel = calculateLevel(totalPoints);
  const pointsForNextLevel = Math.pow(currentLevel, 2) * 100;
  const pointsForCurrentLevel = Math.pow(currentLevel - 1, 2) * 100;
  const pointsInCurrentLevel = totalPoints - pointsForCurrentLevel;
  const pointsNeededForNextLevel = pointsForNextLevel - pointsForCurrentLevel;

  return {
    currentLevel,
    progress: (pointsInCurrentLevel / pointsNeededForNextLevel) * 100,
  };
};
