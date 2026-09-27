import React, { useState } from 'react';
import { SEO } from '../components/ui/SEO';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { useEnquiries } from '../hooks/useEnquiries';
import { sendContactMessageEmail } from '../lib/resend';
import { generateWhatsAppLink } from '../lib/whatsapp';
import { analytics } from '../lib/analytics';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const { settings } = useSiteSettings();
  const { submitNewEnquiry } = useEnquiries();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContactMessageEmail(formData);
      await submitNewEnquiry({
        type: 'general',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: 'India',
        message: formData.subject ? `[Subject: ${formData.subject}] ${formData.message}` : formData.message,
        source: 'contact_page'
      });
      setSuccess(true);
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } catch (err) {
      console.error('Error submitting contact form:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    analytics.trackWhatsAppClick('contact_page');
    window.open(generateWhatsAppLink(settings.whatsapp_number, 'general'), '_blank');
  };

  return (
    <div className="min-h-screen bg-warm-ivory text-charcoal-900 pt-28 pb-20">
      <SEO
        title="Contact Taj Mahal Carpet | Bhadohi Showroom & Factory"
        description="Get in touch with Taj Mahal Carpet in Bhadohi, Uttar Pradesh, India. View map location, call showroom, WhatsApp, or send direct inquiries."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest text-burgundy-800 uppercase block mb-2">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-900">Bhadohi Showroom & Factory</h1>
          <p className="text-stone-600 text-sm mt-2">
            We welcome retail buyers, hotel interior developers, and global importers to connect with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left Column: Direct Contact Info & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-6">
              <h3 className="font-serif font-bold text-2xl text-charcoal-900 border-b border-stone-100 pb-3">
                Contact Details
              </h3>

              <div className="space-y-4 text-xs text-stone-700">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-charcoal-900 block">Showroom Address:</span>
                    <span>{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gold-600 shrink-0" />
                  <div>
                    <span className="font-bold text-charcoal-900 block">Phone Line:</span>
                    <a href={`tel:${settings.phone}`} className="hover:text-burgundy-800 font-mono">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gold-600 shrink-0" />
                  <div>
                    <span className="font-bold text-charcoal-900 block">Email Address:</span>
                    <a href={`mailto:${settings.email}`} className="hover:text-burgundy-800">
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </button>
              </div>
            </div>

            {/* Embedded Google Maps */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-72 relative bg-stone-100">
              <iframe
                title="Bhadohi Carpet Location"
                src="https://maps.google.com/maps?q=Bhadohi%20Uttar%20Pradesh%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gold-500/30 shadow-2xl">
            <h3 className="font-serif font-bold text-2xl text-charcoal-900 mb-6">Send Us a Direct Message</h3>

            {success ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-charcoal-900">Message Received</h4>
                <p className="text-stone-600 text-sm max-w-md mx-auto">
                  Thank you for contacting Taj Mahal Carpet. Our Bhadohi team will respond to your query promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Showroom visit / Carpet question"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Your Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Send Showroom Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
