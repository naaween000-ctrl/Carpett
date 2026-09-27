import { supabase, isSupabaseConfigured } from './supabase';
import { Product, ProductFilterParams } from '../types/product';
import { Category } from '../types/category';
import { Enquiry, EnquiryFormData, EnquiryStatus, EnquiryPriority } from '../types/enquiry';
import { SiteSettings, Testimonial } from '../types/settings';
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_TESTIMONIALS,
  INITIAL_ENQUIRIES
} from './mockData';
import { sendEnquiryNotificationEmail } from './resend';

// Local storage keys for fallback demo mode
const STORAGE_KEYS = {
  SETTINGS: 'tmc_site_settings',
  CATEGORIES: 'tmc_categories',
  PRODUCTS: 'tmc_products',
  TESTIMONIALS: 'tmc_testimonials',
  ENQUIRIES: 'tmc_enquiries'
};

// Helper for local storage persistence
function getLocalData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLocalData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

// Initialize default local storage if empty
if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
  setLocalData(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);
}
if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
  setLocalData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
}
if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
  setLocalData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
}
if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
  setLocalData(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
}
if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
  setLocalData(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
}

// --------------------------------------------------------------------
// 1. SITE SETTINGS
// --------------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (!error && data) {
      return data as SiteSettings;
    }
  }
  return getLocalData<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ ...settings, updated_at: new Date().toISOString() })
      .eq('id', 1)
      .select()
      .single();

    if (!error && data) {
      return data as SiteSettings;
    }
  }

  const current = getLocalData<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);
  const updated = { ...current, ...settings, updated_at: new Date().toISOString() };
  setLocalData(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

// --------------------------------------------------------------------
// 2. CATEGORIES
// --------------------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as Category[];
    }
  }
  return getLocalData<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
}

export async function saveCategory(category: Partial<Category>): Promise<Category> {
  const isNew = !category.id;
  const id = category.id || `cat-${Date.now()}`;
  const slug = category.slug || category.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'category';

  const categoryData = {
    ...category,
    id,
    slug,
    display_order: category.display_order ?? 10
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('categories')
      .upsert(categoryData)
      .select()
      .single();

    if (!error && data) {
      return data as Category;
    }
  }

  const categories = getLocalData<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const index = categories.findIndex(c => c.id === id);

  if (index >= 0) {
    categories[index] = { ...categories[index], ...categoryData } as Category;
  } else {
    categories.push(categoryData as Category);
  }

  setLocalData(STORAGE_KEYS.CATEGORIES, categories);
  return categoryData as Category;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) return true;
  }

  const categories = getLocalData<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const filtered = categories.filter(c => c.id !== id);
  setLocalData(STORAGE_KEYS.CATEGORIES, filtered);
  return true;
}

