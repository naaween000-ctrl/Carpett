import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/hero/Hero';
import { ProductGrid } from '../components/product/ProductGrid';
import { SEO } from '../components/ui/SEO';
import { EnquiryModal } from '../components/enquiry/EnquiryModal';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { getTestimonials } from '../lib/dataService';
import { Testimonial } from '../types/settings';
import { Product } from '../types/product';
import { generateWhatsAppLink } from '../lib/whatsapp';
import { analytics } from '../lib/analytics';
import {
  Sparkles,
  ShieldCheck,
  Globe,
  Package,
  Award,
  ArrowRight,
  MessageCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

export const Home: React.FC = () => {
  const { products, loading: productsLoading } = useProducts({ is_featured: true });
  const { categories, loading: categoriesLoading } = useCategories();
  const { settings } = useSiteSettings();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedProductForEnquiry, setSelectedProductForEnquiry] = useState<Product | undefined>(undefined);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  React.useEffect(() => {
    getTestimonials().then(res => setTestimonials(res.filter(t => t.is_active)));
  }, []);

  const handleEnquireProduct = (product: Product) => {
    setSelectedProductForEnquiry(product);
    setIsEnquiryModalOpen(true);
  };

  const handleWhatsApp = () => {
    analytics.trackWhatsAppClick('homepage');
    window.open(generateWhatsAppLink(settings.whatsapp_number, 'general'), '_blank');
  };

  return (
    <div className="min-h-screen bg-warm-ivory text-charcoal-900">
      <SEO
        title="Taj Mahal Carpet | Premium Hand-Knotted Carpets Bhadohi India"
        description="Taj Mahal Carpet — Premier manufacturer & exporter of luxury hand-knotted, hand-tufted, and custom architectural carpets based in Bhadohi, Uttar Pradesh, India."
      />

      {/* Hero Banner */}
      <Hero />

      {/* SECTION 1 — Introduction to Heritage Craftsmanship */}
      <section className="py-20 bg-warm-cream/40 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-burgundy-900 font-semibold text-xs tracking-widest uppercase">
                <span className="w-8 h-[2px] bg-gold-500" />
                <span>Craftsmanship Heritage</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 leading-tight">
                From the Weaving Looms of <span className="burgundy-gradient-text">Bhadohi</span> to Global Spaces.
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Taj Mahal Carpet is rooted in Bhadohi, Uttar Pradesh — world-renowned as the 'Carpet City of India'. For generations, our master weavers have translated raw highland wool and pure mulberry silk into extraordinary floorcoverings that grace royal residences, boutique hotels, and luxury private estates.
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Whether catering to retail connoisseurs searching for a single statement heirloom or international architectural firms requiring custom bulk hospitality carpets, we combine traditional hand-knotting art with modern quality assurance.
              </p>

              <div className="pt-2 flex items-center space-x-6">
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-full bg-burgundy-900 hover:bg-burgundy-800 text-gold-400 font-bold text-xs uppercase tracking-wider shadow-lg inline-flex items-center space-x-2 transition-transform transform hover:-translate-y-0.5"
                >
                  <span>Read Our Heritage Story</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${settings.phone}`}
                  className="text-xs font-semibold text-charcoal-900 hover:text-burgundy-800 underline underline-offset-4"
                >
                  Call Showroom: {settings.phone}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white carpet-hero-border">
                <img
                  src="/images/artisan_loom.png"
                  alt="Artisan carpet weaver on loom in Bhadohi"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Floating Feature Badge */}
              <div className="absolute -bottom-6 -left-6 dark-glass-card rounded-2xl p-4 shadow-2xl border border-gold-500/40 text-warm-ivory hidden sm:flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-burgundy-900 flex items-center justify-center text-gold-400 font-bold font-serif text-xl border border-gold-500/40">
                  100%
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-gold-400">Authentic Indian Weave</h4>
                  <p className="text-[11px] text-stone-300">Certified Bhadohi Craftsmanship</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Featured Collection Showcase */}
      <section className="py-20 bg-warm-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold tracking-widest text-burgundy-800 uppercase block mb-1">
                Showroom Masterpieces
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">Featured Carpet Collection</h2>
            </div>
            <Link
              to="/catalogue"
              className="mt-4 md:mt-0 font-semibold text-xs text-burgundy-900 hover:text-gold-600 uppercase tracking-wider flex items-center space-x-1 transition-colors"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProductGrid products={products.slice(0, 6)} loading={productsLoading} onEnquire={handleEnquireProduct} />
        </div>
      </section>

      {/* SECTION 3 — Dynamic Categories Grid */}
      <section className="py-20 bg-warm-cream/50 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-widest text-burgundy-800 uppercase block mb-2">
              Curated Classifications
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mb-3">Explore by Category</h2>
            <p className="text-stone-600 text-sm">
              Discover our versatile carpet collections designed for traditional heritage villas, modern apartments, and commercial projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/catalogue?category=${cat.slug}`}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-lg border border-gold-500/20 flex flex-col justify-end p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src={cat.image_url || '/images/persian_carpet.png'}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/60 to-transparent" />

                <div className="relative z-10 text-warm-ivory space-y-2">
                  <h3 className="font-serif text-2xl font-bold group-hover:text-gold-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-stone-300 text-xs line-clamp-2 leading-relaxed font-light">{cat.description}</p>
                  <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-gold-400 group-hover:translate-x-1 transition-transform">
                    <span>Discover Collection</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Why Taj Mahal Carpet */}
      <section className="py-20 bg-charcoal-900 text-warm-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block mb-2">
              Business Distinctions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warm-ivory">Why Choose Taj Mahal Carpet</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="dark-glass-card rounded-2xl p-6 border border-gold-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-burgundy-900 text-gold-400 flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gold-400">Authentic Bhadohi Weave</h3>
              <p className="text-stone-300 text-xs leading-relaxed font-light">
                Crafted by hereditary carpet weavers in Uttar Pradesh, preserving centuries of knotting mastery.
              </p>
            </div>

            <div className="dark-glass-card rounded-2xl p-6 border border-gold-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-burgundy-900 text-gold-400 flex items-center justify-center mx-auto shadow-lg">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gold-400">Wholesale Capacity</h3>
              <p className="text-stone-300 text-xs leading-relaxed font-light">
                Direct carpet manufacturer with capacity for large bulk shipments, hotel projects, and retail distribution.
              </p>
            </div>

            <div className="dark-glass-card rounded-2xl p-6 border border-gold-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-burgundy-900 text-gold-400 flex items-center justify-center mx-auto shadow-lg">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gold-400">Global Exports</h3>
              <p className="text-stone-300 text-xs leading-relaxed font-light">
                Seamless international door-to-door or port delivery to USA, Europe, Middle East, and Asia.
              </p>
            </div>

            <div className="dark-glass-card rounded-2xl p-6 border border-gold-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-burgundy-900 text-gold-400 flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gold-400">Bespoke Customization</h3>
              <p className="text-stone-300 text-xs leading-relaxed font-light">
                Custom sizes, custom yarns, custom dye palettes, and architectural specifications made to order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7 — Wholesale & International Banner CTAs */}
      <section className="py-16 bg-gradient-to-r from-burgundy-950 via-burgundy-900 to-burgundy-950 text-warm-ivory border-y border-gold-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 divide-y lg:divide-y-0 lg:divide-x divide-gold-500/20">
            {/* Wholesale CTA Block */}
            <div className="space-y-4 pr-0 lg:pr-8">
              <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">
                Bulk Orders & Trade Partnerships
              </span>
              <h3 className="font-serif text-3xl font-bold text-warm-ivory">Looking for Carpets in Bulk?</h3>
              <p className="text-stone-300 text-sm leading-relaxed font-light">
                We supply carpet retailers, hotel developers, interior designers, and wholesalers across India and abroad with factory direct pricing and customized production batches.
              </p>
              <Link
                to="/enquiry/wholesale"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-900 font-bold text-xs uppercase tracking-wider shadow-lg hover:from-gold-400 transition-all transform hover:-translate-y-0.5"
              >
                <span>Request Wholesale Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* International Export CTA Block */}
            <div className="space-y-4 pt-8 lg:pt-0 pl-0 lg:pl-8">
              <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">
                Worldwide Export Logistics
              </span>
              <h3 className="font-serif text-3xl font-bold text-warm-ivory">Looking for Carpets from India?</h3>
              <p className="text-stone-300 text-sm leading-relaxed font-light">
                Direct export from Bhadohi, India with international certificates of origin, air/sea freight handling, and customs compliance for global luxury importers.
              </p>
              <Link
                to="/enquiry/international"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full dark-glass-card border border-gold-500/40 text-warm-ivory font-bold text-xs uppercase tracking-wider hover:bg-gold-500 hover:text-charcoal-900 transition-all transform hover:-translate-y-0.5"
              >
                <span>International Enquiry</span>
                <Globe className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Testimonials Carousel */}
      <section className="py-20 bg-warm-cream/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-widest text-burgundy-800 uppercase block mb-2">
              Client Endorsements
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex text-gold-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-sm italic leading-relaxed">"{t.testimonial_text}"</p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <h4 className="font-serif font-bold text-charcoal-900 text-base">{t.customer_name}</h4>
                  <p className="text-xs text-stone-500">
                    {t.company ? `${t.company} • ` : ''}
                    {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — Contact Summary & Google Maps */}
      <section className="py-20 bg-warm-ivory border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold tracking-widest text-burgundy-800 uppercase block">
                Bhadohi Showroom & Factory
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">Visit or Get in Touch</h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                We welcome retail clients, interior designers, and wholesale buyers to visit our digital showroom or physically inspect our weaving looms in Bhadohi, Uttar Pradesh.
              </p>

              <div className="space-y-4 text-sm text-stone-700 pt-2">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gold-600 shrink-0" />
                  <span>{settings.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gold-600 shrink-0" />
                  <span>{settings.email}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Business</span>
                </button>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-full bg-burgundy-900 text-gold-400 font-semibold text-xs uppercase tracking-wider shadow-lg"
                >
                  Contact Page
                </Link>
              </div>
            </div>

            {/* Embedded Location Map Preview */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-96 relative bg-stone-100">
              <iframe
                title="Taj Mahal Carpet Bhadohi Map Location"
                src="https://maps.google.com/maps?q=Bhadohi%20Uttar%20Pradesh%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Modal Component */}
      <EnquiryModal
        product={selectedProductForEnquiry}
        type="retail"
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </div>
  );
};
