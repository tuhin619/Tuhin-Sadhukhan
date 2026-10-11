'use client';

import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface BookCoverArtProps {
  title: string;
  author?: string;
  subtitle?: string;
  accentColor?: string;
  category?: string;
  imageUrl?: string;
  className?: string;
  is3D?: boolean;
}

export function BookCoverArt({
  title,
  author = 'Tuhin Sadhukhan',
  subtitle,
  accentColor = '#0F172A',
  category = 'Guide',
  imageUrl,
  className = '',
  is3D = false,
}: BookCoverArtProps) {
  const [imageError, setImageError] = useState(false);

  // If a valid custom image URL is provided and hasn't failed to load:
  if (imageUrl && !imageError) {
    return (
      <div
        className={`relative overflow-hidden rounded-md shadow-md aspect-[3/4] bg-stone-900 ${
          is3D ? 'shadow-2xl transition-transform duration-300 hover:scale-[1.02]' : ''
        } ${className}`}
      >
        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
        {/* Subtle realistic book spine highlight */}
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />
      </div>
    );
  }

  // Choose luxury gradient based on accentColor
  const getGradient = (color: string) => {
    if (color.toLowerCase().includes('#064e3b') || color.toLowerCase().includes('green')) {
      return 'from-emerald-950 via-teal-900 to-emerald-900';
    }
    if (color.toLowerCase().includes('#7c2d12') || color.toLowerCase().includes('orange') || color.toLowerCase().includes('red')) {
      return 'from-amber-950 via-rose-950 to-stone-950';
    }
    if (color.toLowerCase().includes('#1e1b4b') || color.toLowerCase().includes('purple') || color.toLowerCase().includes('indigo')) {
      return 'from-indigo-950 via-slate-900 to-violet-950';
    }
    return 'from-stone-950 via-slate-900 to-zinc-950';
  };

  return (
    <div
      className={`relative aspect-[3/4] rounded-md overflow-hidden bg-gradient-to-br ${getGradient(
        accentColor
      )} text-white p-5 flex flex-col justify-between shadow-lg select-none border border-white/10 ${
        is3D ? 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1' : ''
      } ${className}`}
    >
      {/* Book spine highlight effect */}
      <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/50 via-white/15 to-transparent pointer-events-none" />
      
      {/* Subtle paper grain texture pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" 
      />

      {/* Top Header metadata */}
      <div className="relative z-10 flex items-center justify-between text-xs tracking-wider text-amber-200/80 uppercase font-medium">
        <span className="truncate max-w-[70%]">{category}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
      </div>

      {/* Center Title & Graphic Foil */}
      <div className="relative z-10 my-auto py-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-amber-300/20 flex items-center justify-center mb-3 text-amber-300">
          <BookOpen className="w-4 h-4" />
        </div>
        
        <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight tracking-tight text-stone-100 text-balance line-clamp-3">
          {title}
        </h3>
        
        {subtitle && (
          <p className="mt-2 text-xs text-stone-300/80 leading-relaxed line-clamp-2 font-sans font-light">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom Author Stamp & Decorative Rule */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-sans">Author</p>
          <p className="font-medium text-amber-100 truncate">{author}</p>
        </div>
        <div className="text-[10px] text-amber-300/80 tracking-widest uppercase font-mono">
          EDITION
        </div>
      </div>
    </div>
  );
}
