import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { FaRobot, FaChartLine, FaQuestionCircle, FaLightbulb, FaVoteYea, FaUsers, FaLandmark, FaFlagCheckered } from 'react-icons/fa';

export default function HomeEnhanced({ setActivePage }) {
  const { darkMode, language } = useApp();
  const canvasRef = useRef(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 107, 53, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stats = [
    { value: "960M+", label: "Registered Voters", labelTa: "வாக்காளர்கள்", icon: <FaUsers className="text-4xl" />, color: "from-blue-500 via-cyan-500 to-teal-500" },
    { value: "543", label: "Lok Sabha Seats", labelTa: "இடங்கள்", icon: <FaLandmark className="text-4xl" />, color: "from-purple-500 via-pink-500 to-rose-500" },
    { value: "1.5M+", label: "Polling Booths", labelTa: "வாக்குச்சாவடிகள்", icon: <FaVoteYea className="text-4xl" />, color: "from-orange-500 via-amber-500 to-yellow-500" },
    { value: "75+", label: "Years of Democracy", labelTa: "ஆண்டுகள்", icon: <FaFlagCheckered className="text-4xl" />, color: "from-green-500 via-emerald-500 to-teal-500" },
  ];

  const features = [
    { 
      icon: <FaRobot className="text-5xl" />, 
      title: "AI Chat", 
      titleTa: "AI அரட்டை", 
      desc: "Intelligent assistant powered by advanced AI to answer all your election questions instantly", 
      descTa: "கேள்விகள் கேளுங்கள்", 
      color: "from-blue-500 via-indigo-500 to-purple-500", 
      page: "chat",
      gradient: "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
    },
    { 
      icon: <FaChartLine className="text-5xl" />, 
      title: "Interactive Timeline", 
      titleTa: "காலவரிசை", 
      desc: "Explore the complete 7-stage election process with beautiful visualizations", 
      descTa: "செயல்முறையை ஆராயுங்கள்", 
      color: "from-purple-500 via-pink-500 to-rose-500", 
      page: "timeline",
      gradient: "bg-gradient-to-br from-purple-500/20 to-rose-500/20"
    },
    { 
      icon: <FaQuestionCircle className="text-5xl" />, 
      title: "Smart Quiz", 
      titleTa: "வினாடி வினா", 
      desc: "Test your election knowledge with gamified quizzes and earn badges", 
      descTa: "அறிவை சோதியுங்கள்", 
      color: "from-orange-500 via-red-500 to-pink-500", 
      page: "quiz",
      gradient: "bg-gradient-to-br from-orange-500/20 to-pink-500/20"
    },
    { 
      icon: <FaLightbulb className="text-5xl" />, 
      title: "Amazing Facts", 
      titleTa: "உண்மைகள்", 
      desc: "Discover fascinating facts about Indian democracy and elections", 
      descTa: "உண்மைகளை கண்டறியுங்கள்", 
      color: "from-green-500 via-teal-500 to-cyan-500", 
      page: "facts",
      gradient: "bg-gradient-to-br from-green-500/20 to-cyan-500/20"
    },
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Animated particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl morph"
          style={{ background: 'radial-gradient(circle, #ff6b35, transparent)' }} />
        <div className="absolute top-40 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl morph"
          style={{ background: 'radial-gradient(circle, #764ba2, transparent)', animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full opacity-25 blur-3xl morph"
          style={{ background: 'radial-gradient(circle, #f7931e, transparent)', animationDelay: '4s' }} />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold mb-8 glass neon-border shine"
            style={{ background: 'rgba(255,107,53,0.1)' }}>
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500 animate-pulse" />
            <span className="gradient-text-rainbow">
              {language === 'ta' ? 'AI-இயக்கப்படும் தேர்தல் கல்வி' : 'AI-Powered Election Education Platform'}
            </span>
            <span className="text-2xl">🚀</span>
          </div>

          {/* Main headline with glow */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className={`${darkMode ? 'text-white' : 'text-gray-900'} glow-text`}>
              {language === 'ta' ? 'தேர்தல் ' : 'Master '}
            </span>
            <br />
            <span className="gradient-text text-7xl md:text-9xl">
              {language === 'ta' ? 'புரிந்துகொள்ளுங்கள்' : 'Elections'}
            </span>
            <br />
            <span className={`${darkMode ? 'text-white' : 'text-gray-900'} holographic bg-clip-text text-transparent`}>
              {language === 'ta' ? 'எளிதாக' : 'With AI'}
            </span>
          </h1>

          <p className={`text-2xl md:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            {language === 'ta'
              ? 'AI உதவியாளர் மூலம் இந்திய தேர்தல் செயல்முறையை எளிதாக புரிந்துகொள்ளுங்கள்.'
              : 'Your intelligent companion to understand Indian democracy, voting rights, and the complete election process.'}
          </p>

          {/* CTA Buttons with advanced effects */}
          <div className="flex flex-wrap gap-6 justify-center mb-16">
            <button
              onClick={() => setActivePage('chat')}
              className="group relative px-10 py-5 rounded-2xl text-white font-bold text-xl transition-all duration-500 hover:scale-110 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #ff6b35, #f7931e, #ff6b35)', backgroundSize: '200% 100%' }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <FaRobot className="text-2xl group-hover:rotate-12 transition-transform" />
                {language === 'ta' ? 'AI-யிடம் கேளுங்கள்' : 'Ask AI Now'}
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            <button
              onClick={() => setActivePage('timeline')}
              className={`group px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 hover:scale-110 glass-dark neon-glow
                ${darkMode ? 'text-white hover:bg-white/20' : 'text-gray-900 bg-white/90 hover:bg-white'}`}
            >
              <span className="flex items-center gap-3">
                <FaChartLine className="text-2xl group-hover:scale-125 transition-transform" />
                {language === 'ta' ? 'காலவரிசை காண்க' : 'Explore Timeline'}
              </span>
            </button>
          </div>

          {/* Floating 3D emojis */}
          <div className="relative h-32">
            <div className="absolute top-0 left-1/4 text-7xl float-anim opacity-80">🗳️</div>
            <div className="absolute top-0 right-1/4 text-6xl float-anim opacity-70" style={{ animationDelay: '1s' }}>🏛️</div>
            <div className="absolute bottom-0 left-1/3 text-5xl float-anim opacity-60" style={{ animationDelay: '2s' }}>⚖️</div>
            <div className="absolute bottom-0 right-1/3 text-6xl float-anim opacity-75" style={{ animationDelay: '3s' }}>🇮🇳</div>
          </div>
        </div>
      </section>

      {/* Stats Section with 3D cards */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i}
              className={`group p-8 rounded-3xl text-center card-3d glass neon-border relative overflow-hidden`}
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10">
                <div className={`mb-4 inline-block p-4 rounded-2xl bg-gradient-to-br ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language === 'ta' ? stat.labelTa : stat.label}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section with advanced cards */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-black mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className="gradient-text">Powerful Features</span>
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'ta' ? 'தேர்தல் கல்விக்கான அனைத்து கருவிகளும்' : 'Everything you need to become an informed voter'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => setActivePage(f.page)}
                className={`group p-8 rounded-3xl text-left card-3d glass relative overflow-hidden ${f.gradient}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 transition-all duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${f.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {f.icon}
                  </div>
                  
                  <h3 className={`text-3xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:translate-x-2 transition-transform`}>
                    {language === 'ta' ? f.titleTa : f.title}
                  </h3>
                  
                  <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {language === 'ta' ? f.descTa : f.desc}
                  </p>
                  
                  <div className={`flex items-center gap-3 text-lg font-bold bg-gradient-to-r ${f.color} bg-clip-text text-transparent group-hover:gap-5 transition-all`}>
                    {language === 'ta' ? 'ஆராயுங்கள்' : 'Explore Now'}
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner with holographic effect */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative p-12 rounded-3xl text-center overflow-hidden glass neon-border">
            <div className="absolute inset-0 holographic opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 glow-text">
                {language === 'ta' ? 'உங்கள் வாக்கு முக்கியம்!' : 'Your Vote Matters! 🗳️'}
              </h2>
              <p className="text-white/90 text-2xl mb-10 max-w-3xl mx-auto">
                {language === 'ta'
                  ? 'ஒவ்வொரு வாக்கும் ஒரு குரல். இன்றே தேர்தல் செயல்முறையை அறிந்துகொள்ளுங்கள்.'
                  : 'Every vote is a voice. Learn about the election process today and become an empowered citizen.'}
              </p>
              <button
                onClick={() => setActivePage('quiz')}
                className="group px-12 py-6 bg-white rounded-2xl font-black text-2xl transition-all duration-500 hover:scale-110 magnetic"
                style={{ color: '#ff6b35' }}
              >
                <span className="flex items-center gap-3">
                  🎯 {language === 'ta' ? 'வினாடி வினா தொடங்குங்கள்' : 'Start the Quiz'}
                  <span className="group-hover:rotate-90 transition-transform">→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
