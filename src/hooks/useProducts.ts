import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFilterParams } from '../types/product';
import { getProducts, getProductBySlug, saveProduct, deleteProduct } from '../lib/dataService';

export function useProducts(filterParams?: ProductFilterParams) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filterKey = JSON.stringify(filterParams || {});

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getProducts(filterParams)
      .then(data => {
        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err?.message || 'Failed to fetch carpet collection');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [filterKey]);

  const refetchProducts = useCallback(() => {
    setLoading(true);
    getProducts(filterParams)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [filterKey]);

  return {
    products,
    loading,
    error,
    refetchProducts,
    getProductBySlug,
    saveProduct,
    deleteProduct
  };
}
