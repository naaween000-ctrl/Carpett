import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, RefreshCw, ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getGroqChatResponse, ChatMessage } from '../../lib/groq';
import { trackEvent } from '../../lib/analytics';

interface DisplayMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  '🧶 Custom carpet sizes & colors',
  '📦 Wholesale & trade discounts',
  '✈️ International export & shipping',
  '🧼 How to clean & care for wool rugs'
];

export const AIChatbot: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! Welcome to Taj Mahal Carpet Bhadohi. I am your AI Carpet Concierge powered by Groq. How can I assist you with custom rugs, wholesale inquiries, or international exports today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Keep track of raw role history for API context
  const historyRef = useRef<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: DisplayMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: userTime
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    historyRef.current.push({ role: 'user', content: query });
    trackEvent('chat_message_sent', { query });

    try {
      const responseText = await getGroqChatResponse(historyRef.current);
      historyRef.current.push({ role: 'assistant', content: responseText });

      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botMsg: DisplayMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: botTime
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Groq Chatbot Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    historyRef.current = [];
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Chat history cleared. How else may I assist your carpet selection?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Rich Markdown + Route Link Renderer
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    const routeRegex = /(\/(?:catalogue|enquiry\/retail|enquiry\/wholesale|enquiry\/international|contact|about))/g;

    const parseInline = (lineStr: string) => {
      // Split by ** for bold
      const boldParts = lineStr.split(/(\*\*.*?\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        let isBold = false;
        let textToParse = bPart;
        if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
          isBold = true;
          textToParse = bPart.slice(2, -2);
        }

        // Check for site route links
        const routeParts = textToParse.split(routeRegex);
        const renderedRouteParts = routeParts.map((rPart, rIdx) => {
          if (rPart.match(routeRegex)) {
            return (
              <button
                key={`route-${rIdx}`}
                onClick={() => {
                  setIsOpen(false);
                  navigate(rPart);
                }}
                className="inline-flex items-center space-x-1 px-2 py-0.5 my-0.5 mx-1 rounded-full bg-gold-500/20 text-gold-300 font-semibold hover:bg-gold-500/40 border border-gold-500/30 transition-all cursor-pointer"
              >
                <span>{rPart}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </button>
            );
          }
          return <React.Fragment key={`text-${rIdx}`}>{rPart}</React.Fragment>;
        });

        if (isBold) {
          return (
            <strong key={`bold-${bIdx}`} className="font-semibold text-gold-300">
              {renderedRouteParts}
            </strong>
          );
        }
        return <React.Fragment key={`inline-${bIdx}`}>{renderedRouteParts}</React.Fragment>;
      });
    };

    return (
      <div className="space-y-1 text-xs leading-relaxed">
        {lines.map((line, lineIdx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={lineIdx} className="h-0.5" />;

          if (trimmed.startsWith('#')) {
            const headerText = trimmed.replace(/^#+\s*/, '');
            return (
              <h4 key={lineIdx} className="font-serif font-bold text-gold-400 text-xs border-b border-gold-500/20 pb-0.5 mt-2 mb-1">
                {parseInline(headerText)}
              </h4>
            );
          }

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const listText = trimmed.replace(/^[-*]\s*/, '');
            return (
              <div key={lineIdx} className="flex items-start space-x-2 pl-1 py-0.5">
                <span className="text-gold-400 font-bold shrink-0 mt-0.5">•</span>
                <div className="flex-1">{parseInline(listText)}</div>
              </div>
            );
          }

          return <p key={lineIdx}>{parseInline(line)}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating AI Chat Window */}
      {isOpen && (
        <div className="mb-3 w-96 max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] dark-glass-card rounded-3xl shadow-2xl border border-gold-500/40 flex flex-col overflow-hidden animate-fade-in text-warm-ivory backdrop-blur-xl">
          {/* Header */}
          <div className="bg-burgundy-900/90 px-5 py-4 border-b border-gold-500/30 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-charcoal-900 font-bold shadow-md">
                  <Bot className="w-5 h-5 text-charcoal-900" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-burgundy-900 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-serif font-bold text-sm text-warm-ivory">Taj Mahal AI Concierge</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase bg-gold-500/20 text-gold-300 border border-gold-500/40">
                    Groq
                  </span>
                </div>
                <p className="text-[10px] text-stone-300">Bhadohi Carpet Knowledge Base</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleClearChat}
                title="Clear chat history"
                className="p-1.5 text-stone-400 hover:text-gold-400 transition-colors rounded-full hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-warm-ivory transition-colors rounded-full hover:bg-white/10"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2.5 bg-black/30 border-b border-gold-500/20 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-burgundy-900/50 hover:bg-burgundy-800/80 border border-gold-500/30 text-[11px] text-stone-200 hover:text-gold-300 transition-all shrink-0 flex items-center space-x-1"
              >
                <span>{qp}</span>
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-charcoal-900/40 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-burgundy-900 border border-gold-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gold-500 text-charcoal-900 font-medium rounded-tr-none'
                      : 'bg-burgundy-950/90 border border-gold-500/25 text-warm-ivory rounded-tl-none'
                  }`}
                >
                  {renderMessageContent(msg.text)}
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-charcoal-800/80' : 'text-stone-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-gold-600 flex items-center justify-center shrink-0 mt-0.5 text-charcoal-900">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-burgundy-900 border border-gold-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" />
                </div>
                <div className="bg-burgundy-950/90 border border-gold-500/25 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-burgundy-950 border-t border-gold-500/30 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about custom carpets, prices, sizes..."
              className="flex-1 bg-black/40 border border-gold-500/30 rounded-xl px-3.5 py-2.5 text-xs text-warm-ivory placeholder-stone-400 focus:outline-none focus:border-gold-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-bold disabled:opacity-40 transition-colors shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Circular Floating Chat Trigger Button (Styled matching screenshot: thin gold circle ring border) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-charcoal-900/90 hover:bg-charcoal-900 border-2 border-gold-400/80 shadow-2xl flex items-center justify-center text-gold-400 hover:text-gold-300 transition-all transform hover:scale-105 active:scale-95 group relative"
        aria-label="Open AI Carpet Chatbot"
      >
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-charcoal-900 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
        </div>
        {isOpen ? (
          <X className="w-6 h-6 text-gold-400" />
        ) : (
          <MessageCircle className="w-6 h-6 text-gold-400 stroke-[1.75]" />
        )}
      </button>
    </div>
  );
};
