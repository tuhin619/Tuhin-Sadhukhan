'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle } from 'lucide-react';
import { useMounted } from '@/hooks/use-mounted';

interface SocialShareBarProps {
  title?: string;
  url?: string;
}

export function SocialShareBar({
  title = "Check out Tuhin's Personal eBook Store for ambitious Indian creators!",
  url,
}: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);
  const mounted = useMounted();

  const defaultBaseUrl = 'https://my-ebook-store.vercel.app';
  const shareUrl = url || (mounted && typeof window !== 'undefined' ? window.location.href : defaultBaseUrl);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsApp = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  return (
    <div className="bg-stone-100/80 rounded-xl p-4 border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 text-stone-700">
        <Share2 className="w-4 h-4 text-stone-500" />
        <span className="font-medium">Share this book with your friends:</span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={shareWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp
        </a>

        <a
          href={shareFacebook}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1.5 rounded-md bg-[#1877F2] hover:bg-[#0c63d4] text-white font-medium transition-colors"
        >
          Facebook
        </a>

        <a
          href={shareTwitter}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1.5 rounded-md bg-stone-900 hover:bg-stone-800 text-white font-medium transition-colors"
        >
          X / Post
        </a>

        <button
          type="button"
          onClick={copyLink}
          className="px-2.5 py-1.5 rounded-md bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-medium flex items-center gap-1.5 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-stone-500" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
