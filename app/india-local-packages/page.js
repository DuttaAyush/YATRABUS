import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import IndiaLocalHero from '@/components/india-local/IndiaLocalHero';
import IndiaLocalTrustBand from '@/components/india-local/IndiaLocalTrustBand';
import SpotlightDomesticDestinations from '@/components/india-local/SpotlightDomesticDestinations';
import IndiaLocalHowItWorks from '@/components/india-local/IndiaLocalHowItWorks';
import IndiaLocalCatalog from '@/components/india-local/IndiaLocalCatalog';
import IndiaLocalFixedDepartures from '@/components/india-local/IndiaLocalFixedDepartures';
import IndiaLocalBlueprint from '@/components/india-local/IndiaLocalBlueprint';
import IndiaLocalStories from '@/components/india-local/IndiaLocalStories';
import IndiaLocalFAQ from '@/components/india-local/IndiaLocalFAQ';

export const metadata = {
  title: 'YatraBus - India (Local) Holiday & Travel Packages',
  description: 'Curated domestic holiday packages across coastal retreats, serene backwaters, and misty Himalayan valleys.'
};

export default function IndiaLocalPackagesPage() {
  return (
    <div className="bg-[#FCFDFD] font-sans text-slate-800 antialiased min-h-screen">
      <Header />
      <main>
        <IndiaLocalHero />
        <IndiaLocalTrustBand />
        <SpotlightDomesticDestinations />
        <IndiaLocalHowItWorks />
        <IndiaLocalCatalog />
        <IndiaLocalFixedDepartures />
        <IndiaLocalBlueprint />
        <IndiaLocalStories />
        <IndiaLocalFAQ />
      </main>
      <Footer />
    </div>
  );
}
