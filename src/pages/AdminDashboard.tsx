import React, { useState } from 'react';
import { Logo } from '../components/ui/Logo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useEnquiries } from '../hooks/useEnquiries';
import { SEO } from '../components/ui/SEO';
import { ProductManagement } from '../components/admin/ProductManagement';
import { CategoryManagement } from '../components/admin/CategoryManagement';
import { EnquiryManagement } from '../components/admin/EnquiryManagement';
import { TestimonialManagement } from '../components/admin/TestimonialManagement';
import { SiteSettingsManagement } from '../components/admin/SiteSettingsManagement';
import {
  Package,
  Layers,
  Inbox,
  Star,
  Settings,
  LogOut,
  LayoutDashboard,
  Building2,
  Globe,
  UserCheck,
  TrendingUp,
  ShieldAlert,
  Loader2
} from 'lucide-react';

type TabType = 'overview' | 'products' | 'categories' | 'enquiries' | 'testimonials' | 'settings';

export const AdminDashboard: React.FC = () => {
  const { isAdmin, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { enquiries } = useEnquiries();

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  React.useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center text-gold-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  // Compute Overview Statistics
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.is_available).length;
  const newEnquiries = enquiries.filter(e => e.status === 'new').length;
  const wholesaleEnquiries = enquiries.filter(e => e.type === 'wholesale').length;
  const retailEnquiries = enquiries.filter(e => e.type === 'retail').length;
  const internationalEnquiries = enquiries.filter(e => e.type === 'international').length;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-stone-100 text-charcoal-900 flex flex-col pt-24">
      <SEO title="Admin Dashboard | Taj Mahal Carpet Bhadohi" description="Taj Mahal Carpet Showroom Administration" />

      {/* Admin Sub-Header Bar */}
      <div className="bg-charcoal-900 text-warm-ivory py-4 px-6 border-b border-gold-500/20 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Logo size="sm" />
            <div>
              <h1 className="font-serif font-bold text-lg text-warm-ivory">Taj Mahal Carpet Dashboard</h1>
              <p className="text-[10px] text-gold-400 tracking-widest uppercase">Bhadohi Operations & Lead Control</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-stone-300 hidden sm:inline">Signed in as Admin</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-gold-400 border border-gold-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Navigation Tabs Header */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 border-b border-stone-200 text-xs font-bold scrollbar-thin">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === 'overview'
                ? 'bg-burgundy-900 text-gold-400 shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === 'products'
                ? 'bg-burgundy-900 text-gold-400 shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({totalProducts})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === 'categories'
                ? 'bg-burgundy-900 text-gold-400 shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all shrink-0 relative ${
              activeTab === 'enquiries'
                ? 'bg-burgundy-900 text-gold-400 shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Enquiries & Leads ({enquiries.length})</span>
            {newEnquiries > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute top-2 right-2 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === 'testimonials'
                ? 'bg-burgundy-900 text-gold-400 shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Testimonials</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === 'settings'
                ? 'bg-burgundy-900 text-gold-400 shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Site Settings</span>
          </button>
        </div>

        {/* Tab 1: Overview Summary Cards */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stat Card 1 */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-stone-400 text-xs uppercase font-bold tracking-wider block">
                    Total Products
                  </span>
                  <span className="font-serif text-3xl font-bold text-charcoal-900">{totalProducts}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                    {activeProducts} Active in Showroom
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-burgundy-50 text-burgundy-800 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-stone-400 text-xs uppercase font-bold tracking-wider block">
                    New Enquiries
                  </span>
                  <span className="font-serif text-3xl font-bold text-charcoal-900">{newEnquiries}</span>
                  <span className="text-[10px] text-amber-600 font-semibold block mt-1">Action Required</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                  <Inbox className="w-6 h-6" />
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-stone-400 text-xs uppercase font-bold tracking-wider block">
                    Wholesale Enquiries
                  </span>
                  <span className="font-serif text-3xl font-bold text-charcoal-900">{wholesaleEnquiries}</span>
                  <span className="text-[10px] text-stone-500 font-semibold block mt-1">Bulk Quotes</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

              {/* Stat Card 4 */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-stone-400 text-xs uppercase font-bold tracking-wider block">
                    Retail Enquiries
                  </span>
                  <span className="font-serif text-3xl font-bold text-charcoal-900">{retailEnquiries}</span>
                  <span className="text-[10px] text-stone-500 font-semibold block mt-1">Private Homeowners</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>

              {/* Stat Card 5 */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-stone-400 text-xs uppercase font-bold tracking-wider block">
                    International Enquiries
                  </span>
                  <span className="font-serif text-3xl font-bold text-charcoal-900">{internationalEnquiries}</span>
                  <span className="text-[10px] text-blue-600 font-semibold block mt-1">Global Trade Leads</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
              </div>

              {/* Stat Card 6 */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-stone-400 text-xs uppercase font-bold tracking-wider block">
                    Lead Status Breakdown
                  </span>
                  <span className="font-serif text-2xl font-bold text-charcoal-900">{enquiries.length} Total</span>
                  <span className="text-[10px] text-stone-500 block mt-1">Live Database Persistent</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Enquiries Preview */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-charcoal-900">Recent Customer Enquiries</h3>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs font-semibold text-burgundy-900 hover:underline"
                >
                  Manage All ({enquiries.length})
                </button>
              </div>

              <div className="space-y-3">
                {enquiries.slice(0, 4).map(e => (
                  <div
                    key={e.id}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-charcoal-900">{e.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-burgundy-900 text-gold-400 font-bold text-[10px] uppercase">
                          {e.type}
                        </span>
                      </div>
                      <p className="text-stone-600 italic line-clamp-1">"{e.message}"</p>
                    </div>

                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="px-3 py-1.5 rounded-lg bg-burgundy-900 text-gold-400 text-xs font-semibold w-fit"
                    >
                      View & Respond
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products */}
        {activeTab === 'products' && <ProductManagement />}

        {/* Tab 3: Categories */}
        {activeTab === 'categories' && <CategoryManagement />}

        {/* Tab 4: Enquiries */}
        {activeTab === 'enquiries' && <EnquiryManagement />}

        {/* Tab 5: Testimonials */}
        {activeTab === 'testimonials' && <TestimonialManagement />}

        {/* Tab 6: Site Settings */}
        {activeTab === 'settings' && <SiteSettingsManagement />}
      </div>
    </div>
  );
};
