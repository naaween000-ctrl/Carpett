import { Category } from '../types/category';
import { Product } from '../types/product';
import { Enquiry } from '../types/enquiry';
import { SiteSettings, Testimonial } from '../types/settings';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  id: 1,
  business_name: 'Taj Mahal Carpet',
  logo_url: '',
  phone: '+91 94152 12345',
  whatsapp_number: '919415212345',
  email: 'info@tajmahalcarpet.com',
  address: 'Main Carpet Highway, Khamaria / Bhadohi - 221401, Uttar Pradesh, India',
  google_maps_url: 'https://maps.google.com/?q=Bhadohi+Uttar+Pradesh+India',
  instagram_url: 'https://instagram.com/tajmahalcarpet',
  facebook_url: 'https://facebook.com/tajmahalcarpet',
  business_description: 'Premier manufacturer and exporter of luxury hand-knotted, hand-tufted, and custom architectural carpets crafted in Bhadohi, Uttar Pradesh — the Carpet Capital of India.',
  hero_heading: 'Timeless Carpets. Crafted for Exceptional Spaces.',
  hero_description: 'Explore the master craftsmanship of Taj Mahal Carpet from Bhadohi, India — serving retail connoisseurs, wholesale partners, and international luxury interior projects.',
  footer_content: 'Taj Mahal Carpet — Preserving heritage Indian weaving craftsmanship with bespoke quality, certified ethical production, and seamless worldwide shipping.',
  price_visibility_default: false,
  catalogue_pdf_url: '#'
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Traditional & Heritage',
    slug: 'traditional-heritage',
    description: 'Masterpiece hand-knotted carpets featuring intricate Persian, Mughal, and classical oriental motifs.',
    image_url: '/images/persian_carpet.png',
    display_order: 1
  },
  {
    id: 'cat-2',
    name: 'Modern & Architectural',
    slug: 'modern-architectural',
    description: 'Contemporary abstract, geometric, and textured wool-silk carpets designed for modern luxury interiors.',
    image_url: '/images/modern_rug.png',
    display_order: 2
  },
  {
    id: 'cat-3',
    name: 'Persian & Oriental Masterpieces',
    slug: 'persian-oriental',
    description: 'High knot-density silk and merino wool carpets inspired by Isfahan, Tabriz, and Kashan traditions.',
    image_url: '/images/hero_showroom.png',
    display_order: 3
  },
  {
    id: 'cat-4',
    name: 'Hand-Knotted Luxury',
    slug: 'hand-knotted',
    description: 'Unrivalled artisanal hand-knotted carpets crafted knot-by-knot on traditional wooden vertical looms.',
    image_url: '/images/artisan_loom.png',
    display_order: 4
  },
  {
    id: 'cat-5',
    name: 'Hand-Tufted & Custom',
    slug: 'hand-tufted-custom',
    description: 'Bespoke hand-tufted carpets with sculpted high-low pile heights, custom colors, and tailored shapes.',
    image_url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1200&auto=format&fit=crop',
    display_order: 5
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-101',
    name: 'Royal Mughal Medallion Silk & Wool',
    slug: 'royal-mughal-medallion-silk-wool',
    product_code: 'TMC-BDH-101',
    description: 'An extraordinary hand-knotted masterpiece crafted in Bhadohi using 100% fine New Zealand wool blended with real mulberry silk highlights. Features an intricate central floral medallion on a deep burgundy field with hand-trimmed embossed silk accents.',
    category_id: 'cat-1',
    category_name: 'Traditional & Heritage',
    material: '80% New Zealand Wool, 20% Pure Silk',
    style: 'Traditional Mughal Heritage',
    color: 'Deep Burgundy & Muted Brass Gold',
    size_options: '5x8 ft, 8x10 ft, 9x12 ft, 10x14 ft, Custom Architectural Dimensions',
    construction: 'Hand-Knotted (120 Knots per Sq. Inch)',
    tags: ['Mughal', 'Silk Accent', 'Burgundy', 'Bhadohi Craft', 'Featured'],
    is_available: true,
    is_featured: true,
    show_price: false,
    price: 185000,
    seo_title: 'Taj Mahal Carpet | Royal Mughal Medallion Silk & Wool Carpet Bhadohi',
    seo_description: 'Explore the Royal Mughal Medallion Carpet hand-knotted in Bhadohi India with fine wool and pure silk accents.',
    images: [
      {
        id: 'img-101-1',
        product_id: 'prod-101',
        image_url: '/images/persian_carpet.png',
        alt_text: 'Royal Mughal Medallion Carpet full view',
        is_primary: true,
        display_order: 1
      },
      {
        id: 'img-101-2',
        product_id: 'prod-101',
        image_url: '/images/hero_showroom.png',
        alt_text: 'Showroom interior display with Royal Mughal carpet',
        is_primary: false,
        display_order: 2
      }
    ]
  },
  {
    id: 'prod-102',
    name: 'Contemporary Sand Marble Abstract',
    slug: 'contemporary-sand-marble-abstract',
    product_code: 'TMC-BDH-204',
    description: 'A striking modern statement piece featuring fluid architectural marble veining. Hand-tufted with ultra-soft bamboo viscose silk and organic un-dyed highland wool for a luxurious tactile touch.',
    category_id: 'cat-2',
    category_name: 'Modern & Architectural',
    material: '60% Bamboo Viscose Silk, 40% Highland Wool',
    style: 'Modern Architectural Abstract',
    color: 'Warm Sand, Champagne Ivory & Charcoal Vein',
    size_options: '6x9 ft, 8x10 ft, 9x12 ft, 12x15 ft, Custom Runner',
    construction: 'Hand-Tufted Cut & Loop Sculpted Pile',
    tags: ['Modern', 'Abstract', 'Bamboo Silk', 'Living Room', 'Featured'],
    is_available: true,
    is_featured: true,
    show_price: false,
    price: 125000,
    seo_title: 'Taj Mahal Carpet | Contemporary Sand Marble Abstract Rug',
    seo_description: 'Bespoke modern abstract rug in bamboo silk and highland wool crafted for contemporary luxury homes.',
    images: [
      {
        id: 'img-102-1',
        product_id: 'prod-102',
        image_url: '/images/modern_rug.png',
        alt_text: 'Contemporary Sand Marble Abstract Rug in sunlit room',
        is_primary: true,
        display_order: 1
      },
      {
        id: 'img-102-2',
        product_id: 'prod-102',
        image_url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1200&auto=format&fit=crop',
        alt_text: 'Texture detail of modern rug',
        is_primary: false,
        display_order: 2
      }
    ]
  },
  {
    id: 'prod-103',
    name: 'Isfahan Dynasty Silk Heritage',
    slug: 'isfahan-dynasty-silk-heritage',
    product_code: 'TMC-BDH-309',
    description: 'Inspired by classical 16th-century Persian court carpets, this masterwork is hand-knotted by senior master artisans in Khamaria, Bhadohi over 8 months. Features pure silk warp and pile with 144 knots per square inch.',
    category_id: 'cat-3',
    category_name: 'Persian & Oriental Masterpieces',
    material: '100% Pure Natural Silk',
    style: 'Classical Persian Isfahan',
    color: 'Royal Midnight Blue, Amber Gold & Crimson',
    size_options: '4x6 ft, 6x9 ft, 8x10 ft',
    construction: 'Hand-Knotted Pure Silk (144 Knots/sq in)',
    tags: ['Pure Silk', 'Persian', 'Masterpiece', 'High Density', 'Featured'],
    is_available: true,
    is_featured: true,
    show_price: false,
    price: 295000,
    seo_title: 'Taj Mahal Carpet | Isfahan Dynasty Pure Silk Carpet',
    seo_description: 'Hand-knotted 100% pure silk Persian carpet crafted over 8 months by master artisans in Bhadohi.',
    images: [
      {
        id: 'img-103-1',
        product_id: 'prod-103',
        image_url: '/images/artisan_loom.png',
        alt_text: 'Artisan weaving Isfahan Silk Carpet on loom',
        is_primary: true,
        display_order: 1
      },
      {
        id: 'img-103-2',
        product_id: 'prod-103',
        image_url: '/images/persian_carpet.png',
        alt_text: 'Isfahan silk rug pattern',
        is_primary: false,
        display_order: 2
      }
    ]
  },
  {
    id: 'prod-104',
    name: 'Bhadohi Artisan Geometric Flatweave Durrie',
    slug: 'bhadohi-artisan-geometric-flatweave',
    product_code: 'TMC-BDH-402',
    description: 'Re-imagining traditional Indian flatweave durries for high-end boutique hospitality and coastal homes. Reversible handwoven construction from pure hand-carded Indian wool.',
    category_id: 'cat-4',
    category_name: 'Hand-Knotted Luxury',
    material: '100% Organic Hand-Carded Indian Wool',
    style: 'Geometric Transitional',
    color: 'Terracotta, Sand Beige & Muted Sage',
    size_options: '5x8 ft, 8x10 ft, 9x12 ft, Custom Widths',
    construction: 'Hand-Woven Flatweave (Reversible)',
    tags: ['Flatweave', 'Durrie', 'Organic Wool', 'Wholesale Ready'],
    is_available: true,
    is_featured: false,
    show_price: false,
    price: 45000,
    seo_title: 'Taj Mahal Carpet | Organic Wool Geometric Flatweave Durrie',
    seo_description: 'Reversible handwoven wool durrie flatweave carpet from Bhadohi wholesale exporter.',
    images: [
      {
        id: 'img-104-1',
        product_id: 'prod-104',
        image_url: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=1200&auto=format&fit=crop',
        alt_text: 'Geometric flatweave carpet detail',
        is_primary: true,
        display_order: 1
      }
    ]
  },
  {
    id: 'prod-105',
    name: 'Kashan Rose Medallion Heirloom',
    slug: 'kashan-rose-medallion-heirloom',
    product_code: 'TMC-BDH-505',
    description: 'A timeless heirloom oriental carpet with dense palmette vine scrolls and soft rose ivory borders. Ideal for grand dining halls, presidential suites, and luxury villas.',
    category_id: 'cat-1',
    category_name: 'Traditional & Heritage',
    material: 'Highland Merino Wool with Botanical Dyes',
    style: 'Traditional Persian Kashan',
    color: 'Dusty Rose, Warm Cream & Vintage Navy',
    size_options: '8x10 ft, 9x12 ft, 10x14 ft, 12x18 ft',
    construction: 'Hand-Knotted Fine Wool',
    tags: ['Traditional', 'Kashan', 'Heirloom', 'Rose Medallion'],
    is_available: true,
    is_featured: true,
    show_price: false,
    price: 165000,
    seo_title: 'Taj Mahal Carpet | Kashan Rose Medallion Heirloom Rug',
    seo_description: 'Heirloom oriental carpet with botanical dyes hand-knotted for grand living rooms.',
    images: [
      {
        id: 'img-105-1',
        product_id: 'prod-105',
        image_url: '/images/persian_carpet.png',
        alt_text: 'Kashan Rose Medallion Heirloom carpet',
        is_primary: true,
        display_order: 1
      }
    ]
  },
  {
    id: 'prod-106',
    name: 'Architectural Line Linear Minimalist',
    slug: 'architectural-line-linear-minimalist',
    product_code: 'TMC-BDH-612',
    description: 'Designed in collaboration with international interior architects. Features micro-grooved linear carving in ivory wool paired with brass-gold silk accents.',
    category_id: 'cat-2',
    category_name: 'Modern & Architectural',
    material: 'New Zealand Wool & Art Silk',
    style: 'Minimalist Contemporary',
    color: 'Ivory Cream & Antique Brass Line',
    size_options: '6x9 ft, 8x10 ft, 9x12 ft, Custom Shapes',
    construction: 'Hand-Tufted Carved High-Low Pile',
    tags: ['Minimalist', 'Carved', 'Ivory', 'Architectural'],
    is_available: true,
    is_featured: false,
    show_price: false,
    price: 98000,
    seo_title: 'Taj Mahal Carpet | Minimalist Linear Architectural Carpet',
    seo_description: 'Carved high-low pile minimalist carpet in ivory and antique brass silk.',
    images: [
      {
        id: 'img-106-1',
        product_id: 'prod-106',
        image_url: '/images/modern_rug.png',
        alt_text: 'Minimalist Linear Architectural Carpet',
        is_primary: true,
        display_order: 1
      }
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    customer_name: 'Rajiv Singhania',
    company: 'Singhania Architectural Atelier',
    location: 'New Delhi, India',
    rating: 5,
    testimonial_text: 'We commissioned 14 bespoke hand-knotted silk carpets from Taj Mahal Carpet for a heritage hotel in Rajasthan. The craftsmanship from Bhadohi is unmatched, and the delivery timeline was executed flawlessly.',
    image_url: '',
    is_active: true,
    display_order: 1
  },
  {
    id: 'test-2',
    customer_name: 'Elena Rostova',
    company: 'Luxury Living International',
    location: 'Dubai, UAE',
    rating: 5,
    testimonial_text: 'Taj Mahal Carpet has been our trusted wholesale partner for 6 years. Their quality control, custom color matching, and international export documentation make bulk importing from India smooth and dependable.',
    image_url: '',
    is_active: true,
    display_order: 2
  },
  {
    id: 'test-3',
    customer_name: 'Marcus Vance',
    company: 'Vance & Co Interior Design',
    location: 'London, United Kingdom',
    rating: 5,
    testimonial_text: 'The depth of texture and richness of the botanical dyes in their Persian collection is breathtaking. Our private luxury residential clients are consistently delighted.',
    image_url: '',
    is_active: true,
    display_order: 3
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    type: 'wholesale',
    name: 'Amitabh Sharma',
    company_name: 'Royal Spaces Hospitality',
    email: 'amitabh@royalspaces.in',
    phone: '+91 98200 44556',
    country: 'India',
    city: 'Mumbai',
    business_type: 'Hotel Project',
    product_id: 'prod-101',
    product_name: 'Royal Mughal Medallion Silk & Wool',
    product_code: 'TMC-BDH-101',
    quantity: 25,
    preferred_size: '8x10 ft',
    budget_range: '₹20,000,000 - ₹35,000,000',
    shipping_destination: 'Mumbai Port / Direct Hotel Warehouse',
    message: 'We require 25 heavy-duty hand-knotted wool-silk carpets for our upcoming luxury resort project in Goa. Please provide wholesale volume quotation.',
    status: 'new',
    priority: 'high',
    source: 'wholesale_form',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: [
      {
        id: 'note-1',
        enquiry_id: 'enq-1',
        note_text: 'Received bulk hotel enquiry. Sent catalogue PDF via WhatsApp and scheduled follow-up call.',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString()
      }
    ]
  },
  {
    id: 'enq-2',
    type: 'international',
    name: 'Sarah Jenkins',
    company_name: 'Jenkins Design Studio',
    email: 'sarah@jenkinsdesign.co.uk',
    phone: '+44 7700 900123',
    country: 'United Kingdom',
    city: 'London',
    business_type: 'Interior Designer',
    product_id: 'prod-102',
    product_name: 'Contemporary Sand Marble Abstract',
    product_code: 'TMC-BDH-204',
    quantity: 4,
    preferred_size: '9x12 ft Custom',
    shipping_destination: 'London Gateway Port / Air Freight Heathrow',
    message: 'Interested in sourcing 4 custom size marble abstract rugs for a penthouse apartment in Kensington. Can you send yarn swatch samples to London?',
    status: 'contacted',
    priority: 'medium',
    source: 'international_form',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];
