import { useState } from 'react';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'home', label: 'Home', labelTa: 'முகப்பு', icon: '🏠' },
  { id: 'chat', label: 'AI Chat', labelTa: 'AI அரட்டை', icon: '🤖' },
  { id: 'timeline', label: 'Timeline', labelTa: 'காலவரிசை', icon: '📊' },
  { id: 'quiz', label: 'Quiz', labelTa: 'வினாடி வினா', icon: '✏️' },
  { id: 'facts', label: 'Facts', labelTa: 'உண்மைகள்', icon: '💡' },
];

export default function Navbar({ activePage, setActivePage }) {
  const { darkMode, toggleDarkMode, language, toggleLanguage, totalXP } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'glass-dark' : 'glass-light'}`}
      style={{ borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('home')}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: 'linear-gradient(135deg, #ff6b35, #f7c59f)' }}>
            🗳️
          </div>
          <div>
            <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Election Educator
            </div>
            <div className="text-xs" style={{ color: '#ff6b35' }}>AI Powered</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${activePage === item.id
                  ? 'text-white'
                  : darkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                }`}
              style={activePage === item.id ? { background: 'linear-gradient(135deg, #ff6b35, #f7931e)' } : {}}
            >
              <span>{item.icon}</span>
              <span>{language === 'ta' ? item.labelTa : item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(255,107,53,0.2)', border: '1px solid rgba(255,107,53,0.3)', color: '#ff6b35' }}>
            ⚡ {totalXP} XP
          </div>

          <button
            onClick={toggleLanguage}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200
              ${darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-gray-700 hover:bg-black/10'}`}
          >
            {language === 'en' ? '🇮🇳 தமிழ்' : '🇬🇧 EN'}
          </button>

          <button
            onClick={toggleDarkMode}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-200
              ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-200
              ${darkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-gray-700'}`}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={`md:hidden px-4 pb-4 ${darkMode ? 'glass-dark' : 'glass-light'}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActivePage(item.id); setMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200 flex items-center gap-3
                ${activePage === item.id
                  ? 'text-white'
                  : darkMode ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-black/5'
                }`}
              style={activePage === item.id ? { background: 'linear-gradient(135deg, #ff6b35, #f7931e)' } : {}}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{language === 'ta' ? item.labelTa : item.label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
