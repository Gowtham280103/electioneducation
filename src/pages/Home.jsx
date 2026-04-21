import { useApp } from '../context/AppContext';

export default function Home({ setActivePage }) {
  const { darkMode, language } = useApp();

  const stats = [
    { value: "960M+", label: "Registered Voters", labelTa: "வாக்காளர்கள்", icon: "👥" },
    { value: "543", label: "Lok Sabha Seats", labelTa: "இடங்கள்", icon: "🏛️" },
    { value: "1.5M+", label: "Polling Booths", labelTa: "வாக்குச்சாவடிகள்", icon: "🗳️" },
    { value: "75+", label: "Years of Democracy", labelTa: "ஆண்டுகள்", icon: "🇮🇳" },
  ];

  const features = [
    { icon: "🤖", title: "AI Chat", titleTa: "AI அரட்டை", desc: "Ask questions about elections", descTa: "கேள்விகள் கேளுங்கள்", color: "from-blue-500 to-cyan-500", page: "chat" },
    { icon: "📊", title: "Timeline", titleTa: "காலவரிசை", desc: "Explore election process", descTa: "செயல்முறையை ஆராயுங்கள்", color: "from-purple-500 to-pink-500", page: "timeline" },
    { icon: "✏️", title: "Quiz", titleTa: "வினாடி வினா", desc: "Test your knowledge", descTa: "அறிவை சோதியுங்கள்", color: "from-orange-500 to-yellow-500", page: "quiz" },
    { icon: "💡", title: "Facts", titleTa: "உண்மைகள்", desc: "Discover amazing facts", descTa: "உண்மைகளை கண்டறியுங்கள்", color: "from-green-500 to-teal-500", page: "facts" },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff6b35, transparent)' }} />
        <div className="absolute top-40 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #764ba2, transparent)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.3)', color: '#ff6b35' }}>
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            {language === 'ta' ? 'AI-இயக்கப்படும் தேர்தல் கல்வி' : 'AI-Powered Election Education'}
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>
              {language === 'ta' ? 'தேர்தல் ' : 'Understand '}
            </span>
            <span className="gradient-text">
              {language === 'ta' ? 'புரிந்துகொள்ளுங்கள்' : 'Elections'}
            </span>
            <br />
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>
              {language === 'ta' ? 'எளிதாக' : 'Like Never Before'}
            </span>
          </h1>

          <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'ta'
              ? 'AI உதவியாளர் மூலம் இந்திய தேர்தல் செயல்முறையை எளிதாக புரிந்துகொள்ளுங்கள்.'
              : 'Your intelligent guide to understanding the Indian election process, voting rights, and democracy.'}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setActivePage('chat')}
              className="px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 pulse-glow"
              style={{ background: 'linear-gradient(135deg, #ff6b35, #f7931e)' }}
            >
              🤖 {language === 'ta' ? 'AI-யிடம் கேளுங்கள்' : 'Ask AI Now'}
            </button>
            <button
              onClick={() => setActivePage('timeline')}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105
                ${darkMode ? 'glass text-white hover:bg-white/15' : 'bg-white text-gray-900 shadow-lg hover:shadow-xl'}`}
            >
              📊 {language === 'ta' ? 'காலவரிசை' : 'Explore Timeline'}
            </button>
          </div>
        </div>

        <div className="absolute top-32 right-10 text-6xl float-anim hidden lg:block">🗳️</div>
        <div className="absolute bottom-10 left-10 text-5xl float-anim hidden lg:block" style={{ animationDelay: '1s' }}>🏛️</div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 rounded-2xl text-center card-hover ${darkMode ? 'glass' : 'bg-white shadow-lg'}`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-black gradient-text">{stat.value}</div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'ta' ? stat.labelTa : stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {language === 'ta' ? 'அம்சங்கள்' : 'Explore Features'}
            </h2>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              {language === 'ta' ? 'தேர்தல் கல்விக்கான கருவிகள்' : 'Everything you need to become an informed voter'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => setActivePage(f.page)}
                className={`p-6 rounded-2xl text-left card-hover transition-all duration-300
                  ${darkMode ? 'glass hover:bg-white/12' : 'bg-white shadow-lg hover:shadow-xl'}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 bg-gradient-to-br ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'ta' ? f.titleTa : f.title}
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {language === 'ta' ? f.descTa : f.desc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium" style={{ color: '#ff6b35' }}>
                  {language === 'ta' ? 'ஆராயுங்கள்' : 'Explore'} →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-10 rounded-3xl text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #764ba2 100%)' }}>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">
              {language === 'ta' ? 'உங்கள் வாக்கு முக்கியம்!' : 'Your Vote Matters! 🗳️'}
            </h2>
            <p className="text-white/90 text-lg mb-8 relative z-10">
              {language === 'ta'
                ? 'ஒவ்வொரு வாக்கும் ஒரு குரல். இன்றே தேர்தல் செயல்முறையை அறிந்துகொள்ளுங்கள்.'
                : 'Every vote is a voice. Learn about the election process today.'}
            </p>
            <button
              onClick={() => setActivePage('quiz')}
              className="px-8 py-4 bg-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 relative z-10"
              style={{ color: '#ff6b35' }}
            >
              🎯 {language === 'ta' ? 'வினாடி வினா' : 'Start Quiz'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
