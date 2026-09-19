'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const getHref = (hash) => {
    return pathname === '/bus-tickets' ? hash : `/bus-tickets${hash}`;
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsMoreOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMoreOpen(false);
    }, 180);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMoreOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5 2xl:gap-6 text-xs xl:text-[13px] 2xl:text-sm font-semibold text-white/90 tracking-wide">
      {/* 1. Popular Routes */}
      <Link
        className="hover:text-white transition-colors duration-200 py-1 px-1.5 flex items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10"
        href={getHref('#popularRoutesSection')}
      >
        <span>Popular Routes</span>
      </Link>

      {/* 2. Curated Packages */}
      <Link
        className={`hover:text-white transition-colors duration-200 py-1 px-1.5 flex items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10 ${
          pathname.startsWith('/packages') ? 'text-brand-scarlet font-bold' : ''
        }`}
        href="/packages"
      >
        <span>Curated Packages</span>
      </Link>

      {/* 3. Hospitality (Visible on 2xl / >=1440px, grouped under More on intermediate screens) */}
      <Link
        className="hidden 2xl:flex hover:text-white transition-colors duration-200 py-1 px-1.5 items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10"
        href={getHref('#hospitalitySection')}
      >
        <span>Hospitality</span>
      </Link>

      {/* 4. Why YatraBus */}
      <Link
        className="hover:text-white transition-colors duration-200 py-1 px-1.5 flex items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10"
        href={getHref('#advantageSection')}
      >
        <span>Why YatraBus</span>
      </Link>

      {/* 5. About Us */}
      <Link
        className={`hover:text-white transition-colors duration-200 py-1 px-1.5 flex items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10 ${
          pathname === '/about' ? 'text-brand-scarlet font-bold' : ''
        }`}
        href="/about"
      >
        <span>About Us</span>
      </Link>

      {/* 6. FAQ (Visible on 2xl / >=1440px, grouped under More on intermediate screens) */}
      <Link
        className="hidden 2xl:flex hover:text-white transition-colors duration-200 py-1 px-1.5 items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10"
        href={getHref('#faqSection')}
      >
        <span>FAQ</span>
      </Link>

      {/* 7. Contact Us */}
      <Link
        className={`hover:text-white transition-colors duration-200 py-1 px-1.5 flex items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10 ${
          pathname === '/contact' ? 'text-brand-scarlet font-bold' : ''
        }`}
        href="/contact"
      >
        <span>Contact Us</span>
      </Link>

      {/* "More ▾" Dropdown for Intermediate Viewports (1024px - 1439px / High Browser Zoom) */}
      <div
        ref={moreRef}
        className="relative 2xl:hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          aria-expanded={isMoreOpen}
          aria-label="More navigation options"
          className="hover:text-white transition-colors duration-200 py-1 px-2 flex items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10 cursor-pointer text-white/85"
        >
          <span>More</span>
          <span
            className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
              isMoreOpen ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </button>

        {isMoreOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-48 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-2 z-50 animate-fadeIn space-y-1">
            <Link
              href={getHref('#hospitalitySection')}
              onClick={() => setIsMoreOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all"
            >
              <span className="material-symbols-outlined text-[17px] text-amber-400">hotel</span>
              <span>Hospitality &amp; Stays</span>
            </Link>

            <Link
              href={getHref('#faqSection')}
              onClick={() => setIsMoreOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all"
            >
              <span className="material-symbols-outlined text-[17px] text-teal-400">help_center</span>
              <span>FAQ &amp; Help</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