// --------------------------------------------------------------------
// 3. PRODUCTS
// --------------------------------------------------------------------
export async function getProducts(params?: ProductFilterParams): Promise<Product[]> {
  let products: Product[] = [];

  if (isSupabaseConfigured) {
    let query = supabase.from('products').select(`
      *,
      category:categories(name),
      images:product_images(*)
    `);

    if (params?.is_available !== undefined) {
      query = query.eq('is_available', params.is_available);
    }
    if (params?.is_featured !== undefined) {
      query = query.eq('is_featured', params.is_featured);
    }
    if (params?.category_id) {
      query = query.eq('category_id', params.category_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (!error && data) {
      products = data.map((item: any) => ({
        ...item,
        category_name: item.category?.name || 'Uncategorized',
        images: (item.images || []).sort((a: any, b: any) => a.display_order - b.display_order)
      }));
    }
  }

  if (products.length === 0) {
    products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }

  // Client-side filtering & search
  if (params) {
    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      products = products.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.product_code.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.style.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (params.category_id) {
      products = products.filter(p => p.category_id === params.category_id);
    }

    if (params.material) {
      const mat = params.material.toLowerCase();
      const keywords = mat.split(/[\s&,/]+/).filter(k => k.length > 2);
      products = products.filter(p => {
        const pMat = p.material.toLowerCase();
        return keywords.some(k => pMat.includes(k));
      });
    }

    if (params.style) {
      const st = params.style.toLowerCase();
      const keywords = st.split(/[\s&,/]+/).filter(k => k.length > 2);
      products = products.filter(p => {
        const pStyle = p.style.toLowerCase();
        return keywords.some(k => pStyle.includes(k));
      });
    }

    if (params.construction) {
      const con = params.construction.toLowerCase();
      const keywords = con.split(/[\s&,-]+/).filter(k => k.length > 2);
      products = products.filter(p => {
        const pCon = p.construction.toLowerCase();
        return keywords.some(k => pCon.includes(k));
      });
    }

    if (params.is_available !== undefined) {
      products = products.filter(p => p.is_available === params.is_available);
    }

    if (params.is_featured !== undefined) {
      products = products.filter(p => p.is_featured === params.is_featured);
    }

    if (params.sortBy) {
      if (params.sortBy === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
      } else if (params.sortBy === 'code') {
        products.sort((a, b) => a.product_code.localeCompare(b.product_code));
      } else if (params.sortBy === 'newest') {
        products.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
      }
    }
  }

  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug || p.id === slug) || null;
}

export async function saveProduct(product: Partial<Product>, imageFiles?: { url: string; alt?: string; is_primary?: boolean }[]): Promise<Product> {
  const isNew = !product.id;
  const id = product.id || `prod-${Date.now()}`;
  const slug = product.slug || product.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `carpet-${Date.now()}`;
  const product_code = product.product_code || `TMC-BDH-${Math.floor(100 + Math.random() * 900)}`;

  const productData: Product = {
    id,
    name: product.name || 'New Carpet Creation',
    slug,
    product_code,
    description: product.description || '',
    category_id: product.category_id || 'cat-1',
    category_name: product.category_name || '',
    material: product.material || '100% Wool & Silk',
    style: product.style || 'Traditional',
    color: product.color || 'Maroon & Gold',
    size_options: product.size_options || '5x8 ft, 8x10 ft, 9x12 ft, Custom',
    construction: product.construction || 'Hand-Knotted',
    tags: product.tags || ['Bhadohi', 'Handmade'],
    is_available: product.is_available ?? true,
    is_featured: product.is_featured ?? false,
    show_price: product.show_price ?? false,
    price: product.price || undefined,
    seo_title: product.seo_title || `Taj Mahal Carpet | ${product.name}`,
    seo_description: product.seo_description || product.description?.substring(0, 150),
    created_at: product.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: product.images || []
  };

  if (imageFiles && imageFiles.length > 0) {
    productData.images = imageFiles.map((img, idx) => ({
      id: `img-${Date.now()}-${idx}`,
      product_id: id,
      image_url: img.url,
      alt_text: img.alt || productData.name,
      is_primary: img.is_primary ?? idx === 0,
      display_order: idx + 1
    }));
  }

  if (isSupabaseConfigured) {
    const { data: savedProd, error } = await supabase
      .from('products')
      .upsert({
        id: productData.id,
        name: productData.name,
        slug: productData.slug,
        product_code: productData.product_code,
        description: productData.description,
        category_id: productData.category_id,
        material: productData.material,
        style: productData.style,
        color: productData.color,
        size_options: productData.size_options,
        construction: productData.construction,
        tags: productData.tags,
        is_available: productData.is_available,
        is_featured: productData.is_featured,
        show_price: productData.show_price,
        price: productData.price,
        seo_title: productData.seo_title,
        seo_description: productData.seo_description,
        updated_at: productData.updated_at
      })
      .select()
      .single();

    if (!error && savedProd && productData.images && productData.images.length > 0) {
      await supabase.from('product_images').delete().eq('product_id', id);
      await supabase.from('product_images').insert(
        productData.images.map(img => ({
          product_id: id,
          image_url: img.image_url,
          alt_text: img.alt_text,
          is_primary: img.is_primary,
          display_order: img.display_order
        }))
      );
    }
  }

  const products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const index = products.findIndex(p => p.id === id);

  if (index >= 0) {
    products[index] = productData;
  } else {
    products.unshift(productData);
  }

  setLocalData(STORAGE_KEYS.PRODUCTS, products);
  return productData;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) return true;
  }

  const products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const filtered = products.filter(p => p.id !== id);
  setLocalData(STORAGE_KEYS.PRODUCTS, filtered);
  return true;
}

// --------------------------------------------------------------------
// 4. ENQUIRIES
// --------------------------------------------------------------------
export async function submitEnquiry(enquiryData: EnquiryFormData): Promise<Enquiry> {
  const id = `enq-${Date.now()}`;
  const now = new Date().toISOString();

  let product_name = undefined;
  let product_code = undefined;

  if (enquiryData.product_id) {
    const prod = await getProductBySlug(enquiryData.product_id);
    if (prod) {
      product_name = prod.name;
      product_code = prod.product_code;
    }
  }

  const newEnquiry: Enquiry = {
    id,
    type: enquiryData.type,
    name: enquiryData.name,
    company_name: enquiryData.company_name || '',
    email: enquiryData.email,
    phone: enquiryData.phone,
    country: enquiryData.country || 'India',
    city: enquiryData.city || '',
    business_type: enquiryData.business_type || '',
    product_id: enquiryData.product_id,
    product_name,
    product_code,
    quantity: enquiryData.quantity || 1,
    preferred_size: enquiryData.preferred_size || '',
    budget_range: enquiryData.budget_range || '',
    shipping_destination: enquiryData.shipping_destination || '',
    message: enquiryData.message,
    attachment_url: enquiryData.attachment_url || '',
    status: 'new',
    priority: enquiryData.type === 'wholesale' || enquiryData.type === 'international' ? 'high' : 'medium',
    source: enquiryData.source || `${enquiryData.type}_form`,
    created_at: now,
    updated_at: now,
    notes: []
  };

  // Dispatch Resend Email Notification asynchronously
  sendEnquiryNotificationEmail({ ...enquiryData, product_name }).catch(err =>
    console.warn('Failed to send Resend email:', err)
  );

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('enquiries')
      .insert({
        type: newEnquiry.type,
        name: newEnquiry.name,
        company_name: newEnquiry.company_name,
        email: newEnquiry.email,
        phone: newEnquiry.phone,
        country: newEnquiry.country,
        city: newEnquiry.city,
        business_type: newEnquiry.business_type,
        product_id: newEnquiry.product_id,
        quantity: newEnquiry.quantity,
        preferred_size: newEnquiry.preferred_size,
        budget_range: newEnquiry.budget_range,
        shipping_destination: newEnquiry.shipping_destination,
        message: newEnquiry.message,
        attachment_url: newEnquiry.attachment_url,
        status: newEnquiry.status,
        priority: newEnquiry.priority,
        source: newEnquiry.source
      })
      .select()
      .single();

    if (!error && data) {
      return { ...newEnquiry, id: data.id };
    }
  }

  const enquiries = getLocalData<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  enquiries.unshift(newEnquiry);
  setLocalData(STORAGE_KEYS.ENQUIRIES, enquiries);
  return newEnquiry;
}

