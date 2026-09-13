'use client';

import React, { useState, useEffect } from 'react';
import DatePickerPopover from '@/components/ui/DatePickerPopover';

export default function Hero() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    mainText: 'Tomorrow, 24 Oct',
    subText: 'Thursday'
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-14 pt-10 sticky top-0 z-0" id="heroSearch">
      <div className="absolute inset-0 z-0">
        <img
          alt="Modern BharatBenz luxury coach on scenic highway"
          className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
          style={{ transform: `scale(${scrollScale})` }}
          src="/images/screen.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-brand-scarlet/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Entrance Badge */}
        <div
          style={{
            transform: `translateY(${isLoaded ? textY * 0.7 : 20}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: isLoaded && textY > 0
              ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
              : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, opacity 0.8s ease-out 0.05s'
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-red-200 font-bold text-xs uppercase tracking-wider mb-4 border border-white/20 shadow-lg shadow-red-950/20"
        >
          <span className="material-symbols-outlined text-[16px] text-amber-300 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
            stars
          </span>
          India&apos;s Dedicated Fleet &amp; Pilgrimage Network
        </div>

        {/* Entrance Title */}
        <h1
          style={{
            transform: `translateY(${isLoaded ? textY : 35}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: isLoaded && textY > 0
              ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
              : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 0.9s ease-out 0.2s'
          }}
          className="text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4 max-w-4xl mx-auto font-serif font-semibold drop-shadow-[0_4px_25px_rgba(0,0,0,0.7)]"
        >
          India&apos;s Dedicated <span className="bg-gradient-to-r from-white via-red-100 to-amber-200 bg-clip-text text-transparent drop-shadow-md font-serif">Intercity Bus Network</span>
        </h1>

        {/* Entrance Subtitle */}
        <p
          style={{
            transform: `translateY(${isLoaded ? textY * 0.85 : 35}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: isLoaded && textY > 0
              ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
              : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, opacity 0.9s ease-out 0.35s'
          }}
          className="text-base md:text-lg text-slate-100 max-w-2xl mx-auto mb-8 font-medium drop-shadow-md leading-relaxed"
        >
          Daily direct luxury BharatBenz &amp; Volvo sleeper coaches with assigned bus numbers and zero hidden aggregator fees.
        </p>

        {/* Entrance Search Matrix Box */}
        <div
          style={{
            transform: `translateY(${isLoaded ? textY * 0.5 : 45}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: isLoaded && textY > 0
              ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
              : 'transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, opacity 1s ease-out 0.5s'
          }}
          className="bg-white rounded-3xl hero-shadow p-3 md:p-4 max-w-7xl mx-auto mb-6 text-left"
        >
          <form className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 items-center">
            <div className="md:col-span-3 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/80 focus-within:border-brand-scarlet focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-brand-scarlet mr-3 text-[22px]">departure_board</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">From</label>
                <input
                  className="w-full bg-transparent font-bold text-slate-900 text-base outline-none p-0 border-0 focus:ring-0"
                  type="text"
                  defaultValue="Nagpur"
                />
                <p className="text-[11px] text-slate-500 truncate">Chatrapati Sq, Dharampeth</p>
              </div>
            </div>

            <div className="md:col-span-1 flex justify-center -my-3 md:my-0">
              <button
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-brand-scarlet hover:bg-red-50 hover:scale-105 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
              </button>
            </div>

            <div className="md:col-span-3 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/80 focus-within:border-brand-scarlet focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-brand-scarlet mr-3 text-[22px]">pin_drop</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">To</label>
                <input
                  className="w-full bg-transparent font-bold text-slate-900 text-base outline-none p-0 border-0 focus:ring-0"
                  type="text"
                  defaultValue="Pune"
                />
                <p className="text-[11px] text-slate-500 truncate">Wakad, Swargate, Viman Nagar</p>
              </div>
            </div>

            {/* DATE PICKER TRIGGER WITH FLOATING SPEECH BUBBLE */}
            <div
              className="relative md:col-span-2 flex items-center bg-slate-50 hover:bg-red-50/50 rounded-2xl px-4 py-3 border border-slate-200/80 hover:border-brand-scarlet cursor-pointer transition-all active:scale-[0.98]"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              <span className="material-symbols-outlined text-brand-scarlet mr-2.5 text-[22px]">calendar_month</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 cursor-pointer">Date of Journey</label>
                <div className="text-sm font-bold text-slate-900 truncate">{selectedDate.mainText}</div>
                <p className="text-[11px] text-emerald-600 font-semibold truncate">{selectedDate.subText}</p>
              </div>

              {/* Floating Speech Bubble */}
              <DatePickerPopover
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSelectDate={handleDateSelect}
                selectedDate={selectedDate.mainText}
                themeColor="red"
              />
            </div>

            <div className="md:col-span-1 flex items-center bg-slate-50 rounded-2xl px-3 py-3 border border-slate-200/80 text-center cursor-pointer">
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Seats</label>
                <div className="text-xs font-bold text-slate-900">1 Seat</div>
                <p className="text-[10px] text-slate-500">All</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                className="w-full min-h-[58px] rounded-2xl bg-brand-scarlet text-white hover:bg-brand-hover transition-all flex items-center justify-center gap-2 font-bold text-sm tracking-wider uppercase shadow-lg shadow-red-600/30"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>SEARCH BUSES</span>
              </button>
            </div>
          </form>
        </div>

        {/* Trust Badges Bar */}
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-3 px-6 py-3.5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-white text-xs font-semibold tracking-wide shadow-md">
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
