import React, { useState } from 'react';
import { Product } from '../../types/product';
import { Category } from '../../types/category';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { Plus, Edit, Trash2, Star, Check, X, Image as ImageIcon, Loader2 } from 'lucide-react';

export const ProductManagement: React.FC = () => {
  const { products, loading, refetchProducts, saveProduct, deleteProduct } = useProducts();
  const { categories } = useCategories();

  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  const handleCreateNew = () => {
    setEditingProduct({
      name: '',
      product_code: `TMC-BDH-${Math.floor(100 + Math.random() * 900)}`,
      category_id: categories[0]?.id || '',
      material: '100% Wool & Silk',
      style: 'Traditional',
      color: 'Maroon & Gold',
      size_options: '5x8 ft, 8x10 ft, 9x12 ft, Custom',
      construction: 'Hand-Knotted',
      description: '',
      is_available: true,
      is_featured: false,
      show_price: false,
      tags: ['Bhadohi']
    });
    setImageUrlInput('/images/persian_carpet.png');
    setIsModalOpen(true);
  };

  const handleEdit = (prod: Product) => {
    setEditingProduct({ ...prod });
    setImageUrlInput(prod.images?.[0]?.image_url || '/images/persian_carpet.png');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      await refetchProducts();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;

    try {
      setSaveLoading(true);
      await saveProduct(
        editingProduct,
        imageUrlInput ? [{ url: imageUrlInput, is_primary: true }] : undefined
      );
      await refetchProducts();
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (err: any) {
      alert(err.message || 'Failed to save product');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-charcoal-900">Product Catalogue Management</h2>
          <p className="text-xs text-stone-500">Manage carpet collection, specifications, tags, and images</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-full bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Carpet</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-stone-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-gold-500 mb-2" />
          <span>Loading products...</span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-warm-cream/70 text-charcoal-900 uppercase font-semibold text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3.5 px-4">Carpet Photo</th>
                  <th className="py-3.5 px-4">Code & Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Material & Craft</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map(prod => {
                  const img = prod.images?.[0]?.image_url || '/images/persian_carpet.png';
                  return (
                    <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <img src={img} alt={prod.name} className="w-14 h-10 object-cover rounded-lg border border-stone-200 shadow-sm" />
                      </td>
                      <td className="py-3 px-4 font-medium text-charcoal-900">
                        <span className="font-mono text-[10px] text-burgundy-800 bg-burgundy-50 px-1.5 py-0.5 rounded mr-2">
                          {prod.product_code}
                        </span>
                        <span className="font-semibold block">{prod.name}</span>
                      </td>
                      <td className="py-3 px-4 text-stone-600">{prod.category_name || 'Showroom'}</td>
                      <td className="py-3 px-4">
                        <span className="block font-medium">{prod.material}</span>
                        <span className="text-[10px] text-stone-400">{prod.construction}</span>
                      </td>
                      <td className="py-3 px-4">
                        {prod.is_featured ? (
                          <span className="px-2 py-0.5 rounded-full bg-gold-100 text-gold-800 font-semibold text-[10px] flex items-center space-x-1 w-fit">
                            <Star className="w-3 h-3 fill-gold-500" />
                            <span>Featured</span>
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[10px]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${prod.is_available ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                          {prod.is_available ? 'Available' : 'Archived'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(prod)}
                          className="p-1.5 text-stone-600 hover:text-burgundy-900 hover:bg-warm-cream rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit/Create Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gold-500/30 my-8">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">
                {editingProduct.id ? `Edit Product (${editingProduct.product_code})` : 'Add New Carpet Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-charcoal-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Product Code *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.product_code || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, product_code: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Category</label>
                  <select
                    value={editingProduct.category_id || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, category_id: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Material</label>
                  <input
                    type="text"
                    value={editingProduct.material || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Construction / Weave</label>
                  <input
                    type="text"
                    value={editingProduct.construction || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, construction: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Style</label>
                  <input
                    type="text"
                    value={editingProduct.style || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, style: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Primary Image URL or Asset Path</label>
                  <input
                    type="text"
                    value={imageUrlInput}
                    onChange={e => setImageUrlInput(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    placeholder="/images/persian_carpet.png"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Available Sizes</label>
                  <input
                    type="text"
                    value={editingProduct.size_options || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, size_options: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Carpet Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.is_featured)}
                    onChange={e => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                    className="rounded text-gold-600 focus:ring-gold-500"
                  />
                  <span className="font-semibold text-charcoal-900">Mark as Featured Product</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.is_available)}
                    onChange={e => setEditingProduct({ ...editingProduct, is_available: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-charcoal-900">Available in Showroom</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-full text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-6 py-2 bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 rounded-full font-bold uppercase tracking-wider"
                >
                  {saveLoading ? 'Saving...' : 'Save Carpet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
