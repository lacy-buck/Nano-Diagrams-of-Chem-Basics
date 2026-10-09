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

// Offline rule-based chemistry knowledge engine for instant zero-API tutor responses
const getOfflineTutorResponse = (query: string): string => {
  const q = query.toLowerCase();

  if (q.includes('o2') || q.includes('oxygen') || (q.includes('element') && q.includes('molecule'))) {
    return 'Great question! O₂ is both a molecule and an element! It is a molecule because it consists of 2 atoms bonded together. It is an element because both bonded atoms are the identical type (oxygen). In particle diagrams, you represent this as two connected spheres of the exact same color and size!';
  }

  if (q.includes('difference') && (q.includes('compound') || q.includes('mixture'))) {
    return 'Key difference: In a compound, different types of atoms are chemically bonded together in a fixed ratio (like H₂O). You cannot separate them physically. In a mixture, different substances (elements or compounds) are physically blended without chemical bonds, meaning their proportions can vary and they can be separated by physical methods (filtration, distillation).';
  }

  if (q.includes('ice') || q.includes('melt') || q.includes('liquid') || q.includes('solid') || q.includes('gas') || q.includes('state')) {
    return 'State transitions at the particle level: In solid ice, water molecules vibrate in fixed positions within an orderly lattice. When heat is added, kinetic energy increases until intermolecular forces are overcome. The molecules slide past one another fluidly as a liquid, and eventually break completely free with high kinetic velocity as a gas!';
  }

  if (q.includes('salt') || q.includes('water') || q.includes('homogeneous') || q.includes('heterogeneous')) {
    return 'Salt water (NaCl dissolved in H₂O) is a homogeneous mixture (solution) because the sodium (Na⁺) and chloride (Cl⁻) ions are uniformly dispersed among water molecules at the molecular level. Any sample taken has the exact same composition throughout!';
  }

  if (q.includes('atom') && q.includes('molecule')) {
    return 'An atom is the smallest basic unit of an element (drawn as a single standalone sphere). A molecule consists of two or more atoms chemically bonded together (drawn as touching or connected spheres). A molecule can be an element (like O₂ or N₂) or a compound (like CO₂)!';
  }

  if (q.includes('pure') || q.includes('substance')) {
    return 'A pure substance consists of only one chemical species throughout the container. Every particle unit is identical! Examples include pure elemental neon (all single blue spheres) or pure water (all identical 1-red + 2-blue bonded clusters). If you see two different unbonded particle species in the box, it is a mixture!';
  }

  if (q.includes('compound')) {
    return 'A compound is composed of two or more DIFFERENT elements chemically combined. In a particle diagram, you must see at least two different colors/sizes of spheres touching each other in a uniform, repeating arrangement (like 1 red bonded to 2 whites for H₂O).';
  }

  if (q.includes('element')) {
    return 'An element contains only ONE type of atom. In particle diagrams, all atoms must share the same color and diameter. Elements can exist as monatomic atoms (like He or Ar) or diatomic molecules (like O₂, N₂, or Cl₂)!';
  }

  if (q.includes('heterogeneous')) {
    return 'In a heterogeneous mixture, the components are not evenly distributed. Under a particle lens or macro view, you can distinguish distinct regions or phases (e.g., oil and water, or sand settling at the bottom of water).';
  }

  return 'In particle diagrams: Atoms are represented as colored spheres; chemical bonds are shown as touching spheres. Elements have only one color sphere; compounds feature two or more different colored spheres bonded together; mixtures show two or more distinct, unbonded particle types in the same container!';
};

export const AiTutorModal: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am Dr. Atom, your Chemistry Coach. Ask me anything about atoms, molecules, elements, compounds, mixtures, or particle diagrams! No internet or API keys needed.',
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

    // Instant client-side intelligent response
    setTimeout(() => {
      const responseText = getOfflineTutorResponse(text);
      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: responseText,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 350);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4 py-4 h-[calc(100vh-140px)] min-h-[500px]">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-full">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Ask Dr. Atom • Chemistry Tutor</h2>
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
