import { useApp } from '../context/AppContext';
import { didYouKnowFacts, badges } from '../data/electionData';

export default function Facts() {
  const { darkMode, language, questionsAsked, quizzesCompleted, bestScore, timelineProgress, totalXP } = useApp();

  const earnedBadgeIds = new Set();
  if (questionsAsked >= 1) earnedBadgeIds.add(1);
  if (questionsAsked >= 5) earnedBadgeIds.add(2);
  if (questionsAsked >= 10) earnedBadgeIds.add(3);
  if (quizzesCompleted >= 1) earnedBadgeIds.add(4);
  if (bestScore >= 100) earnedBadgeIds.add(5);
  if (timelineProgress >= 7) earnedBadgeIds.add(6);

  return (
    <div className={`min-h-screen pt-20 px-4 pb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center py-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">{language === 'ta' ? 'தெரியுமா? 💡' : 'Did You Know? 💡'}</span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {language === 'ta' ? 'சுவாரஸ்யமான உண்மைகள்' : 'Fascinating facts about Indian elections'}
          </p>
        </div>

        <div className={`p-6 rounded-3xl mb-10 ${darkMode ? 'glass' : 'bg-white shadow-xl'}`}>
          <div className="flex flex-wrap gap-6 justify-around">
            {[
              { icon: '⚡', value: totalXP, label: language === 'ta' ? 'மொத்த XP' : 'Total XP', color: '#ff6b35' },
              { icon: '❓', value: questionsAsked, label: language === 'ta' ? 'கேள்விகள்' : 'Questions', color: '#667eea' },
              { icon: '✏️', value: quizzesCompleted, label: language === 'ta' ? 'வினாடி வினா' : 'Quizzes', color: '#22c55e' },
              { icon: '📊', value: `${timelineProgress}/7`, label: language === 'ta' ? 'காலவரிசை' : 'Timeline', color: '#f59e0b' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 className={`text-2xl font-black mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          🌟 {language === 'ta' ? 'சுவாரஸ்யமான உண்மைகள்' : 'Amazing Facts'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {didYouKnowFacts.map(fact => (
            <div key={fact.id}
              className={`p-6 rounded-2xl card-hover transition-all duration-300
                ${darkMode ? 'glass' : 'bg-white shadow-lg'}`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 bg-gradient-to-br ${fact.color}`}>
                {fact.icon}
              </div>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'ta' ? fact.factTa : fact.fact}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: '#ff6b35' }}>
                <span>💡</span>
                <span>{language === 'ta' ? 'உண்மை' : 'Fun Fact'}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 className={`text-2xl font-black mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          🏅 {language === 'ta' ? 'உங்கள் பேட்ஜ்கள்' : 'Your Badges'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {badges.map(badge => {
            const earned = earnedBadgeIds.has(badge.id);
            return (
              <div key={badge.id}
                className={`p-5 rounded-2xl text-center transition-all duration-300
                  ${earned ? 'card-hover' : 'opacity-40'}
                  ${darkMode ? 'glass' : 'bg-white shadow-md'}`}
                style={earned ? { boxShadow: '0 0 20px rgba(255,107,53,0.2)', border: '1px solid rgba(255,107,53,0.3)' } : {}}>
                <div className={`text-4xl mb-3 ${earned ? '' : 'grayscale'}`}>{badge.icon}</div>
                <div className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {badge.name}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {badge.description}
                </div>
                {earned && (
                  <div className="mt-2 text-xs font-bold" style={{ color: '#ff6b35' }}>
                    ✓ {language === 'ta' ? 'பெற்றீர்கள்!' : 'Earned!'}
                  </div>
                )}
                {!earned && (
                  <div className="mt-2 text-xs" style={{ color: '#667eea' }}>
                    🔒 {language === 'ta' ? 'பூட்டப்பட்டது' : 'Locked'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <h2 className={`text-2xl font-black mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          🔗 {language === 'ta' ? 'பயனுள்ள இணைப்புகள்' : 'Useful Links'}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Election Commission of India', url: 'https://eci.gov.in', icon: '🏛️', desc: 'Official ECI website' },
            { name: 'Voter Portal', url: 'https://voters.eci.gov.in', icon: '🗳️', desc: 'Register & check status' },
            { name: 'Voter Helpline', url: 'tel:1950', icon: '📞', desc: 'Call 1950 (Toll-free)' },
            { name: 'NVSP Portal', url: 'https://www.nvsp.in', icon: '📋', desc: 'National Voter Service' },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className={`p-4 rounded-2xl flex items-center gap-4 card-hover transition-all duration-300
                ${darkMode ? 'glass text-gray-300 hover:text-white' : 'bg-white shadow-md text-gray-700 hover:text-gray-900'}`}>
              <span className="text-3xl">{link.icon}</span>
              <div>
                <div className="font-bold text-sm">{link.name}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{link.desc}</div>
              </div>
              <span className="ml-auto" style={{ color: '#ff6b35' }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
