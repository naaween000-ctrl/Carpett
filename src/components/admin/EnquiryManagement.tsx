import React, { useState } from 'react';
import { Enquiry, EnquiryStatus, EnquiryPriority } from '../../types/enquiry';
import { useEnquiries } from '../../hooks/useEnquiries';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { generateWhatsAppLink } from '../../lib/whatsapp';
import { MessageCircle, Phone, Mail, FileText, CheckCircle, Clock, AlertTriangle, Plus, X } from 'lucide-react';

export const EnquiryManagement: React.FC = () => {
  const { enquiries, loading, updateStatus, addNote } = useEnquiries();
  const { settings } = useSiteSettings();

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [noteInput, setNoteInput] = useState<string>('');

  const filteredEnquiries = enquiries.filter(e => {
    if (filterType !== 'all' && e.type !== filterType) return false;
    if (filterStatus !== 'all' && e.status !== filterStatus) return false;
    return true;
  });

  const handleStatusChange = async (id: string, status: EnquiryStatus) => {
    await updateStatus(id, status);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }
  };

  const handlePriorityChange = async (id: string, priority: EnquiryPriority) => {
    await updateStatus(id, selectedEnquiry?.status || 'new', priority);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, priority });
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !noteInput.trim()) return;

    await addNote(selectedEnquiry.id, noteInput.trim());
    setNoteInput('');
    // Refresh modal enquiry note state locally
    setSelectedEnquiry({
      ...selectedEnquiry,
      notes: [
        ...(selectedEnquiry.notes || []),
        {
          id: `note-${Date.now()}`,
          enquiry_id: selectedEnquiry.id,
          note_text: noteInput.trim(),
          created_at: new Date().toISOString()
        }
      ]
    });
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'quoted':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'converted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'closed':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      default:
        return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-charcoal-900">Enquiry & Lead Management</h2>
          <p className="text-xs text-stone-500">Track and respond to retail, wholesale and international buyers</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-warm-cream/50 border border-stone-300 font-medium"
          >
            <option value="all">All Enquiry Types</option>
            <option value="retail">Retail Enquiries</option>
            <option value="wholesale">Wholesale & Bulk</option>
            <option value="international">International Exports</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-warm-cream/50 border border-stone-300 font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-warm-cream/70 text-charcoal-900 uppercase font-semibold text-[10px] tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Client Name & Firm</th>
                <th className="py-3.5 px-4">Carpet / Interest</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredEnquiries.map(enq => (
                <tr key={enq.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono text-[10px] text-stone-500 whitespace-nowrap">
                    {new Date(enq.created_at).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: '2-digit'
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        enq.type === 'wholesale'
                          ? 'bg-burgundy-900 text-gold-400'
                          : enq.type === 'international'
                          ? 'bg-blue-900 text-blue-200'
                          : 'bg-stone-100 text-stone-800'
                      }`}
                    >
                      {enq.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-charcoal-900">
                    <span className="font-bold block">{enq.name}</span>
                    {enq.company_name && <span className="text-[10px] text-stone-500 block">{enq.company_name}</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-burgundy-800">
                      {enq.product_name || enq.product_code || 'General Catalogue Inquiry'}
                    </span>
                    {enq.quantity && <span className="text-[10px] text-stone-500 block">Qty: {enq.quantity} units</span>}
                  </td>
                  <td className="py-3 px-4 text-stone-600">{enq.country || 'India'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusBadge(enq.status)}`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedEnquiry(enq)}
                      className="px-3 py-1.5 rounded-lg bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 font-semibold text-[11px] transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gold-500/30 my-8">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
              <div>
                <span className="text-[10px] text-gold-600 font-mono uppercase font-bold">
                  Enquiry ID: {selectedEnquiry.id}
                </span>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  {selectedEnquiry.name} ({selectedEnquiry.type.toUpperCase()})
                </h3>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="text-stone-400 hover:text-charcoal-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Contact Row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <a
                href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Client</span>
              </a>

              <a
                href={`tel:${selectedEnquiry.phone}`}
                className="py-2.5 px-3 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-warm-ivory font-semibold text-xs flex items-center justify-center space-x-2 transition-colors border border-gold-500/30"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call Client</span>
              </a>

              <a
                href={`mailto:${selectedEnquiry.email}`}
                className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-charcoal-900 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>
            </div>

            {/* Client Details Grid */}
            <div className="grid grid-cols-2 gap-4 bg-warm-cream/40 p-4 rounded-2xl border border-stone-200 text-xs mb-6">
              <div>
                <span className="text-stone-400 block">Email Address</span>
                <span className="font-semibold text-charcoal-900">{selectedEnquiry.email}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Phone Number</span>
                <span className="font-semibold text-charcoal-900">{selectedEnquiry.phone}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Company / Business Type</span>
                <span className="font-semibold text-charcoal-900">
                  {selectedEnquiry.company_name || selectedEnquiry.business_type || 'Private Retail'}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block">Country / City</span>
                <span className="font-semibold text-charcoal-900">
                  {selectedEnquiry.city ? `${selectedEnquiry.city}, ` : ''}
                  {selectedEnquiry.country}
                </span>
              </div>
            </div>

            {/* Status & Priority Controller */}
            <div className="flex items-center justify-between bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs mb-6">
              <div>
                <span className="text-stone-500 font-medium block mb-1">Update Lead Status</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={e => handleStatusChange(selectedEnquiry.id, e.target.value as EnquiryStatus)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 font-bold text-burgundy-900"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="quoted">Quoted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <span className="text-stone-500 font-medium block mb-1">Set Priority</span>
                <select
                  value={selectedEnquiry.priority}
                  onChange={e => handlePriorityChange(selectedEnquiry.id, e.target.value as EnquiryPriority)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 font-bold"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>

            {/* Client Message */}
            <div className="mb-6">
              <h4 className="font-serif font-bold text-charcoal-900 text-sm mb-2">Customer Message</h4>
              <p className="p-4 rounded-2xl bg-stone-100/70 border border-stone-200 text-stone-700 text-xs leading-relaxed italic">
                "{selectedEnquiry.message}"
              </p>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-charcoal-900 text-sm">Internal Admin Notes</h4>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-2">
                {selectedEnquiry.notes && selectedEnquiry.notes.length > 0 ? (
                  selectedEnquiry.notes.map(n => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-warm-cream/70 border border-gold-500/20 text-xs">
                      <p className="text-stone-800">{n.note_text}</p>
                      <span className="text-[10px] text-stone-400 block mt-1">
                        {new Date(n.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-400 italic">No notes added yet.</p>
                )}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={noteInput}
                  onChange={e => setNoteInput(e.target.value)}
                  placeholder="Add internal follow-up note..."
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-burgundy-900 text-gold-400 font-bold text-xs uppercase"
                >
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
