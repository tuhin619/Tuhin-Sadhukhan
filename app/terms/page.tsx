'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
              Terms of Use
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
              Terms & Conditions
            </h1>
            <p className="text-xs text-stone-500 font-mono">
              Last updated: March 2026 · Author: Tuhin Sadhukhan
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm prose prose-stone max-w-none text-sm text-stone-700 leading-relaxed space-y-6">
            <section>
              <h3 className="font-serif font-bold text-stone-900 text-lg">1. Intellectual Property & Digital License</h3>
              <p>
                All eBooks, guides, checklists, Notion templates, and associated digital materials authored by Tuhin Sadhukhan are protected by Indian and international copyright laws. Upon verified payment confirmation, you are granted a personal, non-transferable, single-user license to read and use the materials.
              </p>
              <p>
                You may not resell, redistribute, publicly upload, share on torrents or Telegram channels, or re-package any part of these eBooks without express written authorization.
              </p>
            </section>

            <section>
              <h3 className="font-serif font-bold text-stone-900 text-lg">2. Manual UPI Payment & Verification Term</h3>
              <p>
                Orders placed via our website require manual UPI transfer to <code className="font-mono bg-stone-100 px-1 py-0.5 rounded">sadhukhantuhin12@okaxis</code>. Submitting a fake, altered, or non-matching UTR number will result in immediate rejection. Digital delivery is unlocked solely upon genuine manual bank receipt confirmation.
              </p>
            </section>

            <section>
              <h3 className="font-serif font-bold text-stone-900 text-lg">3. Disclaimer of Earnings</h3>
              <p>
                The guides provided on freelancing, investing, social media, and digital products represent educational material and strategic frameworks. Results depend on individual effort, market conditions, and execution. No specific financial or income guarantee is promised.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
