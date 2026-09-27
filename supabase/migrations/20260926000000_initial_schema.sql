-- ====================================================================
-- TAJ MAHAL CARPET - SUPABASE DATABASE SCHEMA MIGRATION
-- Location: Bhadohi, Uttar Pradesh, India
-- Project Reference: bsnobuumgeibzzrwasxt
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. SITE SETTINGS TABLE (Single row configuration)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  business_name TEXT NOT NULL DEFAULT 'Taj Mahal Carpet',
  logo_url TEXT DEFAULT '/images/logo.png',
  phone TEXT DEFAULT '+91 94152 12345',
  whatsapp_number TEXT DEFAULT '919415212345',
  email TEXT DEFAULT 'info@tajmahalcarpet.com',
  address TEXT DEFAULT 'Main Carpet Highway, Khamaria / Bhadohi - 221401, Uttar Pradesh, India',
  google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Bhadohi+Uttar+Pradesh+India',
  instagram_url TEXT DEFAULT 'https://instagram.com/tajmahalcarpet',
  facebook_url TEXT DEFAULT 'https://facebook.com/tajmahalcarpet',
  business_description TEXT DEFAULT 'Wholesale and Retail Craft Carpet Manufacturer based in Bhadohi, UP, India. We craft exquisite hand-knotted, hand-tufted and flatweave carpets for luxurious global interiors.',
  hero_heading TEXT DEFAULT 'Timeless Carpets. Crafted for Exceptional Spaces.',
  hero_description TEXT DEFAULT 'Explore the master craftsmanship of Taj Mahal Carpet from Bhadohi, India — serving retail connoisseurs, wholesale partners, and international architecture projects.',
  footer_content TEXT DEFAULT 'Taj Mahal Carpet — Preserving heritage Indian weaving craftsmanship with bespoke quality and global delivery.',
  price_visibility_default BOOLEAN DEFAULT false,
  catalogue_pdf_url TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 2. CATEGORIES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 3. PRODUCTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  product_code TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  material TEXT DEFAULT 'New Zealand Wool & Silk',
  style TEXT DEFAULT 'Traditional',
  color TEXT DEFAULT 'Maroon & Gold',
  size_options TEXT DEFAULT '5x8 ft, 8x10 ft, 9x12 ft, Custom Sizes',
  construction TEXT DEFAULT 'Hand-Knotted (100 Knots/sq in)',
  tags TEXT[] DEFAULT '{}',
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  show_price BOOLEAN DEFAULT false,
  price NUMERIC(12, 2),
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 4. PRODUCT IMAGES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 5. ENQUIRIES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('retail', 'wholesale', 'international')),
  name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  city TEXT,
  business_type TEXT,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  quantity INT DEFAULT 1,
  preferred_size TEXT,
  budget_range TEXT,
  shipping_destination TEXT,
  message TEXT NOT NULL,
  attachment_url TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'quoted', 'converted', 'closed', 'spam')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 6. ENQUIRY NOTES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiry_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
  admin_id UUID,
  note_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 7. TESTIMONIALS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  company TEXT,
  location TEXT,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  testimonial_text TEXT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- INDEXES FOR HIGH-PERFORMANCE SEARCH & FILTERING
-- --------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_code ON public.products(product_code);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_type ON public.enquiries(type);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON public.enquiries(created_at DESC);

-- --------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------------------
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public Read Site Settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin Write Site Settings" ON public.site_settings;
DROP POLICY IF EXISTS "Public Read Categories" ON public.categories;
DROP POLICY IF EXISTS "Admin Write Categories" ON public.categories;
DROP POLICY IF EXISTS "Public Read Available Products" ON public.products;
DROP POLICY IF EXISTS "Admin Write Products" ON public.products;
DROP POLICY IF EXISTS "Public Read Product Images" ON public.product_images;
DROP POLICY IF EXISTS "Admin Write Product Images" ON public.product_images;
DROP POLICY IF EXISTS "Public Insert Enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Admin Read Enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Admin Write Enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Admin Delete Enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Admin All Enquiry Notes" ON public.enquiry_notes;
DROP POLICY IF EXISTS "Public Read Testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin Write Testimonials" ON public.testimonials;

