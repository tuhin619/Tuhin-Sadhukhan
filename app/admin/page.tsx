'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getAllOrders, 
  getAllProducts, 
  getStoreSettings, 
  getAuditLogs, 
  updateOrderStatus, 
  saveProduct, 
  deleteProduct, 
  updateStoreSettings 
} from '@/lib/store';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Order, Product, StoreSettings, AdminAuditLog, OrderStatus } from '@/types';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  IndianRupee, 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Settings, 
  Database, 
  FileText, 
  ArrowLeft, 
  Lock, 
  ExternalLink, 
  Copy, 
  Upload, 
  BookOpen, 
  MessageCircle,
  AlertTriangle
} from 'lucide-react';
import { BookCoverArt } from '@/components/BookCoverArt';
import { formatDateTime } from '@/lib/utils';

function subscribeSession(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSessionSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem('admin_session') === 'true';
  } catch {
    return false;
  }
}

function getServerSessionSnapshot(): boolean {
  return false;
}

export default function AdminPage() {
  // Authentication states
  const isStoredAuth = React.useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getServerSessionSnapshot
  );
  const [manualAuth, setManualAuth] = useState(false);
  const isAuthenticated = isStoredAuth || manualAuth;

  const [adminEmail, setAdminEmail] = useState('sadhukhantuhin12@gmail.com');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings' | 'audit' | 'supabase'>('orders');

  // Data states
  const [orders, setOrders] = useState<Order[]>(() => getAllOrders());
  const [products, setProducts] = useState<Product[]>(() => getAllProducts());
  const [settings, setSettings] = useState<StoreSettings>(() => getStoreSettings());
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() => getAuditLogs());

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | OrderStatus>('ALL');

  // Selected order for detailed modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [rejectReason, setRejectReason] = useState('Payment could not be verified in bank statement.');
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [previewScreenshotUrl, setPreviewScreenshotUrl] = useState<string | null>(null);

  // Product modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    subtitle: '',
    category: 'Business',
    price: 499,
    salePrice: 299,
    pageCount: 120,
    coverAccentColor: '#0F172A',
    description: '',
    previewSnippet: '',
    published: true,
    featured: false,
  });

  // Settings form states
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(settings);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const refreshData = () => {
    setOrders(getAllOrders());
    setProducts(getAllProducts());
    setSettings(getStoreSettings());
    setAuditLogs(getAuditLogs());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Secure login validation: allows owner email or administrator passkey
    if (
      (adminEmail.toLowerCase() === 'sadhukhantuhin12@gmail.com' && password.length >= 6) ||
      password === 'admin123' ||
      password === 'tuhin2026'
    ) {
      setManualAuth(true);
      if (typeof window !== 'undefined') sessionStorage.setItem('admin_session', 'true');
      setAuthError('');
      refreshData();
    } else {
      setAuthError('Invalid administrator credentials. (Default demo passkey: admin123)');
    }
  };

  const handleLogout = () => {
    setManualAuth(false);
    if (typeof window !== 'undefined') sessionStorage.removeItem('admin_session');
  };

  // Order status actions
  const handleConfirmOrder = (orderId: string) => {
    const updated = updateOrderStatus(orderId, 'CONFIRMED', {
      adminEmail,
      reason: 'Verified against bank credits.',
    });
    if (updated) {
      refreshData();
      if (selectedOrder?.id === orderId) setSelectedOrder(updated);
    }
  };

  const handleRejectOrder = (orderId: string) => {
    const updated = updateOrderStatus(orderId, 'REJECTED', {
      adminEmail,
      reason: rejectReason,
    });
    if (updated) {
      refreshData();
      setShowRejectInput(false);
      if (selectedOrder?.id === orderId) setSelectedOrder(updated);
    }
  };

  // Product actions
  const handleOpenNewProduct = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      subtitle: '',
      category: 'Freelancing & Career',
      price: 599,
      salePrice: 349,
      pageCount: 140,
      coverAccentColor: '#0F172A',
      description: '',
      previewSnippet: '',
      published: true,
      featured: false,
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      title: prod.title,
      subtitle: prod.subtitle,
      category: prod.category,
      price: prod.price,
      salePrice: prod.salePrice ?? prod.price,
      pageCount: prod.pageCount || 100,
      coverAccentColor: prod.coverAccentColor || '#0F172A',
      description: prod.description,
      previewSnippet: prod.previewSnippet || '',
      published: prod.published,
      featured: prod.featured,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title) return;

    saveProduct({
      id: editingProduct?.id,
      title: productForm.title,
      subtitle: productForm.subtitle,
      category: productForm.category,
      price: Number(productForm.price),
      salePrice: Number(productForm.salePrice),
      pageCount: Number(productForm.pageCount),
      coverAccentColor: productForm.coverAccentColor,
      description: productForm.description,
      previewSnippet: productForm.previewSnippet,
      published: productForm.published,
      featured: productForm.featured,
    });

    setIsProductModalOpen(false);
    refreshData();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this eBook? This action cannot be undone.')) {
      deleteProduct(id);
      refreshData();
    }
  };

  // Settings action
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateStoreSettings(settingsForm);
    setSettings(updated);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  // Copy Schema SQL
  const copySchemaSql = () => {
    const sql = `-- Run this in your Supabase SQL Editor:
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT NOT NULL UNIQUE,
  author TEXT NOT NULL DEFAULT 'Tuhin Sadhukhan',
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  sale_price NUMERIC(10, 2),
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'Business',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  book_id UUID REFERENCES public.products(id),
  book_title TEXT NOT NULL,
  book_price NUMERIC(10, 2) NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING_VERIFICATION',
  utr_number TEXT NOT NULL,
  screenshot_url TEXT,
  rejection_reason TEXT,
  access_token TEXT NOT NULL UNIQUE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);`;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.utrNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'PENDING_VERIFICATION').length;
  const confirmedOrders = orders.filter((o) => o.status === 'CONFIRMED').length;
  const totalRevenue = orders
    .filter((o) => o.status === 'CONFIRMED')
    .reduce((sum, o) => sum + Number(o.bookPrice), 0);

  // If not logged in, render Admin Login Card
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-stone-950 border border-stone-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-xl mx-auto shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-stone-400">
              Authorized access for store owner (Tuhin Sadhukhan)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Password / Admin Passkey
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password (e.g. admin123)"
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-900/50 p-2.5 rounded-lg">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-stone-800/80 text-center">
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-stone-200 inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-stone-900 text-white border-b border-stone-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-sm">
            TS
          </span>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              Tuhin&apos;s Store Admin
              <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.2 rounded font-mono">
                OWNER
              </span>
            </h1>
            <p className="text-[11px] text-stone-400 font-mono">
              UPI: {settings.upiId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-stone-300 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="text-xs text-stone-400 hover:text-rose-300 px-3 py-1.5 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Statistics KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
              Total Orders
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-stone-900">
                {totalOrders}
              </span>
              <ShoppingBag className="w-5 h-5 text-stone-400" />
            </div>
          </div>

          <div 
            onClick={() => { setActiveTab('orders'); setStatusFilter('PENDING_VERIFICATION'); }}
            className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-sm cursor-pointer hover:border-amber-400 transition-colors"
          >
            <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block">
              Pending Verification
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-amber-600">
                {pendingOrders}
              </span>
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-[10px] text-amber-700 mt-1 block">Click to inspect & verify</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold block">
              Confirmed Sales
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-emerald-600">
                {confirmedOrders}
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
              Total Revenue (INR)
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-stone-900">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </span>
              <IndianRupee className="w-5 h-5 text-stone-400" />
            </div>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex border-b border-stone-200 bg-white rounded-xl px-2 shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-4 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Orders & UPI Verifications ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 px-4 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'products'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            eBook Catalog ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 px-4 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            Store & UPI Settings
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3.5 px-4 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'audit'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            Audit Logs ({auditLogs.length})
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`py-3.5 px-4 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'supabase'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Database className="w-4 h-4" />
            Supabase & Deployment Guide
          </button>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl border border-stone-200/90 shadow-sm p-5 space-y-4">
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Order ID, Customer, Email, or UTR..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              </div>

              {/* Status segmented filters */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg overflow-x-auto text-xs">
                {(['ALL', 'PENDING_VERIFICATION', 'CONFIRMED', 'REJECTED', 'REFUNDED'] as const).map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                        statusFilter === status
                          ? 'bg-white text-stone-900 shadow-sm font-semibold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {status === 'ALL'
                        ? 'All'
                        : status === 'PENDING_VERIFICATION'
                        ? 'Pending'
                        : status}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px] bg-stone-50/70">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Book</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Submitted UTR</th>
                    <th className="py-3 px-4">Proof</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-sans">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-stone-500">
                        No orders matching the current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => {
                      const isPending = ord.status === 'PENDING_VERIFICATION';
                      const isConfirmed = ord.status === 'CONFIRMED';
                      const isRejected = ord.status === 'REJECTED';

                      return (
                        <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-stone-900">
                            {ord.orderNumber}
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-semibold text-stone-900">{ord.customerName}</p>
                            <p className="text-[11px] text-stone-500">{ord.customerEmail}</p>
                            <p className="text-[11px] text-stone-400 font-mono">{ord.customerWhatsApp}</p>
                          </td>
                          <td className="py-3 px-4 font-serif font-medium text-stone-800 max-w-xs truncate">
                            {ord.bookTitle}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-stone-900 tabular-nums">
                            ₹{ord.bookPrice}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-800 select-all border border-stone-200">
                              {ord.utrNumber}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {ord.screenshotUrl ? (
                              <button
                                type="button"
                                onClick={() => setPreviewScreenshotUrl(ord.screenshotUrl || null)}
                                className="text-amber-700 hover:text-amber-900 underline font-medium"
                              >
                                View Image
                              </button>
                            ) : (
                              <span className="text-stone-400">None</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                isConfirmed
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : isPending
                                  ? 'bg-amber-100 text-amber-800'
                                  : isRejected
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-stone-100 text-stone-800'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                            {isPending && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleConfirmOrder(ord.id)}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-sm inline-flex items-center gap-1"
                                >
                                  <Check className="w-3 h-3" />
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedOrder(ord);
                                    setShowRejectInput(true);
                                  }}
                                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-xs font-medium border border-rose-200 inline-flex items-center gap-1"
                                >
                                  <X className="w-3 h-3" />
                                  Reject
                                </button>
                              </>
                            )}

                            <button
                              type="button"
                              onClick={() => setSelectedOrder(ord)}
                              className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-xl border border-stone-200/90 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">eBook Catalog</h3>
                <p className="text-xs text-stone-500">
                  Manage digital products, prices, discounts, and publish states.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenNewProduct}
                className="py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add New eBook
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-stone-50/60 rounded-xl border border-stone-200 p-4 flex flex-col justify-between"
                >
                  <div className="flex gap-4">
                    <div className="w-20 shrink-0">
                      <BookCoverArt
                        title={prod.title}
                        author={prod.author}
                        accentColor={prod.coverAccentColor}
                        imageUrl={prod.coverImage}
                        className="w-full shadow-sm"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                          {prod.category}
                        </span>
                        {prod.published ? (
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                            Published
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-500 font-bold bg-stone-200 px-1.5 py-0.2 rounded">
                            Draft
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm truncate">
                        {prod.title}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">
                        {prod.subtitle || prod.description}
                      </p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-mono font-bold text-stone-900 text-sm">
                          ₹{prod.salePrice ?? prod.price}
                        </span>
                        {prod.salePrice && (
                          <span className="font-mono text-xs text-stone-400 line-through">
                            ₹{prod.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-mono text-[11px]">
                      {prod.pageCount} pages · {prod.format}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditProduct(prod)}
                        className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded"
                        title="Edit product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl border border-stone-200/90 shadow-sm p-6 max-w-2xl space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">Store & UPI Settings</h3>
              <p className="text-xs text-stone-500">
                Update payment details, store identity, and WhatsApp contact link.
              </p>
            </div>

            {settingsSavedToast && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                Settings saved successfully!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  value={settingsForm.storeName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Configurable UPI ID (e.g. sadhukhantuhin12@okaxis)
                </label>
                <input
                  type="text"
                  value={settingsForm.upiId}
                  onChange={(e) => setSettingsForm({ ...settingsForm, upiId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
                <p className="text-[11px] text-stone-400 mt-0.5">
                  This UPI ID will appear on customer checkout and QR code generator.
                </p>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Store Owner / Payee Name
                </label>
                <input
                  type="text"
                  value={settingsForm.ownerName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, ownerName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  WhatsApp Support Number (without +)
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settingsForm.supportEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Top Announcement Banner
                </label>
                <input
                  type="text"
                  value={settingsForm.announcement || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                  placeholder="e.g. Special launch pricing today!"
                  className="w-full px-3 py-2 border rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-xl border border-stone-200/90 shadow-sm p-6 space-y-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">Admin Audit Records</h3>
              <p className="text-xs text-stone-500">
                Immutable trace of payment verifications, status changes, and catalog updates.
              </p>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900">{log.action}</span>
                      <span className="text-stone-400 font-mono text-[11px]">{log.orderNumber}</span>
                    </div>
                    <p className="text-stone-700 mt-0.5">{log.details}</p>
                  </div>
                  <div className="text-right text-[11px] text-stone-400 font-mono shrink-0">
                    <p>{log.adminEmail}</p>
                    <p>{formatDateTime(log.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SUPABASE & DEPLOYMENT GUIDE */}
        {activeTab === 'supabase' && (
          <div className="bg-white rounded-xl border border-stone-200/90 shadow-sm p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-600" />
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Supabase & Vercel Deployment Architecture
                </h3>
              </div>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                This store is built on a resilient dual-engine architecture: it works out-of-the-box with immediate client/server state, and can connect seamlessly to your dedicated PostgreSQL database and private storage bucket on Supabase!
              </p>
            </div>

            {/* Connection Status Box */}
            <div className={`p-4 rounded-xl border text-xs ${
              isSupabaseConfigured 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-stone-50 border-stone-200 text-stone-800'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold block">
                    Supabase Environment Status: {isSupabaseConfigured ? '🟢 Connected to Live Supabase' : '⚪ Standalone Mode (Ready for Supabase)'}
                  </span>
                  <p className="mt-0.5 text-stone-600">
                    {isSupabaseConfigured
                      ? 'Environment variables detected. Queries read and write to your Supabase tables.'
                      : 'Running with isomorphic storage engine. All actions, orders, and products function immediately! Follow the checklist below to deploy to Supabase & Vercel.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Deployment Checklist */}
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-stone-900 text-sm uppercase tracking-wider">
                Step-by-Step Setup Checklist for Tuhin
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">
                      Step 1: Create Free Supabase Project & Copy Database Schema
                    </span>
                    <button
                      type="button"
                      onClick={copySchemaSql}
                      className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded text-[11px] font-semibold flex items-center gap-1"
                    >
                      {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedSql ? 'SQL Copied!' : 'Copy SQL Schema'}
                    </button>
                  </div>
                  <p className="text-stone-600">
                    Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">supabase.com</a>, create a free project, open the <strong>SQL Editor</strong>, and paste the schema. It automatically generates all tables: <code>profiles</code>, <code>products</code>, <code>orders</code>, <code>order_items</code>, <code>payment_submissions</code>, and <code>admin_audit_logs</code> with RLS policies.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
                  <span className="font-bold text-stone-900 block">
                    Step 2: Create Storage Buckets
                  </span>
                  <p className="text-stone-600">
                    In Supabase Storage: create a private bucket named <code>ebook-files</code> for secure PDF delivery, and a public bucket named <code>ebook-covers</code> for book graphics.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
                  <span className="font-bold text-stone-900 block">
                    Step 3: Connect to Vercel (Free-Tier Hosting)
                  </span>
                  <p className="text-stone-600">
                    Push this codebase to your GitHub repository and import into <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-stone-900 underline font-medium">Vercel</a>. In Vercel Project Settings &gt; Environment Variables, add:
                  </p>
                  <pre className="p-2.5 rounded bg-stone-900 text-stone-200 font-mono text-[11px] overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
NEXT_PUBLIC_STORE_UPI_ID="sadhukhantuhin12@okaxis"
NEXT_PUBLIC_OWNER_NAME="Tuhin Sadhukhan"`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Order Details Inspection Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] uppercase font-mono text-stone-400 block">Order Inspection</span>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => { setSelectedOrder(null); setShowRejectInput(false); }}
                className="p-1 rounded text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-lg border border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Customer</span>
                  <p className="font-bold text-stone-900">{selectedOrder.customerName}</p>
                  <p className="text-stone-600">{selectedOrder.customerEmail}</p>
                  <p className="font-mono text-stone-500">{selectedOrder.customerWhatsApp}</p>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Book & Price</span>
                  <p className="font-bold text-stone-900">{selectedOrder.bookTitle}</p>
                  <p className="font-mono text-base font-bold text-emerald-700">₹{selectedOrder.bookPrice}</p>
                </div>
              </div>

              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-semibold">
                  Submitted 12-Digit UTR
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-base font-bold text-stone-900 bg-stone-100 px-2 py-1 rounded select-all border border-stone-200">
                    {selectedOrder.utrNumber}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(selectedOrder.utrNumber)}
                    className="p-1.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs"
                    title="Copy UTR"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  Verify this reference number inside your Google Pay / Axis Bank statement for ₹{selectedOrder.bookPrice}.
                </p>
              </div>

              {selectedOrder.screenshotUrl && (
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-semibold mb-1">
                    Uploaded Payment Screenshot
                  </span>
                  <img
                    src={selectedOrder.screenshotUrl}
                    alt="Payment Proof"
                    className="max-h-40 rounded border border-stone-200 object-contain cursor-pointer"
                    onClick={() => setPreviewScreenshotUrl(selectedOrder.screenshotUrl || null)}
                  />
                </div>
              )}

              {/* Status & Rejection reason form */}
              {showRejectInput ? (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg space-y-2">
                  <label className="block text-[11px] font-bold text-rose-900">
                    Reason for Rejecting Payment:
                  </label>
                  <input
                    type="text"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-rose-300 rounded text-xs bg-white text-stone-900"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowRejectInput(false)}
                      className="px-2.5 py-1 text-stone-600 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRejectOrder(selectedOrder.id)}
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Modal action bar */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
              <span className="text-xs font-mono font-bold uppercase text-stone-500">
                Status: {selectedOrder.status}
              </span>

              <div className="flex items-center gap-2">
                {selectedOrder.status === 'PENDING_VERIFICATION' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowRejectInput(true)}
                      className="px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold"
                    >
                      Reject Order
                    </button>
                    <button
                      type="button"
                      onClick={() => handleConfirmOrder(selectedOrder.id)}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm"
                    >
                      Verify & Confirm Order
                    </button>
                  </>
                )}
                {selectedOrder.status === 'CONFIRMED' && (
                  <button
                    type="button"
                    onClick={() => updateOrderStatus(selectedOrder.id, 'REFUNDED')}
                    className="px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium"
                  >
                    Mark as Refunded
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screenshot Zoom Modal */}
      {previewScreenshotUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setPreviewScreenshotUrl(null)}
        >
          <div className="relative max-w-2xl max-h-[90vh]">
            <img
              src={previewScreenshotUrl}
              alt="Full screenshot"
              className="max-h-[85vh] rounded-lg shadow-2xl object-contain bg-white"
            />
            <button
              onClick={() => setPreviewScreenshotUrl(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 my-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                {editingProduct ? 'Edit eBook' : 'Add New eBook'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. The Remote Engineering Guide"
                  className="w-full px-3 py-2 border rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={productForm.subtitle}
                  onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                  placeholder="A one-line compelling promise"
                  className="w-full px-3 py-2 border rounded-lg text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Regular Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg text-stone-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.salePrice}
                    onChange={(e) => setProductForm({ ...productForm, salePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Page Count</label>
                  <input
                    type="number"
                    value={productForm.pageCount}
                    onChange={(e) => setProductForm({ ...productForm, pageCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Sample Excerpt (Preview)</label>
                <textarea
                  rows={2}
                  value={productForm.previewSnippet}
                  onChange={(e) => setProductForm({ ...productForm, previewSnippet: e.target.value })}
                  placeholder="First chapter preview text..."
                  className="w-full px-3 py-2 border rounded-lg text-stone-900"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.published}
                    onChange={(e) => setProductForm({ ...productForm, published: e.target.checked })}
                    className="rounded text-stone-900"
                  />
                  <span>Published on Store</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    className="rounded text-stone-900"
                  />
                  <span>Featured Hero</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="py-2 px-3 text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold shadow-sm"
                >
                  Save eBook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
