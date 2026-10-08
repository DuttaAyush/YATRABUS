'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

const fleetImages = [
  {
    id: 1,
    title: 'BharatBenz 36-Berth AC Sleeper (2+1)',
    category: 'sleeper',
    categoryName: 'Sleeper Berths',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    description: 'Plush lower & upper deck private sleeper cabins with memory foam mattress, clean linen, and panoramic privacy curtains.',
    badge: 'Flagship Coach',
    specs: { berths: '36 Berths (2+1)', ac: 'Climate Controlled', suspension: 'Air Suspension', charger: 'Type-C Fast Charge' }
  },
  {
    id: 2,
    title: 'Ambient Starlight LED Ceiling Cabin',
    category: 'interiors',
    categoryName: 'Cabin Ambiance',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200&auto=format&fit=crop',
    description: 'Relaxing ambient night lighting with star-cluster ceiling LEDs, noise-dampening acoustic panels, and wide anti-skid aisle.',
    badge: 'Mood Lighting',
    specs: { lighting: 'Warm 2700K LED', noise: '< 55 dB Quiet Cabin', flooring: 'Teak Vinyl Anti-Skid' }
  },
  {
    id: 3,
    title: 'Single Window Sleeper Berth (Lower Deck)',
    category: 'sleeper',
    categoryName: 'Sleeper Berths',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop',
    description: 'Independent single sleeper berth designed for solo travelers. Includes reading lamp, water bottle holder, and USB charger.',
    badge: 'Solo Traveler Choice',
    specs: { width: '3.2 ft Wide', length: '6.5 ft Long', window: 'UV Tinted Tint' }
  },
  {
    id: 4,
    title: 'Volvo B11R Multi-Axle Luxury Exterior',
    category: 'exterior',
    categoryName: 'Exterior Fleet',
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1200&auto=format&fit=crop',
    description: 'Aerodynamic Volvo 9600 / B11R chassis with electronically controlled air suspension and twin steering axles.',
    badge: 'Euro-6 Volvo',
    specs: { engine: '460 HP Volvo D11K', safety: 'ABS + ESP + EBS', length: '14.5 Meters' }
  },
  {
    id: 5,
    title: 'Double Sharing 2-Berth Upper Cabin',
    category: 'sleeper',
    categoryName: 'Sleeper Berths',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    description: 'Upper deck adjacent double sleeper berths ideal for couples, friends, and families with unified reading console.',
    badge: 'Couples & Family',
    specs: { capacity: '2 Passengers', pillow: 'Orthopedic Support', privacy: 'Full Height Blind' }
  },
  {
    id: 6,
    title: 'Ergonomic Semi-Sleeper Recliner Coach',
    category: 'interiors',
    categoryName: 'Cabin Ambiance',
    image: 'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?q=80&w=1200&auto=format&fit=crop',
    description: '140-degree pushback calf-support leatherette seats with multi-position headrests and individual foldable meal tray.',
    badge: '140° Recline',
    specs: { recline: '140 Degrees', legroom: '38 Inches', upholstery: 'Breathable Leatherette' }
  },
  {
    id: 7,
    title: 'Individual Fast USB & Type-C Charging Ports',
    category: 'amenities',
    categoryName: 'Amenities & Tech',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1200&auto=format&fit=crop',
    description: 'Dual high-speed Type-C 45W and USB-A charging ports on every single berth with emergency call button.',
    badge: 'Fast Charging',
    specs: { output: '45W USB-PD', port: 'Dual Type-C + USB-A', voltage: '230V Surge Protected' }
  },
  {
    id: 8,
    title: 'Scania Metrolink HD Luxury Tourer',
    category: 'exterior',
    categoryName: 'Exterior Fleet',
    image: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=1200&auto=format&fit=crop',
    description: 'Ultra-luxurious Scania HD coach designed for long-distance overnight state express corridors with whisper-quiet ride.',
    badge: 'Scania High-Deck',
    specs: { axles: 'Tri-Axle 6x2', luggage: '12.5 Cu. Meters Boot', ac: 'Spheros Rooftop HVAC' }
  },
  {
    id: 9,
    title: 'Digital Driver Cockpit & ADAS Radar Safety',
    category: 'amenities',
    categoryName: 'Amenities & Tech',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    description: 'State-of-the-art telemetry cockpit with collision avoidance radar, lane departure warning, and driver fatigue monitoring.',
    badge: 'Active Safety',
    specs: { tech: 'ADAS Radar + AI Cam', gps: 'Live GPS Fleet Sync', speed: 'RTO 80 km/h Governor' }
  },
  {
    id: 10,
    title: 'Sanitized Vacuum Bio-Washroom on Board',
    category: 'amenities',
    categoryName: 'Amenities & Tech',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
    description: 'Touchless bio-vacuum washroom with hand sanitizer, automatic fragrance dispenser, and continuous ventilation.',
    badge: 'Hygiene Assured',
    specs: { flush: 'Aviation Vacuum Flush', water: 'Hot & Cold Sensor Tap', sanitization: 'UV Cleansed' }
  },
  {
    id: 11,
    title: 'Mercedes-Benz Super High Deck Tourer',
    category: 'exterior',
    categoryName: 'Exterior Fleet',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    description: 'Premium golden exterior styling with LED matrix headlights, low entrance step, and large luggage storage.',
    badge: 'Mercedes-Benz SHD',
    specs: { transmission: '8-Speed Automated', chassis: 'Multi-Axle Airglide', height: '3.8 Meters' }
  },
  {
    id: 12,
    title: 'Individual AC Multi-Vent & Directional Controls',
    category: 'amenities',
    categoryName: 'Amenities & Tech',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    description: 'Individual airflow louvers and reading lamp switches located inside every sleeper berth for personalized comfort.',
    badge: 'Personalized AC',
    specs: { filter: 'N95 HEPA Cabin Filter', temp: 'Auto Climate Control', lamp: 'Dimmable Warm LED' }
  },
  {
    id: 13,
    title: 'Spacious Luggage Hold with Digital Tagging',
    category: 'amenities',
    categoryName: 'Amenities & Tech',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    description: 'Under-floor hydraulic luggage compartment with barcode security baggage tags and live SMS receipt verification.',
    badge: 'Secure Baggage',
    specs: { allowance: '2 Bags (25 kg) / Pax', security: 'Digital QR Claim Tags', lighting: 'LED Bay Illumination' }
  },
  {
    id: 14,
    title: 'Night Corridor & Guided Step Lights',
    category: 'interiors',
    categoryName: 'Cabin Ambiance',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1200&auto=format&fit=crop',
    description: 'Floor-level blue LED walkway guide lights for safe night mobility without disturbing resting co-passengers.',
    badge: 'Night Illumination',
    specs: { guidance: 'Floor Step LEDs', aisle: 'Wide 22-Inch Aisle', stairs: 'Anti-Slip Ladder Rungs' }
  },
  {
    id: 15,
    title: 'BharatBenz Glider 12M Long Hauler',
    category: 'exterior',
    categoryName: 'Exterior Fleet',
    image: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=1200&auto=format&fit=crop',
    description: 'Front-engine BharatBenz Glider engineered for smooth mountain climbs, ghat crossings, and express highways.',
    badge: 'High Power Glider',
    specs: { suspension: 'Full Air Bellows', retarder: 'Voith Hydraulic Retarder', fuel: 'Clean BS-VI Diesel' }
  },
  {
    id: 16,
    title: 'Emergency Exit Hatch & Safety Hammers',
    category: 'amenities',
    categoryName: 'Amenities & Tech',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=1200&auto=format&fit=crop',
    description: 'Certified roof exit hatches, 4 glow-in-the-dark window break hammers, and automatic fire suppression system (FDAS).',
    badge: 'Safety Certified',
    specs: { fire: 'Automated Aerosol Suppression', hammers: '4 Tempered Glass Hammers', firstaid: 'Paramedic Trauma Kit' }
  },
  {
    id: 17,
    title: 'Rear Upper Deck Panorama Sleeper',
    category: 'sleeper',
    categoryName: 'Sleeper Berths',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    description: 'Quiet rear upper deck berth offering elevated road views, extra blanket storage shelf, and plush dual pillows.',
    badge: 'Quiet Zone',
    specs: { bed: 'Dual Pillows + Quilt', view: 'Elevated Sightline', shelf: 'Overhead Soft Shelf' }
  },
  {
    id: 18,
    title: 'VedBus Platinum Express Fleet Lineup',
    category: 'exterior',
    categoryName: 'Exterior Fleet',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    description: 'Our fleet of 50+ modern AC Sleeper coaches maintained at ISO-certified terminal depots across Maharashtra, MP, and NCR.',
    badge: '100% On-Time Record',
    specs: { fleet: '50+ Luxury Coaches', maintenance: 'Daily Pre-Trip Inspection', sanitization: 'Hospital Grade Disinfected' }
  }
];

