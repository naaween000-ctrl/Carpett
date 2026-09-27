import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { SearchX, Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onEnquire?: (product: Product) => void;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  onEnquire,
  emptyMessage = 'No carpet products match your selected criteria.'
}) => {
  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
        <p className="font-serif text-stone-600 italic">Curating Bhadohi carpet collection...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 px-6 text-center bg-warm-cream/50 rounded-3xl border border-stone-200/80 max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-burgundy-900/10 text-burgundy-800 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">No Carpets Found</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-6">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onEnquire={onEnquire} />
      ))}
    </div>
  );
};
