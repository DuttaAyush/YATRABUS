'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SplitLanding() {
  const router = useRouter();
  const [expandingState, setExpandingState] = useState(null); // 'domestic' | 'international' | null

  const handleDomesticActivation = (e, targetPath = '/india-local-packages') => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (expandingState) return;

    setExpandingState('domestic');
    setTimeout(() => {
      router.push(targetPath);
    }, 900);
  };

  const handleIntlActivation = (e, targetPath = '/international-packages') => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (expandingState) return;

    setExpandingState('international');
    setTimeout(() => {
      router.push(targetPath);
    }, 900);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* Top Floating Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between pointer-events-auto">
        <Link href="/explore" className="flex items-center gap-3 group">
          <div className="h-11 px-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg flex items-center gap-2 transition-transform group-hover:scale-105">
            <img src="/images/logo.png" alt="YatraBus Logo" className="h-7 w-auto object-contain" />
            <span className="font-serif font-bold text-slate-900 text-sm tracking-tight hidden sm:inline">
              Yatra<span className="text-brand-scarlet">Bus</span>
            </span>
          </div>
        </Link>

        {/* Center Quick Navigation Pills */}
        <div className="hidden lg:flex items-center p-1.5 bg-slate-950/70 backdrop-blur-xl rounded-full border border-white/15 shadow-2xl gap-1">
          <Link
            href="/bus-tickets"
            className="px-4 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 font-bold text-xs tracking-wide transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-red-400">directions_bus</span>
            <span>Bus Tickets</span>
          </Link>
          <Link
            href="/spiritual-yatra"
            className="px-4 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 font-bold text-xs tracking-wide transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-amber-400">temple_hindu</span>
            <span>Spiritual Yatras</span>
          </Link>
          <Link
            href="/india-local-packages"
            className="px-4 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 font-bold text-xs tracking-wide transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-400">landscape</span>
            <span>India Local</span>
          </Link>
          <Link
            href="/international-packages"
            className="px-4 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 font-bold text-xs tracking-wide transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-teal-400">flight_takeoff</span>
            <span>International</span>
          </Link>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/explore"
            className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-extrabold text-xs uppercase tracking-wider border border-white/20 transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span>Explore All</span>
          </Link>
        </div>
      </header>

      {/* Main Split Landing Container */}
      <div
        id="split-landing"
        role="main"
        className={`split-landing ${expandingState ? 'is-expanded' : ''}`}
      >
        {/* DOMESTIC PANEL */}
        <div
          id="panel-domestic"
          role="button"
          tabIndex={0}
          aria-label="Explore Domestic Journeys"
          onClick={(e) => handleDomesticActivation(e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleDomesticActivation(e);
            }
          }}
          className={`panel panel--domestic ${
            expandingState === 'domestic' ? 'is-expanding' : ''
          } ${expandingState === 'international' ? 'is-hiding' : ''}`}
        >
          <img
            className="panel__bg"
            src="/images/domestic-hero.jpg"
            alt="Ancient Indian Taj Mahal bathed in golden sunrise light"
            loading="eager"
          />
          <div className="panel__overlay"></div>

          <div className="panel__content">
            <div className="panel__label">
              <span className="material-symbols-outlined text-[16px] text-amber-400">temple_hindu</span>
              <span>Bharat &amp; Spiritual Yatras</span>
            </div>

            <h1 className="panel__heading">
              Sacred Yatras &amp; Intercity Bus Network
            </h1>

            <p className="panel__description">
              Daily luxury BharatBenz AC sleeper coaches, VIP Temple Darshan passes, verified Satvik dining, and handpicked local escapes across India.
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-6 pointer-events-auto">
              <button
                onClick={(e) => handleDomesticActivation(e, '/spiritual-yatra')}
                className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold hover:bg-amber-500/30 transition-all"
              >
                🛕 Spiritual Circuits
              </button>
              <button
                onClick={(e) => handleDomesticActivation(e, '/india-local-packages')}
                className="px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-red-200 text-xs font-bold hover:bg-red-500/30 transition-all"
              >
                🚍 Bus &amp; Local Escapes
              </button>
            </div>

            <div className="pt-2">
              <button
                id="cta-domestic"
                onClick={(e) => handleDomesticActivation(e, '/india-local-packages')}
                className="btn btn-primary panel__cta shadow-lg shadow-red-600/30 flex items-center gap-2"
              >
                <span>EXPLORE INDIA</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* INTERNATIONAL PANEL */}
        <div
          id="panel-international"
          role="button"
          tabIndex={0}
          aria-label="Explore International Journeys"
          onClick={(e) => handleIntlActivation(e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleIntlActivation(e);
            }
          }}
          className={`panel panel--international ${
            expandingState === 'international' ? 'is-expanding' : ''
          } ${expandingState === 'domestic' ? 'is-hiding' : ''}`}
        >
          <img
            className="panel__bg panel__bg--intl"
            src="/images/international.jpg"
            alt="Breathtaking sunset view over the caldera in Oia, Santorini"
            loading="eager"
          />
          <div className="panel__overlay"></div>

          {/* Decorative Travel Globe Pattern */}
          <div className="panel__intl-decor" aria-hidden="true">
            <svg
              className="panel__intl-globe"
              width="280"
              height="280"
              viewBox="0 0 280 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.08 }}
            >
              <circle cx="140" cy="140" r="138" stroke="currentColor" strokeWidth="0.5" />
              <ellipse cx="140" cy="140" rx="90" ry="138" stroke="currentColor" strokeWidth="0.5" />
              <ellipse cx="140" cy="140" rx="45" ry="138" stroke="currentColor" strokeWidth="0.5" />
              <line x1="2" y1="140" x2="278" y2="140" stroke="currentColor" strokeWidth="0.5" />
              <ellipse cx="140" cy="80" rx="120" ry="20" stroke="currentColor" strokeWidth="0.5" />
              <ellipse cx="140" cy="200" rx="120" ry="20" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="panel__content">
            <div className="panel__label">
              <span>Worldwide Holidays</span>
              <span className="material-symbols-outlined text-[16px] text-teal-400">flight_takeoff</span>
            </div>

            <h1 className="panel__heading">
              Luxury Overseas Escapes &amp; Visas
            </h1>

            <p className="panel__description">
              Handpicked 5★ stays, fast-track visas, guaranteed Indian vegetarian/Jain cuisine, and private guided sightseeing worldwide.
            </p>

            <div className="flex flex-wrap items-center justify-end gap-2 mb-6 pointer-events-auto">
              <button
                onClick={(e) => handleIntlActivation(e, '/international-packages#destinations')}
                className="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-200 text-xs font-bold hover:bg-teal-500/30 transition-all"
              >
                🌴 Dubai &amp; Bali
              </button>
              <button
                onClick={(e) => handleIntlActivation(e, '/international-packages#packages')}
                className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs font-bold hover:bg-cyan-500/30 transition-all"
              >
                🏰 Swiss &amp; Santorini
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                id="cta-international"
                onClick={(e) => handleIntlActivation(e, '/international-packages')}
                className="btn btn-secondary panel__cta shadow-lg shadow-teal-500/20 flex items-center gap-2"
              >
                <span>EXPLORE GLOBAL</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Diagonal Edge Decorator */}
        <div className="split-landing__edge" aria-hidden="true"></div>
      </div>
    </div>
  );
}
