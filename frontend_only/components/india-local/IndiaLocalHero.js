'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DatePickerPopover from '@/components/ui/DatePickerPopover';

export default function IndiaLocalHero() {
  const router = useRouter();
  const [destination, setDestination] = useState('Goa');
  const [departureFrom, setDepartureFrom] = useState('Mumbai');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    mainText: 'Nov - Dec 2026',
    subText: 'Winter Getaway'
  });
  const [scrollScale, setScrollScale] = useState(1);
  const [textY, setTextY] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 60);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const calculatedScale = 1 + Math.min(Math.max(scrollY, 0) / 800, 1) * 0.25;
          const calculatedY = Math.min(Math.max(scrollY, 0) * 0.35, 150);
          const calculatedOpacity = Math.max(1 - Math.max(scrollY, 0) / 550, 0);

          setScrollScale(calculatedScale);
          setTextY(calculatedY);
          setTextOpacity(calculatedOpacity);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDateSelect = (dateResult) => {
    setSelectedDate({
      mainText: dateResult.mainText,
      subText: dateResult.subText
    });
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const query = destination.trim() || 'Goa';
    router.push(`/packages?category=Domestic&q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden pb-20 pt-10 sticky top-0 z-0" id="hero">
        <div className="absolute inset-0 z-0">
          <img
            alt="India Local Scenic Highway Banner"
            className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
            style={{ transform: `scale(${scrollScale})` }}
            src="/images/vedbus_india_local_holiday_travel_packages_1.jpg"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-teal-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div
            style={{
              transform: `translateY(${isLoaded ? textY * 0.7 : 20}px)`,
              opacity: isLoaded ? textOpacity : 0,
              transition: isLoaded && textY > 0
                ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
                : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, opacity 0.8s ease-out 0.05s'
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 backdrop-blur-md text-teal-200 font-bold text-xs uppercase tracking-wider mb-4 border border-teal-400/30 shadow-lg shadow-teal-950/40"
          >
            <span className="material-symbols-outlined text-[16px] text-teal-300">landscape</span>
            BHARAT &amp; DOMESTIC HOLIDAY PACKAGES
          </div>

          <h1
            style={{
              transform: `translateY(${isLoaded ? textY : 35}px)`,
              opacity: isLoaded ? textOpacity : 0,
              transition: isLoaded && textY > 0
                ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
                : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 0.9s ease-out 0.2s'
            }}
            className="text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4 max-w-4xl mx-auto drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)] font-serif font-medium"
          >
            Discover Beautiful Bharat in <span className="bg-gradient-to-r from-teal-200 via-emerald-200 to-teal-100 bg-clip-text text-transparent font-serif font-medium">Greater Comfort</span>
          </h1>

          <p
            style={{
              transform: `translateY(${isLoaded ? textY * 0.85 : 35}px)`,
              opacity: isLoaded ? textOpacity : 0,
              transition: isLoaded && textY > 0
                ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
                : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, opacity 0.9s ease-out 0.35s'
            }}
            className="text-base md:text-lg text-teal-100/90 max-w-2xl mx-auto mb-8 font-medium drop-shadow-md leading-relaxed"
          >
            Curated holiday packages across coastal retreats, serene backwaters, and misty Himalayan valleys with luxury sleeper coach connectivity.
          </p>

          <div
            style={{
              transform: `translateY(${isLoaded ? textY * 0.7 : 35}px)`,
              opacity: isLoaded ? textOpacity : 0,
              transition: isLoaded && textY > 0
                ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
                : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, opacity 0.9s ease-out 0.45s'
            }}
            className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-teal-200/90"
          >
            <div className="flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-teal-500/20">
              <span className="text-teal-400">✓</span> 100% Guaranteed Departures
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-teal-500/20">
              <span className="text-teal-400">✓</span> BharatBenz &amp; Volvo AC Coaches
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-teal-500/20">
              <span className="text-teal-400">✓</span> Handpicked 4★ &amp; 5★ Stays
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING SEARCH & FILTER WIDGET */}
      <div className="relative z-20 mx-auto px-4 sm:px-6 -mt-14 mb-12 max-w-7xl lg:px-8 w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-3 md:p-4 border border-slate-200/80">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="border border-slate-200 rounded-xl p-3 hover:border-teal-600 transition flex items-center gap-3">
              <div className="text-teal-700 text-xl pl-1">📍</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</span>
                <input
                  className="w-full text-xs font-bold text-slate-800 p-0 border-0 focus:ring-0 truncate bg-transparent outline-none"
                  placeholder="Where to? (Goa, Manali, Kerala...)"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            {/* Travel Dates Picker with Popover */}
            <div
              className="border border-slate-200 rounded-xl p-3 hover:border-teal-600 transition flex items-center gap-3 relative cursor-pointer select-none"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              <div className="text-teal-700 text-xl pl-1">📅</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Travel Dates</span>
                <span className="block text-xs font-bold text-slate-800 truncate">{selectedDate.mainText}</span>
              </div>

              {/* Floating Speech Bubble */}
              <DatePickerPopover
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSelectDate={handleDateSelect}
                selectedDate={selectedDate.mainText}
                themeColor="teal"
                position="auto"
                defaultPosition="top"
              />
            </div>

            <div className="border border-slate-200 rounded-xl p-3 hover:border-teal-600 transition flex items-center gap-3">
              <div className="text-teal-700 text-xl pl-1">👥</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Travelers</span>
                <input
                  className="w-full text-xs font-bold text-slate-800 p-0 border-0 focus:ring-0 truncate bg-transparent outline-none"
                  readOnly
                  type="text"
                  defaultValue="2 Adults, 1 Room"
                />
              </div>
            </div>
            <div className="flex items-center">
              <button type="submit" className="w-full h-full min-h-[52px] bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                </svg>
                <span className="text-sm">Search Holidays</span>
              </button>
            </div>
          </form>
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
