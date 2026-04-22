import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import HomeEnhanced from './pages/HomeEnhanced';
import Chat from './pages/Chat';
import Timeline from './pages/Timeline';
import Quiz from './pages/Quiz';
import Facts from './pages/Facts';
import { logPageView } from './services/firebase';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const { darkMode } = useApp();

  const navigateTo = (page) => {
    setActivePage(page);
    logPageView(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomeEnhanced setActivePage={navigateTo} />;
      case 'chat': return <Chat />;
      case 'timeline': return <Timeline />;
      case 'quiz': return <Quiz />;
      case 'facts': return <Facts />;
      default: return <HomeEnhanced setActivePage={navigateTo} />;
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
          : 'linear-gradient(135deg, #f8faff 0%, #eef2ff 50%, #fdf4ff 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff6b35, transparent)' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #764ba2, transparent)' }} />
      </div>

      <Navbar activePage={activePage} setActivePage={navigateTo} />
      <main className="relative z-10">{renderPage()}</main>

      <footer className={`relative z-10 py-8 px-4 text-center border-t ${darkMode ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
        <p className="text-sm">🗳️ Election Process Educator AI — Built for <span style={{ color: '#ff6b35' }}>Hack2Skill Virtual PromptWars</span></p>
        <p className="text-xs mt-1">Empowering every citizen with election knowledge 🇮🇳</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
