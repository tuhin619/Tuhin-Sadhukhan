'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { BookCoverArt } from './BookCoverArt';
import { BookOpen, ArrowRight, Check } from 'lucide-react';

interface BookCardProps {
  product: Product;
  onPreviewClick?: (product: Product) => void;
}

export function BookCard({ product, onPreviewClick }: BookCardProps) {
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-xl border border-stone-200/80 p-5 flex flex-col justify-between hover:border-stone-300 hover:shadow-md transition-all duration-300">
      <div>
        {/* Cover Presentation */}
        <div className="mb-5 relative">
          <Link href={`/book/${product.id}`} className="block">
            <BookCoverArt
              title={product.title}
              subtitle={product.subtitle}
              author={product.author}
              category={product.category}
              accentColor={product.coverAccentColor}
              imageUrl={product.coverImage}
              is3D={true}
              className="w-full shadow-md group-hover:shadow-xl transition-shadow"
            />
          </Link>
        </div>

        {/* Clean Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <span>{product.category}</span>
          <span aria-hidden="true">·</span>
          <span>{product.pageCount} pages</span>
          <span aria-hidden="true">·</span>
          <span>{product.format || 'Instant PDF'}</span>
        </div>

        {/* Title & Description */}
        <Link href={`/book/${product.id}`} className="block">
          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1.5 text-xs text-stone-600 line-clamp-2 leading-relaxed font-light">
          {product.subtitle || product.description}
        </p>

        {/* Highlights / Features list */}
        {product.chapters && product.chapters.length > 0 && (
          <div className="mt-3 pt-3 border-t border-stone-100 space-y-1">
            <p className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
              Includes {product.chapters.length} Actionable Chapters:
            </p>
            <p className="text-xs text-stone-700 truncate font-mono text-[11px]">
              1. {product.chapters[0].title}
            </p>
          </div>
        )}
      </div>

      {/* Pricing & CTA Controls */}
      <div className="mt-5 pt-4 border-t border-stone-100">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono tabular-nums text-stone-900">
                ₹{product.salePrice ?? product.price}
              </span>
              {product.salePrice && (
                <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                  ₹{product.price}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="text-[11px] font-medium text-emerald-700">
                Save {discountPercent}% today
              </span>
            )}
          </div>
          <span className="text-[11px] text-stone-500">Instant Download</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {onPreviewClick ? (
            <button
              type="button"
              onClick={() => onPreviewClick(product)}
              className="py-2 px-3 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Preview
            </button>
          ) : (
            <Link
              href={`/book/${product.id}`}
              className="py-2 px-3 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Details
            </Link>
          )}

          <Link
            href={`/checkout?bookId=${product.id}`}
            className="py-2 px-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap shrink-0"
          >
            Buy Now
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
