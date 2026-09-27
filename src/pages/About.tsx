import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { Award, ShieldCheck, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-warm-ivory text-charcoal-900 pt-28 pb-20">
      <SEO
        title="About Taj Mahal Carpet | Bhadohi Carpet Heritage & Artisans"
        description="Learn about Taj Mahal Carpet based in Bhadohi, Uttar Pradesh, India. Discover our centuries-old weaving heritage, hand-knotted pure wool & silk craftsmanship, ethical artisan standards, and global export capabilities."
      />

      {/* Page Header Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="text-xs font-semibold tracking-widest text-burgundy-800 uppercase block mb-2">
          Heritage & Legacy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal-900 mb-4">
          Taj Mahal Carpet <span className="burgundy-gradient-text">Bhadohi</span>
        </h1>
        <p className="max-w-2xl mx-auto text-stone-600 text-sm sm:text-base leading-relaxed font-light">
          Preserving centuries of Indian weaving craftsmanship, combining master hand-knotting art with modern digital showroom convenience for world-class interiors.
        </p>
      </div>

      {/* Section 1: Bhadohi Carpet Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-charcoal-900">
              The Carpet Capital of India — Bhadohi, UP
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              Bhadohi, located in Uttar Pradesh near the sacred Ganges river, has been the beating heart of India's carpet weaving tradition since the 16th century Mughal era. It is home to thousands of hereditary master weavers whose hands craft some of the world's most intricate and durable carpets.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Taj Mahal Carpet stands as a premier pillar of this tradition. From our headquarters in Bhadohi, we manage the entire production cycle — from raw yarn carding, hand-spinning, botanical dyeing, and weaving on traditional vertical wooden looms, to final washing, hand-embossing, and international dispatch.
            </p>
          </div>

          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/images/artisan_loom.png"
              alt="Artisan weaving carpet in Bhadohi"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Craftsmanship Pillars */}
      <div className="bg-warm-cream/60 py-20 border-y border-stone-200 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">Our Weaving Standards</h2>
            <p className="text-stone-600 text-sm">Every carpet from Taj Mahal Carpet represents uncompromised quality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-burgundy-900 text-gold-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900">Pure Raw Materials</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                We use 100% fine New Zealand highland wool, real mulberry silk, and eco-friendly bamboo viscose dyed with colorfast non-toxic botanical colors.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-burgundy-900 text-gold-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900">Master Knot Density</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Our heritage collection features knot densities ranging from 100 to over 144 knots per square inch, creating crisp medallion definition and generations of longevity.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-burgundy-900 text-gold-400 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900">Ethical Artisan Welfare</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                We are strictly committed to fair artisan wages, safe loom working conditions, zero child labor, and community healthcare support across Bhadohi villages.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer Block */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-charcoal-900">Explore Our Showroom Catalogue</h2>
        <p className="text-stone-600 text-sm">Discover our available products or contact us for custom weaving orders.</p>
        <div className="flex justify-center gap-4">
          <Link
            to="/catalogue"
            className="px-8 py-3.5 rounded-full bg-burgundy-900 text-gold-400 font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-burgundy-800"
          >
            View Catalogue
          </Link>
          <Link
            to="/enquiry/wholesale"
            className="px-8 py-3.5 rounded-full bg-warm-cream border border-stone-300 text-charcoal-900 font-semibold text-xs uppercase tracking-wider"
          >
            Wholesale Enquiries
          </Link>
        </div>
      </div>
    </div>
  );
};
