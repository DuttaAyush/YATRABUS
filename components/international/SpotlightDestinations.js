'use client';

import React, { useState } from 'react';

const destinationsData = [
  {
    id: 'bali',
    country: 'INDONESIA',
    title: 'Bali & Ubud Retreat',
    rating: '4.7',
    reviews: '918',
    tag: 'Best Seller',
    tagBg: 'bg-[#EA384D] text-white',
    price: '$699',
    priceLabel: 'STARTING FROM',
    description: 'Private pool villa in Seminyak, rice terrace jungle swing, and Mount Batur sunrise breakfast.',
    image: '/images/yatrabus_international_holiday_travel_packages_2.jpg'
  },
  {
    id: 'santorini',
    country: 'GREECE • CYCLADES',
    title: 'Santorini Island Escape',
    rating: '4.9',
    reviews: '1,420',
    tag: 'Top Recommended',
    tagBg: 'bg-[#0D9488] text-white',
    price: '$899',
    priceLabel: 'ALL-INCLUSIVE FLIGHTS + STAY',
    description: 'Whitewashed clifftop villas, private catamaran sunset cruise, and Aegean Mediterranean dining.',
    image: '/images/yatrabus_international_holiday_travel_packages_3.jpg'
  },
  {
    id: 'dubai',
    country: 'UNITED ARAB EMIRATES',
    title: 'Dubai & Marina Dhow',
    rating: '4.8',
    reviews: '1,240',
    tag: 'Quick Visa 24H',
    tagBg: 'bg-[#F59E0B] text-slate-950',
    price: '$599',
    priceLabel: 'STARTING FROM',
    description: 'Burj Khalifa 124th floor VIP access, red dunes 4x4 safari with BBQ dinner, and luxury Marina yacht tour.',
    image: '/images/yatrabus_international_holiday_travel_packages_5.jpg'
  },
  {
    id: 'singapore',
    country: 'SOUTHEAST ASIA',
    title: 'Singapore & Malaysia Wonders',
    rating: '4.8',
    reviews: '1,105',
    tag: 'Family Favorite',
    tagBg: 'bg-indigo-600 text-white',
    price: '$749',
    priceLabel: 'FLIGHTS + STAY INCLUDED',
    description: 'Marina Bay Sands sky park, Universal Studios Sentosa, and Genting Cable Car highland getaway.',
    image: '/images/yatrabus_international_holiday_travel_packages_1.jpg'
  },
  {
    id: 'swiss',
    country: 'EUROPE CIRCUIT',
    title: 'Swiss Alps & Paris Romance',
    rating: '4.9',
    reviews: '860',
    tag: 'Premium Luxury',
    tagBg: 'bg-purple-600 text-white',
    price: '$1,299',
    priceLabel: 'ALL-INCLUSIVE GRAND TOUR',
    description: 'Mt. Titlis cable car, Eiffel Tower dinner cruise, and panoramic Glacier Express train ride.',
    image: '/images/yatrabus_international_holiday_travel_packages_4.jpg'
  },
  {
    id: 'thailand',
    country: 'THAILAND',
    title: 'Phuket & Krabi Explorer',
    rating: '4.7',
    reviews: '2,050',
    tag: 'Trending Now',
    tagBg: 'bg-rose-600 text-white',
    price: '$499',
    priceLabel: 'STARTING FROM',
    description: 'Phi Phi Island speed boat tour, James Bond Island canoeing, and luxury beachfront resort stay.',
    image: '/images/yatrabus_international_holiday_travel_packages_2.jpg'
  }
];

