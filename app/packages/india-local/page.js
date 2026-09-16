'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import PackageDetailModal from '@/components/site/PackageDetailModal';

const domesticCatalogPackages = [
  {
    id: 'himachal-manali',
    category: 'hills',
    title: 'Manali Snow Valley & Atal Tunnel Pass',
    duration: '5 Days / 4 Nights',
    daysCount: 5,
    destinations: 'Shimla • Kullu • Manali • Solang • Atal Tunnel',
    image: '/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_4.jpg',
    badge: 'Winter Snow Pass Included',
    description: 'Rejuvenating mountain escape featuring snow adventures in Solang Valley, drive through Atal Tunnel, Beas river rafting, and heated chalet stay.',
    tags: ['Heated Cedar Chalet', 'Solang Adventure', 'Kullu River Rafting', 'Bonfire Barbecue Night'],
    priceNum: 8499,
    price: '₹8,499'
  },
  {
    id: 'kerala-backwaters',
    category: 'coastal',
    title: 'Kerala Alleppey Lagoons & Munnar Tea Trails',
    duration: '5 Days / 4 Nights',
    daysCount: 5,
    destinations: 'Munnar • Thekkady • Alleppey Backwaters',
    image: '/images/yatrabus_india_local_holiday_travel_packages_3.jpg',
    badge: 'Private AC Houseboat Overnight',
    description: 'Sail through tranquil coconut palm lagoons in a luxury private AC houseboat, explore Munnar tea plantations, and visit Periyar spice gardens.',
    tags: ['Private AC Houseboat', 'Munnar Tea Estate Tour', 'Periyar Spice Garden', 'Traditional Sadya Lunch'],
    priceNum: 9499,
    price: '₹9,499'
  },
  {
    id: 'goa-coastal',
    category: 'coastal',
    title: 'Goa Coastal Villas & Catamaran Cruise',
    duration: '4 Days / 3 Nights',
    daysCount: 4,
    destinations: 'North Goa Beaches • South Goa Heritage • Mandovi',
    image: '/images/yatrabus_india_local_holiday_travel_packages_2.jpg',
    badge: 'Beachfront Resort & Watersports',
    description: 'Sun-kissed beach getaway with 4-star pool resort, water sports combo ticket, Mandovi river sunset cruise, and heritage Latin Quarter walks.',
    tags: ['Beachfront Resort', 'Catamaran Cruise', '5-in-1 Water Sports', 'Fontainhas Walk'],
    priceNum: 6999,
    price: '₹6,999'
  },
  {
    id: 'kashmir-gulmarg',
    category: 'hills',
    title: 'Kashmir Paradise Valley & Gulmarg Gondola',
    duration: '6 Days / 5 Nights',
    daysCount: 6,
    destinations: 'Srinagar • Gulmarg • Pahalgam • Sonmarg',
    image: '/images/yatrabus_india_local_holiday_travel_packages_1.jpg',
    badge: 'Luxury Dal Lake Houseboat Stay',
    description: 'Heaven on Earth journey with Shikara rides on Dal Lake, Phase 1 & 2 Gondola ride in snow-clad Gulmarg, and Betaab Valley pony rides.',
    tags: ['Dal Lake Shikara', 'Gulmarg Gondola Ride', 'Pahalgam Betaab Valley', 'Carved Cedar Houseboat'],
    priceNum: 14999,
    price: '₹14,999'
  },
  {
    id: 'rajasthan-royal',
    category: 'heritage',
    title: 'Rajasthan Royal Forts & Thar Desert Camp',
    duration: '6 Days / 5 Nights',
    daysCount: 6,
    destinations: 'Jaipur • Jodhpur • Jaisalmer Desert',
    image: '/images/yatrabus_india_local_holiday_travel_packages_4.jpg',
    badge: 'Camel Safari & Swiss Desert Tent',
    description: 'Immerse in royal grandeur with Amber Fort elephant ride, Jodhpur Mehrangarh Fort tour, and Jaisalmer desert camel safari with folk music night.',
    tags: ['Amber Fort Tour', 'Mehrangarh Fort', 'Desert Swiss Tent', 'Rajasthani Thali'],
    priceNum: 12850,
    price: '₹12,850'
  }
];

