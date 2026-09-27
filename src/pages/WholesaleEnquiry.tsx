import React, { useState } from 'react';
import { SEO } from '../components/ui/SEO';
import { useEnquiries } from '../hooks/useEnquiries';
import { useProducts } from '../hooks/useProducts';
import { analytics } from '../lib/analytics';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Loader2, AlertCircle, Building2 } from 'lucide-react';

export const WholesaleEnquiry: React.FC = () => {
  const { submitNewEnquiry } = useEnquiries();
  const { products } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    email: '',
    phone: '',
    country: 'India',
    city: '',
    business_type: 'Carpet Retailer / Showroom Owner',
    quantity: 20,
    product_id: '',
    budget_range: '₹5,00,000 - ₹20,00,000',
    preferred_size: 'Mixed Batch',
    shipping_destination: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company_name || !formData.email || !formData.phone || !formData.message) {
      setErrorMsg('Please fill in all required company details.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      await submitNewEnquiry({
        type: 'wholesale',
        name: formData.name,
        company_name: formData.company_name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        business_type: formData.business_type,
        quantity: formData.quantity,
        product_id: formData.product_id || undefined,
        budget_range: formData.budget_range,
        preferred_size: formData.preferred_size,
        shipping_destination: formData.shipping_destination,
        message: formData.message,
        source: 'wholesale_page'
      });

      analytics.trackEnquirySubmit('wholesale');
      setSuccess(true);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting wholesale quote request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-ivory text-charcoal-900 pt-28 pb-20">
      <SEO
        title="Wholesale & Bulk Carpet Quote | Taj Mahal Carpet Bhadohi"
        description="Request factory-direct wholesale carpet quotations from Taj Mahal Carpet Bhadohi India. B2B carpet manufacturing for hotels, distributors, and interior firms."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-burgundy-900 text-gold-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>B2B & Bulk Supply</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-900">Wholesale / Bulk Quote Request</h1>
          <p className="text-stone-600 text-sm mt-2 max-w-xl mx-auto">
            Direct carpet manufacturing from Bhadohi, Uttar Pradesh with volume pricing, custom specs, and contract timelines.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gold-500/30">
          {success ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-900">Wholesale Quote Request Received</h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Our export and B2B department in Bhadohi will evaluate your volume requirements and issue a comprehensive wholesale quotation.
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
                  <label className="block text-stone-600 font-medium mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Company / Business Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company_name}
                    onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Business Email *</label>
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
                  <label className="block text-stone-600 font-medium mb-1">Business Type</label>
                  <select
                    value={formData.business_type}
                    onChange={e => setFormData({ ...formData, business_type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  >
                    <option value="Carpet Retailer / Showroom Owner">Carpet Retailer / Showroom Owner</option>
                    <option value="Hotel / Resort Hospitality Project">Hotel / Resort Hospitality Project</option>
                    <option value="Architectural & Interior Design Studio">Architectural & Interior Design Studio</option>
                    <option value="Importer / Regional Distributor">Importer / Regional Distributor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Required Quantity (Units / Sq Ft)</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">City & Country</label>
                  <input
                    type="text"
                    value={`${formData.city}, ${formData.country}`}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                    placeholder="e.g. New Delhi, India"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Shipping Destination / Warehouse</label>
                  <input
                    type="text"
                    value={formData.shipping_destination}
                    onChange={e => setFormData({ ...formData, shipping_destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                    placeholder="e.g. Mumbai Port / Hotel Site Warehouse"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Detailed Bulk Specifications & Timeline *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail carpet designs, knot counts, wool/silk yarn blend, required delivery timeline..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Request Official Wholesale Quote</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
