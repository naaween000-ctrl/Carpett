import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, MessageCircle, Layers, Sparkles } from 'lucide-react';
import { Product } from '../../types/product';
import { generateWhatsAppLink } from '../../lib/whatsapp';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { analytics } from '../../lib/analytics';

interface ProductCardProps {
  product: Product;
  onEnquire?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEnquire }) => {
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const primaryImage =
    product.images?.find(img => img.is_primary)?.image_url ||
    product.images?.[0]?.image_url ||
    '/images/persian_carpet.png';

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    analytics.trackWhatsAppClick('product_card', product.name);
    const link = generateWhatsAppLink(settings.whatsapp_number, 'product', {
      name: product.name,
      code: product.product_code
    });
    window.open(link, '_blank');
  };

  const handleQuickEnquire = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEnquire) {
      onEnquire(product);
    } else {
      navigate(`/carpets/${product.slug}`);
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-200 hover:shadow-2xl hover:border-gold-500/50 transition-all duration-300 flex flex-col h-full">
      {/* Product Image Wrapper */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <span className="px-2.5 py-1 rounded-full bg-burgundy-900/90 text-gold-400 text-[10px] font-semibold tracking-widest uppercase shadow-md">
            {product.product_code}
          </span>
          {product.is_featured && (
            <span className="px-2.5 py-1 rounded-full bg-gold-500/90 text-charcoal-900 text-[10px] font-bold tracking-widest uppercase flex items-center space-x-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Action Overlay Buttons on Hover */}
        <div className="absolute inset-0 bg-charcoal-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 p-4">
          <Link
            to={`/carpets/${product.slug}`}
            className="p-3 rounded-full bg-warm-ivory text-charcoal-900 hover:bg-gold-400 transition-colors shadow-lg transform hover:scale-110"
            title="View Carpet Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button
            onClick={handleWhatsApp}
            className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-lg transform hover:scale-110"
            title="WhatsApp Inquiry"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-burgundy-700 mb-1">
            {product.category_name || 'Heritage Collection'}
          </div>
          <Link to={`/carpets/${product.slug}`} className="block">
            <h3 className="font-serif text-lg font-bold text-charcoal-900 group-hover:text-burgundy-800 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Product Specifications Snippet */}
          <div className="mt-3 space-y-1.5 text-xs text-stone-600">
            <div className="flex items-center justify-between border-b border-stone-100 pb-1">
              <span className="text-stone-400">Material:</span>
              <span className="font-medium text-stone-800 line-clamp-1 max-w-[65%] text-right">{product.material}</span>
            </div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-1">
              <span className="text-stone-400">Construction:</span>
              <span className="font-medium text-stone-800">{product.construction}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Size Options:</span>
              <span className="font-medium text-stone-800 line-clamp-1">{product.size_options}</span>
            </div>
          </div>
        </div>

        {/* Optional Price Display or Enquiry CTA */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          {product.show_price && product.price ? (
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block">Guide Price</span>
              <span className="font-serif text-base font-bold text-burgundy-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
          ) : (
            <span className="text-[11px] text-gold-600 font-medium italic">Price on Enquiry</span>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={handleQuickEnquire}
              className="px-3.5 py-1.5 rounded-full bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Enquire
            </button>
            <Link
              to={`/carpets/${product.slug}`}
              className="px-3.5 py-1.5 rounded-full border border-stone-300 hover:border-gold-500 text-stone-700 hover:text-burgundy-900 text-xs font-medium transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
