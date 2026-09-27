export interface SiteSettings {
  id: number;
  business_name: string;
  logo_url?: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  google_maps_url: string;
  instagram_url?: string;
  facebook_url?: string;
  business_description: string;
  hero_heading: string;
  hero_description: string;
  footer_content: string;
  price_visibility_default: boolean;
  catalogue_pdf_url?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  company?: string;
  location?: string;
  rating: number;
  testimonial_text: string;
  image_url?: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
}
