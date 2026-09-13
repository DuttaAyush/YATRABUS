'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function Header() {
  const pathname = usePathname();

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
                pathname === '/bus-tickets' || pathname === '/explore'
                  ? 'bg-gradient-to-r from-red-600/90 to-brand-scarlet/90 text-white shadow-md border border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
              href="/bus-tickets"
            >
              <span className="material-symbols-outlined text-[15px]">directions_bus</span>
              <span>Bus Tickets</span>
            </Link>
            <Link
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
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

        {/* Right Side: Profile Action Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/30 bg-white/15 hover:bg-white/25 text-white backdrop-blur-xl font-bold text-xs transition-all duration-200 shadow-md active:scale-95 whitespace-nowrap"
            href="#"
          >
            <span className="material-symbols-outlined text-[16px]">account_circle</span>
            <span>Profile</span>
            <span className="material-symbols-outlined text-[14px] text-white/60">expand_more</span>
          </Link>
          <img
            alt="Profile Avatar"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30 shadow-md shrink-0"
            src="/images/avatar.png"
          />
        </div>
      </div>
    </header>
  );
}
