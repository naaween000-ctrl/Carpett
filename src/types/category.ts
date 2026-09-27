export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url?: string;
  display_order: number;
  created_at?: string;
}
