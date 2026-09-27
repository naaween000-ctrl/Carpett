import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductGrid } from '../components/product/ProductGrid';
import { EnquiryModal } from '../components/enquiry/EnquiryModal';
import { useProducts } from '../hooks/useProducts';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { Product } from '../types/product';
import { generateWhatsAppLink } from '../lib/whatsapp';
import { analytics } from '../lib/analytics';
import {
  MessageCircle,
  Sparkles,
  Award,
  Layers,
  ArrowLeft,
  CheckCircle2,
  FileText,
  ShieldAlert,
  Loader2
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getProductBySlug, products } = useProducts();
  const { settings } = useSiteSettings();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState<'retail' | 'wholesale'>('retail');

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getProductBySlug(slug).then(res => {
        setProduct(res);
        if (res) {
          analytics.trackProductView(res.id, res.name, res.product_code);
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-ivory flex flex-col items-center justify-center pt-28">
        <Loader2 className="w-10 h-10 text-gold-500 animate-spin mb-3" />
        <p className="font-serif text-stone-600 italic">Fetching carpet specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-warm-ivory flex flex-col items-center justify-center text-center px-4 pt-28">
        <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">Carpet Specification Not Found</h2>
        <p className="text-stone-600 text-sm mb-6">The requested product code or page could not be located.</p>
        <Link
          to="/catalogue"
          className="px-6 py-3 rounded-full bg-burgundy-900 text-gold-400 font-bold text-xs uppercase tracking-wider"
        >
          Return to Showroom Catalogue
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category_id === product.category_id || p.style === product.style))
    .slice(0, 3);

  const handleWhatsApp = () => {
    analytics.trackWhatsAppClick('product_detail_page', product.name);
    const link = generateWhatsAppLink(settings.whatsapp_number, 'product', {
      name: product.name,
      code: product.product_code
    });
    window.open(link, '_blank');
  };

  const handleOpenEnquiry = (type: 'retail' | 'wholesale') => {
    setEnquiryType(type);
    setEnquiryModalOpen(true);
  };

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images?.[0]?.image_url,
    description: product.description,
    sku: product.product_code,
    brand: {
      '@type': 'Brand',
      name: 'Taj Mahal Carpet'
    }
  };

  return (
    <div className="min-h-screen bg-warm-ivory text-charcoal-900 pt-28 pb-20">
      <SEO
        title={`Taj Mahal Carpet | ${product.name} (${product.product_code})`}
        description={product.description || `Handmade carpet specification ${product.product_code} from Bhadohi India.`}
        productSchema={productSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center space-x-2 text-xs text-stone-500">
          <Link to="/catalogue" className="hover:text-burgundy-900 flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Showroom Catalogue</span>
          </Link>
          <span>/</span>
          <span className="text-stone-800 font-medium">{product.name}</span>
        </div>

        {/* Product Detail Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images || []} productName={product.name} />
          </div>

          {/* Right Column: Carpet Specifications & Enquiries */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-burgundy-900 text-gold-400 text-xs font-bold font-mono tracking-widest uppercase">
                  {product.product_code}
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-semibold uppercase">
                  {product.category_name || 'Heritage Collection'}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price or Enquiry Notice */}
            <div className="p-4 rounded-2xl bg-warm-cream/70 border border-gold-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Price Guidance</span>
                {product.show_price && product.price ? (
                  <span className="font-serif text-2xl font-bold text-burgundy-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                ) : (
                  <span className="font-serif text-lg font-bold text-gold-700 italic">Price On Official Enquiry</span>
                )}
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Showroom Sample Ready</span>
              </span>
            </div>

            {/* Description Paragraph */}
            <p className="text-stone-700 text-sm leading-relaxed font-light">{product.description}</p>

            {/* Specification Specs List */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3 text-xs">
              <h3 className="font-serif font-bold text-sm text-charcoal-900 border-b border-stone-100 pb-2">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-stone-400 block">Material Composition</span>
                  <span className="font-medium text-charcoal-900">{product.material}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Weave / Construction</span>
                  <span className="font-medium text-charcoal-900">{product.construction}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Design Style</span>
                  <span className="font-medium text-charcoal-900">{product.style}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Color Palette</span>
                  <span className="font-medium text-charcoal-900">{product.color}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-400 block">Standard Sizes</span>
                  <span className="font-medium text-charcoal-900">{product.size_options}</span>
                </div>
              </div>
            </div>

            {/* Customization Notice */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Custom Architectural Weaving Available</span>
                <span>
                  This design can be customized in non-standard dimensions, pile heights, or custom colorways for private residences and hotel projects.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleOpenEnquiry('retail')}
                className="w-full py-4 rounded-full bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 font-bold text-xs uppercase tracking-wider shadow-xl transition-transform transform hover:-translate-y-0.5"
              >
                Enquire About This Carpet
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleOpenEnquiry('wholesale')}
                  className="py-3 px-4 rounded-full border border-gold-500 text-burgundy-900 font-bold text-xs uppercase tracking-wider hover:bg-warm-cream transition-colors text-center"
                >
                  Wholesale Quote
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="py-3 px-4 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Carpet Recommendations */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-stone-200">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-6">Related Carpet Recommendations</h2>
            <ProductGrid
              products={relatedProducts}
              onEnquire={p => {
                setProduct(p);
                setEnquiryType('retail');
                setEnquiryModalOpen(true);
              }}
            />
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        product={product}
        type={enquiryType}
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </div>
  );
};
