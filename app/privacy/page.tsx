'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
              Legal & Trust
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
              Privacy Policy
            </h1>
            <p className="text-xs text-stone-500 font-mono">
              Last updated: March 2026 · Author: Tuhin Sadhukhan
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm prose prose-stone max-w-none text-sm text-stone-700 leading-relaxed space-y-6">
            <section>
              <h3 className="font-serif font-bold text-stone-900 text-lg">1. Information We Collect</h3>
              <p>
                When purchasing an eBook on this website, we collect only the necessary details required to deliver your digital product and manually verify your UPI payment:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your full name (for personalization and licensing)</li>
                <li>Your email address (to deliver your order access and receipts)</li>
                <li>Your WhatsApp phone number (for payment verification assistance)</li>
                <li>Your 12-digit UPI Transaction Reference (UTR) number and optional screenshot</li>
              </ul>
            </section>

            <section>
              <h3 className="font-serif font-bold text-stone-900 text-lg">2. How We Use Your Information</h3>
              <p>
                Your data is strictly used for order fulfillment, fraud prevention, and customer support. 
                We do not sell, rent, or trade your contact information to third-party advertisers or data brokers.
              </p>
            </section>

            <section>
              <h3 className="font-serif font-bold text-stone-900 text-lg">3. Payment Security & Zero Card Storage</h3>
              <p>
                All payments on this store are processed peer-to-peer via official Indian UPI applications (Google Pay, PhonePe, Paytm, BHIM, CRED). We do not collect, process, or store your debit/credit card numbers or net banking credentials on our servers.
              </p>
            </section>

            <section>
              <h3 className="font-serif font-bold text-stone-900 text-lg">4. Data Retention & Contact</h3>
              <p>
                We retain your purchase records so you can look up your downloads at any time. If you wish to have your details deleted, email <a href="mailto:sadhukhantuhin12@gmail.com" className="text-stone-900 underline font-medium">sadhukhantuhin12@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
