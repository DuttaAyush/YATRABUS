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
    <div className="bg-[#FBFDFD] font-sans text-slate-800 antialiased min-h-screen">
      <Header />
      <main>
        <InternationalHero />
        <InternationalTrustBand />
        <SpotlightDestinations />
        <HowItWorks />
        <InternationalCatalog />
        <FixedDepartures />
        <InternationalBlueprint />
        <TravelerStories />
        <InternationalFAQ />
      </main>
      <Footer />
    </div>
  );
}
