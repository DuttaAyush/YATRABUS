'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DatePickerPopover from '@/components/ui/DatePickerPopover';

export default function InternationalHero() {
  const router = useRouter();
  const [destination, setDestination] = useState('Dubai & Abu Dhabi');
  const [departureFrom, setDepartureFrom] = useState('Mumbai (BOM)');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    mainText: 'Nov - Dec 2026',
    subText: 'Holiday Season'
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
    const query = destination.trim() || 'Dubai';
    router.push(`/packages?category=International&q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      {/* 1. REFRESHING SUNLIT OCEAN HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24 pt-12 sticky top-0 z-0" id="hero">
        <div className="absolute inset-0 z-0">
          <img
            alt="Breathtaking sunlit turquoise ocean and mountains"
            className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
            style={{ transform: `scale(${scrollScale})` }}
            src="/images/vedbus_international_holiday_travel_packages_1.jpg"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-teal-900/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent"></div>
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
            <span className="material-symbols-outlined text-[16px] text-teal-300">flight_takeoff</span>
            WORLDWIDE CURATED HOLIDAY PACKAGES
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
            Travel the World in <span className="bg-gradient-to-r from-teal-200 via-emerald-200 to-teal-100 bg-clip-text text-transparent font-serif font-medium">Unmatched Comfort</span>
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
            All-inclusive international journeys with flights, 4★ &amp; 5★ hotels, guided tours, and guaranteed Indian vegetarian dining worldwide.
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
              <span className="text-teal-400">✓</span> Return Flights &amp; Express Visas Included
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-teal-500/20">
              <span className="text-teal-400">✓</span> 100% Guaranteed Indian &amp; Jain Meals
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-teal-500/20">
              <span className="text-teal-400">✓</span> Hindi &amp; English Speaking Tour Managers
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING SEARCH BAR */}
      <div className="relative z-20 mx-auto px-4 sm:px-6 -mt-14 mb-12 max-w-7xl lg:px-8 w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-3 md:p-4 border border-slate-200/80">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-5 flex items-center bg-slate-50 rounded-2xl px-3.5 py-2.5 border border-slate-200 focus-within:border-teal-600 transition-colors">
              <span className="material-symbols-outlined text-teal-600 text-[20px] mr-2.5 shrink-0">flight_takeoff</span>
              <div className="flex-1 min-w-0 text-left">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Destination</label>
                <input
                  className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none truncate"
                  placeholder="Where to? (Dubai, Bali, Europe, Thailand...)"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            {/* Travel Dates Picker with Popover */}
            <div
              className="md:col-span-3 flex items-center bg-slate-50 rounded-2xl px-3.5 py-2.5 border border-slate-200 focus-within:border-teal-600 transition-colors cursor-pointer relative select-none"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              <span className="material-symbols-outlined text-teal-600 text-[20px] mr-2.5 shrink-0">calendar_month</span>
              <div className="flex-1 min-w-0 text-left">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Departure Month</label>
                <div className="text-xs font-bold text-slate-900 truncate">{selectedDate.mainText}</div>
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

            <div className="md:col-span-2 flex items-center bg-slate-50 rounded-2xl px-3 py-3 border border-slate-200 text-center">
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Travelers</label>
                <div className="text-xs font-bold text-slate-900">2 Adults, 1 Room</div>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                className="w-full min-h-[56px] rounded-2xl bg-teal-600 hover:bg-teal-700 text-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-bold text-xs tracking-wider uppercase shadow-lg shadow-teal-600/30 cursor-pointer"
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
