import { createContext, useContext, useState } from 'react';

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

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'ta' : 'en');

  const addQuestion = () => {
    setQuestionsAsked(prev => prev + 1);
    setTotalXP(prev => prev + 10);
  };

  const completeQuiz = (score) => {
    setQuizzesCompleted(prev => prev + 1);
    if (score > bestScore) setBestScore(score);
    setTotalXP(prev => prev + score * 5);
  };

  const updateTimeline = (step) => {
    if (step > timelineProgress) {
      setTimelineProgress(step);
      setTotalXP(prev => prev + 15);
    }
  };

  return (
    <AppContext.Provider value={{
      darkMode, toggleDarkMode,
      language, toggleLanguage,
      questionsAsked, addQuestion,
      quizzesCompleted, completeQuiz,
      bestScore,
      timelineProgress, updateTimeline,
      earnedBadges,
      totalXP
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
