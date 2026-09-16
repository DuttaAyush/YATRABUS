'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function Header() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsProfileOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 180);
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 h-20 flex items-center justify-between gap-4 flex-nowrap">
        {/* Left Side: Logo & Category Capsule */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          <Link className="flex items-center gap-2 group transition-transform active:scale-95 shrink-0" href="/">
            <div className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-xl border border-white/30 shadow-md flex items-center justify-center">
              <img
                alt="YatraBus Logo"
                className="h-7 w-auto object-contain"
                src="/images/logo.png"
              />
            </div>
          </Link>

          {/* Apple Frosted Glass Category Switcher Capsule */}
          <div className="hidden xl:flex items-center p-1 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-lg shrink-0">
            <Link
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
                pathname === '/bus-tickets'
                  ? 'bg-gradient-to-r from-red-600/90 to-brand-scarlet/90 text-white shadow-md border border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
              href="/bus-tickets"
            >
              <span className="material-symbols-outlined text-[15px]">directions_bus</span>
              <span>Bus Tickets</span>
            </Link>
            <Link
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
                pathname === '/spiritual-yatra'
                  ? 'bg-gradient-to-r from-amber-600/90 to-amber-500/90 text-white shadow-md border border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
              href="/spiritual-yatra"
            >
              <span className="material-symbols-outlined text-[15px]">temple_hindu</span>
              <span>Spiritual Yatras</span>
            </Link>
            <Link
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
                pathname === '/international-packages'
                  ? 'bg-gradient-to-r from-teal-600/90 to-teal-500/90 text-white shadow-md border border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
              href="/international-packages"
            >
              <span className="material-symbols-outlined text-[15px]">flight_takeoff</span>
              <span>International</span>
            </Link>
            <Link
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
                pathname === '/india-local-packages'
                  ? 'bg-gradient-to-r from-emerald-600/90 to-emerald-500/90 text-white shadow-md border border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
              href="/india-local-packages"
            >
              <span className="material-symbols-outlined text-[15px]">landscape</span>
              <span>India Local</span>
            </Link>
          </div>
        </div>

        {/* Center: Navbar Text Links */}
        <Navbar />

        {/* Right Side: Profile Action Pill with Hover Dropdown */}
        <div
          className="relative shrink-0 py-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/30 bg-white/15 hover:bg-white/25 text-white backdrop-blur-xl font-bold text-xs transition-all duration-200 shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
            href="/profile"
          >
            <img
              alt="Profile Avatar"
              className="w-5 h-5 rounded-full object-cover ring-1 ring-white/40 shrink-0"
              src="/images/avatar.png"
            />
            <span>Profile</span>
            <span className={`material-symbols-outlined text-[14px] text-white/70 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </Link>

          {/* HOVER DROPDOWN MENU */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-2 z-50 animate-fadeIn space-y-1">
              
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
                <span>View Tickets & Bookings</span>
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
                <span>Edit Profile & Settings</span>
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
      </div>
    </header>
  );
}
