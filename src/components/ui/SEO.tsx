import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  productSchema?: any;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Taj Mahal Carpet | Premium Handmade Carpets from Bhadohi, India',
  description = 'Taj Mahal Carpet — Premier manufacturer and exporter of hand-knotted, hand-tufted, and bespoke architectural carpets based in Bhadohi, Uttar Pradesh, India. Wholesale, retail and international orders.',
  keywords = 'carpets in Bhadohi, wholesale carpets India, carpet manufacturer Bhadohi, Indian carpets, handmade wool carpets, silk rugs India, export carpets',
  ogImage = '/images/hero_showroom.png',
  productSchema
}) => {
  useEffect(() => {
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // Update OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Update OpenGraph Image
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute('content', ogImage);

    // Organization Structured Data
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Taj Mahal Carpet',
      image: 'https://tajmahalcarpet.com/images/hero_showroom.png',
      telephone: '+91 94152 12345',
      email: 'info@tajmahalcarpet.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Main Carpet Market Road',
        addressLocality: 'Bhadohi',
        addressRegion: 'Uttar Pradesh',
        postalCode: '221401',
        addressCountry: 'IN'
      },
      url: 'https://tajmahalcarpet.com',
      description
    };

    let scriptTag = document.getElementById('json-ld-org');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-org';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(productSchema || orgSchema);
  }, [title, description, keywords, ogImage, productSchema]);

  return null;
};
