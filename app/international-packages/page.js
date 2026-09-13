import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import InternationalHero from '@/components/international/InternationalHero';
import InternationalTrustBand from '@/components/international/InternationalTrustBand';
import SpotlightDestinations from '@/components/international/SpotlightDestinations';
import HowItWorks from '@/components/international/HowItWorks';
import InternationalCatalog from '@/components/international/InternationalCatalog';
import FixedDepartures from '@/components/international/FixedDepartures';
import InternationalBlueprint from '@/components/international/InternationalBlueprint';
import TravelerStories from '@/components/international/TravelerStories';
import InternationalFAQ from '@/components/international/InternationalFAQ';

export const metadata = {
  title: 'YatraBus - International Holiday & Travel Packages',
  description: 'Personalized worldwide holiday packages with flights, handpicked stays, visa assistance, and Indian culinary experiences.'
};

export default function InternationalPackagesPage() {
  return (
    <div className="bg-slate-950 font-sans text-slate-800 antialiased min-h-screen relative flex flex-col">
      <Header />
      <main className="flex-1 relative">
        <InternationalHero />
        <div className="relative z-10 bg-[#FBFDFD] rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4rem] shadow-[0_-25px_60px_rgba(15,23,42,0.35)] border-t border-white/60 pt-8">
          <InternationalTrustBand />
          <SpotlightDestinations />
          <HowItWorks />
          <InternationalCatalog />
          <FixedDepartures />
          <InternationalBlueprint />
          <TravelerStories />
          <InternationalFAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}