export default function BusGalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { key: 'all', label: 'All Photos', count: fleetImages.length },
    { key: 'sleeper', label: 'Sleeper Berths', count: fleetImages.filter(i => i.category === 'sleeper').length },
    { key: 'interiors', label: 'Cabin Ambiance', count: fleetImages.filter(i => i.category === 'interiors').length },
    { key: 'amenities', label: 'Amenities & Tech', count: fleetImages.filter(i => i.category === 'amenities').length },
    { key: 'exterior', label: 'Exterior Fleet', count: fleetImages.filter(i => i.category === 'exterior').length },
  ];

  const filteredImages = activeCategory === 'all'
    ? fleetImages
    : fleetImages.filter(img => img.category === activeCategory);

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans antialiased">
      <Header />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury Bus Fleet Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest shadow-lg">
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
            <span>Official Fleet Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Experience World-Class Luxury on Wheels
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Explore 18+ high-definition views of our 36-Berth BharatBenz &amp; Volvo AC Sleeper coaches, memory foam cabins, starlight ceilings, and cutting-edge safety features.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/search"
              className="px-6 py-3 rounded-2xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 active:scale-95"
            >
              <span>Search &amp; Book Tickets</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER STRIP */}
      <section className="sticky top-16 sm:top-18 lg:top-20 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3.5 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeCategory === cat.key ? 'bg-amber-400 text-slate-900 font-extrabold' : 'bg-slate-200 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY GRID (18 IMAGES) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
            >
              {/* Image Container with Zoom & Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase border border-white/20">
                  {item.categoryName}
                </div>

                {/* Highlight Badge */}
                <div className="absolute top-3 right-3 bg-amber-500/90 text-slate-950 px-2.5 py-1 rounded-xl text-[10px] font-extrabold shadow-sm">
                  {item.badge}
                </div>

                {/* Hover Click To Zoom Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">zoom_in</span>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-brand-scarlet transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Specs Chips */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                  {Object.entries(item.specs).map(([key, value]) => (
                    <span key={key} className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Top Modal Controls */}
            <div className="p-4 flex items-center justify-between border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                  {selectedImage.badge}
                </span>
                <span className="text-sm font-bold text-slate-300">
                  {selectedImage.categoryName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous Image"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Next Image"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors cursor-pointer ml-2"
                  title="Close Modal"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[320px] sm:min-h-[420px]">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full max-h-[58vh] object-contain"
              />
            </div>

            {/* Modal Bottom Metadata & Booking CTA */}
            <div className="p-5 sm:p-6 bg-slate-900 border-t border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <h2 className="text-lg font-serif font-bold text-white">{selectedImage.title}</h2>
                <p className="text-xs text-slate-400 leading-relaxed">{selectedImage.description}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-amber-300 font-medium">
                  {Object.entries(selectedImage.specs).map(([k, v]) => (
                    <span key={k} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/search"
                  className="px-6 py-3 rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/30 flex items-center gap-1.5"
                >
                  <span>Book This Bus</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
