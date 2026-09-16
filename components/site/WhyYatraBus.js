'use client';

import React from 'react';
import Link from 'next/link';

export default function WhyYatraBus() {
  const advantageCards = [
    {
      title: 'Instant Bus Plate Allocation',
      desc: 'Know your assigned vehicle number (e.g. MH-31-AP-4921) immediately on ticket booking, avoiding stand chaos.',
      icon: 'confirmation_number',
      bgColor: 'bg-red-50/90 hover:bg-red-50',
      borderColor: 'border-red-100',
      iconBg: 'bg-red-100 text-red-500',
      accentColor: 'text-red-500',
      btnBg: 'bg-red-100/80 text-red-500 hover:bg-red-200/80',
    },
    {
      title: 'Real-Time Live Seat Map',
      desc: 'Lock your specific upper or lower sleeper berth with 0 concurrency collisions. What you click is what you board.',
      icon: 'event_seat',
      bgColor: 'bg-emerald-50/90 hover:bg-emerald-50',
      borderColor: 'border-emerald-100',
      iconBg: 'bg-emerald-100 text-emerald-600',
      accentColor: 'text-emerald-600',
      btnBg: 'bg-emerald-100/80 text-emerald-600 hover:bg-emerald-200/80',
    },
    {
      title: 'Ticket + .ics Calendar Sync',
      desc: 'Automated WhatsApp boarding pass, print PDF, and instant calendar invite synced to your Google or Apple Calendar.',
      icon: 'calendar_month',
      bgColor: 'bg-blue-50/90 hover:bg-blue-50',
      borderColor: 'border-blue-100',
      iconBg: 'bg-blue-100 text-blue-600',
      accentColor: 'text-blue-600',
      btnBg: 'bg-blue-100/80 text-blue-600 hover:bg-blue-200/80',
    },
    {
      title: '0% Convenience Surcharge',
      desc: 'No surprise ₹80–₹150 convenience fee at final checkout. The base price matches the physical counter depot fare.',
      icon: 'currency_rupee',
      bgColor: 'bg-amber-50/90 hover:bg-amber-50',
      borderColor: 'border-amber-100',
      iconBg: 'bg-amber-100 text-amber-600',
      accentColor: 'text-amber-600',
      btnBg: 'bg-amber-100/80 text-amber-600 hover:bg-amber-200/80',
    },
  ];

  return (
    <section
      className="w-full relative pt-10 sm:pt-14 pb-12 sm:pb-16 border-none overflow-hidden bg-[#F4F2EB]"
      id="advantageSection"
    >
      {/* BACKGROUND GRAPHIC IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/why_yatrabus_bg.png"
          alt="Why YatraBus Advantage Background"
          className="w-full h-full object-cover object-center pointer-events-none"
        />
        {/* Light White Overlay */}
        <div className="absolute inset-0 bg-white/35 backdrop-blur-[0.5px] pointer-events-none" />
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-1.5">
          <span className="text-[11px] font-extrabold text-red-500 uppercase tracking-widest block">
            THE YATRABUS ADVANTAGE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
            Why Book Directly on YatraBus?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed pt-0.5">
            More savings. More control. A smoother journey from start to finish.
          </p>
        </div>

        {/* 4 FEATURE CARDS GRID WITH INCREASED GAPS & BALANCED HEIGHT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 xl:gap-8 mb-8 sm:mb-10">
          {advantageCards.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 sm:p-6 min-h-[180px] sm:min-h-[200px] border ${card.bgColor} ${card.borderColor} backdrop-blur-md shadow-sm transition-all duration-300 transform-gpu hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between space-y-4 group cursor-pointer`}
            >
              <div className="space-y-3">
                {/* ICON & TITLE SIDE-BY-SIDE */}
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}>
                    <span className="material-symbols-outlined text-[17px]">{card.icon}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {card.title}
                  </h3>
                </div>

                {/* Card Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/40 shrink-0">
                <Link
                  href="/bus-tickets"
                  className={`text-xs font-bold ${card.accentColor} flex items-center gap-1 group-hover:underline`}
                >
                  <span>Learn more</span>
                </Link>

                <Link
                  href="/bus-tickets"
                  className={`w-7 h-7 rounded-full ${card.btnBg} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105`}
                >
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* TRUSTED BY PEOPLE SUB-CAPTION LINE BELOW CARDS */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-xs font-semibold text-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Trusted by thousands of travellers across Bharat</span>
            <span className="text-slate-400">•</span>
            <span className="text-brand-scarlet font-bold">Direct Fleet Assurance</span>
          </div>
        </div>

      </div>

      {/* PLAIN WHITE SEPARATOR LINE ANCHORED AT VERY BOTTOM END OF SECTION */}
      <div className="absolute bottom-0 inset-x-0 h-[5px] bg-white z-30 pointer-events-none" />
    </section>
  );
}
