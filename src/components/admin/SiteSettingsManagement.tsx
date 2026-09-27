import React, { useState } from 'react';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { Save, CheckCircle, Loader2 } from 'lucide-react';

export const SiteSettingsManagement: React.FC = () => {
  const { settings, updateSettings, loading } = useSiteSettings();
  const [formData, setFormData] = useState({ ...settings });
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaveLoading(true);
      await updateSettings(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      alert('Failed to save site settings');
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-stone-500">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-gold-500 mb-2" />
        <span>Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-charcoal-900">Website & Showroom Settings</h2>
          <p className="text-xs text-stone-500">
            Configure contact details, WhatsApp number, Bhadohi showroom address, and hero headings
          </p>
        </div>

        {success && (
          <div className="flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <CheckCircle className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
        {/* Business Contact Information */}
        <div>
          <h3 className="font-serif font-bold text-base text-burgundy-900 border-b border-stone-100 pb-2 mb-4">
            Showroom & Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-600 font-medium mb-1">Business Name</label>
              <input
                type="text"
                value={formData.business_name || ''}
                onChange={e => setFormData({ ...formData, business_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-medium mb-1">WhatsApp Business Number (digits only)</label>
              <input
                type="text"
                value={formData.whatsapp_number || ''}
                onChange={e => setFormData({ ...formData, whatsapp_number: e.target.value })}
                placeholder="919415212345"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-medium mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-medium mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-600 font-medium mb-1">Showroom Address in Bhadohi</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-600 font-medium mb-1">Google Maps URL</label>
              <input
                type="text"
                value={formData.google_maps_url || ''}
                onChange={e => setFormData({ ...formData, google_maps_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
              />
            </div>
          </div>
        </div>

        {/* Homepage Content Config */}
        <div>
          <h3 className="font-serif font-bold text-base text-burgundy-900 border-b border-stone-100 pb-2 mb-4 pt-4">
            Homepage Hero & Branding Copy
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-stone-600 font-medium mb-1">Hero Main Heading</label>
              <input
                type="text"
                value={formData.hero_heading || ''}
                onChange={e => setFormData({ ...formData, hero_heading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-medium mb-1">Hero Description Text</label>
              <textarea
                rows={2}
                value={formData.hero_description || ''}
                onChange={e => setFormData({ ...formData, hero_description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-medium mb-1">Footer Brand Text</label>
              <textarea
                rows={2}
                value={formData.footer_content || ''}
                onChange={e => setFormData({ ...formData, footer_content: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <button
            type="submit"
            disabled={saveLoading}
            className="px-8 py-3 bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center space-x-2"
          >
            {saveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Showroom Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
