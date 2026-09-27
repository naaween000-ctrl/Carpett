import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product } from '../../types/product';
import { EnquiryType, EnquiryFormData } from '../../types/enquiry';
import { useEnquiries } from '../../hooks/useEnquiries';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { generateWhatsAppLink } from '../../lib/whatsapp';
import { analytics } from '../../lib/analytics';

interface EnquiryModalProps {
  product?: Product;
  type?: EnquiryType;
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  product,
  type = 'retail',
  isOpen,
  onClose
}) => {
  const { submitNewEnquiry } = useEnquiries();
  const { settings } = useSiteSettings();

  const [enquiryType, setEnquiryType] = useState<EnquiryType>(type);
  const [formData, setFormData] = useState<Partial<EnquiryFormData>>({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    country: 'India',
    city: '',
    business_type: enquiryType === 'retail' ? 'Private Buyer' : 'Architect / Interior Designer',
    quantity: 1,
    preferred_size: product?.size_options?.split(',')[0] || '8x10 ft',
    budget_range: '',
    shipping_destination: '',
    message: product
      ? `Hello Taj Mahal Carpet team, I am interested in ordering/inquiring about ${product.name} (Code: ${product.product_code}). Please provide pricing, lead time, and specifications.`
      : 'Hello Taj Mahal Carpet, I would like to request information and pricing for carpets.'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMessage('Please complete all required fields (Name, Email, Phone, Message).');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      await submitNewEnquiry({
        type: enquiryType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.company_name,
        country: formData.country || 'India',
        city: formData.city,
        business_type: formData.business_type,
        product_id: product?.id,
        quantity: formData.quantity,
        preferred_size: formData.preferred_size,
        budget_range: formData.budget_range,
        shipping_destination: formData.shipping_destination,
        message: formData.message,
        source: product ? 'product_modal' : `${enquiryType}_modal`
      });

      analytics.trackEnquirySubmit(enquiryType, product?.name);
      setSuccess(true);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while submitting your enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    analytics.trackWhatsAppClick('enquiry_modal_success', product?.name);
    const link = generateWhatsAppLink(
      settings.whatsapp_number,
      product ? 'product' : enquiryType,
      product ? { name: product.name, code: product.product_code } : undefined
    );
    window.open(link, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gold-500/30 overflow-hidden my-8 animate-fade-in">
        {/* Header Ribbon */}
        <div className="bg-burgundy-900 px-6 py-5 text-warm-ivory flex items-center justify-between border-b border-gold-500/30">
          <div>
            <span className="text-[10px] tracking-[0.2em] text-gold-400 uppercase font-semibold block">
              Taj Mahal Carpet Showroom
            </span>
            <h3 className="font-serif text-xl font-bold">
              {product ? `Enquire: ${product.name}` : 'Request Carpet Quote & Information'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-gold-400 transition-colors rounded-full hover:bg-burgundy-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success Confirmation */}
        <div className="p-6">
          {success ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-charcoal-900">Enquiry Successfully Submitted!</h4>
              <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold">{formData.name}</span>. Your enquiry has been received at our Bhadohi headquarters. Our carpet specialists will contact you promptly with complete specifications.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Continue on WhatsApp Now</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-stone-300 hover:border-gold-500 text-stone-700 text-xs font-semibold uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              {!product && (
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-warm-cream/60 rounded-2xl border border-stone-200 text-xs font-semibold mb-4">
                  {(['retail', 'wholesale', 'international'] as EnquiryType[]).map(t => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setEnquiryType(t)}
                      className={`py-2 rounded-xl uppercase tracking-wider transition-all ${
                        enquiryType === t
                          ? 'bg-burgundy-900 text-gold-400 shadow-md'
                          : 'text-stone-600 hover:text-charcoal-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajiv Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-gold-500 text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email || ''}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rajiv@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-gold-500 text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone || ''}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-gold-500 text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">
                    {enquiryType === 'retail' ? 'City' : 'Company / Firm Name'}
                  </label>
                  <input
                    type="text"
                    value={enquiryType === 'retail' ? formData.city || '' : formData.company_name || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        [enquiryType === 'retail' ? 'city' : 'company_name']: e.target.value
                      })
                    }
                    placeholder={enquiryType === 'retail' ? 'e.g. Mumbai' : 'e.g. Royal Interiors LLC'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-gold-500 text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country || 'India'}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    placeholder="India / United Kingdom / UAE"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-gold-500 text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Preferred Carpet Size / Custom</label>
                  <input
                    type="text"
                    value={formData.preferred_size || ''}
                    onChange={e => setFormData({ ...formData, preferred_size: e.target.value })}
                    placeholder="e.g. 8x10 ft, 9x12 ft, Custom Wall-to-Wall"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-gold-500 text-charcoal-900"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-stone-600 font-medium text-xs mb-1">
                  Message / Custom Requirements *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message || ''}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your requirements, timeline, or color preferences..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-gold-500 text-charcoal-900 text-xs"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-600 hover:text-charcoal-900 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-900 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Official Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
