'use client';

import React from 'react';

export default function SpotlightDomesticDestinations() {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/60" data-purpose="popular-destinations-showcase" id="destinations">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-teal-700 text-xs font-extrabold uppercase tracking-widest">Top Domestic Picks</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-1">Popular Domestic Destinations</h2>
            <p className="text-slate-500 text-sm mt-1 max-w-2xl">From sun-kissed Arabian shores to tranquil emerald backwaters and pine-clad peaks</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <button aria-label="Previous Destinations" className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-white transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
            <button aria-label="Next Destinations" className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow hover:bg-teal-700 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
            <a className="ml-3 text-xs font-bold text-teal-800 hover:text-teal-600 flex items-center gap-1" href="#curated-packages">
              View All <span className="text-sm">→</span>
            </a>
          </div>
        </div>

        {/* 3D Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-4 pb-6">
          {/* Left Card: Goa */}
          <div className="card-tilt-left bg-white rounded-3xl overflow-hidden shadow-custom-card border border-slate-200/80 group">
            <div className="relative h-72 overflow-hidden">
              <img
                alt="Scenic coastal Goa beach resort with turquoise Arabian sea"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                src="/images/yatrabus_india_local_holiday_travel_packages_2.jpg"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow">Best Seller</span>
              </div>
              <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-white text-xs font-bold">
                <span className="text-amber-400">★</span> 4.8 <span className="text-slate-400 text-[10px] font-normal">(1,120)</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-teal-300">West Coast • Goa</span>
                <h3 className="font-serif text-xl font-bold text-white">Goa Beach &amp; Heritage Haven</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-xs text-slate-600 line-clamp-2">
                Beachfront heritage villa in Candolim, private sunset catamaran cruise, and Old Goa Latin Quarter walking tour.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Starting From</span>
                  <span className="text-xl font-black text-slate-900">₹6,999</span>
                  <span className="text-xs text-slate-500 font-normal"> / person</span>
                </div>
                <a className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold transition shadow-sm" href="#itinerary">
                  Explore →
                </a>
              </div>
            </div>
          </div>

          {/* Center Card: Kerala */}
          <div className="card-elevated-center bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border-2 border-teal-500/50 group relative">
            <div className="relative h-80 overflow-hidden">
              <img
                alt="Idyllic Kerala backwaters in Alleppey with luxury traditional wooden houseboat"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                src="/images/yatrabus_india_local_holiday_travel_packages_3.jpg"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-teal-600 text-white text-[11px] font-extrabold uppercase px-3.5 py-1 rounded-full shadow-lg">⭐ Top Recommended</span>
              </div>
              <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-white text-xs font-bold">
                <span className="text-amber-400">★</span> 4.9 <span className="text-slate-300 text-[10px] font-normal">(1,840)</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
              <div className="absolute bottom-4 left-5 right-5">
                <span className="text-[11px] uppercase font-black tracking-widest text-emerald-400">God's Own Country • Alleppey</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-0.5">Kerala Backwaters &amp; Lagoons</h3>
              </div>
            </div>
            <div className="p-6 bg-slate-900">
              <p className="text-xs text-slate-300 leading-relaxed">
                Overnight private AC houseboat cruise with personal chef, traditional sadhya, and Kumarakom bird sanctuary tour.
              </p>
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-emerald-400 font-bold block tracking-wider">All-Inclusive Flights + Houseboat</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">₹9,499</span>
                    <span className="text-xs text-slate-400 font-normal">/ person</span>
                  </div>
                </div>
                <button className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black transition shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Card: Himachal */}
          <div className="card-tilt-right bg-white rounded-3xl overflow-hidden shadow-custom-card border border-slate-200/80 group">
            <div className="relative h-72 overflow-hidden">
              <img
                alt="Majestic snow-capped Himalayan valley in Himachal Manali"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                src="/images/yatrabus_india_local_holiday_travel_packages_4.jpg"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-amber-600 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow">Winter Special</span>
              </div>
              <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-white text-xs font-bold">
                <span className="text-amber-400">★</span> 4.8 <span className="text-slate-400 text-[10px] font-normal">(1,450)</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-teal-300">Himachal • Manali</span>
                <h3 className="font-serif text-xl font-bold text-white">Himachal Pine &amp; Snow Retreat</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-xs text-slate-600 line-clamp-2">
                Heated cedar wood chalets by Beas River, Solang Valley snow adventures, Atal Tunnel pass, and bonfire nights.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Starting From</span>
                  <span className="text-xl font-black text-slate-900">₹8,499</span>
                  <span className="text-xs text-slate-500 font-normal"> / person</span>
                </div>
                <a className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold transition shadow-sm" href="#curated-packages">
                  Explore →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
