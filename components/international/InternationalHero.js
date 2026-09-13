'use client';

import React, { useState, useEffect } from 'react';

export default function InternationalHero() {
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
    <section className="relative min-h-[calc(100vh-5rem)] min-h-[580px] md:min-h-[620px] w-full flex flex-col items-center justify-center overflow-hidden pb-8 pt-4 sticky top-20 z-0 bg-slate-950" id="hero">
      {/* Background Image with Dynamic Parallax Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <img
          alt="Breathtaking sunlit turquoise ocean and mountains"
          className="w-full h-full object-cover object-center transition-transform duration-200 ease-out will-change-transform"
          style={{ transform: `scale(${imageScale})` }}
          src="/images/yatrabus_international_holiday_travel_packages_1.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-teal-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-teal-200 font-bold text-xs uppercase tracking-wider mb-2 border border-white/30 shadow-md">
          <span className="material-symbols-outlined text-[16px] text-amber-300">explore</span>
          EXPLORE MORE, WORRY LESS • CURATED GLOBAL ESCAPES
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-2 max-w-4xl font-serif font-semibold drop-shadow-md">
          We Plan. You Pack. <br />
          <span className="font-serif italic text-teal-300 font-normal">Memories Last Forever.</span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-100 max-w-2xl mx-auto mb-4 font-medium drop-shadow-sm">
          Personalized worldwide holiday packages with flights, handpicked 4★ &amp; 5★ luxury stays, hassle-free visa processing, and curated Indian culinary experiences abroad.
        </p>

        {/* Compact Integrated Search Bar inside Hero */}
        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-2.5 sm:p-3 border border-white/30 text-left mb-2">
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 items-center" onSubmit={(e) => e.preventDefault()}>
            <div className="lg:col-span-4 flex items-center bg-slate-50/90 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-teal-600 focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-teal-600 mr-2 text-[20px]">pin_drop</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Destination</label>
                <input
                  className="w-full bg-transparent font-bold text-slate-900 text-xs outline-none p-0 border-0 focus:ring-0"
                  defaultValue="Dubai & Abu Dhabi"
                  type="text"
                />
              </div>
            </div>

            <div className="lg:col-span-3 flex items-center bg-slate-50/90 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-teal-600 focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-teal-600 mr-2 text-[20px]">flight_takeoff</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">From</label>
                <input
                  className="w-full bg-transparent font-bold text-slate-900 text-xs outline-none p-0 border-0 focus:ring-0"
                  defaultValue="Mumbai (BOM)"
                  type="text"
                />
              </div>
            </div>

            <div className="lg:col-span-3 flex items-center bg-slate-50/90 rounded-xl px-3 py-2 border border-slate-200 cursor-pointer">
              <span className="material-symbols-outlined text-teal-600 mr-2 text-[20px]">calendar_month</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Travel Month</label>
                <div className="text-xs font-bold text-slate-900 truncate">Nov - Dec 2026</div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <button
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-teal-600/30 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                type="submit"
              >
                <span className="material-symbols-outlined text-[16px]">search</span>
                <span>SEARCH</span>
              </button>
            </div>
          </form>

          {/* Quick Departure Badges Strip inside Hero */}
          <div className="mt-2 pt-1.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 px-1 text-[11px]">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <span className="material-symbols-outlined text-teal-600 text-[16px]">event_available</span>
              <span>Fixed Departures:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold">
                Nov 28 (4 Left)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                Dec 05 (Fast Filling)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                Dec 12 (Guaranteed)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
