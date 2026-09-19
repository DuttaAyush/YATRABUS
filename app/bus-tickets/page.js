'use client';

import { useState } from 'react';
import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import SplitHero from '@/components/site/SplitHero';
import TrustBand from '@/components/site/TrustBand';
import StatsStrip from '@/components/site/StatsStrip';
import PopularRoutes from '@/components/site/PopularRoutes';
import OfferBanner from '@/components/site/OfferBanner';
import InternationalPackages from '@/components/site/InternationalPackages';
import SpiritualPackages from '@/components/site/SpiritualPackages';
import DomesticPackages from '@/components/site/DomesticPackages';
import Hospitality from '@/components/site/Hospitality';
import WhyYatraBus from '@/components/site/WhyYatraBus';
import Testimonials from '@/components/site/Testimonials';
import ContactForm from '@/components/site/ContactForm';
import Footer from '@/components/site/Footer';
import SeatDrawerModal from '@/components/site/SeatDrawerModal';
import SpotlightDestinations from '@/components/international/SpotlightDestinations';
import FAQ from '@/components/site/FAQ';

export default function BusTicketsPage() {
  const [isSeatDrawerOpen, setIsSeatDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans text-slate-800 antialiased relative">
      <Header />
      <main className="flex-1 relative">
        {/* Toggle between SplitHero and original Hero */}
        <SplitHero />
        {/* <Hero /> */}
        <div className="relative z-10 bg-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4rem] shadow-xl border-t border-slate-200 overflow-hidden">
          <TrustBand />
          <StatsStrip />
          <SpotlightDestinations />

          <PopularRoutes onOpenSeatDrawer={() => setIsSeatDrawerOpen(true)} />
          <OfferBanner />
          <InternationalPackages />
          <SpiritualPackages />
          <DomesticPackages />
          <WhyYatraBus />
          <Hospitality />
          <Testimonials />
          <ContactForm />
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
