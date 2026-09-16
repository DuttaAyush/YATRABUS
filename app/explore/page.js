'use client';

import React, { useState } from 'react';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import PackageDetailModal from '@/components/site/PackageDetailModal';

const destinationData = [
  // Spiritual
  {
    id: 'chardham',
    title: 'Kedarnath & Badrinath Himalayan Sanctuary',
    region: 'spiritual',
    regionLabel: 'Spiritual Teerth',
    location: 'Uttarakhand Himalayas',
    season: 'Best: May - Oct',
    duration: '10 Days / 9 Nights',
    price: '₹24,499',
    image: '/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg',
    badge: 'VIP Queue Pass Included',
    badgeColor: 'bg-amber-600 text-white',
    highlights: ['Helicopter Pass Coordination', '100% Satvik Pure Veg Dining', 'Har Ki Pauri Evening Ganga Aarti', 'Temple Proximity Hotels'],
    desc: 'Sacred Himalayan pilgrimage visiting Kedarnath Jyotirlinga, Badrinath Maha Vishnu Mandir, Gangotri, and Yamunotri rivers.',
  },
  {
    id: 'kashi-ayodhya',
    title: 'Ayodhya Shri Ram Mandir & Kashi Corridor',
    region: 'spiritual',
    regionLabel: 'Spiritual Teerth',
    location: 'Uttar Pradesh Devsthan',
    season: 'Best: Oct - March',
    duration: '4 Days / 3 Nights',
    price: '₹6,499',
    image: '/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_10.jpg',
    badge: 'Sugam Darshan Entry',
    badgeColor: 'bg-amber-600 text-white',
    highlights: ['Ram Janmabhoomi Confirmed Pass', 'Private Ganga Aarti Boat Cruise', 'Triveni Sangam Holy Dip', 'Banarasi Pure Veg Thali'],
    desc: 'Spiritual circuit linking Bhagwan Shri Ram Mandir in Ayodhya, Lord Kashi Vishwanath in Varanasi, and Triveni Sangam in Prayagraj.',
  },
  {
    id: 'tirupati-south',
    title: 'Tirupati Balaji & Rameshwaram Teerthams',
    region: 'spiritual',
    regionLabel: 'Spiritual Teerth',
    location: 'Andhra & Tamil Nadu',
    season: 'Best: Year-round',
    duration: '5 Days / 4 Nights',
    price: '₹8,950',
    image: '/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_11.jpg',
    badge: '₹300 Seeghra Pass & Laddus',
    badgeColor: 'bg-amber-600 text-white',
    highlights: ['2 Tirupati Srivari Laddus per Seat', 'Rameshwaram 22 Teertham Snan', 'Madurai Meenakshi Temple Escort', 'Banana Leaf Satvik Meals'],
    desc: 'Divine South India yatra covering Tirumala Venkateswara Temple, Ramanathaswamy Jyotirlinga, and Madurai Meenakshi Amman.',
  },

  // Himalayas
  {
    id: 'himachal-manali',
    title: 'Manali Snow Valley & Atal Tunnel Pass',
    region: 'himalayas',
    regionLabel: 'Himalayan Retreat',
    location: 'Himachal Pradesh',
    season: 'Best: Oct - June',
    duration: '5 Days / 4 Nights',
    price: '₹8,499',
    image: '/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_4.jpg',
    badge: 'Winter Snow Pass',
    badgeColor: 'bg-emerald-600 text-white',
    highlights: ['Heated Cedar Wood Chalets', 'Solang Valley Adventure Sports', 'Kullu Beas River Rafting', 'Bonfire & Barbecue Nights'],
    desc: 'Rejuvenating mountain escape featuring snow adventures in Solang Valley, drive through Atal Tunnel, and riverfront luxury chalets.',
  },

  // Backwaters & Coastal
  {
    id: 'goa-coastal',
    title: 'Goa Coastal Villas & Catamaran Cruise',
    region: 'coastal',
    regionLabel: 'Coastal Escape',
    location: 'West Coast Goa',
    season: 'Best: Oct - April',
    duration: '4 Days / 3 Nights',
    price: '₹6,999',
    image: '/images/yatrabus_india_local_holiday_travel_packages_2.jpg',
    badge: 'Beachfront Villa',
    badgeColor: 'bg-cyan-600 text-white',
    highlights: ['Candolim Beachside Resort', 'Private Sunset Catamaran Cruise', '5-in-1 Water Sports Combo', 'Old Goa Heritage Walk'],
    desc: 'Sun-kissed beach getaway with 4-star pool resort, water sports combo ticket, Mandovi river sunset cruise, and Goan dining.',
  },
  {
    id: 'kerala-backwaters',
    title: 'Kerala Alleppey Lagoons & Munnar Tea Trails',
    region: 'coastal',
    regionLabel: 'Emerald Backwaters',
    location: 'God’s Own Country',
    season: 'Best: Sept - March',
    duration: '5 Days / 4 Nights',
    price: '₹9,499',
    image: '/images/yatrabus_india_local_holiday_travel_packages_3.jpg',
    badge: 'Private AC Houseboat',
    badgeColor: 'bg-cyan-600 text-white',
    highlights: ['Overnight Houseboat Cruise with Chef', 'Munnar Tea Plantation Trails', 'Kathakali Cultural Dance Show', 'Kumarakom Bird Sanctuary'],
    desc: 'Tranquil emerald backwater cruise along Alleppey canals with personal chef, Sadya lunch, and mist-covered Munnar tea gardens.',
  },

  // International
  {
    id: 'dubai-extravaganza',
    title: 'Dubai & Abu Dhabi Royal Wonders',
    region: 'international',
    regionLabel: 'Global Gateway',
    location: 'United Arab Emirates',
    season: 'Best: Nov - March',
    duration: '5 Nights / 6 Days',
    price: '$749',
    image: '/images/yatrabus_international_holiday_travel_packages_6.jpg',
    badge: 'Flights + Visa Included',
    badgeColor: 'bg-slate-900 text-white',
    highlights: ['Burj Khalifa 124th Floor VIP', 'Desert Dune Safari & BBQ Dinner', 'Ferrari World Abu Dhabi', 'Indian Pure Veg / Jain Dining'],
    desc: 'Ultra-luxury Arabian getaway with Marriott hotel stay, private yacht cruise, Burj Khalifa entry, and visa concierge.',
  },
  {
    id: 'bali-odyssey',
    title: 'Bali Tropical Island & Ubud Villa Odyssey',
    region: 'international',
    regionLabel: 'Global Gateway',
    location: 'Indonesia',
    season: 'Best: Year-round',
    duration: '6 Nights / 7 Days',
    price: '$599',
    image: '/images/yatrabus_international_holiday_travel_packages_8.jpg',
    badge: 'Private Pool Villa',
    badgeColor: 'bg-slate-900 text-white',
    highlights: ['Ubud Private Pool Villa', 'Tegalalang Rice Terraces Swing', 'Uluwatu Sunset Temple Tour', 'Indian Buffet Meals'],
    desc: 'Tropical paradise voyage featuring private luxury pool villa in Ubud, sunset beach dinners, water sports, and temple tours.',
  }
];

