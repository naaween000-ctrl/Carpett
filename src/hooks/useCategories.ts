import { useState, useEffect } from 'react';
import { Category } from '../types/category';
import { getCategories, saveCategory, deleteCategory } from '../lib/dataService';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch carpet categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetchCategories: fetchCategories,
    saveCategory,
    deleteCategory
  };
}
