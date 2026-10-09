import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const SUGGESTED_PROMPTS = [
  'Why is O₂ considered an element even though it is a molecule?',
  'What is the difference between a compound and a mixture?',
  'How do particle arrangements change when ice melts into water?',
  'Explain why salt water is a homogeneous mixture.',
];

export const AiTutorModal: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am Dr. Atom, your AI Chemistry Coach. Ask me anything about atoms, molecules, elements, compounds, mixtures, or particle diagrams!',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Sorry, I could not generate an answer right now. Please try again!',
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'ai',
          text: 'Oops! Unable to reach Dr. Atom right now. Please check server connection.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4 py-4 h-[calc(100vh-140px)] min-h-[500px]">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-full">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Ask Dr. Atom • AI Chemistry Tutor</h2>
            <p className="text-xs text-slate-400">
              Get immediate, clear particle-level explanations for any chemistry question!
            </p>
          </div>
        </div>

        {/* Chat History Container */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed border shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-amber-950/40 border-amber-800/40 text-amber-100 rounded-tr-none'
                    : 'bg-slate-950 border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-cyan-400 text-xs font-semibold p-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Dr. Atom is analyzing particle properties...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-800">
          <span className="text-[11px] font-bold text-slate-500 shrink-0">Try asking:</span>
          {SUGGESTED_PROMPTS.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(p)}
              className="text-xs text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl px-3 py-1.5 whitespace-nowrap transition-colors cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 mt-3">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a question about atoms, molecules, compounds, mixtures..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputPrompt.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg disabled:opacity-40 cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
