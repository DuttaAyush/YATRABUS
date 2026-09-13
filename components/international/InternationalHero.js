'use client';

import React from 'react';

export default function InternationalHero() {
  return (
    <>
      {/* 2. REFRESHING SUNLIT OCEAN HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24 pt-12 sticky top-0 z-0" id="hero">
        <div className="absolute inset-0 z-0">
          <img
            alt="Breathtaking sunlit turquoise ocean and mountains"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 hover:scale-110 ease-out"
            src="/images/yatrabus_international_holiday_travel_packages_1.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-teal-950/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-teal-200 font-bold text-xs uppercase tracking-wider mb-4 border border-white/30">
            <span className="material-symbols-outlined text-[16px] text-amber-300">explore</span>
            EXPLORE MORE, WORRY LESS • CURATED GLOBAL ESCAPES
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight mb-4 max-w-4xl mx-auto drop-shadow-md font-serif font-semibold">
            We Plan. You Pack. <br />
            <span className="font-serif italic text-teal-300 font-normal">Memories Last Forever.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-100 max-w-2xl mx-auto mb-8 font-medium drop-shadow-sm">
            Personalized worldwide holiday packages with flights, handpicked 4★ &amp; 5★ luxury stays, hassle-free visa processing, and curated Indian culinary experiences abroad.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              className="px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-600/40 transition-all flex items-center gap-2"
              href="#destinations"
            >
              <span>Explore Destinations</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
            <a
              className="px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              href="#howItWorks"
            >
              <span className="material-symbols-outlined text-[16px]">play_circle</span>
              <span>How It Works</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. FLOATING SEARCH BAR */}
      <div className="relative z-20 mx-auto px-4 sm:px-6 -mt-14 mb-12 max-w-7xl lg:px-8 w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-3 md:p-4 border border-slate-200/80">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 items-center" onSubmit={(e) => e.preventDefault()}>
            <div className="md:col-span-3 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200 focus-within:border-teal-600 focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-teal-600 mr-3 text-[22px]">pin_drop</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Destination</label>
                <input
                  className="w-full bg-transparent font-bold text-slate-900 text-sm outline-none p-0 border-0 focus:ring-0"
                  defaultValue="Dubai & Abu Dhabi"
                  type="text"
                />
              </div>
            </div>
            <div className="md:col-span-3 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200 focus-within:border-teal-600 focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-teal-600 mr-3 text-[22px]">flight_takeoff</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Departure From</label>
                <input
                  className="w-full bg-transparent font-bold text-slate-900 text-sm outline-none p-0 border-0 focus:ring-0"
                  defaultValue="Mumbai (BOM)"
                  type="text"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200 cursor-pointer">
              <span className="material-symbols-outlined text-teal-600 mr-2.5 text-[22px]">calendar_month</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Travel Month</label>
                <div className="text-xs font-bold text-slate-900 truncate">Nov - Dec 2024</div>
              </div>
            </div>
            <div className="md:col-span-2 flex items-center bg-slate-50 rounded-2xl px-3 py-3 border border-slate-200 text-center">
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Travelers</label>
                <div className="text-xs font-bold text-slate-900">2 Adults, 1 Room</div>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                className="w-full min-h-[56px] rounded-2xl bg-teal-600 hover:bg-teal-700 text-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-bold text-xs tracking-wider uppercase shadow-lg shadow-teal-600/30"
                type="submit"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>SEARCH</span>
              </button>
            </div>
          </form>
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-2 px-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span className="material-symbols-outlined text-teal-600 text-[18px]">event_available</span>
              <span>Upcoming Fixed Departures:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                className="px-2.5 py-1 rounded-full bg-red-600/10 text-red-600 border border-red-600/20 text-[11px] font-bold hover:bg-red-600 hover:text-white transition-all"
                type="button"
              >
                Nov 28 <span className="font-normal">(4 Seats Left)</span>
              </button>
              <button
                className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold hover:bg-amber-500 hover:text-slate-950 transition-all"
                type="button"
              >
                Dec 05 <span className="font-normal">(Fast Filling)</span>
              </button>
              <button
                className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-[11px] font-bold hover:bg-teal-600 hover:text-white transition-all"
                type="button"
              >
                Dec 12 <span className="font-normal">(Guaranteed Batch)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