export async function getEnquiries(filter?: { type?: string; status?: string; search?: string }): Promise<Enquiry[]> {
  let enquiries: Enquiry[] = [];

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*, product:products(name, product_code), notes:enquiry_notes(*)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      enquiries = data.map((item: any) => ({
        ...item,
        product_name: item.product?.name,
        product_code: item.product?.product_code,
        notes: item.notes || []
      }));
    }
  }

  if (enquiries.length === 0) {
    enquiries = getLocalData<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  }

  if (filter) {
    if (filter.type && filter.type !== 'all') {
      enquiries = enquiries.filter(e => e.type === filter.type);
    }
    if (filter.status && filter.status !== 'all') {
      enquiries = enquiries.filter(e => e.status === filter.status);
    }
    if (filter.search && filter.search.trim()) {
      const q = filter.search.toLowerCase().trim();
      enquiries = enquiries.filter(
        e =>
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.company_name?.toLowerCase().includes(q) ||
          e.phone.includes(q) ||
          e.message.toLowerCase().includes(q)
      );
    }
  }

  return enquiries;
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus, priority?: EnquiryPriority): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('enquiries')
      .update({ status, ...(priority ? { priority } : {}), updated_at: new Date().toISOString() })
      .eq('id', id);
    if (!error) return true;
  }

  const enquiries = getLocalData<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  const index = enquiries.findIndex(e => e.id === id);
  if (index >= 0) {
    enquiries[index].status = status;
    if (priority) enquiries[index].priority = priority;
    enquiries[index].updated_at = new Date().toISOString();
    setLocalData(STORAGE_KEYS.ENQUIRIES, enquiries);
    return true;
  }
  return false;
}

export async function addEnquiryNote(enquiryId: string, noteText: string): Promise<boolean> {
  const now = new Date().toISOString();
  const noteId = `note-${Date.now()}`;

  if (isSupabaseConfigured) {
    const { error } = await supabase.from('enquiry_notes').insert({
      enquiry_id: enquiryId,
      note_text: noteText
    });
    if (!error) return true;
  }

  const enquiries = getLocalData<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  const index = enquiries.findIndex(e => e.id === enquiryId);
  if (index >= 0) {
    if (!enquiries[index].notes) enquiries[index].notes = [];
    enquiries[index].notes?.push({
      id: noteId,
      enquiry_id: enquiryId,
      note_text: noteText,
      created_at: now
    });
    setLocalData(STORAGE_KEYS.ENQUIRIES, enquiries);
    return true;
  }
  return false;
}

// --------------------------------------------------------------------
// 5. TESTIMONIALS
// --------------------------------------------------------------------
export async function getTestimonials(): Promise<Testimonial[]> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as Testimonial[];
    }
  }
  return getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
}

export async function saveTestimonial(testimonial: Partial<Testimonial>): Promise<Testimonial> {
  const id = testimonial.id || `test-${Date.now()}`;
  const data: Testimonial = {
    id,
    customer_name: testimonial.customer_name || 'Client',
    company: testimonial.company || '',
    location: testimonial.location || '',
    rating: testimonial.rating || 5,
    testimonial_text: testimonial.testimonial_text || '',
    image_url: testimonial.image_url || '',
    is_active: testimonial.is_active ?? true,
    display_order: testimonial.display_order ?? 1,
    created_at: testimonial.created_at || new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    const { data: saved, error } = await supabase.from('testimonials').upsert(data).select().single();
    if (!error && saved) return saved as Testimonial;
  }

  const testimonials = getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  const index = testimonials.findIndex(t => t.id === id);
  if (index >= 0) {
    testimonials[index] = data;
  } else {
    testimonials.push(data);
  }
  setLocalData(STORAGE_KEYS.TESTIMONIALS, testimonials);
  return data;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) return true;
  }

  const testimonials = getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  const filtered = testimonials.filter(t => t.id !== id);
  setLocalData(STORAGE_KEYS.TESTIMONIALS, filtered);
  return true;
}
