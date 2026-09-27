import React, { useState } from 'react';
import { SEO } from '../components/ui/SEO';
import { useEnquiries } from '../hooks/useEnquiries';
import { useProducts } from '../hooks/useProducts';
import { analytics } from '../lib/analytics';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export const RetailEnquiry: React.FC = () => {
  const { submitNewEnquiry } = useEnquiries();
  const { products } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    country: 'India',
    product_id: '',
    quantity: 1,
    preferred_size: '8x10 ft',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      await submitNewEnquiry({
        type: 'retail',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        country: formData.country,
        product_id: formData.product_id || undefined,
        quantity: formData.quantity,
        preferred_size: formData.preferred_size,
        message: formData.message,
        source: 'retail_page'
      });

      analytics.trackEnquirySubmit('retail');
      setSuccess(true);
      confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting enquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-ivory text-charcoal-900 pt-28 pb-20">
      <SEO
        title="Retail Carpet Enquiry | Taj Mahal Carpet Bhadohi"
        description="Submit a personal retail carpet inquiry to Taj Mahal Carpet Bhadohi. Find custom rug sizes, wool silk samples, and pricing guidance."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-widest text-burgundy-800 uppercase block mb-2">
            Private Residence & Home Orders
          </span>
          <h1 className="font-serif text-4xl font-bold text-charcoal-900">Retail Carpet Enquiry</h1>
          <p className="text-stone-600 text-sm mt-2">
            Tell us about your space, size preferences, or specific carpet questions. Our Bhadohi team will contact you.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gold-500/30">
          {success ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-900">Thank You for Your Enquiry</h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Your retail request has been logged. Our showroom specialists will connect with you via phone or email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Full Name *</label>
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
                  <label className="block text-stone-600 font-medium mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-600 font-medium mb-1">Select Carpet from Collection (Optional)</label>
                  <select
                    value={formData.product_id}
                    onChange={e => setFormData({ ...formData, product_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  >
                    <option value="">General Showroom Query</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.product_code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Preferred Size</label>
                  <input
                    type="text"
                    value={formData.preferred_size}
                    onChange={e => setFormData({ ...formData, preferred_size: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                    placeholder="e.g. 8x10 ft, 9x12 ft"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Your Message or Custom Dimensions *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your room layout, color scheme, or queries..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Submit Retail Enquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
