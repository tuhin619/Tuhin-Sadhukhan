'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookCard } from '@/components/BookCard';
import { BookReaderModal } from '@/components/BookReaderModal';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { SocialShareBar } from '@/components/SocialShareBar';
import { useStoreProducts, useStoreSettings } from '@/hooks/use-store';
import { Product, StoreSettings } from '@/types';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Download, 
  Smartphone, 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  Mail,
  BookOpen
} from 'lucide-react';

export default function HomePage() {
  const products = useStoreProducts();
  const settings = useStoreSettings();
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const storeName = settings?.storeName || "Tuhin's Digital Book Vault";
  const upiId = settings?.upiId || "sadhukhantuhin12@okaxis";
  const whatsappNumber = settings?.whatsappNumber || "919876543210";

  const faqs = [
    {
      q: "How do I make the payment using UPI?",
      a: "When you click 'Buy Now' on any eBook, our checkout displays my direct verified UPI ID (sadhukhantuhin12@okaxis) and a dynamic QR code. Scan the code with Google Pay, PhonePe, Paytm, BHIM, or CRED, complete the transfer, and paste the 12-digit UTR reference number from your payment receipt."
    },
    {
      q: "Why is every new order marked as PENDING_VERIFICATION?",
      a: "Because this is direct peer-to-peer manual UPI verification with zero middlemen fees! Once you submit your 12-digit UTR (and optional screenshot), Tuhin manually cross-verifies the transaction in his banking app to protect against fraud, and marks it CONFIRMED (typically within 10–30 minutes)."
    },
    {
      q: "How will I receive and download my eBook?",
      a: "As soon as your payment is verified and confirmed, your secure order page instantly unlocks the 'Download eBook' button. You can also look up your order at any time using your Order ID or email, and read it in our browser reader or save the PDF/ePub to your phone and laptop."
    },
    {
      q: "Can I read the eBook on mobile, Kindle, and iPad?",
      a: "Yes! All digital books come formatted in universally compatible, high-resolution PDF and mobile-optimized ePub formats that work seamlessly on iPhones, Android phones, tablets, Kindle apps, and laptops."
    },
    {
      q: "What if I entered the wrong UTR or have an issue?",
      a: "You can click the floating WhatsApp button to chat directly with Tuhin, or email sadhukhantuhin12@gmail.com with your Order ID. We resolve any verification queries immediately."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      {/* Announcement bar if enabled */}
      {settings?.announcement && (
        <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center font-medium border-b border-stone-800">
          <span>{settings.announcement}</span>
        </div>
      )}

      {/* 3-Zone Header Navbar */}
      <Navbar storeName={storeName} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-stone-200/80 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {/* Trust Subtitle / Category Label */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <span>Direct From Author</span>
                <span aria-hidden="true">·</span>
                <span>Instant UPI Payment</span>
                <span aria-hidden="true">·</span>
                <span>Zero Middlemen Fees</span>
              </div>

              {/* Refined Headline with text-wrap: balance */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 text-balance leading-[1.12]">
                Tactical Playbooks for Ambitious Indian Creators & Freelancers
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
                Battle-tested frameworks on landing USD clients, building compounding personal wealth, 
                and launching digital products. Written by Tuhin Sadhukhan for high performers.
              </p>

              {/* Call-to-action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href="#ebooks"
                  className="w-full sm:w-auto py-3 px-6 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
                >
                  Explore Books
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/order-lookup"
                  className="w-full sm:w-auto py-3 px-6 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Already Ordered? Download
                </Link>
              </div>

              {/* 3 Proof Credentials */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-stone-100 text-stone-600 text-xs sm:text-sm">
                <div>
                  <span className="block font-mono font-bold text-stone-900 text-lg sm:text-xl tabular-nums">
                    ₹{upiId}
                  </span>
                  <span className="text-[11px] text-stone-500">Official UPI ID</span>
                </div>
                <div>
                  <span className="block font-mono font-bold text-stone-900 text-lg sm:text-xl tabular-nums">
                    100%
                  </span>
                  <span className="text-[11px] text-stone-500">Direct to Author</span>
                </div>
                <div>
                  <span className="block font-mono font-bold text-stone-900 text-lg sm:text-xl tabular-nums">
                    PDF + ePub
                  </span>
                  <span className="text-[11px] text-stone-500">Universal Formats</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED EBOOKS CATALOG SECTION */}
        <section id="ebooks" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                The Complete Library
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                Featured Digital Books & Guides
              </h2>
            </div>
            <p className="mt-2 md:mt-0 text-xs text-stone-500">
              Prices listed in Indian Rupees (₹) · One-time payment · Lifetime access
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <BookCard
                key={product.id}
                product={product}
                onPreviewClick={(p) => setPreviewProduct(p)}
              />
            ))}
          </div>

          {/* Social Share Callout below catalog */}
          <div className="mt-12">
            <SocialShareBar 
              title={`Read tactical guides for Indian creators by Tuhin Sadhukhan: ${storeName}`}
            />
          </div>
        </section>

        {/* WHY DIGITAL & HOW MANUAL UPI WORKS */}
        <section className="py-16 bg-white border-y border-stone-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                Transparent & Direct
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                How Manual UPI Checkout Works
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                We believe in zero payment gateway commission deductions. You pay directly into my verified UPI bank account.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Pick Book & Scan QR
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Click Buy Now to open checkout. Scan the dynamic QR code with Google Pay, PhonePe, Paytm, or BHIM for the exact book amount.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Submit 12-Digit UTR
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Copy the 12-digit UPI Transaction Reference (UTR) number from your payment receipt and paste it into the order form.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Manual Verification & Download
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  I cross-check the transfer in my bank app. Once confirmed, your download button is unlocked with lifetime PDF access.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AUTHOR BIO & CREDENTIALS */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-amber-400 text-stone-950 font-serif font-bold text-4xl flex items-center justify-center shrink-0 shadow-lg border-2 border-amber-300">
              TS
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-amber-300 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Author & Publisher</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                A Note From Tuhin Sadhukhan
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed font-light max-w-2xl">
                I wrote these guides to give Indian builders a no-fluff playbook that actually works in our economic landscape.
                From landing remote freelance contracts priced in USD to saving on taxes and compounding wealth, 
                everything here is distilled from real-world execution. If you ever have questions before or after buying, 
                message me directly on WhatsApp.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-stone-400 font-mono">
                <span>UPI: {upiId}</span>
                <span aria-hidden="true">·</span>
                <span>WhatsApp: +{whatsappNumber}</span>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="py-16 bg-white border-t border-stone-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                Got Questions?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-stone-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif font-bold text-stone-900 text-sm sm:text-base hover:bg-stone-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed font-light border-t border-stone-100 bg-stone-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT & SUPPORT SECTION */}
        <section id="support" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-950">
              Need Personal Assistance?
            </h2>
            <p className="text-sm text-stone-600">
              Whether you need help with payment verification, order recovery, or have a question regarding any chapter, I am always reachable.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Tuhin, I need assistance with an eBook order!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Message on WhatsApp
              </a>

              <a
                href="mailto:sadhukhantuhin12@gmail.com"
                className="w-full sm:w-auto py-2.5 px-5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                sadhukhantuhin12@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        storeName={storeName}
        upiId={upiId}
        whatsappNumber={whatsappNumber}
      />

      {/* Floating WhatsApp Contact Button */}
      <WhatsAppButton whatsappNumber={whatsappNumber} />

      {/* Interactive Sample Reading Preview Modal */}
      {previewProduct && (
        <BookReaderModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      )}
    </div>
  );
}
