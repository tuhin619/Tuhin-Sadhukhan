'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookCoverArt } from '@/components/BookCoverArt';
import { BookReaderModal } from '@/components/BookReaderModal';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { SocialShareBar } from '@/components/SocialShareBar';
import { useStoreProducts, useStoreSettings } from '@/hooks/use-store';
import { Product, StoreSettings } from '@/types';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  BookOpen, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Download,
  Share2
} from 'lucide-react';

export default function BookDetailPage() {
  const params = useParams();
  const bookId = typeof params.id === 'string' ? params.id : '';

  const products = useStoreProducts();
  const settings = useStoreSettings();
  const [showPreview, setShowPreview] = useState(false);

  const product = products.find(p => p.id === bookId || p.slug === bookId) || null;

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-24 px-4">
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">Book Not Found</h2>
          <p className="text-sm text-stone-600 mb-6">The requested book does not exist or has been unpublished.</p>
          <Link
            href="/"
            className="py-2.5 px-5 bg-stone-900 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bookstore
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar storeName={settings?.storeName} />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Back navigation link */}
          <div className="mb-6">
            <Link
              href="/#ebooks"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Catalog
            </Link>
          </div>

          {/* 2-Column Contiguous Purchase Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Visual Cover Art & Social Share */}
            <div className="lg:col-span-5 space-y-6">
              <div className="max-w-sm mx-auto lg:max-w-none">
                <BookCoverArt
                  title={product.title}
                  subtitle={product.subtitle}
                  author={product.author}
                  category={product.category}
                  accentColor={product.coverAccentColor}
                  imageUrl={product.coverImage}
                  is3D={true}
                  className="w-full shadow-xl"
                />
              </div>

              {/* Quick Specs Strip */}
              <div className="grid grid-cols-3 gap-2 text-center bg-white p-4 rounded-xl border border-stone-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Length</span>
                  <span className="font-semibold text-stone-900">{product.pageCount} Pages</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Read Time</span>
                  <span className="font-semibold text-stone-900">{product.readTimeHours || 3} Hours</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Format</span>
                  <span className="font-semibold text-stone-900">{product.format || 'PDF + ePub'}</span>
                </div>
              </div>

              {/* Social Share Bar */}
              <SocialShareBar
                title={`Check out "${product.title}" by Tuhin Sadhukhan:`}
              />
            </div>

            {/* Right Column: Contiguous Purchase Module & Details */}
            <div className="lg:col-span-7 space-y-8">
              {/* Header Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-medium text-stone-800">{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>By {product.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>2026 Updated Edition</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 leading-tight">
                  {product.title}
                </h1>

                {product.subtitle && (
                  <p className="text-base text-stone-600 leading-relaxed font-light">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Sticky Purchase Card */}
              <div className="bg-white rounded-xl border border-stone-200/90 shadow-sm p-6 space-y-5">
                <div className="flex items-baseline justify-between border-b border-stone-100 pb-4">
                  <div>
                    <span className="text-xs text-stone-500 block">Digital Edition Price</span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-3xl font-bold font-mono tabular-nums text-stone-950">
                        ₹{product.salePrice ?? product.price}
                      </span>
                      {product.salePrice && (
                        <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {discountPercent > 0 && (
                    <div className="text-right">
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                        Save {discountPercent}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Delivery Guarantee Points */}
                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant download unlocked after quick UPI verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Universal PDF & ePub files compatible with iPhone, Android, & Kindle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Lifetime updates and direct WhatsApp support from author</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPreview(true)}
                    className="w-full py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Free Excerpt
                  </button>

                  <Link
                    href={`/checkout?bookId=${product.id}`}
                    className="w-full py-3 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    Buy Now with UPI
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Book Overview & Long Description */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  About This Guide
                </h3>
                <div className="text-sm text-stone-700 leading-relaxed space-y-3 font-light">
                  <p>{product.description}</p>
                </div>
              </div>

              {/* Detailed Chapter Breakdown */}
              {product.chapters && product.chapters.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-stone-200">
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    What You Will Learn ({product.chapters.length} Chapters)
                  </h3>

                  <div className="space-y-3">
                    {product.chapters.map((ch) => (
                      <div
                        key={ch.number}
                        className="p-4 rounded-xl bg-white border border-stone-200/80 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-stone-900 text-sm">
                            Chapter {ch.number}: {ch.title}
                          </h4>
                          {ch.pages && (
                            <span className="text-[11px] font-mono text-stone-400">
                              {ch.pages} pages
                            </span>
                          )}
                        </div>
                        {ch.summary && (
                          <p className="text-xs text-stone-600 font-light leading-relaxed">
                            {ch.summary}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer
        storeName={settings?.storeName}
        upiId={settings?.upiId}
        whatsappNumber={settings?.whatsappNumber}
      />

      <WhatsAppButton whatsappNumber={settings?.whatsappNumber} />

      {showPreview && (
        <BookReaderModal
          product={product}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
