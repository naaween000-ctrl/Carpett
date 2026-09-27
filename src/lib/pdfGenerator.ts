import jsPDF from 'jspdf';
import { Product } from '../types/product';
import { SiteSettings } from '../types/settings';

export function generateCataloguePDF(products: Product[], settings: SiteSettings): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  // Header Background - Deep Burgundy
  doc.setFillColor(90, 24, 39); // #5A1827
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Decorative Gold Border Line
  doc.setDrawColor(197, 160, 89); // #C5A059
  doc.setLineWidth(0.8);
  doc.line(0, 40, pageWidth, 40);

  // Title: Taj Mahal Carpet
  doc.setTextColor(253, 251, 247); // Warm Ivory
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.text(settings.business_name || 'TAJ MAHAL CARPET', margin, 20);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(216, 181, 111); // Gold text
  doc.text('BHADOHI, UTTAR PRADESH, INDIA — DIGITAL SHOWROOM CATALOGUE', margin, 28);
  doc.text(`Contact: ${settings.phone} | Email: ${settings.email}`, margin, 34);

  // Page Content Intro
  let y = 52;
  doc.setTextColor(28, 25, 25);
  doc.setFont('times', 'italic');
  doc.setFontSize(12);
  doc.text('Exquisite Hand-Knotted & Custom Architectural Carpets', margin, y);
  y += 10;

  // Render Product Table/Grid
  products.forEach((prod, index) => {
    // Check page overflow
    if (y > pageHeight - 35) {
      doc.addPage();
      y = 20;
    }

    // Product Block Box
    doc.setFillColor(245, 240, 230); // Warm Cream
    doc.roundedRect(margin, y, pageWidth - margin * 2, 36, 2, 2, 'F');

    // Gold Accent Bar on left
    doc.setFillColor(197, 160, 89);
    doc.rect(margin, y, 3, 36, 'F');

    // Product Name & Code
    doc.setTextColor(90, 24, 39);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${prod.name}`, margin + 8, y + 8);

    doc.setFillColor(90, 24, 39);
    doc.setTextColor(253, 251, 247);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(` CODE: ${prod.product_code} `, pageWidth - margin - 35, y + 8);

    // Details Text
    doc.setTextColor(50, 45, 45);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text(`Category: ${prod.category_name || 'Showroom Spec'}  |  Material: ${prod.material}`, margin + 8, y + 16);
    doc.text(`Construction: ${prod.construction}  |  Style: ${prod.style}`, margin + 8, y + 22);

    // Description snippet
    doc.setTextColor(90, 90, 90);
    doc.setFontSize(8.5);
    const desc = prod.description.length > 90 ? prod.description.substring(0, 90) + '...' : prod.description;
    doc.text(`Description: ${desc}`, margin + 8, y + 29);

    y += 42;
  });

  // Footer on bottom of document
  const footerY = pageHeight - 12;
  doc.setDrawColor(197, 160, 89);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setFontSize(8);
  doc.setTextColor(120, 110, 100);
  doc.setFont('helvetica', 'normal');
  doc.text(`Address: ${settings.address}`, margin, footerY);
  doc.text('For Wholesale, Retail & International Orders: www.tajmahalcarpet.com', pageWidth - margin - 85, footerY);

  // Save the PDF
  doc.save(`Taj_Mahal_Carpet_Catalogue_${new Date().toISOString().slice(0, 10)}.pdf`);
}
