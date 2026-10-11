'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  storeName?: string;
  upiId?: string;
  whatsappNumber?: string;
}

export function Footer({
  storeName = "Tuhin's Digital Book Vault",
  upiId = 'sadhukhantuhin12@okaxis',
  whatsappNumber = '919876543210',
}: FooterProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Tuhin, I have a question about your eBooks!'
  )}`;

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-stone-100 text-stone-900 flex items-center justify-center font-serif text-base font-bold">
                T
              </span>
              <span className="font-serif text-lg font-bold text-white">{storeName}</span>
            </div>
            <p className="text-sm text-stone-400 max-w-md leading-relaxed font-light">
              Authored and published by Tuhin Sadhukhan. Actionable, battle-tested playbooks
              for Indian creators, freelancers, and ambitious professionals. Instant manual UPI
              verification with zero third-party processing markups.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium hover:bg-emerald-600/30 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp Tuhin Directly
              </a>
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Direct UPI</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation & Tools */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-4">
              Store Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#ebooks" className="hover:text-white transition-colors">
                  Featured eBooks
                </Link>
              </li>
              <li>
                <Link href="/order-lookup" className="hover:text-white transition-colors">
                  Lookup Order & Download
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Payment FAQs
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  Admin Dashboard
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-4">
              Policies & Help
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition-colors">
                  Refund & Cancellation
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:sadhukhantuhin12@gmail.com"
                  className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  sadhukhantuhin12@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Tuhin Sadhukhan. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>UPI ID: <span className="font-mono text-stone-400">{upiId}</span></span>
            <span aria-hidden="true">·</span>
            <span>Made for India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
