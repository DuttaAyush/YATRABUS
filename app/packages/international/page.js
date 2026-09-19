'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Testimonials from '@/components/site/Testimonials';
import PackageDetailModal from '@/components/site/PackageDetailModal';

const internationalCatalogPackages = [
  {
    id: 'dubai-marina',
    category: 'middle-east',
    title: 'Dubai Desert Safari & Marina Skyline',
    duration: '5 Days / 4 Nights',
    daysCount: 5,
    destinations: 'Dubai • Abu Dhabi • Desert Safari',
    image: '/images/yatrabus_international_holiday_travel_packages_1.jpg',
    badge: '4-Star Marina Hotel & Visa Included',
    description: 'Bask in luxury with Burj Khalifa 124th floor entry, 4x4 Dune Bashing, BBQ Desert Camp with Tanoura Show, and Dhow Cruise Marina Dinner.',
    tags: ['Burj Khalifa 124th Floor', 'Dhow Dinner Cruise', '4x4 Desert Safari', 'Instant Express eVisa'],
    priceNum: 48999,
    price: '₹48,999'
  },
  {
    id: 'singapore-malaysia',
    category: 'asia',
    title: 'Singapore Gardens & Genting Highlands',
    duration: '7 Days / 6 Nights',
    daysCount: 7,
    destinations: 'Singapore • Kuala Lumpur • Genting Highlands',
    image: '/images/yatrabus_international_holiday_travel_packages_2.jpg',
    badge: 'Universal Studios & Cable Car Pass',
    description: 'Thrilling dual-country expedition featuring Universal Studios Singapore, Gardens by the Bay, Night Safari, Batu Caves, and Genting Cable Car.',
    tags: ['Universal Studios Pass', 'Gardens by the Bay', 'Genting Cable Car', 'Dual Country Transfers'],
    priceNum: 62500,
    price: '₹62,500'
  },
  {
    id: 'thailand-phuket',
    category: 'asia',
    title: 'Thailand Phuket & Krabi Beach Getaway',
    duration: '6 Days / 5 Nights',
    daysCount: 6,
    destinations: 'Phuket • Phi Phi Islands • Krabi 4-Islands',
    image: '/images/yatrabus_international_holiday_travel_packages_3.jpg',
    badge: 'Speedboat Island Hopping & Coral Reefs',
    description: 'Tropical getaway to Phi Phi Islands by speedboat, Maya Bay snorkeling, James Bond Island tour, beachfront pool resort, and authentic Thai dining.',
    tags: ['Phi Phi Speedboat Tour', 'Maya Bay Snorkeling', '4-Star Beach Resort', 'Indian Buffet Breakfast'],
    priceNum: 34999,
    price: '₹34,999'
  },
  {
    id: 'bali-ubud',
    category: 'asia',
    title: 'Bali Tropical Villa & Nusa Penida Island',
    duration: '6 Days / 5 Nights',
    daysCount: 6,
    destinations: 'Seminyak • Ubud • Kintamani • Nusa Penida',
    image: '/images/yatrabus_international_holiday_travel_packages_4.jpg',
    badge: 'Private Pool Villa & Floating Breakfast',
    description: 'Enchanting Balinese vacation with private pool villa stay, Kintamani Volcano view lunch, Bali Swing experience, and Nusa Penida West island tour.',
    tags: ['Private Pool Villa', 'Nusa Penida Boat Tour', 'Bali Jungle Swing', 'Kintamani Volcano Lunch'],
    priceNum: 42800,
    price: '₹42,800'
  },
  {
    id: 'europe-grand',
    category: 'europe',
    title: 'Europe Highlights & Swiss Alps Explorer',
    duration: '9 Days / 8 Nights',
    daysCount: 9,
    destinations: 'Paris • Lucerne • Zurich • Titlis',
    image: '/images/yatrabus_international_holiday_travel_packages_5.jpg',
    badge: 'Mount Titlis Cable Car & Seine Cruise',
    description: 'Classic European tour covering Eiffel Tower 2nd level, Seine River Cruise, Mt. Titlis Rotair Cable Car, Zurich Lake, and Schengen Visa Assistance.',
    tags: ['Eiffel Tower Entry', 'Swiss Rail Pass', 'Mt Titlis Cable Car', 'Schengen Visa Escort'],
    priceNum: 119999,
    price: '₹1,19,999'
  }
];

