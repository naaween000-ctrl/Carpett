import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, Globe, Share2, Shield } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { generateWhatsAppLink } from '../../lib/whatsapp';
import { analytics } from '../../lib/analytics';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  const { settings } = useSiteSettings();

  const handleWhatsApp = () => {
    analytics.trackWhatsAppClick('footer');
    window.open(generateWhatsAppLink(settings.whatsapp_number, 'general'), '_blank');
  };

  return (
    <footer className="bg-charcoal-950 text-stone-300 border-t border-gold-500/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-stone-800/80">
          {/* Column 1: Brand & Craftsmanship */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Logo size="md" />
              <div>
                <h3 className="font-serif text-xl font-bold text-warm-ivory tracking-wider">TAJ MAHAL CARPET</h3>
                <p className="text-[10px] tracking-[0.25em] text-gold-400 uppercase">Bhadohi • Uttar Pradesh</p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed pt-2">
              {settings.footer_content ||
                'Premier manufacturer and exporter of luxury hand-knotted, hand-tufted, and flatweave carpets based in Bhadohi, India — serving discerning retail, wholesale and international clients.'}
            </p>
            <div className="pt-2 flex items-center space-x-3 text-gold-400">
              <span className="text-[11px] uppercase tracking-widest text-stone-400">Follow Us:</span>
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full hover:bg-stone-800 transition-colors hover:text-gold-300"
                  aria-label="Instagram"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full hover:bg-stone-800 transition-colors hover:text-gold-300"
                  aria-label="Facebook"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Navigation & Enquiries */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-gold-400 tracking-wide border-b border-gold-500/20 pb-2 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>About Our Heritage</span>
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Carpet Catalogue</span>
                </Link>
              </li>
              <li>
                <Link to="/enquiry/retail" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Retail Enquiry</span>
                </Link>
              </li>
              <li>
                <Link to="/enquiry/wholesale" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Wholesale & Bulk Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/enquiry/international" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>International Exports</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Showroom Categories */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-gold-400 tracking-wide border-b border-gold-500/20 pb-2 inline-block">
              Collection Highlights
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/catalogue?category=traditional-heritage" className="hover:text-gold-400 transition-colors">
                  Traditional & Heritage Carpets
                </Link>
              </li>
              <li>
                <Link to="/catalogue?category=modern-architectural" className="hover:text-gold-400 transition-colors">
                  Modern & Architectural Rugs
                </Link>
              </li>
              <li>
                <Link to="/catalogue?category=persian-oriental" className="hover:text-gold-400 transition-colors">
                  Persian Silk Masterpieces
                </Link>
              </li>
              <li>
                <Link to="/catalogue?category=hand-knotted" className="hover:text-gold-400 transition-colors">
                  Hand-Knotted Wool Collections
                </Link>
              </li>
              <li>
                <Link to="/catalogue?category=hand-tufted-custom" className="hover:text-gold-400 transition-colors">
                  Custom & Hospitality Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Showroom Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-gold-400 tracking-wide border-b border-gold-500/20 pb-2 inline-block">
              Bhadohi Headquarters
            </h4>
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${settings.phone}`} onClick={() => analytics.trackPhoneClick()} className="hover:text-gold-400 transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${settings.email}`} onClick={() => analytics.trackEmailClick()} className="hover:text-gold-400 transition-colors">
                  {settings.email}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs transition-colors shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Business Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Taj Mahal Carpet. All Rights Reserved. Bhadohi, Uttar Pradesh, India.</p>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-stone-300 transition-colors">
              Craftsmanship Heritage
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-stone-300 transition-colors">
              Showroom Location
            </Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-gold-400 transition-colors flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-gold-500" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
