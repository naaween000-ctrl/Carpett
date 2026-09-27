import { EnquiryFormData } from '../types/enquiry';

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';
const RECIPIENT_EMAIL = 'naaween000@gmail.com';

async function postEmailToResend(payload: any): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('[Resend] API Key not configured in .env');
    return false;
  }

  const endpoints = typeof window !== 'undefined'
    ? ['/api/resend/emails', 'https://api.resend.com/emails']
    : ['https://api.resend.com/emails'];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`[Resend] Email sent successfully to ${RECIPIENT_EMAIL}:`, data);
        return true;
      } else {
        const errText = await response.text();
        console.warn(`[Resend] Failed via ${endpoint}:`, errText);
      }
    } catch (err) {
      console.warn(`[Resend] Network/CORS error via ${endpoint}:`, err);
    }
  }

  return false;
}

export async function sendEnquiryNotificationEmail(enquiry: EnquiryFormData & { product_name?: string }): Promise<boolean> {
  return postEmailToResend({
    from: 'Taj Mahal Carpet <onboarding@resend.dev>',
    to: [RECIPIENT_EMAIL],
    subject: `New ${enquiry.type.toUpperCase()} Enquiry: ${enquiry.name} (${enquiry.country || 'India'})`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #FDFBF7; padding: 24px; color: #1C1919;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #C5A059;">
          <div style="background-color: #5A1827; padding: 20px; text-align: center; color: #DFB971;">
            <h2 style="margin: 0; font-size: 22px;">TAJ MAHAL CARPET</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px;">NEW ${enquiry.type.toUpperCase()} ENQUIRY RECEIVED</p>
          </div>
          <div style="padding: 24px;">
            <h3 style="color: #5A1827; margin-top: 0;">Customer Information</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr><td style="padding: 6px 0; color: #777;">Client Name:</td><td style="font-weight: bold;">${enquiry.name}</td></tr>
              <tr><td style="padding: 6px 0; color: #777;">Email:</td><td><a href="mailto:${enquiry.email}">${enquiry.email}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #777;">Phone:</td><td><a href="tel:${enquiry.phone}">${enquiry.phone}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #777;">Company:</td><td>${enquiry.company_name || 'N/A'}</td></tr>
              <tr><td style="padding: 6px 0; color: #777;">Location:</td><td>${enquiry.city ? enquiry.city + ', ' : ''}${enquiry.country || 'India'}</td></tr>
              ${enquiry.product_name ? `<tr><td style="padding: 6px 0; color: #777;">Target Carpet:</td><td style="font-weight: bold; color: #5A1827;">${enquiry.product_name}</td></tr>` : ''}
              ${enquiry.preferred_size ? `<tr><td style="padding: 6px 0; color: #777;">Preferred Size:</td><td>${enquiry.preferred_size}</td></tr>` : ''}
              ${enquiry.quantity ? `<tr><td style="padding: 6px 0; color: #777;">Quantity:</td><td>${enquiry.quantity} unit(s)</td></tr>` : ''}
            </table>

            <h3 style="color: #5A1827; margin-top: 20px;">Message & Specifications</h3>
            <div style="background-color: #F5F0E6; padding: 16px; border-radius: 8px; font-style: italic; font-size: 14px; line-height: 1.5;">
              "${enquiry.message}"
            </div>

            <div style="margin-top: 24px; text-align: center;">
              <a href="https://wa.me/${enquiry.phone.replace(/\D/g, '')}" style="background-color: #059669; color: #ffffff; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block;">
                Respond via WhatsApp
              </a>
            </div>
          </div>
          <div style="background-color: #1C1919; color: #999999; padding: 12px; text-align: center; font-size: 11px;">
            Taj Mahal Carpet Showroom • Bhadohi, Uttar Pradesh, India
          </div>
        </div>
      </div>
    `
  });
}

export async function sendContactMessageEmail(contactData: { name: string; email: string; phone: string; subject?: string; message: string }): Promise<boolean> {
  return postEmailToResend({
    from: 'Taj Mahal Carpet <onboarding@resend.dev>',
    to: [RECIPIENT_EMAIL],
    subject: `Contact Form Message: ${contactData.subject || contactData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #FDFBF7; padding: 24px; color: #1C1919;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #C5A059;">
          <div style="background-color: #5A1827; padding: 20px; text-align: center; color: #DFB971;">
            <h2 style="margin: 0; font-size: 22px;">TAJ MAHAL CARPET</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px;">NEW WEBSITE CONTACT MESSAGE</p>
          </div>
          <div style="padding: 24px;">
            <h3 style="color: #5A1827; margin-top: 0;">Sender Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr><td style="padding: 6px 0; color: #777;">Name:</td><td style="font-weight: bold;">${contactData.name}</td></tr>
              <tr><td style="padding: 6px 0; color: #777;">Email:</td><td><a href="mailto:${contactData.email}">${contactData.email}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #777;">Phone:</td><td><a href="tel:${contactData.phone}">${contactData.phone}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #777;">Subject:</td><td>${contactData.subject || 'General Contact Inquiry'}</td></tr>
            </table>

            <h3 style="color: #5A1827; margin-top: 20px;">Message Body</h3>
            <div style="background-color: #F5F0E6; padding: 16px; border-radius: 8px; font-style: italic; font-size: 14px; line-height: 1.5;">
              "${contactData.message}"
            </div>
          </div>
          <div style="background-color: #1C1919; color: #999999; padding: 12px; text-align: center; font-size: 11px;">
            Taj Mahal Carpet Showroom • Bhadohi, Uttar Pradesh, India
          </div>
        </div>
      </div>
    `
  });
}

