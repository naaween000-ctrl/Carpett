import React from 'react';
import { Search, Filter, X, RotateCcw } from 'lucide-react';
import { Category } from '../../types/category';
import { ProductFilterParams } from '../../types/product';

interface CatalogueFilterProps {
  categories: Category[];
  filters: ProductFilterParams;
  onFilterChange: (newFilters: ProductFilterParams) => void;
  onClearFilters: () => void;
}

export const CatalogueFilter: React.FC<CatalogueFilterProps> = ({
  categories,
  filters,
  onFilterChange,
  onClearFilters
}) => {
  const materials = [
    'All Materials',
    'Wool & Silk',
    'Pure Silk',
    'Highland Wool',
    'Bamboo Viscose',
    'Organic Wool'
  ];

  const styles = [
    'All Styles',
    'Traditional',
    'Modern',
    'Persian',
    'Transitional',
    'Minimalist'
  ];

  const constructions = [
    'All Constructions',
    'Hand-Knotted',
    'Hand-Tufted',
    'Flat-Weave'
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category_id: e.target.value || undefined });
  };

  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    onFilterChange({ ...filters, material: val === 'All Materials' ? undefined : val });
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    onFilterChange({ ...filters, style: val === 'All Styles' ? undefined : val });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sortBy: e.target.value as any });
  };

  const hasActiveFilters = Boolean(
    filters.search ||
      filters.category_id ||
      filters.material ||
      filters.style ||
      filters.construction ||
      filters.sortBy
  );

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gold-500/20 mb-8 space-y-6">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-600" />
        <input
          type="text"
          value={filters.search || ''}
          onChange={handleSearchChange}
          placeholder="Search by carpet name, code (e.g. TMC-BDH-101), material or style..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-warm-cream/40 border border-stone-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30 text-charcoal-900 placeholder-stone-400 text-sm transition-all"
        />
        {filters.search && (
          <button
            onClick={() => onFilterChange({ ...filters, search: undefined })}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-charcoal-900"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Select Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs font-medium">
        {/* Category Selector */}
        <div>
          <label className="block text-stone-500 mb-1.5 uppercase tracking-wider text-[10px]">Category</label>
          <select
            value={filters.category_id || ''}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2.5 rounded-xl bg-warm-cream/50 border border-stone-200 focus:border-gold-500 text-stone-800"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Material Selector */}
        <div>
          <label className="block text-stone-500 mb-1.5 uppercase tracking-wider text-[10px]">Material</label>
          <select
            value={filters.material || 'All Materials'}
            onChange={handleMaterialChange}
            className="w-full px-3 py-2.5 rounded-xl bg-warm-cream/50 border border-stone-200 focus:border-gold-500 text-stone-800"
          >
            {materials.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Style Selector */}
        <div>
          <label className="block text-stone-500 mb-1.5 uppercase tracking-wider text-[10px]">Design Style</label>
          <select
            value={filters.style || 'All Styles'}
            onChange={handleStyleChange}
            className="w-full px-3 py-2.5 rounded-xl bg-warm-cream/50 border border-stone-200 focus:border-gold-500 text-stone-800"
          >
            {styles.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order Selector */}
        <div>
          <label className="block text-stone-500 mb-1.5 uppercase tracking-wider text-[10px]">Sort By</label>
          <select
            value={filters.sortBy || 'newest'}
            onChange={handleSortChange}
            className="w-full px-3 py-2.5 rounded-xl bg-warm-cream/50 border border-stone-200 focus:border-gold-500 text-stone-800"
          >
            <option value="newest">Newest Additions</option>
            <option value="code">Product Code (A-Z)</option>
            <option value="name">Carpet Name (A-Z)</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          {hasActiveFilters ? (
            <button
              onClick={onClearFilters}
              className="w-full py-2.5 px-3 rounded-xl bg-burgundy-900/10 hover:bg-burgundy-900/20 text-burgundy-800 font-semibold flex items-center justify-center space-x-2 transition-colors border border-burgundy-900/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          ) : (
            <div className="text-[11px] text-stone-400 py-2.5 text-center w-full italic">Filters Ready</div>
          )}
        </div>
      </div>
    </div>
  );
};
