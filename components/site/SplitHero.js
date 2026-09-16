'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DatePickerPopover from '@/components/ui/DatePickerPopover';

export default function SplitHero() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    mainText: 'Tomorrow, 24 Oct',
    subText: 'Thursday'
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
    <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center justify-center overflow-hidden pb-12 pt-10 bg-slate-950" id="heroSearch">
      
      {/* PLAIN TAJ MAHAL HERO BACKGROUND IMAGE WITH ZOOM EFFECT */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Ancient Indian Taj Mahal bathed in golden sunrise light"
          className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
          style={{ transform: `scale(${scrollScale})` }}
          src="/images/domestic-hero.jpg"
        />
        {/* Subtle Bottom Fade to match the page section transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 space-y-8 sm:space-y-10">
        
        {/* LEFT-ALIGNED HERO TEXT CONTENT */}
        <div className="max-w-3xl space-y-4 text-left text-white">
          
          {/* Tag / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-300 font-bold text-xs uppercase tracking-wider border border-white/30 shadow-lg">
            <span className="material-symbols-outlined text-[16px] text-amber-400">temple_hindu</span>
            <span>Bharat &amp; Spiritual Yatras</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
            Sacred Yatras &amp;<br />
            <span className="text-amber-300">Intercity Bus Network</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg text-slate-100 max-w-2xl font-medium leading-relaxed drop-shadow-md">
            Daily luxury BharatBenz AC sleeper coaches, VIP Temple Darshan passes, verified Satvik dining, and handpicked local escapes across India.
          </p>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Link
              href="/spiritual-yatra"
              className="px-4 py-1.5 rounded-full bg-amber-500/30 backdrop-blur-md border border-amber-300/50 text-amber-200 text-xs font-bold hover:bg-amber-500/40 transition-all shadow-sm"
            >
              🛕 Spiritual Circuits
            </Link>
            <Link
              href="/india-local-packages"
              className="px-4 py-1.5 rounded-full bg-red-500/30 backdrop-blur-md border border-red-300/50 text-red-200 text-xs font-bold hover:bg-red-500/40 transition-all shadow-sm"
            >
              🚍 Bus &amp; Local Escapes
            </Link>
          </div>

        </div>

        {/* ULTRA-TRANSPARENT GLASS SEARCH BAR CAPSULE (Matched exact reference transparency) */}
        <div className="w-full max-w-6xl">
          <div className="bg-white/[0.06] backdrop-blur-md rounded-full border border-white/15 shadow-2xl p-2 sm:p-2.5">
            <form className="flex flex-col md:flex-row items-center justify-between gap-1 sm:gap-2">
              
              {/* 1. FROM FIELD */}
              <div className="flex-1 w-full px-4 py-2 sm:py-2.5 flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-300/90 text-[20px] shrink-0">departure_board</span>
                <div className="min-w-0 flex-1">
                  <label className="block text-[9px] font-extrabold uppercase tracking-widest text-amber-200/80">FROM</label>
                  <input
                    type="text"
                    defaultValue="Nagpur"
                    className="w-full bg-transparent font-bold text-white text-sm sm:text-base outline-none border-0 p-0 focus:ring-0 placeholder-white/40 truncate"
                    placeholder="Your city"
                  />
                </div>
              </div>

              {/* SWAP ICON BUTTON */}
              <button
                type="button"
                className="hidden md:flex w-8 h-8 rounded-full bg-white/10 border border-white/20 items-center justify-center text-amber-300 hover:bg-white/20 transition-all shrink-0 z-10 shadow-sm"
                title="Swap From and To"
              >
                <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
              </button>

              {/* 2. TO FIELD */}
              <div className="flex-1 w-full px-4 py-2 sm:py-2.5 flex items-center gap-3 border-b md:border-b-0 md:border-r border-white/10">
                <span className="material-symbols-outlined text-amber-300/90 text-[20px] shrink-0">pin_drop</span>
                <div className="min-w-0 flex-1">
                  <label className="block text-[9px] font-extrabold uppercase tracking-widest text-amber-200/80">TO</label>
                  <input
                    type="text"
                    defaultValue="Pune"
                    className="w-full bg-transparent font-bold text-white text-sm sm:text-base outline-none border-0 p-0 focus:ring-0 placeholder-white/40 truncate"
                    placeholder="Where do you want to go"
                  />
                </div>
              </div>

              {/* 3. DATE OF JOURNEY FIELD */}
              <div
                className={`relative flex-1 w-full px-4 py-2 sm:py-2.5 flex items-center gap-3 border-b md:border-b-0 md:border-r border-white/10 cursor-pointer hover:bg-white/5 rounded-2xl md:rounded-none transition-all ${isDatePickerOpen ? 'z-[9999]' : 'z-10'}`}
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              >
                <span className="material-symbols-outlined text-amber-300/90 text-[20px] shrink-0">calendar_month</span>
                <div className="min-w-0 flex-1">
                  <label className="block text-[9px] font-extrabold uppercase tracking-widest text-amber-200/80 cursor-pointer">DATE OF JOURNEY</label>
                  <div className="text-sm sm:text-base font-bold text-white truncate">{selectedDate.mainText}</div>
                </div>

                <DatePickerPopover
                  isOpen={isDatePickerOpen}
                  onClose={() => setIsDatePickerOpen(false)}
                  onSelectDate={handleDateSelect}
                  selectedDate={selectedDate.mainText}
                  themeColor="red"
                  position="auto"
                  defaultPosition="top"
                />
              </div>

              {/* 4. PASSENGERS / SEATS FIELD */}
              <div className="flex-1 w-full px-4 py-2 sm:py-2.5 flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-300/90 text-[20px] shrink-0">group</span>
                <div className="min-w-0 flex-1">
                  <label className="block text-[9px] font-extrabold uppercase tracking-widest text-amber-200/80">PASSENGERS</label>
                  <div className="text-sm sm:text-base font-bold text-white truncate">1 Passenger (1 Seat)</div>
                </div>
              </div>

              {/* 5. SEARCH BUTTON */}
              <a
                href="/search-results"
                className="w-full md:w-auto px-7 py-3.5 rounded-full bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>Search</span>
              </a>

            </form>
          </div>
        </div>

        {/* Bottom Trust Badges Bar */}
        <div className="max-w-6xl flex flex-wrap items-center justify-center md:justify-between gap-3 px-6 py-3.5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white text-xs font-semibold tracking-wide shadow-lg">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span> Assigned Bus Plate Instantly
          </div>
          <span className="hidden sm:inline text-white/40">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-amber-300 text-[18px]">money_off</span> 0% Convenience Markup
          </div>
          <span className="hidden md:inline text-white/40">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-cyan-300 text-[18px]">event_seat</span> Real-Time Live Seat Lock
          </div>
          <span className="hidden lg:inline text-white/40">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-pink-300 text-[18px]">send_to_mobile</span> Instant WhatsApp &amp; .ics Sync
          </div>
        </div>

      </div>
    </section>
  );
}
