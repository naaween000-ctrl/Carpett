// Google Analytics event tracker wrapper

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  } else {
    // Log for development insight
    console.debug(`[Analytics Event] ${eventName}:`, params);
  }
}

export const analytics = {
  trackPageView: (pagePath: string, pageTitle: string) => {
    trackEvent('page_view', { page_path: pagePath, page_title: pageTitle });
  },
  trackProductView: (productId: string, productName: string, productCode: string) => {
    trackEvent('view_item', { item_id: productId, item_name: productName, item_code: productCode });
  },
  trackSearch: (searchQuery: string) => {
    trackEvent('search', { search_term: searchQuery });
  },
  trackFilter: (filterType: string, filterValue: string) => {
    trackEvent('apply_filter', { filter_type: filterType, filter_value: filterValue });
  },
  trackEnquirySubmit: (type: 'retail' | 'wholesale' | 'international' | 'general', productName?: string) => {
    trackEvent('generate_lead', { enquiry_type: type, product_name: productName || 'General' });
  },
  trackWhatsAppClick: (source: string, productName?: string) => {
    trackEvent('contact_whatsapp', { source, product_name: productName || 'General' });
  },
  trackPhoneClick: () => {
    trackEvent('contact_phone');
  },
  trackEmailClick: () => {
    trackEvent('contact_email');
  },
  trackCatalogueDownload: () => {
    trackEvent('download_catalogue');
  }
};
