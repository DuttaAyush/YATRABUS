'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function Header() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Desktop hover for profile dropdown
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsProfileOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 180);
  };

  // Close menus on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menus on page navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const getHashHref = (hash) => {
    return pathname === '/bus-tickets' ? hash : `/bus-tickets${hash}`;
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-slate-950/75 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300">
      <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-5 lg:px-8 xl:px-10 h-16 sm:h-18 lg:h-20 min-h-[4rem] sm:min-h-[4.5rem] lg:min-h-[5rem] flex items-center justify-between gap-2 sm:gap-4 relative">
        
        {/* Left Side: Logo & Category Capsule */}
        <div className="flex items-center gap-3 xl:gap-5 shrink-0">
          <Link
            className="flex items-center gap-2 group transition-transform active:scale-95 shrink-0"
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="px-2 sm:px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-xl border border-white/30 shadow-md flex items-center justify-center">
              <img
                alt="YatraBus Logo"
                className="h-6 sm:h-7 w-auto object-contain"
                src="/images/logo.png"
              />
            </div>
          </Link>

          {/* Apple Frosted Glass Category Switcher Capsule (Visible >=1024px) */}
          <div className="hidden lg:flex items-center p-1 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-lg shrink-0">
            <Link
              className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3.5 py-1 xl:py-1.5 rounded-full font-semibold text-[11px] xl:text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
                pathname === '/bus-tickets'
                  ? 'bg-gradient-to-r from-red-600/90 to-brand-scarlet/90 text-white shadow-md border border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
              href="/bus-tickets"
            >
              <span className="material-symbols-outlined text-[14px] xl:text-[15px]">directions_bus</span>
              <span>Bus Tickets</span>
            </Link>
            <Link
              className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-full font-semibold text-[11px] xl:text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
                pathname === '/spiritual-yatra'
                  ? 'bg-gradient-to-r from-amber-600/90 to-amber-500/90 text-white shadow-md border border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
              href="/spiritual-yatra"
            >
              <span className="material-symbols-outlined text-[14px] xl:text-[15px]">temple_hindu</span>
              <span>Spiritual Yatras</span>
            </Link>
            <Link
              className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-full font-semibold text-[11px] xl:text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
                pathname === '/international-packages'
                  ? 'bg-gradient-to-r from-teal-600/90 to-teal-500/90 text-white shadow-md border border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
              href="/international-packages"
            >
              <span className="material-symbols-outlined text-[14px] xl:text-[15px]">flight_takeoff</span>
              <span>International</span>
            </Link>
            <Link
              className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-full font-semibold text-[11px] xl:text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
                pathname === '/india-local-packages'
                  ? 'bg-gradient-to-r from-emerald-600/90 to-emerald-500/90 text-white shadow-md border border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
              href="/india-local-packages"
            >
              <span className="material-symbols-outlined text-[14px] xl:text-[15px]">landscape</span>
              <span>India Local</span>
            </Link>
          </div>
        </div>

        {/* Center: Adaptive Navbar Text Links */}
        <Navbar />

        {/* Right Side: Profile Action Pill & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Profile Action Pill with Hover/Click Dropdown */}
          <div
            ref={profileRef}
            className="relative shrink-0 py-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/profile"
              onClick={() => setIsProfileOpen(false)}
              aria-expanded={isProfileOpen}
              aria-label="User profile and account menu"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full border border-white/30 bg-white/15 hover:bg-white/25 text-white backdrop-blur-xl font-bold text-[11px] sm:text-xs transition-all duration-200 shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <img
                alt="Profile Avatar"
                className="w-5 h-5 rounded-full object-cover ring-1 ring-white/40 shrink-0"
                src="/images/avatar.png"
              />
              <span className="hidden sm:inline">Profile</span>
              <span className={`material-symbols-outlined text-[14px] text-white/70 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </Link>

            {/* PROFILE DROPDOWN MENU */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 sm:w-64 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-2 z-50 animate-fadeIn space-y-1">
                {/* Profile User Badge Header */}
                <div className="px-3 py-2.5 border-b border-white/10 flex items-center gap-3">
                  <img
                    alt="Profile Avatar"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-scarlet/50 shrink-0"
                    src="/images/avatar.png"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Rajesh Patel</p>
                    <p className="text-[10px] text-slate-400 truncate">+91 98765 43210</p>
                  </div>
                </div>

                {/* Menu Links */}
                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-amber-400">directions_bus</span>
                  <span>Upcoming Trips</span>
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-teal-400">confirmation_number</span>
                  <span>View Tickets &amp; Bookings</span>
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-cyan-400">group</span>
                  <span>Saved Passengers</span>
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-purple-400">manage_accounts</span>
                  <span>Edit Profile &amp; Settings</span>
                </Link>

                <div className="border-t border-white/10 my-1" />

                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile & Tablet Hamburger Button (<1024px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md"
          >
            <span className="material-symbols-outlined text-[22px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE / TABLET SLIDE-DOWN NAVIGATION DRAWER (<1024px) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-18 bottom-0 bg-slate-950/95 backdrop-blur-2xl z-40 overflow-y-auto border-t border-white/10 animate-fadeIn">
          <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
            {/* User Profile Card Link */}
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-white/10 border border-white/15 text-white hover:bg-white/15 transition-all shadow-md"
            >
              <div className="flex items-center gap-3">
                <img
                  alt="Profile Avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-scarlet/50 shrink-0"
                  src="/images/avatar.png"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">Rajesh Patel</p>
                  <p className="text-[10px] text-slate-300 truncate">+91 98765 43210 • View Profile</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-slate-400">chevron_right</span>
            </Link>

            {/* 1. Travel Categories 2x2 Grid */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
                Travel Categories
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/bus-tickets"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex flex-col p-3 rounded-2xl border transition-all ${
                    pathname === '/bus-tickets'
                      ? 'bg-red-950/60 border-brand-scarlet text-white shadow-lg shadow-red-950/50'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">directions_bus</span>
                    </span>
                    {pathname === '/bus-tickets' && (
                      <span className="px-2 py-0.5 rounded-full bg-brand-scarlet text-white text-[9px] font-bold">Active</span>
                    )}
                  </div>
                  <span className="text-xs font-bold">Bus Tickets</span>
                  <span className="text-[10px] text-slate-400">Intercity AC Sleepers</span>
                </Link>

                <Link
                  href="/spiritual-yatra"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex flex-col p-3 rounded-2xl border transition-all ${
                    pathname === '/spiritual-yatra'
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg shadow-amber-950/50'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">temple_hindu</span>
                    </span>
                    {pathname === '/spiritual-yatra' && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-bold">Active</span>
                    )}
                  </div>
                  <span className="text-xs font-bold">Spiritual Yatras</span>
                  <span className="text-[10px] text-slate-400">Sacred Darshan &amp; Puja</span>
                </Link>

                <Link
                  href="/international-packages"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex flex-col p-3 rounded-2xl border transition-all ${
                    pathname === '/international-packages'
                      ? 'bg-teal-950/60 border-teal-500 text-white shadow-lg shadow-teal-950/50'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
                    </span>
                    {pathname === '/international-packages' && (
                      <span className="px-2 py-0.5 rounded-full bg-teal-500 text-white text-[9px] font-bold">Active</span>
                    )}
                  </div>
                  <span className="text-xs font-bold">International</span>
                  <span className="text-[10px] text-slate-400">Global Holidays</span>
                </Link>

                <Link
                  href="/india-local-packages"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex flex-col p-3 rounded-2xl border transition-all ${
                    pathname === '/india-local-packages'
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">landscape</span>
                    </span>
                    {pathname === '/india-local-packages' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold">Active</span>
                    )}
                  </div>
                  <span className="text-xs font-bold">India Local</span>
                  <span className="text-[10px] text-slate-400">Weekend Escapes</span>
                </Link>
              </div>
            </div>

            {/* 2. Explore Navigation Links */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                Explore YatraBus
              </p>
              <div className="space-y-1">
                <Link
                  href={getHashHref('#popularRoutesSection')}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all text-xs font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-red-400">alt_route</span>
                    <span>Popular Routes</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-slate-500">chevron_right</span>
                </Link>

                <Link
                  href="/packages"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all text-xs font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-amber-400">grid_view</span>
                    <span>Curated Packages</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-slate-500">chevron_right</span>
                </Link>

                <Link
                  href={getHashHref('#hospitalitySection')}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all text-xs font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-emerald-400">hotel</span>
                    <span>Hospitality &amp; Stays</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-slate-500">chevron_right</span>
                </Link>

                <Link
                  href={getHashHref('#advantageSection')}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all text-xs font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-teal-400">verified</span>
                    <span>Why YatraBus (0% Surcharge)</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-slate-500">chevron_right</span>
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all text-xs font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-purple-400">info</span>
                    <span>About Us</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-slate-500">chevron_right</span>
                </Link>

                <Link
                  href={getHashHref('#faqSection')}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all text-xs font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-cyan-400">help_center</span>
                    <span>FAQ &amp; Help Desk</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-slate-500">chevron_right</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all text-xs font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-brand-scarlet">mail</span>
                    <span>Contact Us</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-slate-500">chevron_right</span>
                </Link>
              </div>
            </div>

            {/* 3. Quick Utilities & Support */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-white">
                <span className="font-semibold text-slate-300">24/7 Helpline:</span>
                <a href="tel:18002099287" className="font-bold text-brand-scarlet hover:underline">
                  1800-209-9287
                </a>
              </div>
              <div className="flex items-center justify-between text-xs text-white">
                <span className="font-semibold text-slate-300">Fleet Direct:</span>
                <span className="text-emerald-400 font-bold">0% Booking Markup</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

