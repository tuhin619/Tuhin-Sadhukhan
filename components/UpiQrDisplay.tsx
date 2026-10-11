'use client';

import React, { useState } from 'react';
import { Copy, Check, Smartphone, ExternalLink, ShieldCheck } from 'lucide-react';

interface UpiQrDisplayProps {
  upiId?: string;
  payeeName?: string;
  amount: number;
  orderNumber: string;
  customQrUrl?: string;
}

export function UpiQrDisplay({
  upiId = 'sadhukhantuhin12@okaxis',
  payeeName = 'Tuhin Sadhukhan',
  amount,
  orderNumber,
  customQrUrl,
}: UpiQrDisplayProps) {
  const [copied, setCopied] = useState(false);

  // UPI deep link compliant with NPCI standards
  const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(`Order ${orderNumber}`)}`;

  // Quick QR code API with fallback
  const encodedUpiUri = encodeURIComponent(upiLink);
  const generatedQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodedUpiUri}`;
  const qrSource = customQrUrl || generatedQrUrl;

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200/90 shadow-sm p-6 text-center max-w-sm mx-auto">
      {/* Header with verified payee badge */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
          TS
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-stone-900 leading-tight flex items-center gap-1">
            {payeeName}
            <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
          </p>
          <p className="text-[11px] text-stone-500">Verified UPI Merchant</p>
        </div>
      </div>

      {/* QR Code Container */}
      <div className="relative mx-auto my-3 w-56 h-56 p-2 bg-white rounded-lg border-2 border-dashed border-stone-300 flex items-center justify-center">
        <img
          src={qrSource}
          alt={`UPI QR code for ${upiId}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain rounded"
        />
      </div>

      <p className="text-xs text-stone-500 font-medium mb-3">
        Scan with Google Pay, PhonePe, Paytm, or BHIM
      </p>

      {/* Amount Callout */}
      <div className="bg-stone-50 rounded-lg p-3 mb-4 border border-stone-200/60">
        <span className="text-xs text-stone-500 block">Exact Payment Amount</span>
        <span className="text-2xl font-bold font-mono tabular-nums text-stone-900">
          ₹{amount.toLocaleString('en-IN')}
        </span>
      </div>

      {/* UPI ID Pill with Copy button */}
      <div className="flex items-center justify-between bg-stone-100 rounded-lg px-3 py-2 text-xs mb-4">
        <div className="text-left truncate mr-2">
          <span className="text-[10px] text-stone-500 block uppercase tracking-wider">UPI ID</span>
          <span className="font-mono text-stone-800 font-medium truncate select-all">
            {upiId}
          </span>
        </div>
        <button
          type="button"
          onClick={copyUpiId}
          className="shrink-0 p-1.5 rounded bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 transition-colors flex items-center gap-1 text-[11px] font-medium"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Pay Using UPI App Button for Mobile */}
      <a
        href={upiLink}
        className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
      >
        <Smartphone className="w-4 h-4" />
        Pay Using Any UPI App
        <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
      </a>
    </div>
  );
}
