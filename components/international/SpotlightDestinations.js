'use client';

import React from 'react';

export default function SpotlightDestinations() {
  return (
    <section className="w-full py-16 bg-[#F8FAFB] overflow-hidden" id="destinations">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-serif italic text-teal-600 font-semibold text-sm tracking-wide block mb-1">Top Global Picks</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight font-semibold">Popular International Destinations</h2>
            <p className="text-sm md:text-base text-slate-500 mt-2 font-normal">Fly to iconic world capitals and sun-kissed archipelagos with curated ease</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              aria-label="Previous destinations"
              className="w-10 h-10 rounded-full border border-slate-300 hover:border-teal-600 hover:text-teal-700 bg-white text-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button
              aria-label="Next destinations"
              className="w-10 h-10 rounded-full bg-slate-900 hover:bg-teal-700 text-white flex items-center justify-center transition-all shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
            <a className="text-teal-600 hover:text-teal-700 font-bold text-sm flex items-center gap-1 ml-2 transition-colors" href="#packages">
              <span>View All</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* 3D Popping Card Container */}
        <div className="relative py-12 px-4 overflow-hidden scroll-smooth w-full max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center mx-auto transition-all duration-500 w-full" id="destDeck">
            {/* Card 1: Bali */}
            <div
              className="group relative h-[440px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(15,23,42,0.4)] transition-all duration-500 z-10 hover:z-30 hover:scale-105 cursor-pointer flex flex-col justify-between p-6 bg-slate-900 border border-slate-200/20"
              id="destCardBali"
              style={{ transform: 'rotate(-5deg)', transformOrigin: 'center center' }}
            >
              <img
                alt="Bali & Ubud Retreat"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                src="/images/yatrabus_international_holiday_travel_packages_2.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-black/20 z-10"></div>
              <div className="relative z-20 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-xs shadow-md">
                  <span className="text-amber-500 text-xs">★</span> 4.7 <span className="text-slate-500 font-medium">(918)</span>
                </span>
                <span className="px-4 py-1.5 rounded-full bg-[#EA384D] text-white font-extrabold text-xs shadow-lg tracking-wide">Best Seller</span>
              </div>
              <div className="relative z-20 mt-auto">
                <span className="text-[11px] font-extrabold tracking-widest text-[#2DD4BF] uppercase block mb-1">INDONESIA</span>
                <h3 className="text-2xl lg:text-[26px] text-white leading-tight mb-2 tracking-tight font-serif font-semibold">Bali &amp; Ubud Retreat</h3>
                <p className="text-xs text-white/80 leading-relaxed line-clamp-2 mb-5 font-normal">
                  Private pool villa in Seminyak, rice terrace jungle swing, and Mount Batur sunrise breakfast.
                </p>
                <div className="flex items-center justify-between pt-3.5 border-t border-white/20">
                  <div>
                    <span className="text-[10px] tracking-wider font-bold uppercase text-white/70 block">STARTING FROM</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-white">$699</span>
                      <span className="text-xs text-white/80 font-medium">/ person</span>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider border border-white/30 transition-all shadow-md active:scale-95">
                    Explore
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Santorini */}
            <div
              className="group relative h-[475px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_32px_60px_-15px_rgba(15,23,42,0.5)] transition-all duration-500 transform md:scale-105 z-20 hover:scale-[1.08] cursor-pointer flex flex-col justify-between p-7 bg-slate-900 border-[3px] border-[#14B8A6] ring-4 ring-[#14B8A6]/20"
              id="destCardSantorini"
              style={{ transform: 'rotate(0deg)' }}
            >
              <img
                alt="Santorini Island Escape"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                src="/images/yatrabus_international_holiday_travel_packages_3.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20 z-10"></div>
              <div className="relative z-20 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-xs shadow-md">
                  <span className="text-amber-500 text-xs">★</span> 4.9 <span className="text-slate-500 font-medium">(1,420)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0D9488] text-white font-bold text-xs shadow-lg tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span> Top Recommended
                </span>
              </div>
              <div className="relative z-20 mt-auto">
                <span className="text-[11px] font-extrabold tracking-widest text-[#FCD34D] uppercase block mb-1">GREECE • CYCLADES</span>
                <h3 className="text-2xl md:text-3xl text-white leading-tight mb-2 tracking-tight font-serif font-semibold">Santorini Island Escape</h3>
                <p className="text-xs md:text-sm text-white/90 leading-relaxed mb-5 font-normal">
                  Whitewashed clifftop villas, private catamaran sunset cruise, and Aegean Mediterranean dining.
                </p>
                <div className="flex items-center justify-between pt-3.5 border-t border-white/20">
                  <div>
                    <span className="text-[10px] tracking-wider font-bold uppercase text-white/75 block">ALL-INCLUSIVE FLIGHTS + STAY</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-extrabold text-[#FCD34D]">$899</span>
                      <span className="text-xs text-white/80 font-medium">/ person</span>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-600/50 active:scale-95">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Dubai */}
            <div
              className="group relative h-[440px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(15,23,42,0.4)] transition-all duration-500 z-10 hover:z-30 hover:scale-105 cursor-pointer flex flex-col justify-between p-6 bg-slate-900 border border-slate-200/20"
              id="destCardDubai"
              style={{ transform: 'rotate(5deg)', transformOrigin: 'center center' }}
            >
              <img
                alt="Dubai & Marina Dhow"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                src="/images/yatrabus_international_holiday_travel_packages_5.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-black/20 z-10"></div>
              <div className="relative z-20 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-xs shadow-md">
                  <span className="text-amber-500 text-xs">★</span> 4.8 <span className="text-slate-500 font-medium">(1,240)</span>
                </span>
                <span className="px-4 py-1.5 rounded-full bg-[#F59E0B] text-slate-950 font-extrabold text-xs shadow-lg tracking-wide">Quick Visa 24H</span>
              </div>
              <div className="relative z-20 mt-auto">
                <span className="text-[11px] font-extrabold tracking-widest text-[#2DD4BF] uppercase block mb-1">UNITED ARAB EMIRATES</span>
                <h3 className="text-2xl lg:text-[26px] text-white leading-tight mb-2 tracking-tight font-serif font-semibold">Dubai &amp; Marina Dhow</h3>
                <p className="text-xs text-white/80 leading-relaxed line-clamp-2 mb-5 font-normal">
                  Burj Khalifa 124th floor VIP access, red dunes 4x4 safari with BBQ dinner, and luxury Marina yacht tour.
                </p>
                <div className="flex items-center justify-between pt-3.5 border-t border-white/20">
                  <div>
                    <span className="text-[10px] tracking-wider font-bold uppercase text-white/70 block">STARTING FROM</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-white">$599</span>
                      <span className="text-xs text-white/70 font-medium">/ person</span>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider border border-white/30 transition-all shadow-md active:scale-95">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
