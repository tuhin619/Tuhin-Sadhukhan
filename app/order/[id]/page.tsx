'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookCoverArt } from '@/components/BookCoverArt';
import { BookReaderModal } from '@/components/BookReaderModal';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { useStoreOrders, useStoreProducts, useStoreSettings } from '@/hooks/use-store';
import { formatDateTime } from '@/lib/utils';
import { Order, Product, StoreSettings } from '@/types';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  RotateCcw, 
  Download, 
  BookOpen, 
  Lock, 
  RefreshCw, 
  MessageCircle, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

function OrderDetailsContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = typeof params.id === 'string' ? params.id : '';
  const token = searchParams.get('token');

  const orders = useStoreOrders();
  const products = useStoreProducts();
  const settings = useStoreSettings();

  const order = orders.find(o => o.id === orderId || o.orderNumber === orderId) || null;
  const product = order ? products.find(p => p.id === order.bookId) || null : null;

  const [showReader, setShowReader] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadOrder = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  useEffect(() => {
    if (order?.status === 'CONFIRMED') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore
      }
    }
  }, [order?.status]);

  const copyOrderLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleDownload = () => {
    if (!order || order.status !== 'CONFIRMED') return;

    // Secure simulated digital delivery file download
    const filename = `${order.bookTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`;
    const dummyPdfContent = `%PDF-1.4\n% DIGITAL EBOOK: ${order.bookTitle}\n% AUTHOR: Tuhin Sadhukhan\n% LICENSED TO: ${order.customerName} (${order.customerEmail})\n% ORDER ID: ${order.orderNumber}\n% VERIFIED STATUS: CONFIRMED\n\nThank you for purchasing "${order.bookTitle}". Your full digital package has been verified.\nEnjoy your reading!`;
    const blob = new Blob([dummyPdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-24 px-4">
          <Clock className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">Order Not Found</h2>
          <p className="text-sm text-stone-600 mb-6">
            We couldn&apos;t find an order matching &quot;{orderId}&quot;. Please verify the order ID or lookup using your email.
          </p>
          <Link
            href="/order-lookup"
            className="py-2.5 px-5 bg-stone-900 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2"
          >
            Lookup Order
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isConfirmed = order.status === 'CONFIRMED';
  const isPending = order.status === 'PENDING_VERIFICATION';
  const isRejected = order.status === 'REJECTED';
  const isRefunded = order.status === 'REFUNDED';

  const whatsappMessage = `Hi Tuhin, regarding my eBook order ${order.orderNumber} (${order.bookTitle}), UTR: ${order.utrNumber}. Status is currently ${order.status}. Could you please check?`;
  const whatsappUrl = `https://wa.me/${settings?.whatsappNumber || '919876543210'}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar storeName={settings?.storeName} />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Top Status Notification Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                Order Tracking
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                Order {order.orderNumber}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadOrder}
                disabled={isRefreshing}
                className="py-2 px-3 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh Status
              </button>

              <button
                type="button"
                onClick={copyOrderLink}
                className="py-2 px-3 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Save Order Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dynamic Status Presentation Box */}
          <div className="rounded-2xl p-6 sm:p-8 border shadow-sm transition-all"
            style={{
              backgroundColor: isConfirmed ? '#F0FDF4' : isPending ? '#FFFBEB' : isRejected ? '#FEF2F2' : '#F8FAFC',
              borderColor: isConfirmed ? '#BBF7D0' : isPending ? '#FDE68A' : isRejected ? '#FECACA' : '#E2E8F0',
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {isConfirmed && (
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                )}
                {isPending && (
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                )}
                {isRejected && (
                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <XCircle className="w-6 h-6" />
                  </div>
                )}
                {isRefunded && (
                  <div className="w-12 h-12 rounded-full bg-slate-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <RotateCcw className="w-6 h-6" />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                      Current Verification Status:
                    </span>
                    <span className="font-mono font-bold text-xs uppercase px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: isConfirmed ? '#DCFCE7' : isPending ? '#FEF3C7' : '#FEE2E2',
                        color: isConfirmed ? '#166534' : isPending ? '#92400E' : '#991B1B',
                      }}
                    >
                      {order.status}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                    {isConfirmed && 'Payment Verified & Order Confirmed!'}
                    {isPending && 'Payment Verification in Progress'}
                    {isRejected && 'Payment Verification Declined'}
                    {isRefunded && 'Order Refunded'}
                  </h2>
                </div>
              </div>

              {/* Direct WhatsApp help button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                Message Tuhin on WhatsApp
              </a>
            </div>

            {/* Status Explanatory Text */}
            <div className="mt-4 pt-4 border-t border-black/5 text-xs sm:text-sm leading-relaxed text-stone-700 font-light">
              {isConfirmed && (
                <p>
                  Your payment has been manually confirmed by Tuhin Sadhukhan against his bank statement. 
                  Your eBook files are now permanently unlocked below. You can download the PDF and read it in our reader anytime.
                </p>
              )}

              {isPending && (
                <div className="space-y-2">
                  <p>
                    Thank you, <strong className="font-semibold text-stone-900">{order.customerName}</strong>! Your order has been registered with submitted UTR <code className="font-mono bg-white/80 px-1.5 py-0.5 rounded border border-amber-300 font-bold">{order.utrNumber}</code>.
                  </p>
                  <p className="text-stone-600">
                    As this is direct manual UPI verification with zero third-party processing markups, 
                    Tuhin personally checks bank credits to verify transactions before releasing digital files. 
                    Verification typically takes between <strong className="font-semibold text-stone-900">10 to 30 minutes</strong>.
                    Bookmark this link or click &quot;Refresh Status&quot; above to check.
                  </p>
                </div>
              )}

              {isRejected && (
                <div className="space-y-1">
                  <p className="text-rose-900 font-medium">
                    Reason provided: {order.rejectionReason || 'The submitted 12-digit UTR could not be matched with bank account credits.'}
                  </p>
                  <p className="text-stone-600">
                    If this was an error or you paid via a different UPI handle, please message Tuhin on WhatsApp directly with your bank transaction screenshot to resolve it.
                  </p>
                </div>
              )}
            </div>

            {/* Digital Delivery Section (Locked or Unlocked) */}
            <div className="mt-6 pt-6 border-t border-black/5">
              <h3 className="font-serif font-bold text-stone-900 text-sm uppercase tracking-wider mb-3">
                Digital eBook Files
              </h3>

              {isConfirmed ? (
                <div className="bg-white p-5 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 text-sm">{order.bookTitle}</h4>
                      <p className="text-xs text-stone-500">Universal PDF & ePub Edition · Lifetime Access</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {product && (
                      <button
                        type="button"
                        onClick={() => setShowReader(true)}
                        className="flex-1 sm:flex-initial py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="w-4 h-4" />
                        Read Online
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleDownload}
                      className="flex-1 sm:flex-initial py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      Download eBook PDF
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white/60 p-5 rounded-xl border border-stone-200/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-400 flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-700 text-sm">{order.bookTitle}</h4>
                      <p className="text-xs text-stone-500">Download link locked until manual payment confirmation</p>
                    </div>
                  </div>

                  <button
                    disabled
                    className="py-2.5 px-4 bg-stone-200 text-stone-400 text-xs font-semibold rounded-lg cursor-not-allowed flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Awaiting Verification
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-stone-900 text-base pb-3 border-b border-stone-100">
              Receipt & Customer Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <div>
                  <span className="text-stone-400 uppercase tracking-wider text-[10px] block">Customer Name</span>
                  <span className="font-medium text-stone-900">{order.customerName}</span>
                </div>

                <div>
                  <span className="text-stone-400 uppercase tracking-wider text-[10px] block">Email Address</span>
                  <span className="font-medium text-stone-900">{order.customerEmail}</span>
                </div>

                <div>
                  <span className="text-stone-400 uppercase tracking-wider text-[10px] block">WhatsApp Number</span>
                  <span className="font-medium text-stone-900">{order.customerWhatsApp}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-stone-400 uppercase tracking-wider text-[10px] block">Submitted UTR Reference</span>
                  <span className="font-mono font-medium text-stone-900">{order.utrNumber}</span>
                </div>

                <div>
                  <span className="text-stone-400 uppercase tracking-wider text-[10px] block">Amount Paid</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">₹{order.bookPrice}</span>
                </div>

                <div>
                  <span className="text-stone-400 uppercase tracking-wider text-[10px] block">Order Placed At</span>
                  <span className="text-stone-600 font-mono text-[11px]">
                    {formatDateTime(order.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Uploaded screenshot proof view if exists */}
            {order.screenshotUrl && (
              <div className="pt-4 border-t border-stone-100">
                <span className="text-stone-400 uppercase tracking-wider text-[10px] block mb-2">
                  Uploaded Payment Screenshot
                </span>
                <img
                  src={order.screenshotUrl}
                  alt="Customer payment proof"
                  className="max-h-48 rounded-lg border border-stone-200 object-contain bg-stone-50"
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer
        storeName={settings?.storeName}
        upiId={settings?.upiId}
        whatsappNumber={settings?.whatsappNumber}
      />

      <WhatsAppButton whatsappNumber={settings?.whatsappNumber} />

      {showReader && product && (
        <BookReaderModal
          product={product}
          onClose={() => setShowReader(false)}
        />
      )}
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-500 text-sm">Loading order details...</p>
      </div>
    }>
      <OrderDetailsContent />
    </Suspense>
  );
}
