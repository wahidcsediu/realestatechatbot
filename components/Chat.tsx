
import React, { useState, useRef, useEffect } from 'react';
import { Message, GroundingLink } from '../types';
import { getGeminiResponse } from '../services/gemini';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Real Estate Advisor. I can help you search properties, analyze neighborhood data, or run investment scenarios. What's on your mind today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.warn("Geolocation denied", err)
    );
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse(input, messages, location);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.text,
      timestamp: new Date(),
      groundingLinks: response.links,
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full px-4 py-6">
      <div className="flex-1 overflow-y-auto space-y-6 pb-32 scrollbar-hide pt-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-5 shadow-sm transition-all ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none shadow-blue-100' 
                : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.content}</p>
              
              {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">Verification Sources</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {msg.groundingLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-3 py-1.5 rounded-lg text-slate-600 hover:text-blue-600 font-medium transition-all flex items-center gap-1.5"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-bl-none flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-150"></div>
              <span className="text-xs text-slate-400 ml-2 font-medium">EstateAI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 flex items-center gap-2 group focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Search properties, market forecasts, or neighborhood safety..."
            className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
