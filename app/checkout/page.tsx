'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { UpiQrDisplay } from '@/components/UpiQrDisplay';
import { BookCoverArt } from '@/components/BookCoverArt';
import { createOrder } from '@/lib/store';
import { useStoreProducts, useStoreSettings } from '@/hooks/use-store';
import { Product, StoreSettings } from '@/types';
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle, 
  Upload, 
  Check, 
  HelpCircle, 
  Lock, 
  FileCheck,
  X
} from 'lucide-react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get('bookId') || '';

  const products = useStoreProducts();
  const settings = useStoreSettings();
  const [orderNumber] = useState<string>('ORD-2026-8492');
  
  const selectedProduct = 
    (bookId ? products.find(p => p.id === bookId || p.slug === bookId) : null) || 
    (products.length > 0 ? products[0] : null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState<string>('');
  
  // Validation and Submission states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, screenshot: 'Please upload a valid JPG, PNG, or WEBP image.' }));
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, screenshot: 'File size must be under 5 MB.' }));
      return;
    }

    setErrors(prev => {
      const copy = { ...prev };
      delete copy.screenshot;
      return copy;
    });

    setScreenshotName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeScreenshot = () => {
    setScreenshotPreview(null);
    setScreenshotName('');
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Full name is required.';
    
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required.';
    } else if (whatsapp.replace(/\D/g, '').length < 10) {
      newErrors.whatsapp = 'Please enter a valid 10-digit WhatsApp number.';
    }

    const cleanUtr = utrNumber.trim().replace(/\s+/g, '');
    if (!cleanUtr) {
      newErrors.utr = '12-digit UTR reference number is required.';
    } else if (cleanUtr.length < 8) {
      newErrors.utr = 'Please enter the complete UTR transaction number from your payment receipt.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !selectedProduct) return;

    setIsSubmitting(true);

    try {
      const finalPrice = selectedProduct.salePrice ?? selectedProduct.price;
      
      const newOrder = createOrder({
        bookId: selectedProduct.id,
        bookTitle: selectedProduct.title,
        bookPrice: finalPrice,
        customerName: name,
        customerEmail: email,
        customerWhatsApp: whatsapp,
        utrNumber: utrNumber.trim(),
        screenshotUrl: screenshotPreview || undefined,
      });

      // Redirect directly to the order confirmation page with secure access token
      router.push(`/order/${newOrder.id}?token=${newOrder.accessToken}`);
    } catch (err) {
      console.error('Order creation failed', err);
      setErrors({ form: 'An error occurred while saving your order. Please try again.' });
      setIsSubmitting(false);
    }
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-500">Loading checkout...</p>
      </div>
    );
  }

  const finalAmount = selectedProduct.salePrice ?? selectedProduct.price;
  const storeUpi = settings?.upiId || 'sadhukhantuhin12@okaxis';
  const ownerName = settings?.ownerName || 'Tuhin Sadhukhan';

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar storeName={settings?.storeName} />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header & Order Number */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <Link
                href={`/book/${selectedProduct.id}`}
                className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Change Selection
              </Link>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                Complete Your eBook Purchase
              </h1>
            </div>

            <div className="bg-stone-100 px-3.5 py-1.5 rounded-lg border border-stone-200/80 text-right sm:text-left">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                Assigned Order ID
              </span>
              <span className="text-sm font-bold font-mono text-stone-900">
                {orderNumber}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Customer Form & Verification Fields (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Customer Details */}
                <div className="bg-white rounded-xl border border-stone-200/90 p-5 sm:p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                      1
                    </span>
                    <h3 className="font-serif font-bold text-stone-900 text-base">
                      Your Delivery Details
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 ${
                          errors.name ? 'border-rose-400 ring-rose-200' : 'border-stone-200'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rahul@example.com (eBook download link sent here)"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 ${
                          errors.email ? 'border-rose-400 ring-rose-200' : 'border-stone-200'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
                      )}
                      <p className="mt-1 text-[11px] text-stone-500">
                        We send the permanent download URL & receipt to this email.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-stone-200 bg-stone-100 text-stone-500 text-xs font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="98765 43210"
                          className={`w-full px-3.5 py-2.5 rounded-r-lg border text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 ${
                            errors.whatsapp ? 'border-rose-400 ring-rose-200' : 'border-stone-200'
                          }`}
                        />
                      </div>
                      {errors.whatsapp && (
                        <p className="mt-1 text-xs text-rose-500">{errors.whatsapp}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Manual Verification UTR & Screenshot */}
                <div className="bg-white rounded-xl border border-stone-200/90 p-5 sm:p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                      2
                    </span>
                    <h3 className="font-serif font-bold text-stone-900 text-base">
                      Enter UPI Payment Proof
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        UPI Transaction ID / 12-Digit UTR <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="e.g. 610284918234 or UPI Ref No."
                        className={`w-full px-3.5 py-2.5 rounded-lg border font-mono text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 ${
                          errors.utr ? 'border-rose-400 ring-rose-200' : 'border-stone-200'
                        }`}
                      />
                      {errors.utr && (
                        <p className="mt-1 text-xs text-rose-500">{errors.utr}</p>
                      )}
                      <p className="mt-1.5 text-[11px] text-stone-500 flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        Found in your GPay / PhonePe / Paytm payment receipt under &quot;UTR&quot; or &quot;UPI Ref No.&quot;
                      </p>
                    </div>

                    {/* Payment Screenshot (Optional per prompt) */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Payment Screenshot <span className="text-stone-400 font-normal">(Optional, helps faster verification)</span>
                      </label>

                      {screenshotPreview ? (
                        <div className="relative rounded-lg border border-stone-200 p-2 bg-stone-50 flex items-center gap-3">
                          <img
                            src={screenshotPreview}
                            alt="Payment receipt preview"
                            className="w-16 h-16 object-cover rounded border border-stone-300"
                          />
                          <div className="flex-1 min-w-0 text-xs">
                            <p className="font-medium text-stone-800 truncate">{screenshotName}</p>
                            <span className="text-emerald-600 font-medium flex items-center gap-1">
                              <Check className="w-3 h-3" /> Screenshot attached
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={removeScreenshot}
                            className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                            aria-label="Remove screenshot"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="border-2 border-dashed border-stone-200 hover:border-stone-400 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-stone-50/30">
                          <Upload className="w-5 h-5 text-stone-400 mb-1" />
                          <span className="text-xs font-medium text-stone-700">
                            Click to upload payment screenshot
                          </span>
                          <span className="text-[10px] text-stone-400 mt-0.5">
                            JPG, PNG, WEBP (Max 5MB)
                          </span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleScreenshotChange}
                            className="hidden"
                          />
                        </label>
                      )}
                      {errors.screenshot && (
                        <p className="mt-1 text-xs text-rose-500">{errors.screenshot}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Important Verification Disclaimer per prompt rules */}
                <div className="bg-amber-50/80 rounded-xl border border-amber-200 p-4 text-xs text-amber-900 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Important: Manual Verification Protocol</span>
                  </div>
                  <p className="leading-relaxed text-amber-800/90 font-light">
                    Every order is immediately recorded as <strong className="font-semibold text-amber-950">PENDING_VERIFICATION</strong>. 
                    A screenshot or UTR submission is not automatic proof of payment. Tuhin cross-verifies the 12-digit UTR against actual bank credits before marking the order <strong className="font-semibold text-amber-950">CONFIRMED</strong> and releasing the digital download.
                  </p>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Registering Order...</span>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4 text-amber-300" />
                      Submit Order for Verification
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Order Summary & QR Code (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Book Card Summary */}
                <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-sm space-y-4">
                  <h3 className="font-serif font-bold text-stone-900 text-sm uppercase tracking-wider text-stone-500">
                    Order Summary
                  </h3>

                  <div className="flex gap-4 items-center">
                    <div className="w-16 shrink-0">
                      <BookCoverArt
                        title={selectedProduct.title}
                        author={selectedProduct.author}
                        accentColor={selectedProduct.coverAccentColor}
                        imageUrl={selectedProduct.coverImage}
                        className="w-full shadow-sm"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-serif font-bold text-stone-900 text-sm truncate">
                        {selectedProduct.title}
                      </h4>
                      <p className="text-xs text-stone-500 font-light truncate">
                        By {selectedProduct.author}
                      </p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-mono font-bold text-stone-900 text-base tabular-nums">
                          ₹{finalAmount}
                        </span>
                        {selectedProduct.salePrice && (
                          <span className="font-mono text-xs text-stone-400 line-through tabular-nums">
                            ₹{selectedProduct.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex justify-between text-xs font-semibold text-stone-900">
                    <span>Total Due Now</span>
                    <span className="font-mono text-base text-stone-950">₹{finalAmount}</span>
                  </div>
                </div>

                {/* UPI QR Display Component */}
                <UpiQrDisplay
                  upiId={storeUpi}
                  payeeName={ownerName}
                  amount={finalAmount}
                  orderNumber={orderNumber}
                />
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer
        storeName={settings?.storeName}
        upiId={settings?.upiId}
        whatsappNumber={settings?.whatsappNumber}
      />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-500 text-sm">Preparing checkout...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
