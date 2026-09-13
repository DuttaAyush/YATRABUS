'use client';

import React, { useState, useEffect } from 'react';
import DatePickerPopover from '@/components/ui/DatePickerPopover';

export default function IndiaLocalHero() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    mainText: 'Nov - Dec 2026',
    subText: 'Winter Getaway'
  });
  const [scrollScale, setScrollScale] = useState(1);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const calculatedScale = 1 + Math.min(Math.max(scrollY, 0) / 800, 1) * 0.25;
          setScrollScale(calculatedScale);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDateSelect = (dateResult) => {
    setSelectedDate({
      mainText: dateResult.mainText,
      subText: dateResult.subText
    });
  };

  return (
    <>
      {/* HERO BANNER */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden pb-28 pt-12 sticky top-0 z-0" data-purpose="hero-banner">
        <div className="absolute inset-0 z-0">
          <img
            alt="Breathtaking cinematic travel photography of an iconic Indian coastal temple shore at sunrise"
            className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
            style={{ transform: `scale(${scrollScale})` }}
            src="/images/yatrabus_india_local_holiday_travel_packages_1.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-900/40"></div>
          <div className="absolute inset-0 bg-teal-950/20 mix-blend-overlay"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-amber-200 text-xs font-semibold tracking-wider uppercase mb-5 shadow-lg">
            <span className="text-amber-400">✨</span> Explore Incredible Bharat • Curated Domestic Getaways
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-5xl leading-[1.15] drop-shadow-md">
            Discover India. Unpack Wonders.
            <span className="block italic font-serif font-medium text-teal-300 drop-shadow-sm mt-1">
              Memories Last Forever.
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-200 max-w-3xl font-light leading-relaxed drop-shadow">
            Curated domestic holiday packages across coastal retreats, serene backwaters, and misty Himalayan valleys. Direct BharatBenz &amp; Volvo coach transfers, handpicked 4★ &amp; 5★ luxury stays, and regional culinary excellence.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              className="px-7 py-3.5 bg-teal-700 hover:bg-teal-600 text-white font-bold rounded-full shadow-lg hover:shadow-teal-700/40 transition duration-200 flex items-center gap-2 text-sm tracking-wide"
              href="#curated-packages"
            >
              Explore Domestic Getaways
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </a>
            <a
              className="px-6 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold rounded-full border border-white/30 transition duration-200 flex items-center gap-2 text-sm"
              href="#how-it-works"
            >
              <svg className="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path>
              </svg>
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* FLOATING SEARCH WIDGET */}
      <div className="relative -mt-20 z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-purpose="search-and-fixed-departures">
        <div className="bg-white rounded-2xl shadow-custom-card border border-slate-100 p-4 sm:p-6 lg:p-7 backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="border border-slate-200 rounded-xl p-3 hover:border-teal-600 transition flex items-center gap-3">
              <div className="text-teal-700 text-xl pl-1">📍</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</span>
                <input
                  className="w-full text-xs font-bold text-slate-800 p-0 border-0 focus:ring-0 truncate cursor-pointer bg-transparent"
                  readOnly
                  type="text"
                  defaultValue="Goa, Kerala, Himachal, Kashmir..."
                />
              </div>
            </div>
            <div className="border border-slate-200 rounded-xl p-3 hover:border-teal-600 transition flex items-center gap-3">
              <div className="text-teal-700 text-xl pl-1">🚌</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Departure From</span>
                <input
                  className="w-full text-xs font-bold text-slate-800 p-0 border-0 focus:ring-0 truncate cursor-pointer bg-transparent"
                  readOnly
                  type="text"
                  defaultValue="Mumbai, Pune, Delhi, Bangalore..."
                />
              </div>
            </div>

            {/* DATE PICKER TRIGGER WITH FLOATING SPEECH BUBBLE */}
            <div
              className="relative border border-slate-200 hover:border-teal-600 rounded-xl p-3 transition flex items-center gap-3 cursor-pointer hover:bg-teal-50/50"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              <div className="text-teal-700 text-xl pl-1">🗓️</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer">Travel Month</span>
                <div className="text-xs font-bold text-slate-800 truncate">{selectedDate.mainText}</div>
              </div>

              {/* Floating Speech Bubble */}
              <DatePickerPopover
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSelectDate={handleDateSelect}
                selectedDate={selectedDate.mainText}
                themeColor="teal"
              />
            </div>

            <div className="border border-slate-200 rounded-xl p-3 hover:border-teal-600 transition flex items-center gap-3">
              <div className="text-teal-700 text-xl pl-1">👥</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Travelers</span>
                <input
                  className="w-full text-xs font-bold text-slate-800 p-0 border-0 focus:ring-0 truncate cursor-pointer bg-transparent"
                  readOnly
                  type="text"
                  defaultValue="2 Adults, 1 Room"
                />
              </div>
            </div>
            <div className="flex items-center">
              <button className="w-full h-full min-h-[52px] bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                </svg>
                <span className="text-sm">Search Holidays</span>
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500 font-semibold">
              <span className="text-teal-700">⚡</span>
              <span>Upcoming Fixed Departures:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <a className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full font-semibold hover:bg-red-100 transition flex items-center gap-1.5" href="#fixed-batches">
                <span>Nov 29:</span> Goa Weekend Special
                <span className="bg-red-200 text-red-800 text-[10px] px-1.5 rounded-full font-bold">4 Seats Left</span>
              </a>
              <a className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-semibold hover:bg-amber-100 transition flex items-center gap-1.5" href="#fixed-batches">
                <span>Dec 06:</span> Kerala Backwaters
                <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 rounded-full font-bold">Fast Filling</span>
              </a>
              <a className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full font-semibold hover:bg-teal-100 transition flex items-center gap-1.5" href="#fixed-batches">
                <span>Dec 14:</span> Manali Snow Escape
                <span className="bg-teal-200 text-teal-900 text-[10px] px-1.5 rounded-full font-bold">Guaranteed Batch</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
