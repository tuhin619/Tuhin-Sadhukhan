'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getAllOrders, getStoreSettings } from '@/lib/store';
import { Order } from '@/types';
import { Search, ArrowRight, ShieldCheck, Clock, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export default function OrderLookupPage() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<Order[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    const allOrders = getAllOrders();
    const matches = allOrders.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(clean) ||
        o.customerEmail.toLowerCase().includes(clean) ||
        o.utrNumber.toLowerCase().includes(clean)
    );

    setResults(matches);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
              Self-Service Delivery Portal
            </span>
            <h1 className="font-serif text-3xl font-bold text-stone-950">
              Lookup Your eBook Order
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Enter the Order ID assigned during checkout (e.g. <code className="font-mono bg-stone-200/60 px-1 py-0.5 rounded text-xs">ORD-2026-8451</code>) or your registered email address.
            </p>
          </div>

          <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Order ID, Email, or 12-Digit UTR
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. ORD-2026-9182 or your email..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50 focus:bg-white text-stone-900"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              Find Order & Download Files
            </button>
          </form>

          {/* Results list */}
          {searched && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                {results.length} {results.length === 1 ? 'Order Found' : 'Orders Found'}
              </h3>

              {results.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-2">
                  <p className="font-serif font-bold text-stone-900 text-base">No Matching Order Found</p>
                  <p className="text-xs text-stone-500 font-light">
                    Double-check your spelling, or verify whether you used a different email address during checkout.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((ord) => {
                    const isConfirmed = ord.status === 'CONFIRMED';
                    const isPending = ord.status === 'PENDING_VERIFICATION';

                    return (
                      <div
                        key={ord.id}
                        className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-stone-900 text-sm">
                              {ord.orderNumber}
                            </span>
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                                isConfirmed
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : isPending
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-stone-900 text-sm mt-1">
                            {ord.bookTitle}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                            <span>₹{ord.bookPrice}</span>
                            <span aria-hidden="true">·</span>
                            <span>UTR: {ord.utrNumber}</span>
                          </div>
                        </div>

                        <Link
                          href={`/order/${ord.id}?token=${ord.accessToken}`}
                          className={`py-2 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm ${
                            isConfirmed
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-stone-900 hover:bg-stone-800 text-white'
                          }`}
                        >
                          {isConfirmed ? 'Download eBook' : 'View Verification Status'}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
