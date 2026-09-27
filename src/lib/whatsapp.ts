export function generateWhatsAppLink(
  whatsappNumber: string,
  type: 'product' | 'wholesale' | 'international' | 'retail' | 'general',
  productDetails?: { name: string; code: string }
): string {
  // Clean phone number (strip non-digits)
  const cleanNumber = whatsappNumber.replace(/\D/g, '');

  let text = '';
  switch (type) {
    case 'product':
      text = `Hello Taj Mahal Carpet, I am interested in ${productDetails?.name || 'this carpet'} (${productDetails?.code || 'Catalog Item'}). I would like to know more about availability and pricing.`;
      break;
    case 'wholesale':
      text = 'Hello Taj Mahal Carpet, I am interested in a wholesale/bulk carpet enquiry for our business.';
      break;
    case 'international':
      text = 'Hello Taj Mahal Carpet, I am interested in sourcing luxury handmade carpets from India for international export.';
      break;
    default:
      text = 'Hello Taj Mahal Carpet, I would like to make an enquiry regarding your carpet collection.';
      break;
  }

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
