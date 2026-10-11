'use client';

import React from 'react';
import { Product } from '@/types';
import { X, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface BookReaderModalProps {
  product: Product | null;
  onClose: () => void;
}

export function BookReaderModal({ product, onClose }: BookReaderModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-stone-50 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-amber-100 text-amber-800 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                Free Sample Excerpt
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base truncate max-w-xs sm:max-w-md">
                {product.title}
              </h4>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Paper Styled Reader */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-serif text-stone-800 bg-[#FAF8F5] leading-relaxed">
          <div className="border-b border-stone-200 pb-4">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-sans">
              Author: {product.author} · Edition 2026
            </p>
            <h2 className="text-2xl font-bold font-serif text-stone-900 mt-2">
              {product.title}
            </h2>
            <p className="text-sm text-stone-600 font-sans mt-1">
              {product.subtitle}
            </p>
          </div>

          {/* Table of Contents preview */}
          {product.chapters && product.chapters.length > 0 && (
            <div className="bg-white/80 p-4 rounded-xl border border-stone-200 font-sans text-xs">
              <h5 className="font-semibold text-stone-900 mb-2 uppercase tracking-wider text-[11px]">
                Complete Table of Contents ({product.pageCount} Pages Total)
              </h5>
              <div className="space-y-1.5">
                {product.chapters.map((ch) => (
                  <div key={ch.number} className="flex justify-between text-stone-700 py-0.5 border-b border-stone-100 last:border-0">
                    <span>Chapter {ch.number}: {ch.title}</span>
                    <span className="font-mono text-stone-400">{ch.pages} pages</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Excerpt Text */}
          <div className="prose prose-stone max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif text-stone-800">
            {product.previewSnippet || `Welcome to the preview excerpt of ${product.title}.\n\nThis guide is packed with real world examples, clear frameworks, and tactical instructions designed specifically for practitioners.`}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 font-sans text-xs text-amber-900 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Unlock the Full {product.pageCount}-Page Guide</p>
              <p className="text-amber-800/90 mt-0.5">
                Instant delivery upon quick UPI verification. Includes all chapters, downloadable checklists, and templates.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer with Direct Buy CTA */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-stone-500 block">Complete eBook Price</span>
            <span className="text-lg font-bold font-mono text-stone-900">
              ₹{product.salePrice ?? product.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="py-2 px-3 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Close
            </button>
            <Link
              href={`/checkout?bookId=${product.id}`}
              onClick={onClose}
              className="py-2 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              Get Instant Access
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
