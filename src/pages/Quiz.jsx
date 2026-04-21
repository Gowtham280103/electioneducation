import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { quizQuestions } from '../data/electionData';

export default function Quiz() {
  const { darkMode, language, completeQuiz } = useApp();
  const [phase, setPhase] = useState('intro');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const TOTAL = quizQuestions.length;
  const q = quizQuestions[current];

  const startQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setPhase('quiz');
  };

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.correct;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { question: q.question, selected: idx, correct: q.correct, isCorrect: correct }]);
  };

  const handleNext = () => {
    if (current + 1 < TOTAL) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      completeQuiz(Math.round((score / TOTAL) * 100));
      setPhase('result');
    }
  };

  if (phase === 'intro') {
    return (
      <div className={`min-h-screen pt-20 px-4 flex items-center justify-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="max-w-2xl w-full text-center">
          <div className="text-8xl mb-6 float-anim">✏️</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">{language === 'ta' ? 'வினாடி வினா' : 'Election Quiz'}</span>
          </h1>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {language === 'ta' ? `${TOTAL} கேள்விகள்` : `Test your knowledge with ${TOTAL} questions!`}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: '❓', value: `${TOTAL}`, label: language === 'ta' ? 'கேள்விகள்' : 'Questions' },
              { icon: '⏱️', value: '~5', label: language === 'ta' ? 'நிமிடங்கள்' : 'Minutes' },
              { icon: '🏅', value: '3', label: language === 'ta' ? 'பேட்ஜ்கள்' : 'Badges' },
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-2xl ${darkMode ? 'glass' : 'bg-white shadow-lg'}`}>
                <div className="text-3xl mb-1">{item.icon}</div>
                <div className="text-2xl font-black gradient-text">{item.value}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</div>
              </div>
            ))}
          </div>

          <button onClick={startQuiz}
            className="px-10 py-4 rounded-2xl text-white font-bold text-xl transition-all duration-300 hover:scale-105 pulse-glow"
            style={{ background: 'linear-gradient(135deg, #ff6b35, #f7931e)' }}>
            🚀 {language === 'ta' ? 'தொடங்கு!' : 'Start Quiz!'}
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / TOTAL) * 100);
    return (
      <div className={`min-h-screen pt-20 px-4 pb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="max-w-3xl mx-auto">
          <div className={`p-8 rounded-3xl text-center mb-8 ${darkMode ? 'glass' : 'bg-white shadow-xl'}`}>
            <div className="text-6xl mb-4">{pct === 100 ? '🏆' : pct >= 75 ? '⭐' : pct >= 50 ? '👍' : '📚'}</div>
            <h2 className="text-3xl font-black mb-2" style={{ color: pct >= 75 ? '#ff6b35' : '#667eea' }}>
              {pct >= 75 ? (language === 'ta' ? 'சிறப்பு!' : 'Excellent!') : (language === 'ta' ? 'நல்லது!' : 'Good Job!')}
            </h2>
            <div className="text-6xl font-black gradient-text mb-2">{score}/{TOTAL}</div>
            <div className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{pct}% Correct</div>

            <div className={`h-4 rounded-full overflow-hidden mt-6 ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #ff6b35, #f7931e)' }} />
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={startQuiz}
              className="px-8 py-3 rounded-2xl text-white font-bold transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #ff6b35, #f7931e)' }}>
              🔄 {language === 'ta' ? 'மீண்டும்' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((current) / TOTAL) * 100;

  return (
    <div className={`min-h-screen pt-20 px-4 pb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="max-w-2xl mx-auto">
        <div className="py-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === 'ta' ? 'கேள்வி' : 'Question'} {current + 1} / {TOTAL}
            </span>
            <span className="text-sm font-bold" style={{ color: '#ff6b35' }}>
              🏅 {score} {language === 'ta' ? 'சரி' : 'correct'}
            </span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #ff6b35, #764ba2)' }} />
          </div>
        </div>

        <div className="mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(255,107,53,0.15)', color: '#ff6b35', border: '1px solid rgba(255,107,53,0.3)' }}>
            📂 {q.category}
          </span>
        </div>

        <div className={`p-6 rounded-3xl mb-6 ${darkMode ? 'glass' : 'bg-white shadow-xl'}`}>
          <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'ta' && q.questionTa ? q.questionTa : q.question}
          </h2>
        </div>

        <div className="space-y-3 mb-6">
          {(language === 'ta' && q.optionsTa ? q.optionsTa : q.options).map((opt, idx) => {
            let style = {};
            if (answered) {
              if (idx === q.correct) {
                style = { background: 'rgba(34,197,94,0.2)', border: '2px solid #22c55e' };
              } else if (idx === selected && idx !== q.correct) {
                style = { background: 'rgba(239,68,68,0.2)', border: '2px solid #ef4444' };
              } else {
                style = { opacity: 0.5 };
              }
            }

            return (
              <button key={idx} onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-4
                  ${!answered && 'hover:scale-[1.02] cursor-pointer'}
                  ${darkMode ? 'glass text-gray-200' : 'bg-white shadow-md text-gray-800'}`}
                style={style} disabled={answered}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${answered && idx === q.correct ? 'bg-green-500 text-white' :
                    answered && idx === selected && idx !== q.correct ? 'bg-red-500 text-white' :
                    darkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  {answered && idx === q.correct ? '✓' : answered && idx === selected ? '✗' : String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm md:text-base">{opt}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`p-5 rounded-2xl mb-6 ${darkMode ? 'glass' : 'bg-blue-50 shadow-md'}`}
            style={{ border: '1px solid rgba(99,102,241,0.3)' }}>
            <p className="text-sm font-bold mb-2" style={{ color: '#667eea' }}>
              💡 {language === 'ta' ? 'விளக்கம்:' : 'Explanation:'}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{q.explanation}</p>
          </div>
        )}

        {answered && (
          <button onClick={handleNext}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #ff6b35, #f7931e)' }}>
            {current + 1 < TOTAL ? `${language === 'ta' ? 'அடுத்தது' : 'Next'} →` : `${language === 'ta' ? 'முடிவுகள்' : 'Results'} 🏆`}
          </button>
        )}
      </div>
    </div>
  );
}
