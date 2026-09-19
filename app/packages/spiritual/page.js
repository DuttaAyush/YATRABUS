'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Testimonials from '@/components/site/Testimonials';
import PackageDetailModal from '@/components/site/PackageDetailModal';

const spiritualCatalogPackages = [
  {
    id: 'chardham',
    category: 'chardham',
    title: 'Char Dham Yatra & Haridwar Special',
    duration: '10 Days / 9 Nights',
    daysCount: 10,
    destinations: 'Kedarnath • Badrinath • Gangotri • Yamunotri',
    image: '/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg',
    badge: 'VIP Darshan & Helicopter Assist',
    description: 'Complete Himalayan circuit with 2x2 BharatBenz AC Pushback transit, verified warm Himalayan stays, hot Satvik meals, and medical oxygen kit onboard.',
    tags: ['Deluxe Stays', 'Pure Satvik Food', 'Har Ki Pauri Aarti', 'Helicopter Pass'],
    priceNum: 24499,
    price: '₹24,499'
  },
  {
    id: 'kashi-ayodhya',
    category: 'ayodhya-kashi',
    title: 'Ayodhya Shri Ram Mandir & Kashi Corridor',
    duration: '4 Days / 3 Nights',
    daysCount: 4,
    destinations: 'Ayodhya • Varanasi • Prayagraj Sangam',
    image: '/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_10.jpg',
    badge: 'Ram Lalla & Kashi Corridor Pass',
    description: 'Experience grand Ram Mandir darshan in Ayodhya, holy Triveni Sangam snan in Prayagraj, and private reserved boat for evening Varanasi Ganga Aarti.',
    tags: ['3★ AC Hotel', 'Ganga Boat Included', 'Sugam Darshan Entry', 'Banarasi Veg Thali'],
    priceNum: 6499,
    price: '₹6,499'
  },
  {
    id: 'tirupati-south',
    category: 'south',
    title: 'Tirupati Balaji & Meenakshi Amman',
    duration: '5 Days / 4 Nights',
    daysCount: 5,
    destinations: 'Tirupati • Madurai • Rameshwaram',
    image: '/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_11.jpg',
    badge: '₹300 Seeghra Darshan & Laddu Prasadam',
    description: 'Pre-booked Tirumala special entry darshan, tonsure assistance, holy snan at 22 teerthams of Rameshwaram, and Madurai Meenakshi temple guide.',
    tags: ['VIP Laddu Combo', 'Uphill AC Transit', '22 Teertham Snan', 'South Satvik Meals'],
    priceNum: 8950,
    price: '₹8,950'
  },
  {
    id: 'maharashtra-5jyotirlinga',
    category: 'jyotirlinga',
    title: 'Maharashtra 5 Jyotirlinga Darshan Circuit',
    duration: '7 Days / 6 Nights',
    daysCount: 7,
    destinations: 'Trimbak • Bhimashankar • Grishneshwar • Aundha • Parli',
    image: '/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_6.jpg',
    badge: 'Complete Maharashtra Shiv Teerth',
    description: 'Holy circumambulation covering all five sacred Jyotirlingas in Maharashtra with Shirdi Sai Baba darshan included. Pre-booked Rudrabhishek slots.',
    tags: ['Direct AC Sleeper', 'Pundit Escort', 'VIP Rudrabhishek', 'Shirdi Sai Darshan'],
    priceNum: 11499,
    price: '₹11,499'
  },
  {
    id: 'shirdi-express',
    category: 'shirdi',
    title: 'Shirdi Sai Baba & Shani Shingnapur Express',
    duration: '2 Days / 1 Night',
    daysCount: 2,
    destinations: 'Shirdi Samadhi • Dwarkamai • Shani Shingnapur',
    image: '/images/yatrabus_dedicated_spiritual_yatra_sacred_darshan_booking_refined_2.jpg',
    badge: 'Samadhi Mandir Kakad Aarti Pass',
    description: 'Short devotional getaway: Guaranteed morning Kakad Aarti entry pass, 100m walking-distance hotel from Gate No 2, and oil puja at Shani Shingnapur.',
    tags: ['Hotel Gate 2', 'Breakfast + Dinner', 'Early 6 AM Check-in'],
    priceNum: 2899,
    price: '₹2,899'
  },
  {
    id: 'somnath-dwarka',
    category: 'jyotirlinga',
    title: 'Gujarat Somnath-Dwarka & Nageshwar',
    duration: '4 Days / 3 Nights',
    daysCount: 4,
    destinations: 'Somnath • Dwarka • Bet Dwarka • Nageshwar',
    image: '/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_12.jpg',
    badge: 'Sound & Light Show + Dhwajarohan Assist',
    description: 'Somnath Jyotirlinga sea temple darshan with evening light show, Bet Dwarka ferry ride, Nageshwar Jyotirlinga Abhishek, and comfortable AC transit.',
    tags: ['Seafront Hotel', 'Gujarati Satvik Thali', 'Ferry Pass Included'],
    priceNum: 5850,
    price: '₹5,850'
  }
];

