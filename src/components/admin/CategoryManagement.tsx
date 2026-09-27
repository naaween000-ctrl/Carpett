import React, { useState } from 'react';
import { Category } from '../../types/category';
import { useCategories } from '../../hooks/useCategories';
import { Plus, Edit, Trash2, X, FolderPlus } from 'lucide-react';

export const CategoryManagement: React.FC = () => {
  const { categories, refetchCategories, saveCategory, deleteCategory } = useCategories();
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNew = () => {
    setEditingCategory({
      name: '',
      slug: '',
      description: '',
      image_url: '/images/persian_carpet.png',
      display_order: categories.length + 1
    });
    setIsModalOpen(true);
  };

  const handleEdit = (cat: Category) => {
    setEditingCategory({ ...cat });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
      await refetchCategories();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name) return;

    await saveCategory(editingCategory);
    await refetchCategories();
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-charcoal-900">Category Management</h2>
          <p className="text-xs text-stone-500">Organize digital showroom carpet classifications</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-full bg-burgundy-900 text-gold-400 font-bold text-xs uppercase tracking-wider flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img src={cat.image_url || '/images/persian_carpet.png'} alt={cat.name} className="w-12 h-12 rounded-xl object-cover border border-stone-200" />
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal-900">{cat.name}</h4>
                  <span className="text-[10px] text-burgundy-700 font-mono">slug: {cat.slug}</span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 font-bold text-stone-600">
                Order: {cat.display_order}
              </span>
            </div>

            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{cat.description}</p>

            <div className="pt-3 border-t border-stone-100 flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(cat)}
                className="px-3 py-1.5 rounded-lg bg-warm-cream text-charcoal-900 text-xs font-semibold hover:bg-gold-400 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gold-500/30">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">
                {editingCategory.id ? 'Edit Category' : 'Create Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-charcoal-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-stone-600 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-charcoal-900"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-600 mb-1">Category Slug</label>
                <input
                  type="text"
                  value={editingCategory.slug || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-charcoal-900"
                  placeholder="auto-generated-from-name"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-600 mb-1">Category Image URL</label>
                <input
                  type="text"
                  value={editingCategory.image_url || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, image_url: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-charcoal-900"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-600 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCategory.description || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-charcoal-900"
                />
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
                  className="px-6 py-2 bg-burgundy-900 text-gold-400 rounded-full font-bold uppercase tracking-wider"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