-- Site Settings: Public Read, Auth Admin Write
CREATE POLICY "Public Read Site Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin Write Site Settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Categories: Public Read, Auth Admin Write
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admin Write Categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');

-- Products: Public Read Available/Active, Auth Admin Full Control
CREATE POLICY "Public Read Available Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admin Write Products" ON public.products FOR ALL USING (auth.role() = 'authenticated');

-- Product Images: Public Read, Auth Admin Write
CREATE POLICY "Public Read Product Images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Admin Write Product Images" ON public.product_images FOR ALL USING (auth.role() = 'authenticated');

-- Enquiries: Public Insert (Submit Enquiries), Auth Admin Read & Write
CREATE POLICY "Public Insert Enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Read Enquiries" ON public.enquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Enquiries" ON public.enquiries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Delete Enquiries" ON public.enquiries FOR DELETE USING (auth.role() = 'authenticated');

-- Enquiry Notes: Auth Admin Only
CREATE POLICY "Admin All Enquiry Notes" ON public.enquiry_notes FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials: Public Read Active, Auth Admin Full Control
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Admin Write Testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');

-- --------------------------------------------------------------------
-- INITIAL SEED DATA
-- --------------------------------------------------------------------
INSERT INTO public.site_settings (id, business_name, phone, whatsapp_number, email, address)
VALUES (1, 'Taj Mahal Carpet', '+91 94152 12345', '919415212345', 'info@tajmahalcarpet.com', 'Main Carpet Market Road, Bhadohi - 221401, Uttar Pradesh, India')
ON CONFLICT (id) DO NOTHING;

-- Categories Seed Data
INSERT INTO public.categories (id, name, slug, description, image_url, display_order)
VALUES 
  ('a1111111-1111-1111-1111-111111111111', 'Traditional & Heritage', 'traditional-heritage', 'Masterpiece hand-knotted carpets featuring intricate Persian, Mughal, and classical oriental motifs.', '/images/persian_carpet.png', 1),
  ('a2222222-2222-2222-2222-222222222222', 'Modern & Architectural', 'modern-architectural', 'Contemporary abstract, geometric, and textured wool-silk carpets designed for modern luxury interiors.', '/images/modern_rug.png', 2),
  ('a3333333-3333-3333-3333-333333333333', 'Persian & Oriental Masterpieces', 'persian-oriental', 'High knot-density silk and merino wool carpets inspired by Isfahan, Tabriz, and Kashan traditions.', '/images/hero_showroom.png', 3),
  ('a4444444-4444-4444-4444-444444444444', 'Hand-Knotted Luxury', 'hand-knotted', 'Unrivalled artisanal hand-knotted carpets crafted knot-by-knot on traditional wooden vertical looms.', '/images/artisan_loom.png', 4)
ON CONFLICT (id) DO NOTHING;