export default function DedicatedSpiritualCatalogPage() {
  const [budgetFilter, setBudgetFilter] = useState('all'); // 'all' | 'under7k' | '7k-15k' | 'above15k'
  const [durationFilter, setDurationFilter] = useState('all'); // 'all' | 'short' | 'medium' | 'long'
  const [themeFilter, setThemeFilter] = useState('all'); // 'all' | 'jyotirlinga' | 'chardham' | 'south' | 'ayodhya-kashi' | 'shirdi'
  const [sortBy, setSortBy] = useState('cheapest'); // 'cheapest' | 'expensive' | 'duration-asc' | 'duration-desc'
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount =
    (themeFilter !== 'all' ? 1 : 0) +
    (budgetFilter !== 'all' ? 1 : 0) +
    (durationFilter !== 'all' ? 1 : 0);

  const [selectedPkg, setSelectedPkg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPackages = spiritualCatalogPackages.filter((pkg) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        pkg.title.toLowerCase().includes(q) ||
        pkg.destinations.toLowerCase().includes(q) ||
        pkg.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Theme filter
    if (themeFilter !== 'all' && pkg.category !== themeFilter) {
      return false;
    }

    // Budget filter
    if (budgetFilter === 'under7k' && pkg.priceNum >= 7000) return false;
    if (budgetFilter === '7k-15k' && (pkg.priceNum < 7000 || pkg.priceNum > 15000)) return false;
    if (budgetFilter === 'above15k' && pkg.priceNum <= 15000) return false;

    // Duration filter
    if (durationFilter === 'short' && pkg.daysCount > 3) return false;
    if (durationFilter === 'medium' && (pkg.daysCount < 4 || pkg.daysCount > 7)) return false;
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
            alt="Spiritual Yatras Banner"
            src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg"
            className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
            style={{ transform: `scale(${scrollScale})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-amber-900/30 mix-blend-multiply" />
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md text-amber-300 font-bold text-xs uppercase tracking-wider mb-3 border border-amber-400/30">
            <span className="material-symbols-outlined text-[16px]">temple_hindu</span>
            Sacred Devsthans & Pilgrimage Network
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight mb-3 max-w-4xl mx-auto leading-tight">
            Spiritual Yatras & Darshan Packages
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Browse 12 Jyotirlinga, Char Dham, Ayodhya Ram Mandir & Tirupati packages with VIP line passes, pure Satvik dining, and guaranteed AC bus transit.
          </p>
        </div>
      </div>

      {/* FILTER SUITE & CATALOG CONTAINER - OVERLAPPING SHEET EFFECT */}
      <main className="relative z-10 bg-slate-50 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4rem] shadow-[0_-25px_60px_rgba(15,23,42,0.35)] border-t border-slate-200/80 -mt-12 sm:-mt-16 pt-10 sm:pt-14 pb-16 w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-8">
        
        {/* INTERACTIVE FILTER & SEARCH BAR */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-amber-200/80 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="flex-1 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200 focus-within:border-amber-600 focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-amber-600 mr-3 text-[20px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spiritual package (e.g. Kedarnath, Ayodhya, Tirupati)..."
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
                  className="bg-slate-50 font-bold text-xs text-slate-900 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-amber-600 cursor-pointer"
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
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-extrabold text-[10px] flex items-center justify-center">
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
                      setThemeFilter('all');
                      setBudgetFilter('all');
                      setDurationFilter('all');
                    }}
                    className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                    Reset Filters
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* 1. Theme Filter Pills */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Devsthan Circuit
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'All Teerthams' },
                      { id: 'jyotirlinga', label: '12 Jyotirlinga' },
                      { id: 'chardham', label: 'Char Dham' },
                      { id: 'ayodhya-kashi', label: 'Ayodhya & Kashi' },
                      { id: 'south', label: 'South Teerth' },
                      { id: 'shirdi', label: 'Shirdi Sai' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setThemeFilter(t.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          themeFilter === t.id
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {t.label}
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
                      { id: 'under7k', label: 'Under ₹7,000' },
                      { id: '7k-15k', label: '₹7,000 - ₹15,000' },
                      { id: 'above15k', label: 'Above ₹15,000' },
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBudgetFilter(b.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          budgetFilter === b.id
                            ? 'bg-amber-600 text-white shadow-sm'
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
                      { id: 'short', label: '1 - 3 Days' },
                      { id: 'medium', label: '4 - 7 Days' },
                      { id: 'long', label: '8+ Days' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDurationFilter(d.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          durationFilter === d.id
                            ? 'bg-amber-600 text-white shadow-sm'
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
            Showing <span className="text-amber-700 font-extrabold">{filteredPackages.length}</span> Spiritual Packages
          </div>
          {(budgetFilter !== 'all' || durationFilter !== 'all' || themeFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setBudgetFilter('all');
                setDurationFilter('all');
                setThemeFilter('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* CARDS GRID */}
        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-slate-300">filter_alt_off</span>
            <h3 className="text-lg font-bold text-slate-800">No spiritual packages match your selected filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try broadening your budget range or duration filter to discover divine teertham yatras.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-amber-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
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
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 font-bold text-xs border border-amber-400/30 shadow-md">
                    {pkg.duration}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors line-clamp-2">
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
                      <span className="text-lg font-extrabold text-amber-700">{pkg.price}</span>
                      <span className="text-[10px] text-slate-500 font-medium"> / person</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenDetails(pkg)}
                        className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs transition-colors"
                      >
                        Details
                      </button>
                      <Link
                        href={`/customize-package/${pkg.id}`}
                        className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-sm"
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
