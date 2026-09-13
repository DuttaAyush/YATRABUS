export default function SpiritualPackages() {
  return (
    <section className="w-full py-16 bg-amber-50/40 border-b border-amber-200/60" id="spiritualPackagesSection">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
              <span className="material-symbols-outlined text-[16px]">temple_hindu</span>
              PILGRIMAGE & DIVINE DARSHAN
            </div>
            <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight font-serif font-semibold">
              Curated Spiritual Darshan Circuits
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Fully managed multi-day spiritual journeys across India with AC coach transit, verified temple accommodations, VIP Darshan line coordination, and pure Satvik meals.
            </p>
          </div>
          <div>
            <a className="inline-flex items-center gap-1 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors" href="#">
              <span>Explore all Devsthan Circuits</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Circuit 1: Char Dham & Haridwar */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-amber-200 transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                alt="Char Dham & Kedarnath Darshan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-xs">10 Days / 9 Nights</span>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium truncate">
                Kedarnath • Badrinath • Gangotri • Yamunotri
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-700 mb-1">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>VIP Darshan Pass Included</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-amber-700 transition-colors">Char Dham Yatra & Haridwar Special</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">Complete 4-Dham holy circuit with priority queue assistance, helicopter/pony coordination, deluxe hotels & pure satvik meals.</p>
                <div className="inline-block px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/60 text-[11px] text-amber-800 font-semibold mb-3">
                  Includes: Stay + Travel + VIP Pass + Satvik Meals
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starts at</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-slate-900">₹24,499</span>
                    <span className="text-[11px] text-slate-400">/person</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 font-bold text-xs shadow-sm transition-all" type="button">
                  View & Book
                </button>
              </div>
            </div>
          </div>

          {/* Circuit 2: Kashi Vishwanath & Ayodhya Ram Mandir */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-amber-200 transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                alt="Kashi Vishwanath & Ayodhya"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_10.jpg"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-xs">4 Days / 3 Nights</span>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium truncate">
                Ayodhya • Varanasi • Prayagraj Sangam
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-700 mb-1">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>Aarti & Darshan Assist</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-amber-700 transition-colors">Kashi Vishwanath & Ayodhya Ram Mandir</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">Direct AC sleeper coach, Ram Janmabhoomi Darshan, Kashi Ganga Aarti boat booking, and Triveni Sangam snan assistance.</p>
                <div className="inline-block px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/60 text-[11px] text-amber-800 font-semibold mb-3">
                  Includes: AC Coach + Hotel + Aarti Pass
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starts at</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-slate-900">₹6,499</span>
                    <span className="text-[11px] text-slate-400">/person</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 font-bold text-xs shadow-sm transition-all" type="button">
                  View & Book
                </button>
              </div>
            </div>
          </div>

          {/* Circuit 3: Tirupati Balaji & Meenakshi Amman */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-amber-200 transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                alt="Tirupati Balaji & South Temple"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_11.jpg"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-xs">5 Days / 4 Nights</span>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium truncate">
                Tirupati • Madurai • Rameshwaram Jyotirlinga
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-700 mb-1">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>Special Entry Darshan Confirmed</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-amber-700 transition-colors">Tirupati Balaji & Meenakshi Amman</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">Pre-booked ₹300 Seeghra Darshan pass, laddu prasadam, AC coach from Chennai/Bengaluru, and Rameshwaram 22 teerthams darshan.</p>
                <div className="inline-block px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/60 text-[11px] text-amber-800 font-semibold mb-3">
                  Includes: AC Coach + Hotel + VIP Laddu Pass
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starts at</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-slate-900">₹8,950</span>
                    <span className="text-[11px] text-slate-400">/person</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 font-bold text-xs shadow-sm transition-all" type="button">
                  View & Book
                </button>
              </div>
            </div>
          </div>

          {/* Circuit 4: Somnath & Dwarka Circuit */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-amber-200 transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                alt="Somnath & Dwarka Temples"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_12.jpg"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-xs">4 Days / 3 Nights</span>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium truncate">
                Dwarkadhish • Somnath • Nageshwar
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-700 mb-1">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>Guided Purohit Escort</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-amber-700 transition-colors">Gujarat Somnath-Dwarka & Nageshwar</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">Somnath sound & light show, Bet Dwarka ferry, Nageshwar Jyotirlinga Abhishek assistance, and comfortable luxury coach.</p>
                <div className="inline-block px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/60 text-[11px] text-amber-800 font-semibold mb-3">
                  Includes: AC Coach + Hotel + Puja Kit
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starts at</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-slate-900">₹5,850</span>
                    <span className="text-[11px] text-slate-400">/person</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 font-bold text-xs shadow-sm transition-all" type="button">
                  View & Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
