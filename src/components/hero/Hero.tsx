import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSiteSettings';

export const Hero: React.FC = () => {
  const { settings } = useSiteSettings();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-charcoal-900">
      {/* Hero Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_showroom.png"
          alt="Taj Mahal Carpet Showroom Bhadohi"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-75 contrast-110"
        />
        {/* Multi-layered luxury gradients for high contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/70 to-charcoal-900/40" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60" />
      </div>

      {/* Subtle Golden Pattern Background Overlay */}
      <div className="absolute inset-0 z-0 bg-dark-carpet-pattern opacity-30 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-warm-ivory py-12">
        {/* Heritage Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full dark-glass-card border border-gold-500/40 text-gold-400 text-xs font-medium tracking-widest uppercase mb-8 shadow-xl">
          <Award className="w-4 h-4 text-gold-400" />
          <span>Bhadohi, Uttar Pradesh • India's Carpet Capital</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-warm-ivory leading-[1.15] mb-6">
          {settings.hero_heading || 'Timeless Carpets.'}
          <span className="block gold-gradient-text italic font-normal mt-1">
            Crafted for Exceptional Spaces.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 font-light leading-relaxed mb-10">
          {settings.hero_description ||
            'Explore the collection of Taj Mahal Carpet from Bhadohi, India — serving retail, wholesale and international customers.'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            to="/catalogue"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-charcoal-900 font-bold text-sm tracking-wider uppercase shadow-2xl hover:shadow-gold-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-3 group"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/enquiry/wholesale"
            className="w-full sm:w-auto px-8 py-4 rounded-full dark-glass-card border border-gold-500/40 text-warm-ivory font-semibold text-sm tracking-wider uppercase hover:bg-burgundy-900/60 hover:border-gold-400 transition-all transform hover:-translate-y-1 shadow-lg text-center"
          >
            Enquire Now
          </Link>
        </div>

        {/* Showroom Highlights Footer Ribbon */}
        <div className="mt-16 pt-8 border-t border-gold-500/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-300 text-xs tracking-wider uppercase font-medium">
          <div className="flex flex-col items-center">
            <span className="text-gold-400 font-serif text-xl font-bold mb-1">Hand-Knotted</span>
            <span className="text-[10px] text-stone-400">Pure Wool & Silk</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gold-400 font-serif text-xl font-bold mb-1">Wholesale Ready</span>
            <span className="text-[10px] text-stone-400">Bulk & Contract Orders</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gold-400 font-serif text-xl font-bold mb-1">Worldwide Export</span>
            <span className="text-[10px] text-stone-400">Global Shipping</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gold-400 font-serif text-xl font-bold mb-1">Bespoke Custom</span>
            <span className="text-[10px] text-stone-400">Architect Specs</span>
          </div>
        </div>
      </div>
    </section>
  );
};
