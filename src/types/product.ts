export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  display_order: number;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  product_code: string;
  description: string;
  category_id: string;
  category_name?: string;
  material: string;
  style: string;
  color: string;
  size_options: string;
  construction: string;
  tags: string[];
  is_available: boolean;
  is_featured: boolean;
  show_price: boolean;
  price?: number;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
  images?: ProductImage[];
}

export interface ProductFilterParams {
  search?: string;
  category_id?: string;
  material?: string;
  style?: string;
  construction?: string;
  size?: string;
  is_available?: boolean;
  is_featured?: boolean;
  sortBy?: 'newest' | 'code' | 'name';
}
