import React, { useState } from 'react';
import { SEO } from '../components/ui/SEO';
import { useEnquiries } from '../hooks/useEnquiries';
import { analytics } from '../lib/analytics';
import confetti from 'canvas-confetti';
import { Globe, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export const InternationalEnquiry: React.FC = () => {
  const { submitNewEnquiry } = useEnquiries();

  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    email: '',
    phone: '',
    country: 'United States',
    city: 'New York',
    business_type: 'International Importer',
    quantity: 10,
    shipping_destination: 'New York Port (FOB / CIF Air Freight)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.country || !formData.message) {
      setErrorMsg('Please complete all international contact details.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      await submitNewEnquiry({
        type: 'international',
        name: formData.name,
        company_name: formData.company_name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        business_type: formData.business_type,
        quantity: formData.quantity,
        shipping_destination: formData.shipping_destination,
        message: formData.message,
        source: 'international_page'
      });

      analytics.trackEnquirySubmit('international');
      setSuccess(true);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting international export enquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-ivory text-charcoal-900 pt-28 pb-20">
      <SEO
        title="International Carpet Export Enquiry | Taj Mahal Carpet India"
        description="Source authentic handmade wool silk carpets from Bhadohi, India. International export logistics, CIF/FOB terms, air/sea freight handling."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900 text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            <span>Global Exports & Trade</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-900">International Carpet Enquiry</h1>
          <p className="text-stone-600 text-sm mt-2 max-w-xl mx-auto">
            Sourcing Indian handmade carpets for luxury residences, commercial projects, and galleries worldwide.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gold-500/30">
          {success ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-900">International Export Inquiry Received</h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Our export department in Bhadohi will contact you with product catalogues, CIF/FOB logistics terms, and yarn swatch sample shipment details.
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
                  <label className="block text-stone-600 font-medium mb-1">Company / Studio Name</label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={e => setFormData({ ...formData, company_name: e.target.value })}
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
                  <label className="block text-stone-600 font-medium mb-1">Phone Number (with Country Code) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 555 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. USA, UK, UAE, Germany, Australia"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">City / Region</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-600 font-medium mb-1">Destination Port or Delivery City</label>
                  <input
                    type="text"
                    value={formData.shipping_destination}
                    onChange={e => setFormData({ ...formData, shipping_destination: e.target.value })}
                    placeholder="e.g. Port of London / Heathrow Airport CIF"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Export Requirements & Details *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="State your required carpet collections, knot density preferences, wool silk materials, sample swatch requests..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                <span>Submit International Export Enquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
