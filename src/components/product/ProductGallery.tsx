import React, { useState } from 'react';
import { ProductImage } from '../../types/product';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const defaultImage = images.find(img => img.is_primary)?.image_url || images[0]?.image_url || '/images/persian_carpet.png';
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentIndex = images.findIndex(img => img.image_url === selectedImage);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIdx].image_url);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIdx].image_url);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Stage */}
      <div className="relative aspect-[4/3] bg-stone-100 rounded-3xl overflow-hidden shadow-xl border border-gold-500/20 group">
        <img
          src={selectedImage}
          alt={productName}
          className="w-full h-full object-cover object-center transition-all duration-500 cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        />

        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 p-3 rounded-full dark-glass-card text-warm-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg hover:scale-110"
          aria-label="Expand image fullscreen"
        >
          <Maximize2 className="w-5 h-5 text-gold-400" />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full dark-glass-card text-warm-ivory opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gold-400" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full dark-glass-card text-warm-ivory opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gold-400" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedImage(img.image_url)}
              className={`relative w-24 aspect-[4/3] rounded-xl overflow-hidden shrink-0 transition-all border-2 ${
                selectedImage === img.image_url
                  ? 'border-gold-500 scale-105 shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img.image_url} alt={`${productName} view ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-stone-800 text-warm-ivory hover:text-gold-400 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <img src={selectedImage} alt={productName} className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
        </div>
      )}
    </div>
  );
};
