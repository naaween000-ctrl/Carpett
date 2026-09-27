import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { generateWhatsAppLink } from '../../lib/whatsapp';
import { analytics } from '../../lib/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (type: 'general' | 'wholesale' | 'international') => {
    analytics.trackWhatsAppClick(`floating_widget_${type}`);
    const link = generateWhatsAppLink(settings.whatsapp_number, type);
    window.open(link, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-80 dark-glass-card rounded-2xl p-4 shadow-2xl border border-gold-500/30 text-warm-ivory animate-fade-in">
          <div className="flex items-center justify-between border-b border-gold-500/20 pb-3 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="font-serif font-bold text-lg text-gold-400">Taj Mahal Carpet Showroom</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-warm-ivory transition-colors p-1"
              aria-label="Close WhatsApp options"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-stone-300 mb-4 leading-relaxed">
            Welcome to Taj Mahal Carpet Bhadohi! How can our carpet specialists assist you today?
          </p>
          <div className="space-y-2">
            <button
              onClick={() => handleLinkClick('general')}
              className="w-full text-left px-3 py-2.5 rounded-lg bg-burgundy-900/60 hover:bg-burgundy-800 border border-gold-500/30 text-xs font-medium text-warm-ivory flex items-center justify-between group transition-all"
            >
              <span>General Carpet Inquiry</span>
              <span className="text-gold-400 group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => handleLinkClick('wholesale')}
              className="w-full text-left px-3 py-2.5 rounded-lg bg-burgundy-900/60 hover:bg-burgundy-800 border border-gold-500/30 text-xs font-medium text-warm-ivory flex items-center justify-between group transition-all"
            >
              <span>Wholesale & Bulk Orders</span>
              <span className="text-gold-400 group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => handleLinkClick('international')}
              className="w-full text-left px-3 py-2.5 rounded-lg bg-burgundy-900/60 hover:bg-burgundy-800 border border-gold-500/30 text-xs font-medium text-warm-ivory flex items-center justify-between group transition-all"
            >
              <span>International Exports & Shipping</span>
              <span className="text-gold-400 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3.5 rounded-full shadow-2xl transition-all transform hover:scale-105 group border-2 border-white/20"
        aria-label="Contact Taj Mahal Carpet on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline text-white">WhatsApp Us</span>
      </button>
    </div>
  );
};
