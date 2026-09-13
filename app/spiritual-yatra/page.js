import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import SpiritualHero from '@/components/spiritual/SpiritualHero';
import DevsthanRoutes from '@/components/spiritual/DevsthanRoutes';
import UpcomingBatches from '@/components/spiritual/UpcomingBatches';
import YatraCatalog from '@/components/spiritual/YatraCatalog';
import DayWiseBlueprints from '@/components/spiritual/DayWiseBlueprints';
import DevoteeCare from '@/components/spiritual/DevoteeCare';
import SpiritualFAQ from '@/components/spiritual/SpiritualFAQ';

export const metadata = {
  title: "Spiritual Yatra & Sacred Darshan Booking | YatraBus",
  description: "Book 12 Jyotirlinga, Char Dham, Shirdi Sai Baba, and Ayodhya Ram Mandir spiritual yatras with direct AC sleeper buses, VIP Darshan passes, and pure Satvik meals.",
};

export default function SpiritualYatraPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] font-sans text-slate-800 antialiased">
      <Header />
      <main className="flex-1">
        <SpiritualHero />
        <DevsthanRoutes />
        <UpcomingBatches />
        <YatraCatalog />
        <DayWiseBlueprints />
        <DevoteeCare />
        <SpiritualFAQ />
      </main>
      <Footer />
    </div>
  );
}
