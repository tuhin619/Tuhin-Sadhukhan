# My Personal eBook Store

A complete, production-ready personal eBook selling platform created for **Tuhin Sadhukhan** to sell digital books and guides with direct manual UPI payments, zero middleman fees, automatic order tracking, and secure digital delivery.

Promoted seamlessly through **Facebook, Instagram, and WhatsApp**.

---

## 🚀 Key Features

1. **Customer Storefront**
   - Clean, trustworthy bookstore layout with high-resolution digital book covers.
   - Prices in Indian Rupees (₹) with discount calculation.
   - In-browser reading sample excerpts (Table of Contents & Chapter 1 preview).
   - Social sharing bar with 1-click WhatsApp, Facebook, and Twitter sharing.
   - Transparent policies: Privacy Policy, Terms of Service, and Refund Policy.
   - Floating WhatsApp author contact button.

2. **Checkout & Manual UPI Verification**
   - Frictionless checkout: Customer Name, Email, WhatsApp number.
   - Unique Order ID generation (e.g. `ORD-2026-8921`).
   - Direct UPI payment via official UPI ID (`sadhukhantuhin12@okaxis`).
   - High-fidelity UPI QR Code compatible with Google Pay, PhonePe, Paytm, BHIM, and CRED.
   - One-tap "Pay Using UPI App" button on mobile.
   - 12-digit UTR reference input with validation.
   - Optional payment screenshot upload with file size and type validation.
   - **Manual Verification Protocol**: Every new order is registered as `PENDING_VERIFICATION` until manually approved by the admin.

3. **Order Status & Digital Delivery**
   - 4-Tier Order Lifecycle: `PENDING_VERIFICATION` → `CONFIRMED` / `REJECTED` / `REFUNDED`.
   - Dedicated customer confirmation page with live status refresh.
   - Self-service Order Lookup tool (`/order-lookup`) by Order ID or email.
   - Immediate celebratory confetti and download unlock when marked `CONFIRMED`.
   - Tokenized, secure download links that prevent unauthorized access.

4. **Secure Admin Dashboard (`/admin`)**
   - KPI Analytics: Total Orders, Pending Verifications, Confirmed Orders, and Total INR Revenue.
   - Order management with customer contact details, submitted UTRs, and screenshot preview zoom.
   - 1-Click "Confirm Payment" or "Reject Payment" (with custom reason).
   - eBook Catalog Management: Add, edit, delete, publish/unpublish, and set sale prices.
   - Store settings: change UPI ID, owner name, WhatsApp number, or banner text.
   - Immutable audit logs (`admin_audit_logs`) of every status change.
   - Supabase & Vercel deployment checklist and 1-click SQL schema copy.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15+ (App Router, Server & Client Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL with Row Level Security)
- **Deployment**: Vercel Free-Tier compatible
- **Icons**: Lucide React
- **Animations**: Motion

---

## 📂 Project Architecture

```
├── app/
│   ├── layout.tsx              # Root HTML & SEO OpenGraph metadata
│   ├── page.tsx                # Customer Storefront (Hero, Catalog, FAQ, Bio)
│   ├── book/[id]/page.tsx      # Individual eBook Detail Page
│   ├── checkout/page.tsx       # Checkout & UPI payment screen
│   ├── order/[id]/page.tsx      # Order confirmation & live status tracking
│   ├── order-lookup/page.tsx   # Self-service order lookup portal
│   ├── admin/page.tsx          # Protected admin panel
│   ├── privacy/page.tsx        # Privacy policy
│   ├── terms/page.tsx          # Terms of service
│   ├── refund/page.tsx         # Refund policy
│   └── api/
│       ├── orders/route.ts     # Order submission endpoint
│       ├── orders/[id]/route.ts# Order inspection & status patch
│       └── download/[id]/route.ts # Secure file delivery verification
├── components/
│   ├── Navbar.tsx              # 3-Zone top bar
│   ├── Footer.tsx              # Trustworthy footer with UPI note & links
│   ├── BookCard.tsx            # Digital book presentation card
│   ├── BookCoverArt.tsx        # Resilient SVG & CSS book cover renderer
│   ├── BookReaderModal.tsx     # In-browser chapter sample preview
│   ├── UpiQrDisplay.tsx        # UPI QR & deep link generator
│   ├── WhatsAppButton.tsx      # Floating WhatsApp chat button
│   └── SocialShareBar.tsx      # Multi-platform sharing buttons
├── lib/
│   ├── store.ts                # Isomorphic data store & initial books
│   └── supabase.ts             # Supabase client & connection validator
├── supabase/
│   └── schema.sql              # Full PostgreSQL database schema & RLS policies
└── types/
    └── index.ts                # TypeScript interfaces
```

---

## 📖 Step-by-Step Deployment Guide (For Small Business Owners)

### Step 1: Set Up Your Free Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in (free tier covers 500MB database, 1GB storage, and 50,000 monthly active users).
2. Click **New Project**, choose an organization, give it a name (e.g. `tuhin-ebook-store`), set a strong database password, and pick a region near India (e.g. `Singapore` or `Mumbai`).
3. Click **SQL Editor** on the left menu, click **New query**, paste the entire contents of `supabase/schema.sql`, and click **Run**.
   - This creates all tables: `profiles`, `products`, `orders`, `order_items`, `payment_submissions`, `admin_audit_logs`, and `store_settings`.
   - It also configures Row Level Security (RLS) policies.
4. Click **Storage** on the left menu:
   - Create a **Private** bucket named `ebook-files`.
   - Create a **Public** bucket named `ebook-covers`.
5. Under **Project Settings -> API**, copy:
   - **Project URL**
   - **Project API Anon Key**
   - **service_role secret key**

### Step 2: Push Code to GitHub

1. Push this project to your private or public GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of My Personal eBook Store"
   git remote add origin https://github.com/your-username/my-ebook-store.git
   git push -u origin main
   ```
*(Do NOT commit `.env.local` or secrets to GitHub).*

### Step 3: Deploy to Vercel (100% Free Tier)

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New... -> Project** and select your `my-ebook-store` repository.
3. In the **Environment Variables** section, add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL (`https://your-project.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `NEXT_PUBLIC_STORE_UPI_ID`: `sadhukhantuhin12@okaxis`
   - `NEXT_PUBLIC_OWNER_NAME`: `Tuhin Sadhukhan`
   - `NEXT_PUBLIC_STORE_NAME`: `Tuhin's Digital Book Vault`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `919876543210`
   - `ADMIN_SECRET_KEY`: A secure password for your admin dashboard
4. Click **Deploy**. Vercel will build and publish your website in under 2 minutes!

---

## 🔑 Admin Dashboard Access

- Navigate to `/admin` on your live website.
- Enter your admin email (`sadhukhantuhin12@gmail.com`) and password (default passkey: `admin123` or your configured `ADMIN_SECRET_KEY`).
- You can immediately verify pending customer UTRs, add new eBooks, and update your UPI ID anytime!