export default function SpotlightDestinations() {
  const [activeMidIndex, setActiveMidIndex] = useState(1); // Default center on Santorini (index 1)

  const total = destinationsData.length;

  const handlePrev = () => {
    setActiveMidIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveMidIndex((prev) => (prev + 1) % total);
  };

  const getCardIndex = (offset) => {
    return (activeMidIndex + offset + total) % total;
  };

  const leftCard = destinationsData[getCardIndex(-1)];
  const midCard = destinationsData[activeMidIndex];
  const rightCard = destinationsData[getCardIndex(1)];

  return (
    <section className="w-full py-10 md:py-12 bg-[#F8FAFB] overflow-hidden" id="destinations">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-serif italic text-teal-600 font-semibold text-xs tracking-wide block mb-1">Top Global Picks</span>
            <h2 className="font-serif text-2xl md:text-4xl text-slate-900 tracking-tight font-semibold">Popular International Destinations</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1 font-normal">Fly to iconic world capitals and sun-kissed archipelagos with curated ease</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous destination"
              className="w-9 h-9 rounded-full border border-slate-300 hover:border-teal-600 hover:text-teal-700 bg-white text-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="text-xs font-bold text-slate-500 font-mono tracking-wider">
              {activeMidIndex + 1} / {total}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next destination"
              className="w-9 h-9 rounded-full bg-slate-900 hover:bg-teal-700 text-white flex items-center justify-center transition-all shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
            <a className="text-teal-600 hover:text-teal-700 font-bold text-xs flex items-center gap-1 ml-2 transition-colors" href="#packages">
              <span>View All</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* 3D Circular Arc Wheel Container */}
        <div className="relative py-6 px-2 overflow-hidden w-full max-w-[1450px] mx-auto perspective-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center mx-auto transition-all duration-700 ease-out w-full" id="destDeck">
            
            {/* Left Card: Narrower Width (col-span-3), Curved Back (-8deg tilt), Opacity 0.8 */}
            <div className="md:col-span-3 flex justify-center">
              <div
                key={`left-${leftCard.id}`}
                onClick={handlePrev}
                className="group relative w-full h-[335px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 z-10 hover:z-30 cursor-pointer flex flex-col justify-between p-4 bg-slate-900 border border-slate-200/20 opacity-80 hover:opacity-100 scale-90 hover:scale-95"
                style={{
                  transform: 'rotate(-8deg) translateY(10px) translateZ(-40px)',
                  transformOrigin: 'right center'
                }}
              >
                <img
                  alt={leftCard.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                  src={leftCard.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-black/20 z-10"></div>
                <div className="relative z-20 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-[10px] shadow-sm">
                    <span className="text-amber-500 text-[10px]">★</span> {leftCard.rating}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full ${leftCard.tagBg} font-extrabold text-[10px] shadow-md tracking-wide`}>
                    {leftCard.tag}
                  </span>
                </div>
                <div className="relative z-20 mt-auto">
                  <span className="text-[9px] font-extrabold tracking-widest text-[#2DD4BF] uppercase block mb-0.5">{leftCard.country}</span>
                  <h3 className="text-lg text-white leading-tight mb-1 tracking-tight font-serif font-semibold truncate">{leftCard.title}</h3>
                  <p className="text-[11px] text-white/80 leading-snug line-clamp-2 mb-3 font-normal">
                    {leftCard.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/20">
                    <div>
                      <span className="text-[8px] tracking-wider font-bold uppercase text-white/70 block">{leftCard.priceLabel}</span>
                      <span className="text-lg font-extrabold text-white">{leftCard.price}</span>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider border border-white/30">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Card: Full Hero Width (col-span-6), Popped-Up Upright (0deg), Featured Height (h-[385px]), Highlight Border */}
            <div className="md:col-span-6 flex justify-center">
              <div
                key={`mid-${midCard.id}`}
                className="group relative w-full h-[385px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 z-20 hover:scale-[1.03] cursor-pointer flex flex-col justify-between p-6 bg-slate-900 border-[3px] border-[#14B8A6] ring-4 ring-[#14B8A6]/25"
                style={{ transform: 'rotate(0deg) translateY(0px) scale(1)' }}
              >
                <img
                  alt={midCard.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                  src={midCard.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-black/20 z-10"></div>
                <div className="relative z-20 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-xs shadow-md">
                    <span className="text-amber-500 text-xs">★</span> {midCard.rating} <span className="text-slate-500 font-medium">({midCard.reviews})</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 px-3.5 py-1 rounded-full ${midCard.tagBg} font-bold text-xs shadow-lg tracking-wide`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span> {midCard.tag}
                  </span>
                </div>
                <div className="relative z-20 mt-auto">
                  <span className="text-[10px] font-extrabold tracking-widest text-[#FCD34D] uppercase block mb-0.5">{midCard.country}</span>
                  <h3 className="text-2xl text-white leading-tight mb-1.5 tracking-tight font-serif font-semibold">{midCard.title}</h3>
                  <p className="text-xs text-white/90 leading-relaxed mb-4 font-normal">
                    {midCard.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div>
                      <span className="text-[9px] tracking-wider font-bold uppercase text-white/75 block">{midCard.priceLabel}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-[#FCD34D]">{midCard.price}</span>
                        <span className="text-xs text-white/80 font-medium">/ person</span>
                      </div>
                    </div>
                    <button className="px-6 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-600/50 active:scale-95">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Narrower Width (col-span-3), Curved Back (+8deg tilt), Opacity 0.8 */}
            <div className="md:col-span-3 flex justify-center">
              <div
                key={`right-${rightCard.id}`}
                onClick={handleNext}
                className="group relative w-full h-[335px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 z-10 hover:z-30 cursor-pointer flex flex-col justify-between p-4 bg-slate-900 border border-slate-200/20 opacity-80 hover:opacity-100 scale-90 hover:scale-95"
                style={{
                  transform: 'rotate(8deg) translateY(10px) translateZ(-40px)',
                  transformOrigin: 'left center'
                }}
              >
                <img
                  alt={rightCard.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                  src={rightCard.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-black/20 z-10"></div>
                <div className="relative z-20 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-[10px] shadow-sm">
                    <span className="text-amber-500 text-[10px]">★</span> {rightCard.rating}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full ${rightCard.tagBg} font-extrabold text-[10px] shadow-md tracking-wide`}>
                    {rightCard.tag}
                  </span>
                </div>
                <div className="relative z-20 mt-auto">
                  <span className="text-[9px] font-extrabold tracking-widest text-[#2DD4BF] uppercase block mb-0.5">{rightCard.country}</span>
                  <h3 className="text-lg text-white leading-tight mb-1 tracking-tight font-serif font-semibold truncate">{rightCard.title}</h3>
                  <p className="text-[11px] text-white/80 leading-snug line-clamp-2 mb-3 font-normal">
                    {rightCard.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/20">
                    <div>
                      <span className="text-[8px] tracking-wider font-bold uppercase text-white/70 block">{rightCard.priceLabel}</span>
                      <span className="text-lg font-extrabold text-white">{rightCard.price}</span>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider border border-white/30">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

