# Taj Mahal Carpet — Digital Showroom & Business Platform

> **Location:** Bhadohi, Uttar Pradesh, India  
> **Target Audience:** Indian Retail Connoisseurs, B2B Wholesale Distributors, International Importers & Architects.  
> **Brand Vision:** *"Traditional craftsmanship presented through a modern digital showroom."*

---

## 🌟 Key Features

1. **Cinematic Hero & Editorial Showcase:** Luxury carpet photography, Cormorant Garamond typography, and custom carpet color tokens (`Deep Burgundy`, `Warm Ivory`, `Muted Gold`, `Highland Sand`, `Charcoal`).
2. **Dynamic Digital Catalogue:** Multi-parameter filtering by Search, Category, Material (wool/silk/bamboo), Style (traditional/modern/persian), and Construction (hand-knotted/tufted/flatweave).
3. **Product Detail Experience:** High-resolution zoom gallery, technical specifications, custom size notices, price-on-enquiry toggle, and related carpet recommendations.
4. **Downloadable PDF Catalogue:** One-click dynamic PDF export using `jsPDF` for trade clients and wholesale buyers.
5. **Multi-Channel Enquiry System:**
   - **Retail Enquiry:** Homeowner inquiries with size & room specs.
   - **Wholesale / Bulk Quote Request:** Business type, MOQ, shipping destination, budget range.
   - **International Export Enquiry:** Global trade logistics (CIF/FOB), port destination, swatch requests.
6. **WhatsApp Instant Integration:** Pre-filled product-specific and trade inquiry links (`wa.me`) via site settings.
7. **Secure Admin Dashboard (`/admin`):**
   - Authentication via **Supabase Auth**.
   - Products CRUD with featured tag, price visibility, and image management.
   - Category management with order sorting.
   - Lead & Enquiry tracker with status workflow (`new` → `contacted` → `quoted` → `converted`), priority flags, internal notes, and direct contact buttons.
   - Testimonial management & global site settings control.
8. **Supabase PostgreSQL & Storage Ready:** RLS security policies, migration SQL scripts (`supabase/migrations/`), and seamless offline demo fallback mode.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), Framer Motion
- **Icons & Polish:** Lucide React, Canvas Confetti
- **Backend & Database:** Supabase PostgreSQL, Supabase Auth, Supabase Storage, Supabase RLS
- **PDF Generation:** jsPDF

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
*(Note: If environment variables are omitted, the application runs smoothly in Local Showroom Demo Mode with persistent local storage).*

### 3. Run Development Server
```bash
npm run dev
```

---

## 🗄️ Supabase Setup & Migrations

1. Go to your Supabase SQL Editor.
2. Run the migration script located at `supabase/migrations/20260926000000_initial_schema.sql`.
3. Create the following public storage buckets in Supabase Storage:
   - `product-images` (Public Read)
   - `category-images` (Public Read)
   - `site-assets` (Public Read)
   - `enquiry-attachments` (Admin Only)

---

## 🔑 Admin Portal Access

- **Route:** `/admin/login` or click **Admin Login** in the footer.
- **Default Demo Credentials:**
  - **Email:** `admin@tajmahalcarpet.com`
  - **Password:** `tajmahal123`

---

## 📄 Production Build & Verification

```bash
npm run build
```
The output will be placed in `dist/`.
