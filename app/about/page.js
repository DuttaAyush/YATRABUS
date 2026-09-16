'use client';

import React from 'react';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export default function AboutUsPage() {
  const companyPillars = [
    {
      icon: 'verified',
      color: 'text-emerald-600 bg-emerald-100 border-emerald-200',
      title: 'Assigned Bus Plate Guarantee',
      desc: 'Unlike conventional aggregators who switch vehicles unpredictably, YATRABUS assigns your exact bus plate registration (e.g. MH-12-QZ-8812) at the time of booking.',
    },
    {
      icon: 'money_off',
      color: 'text-amber-600 bg-amber-100 border-amber-200',
      title: '0% Aggregator Surcharge',
      desc: 'We operate direct fleet distribution. Passengers pay purely for the ticket fare — zero convenience markups, platform fees, or hidden booking charges.',
    },
    {
      icon: 'temple_hindu',
      color: 'text-brand-scarlet bg-red-100 border-red-200',
      title: 'Curated Spiritual Yatras',
      desc: 'Our pilgrimage circuits (Char Dham, Kashi Vishwanath, Tirupati, Somnath) feature Pure Satvik dining options, temple proximity stays, and hassle-free scheduling.',
    },
    {
      icon: 'my_location',
      color: 'text-blue-600 bg-blue-100 border-blue-200',
      title: 'Live V1 Progress Tracking',
      desc: 'Direct GPS integration provides milestone checkpoint tracking and driver communication from departure terminal to final destination.',
    },
  ];

  const fleetAmenities = [
    { icon: 'airline_seat_recline_extra', title: 'Ergonomic 2+2 & Sleeper Berths', desc: 'Plush leatherette seating with extended legroom and memory foam sleeper mattresses.' },
    { icon: 'ac_unit', title: 'Climate Controlled AC', desc: 'Individual AC vents with HEPA air filtration for a fresh cabin environment.' },
    { icon: 'power', title: 'Personal Charging Ports', desc: 'Dedicated USB & AC power sockets at every single seat and sleeper berth.' },
    { icon: 'shield', title: 'Safety & Emergency Protocol', desc: 'Speed limiters, CCTV surveillance, emergency panic buttons, and fire suppression systems.' },
    { icon: 'clean_hands', title: '100% Sanitized Linen', desc: 'Freshly laundered blankets and pillows provided in sealed hygienic packaging for sleeper journeys.' },
    { icon: 'wifi', title: 'On-Board High Speed Wi-Fi', desc: 'Seamless connectivity across major expressways including Samruddhi Mahamarg.' },
  ];

  const stats = [
    { label: 'Luxury Fleet Coaches', value: '15+', sub: 'Volvo B11R & BharatBenz' },
    { label: 'Daily Direct Routes', value: '45+', sub: 'Intercity Expressway Network' },
    { label: 'Happy Passengers', value: '1,20,000+', sub: '4.8 ★ Avg Customer Rating' },
    { label: 'Aggregator Markup', value: '0%', sub: 'Pure Transparent Pricing' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />

      {/* HERO BANNER SECTION */}
      <section className="relative bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-brand-scarlet/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 font-bold text-xs uppercase tracking-wider border border-white/20">
            <span className="material-symbols-outlined text-[16px]">stars</span>
            <span>India's Dedicated Bus &amp; Pilgrimage Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Redefining Intercity Travel Across Bharat
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
            Built on absolute transparency — zero hidden aggregator markups, assigned bus plate registration numbers at booking, and a dedicated fleet committed to premium comfort, safety, and spiritual yatras.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="/search-results"
              className="px-6 py-3.5 rounded-2xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-red-600/30 transition-all"
            >
              EXPLORE BUS ROUTES
            </a>
            <a
              href="/explore"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wider uppercase border border-white/20 backdrop-blur-md transition-all"
            >
              DISCOVER PACKAGES
            </a>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-white border-b border-slate-200/90 py-10 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((st, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-brand-scarlet">{st.value}</div>
              <div className="text-xs sm:text-sm font-serif font-bold text-slate-900">{st.label}</div>
              <div className="text-[11px] text-slate-500 font-medium">{st.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR MISSION & CORE PILLARS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-scarlet bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
            WHY YATRABUS STANDS APART
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
            The Pillars of Our Dedicated Fleet Model
          </h2>
          <p className="text-sm text-slate-600">
            We built YATRABUS to solve the common frustrations of intercity road travel in India: unannounced bus replacements, inflated booking fees, and lack of accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companyPillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex items-start gap-5"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${p.color}`}>
                <span className="material-symbols-outlined text-[28px]">{p.icon}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-serif font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLEET & HOSPITALITY AMENITIES */}
      <section className="bg-white border-y border-slate-200/90 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              FIRST-CLASS CABIN EXPERIENCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
              Modern Fleet Amenities &amp; On-Board Comfort
            </h2>
            <p className="text-sm text-slate-600">
              Every BharatBenz and Volvo coach in our network undergoes multi-point safety inspections before departure to deliver a smooth, quiet expressway journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleetAmenities.map((am, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">{am.icon}</span>
                </div>
                <h3 className="text-base font-serif font-bold text-slate-900">{am.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{am.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER'S VISION STORY */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <span className="material-symbols-outlined text-[16px]">format_quote</span>
            <span>OUR JOURNEY STORY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
            "Intercity bus travel in Bharat should feel reliable, dignified, and straightforward — whether you're commuting between Nagpur and Pune or embarking on a holy darshan."
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif italic">
            YATRABUS was founded to bridge the gap between bus fleet operators and passengers. By taking direct responsibility for bus assignment, live progress tracking, and transparent pricing, we give passengers full confidence on every single journey.
          </p>

          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            <div>
              <div className="text-sm font-extrabold text-white">YATRABUS Founders &amp; Fleet Operations Team</div>
              <div className="text-xs text-slate-400">Nagpur • Pune • New Delhi • Haridwar</div>
            </div>
            <div className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              100% Indian Owned &amp; Operated
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-red-50 border-t border-red-200 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Ready to Travel with Assigned Bus Plate Assurance?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Book your next intercity journey or spiritual darshan circuit with zero aggregator markup and instant ticket confirmation.
          </p>
          <div className="pt-2">
            <a
              href="/search-results"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-red-600/20 transition-all"
            >
              <span>SEARCH BUS TICKETS</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
