'use client';

import { useState } from 'react';
import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import TrustBand from '@/components/site/TrustBand';
import StatsStrip from '@/components/site/StatsStrip';
import PopularRoutes from '@/components/site/PopularRoutes';
import InternationalPackages from '@/components/site/InternationalPackages';
import SpiritualPackages from '@/components/site/SpiritualPackages';
import DomesticPackages from '@/components/site/DomesticPackages';
import Hospitality from '@/components/site/Hospitality';
import WhyYatraBus from '@/components/site/WhyYatraBus';
import Testimonials from '@/components/site/Testimonials';
import FAQ from '@/components/site/FAQ';
import Footer from '@/components/site/Footer';
import SeatDrawerModal from '@/components/site/SeatDrawerModal';

export default function BusTicketsPage() {
  const [isSeatDrawerOpen, setIsSeatDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans text-slate-800 antialiased relative">
      <Header />
      <main className="flex-1 relative">
        <Hero />
        <div className="relative z-10 bg-surface rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4rem] shadow-[0_-25px_60px_rgba(15,23,42,0.35)] border-t border-white/60 pt-8">
          <TrustBand />
          <StatsStrip />
          <PopularRoutes onOpenSeatDrawer={() => setIsSeatDrawerOpen(true)} />
          <InternationalPackages />
          <SpiritualPackages />
          <DomesticPackages />
          <Hospitality />
          <WhyYatraBus />
          <Testimonials />
          <FAQ />
        </div>
      </main>
      <Footer />
      <SeatDrawerModal
        isOpen={isSeatDrawerOpen}
        onClose={() => setIsSeatDrawerOpen(false)}
      />
    </div>
  );
}
