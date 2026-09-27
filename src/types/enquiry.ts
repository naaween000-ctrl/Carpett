export type EnquiryType = 'retail' | 'wholesale' | 'international' | 'general';

export type EnquiryStatus = 'new' | 'contacted' | 'in_progress' | 'quoted' | 'converted' | 'closed' | 'spam';

export type EnquiryPriority = 'low' | 'medium' | 'high';

export interface EnquiryNote {
  id: string;
  enquiry_id: string;
  admin_id?: string;
  note_text: string;
  created_at: string;
}

export interface Enquiry {
  id: string;
  type: EnquiryType;
  name: string;
  company_name?: string;
  email: string;
  phone: string;
  country: string;
  city?: string;
  business_type?: string;
  product_id?: string;
  product_name?: string;
  product_code?: string;
  quantity?: number;
  preferred_size?: string;
  budget_range?: string;
  shipping_destination?: string;
  message: string;
  attachment_url?: string;
  status: EnquiryStatus;
  priority: EnquiryPriority;
  source: string;
  created_at: string;
  updated_at?: string;
  notes?: EnquiryNote[];
}

export interface EnquiryFormData {
  type: EnquiryType;
  name: string;
  company_name?: string;
  email: string;
  phone: string;
  country: string;
  city?: string;
  business_type?: string;
  product_id?: string;
  quantity?: number;
  preferred_size?: string;
  budget_range?: string;
  shipping_destination?: string;
  message: string;
  attachment_url?: string;
  source?: string;
}
