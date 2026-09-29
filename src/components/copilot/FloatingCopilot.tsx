import React, { useState, useRef, useEffect } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { aiService } from '../../services/aiService';
import {
  BrainCircuit,
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ChevronDown,
  RotateCw,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citedIncidents?: string[];
}

export const FloatingCopilot: React.FC = () => {
  const { activeAlert, memories, setSelectedMemoryDetail } = useSecurity();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello Analyst. I'm CyberMemory AI, linked to Hindsight organizational memory. I am currently monitoring #${activeAlert.incidentId} (${activeAlert.title}). Ask me about past precedents, containment tactics, or investigation steps.`,
      timestamp: '20:48',
      citedIncidents: ['INC-2026-00317']
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const suggestedPrompts = [
    'Have we seen this type of login attack before?',
    'What should I check first?',
    'Explain the 94% match with INC-2026-00317',
    'Draft incident summary for CISO'
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const { reply, citedIncidentIds } = await aiService.askCopilot(text, activeAlert, memories);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citedIncidents: citedIncidentIds
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCitationClick = (incidentId: string) => {
    const mem = memories.find(m => m.incidentId === incidentId);
    if (mem) {
      setSelectedMemoryDetail(mem);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen ? (
        /* Floating Button */
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <BrainCircuit className="w-5 h-5 text-cyan-200" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="tracking-wide">Ask CyberMemory AI</span>
        </button>
      ) : (
        /* Chat Widget */
        <div className="w-[380px] sm:w-[420px] h-[550px] bg-[#091122]/95 border border-cyan-500/40 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#1A2845] bg-[#070D1B] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>CyberMemory AI Copilot</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-slate-400 font-mono">
                  Grounded in Hindsight Memory
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-none shadow-md'
                      : 'bg-[#0E1A33] border border-[#1C2C4E] text-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Cited Historical Incidents */}
                  {msg.citedIncidents && msg.citedIncidents.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-700/60 flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="text-cyan-400 font-mono">Cited Memory:</span>
                      {msg.citedIncidents.map(incId => (
                        <button
                          key={incId}
                          onClick={() => handleCitationClick(incId)}
                          className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-700 text-cyan-300 font-mono hover:bg-cyan-900 transition-colors flex items-center gap-1"
                        >
                          <span>#{incId}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-slate-400 block text-right mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-cyan-400 text-xs font-mono">
                <div className="w-6 h-6 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shrink-0">
                  <RotateCw className="w-3 h-3 animate-spin" />
                </div>
                <span>Querying Hindsight vector space...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-[#070D1B] border-t border-[#16233D] overflow-x-auto whitespace-nowrap flex gap-1.5">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-[#0C152B] border border-[#1E2E50] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors shrink-0 font-medium"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-[#1A2845] bg-[#070D1B]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about this alert, past precedents, remediation..."
                className="flex-1 bg-[#0A1224] border border-[#1E2E50] rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