export default function DedicatedInternationalCatalogPage() {
  const [budgetFilter, setBudgetFilter] = useState('all'); // 'all' | 'under40k' | '40k-60k' | 'above60k'
  const [durationFilter, setDurationFilter] = useState('all'); // 'all' | 'short' | 'medium' | 'long'
  const [regionFilter, setRegionFilter] = useState('all'); // 'all' | 'middle-east' | 'asia' | 'europe'
  const [sortBy, setSortBy] = useState('cheapest'); // 'cheapest' | 'expensive' | 'duration-asc' | 'duration-desc'
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount =
    (regionFilter !== 'all' ? 1 : 0) +
    (budgetFilter !== 'all' ? 1 : 0) +
    (durationFilter !== 'all' ? 1 : 0);

  const [selectedPkg, setSelectedPkg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPackages = internationalCatalogPackages.filter((pkg) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        pkg.title.toLowerCase().includes(q) ||
        pkg.destinations.toLowerCase().includes(q) ||
        pkg.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Region filter
    if (regionFilter !== 'all' && pkg.category !== regionFilter) {
      return false;
    }

    // Budget filter
    if (budgetFilter === 'under40k' && pkg.priceNum >= 40000) return false;
    if (budgetFilter === '40k-60k' && (pkg.priceNum < 40000 || pkg.priceNum > 60000)) return false;
    if (budgetFilter === 'above60k' && pkg.priceNum <= 60000) return false;

    // Duration filter
    if (durationFilter === 'short' && pkg.daysCount > 5) return false;
    if (durationFilter === 'medium' && (pkg.daysCount < 6 || pkg.daysCount > 7)) return false;
    if (durationFilter === 'long' && pkg.daysCount <= 7) return false;

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
            alt="International Holidays Banner"
            src="/images/yatrabus_international_holiday_travel_packages_1.jpg"
            className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
            style={{ transform: `scale(${scrollScale})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-teal-900/30 mix-blend-multiply" />
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 backdrop-blur-md text-teal-300 font-bold text-xs uppercase tracking-wider mb-3 border border-teal-400/30">
            <span className="material-symbols-outlined text-[16px]">flight_takeoff</span>
            Worldwide Vacations & Visa Assistance
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight mb-3 max-w-4xl mx-auto leading-tight">
            International Holiday Packages
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Explore Dubai, Singapore, Thailand, Bali & Europe with flights, express visa assistance, 4★/5★ hotels, and guaranteed airport transfers.
          </p>
        </div>
      </div>

      {/* FILTER SUITE & CATALOG CONTAINER - OVERLAPPING SHEET EFFECT */}
      <main className="relative z-10 bg-slate-50 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4rem] shadow-[0_-25px_60px_rgba(15,23,42,0.35)] border-t border-slate-200/80 -mt-12 sm:-mt-16 pt-10 sm:pt-14 pb-16 w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-8">
        
        {/* INTERACTIVE FILTER & SEARCH BAR */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-teal-200/80 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="flex-1 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200 focus-within:border-teal-600 focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-teal-600 mr-3 text-[20px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search overseas packages (e.g. Dubai, Singapore, Bali, Europe)..."
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
                  className="bg-slate-50 font-bold text-xs text-slate-900 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-teal-600 cursor-pointer"
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
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-extrabold text-[10px] flex items-center justify-center">
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
                      setRegionFilter('all');
                      setBudgetFilter('all');
                      setDurationFilter('all');
                    }}
                    className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                    Reset Filters
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* 1. Region Filter Pills */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Destination Region
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'All Overseas' },
                      { id: 'middle-east', label: 'Middle East (Dubai)' },
                      { id: 'asia', label: 'Southeast Asia' },
                      { id: 'europe', label: 'Europe Classic' },
                    ].map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRegionFilter(r.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          regionFilter === r.id
                            ? 'bg-teal-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {r.label}
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
                      { id: 'under40k', label: 'Under ₹40,000' },
                      { id: '40k-60k', label: '₹40,000 - ₹60,000' },
                      { id: 'above60k', label: 'Above ₹60,000' },
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBudgetFilter(b.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          budgetFilter === b.id
                            ? 'bg-teal-600 text-white shadow-sm'
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
                      { id: 'short', label: '3 - 5 Days' },
                      { id: 'medium', label: '6 - 7 Days' },
                      { id: 'long', label: '8+ Days' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDurationFilter(d.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          durationFilter === d.id
                            ? 'bg-teal-600 text-white shadow-sm'
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
            Showing <span className="text-teal-700 font-extrabold">{filteredPackages.length}</span> International Packages
          </div>
          {(budgetFilter !== 'all' || durationFilter !== 'all' || regionFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setBudgetFilter('all');
                setDurationFilter('all');
                setRegionFilter('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-teal-700 hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* CARDS GRID */}
        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-slate-300">filter_alt_off</span>
            <h3 className="text-lg font-bold text-slate-800">No international packages match your selected filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try broadening your budget range or duration filter to discover international holiday escapes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-teal-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
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
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 font-bold text-xs border border-teal-400/30 shadow-md">
                    {pkg.duration}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors line-clamp-2">
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
                      <span className="text-lg font-extrabold text-teal-700">{pkg.price}</span>
                      <span className="text-[10px] text-slate-500 font-medium"> / person</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenDetails(pkg)}
                        className="px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs transition-colors"
                      >
                        Details
                      </button>
                      <Link
                        href={`/customize-package/${pkg.id}`}
                        className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-sm"
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

      <Testimonials />

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
