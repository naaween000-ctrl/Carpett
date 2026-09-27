import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, ShieldCheck, Send } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { generateWhatsAppLink } from '../../lib/whatsapp';
import { analytics } from '../../lib/analytics';
import { EnquiryModal } from '../enquiry/EnquiryModal';
import { Logo } from '../ui/Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const { settings } = useSiteSettings();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Wholesale & Bulk', path: '/enquiry/wholesale' },
    { name: 'International', path: '/enquiry/international' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleWhatsApp = () => {
    analytics.trackWhatsAppClick('navbar');
    window.open(generateWhatsAppLink(settings.whatsapp_number, 'general'), '_blank');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-charcoal-900/95 backdrop-blur-md py-3 shadow-2xl border-b border-gold-500/20 text-warm-ivory'
            : 'bg-gradient-to-b from-charcoal-900/90 via-charcoal-900/60 to-transparent py-5 text-warm-ivory'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <Logo size="md" className="group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-warm-ivory group-hover:text-gold-400 transition-colors">
                  TAJ MAHAL CARPET
                </span>
                <span className="text-[10px] tracking-[0.25em] text-gold-400 uppercase font-light">
                  Bhadohi • India
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                    isActive(link.path)
                      ? 'text-gold-400 font-semibold'
                      : 'text-stone-300 hover:text-warm-ivory'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400 rounded-full animate-fade-in" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Header Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => setIsEnquiryModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-900 font-semibold text-xs tracking-wider uppercase shadow-lg hover:shadow-gold-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Enquire Now
              </button>

              <Link
                to="/admin/login"
                className="p-2.5 text-stone-400 hover:text-gold-400 transition-colors"
                title="Admin Portal"
              >
                <ShieldCheck className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center space-x-3 lg:hidden">
              <button
                onClick={() => setIsEnquiryModalOpen(true)}
                className="px-3 py-1.5 rounded-full bg-gold-500 text-charcoal-900 font-semibold text-[11px] uppercase tracking-wider"
              >
                Enquire
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-warm-ivory hover:text-gold-400 focus:outline-none"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden dark-glass-card border-b border-gold-500/30 mt-3 px-4 pt-4 pb-6 space-y-4 animate-fade-in text-warm-ivory">
            <div className="flex flex-col space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-burgundy-900/80 text-gold-400 font-bold border-l-4 border-gold-400'
                      : 'text-stone-300 hover:bg-stone-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-gold-500/20 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsEnquiryModalOpen(true);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-burgundy-900 text-gold-400 font-medium text-xs uppercase tracking-wider border border-gold-500/40"
              >
                <Send className="w-4 h-4" />
                <span>Submit Official Enquiry</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleWhatsApp();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium text-xs uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct Enquiry</span>
              </button>

              <a
                href={`tel:${settings.phone}`}
                onClick={() => {
                  analytics.trackPhoneClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-warm-ivory font-medium text-xs uppercase tracking-wider border border-gold-500/30"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call Us: {settings.phone}</span>
              </a>

              <div className="flex justify-between items-center pt-2 text-xs text-stone-400">
                <span>Bhadohi Showroom</span>
                <Link
                  to="/admin/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gold-400 hover:underline flex items-center space-x-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Enquiry Modal triggered from Navbar */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        type="retail"
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </>
  );
};
