import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { ProductGrid } from '../components/product/ProductGrid';
import { CatalogueFilter } from '../components/catalogue/CatalogueFilter';
import { EnquiryModal } from '../components/enquiry/EnquiryModal';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { Product, ProductFilterParams } from '../types/product';
import { generateCataloguePDF } from '../lib/pdfGenerator';
import { analytics } from '../lib/analytics';
import { Download, SlidersHorizontal, Sparkles } from 'lucide-react';

export const Catalogue: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlugParam = searchParams.get('category');

  const { categories } = useCategories();
  const { settings } = useSiteSettings();

  const [filterParams, setFilterParams] = useState<ProductFilterParams>({
    search: '',
    category_id: undefined,
    material: undefined,
    style: undefined,
    sortBy: 'newest'
  });

  const { products, loading, refetchProducts } = useProducts(filterParams);

  const [selectedProductForEnquiry, setSelectedProductForEnquiry] = useState<Product | undefined>(undefined);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Sync category URL param if present
  useEffect(() => {
    if (categorySlugParam && categories.length > 0) {
      const match = categories.find(c => c.slug === categorySlugParam);
      if (match) {
        setFilterParams(prev => ({ ...prev, category_id: match.id }));
      }
    }
  }, [categorySlugParam, categories]);

  const handleFilterChange = (newFilters: ProductFilterParams) => {
    setFilterParams(newFilters);
    if (newFilters.search) {
      analytics.trackSearch(newFilters.search);
    }
  };

  const handleClearFilters = () => {
    setFilterParams({
      search: '',
      category_id: undefined,
      material: undefined,
      style: undefined,
      sortBy: 'newest'
    });
    setSearchParams({});
  };

  const handleDownloadPDF = () => {
    analytics.trackCatalogueDownload();
    generateCataloguePDF(products, settings);
  };

  const handleEnquireProduct = (product: Product) => {
    setSelectedProductForEnquiry(product);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-warm-ivory text-charcoal-900 pt-28 pb-20">
      <SEO
        title="Carpet Catalogue | Taj Mahal Carpet Bhadohi India"
        description="Explore our digital carpet showroom. Filter through hand-knotted Mughal medallions, modern abstract wool rugs, Persian silk masterpieces, and flatweave durries."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-8 mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest text-burgundy-800 uppercase block mb-1">
              Digital Showroom
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900">
              Carpet Catalogue Collection
            </h1>
            <p className="text-stone-600 text-sm mt-1">
              Filter through {products.length} luxury carpet specifications crafted in Bhadohi, India.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 rounded-full bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2 transition-transform transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Catalogue</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <CatalogueFilter
          categories={categories}
          filters={filterParams}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} onEnquire={handleEnquireProduct} />
      </div>

      {/* Quick Enquiry Modal */}
      <EnquiryModal
        product={selectedProductForEnquiry}
        type="retail"
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </div>
  );
};
