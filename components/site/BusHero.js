'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DatePickerPopover from '@/components/ui/DatePickerPopover';

export default function BusHero() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    mainText: 'Tomorrow, 24 Oct',
    subText: 'Thursday',
  });
  const [fromCity, setFromCity] = useState('Nagpur');
  const [toCity, setToCity] = useState('Pune, MH');
  const [scrollScale, setScrollScale] = useState(1);
  const [textY, setTextY] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [bgOpacity, setBgOpacity] = useState(1);

  const handleSwap = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const calculatedScale = 1 + Math.min(Math.max(scrollY, 0) / 800, 1) * 0.25;
          const calculatedY = Math.min(Math.max(scrollY, 0) * 0.35, 150);
          const calculatedOpacity = Math.max(1 - Math.max(scrollY, 0) / 450, 0);
          const calculatedBgOpacity = Math.max(1 - Math.max(scrollY - 500, 0) / 400, 0);

          setScrollScale(calculatedScale);
          setTextY(calculatedY);
          setTextOpacity(calculatedOpacity);
          setBgOpacity(calculatedBgOpacity);
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
      subText: dateResult.subText,
    });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 pt-10 bg-slate-950 sticky top-0 z-0"
      id="heroSearch"
    >
      {/* TAJ MAHAL HERO BACKGROUND IMAGE WITH PARALLAX ZOOM & EXIT FADE */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-150"
        style={{ opacity: bgOpacity }}
      >
        <img
          alt="Ancient Indian Taj Mahal bathed in golden sunrise light"
          className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
          style={{ transform: `scale(${scrollScale})` }}
          src="/images/domestic-hero.jpg"
        />
        {/* Subtle Bottom Fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div
        className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 space-y-8 sm:space-y-10"
        style={{
          transform: `translateY(${textY}px)`,
          opacity: textOpacity,
          pointerEvents: textOpacity < 0.05 ? 'none' : 'auto',
          transition: textY > 0 ? 'transform 0.1s ease-out, opacity 0.1s ease-out' : undefined,
        }}
      >
        {/* LEFT-ALIGNED HERO TEXT CONTENT */}
        <div className="max-w-3xl space-y-4 text-left text-white">
          {/* Tag / Badge */}
          <div className="flex items-center gap-3 text-[#e5a97d] font-semibold text-xs uppercase tracking-[0.25em] mb-2">
            <span className="w-10 h-[1.5px] bg-[#e5a97d]/80 inline-block"></span>
            <span>BHARAT &amp; SPIRITUAL YATRAS</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
            Sacred Yatras &amp;
            <br />
            <span className="text-white">Intercity Bus Network</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg text-slate-100 max-w-2xl font-medium leading-relaxed drop-shadow-md">
            Daily luxury BharatBenz AC sleeper coaches, VIP Temple Darshan passes, verified Satvik dining, and handpicked local escapes across India.
          </p>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Link
              href="/spiritual"
              className="px-4 py-1.5 rounded-full bg-amber-500/30 backdrop-blur-md border border-amber-300/50 text-amber-200 text-xs font-bold hover:bg-amber-500/40 transition-all shadow-sm"
            >
              🛕 Spiritual Circuits
            </Link>
            <Link
              href="/domestic"
              className="px-4 py-1.5 rounded-full bg-red-500/30 backdrop-blur-md border border-red-300/50 text-red-200 text-xs font-bold hover:bg-red-500/40 transition-all shadow-sm"
            >
              🚍 Bus &amp; Local Escapes
            </Link>
          </div>
        </div>

        {/* ULTRA-TRANSPARENT GLASS SEARCH BAR CAPSULE */}
        <div className="w-full max-w-6xl">
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl md:rounded-full border border-white/15 shadow-2xl p-2 sm:p-2.5 md:py-2 md:pl-4 md:pr-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = '/search';
              }}
              className="flex flex-col md:flex-row items-center justify-between gap-1 sm:gap-2"
            >
              {/* 1. FROM FIELD */}
              <div className="flex-1 w-full px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-300 text-[22px] sm:text-[24px] shrink-0">
                  departure_board
                </span>
                <div className="min-w-0 flex-1">
                  <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-amber-300/90 cursor-pointer">
                    FROM
                  </label>
                  <input
                    type="text"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full bg-transparent font-medium text-white text-base sm:text-lg outline-none border-0 p-0 focus:ring-0 placeholder-white/40 truncate leading-snug"
                    placeholder="From city"
                  />
                </div>
              </div>

              {/* DESKTOP CENTER DIVIDER LINE & SWAP ARROW */}
              <div className="hidden md:flex items-center justify-center relative shrink-0 w-8 self-stretch">
                <div className="h-5 sm:h-6 w-[1px] bg-white/20 pointer-events-none" />
                <button
                  type="button"
                  onClick={handleSwap}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/25 flex items-center justify-center text-amber-300 hover:text-amber-200 hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer z-10"
                  title="Swap From and To"
                >
                  <span className="material-symbols-outlined text-[17px]">swap_horiz</span>
                </button>
              </div>

              {/* MOBILE SWAP BUTTON */}
              <div className="md:hidden flex items-center justify-center my-1 relative w-full">
                <div className="w-16 h-[1px] bg-white/20 pointer-events-none" />
                <button
                  type="button"
                  onClick={handleSwap}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/70 border border-white/20 flex items-center justify-center text-amber-300 active:scale-90 transition-all shadow-sm"
                  title="Swap From and To"
                >
                  <span className="material-symbols-outlined text-[15px]">swap_vert</span>
                </button>
              </div>

              {/* 2. TO FIELD */}
              <div className="flex-1 w-full px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-300 text-[22px] sm:text-[24px] shrink-0">
                  pin_drop
                </span>
                <div className="min-w-0 flex-1">
                  <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-amber-300/90 cursor-pointer">
                    TO
                  </label>
                  <input
                    type="text"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full bg-transparent font-medium text-white text-base sm:text-lg outline-none border-0 p-0 focus:ring-0 placeholder-white/40 truncate leading-snug"
                    placeholder="To city"
                  />
                </div>
              </div>

              {/* DESKTOP DIVIDER */}
              <div className="hidden md:block h-5 sm:h-6 w-[1px] bg-white/20 shrink-0 mx-1" />

              {/* 3. DATE OF JOURNEY FIELD */}
              <div
                className={`relative flex-1 w-full px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center gap-3 cursor-pointer hover:bg-white/5 rounded-2xl md:rounded-none transition-all ${
                  isDatePickerOpen ? 'z-[9999]' : 'z-10'
                }`}
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              >
                <span className="material-symbols-outlined text-amber-300 text-[22px] sm:text-[24px] shrink-0">
                  calendar_month
                </span>
                <div className="min-w-0 flex-1">
                  <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-amber-300/90 cursor-pointer">
                    DATE OF JOURNEY
                  </label>
                  <div className="text-base sm:text-lg font-medium text-white truncate leading-snug">
                    {selectedDate.mainText}
                  </div>
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

              {/* DESKTOP DIVIDER */}
              <div className="hidden md:block h-5 sm:h-6 w-[1px] bg-white/20 shrink-0 mx-1" />

              {/* 4. PASSENGERS FIELD */}
              <div className="flex-1 w-full px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-300 text-[22px] sm:text-[24px] shrink-0">
                  group
                </span>
                <div className="min-w-0 flex-1">
                  <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-amber-300/90">
                    PASSENGERS
                  </label>
                  <div className="text-base sm:text-lg font-medium text-white truncate leading-snug">
                    1 Passenger (1 Seat)
                  </div>
                </div>
              </div>

              {/* 5. SEARCH BUTTON */}
              <div className="w-full md:w-auto p-1 shrink-0">
                <a
                  href="/search"
                  className="w-full md:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/35 hover:scale-[1.03] active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                  <span>SEARCH</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
