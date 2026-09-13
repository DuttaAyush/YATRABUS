'use client';

import React, { useState, useEffect } from 'react';

export default function IndiaLocalHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const imageScale = 1.05 + Math.min(scrollY / 1200, 0.18);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] min-h-[580px] md:min-h-[620px] w-full flex flex-col items-center justify-center text-white overflow-hidden pb-8 pt-4 sticky top-20 z-0 bg-slate-950" data-purpose="hero-banner">
      {/* Background Image with Dynamic Parallax Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <img
          alt="Breathtaking cinematic travel photography of an iconic Indian coastal temple shore at sunrise"
          className="w-full h-full object-cover object-center transition-transform duration-200 ease-out will-change-transform"
          style={{ transform: `scale(${imageScale})` }}
          src="/images/yatrabus_india_local_holiday_travel_packages_1.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-900/40"></div>
        <div className="absolute inset-0 bg-teal-950/20 mix-blend-overlay"></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-amber-200 text-xs font-semibold tracking-wider uppercase mb-2 shadow-lg">
          <span className="text-amber-400">✨</span> Explore Incredible Bharat • Curated Domestic Getaways
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-5xl leading-[1.15] drop-shadow-md mb-2">
          Discover India. Unpack Wonders.
          <span className="block italic font-serif font-medium text-teal-300 drop-shadow-sm mt-1">
            Memories Last Forever.
          </span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-3xl font-light leading-relaxed drop-shadow mb-4">
          Curated domestic holiday packages across coastal retreats, serene backwaters, and misty Himalayan valleys with luxury coach transfers &amp; 5★ stays.
        </p>

        {/* Compact Integrated Search Bar inside Hero */}
        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-2.5 sm:p-3 border border-white/30 text-slate-800 text-left mb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 items-center">
            <div className="lg:col-span-3 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/90 flex items-center gap-2">
              <div className="text-teal-700 text-lg">📍</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Destination</span>
                <input
                  className="w-full text-xs font-bold text-slate-800 p-0 border-0 focus:ring-0 truncate cursor-pointer bg-transparent"
                  readOnly
                  type="text"
                  defaultValue="Goa, Kerala, Himachal..."
                />
              </div>
            </div>

            <div className="lg:col-span-3 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/90 flex items-center gap-2">
              <div className="text-teal-700 text-lg">🚌</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">From</span>
                <input
                  className="w-full text-xs font-bold text-slate-800 p-0 border-0 focus:ring-0 truncate cursor-pointer bg-transparent"
                  readOnly
                  type="text"
                  defaultValue="Mumbai, Pune, Delhi..."
                />
              </div>
            </div>

            <div className="lg:col-span-3 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/90 flex items-center gap-2">
              <div className="text-teal-700 text-lg">🗓️</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Travel Month</span>
                <input
                  className="w-full text-xs font-bold text-slate-800 p-0 border-0 focus:ring-0 truncate cursor-pointer bg-transparent"
                  readOnly
                  type="text"
                  defaultValue="Nov - Dec 2026"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <button className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition text-xs uppercase tracking-wider active:scale-95">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                </svg>
                <span>Search Holidays</span>
              </button>
            </div>
          </div>

          <div className="mt-2 pt-1.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
              <span className="text-teal-700">⚡</span>
              <span>Fixed Batches:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-full font-semibold">
                Nov 29: Goa (4 Left)
              </span>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-semibold">
                Dec 06: Kerala
              </span>
              <span className="px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded-full font-semibold">
                Dec 14: Manali
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
