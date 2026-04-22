import { createContext, useContext, useState, useEffect } from 'react';
import {
  initFirebase,
  logPageView,
  logQuizCompleted,
  logTimelineStepViewed,
  logLanguageChanged,
  logThemeChanged,
  logBadgeEarned,
  saveUserProgress,
} from '../services/firebase';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [quizzesCompleted, setQuizzesCompleted] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [totalXP, setTotalXP] = useState(0);
  const [firebaseReady, setFirebaseReady] = useState(false);

  // Initialize Firebase on mount
  useEffect(() => {
    const { app } = initFirebase();
    setFirebaseReady(!!app);
    logPageView('Home');
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      logThemeChanged(next ? 'dark' : 'light');
      return next;
    });
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'ta' : 'en';
      logLanguageChanged(next);
      return next;
    });
  };

  const addQuestion = () => {
    setQuestionsAsked(prev => {
      const next = prev + 1;
      // Award badge at milestones
      if (next === 1) logBadgeEarned('First Vote');
      if (next === 5) logBadgeEarned('Curious Citizen');
      if (next === 10) logBadgeEarned('Democracy Scholar');
      return next;
    });
    setTotalXP(prev => prev + 10);
  };

  const completeQuiz = (score) => {
    setQuizzesCompleted(prev => prev + 1);
    if (score > bestScore) setBestScore(score);
    const xpGained = score * 5;
    setTotalXP(prev => prev + xpGained);
    logQuizCompleted(score, 8, score);
    if (score === 100) logBadgeEarned('Quiz Champion');
    if (score >= 75) logBadgeEarned('High Scorer');
  };

  const updateTimeline = (step) => {
    if (step > timelineProgress) {
      setTimelineProgress(step);
      setTotalXP(prev => prev + 15);
      logTimelineStepViewed(step, `Step ${step}`);
      if (step === 7) logBadgeEarned('Election Expert');
    }
  };

  // Save progress to Firestore periodically
  useEffect(() => {
    if (totalXP > 0) {
      saveUserProgress(totalXP, earnedBadges.length, timelineProgress);
    }
  }, [totalXP]);

  return (
    <AppContext.Provider value={{
      darkMode, toggleDarkMode,
      language, toggleLanguage,
      questionsAsked, addQuestion,
      quizzesCompleted, completeQuiz,
      bestScore,
      timelineProgress, updateTimeline,
      earnedBadges,
      totalXP,
      firebaseReady,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
