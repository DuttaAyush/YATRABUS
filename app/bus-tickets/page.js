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
    <div className="min-h-screen flex flex-col bg-surface font-sans text-slate-800 antialiased">
      <Header />
      <main className="flex-1">
        <Hero />
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
      </main>
      <Footer />
      <SeatDrawerModal
        isOpen={isSeatDrawerOpen}
        onClose={() => setIsSeatDrawerOpen(false)}
      />
    </div>
  );
}
