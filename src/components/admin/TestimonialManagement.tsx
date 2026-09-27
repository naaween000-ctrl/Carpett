import React, { useState } from 'react';
import { Testimonial } from '../../types/settings';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '../../lib/dataService';
import { Plus, Edit, Trash2, Star, X } from 'lucide-react';

export const TestimonialManagement: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const data = await getTestimonials();
    setTestimonials(data);
    setLoading(false);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setEditing({
      customer_name: '',
      company: '',
      location: '',
      rating: 5,
      testimonial_text: '',
      is_active: true,
      display_order: testimonials.length + 1
    });
    setIsModalOpen(true);
  };

  const handleEdit = (t: Testimonial) => {
    setEditing({ ...t });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete testimonial?')) {
      await deleteTestimonial(id);
      await loadData();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.customer_name || !editing?.testimonial_text) return;
    await saveTestimonial(editing);
    await loadData();
    setIsModalOpen(false);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-charcoal-900">Client Reviews & Testimonials</h2>
          <p className="text-xs text-stone-500">Manage client endorsements displayed on website homepage</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-5 py-2.5 rounded-full bg-burgundy-900 text-gold-400 font-bold text-xs uppercase tracking-wider flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex text-gold-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${t.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>
                  {t.is_active ? 'Active' : 'Disabled'}
                </span>
              </div>
              <p className="text-xs text-stone-700 italic leading-relaxed">"{t.testimonial_text}"</p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-charcoal-900 text-xs block">{t.customer_name}</span>
                <span className="text-[10px] text-stone-500">{t.company || t.location}</span>
              </div>
              <div className="flex space-x-1">
                <button onClick={() => handleEdit(t)} className="p-1.5 text-stone-600 hover:text-burgundy-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 text-stone-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editing && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gold-500/30">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">
                {editing.id ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-charcoal-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-stone-600 mb-1">Customer / Client Name *</label>
                <input
                  type="text"
                  required
                  value={editing.customer_name || ''}
                  onChange={e => setEditing({ ...editing, customer_name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-600 mb-1">Company / Firm</label>
                <input
                  type="text"
                  value={editing.company || ''}
                  onChange={e => setEditing({ ...editing, company: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-600 mb-1">Location</label>
                <input
                  type="text"
                  value={editing.location || ''}
                  onChange={e => setEditing({ ...editing, location: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-600 mb-1">Testimonial Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={editing.testimonial_text || ''}
                  onChange={e => setEditing({ ...editing, testimonial_text: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-full text-stone-600"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-burgundy-900 text-gold-400 rounded-full font-bold uppercase">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