-- Products Seed Data
INSERT INTO public.products (id, name, slug, product_code, description, category_id, material, style, color, size_options, construction, tags, is_available, is_featured, price)
VALUES
  (
    'b1111111-1111-1111-1111-111111111111',
    'Royal Mughal Medallion Silk & Wool',
    'royal-mughal-medallion-silk-wool',
    'TMC-BDH-101',
    'An extraordinary hand-knotted masterpiece crafted in Bhadohi using 100% fine New Zealand wool blended with real mulberry silk highlights. Features an intricate central floral medallion on a deep burgundy field with hand-trimmed embossed silk accents.',
    'a1111111-1111-1111-1111-111111111111',
    '80% New Zealand Wool, 20% Pure Silk',
    'Traditional Mughal Heritage',
    'Deep Burgundy & Muted Brass Gold',
    '5x8 ft, 8x10 ft, 9x12 ft, 10x14 ft, Custom Architectural Dimensions',
    'Hand-Knotted (120 Knots per Sq. Inch)',
    ARRAY['Mughal', 'Silk Accent', 'Burgundy', 'Bhadohi Craft', 'Featured'],
    true,
    true,
    185000
  ),
  (
    'b2222222-2222-2222-2222-222222222222',
    'Contemporary Sand Marble Abstract',
    'contemporary-sand-marble-abstract',
    'TMC-BDH-204',
    'A striking modern statement piece featuring fluid architectural marble veining. Hand-tufted with ultra-soft bamboo viscose silk and organic un-dyed highland wool for a luxurious tactile touch.',
    'a2222222-2222-2222-2222-222222222222',
    '60% Bamboo Viscose Silk, 40% Highland Wool',
    'Modern Architectural Abstract',
    'Warm Sand, Champagne Ivory & Charcoal Vein',
    '6x9 ft, 8x10 ft, 9x12 ft, 12x15 ft, Custom Runner',
    'Hand-Tufted Cut & Loop Sculpted Pile',
    ARRAY['Modern', 'Abstract', 'Bamboo Silk', 'Living Room', 'Featured'],
    true,
    true,
    125000
  ),
  (
    'b3333333-3333-3333-3333-333333333333',
    'Isfahan Dynasty Silk Heritage',
    'isfahan-dynasty-silk-heritage',
    'TMC-BDH-309',
    'Inspired by classical 16th-century Persian court carpets, this masterwork is hand-knotted by senior master artisans in Khamaria, Bhadohi over 8 months. Features pure silk warp and pile with 144 knots per square inch.',
    'a3333333-3333-3333-3333-333333333333',
    '100% Pure Natural Silk',
    'Classical Persian Isfahan',
    'Royal Midnight Blue, Amber Gold & Crimson',
    '4x6 ft, 6x9 ft, 8x10 ft',
    'Hand-Knotted Pure Silk (144 Knots/sq in)',
    ARRAY['Pure Silk', 'Persian', 'Masterpiece', 'High Density', 'Featured'],
    true,
    true,
    295000
  )
ON CONFLICT (id) DO NOTHING;

-- Product Images Seed Data
INSERT INTO public.product_images (product_id, image_url, alt_text, is_primary, display_order)
VALUES
  ('b1111111-1111-1111-1111-111111111111', '/images/persian_carpet.png', 'Royal Mughal Medallion Carpet full view', true, 1),
  ('b2222222-2222-2222-2222-222222222222', '/images/modern_rug.png', 'Contemporary Sand Marble Abstract Rug in sunlit room', true, 1),
  ('b3333333-3333-3333-3333-333333333333', '/images/artisan_loom.png', 'Artisan weaving Isfahan Silk Carpet on loom', true, 1)
ON CONFLICT DO NOTHING;

-- Testimonials Seed Data
INSERT INTO public.testimonials (customer_name, company, location, rating, testimonial_text, is_active, display_order)
VALUES
  ('Rajiv Singhania', 'Singhania Architectural Atelier', 'New Delhi, India', 5, 'We commissioned 14 bespoke hand-knotted silk carpets from Taj Mahal Carpet for a heritage hotel in Rajasthan. The craftsmanship from Bhadohi is unmatched, and the delivery timeline was executed flawlessly.', true, 1),
  ('Elena Rostova', 'Luxury Living International', 'Dubai, UAE', 5, 'Taj Mahal Carpet has been our trusted wholesale partner for 6 years. Their quality control, custom color matching, and international export documentation make bulk importing from India smooth and dependable.', true, 2),
  ('Marcus Vance', 'Vance & Co Interior Design', 'London, United Kingdom', 5, 'The depth of texture and richness of the botanical dyes in their Persian collection is breathtaking. Our private luxury residential clients are consistently delighted.', true, 3)
ON CONFLICT DO NOTHING;