export default function ExplorePage() {
  const [activeRegion, setActiveRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalPkg, setModalPkg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDestinations = destinationData.filter((dest) => {
    if (activeRegion !== 'all' && dest.region !== activeRegion) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        dest.title.toLowerCase().includes(q) ||
        dest.location.toLowerCase().includes(q) ||
        dest.desc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenModal = (pkg) => {
    setModalPkg(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />

      {/* DISCOVERY HERO HEADER BANNER */}
      <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-300 text-xs font-extrabold uppercase tracking-wider mb-3 border border-red-500/30">
            <span className="material-symbols-outlined text-[16px] text-amber-400">travel_explore</span>
            DESTINATION DISCOVERY PORTAL
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-3 drop-shadow-md">
            Explore India &amp; Global Wonders
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            Handcrafted spiritual yatras, Himalayan snow chalets, emerald backwaters, and international getaways with assigned bus plates and 0% aggregator fees.
          </p>

          {/* SEARCH INPUT BAR */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center bg-white text-slate-900 rounded-2xl p-2 shadow-2xl border border-slate-200">
              <span className="material-symbols-outlined text-slate-400 ml-3 text-[22px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations (e.g. Kedarnath, Goa, Manali, Dubai)..."
                className="w-full bg-transparent text-slate-900 font-bold text-sm outline-none px-3 py-2"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-700 px-2 text-xs font-bold">
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REGION FILTER TABS */}
      <div className="bg-white border-b border-slate-200/90 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-3">
          {[
            { label: 'All Destinations', key: 'all', icon: 'explore' },
            { label: '🛕 Spiritual Teerths', key: 'spiritual', icon: 'temple_hindu' },
            { label: '🏔️ Himalayan Snow Peaks', key: 'himalayas', icon: 'landscape' },
            { label: '🌴 Coastal & Backwaters', key: 'coastal', icon: 'waves' },
            { label: '✈️ International Wonders', key: 'international', icon: 'flight_takeoff' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveRegion(tab.key)}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeRegion === tab.key
                  ? 'bg-brand-scarlet text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* DESTINATION CARDS GRID */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">
              {activeRegion === 'all' ? 'All Featured Experiences' : `${activeRegion.toUpperCase()} Destinations`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Showing {filteredDestinations.length} curated packages</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(dest => (
            <div
              key={dest.id}
              onClick={() => handleOpenModal(dest)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/90 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* IMAGE & BADGES */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${dest.badgeColor}`}>
                    {dest.badge}
                  </span>

                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-bold">
                    {dest.season}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-300 block">{dest.location}</span>
                    <h3 className="text-lg font-serif font-bold text-white drop-shadow-md leading-tight">{dest.title}</h3>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{dest.desc}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dest.highlights.map((hl, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                        ✓ {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CARD FOOTER: PRICE & ACTION */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Package Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-slate-900">{dest.price}</span>
                    <span className="text-[11px] text-slate-400">/ person</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`/customize-package/${dest.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    Customize
                  </a>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(dest);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs transition-all shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      <PackageDetailModal
        pkg={modalPkg}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