export default function DedicatedIndiaLocalCatalogPage() {
  const [budgetFilter, setBudgetFilter] = useState('all'); // 'all' | 'under8k' | '8k-12k' | 'above12k'
  const [durationFilter, setDurationFilter] = useState('all'); // 'all' | 'short' | 'medium' | 'long'
  const [vibeFilter, setVibeFilter] = useState('all'); // 'all' | 'hills' | 'coastal' | 'heritage'
  const [sortBy, setSortBy] = useState('cheapest'); // 'cheapest' | 'expensive' | 'duration-asc' | 'duration-desc'
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount =
    (vibeFilter !== 'all' ? 1 : 0) +
    (budgetFilter !== 'all' ? 1 : 0) +
    (durationFilter !== 'all' ? 1 : 0);

  const [selectedPkg, setSelectedPkg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPackages = domesticCatalogPackages.filter((pkg) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        pkg.title.toLowerCase().includes(q) ||
        pkg.destinations.toLowerCase().includes(q) ||
        pkg.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Vibe filter
    if (vibeFilter !== 'all' && pkg.category !== vibeFilter) {
      return false;
    }

    // Budget filter
    if (budgetFilter === 'under8k' && pkg.priceNum >= 8000) return false;
    if (budgetFilter === '8k-12k' && (pkg.priceNum < 8000 || pkg.priceNum > 12000)) return false;
    if (budgetFilter === 'above12k' && pkg.priceNum <= 12000) return false;

    // Duration filter
    if (durationFilter === 'short' && pkg.daysCount > 4) return false;
    if (durationFilter === 'medium' && (pkg.daysCount < 5 || pkg.daysCount > 6)) return false;
    if (durationFilter === 'long' && pkg.daysCount <= 6) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'cheapest') return a.priceNum - b.priceNum;
    if (sortBy === 'expensive') return b.priceNum - a.priceNum;
    if (sortBy === 'duration-asc') return a.daysCount - b.daysCount;
    if (sortBy === 'duration-desc') return b.daysCount - a.daysCount;
    return 0;
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

  const handleOpenDetails = (pkg) => {
    setSelectedPkg(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />

      {/* HERO BANNER - STICKY WITH PARALLAX ZOOM */}
      <div className="relative bg-slate-950 text-white pt-20 pb-28 sm:pt-24 sm:pb-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden min-h-[440px] sm:min-h-[500px] flex items-center justify-center sticky top-0 z-0">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            alt="India Local Holidays Banner"
            src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_4.jpg"
            className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
            style={{ transform: `scale(${scrollScale})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-emerald-900/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent" />
        </div>

        <div
          className="max-w-[1850px] w-full mx-auto relative z-10 text-center"
          style={{
            transform: `translateY(${isLoaded ? textY * 0.8 : 0}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: isLoaded && textY > 0
              ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
              : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out'
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 font-bold text-xs uppercase tracking-wider mb-3 border border-emerald-400/30">
            <span className="material-symbols-outlined text-[16px]">landscape</span>
            Domestic Retreats & Bus Connectivity
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight mb-3 max-w-4xl mx-auto leading-tight">
            India Local Holiday Packages
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Explore Himachal snow valleys, Kerala backwaters, Goa beach resorts & Rajasthan forts with direct BharatBenz & Volvo AC sleeper bus transit.
          </p>
        </div>
      </div>

      {/* FILTER SUITE & CATALOG CONTAINER - OVERLAPPING SHEET EFFECT */}
      <main className="relative z-10 bg-slate-50 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4rem] shadow-[0_-25px_60px_rgba(15,23,42,0.35)] border-t border-slate-200/80 -mt-12 sm:-mt-16 pt-10 sm:pt-14 pb-16 w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-8">
        
        {/* INTERACTIVE FILTER & SEARCH BAR */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-200/80 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="flex-1 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200 focus-within:border-emerald-600 focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-emerald-600 mr-3 text-[20px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search domestic packages (e.g. Manali, Kerala, Goa, Kashmir)..."
                className="w-full bg-transparent text-slate-900 font-bold text-sm outline-none p-0 border-0 focus:ring-0 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-700 text-xs font-bold px-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Right Controls: Sort By FIRST, then Filters SECOND */}
            <div className="flex items-center gap-2.5 shrink-0">
              
              {/* 1. Sort Dropdown (First) */}
              <div className="flex items-center gap-1.5">
                <label className="hidden sm:inline-block text-xs font-extrabold uppercase tracking-wider text-slate-500 whitespace-nowrap">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 font-bold text-xs text-slate-900 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="cheapest">Price: Low to High</option>
                  <option value="expensive">Price: High to Low</option>
                  <option value="duration-asc">Duration: Shortest First</option>
                  <option value="duration-desc">Duration: Longest First</option>
                </select>
              </div>

              {/* 2. Filters Dropdown Toggle Button (Second) */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-slate-600">tune</span>
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
                <span className={`material-symbols-outlined text-[18px] text-slate-500 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

            </div>
          </div>

          {/* COLLAPSIBLE FILTER CONTROLS GRID */}
          {isFilterOpen && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Select Filter Options
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setVibeFilter('all');
                      setBudgetFilter('all');
                      setDurationFilter('all');
                    }}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                    Reset Filters
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* 1. Vibe / Region Filter Pills */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Travel Vibe
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'All Regions' },
                      { id: 'hills', label: 'Snow Hills & Valleys' },
                      { id: 'coastal', label: 'Beaches & Backwaters' },
                      { id: 'heritage', label: 'Royal Forts & Desert' },
                    ].map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVibeFilter(v.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          vibeFilter === v.id
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Budget Filter Pills */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Budget per Person
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'All Budgets' },
                      { id: 'under8k', label: 'Under ₹8,000' },
                      { id: '8k-12k', label: '₹8,000 - ₹12,000' },
                      { id: 'above12k', label: 'Above ₹12,000' },
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBudgetFilter(b.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          budgetFilter === b.id
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Duration / Days Filter Pills */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Duration / Days
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'All Durations' },
                      { id: 'short', label: '1 - 4 Days' },
                      { id: 'medium', label: '5 - 6 Days' },
                      { id: 'long', label: '7+ Days' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDurationFilter(d.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          durationFilter === d.id
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* PACKAGE COUNTER BAR */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-slate-700">
            Showing <span className="text-emerald-700 font-extrabold">{filteredPackages.length}</span> India Local Packages
          </div>
          {(budgetFilter !== 'all' || durationFilter !== 'all' || vibeFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setBudgetFilter('all');
                setDurationFilter('all');
                setVibeFilter('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* CARDS GRID */}
        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-slate-300">filter_alt_off</span>
            <h3 className="text-lg font-bold text-slate-800">No domestic packages match your selected filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try broadening your budget range or travel vibe filter to discover domestic holiday retreats.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-emerald-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => handleOpenDetails(pkg)}>
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/30 pointer-events-none" />
                  <div className="absolute top-3.5 left-3.5 right-3.5 text-[11px] font-black uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] line-clamp-1">
                    {pkg.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-300 font-bold text-xs border border-emerald-400/30 shadow-md">
                    {pkg.duration}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-1 line-clamp-1">
                      📍 {pkg.destinations}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Starting From</span>
                      <span className="text-lg font-extrabold text-emerald-700">{pkg.price}</span>
                      <span className="text-[10px] text-slate-500 font-medium"> / person</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenDetails(pkg)}
                        className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors"
                      >
                        Details
                      </button>
                      <Link
                        href={`/customize-package/${pkg.id}`}
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                      >
                        Customize
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <PackageDetailModal
        pkg={selectedPkg}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPkg(null);
        }}
      />

      <Footer />
    </div>
  );
}
