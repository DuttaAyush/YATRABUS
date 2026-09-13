export default function InternationalPackages() {
  return (
    <section className="w-full py-16 bg-white border-b border-slate-200" id="internationalPackagesSection">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-brand-scarlet text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">flight_takeoff</span>
              WORLD TOUR COLLECTIONS
            </div>
            <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight font-serif font-semibold">
              International Holiday Packages
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Seamless global vacations featuring flight assistance, handpicked 4★ & 5★ resort stays, curated city tours, and verified Indian meals.
            </p>
          </div>
          <div>
            <a className="inline-flex items-center gap-1 text-sm font-bold text-brand-scarlet hover:text-brand-hover transition-colors" href="#">
              <span className="">Explore all Global Packages</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Hero Spotlight Banner */}
        <div className="mb-8 rounded-3xl overflow-hidden shadow-md border border-slate-200 relative group">
          <div className="relative h-64 md:h-80 w-full overflow-hidden bg-slate-900">
            <img alt="Luxury Dubai & Singapore Escape collage banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_5.jpg" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent"></div>
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider">
                  Featured Worldwide Grand Tour
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                  Visa Assist + Return Flights + 5★ Stays
                </span>
              </div>
              <div className="max-w-xl">
                <h3 className="text-2xl md:text-3xl lg:text-4xl tracking-tight mb-2 font-semibold">
                  Luxury Dubai & Singapore Combo Escape
                </h3>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed mb-4 line-clamp-2">
                  Experience Dubai Burj Khalifa, Desert Safari dune bashing, Singapore Marina Bay Sands SkyPark, and Sentosa Island in one seamless trip.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20">
                    <span className="text-[10px] text-amber-300 block font-semibold">Duration</span>
                    <span className="text-xs md:text-sm font-extrabold">10 Days / 9 Nights</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20">
                    <span className="text-[10px] text-amber-300 block font-semibold">All-Inclusive</span>
                    <span className="text-xs md:text-sm font-extrabold">₹89,999 / person</span>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider shadow-md" type="button">
                    View Full Itinerary
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 3 International Tour Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <img alt="Dubai Skyline & Safari" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_6.jpg" />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs">5 Days / 4 Nights</span>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium truncate">
                Burj Khalifa • Marina Cruise • Desert Camp
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-600 block mb-1">Direct Flights ex-Mumbai & Pune</span>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-scarlet transition-colors">Dubai Extravaganza & Desert Dunes</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">4-star luxury hotel in Downtown Dubai, buffet breakfast, 124th Floor Burj Khalifa pass, and BBQ desert camp.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starts from</span>
                  <span className="text-xl font-extrabold text-slate-900">₹44,999</span>
                </div>
                <button className="px-4 py-2 rounded-xl bg-brand-scarlet text-white hover:bg-brand-hover font-bold text-xs" type="button">View Details</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <img alt="Singapore Marina Bay" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_7.jpg" />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs">7 Days / 6 Nights</span>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium truncate">
                Universal Studios • Sentosa • Kuala Lumpur
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 block mb-1">Twin-Country Guided Odyssey</span>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-scarlet transition-colors">Singapore & Malaysia Twin Explorer</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">Universal Studios pass, scenic cable car, Petronas Twin Towers photo stop, and Batu Caves guided excursion.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starts from</span>
                  <span className="text-xl font-extrabold text-slate-900">₹62,500</span>
                </div>
                <button className="px-4 py-2 rounded-xl bg-brand-scarlet text-white hover:bg-brand-hover font-bold text-xs" type="button">View Details</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <img alt="Thailand Phuket" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_8.jpg" />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs">6 Days / 5 Nights</span>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium truncate">
                Phi Phi Island • Coral Beach • Bangkok City
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-teal-600 block mb-1">Island Speedboat Transfers</span>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-scarlet transition-colors">Thailand: Bangkok & Phuket Holiday</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">Speedboat to Phi Phi Islands, Bangkok Golden Buddha temple tour, 4-star beach resort, and Indian meals.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starts from</span>
                  <span className="text-xl font-extrabold text-slate-900">₹38,900</span>
                </div>
                <button className="px-4 py-2 rounded-xl bg-brand-scarlet text-white hover:bg-brand-hover font-bold text-xs" type="button">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
