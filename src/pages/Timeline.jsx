import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { electionSteps } from '../data/electionData';
import { logTimelineStepViewed } from '../services/firebase';

export default function Timeline() {
  const { darkMode, language, updateTimeline } = useApp();
  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const handleStepClick = (step) => {
    setActiveStep(activeStep?.id === step.id ? null : step);
    if (!completedSteps.has(step.id)) {
      const newCompleted = new Set(completedSteps);
      newCompleted.add(step.id);
      setCompletedSteps(newCompleted);
      updateTimeline(newCompleted.size);
      logTimelineStepViewed(step.id, step.title);
    }
  };

  const progress = (completedSteps.size / electionSteps.length) * 100;

  return (
    <div className={`min-h-screen pt-20 px-4 pb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">
              {language === 'ta' ? 'தேர்தல் காலவரிசை' : 'Election Timeline'}
            </span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {language === 'ta' ? 'ஒவ்வொரு படியையும் கிளிக் செய்யுங்கள்' : 'Click each step to explore'}
          </p>
        </div>

        <div className={`p-5 rounded-2xl mb-10 ${darkMode ? 'glass' : 'bg-white shadow-lg'}`}>
          <div className="flex justify-between items-center mb-3">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'ta' ? 'முன்னேற்றம்' : 'Progress'}
            </span>
            <span className="text-sm font-bold" style={{ color: '#ff6b35' }}>
              {completedSteps.size}/{electionSteps.length}
            </span>
          </div>
          <div className={`h-3 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #ff6b35, #f7931e, #764ba2)' }} />
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #ff6b35, #764ba2)' }} />

          {electionSteps.map((step, index) => {
            const isLeft = index % 2 === 0;
            const isCompleted = completedSteps.has(step.id);
            const isActive = activeStep?.id === step.id;

            return (
              <div key={step.id} className={`relative flex items-start mb-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`absolute left-0 md:left-1/2 w-12 h-12 rounded-full flex items-center justify-center text-xl font-black z-10 transform md:-translate-x-1/2 transition-all duration-300 cursor-pointer
                  ${isCompleted ? 'scale-110' : 'hover:scale-110'}`}
                  style={{
                    background: isCompleted ? `linear-gradient(135deg, ${step.color.replace('from-', '').replace(' to-', ', ')})` : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    border: isCompleted ? 'none' : '2px solid rgba(255,107,53,0.4)'
                  }}
                  onClick={() => handleStepClick(step)}>
                  {isCompleted ? '✓' : step.icon}
                </div>

                <div className={`ml-16 md:ml-0 ${isLeft ? 'md:mr-auto md:pr-16 md:w-5/12' : 'md:ml-auto md:pl-16 md:w-5/12'}`}>
                  <div className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 card-hover
                      ${isActive ? 'ring-2' : ''}
                      ${darkMode ? 'glass' : 'bg-white shadow-lg'}`}
                    style={isActive ? { ringColor: '#ff6b35' } : {}}
                    onClick={() => handleStepClick(step)}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${step.color}`}>
                        {step.icon}
                      </div>
                      <div>
                        <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {language === 'ta' ? step.titleTa : step.title}
                        </div>
                        <div className="text-xs" style={{ color: '#ff6b35' }}>{step.duration}</div>
                      </div>
                      <div className="ml-auto text-lg">{isActive ? '▲' : '▼'}</div>
                    </div>

                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'ta' ? step.descriptionTa : step.description}
                    </p>

                    {isActive && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <span style={{ color: '#ff6b35' }}>→</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
