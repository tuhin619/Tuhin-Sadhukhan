'use client';

import React from 'react';
import Link from 'next/link';
import { BookMarked, Search, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  storeName?: string;
}

export function Navbar({ storeName = "Tuhin's Book Vault" }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
        >
          <span className="w-8 h-8 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-base shadow-sm">
            T
          </span>
          <span className="font-serif">{storeName}</span>
        </Link>

        {/* Zone 2: 4-5 Single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <Link href="/#ebooks" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            eBooks Catalog
          </Link>
          <Link href="/order-lookup" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            Track Order
          </Link>
          <Link href="/#faq" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            FAQ & Payment
          </Link>
          <Link href="/#support" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            Contact Tuhin
          </Link>
        </nav>

        {/* Zone 3: 1 Primary Action (Direct Admin or Track Order) */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/order-lookup"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            Lookup Order
          </Link>
          <Link
            href="/admin"
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            Admin Portal
          </Link>
        </div>
      </div>
    </header>
  );
}
