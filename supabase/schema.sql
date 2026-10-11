-- =========================================================================
-- MY PERSONAL EBOOK STORE - SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- Target: Supabase / PostgreSQL 15+
-- Author: Tuhin Sadhukhan
-- =========================================================================

-- Enable pgcrypto for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES TABLE (Stores admin and customer identities)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  whatsapp_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. PRODUCTS TABLE (eBooks catalog)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT NOT NULL UNIQUE,
  author TEXT NOT NULL DEFAULT 'Tuhin Sadhukhan',
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  sale_price NUMERIC(10, 2) CHECK (sale_price >= 0),
  cover_image TEXT,
  cover_accent_color TEXT DEFAULT '#1E293B',
  file_url TEXT, -- Path in private Supabase storage bucket 'ebook-files'
  file_name TEXT,
  file_size TEXT,
  page_count INT,
  format TEXT DEFAULT 'PDF + ePub',
  category TEXT NOT NULL DEFAULT 'Business',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  chapters JSONB DEFAULT '[]'::JSONB,
  preview_snippet TEXT,
  read_time_hours INT DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. ORDERS TABLE (Customer purchases with manual UPI verification)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE, -- e.g. ORD-2026-8921
  book_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  book_title TEXT NOT NULL,
  book_price NUMERIC(10, 2) NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING_VERIFICATION' CHECK (status IN ('PENDING_VERIFICATION', 'CONFIRMED', 'REJECTED', 'REFUNDED')),
  utr_number TEXT NOT NULL,
  screenshot_url TEXT,
  rejection_reason TEXT,
  access_token TEXT NOT NULL UNIQUE, -- Secure random secret for order page authorization
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. ORDER ITEMS (Extensible order item breakdown)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. PAYMENT SUBMISSIONS (Audit of manual UPI proofs)
CREATE TABLE IF NOT EXISTS public.payment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  utr_number TEXT NOT NULL,
  screenshot_url TEXT,
  customer_name TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. ADMIN AUDIT LOGS (Immutable log of all payment verifications and changes)
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  order_number TEXT,
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. STORE SETTINGS (Single-record configuration for store info and UPI ID)
CREATE TABLE IF NOT EXISTS public.store_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  store_name TEXT NOT NULL DEFAULT 'Tuhin''s Digital Book Vault',
  store_tagline TEXT NOT NULL DEFAULT 'Practical guides for Indian creators, developers and entrepreneurs',
  owner_name TEXT NOT NULL DEFAULT 'Tuhin Sadhukhan',
  upi_id TEXT NOT NULL DEFAULT 'sadhukhantuhin12@okaxis',
  upi_qr_image TEXT,
  whatsapp_number TEXT NOT NULL DEFAULT '919876543210',
  support_email TEXT NOT NULL DEFAULT 'sadhukhantuhin12@gmail.com',
  currency TEXT NOT NULL DEFAULT 'INR',
  announcement TEXT DEFAULT 'Instant delivery after quick UPI verification!',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_products_published ON public.products(published);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_access_token ON public.orders(access_token);
CREATE INDEX IF NOT EXISTS idx_orders_utr_number ON public.orders(utr_number);
CREATE INDEX IF NOT EXISTS idx_payment_submissions_order_id ON public.payment_submissions(order_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_order_id ON public.admin_audit_logs(order_id);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PRODUCTS: Anyone can read published products. Only admins can insert/update/delete.
CREATE POLICY "Public read published products" ON public.products
  FOR SELECT USING (published = true OR public.is_admin());

CREATE POLICY "Admin full manage products" ON public.products
  FOR ALL USING (public.is_admin());

-- ORDERS: Anyone can insert an order (checkout). Customer can select their order with access_token. Admin has full access.
CREATE POLICY "Customers can create orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Customers can view own order via access token" ON public.orders
  FOR SELECT USING (
    (current_setting('request.jwt.claim.sub', true) IS NOT NULL AND auth.uid() IN (SELECT id FROM public.profiles WHERE email = customer_email))
    OR public.is_admin()
  );

CREATE POLICY "Admin manage all orders" ON public.orders
  FOR ALL USING (public.is_admin());

-- PAYMENT SUBMISSIONS: Anyone can submit UPI proof during checkout. Admin can read/manage all.
CREATE POLICY "Insert payment submission" ON public.payment_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin view payment submissions" ON public.payment_submissions
  FOR ALL USING (public.is_admin());

-- ADMIN AUDIT LOGS: Only admin can view or append logs
CREATE POLICY "Admin audit logs view" ON public.admin_audit_logs
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admin audit logs insert" ON public.admin_audit_logs
  FOR INSERT WITH CHECK (public.is_admin());

-- STORE SETTINGS: Public read, admin update
CREATE POLICY "Public read store settings" ON public.store_settings
  FOR SELECT USING (true);

CREATE POLICY "Admin update store settings" ON public.store_settings
  FOR UPDATE USING (public.is_admin());

-- =========================================================================
-- SUPABASE STORAGE BUCKETS SETUP
-- =========================================================================
-- Run in Supabase SQL Editor:
-- 1. Create a private bucket for eBooks:
INSERT INTO storage.buckets (id, name, public)
VALUES ('ebook-files', 'ebook-files', false)
ON CONFLICT (id) DO NOTHING;

-- 2. Create a public bucket for covers & payment screenshots:
INSERT INTO storage.buckets (id, name, public)
VALUES ('ebook-covers', 'ebook-covers', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Admin can upload/read all eBook files
CREATE POLICY "Admin manage ebook files" ON storage.objects
  FOR ALL USING (bucket_id = 'ebook-files' AND public.is_admin());

-- Storage Policy: Public can view covers
CREATE POLICY "Public view covers" ON storage.objects
  FOR SELECT USING (bucket_id = 'ebook-covers');

-- Storage Policy: Anyone can upload payment screenshots
CREATE POLICY "Public upload payment proof" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'payment-proofs');

-- Storage Policy: Admin can view payment screenshots
CREATE POLICY "Admin view payment proof" ON storage.objects
  FOR SELECT USING (bucket_id = 'payment-proofs' AND public.is_admin());
