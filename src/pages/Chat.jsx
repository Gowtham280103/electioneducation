import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { aiResponses, suggestedQuestions } from '../data/electionData';
import { logQuestionAsked, saveChatMessage } from '../services/firebase';

function getAIResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('nota')) return aiResponses['what is nota'];
  if (q.includes('voting') || q.includes('vote')) return aiResponses['how does voting work'];
  if (q.includes('who can vote') || q.includes('eligible')) return aiResponses['who can vote'];
  return aiResponses['default'];
}

export default function Chat() {
  const { darkMode, language, addQuestion } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: language === 'ta'
        ? 'வணக்கம்! நான் உங்கள் தேர்தல் AI உதவியாளர். கேள்விகள் கேளுங்கள்! 🗳️'
        : 'Hello! I\'m your Election AI Assistant. Ask me anything about elections! 🗳️',
      title: 'Welcome! 👋',
      tags: ['Welcome']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    const query = text || input.trim();
    if (!query) return;

    const userMsg = { id: Date.now(), role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    addQuestion();

    await new Promise(r => setTimeout(r, 800));

    const response = getAIResponse(query);
    const aiMsg = {
      id: Date.now() + 1,
      role: 'ai',
      content: response.content,
      title: response.title,
      tags: response.tags
    };

    // Log to Firebase
    logQuestionAsked(query, language);
    saveChatMessage(query, response.content, language);

    setIsTyping(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  return (
    <div className={`min-h-screen pt-20 flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col px-4 pb-4">
        <div className="py-6 text-center">
          <h1 className="text-3xl font-black mb-2">
            <span className="gradient-text">AI Election Assistant</span>
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {language === 'ta' ? 'கேள்விகள் கேளுங்கள்' : 'Ask anything about elections'}
          </p>
        </div>

        <div className={`flex-1 rounded-3xl p-4 mb-4 overflow-y-auto min-h-96 max-h-[60vh] ${darkMode ? 'glass' : 'bg-white/70 shadow-xl'}`}>
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 mb-4 chat-bubble ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0
                ${msg.role === 'user' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : ''}`}
                style={msg.role === 'ai' ? { background: 'linear-gradient(135deg, #ff6b35, #f7931e)' } : {}}>
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>

              <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                {msg.role === 'ai' && msg.title && (
                  <div className="font-bold text-base mb-1" style={{ color: '#ff6b35' }}>{msg.title}</div>
                )}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line
                  ${msg.role === 'user'
                    ? 'text-white rounded-tr-sm'
                    : darkMode ? 'glass rounded-tl-sm text-gray-100' : 'bg-gray-50 rounded-tl-sm text-gray-800 shadow-sm'
                  }`}
                  style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #ff6b35, #f7931e)' } : {}}>
                  {msg.content}
                </div>
                {msg.role === 'ai' && msg.tags && (
                  <div className="flex gap-2 flex-wrap mt-1">
                    {msg.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-xs"
                        style={{ background: 'rgba(255,107,53,0.15)', color: '#ff6b35', border: '1px solid rgba(255,107,53,0.3)' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                style={{ background: 'linear-gradient(135deg, #ff6b35, #f7931e)' }}>🤖</div>
              <div className={`px-4 py-3 rounded-2xl ${darkMode ? 'glass' : 'bg-white shadow-md'}`}>
                <div className="flex gap-1 items-center h-5">
                  {[0,1,2].map(i => (
                    <div key={i} className="typing-dot w-2 h-2 rounded-full bg-orange-400" />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="mb-3">
          <p className={`text-xs mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            💡 {language === 'ta' ? 'பரிந்துரைகள்:' : 'Suggested:'}
          </p>
          <div className="flex gap-2 flex-wrap">
            {suggestedQuestions.slice(0, 4).map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 hover:scale-105
                  ${darkMode ? 'glass text-gray-300 hover:text-white' : 'bg-white text-gray-600 shadow hover:shadow-md'}`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className={`flex gap-3 p-3 rounded-2xl ${darkMode ? 'glass' : 'bg-white shadow-xl'}`}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder={language === 'ta' ? 'கேள்வி கேளுங்கள்...' : 'Ask about elections...'}
            className={`flex-1 bg-transparent outline-none text-sm px-2 ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="px-5 py-2 rounded-xl text-white font-medium text-sm transition-all duration-200 hover:scale-105 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #ff6b35, #f7931e)' }}
          >
            {language === 'ta' ? 'அனுப்பு' : 'Send'} ➤
          </button>
        </div>
      </div>
    </div>
  );
}
