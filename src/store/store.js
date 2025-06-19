import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      // État du thème
      theme: "light",
      setTheme: (theme) => set({ theme }),

      // État des tests
      testResults: [],
      addTestResult: (result) =>
        set((state) => ({
          testResults: [...state.testResults, result],
        })),

      // État de progression
      progress: {},
      updateProgress: (language, level) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [language]: level,
          },
        })),

      // État des badges
      badges: [],
      addBadge: (badge) =>
        set((state) => ({
          badges: [...state.badges, badge],
        })),

      // État des statistiques
      statistics: {
        testsCompleted: 0,
        averageScore: 0,
        timeSpent: 0,
      },
      updateStatistics: (stats) =>
        set((state) => ({
          statistics: {
            ...state.statistics,
            ...stats,
          },
        })),
    }),
    {
      name: "language-test-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
