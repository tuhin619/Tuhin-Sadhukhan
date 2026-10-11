'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, MessageCircle } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
              Customer Satisfaction
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
              Refund & Cancellation Policy
            </h1>
            <p className="text-xs text-stone-500 font-mono">
              Last updated: March 2026 · Author: Tuhin Sadhukhan
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm prose prose-stone max-w-none text-sm text-stone-700 leading-relaxed space-y-6">
            <section>
              <h3 className="font-serif font-bold text-stone-900 text-lg">1. Nature of Digital Goods</h3>
              <p>
                Because our eBooks are delivered digitally in instant download formats (PDF, ePub) upon payment confirmation, they cannot be physically &quot;returned&quot; once accessed. Therefore, as a standard policy, sales are generally non-refundable once the download link has been unlocked.
              </p>
            </section>

            <section>
              <h3 className="font-serif font-bold text-stone-900 text-lg">2. Duplicate Payments & Accidental Double Transfers</h3>
              <p>
                If you accidentally made a duplicate UPI transfer for the same order ID, or transferred the wrong amount, we will happily process a 100% full refund of the duplicate transaction back to your originating UPI ID within 24–48 hours.
              </p>
            </section>

            <section>
              <h3 className="font-serif font-bold text-stone-900 text-lg">3. Corrupted or Defective Files</h3>
              <p>
                In the rare event that you experience a technical failure or unreadable file that our support cannot rectify, we will issue a full refund upon verification.
              </p>
            </section>

            <section>
              <h3 className="font-serif font-bold text-stone-900 text-lg">4. How to Request Help</h3>
              <p>
                Message Tuhin on WhatsApp or email <a href="mailto:sadhukhantuhin12@gmail.com" className="text-stone-900 underline font-medium">sadhukhantuhin12@gmail.com</a> with your Order ID and bank reference. We respond quickly.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
