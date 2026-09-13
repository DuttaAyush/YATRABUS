export default function DomesticPackages() {
  return (
    <section className="w-full py-16 bg-white border-b border-slate-200" id="domesticPackagesSection">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">landscape</span>
              WEEKEND ESCAPES & SAFARIS
            </div>
            <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight font-serif font-semibold">Curated Leisure & Holiday Tours</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">Handcrafted all-inclusive domestic holidays, hill stations, coastal escapes, and wildlife sanctuaries across India with luxury bus transit and boutique stays.</p>
          </div>
          <div>
            <a className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors" href="#">
              <span>View all holiday getaways</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Himachal & Manali */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                alt="Himachal & Manali Hills"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_13.jpg"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/80 text-white font-bold text-xs">5 Days / 4 Nights</span>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium truncate">
                Shimla • Kullu • Rohtang Pass • Solang
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 block mb-1">Scenic Hill Station</span>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-brand-scarlet transition-colors">Himachal & Manali Mountain Escape</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">Volvo AC coach from Delhi/Chandigarh, 4-star mountain view resort, Solang Valley snow excursion, and daily buffet meals.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Package from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-brand-scarlet">₹9,499</span>
                    <span className="text-[11px] text-slate-400">/person</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-scarlet text-white font-bold text-xs transition-colors" type="button">
                  Explore Package
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Kerala Backwaters & Munnar */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                alt="Kerala Backwaters & Munnar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_14.jpg"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/80 text-white font-bold text-xs">5 Days / 4 Nights</span>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium truncate">
                Kochi • Munnar Hills • Alleppey Houseboat
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 block mb-1">Backwaters & Tea Hills</span>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-brand-scarlet transition-colors">Kerala Backwaters & Munnar Tea Trails</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">Private Alleppey houseboat cruise with traditional Malabar meals, tea plantation tour, and luxury AC highway transit.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Package from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-brand-scarlet">₹11,200</span>
                    <span className="text-[11px] text-slate-400">/person</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-scarlet text-white font-bold text-xs transition-colors" type="button">
                  Explore Package
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Goa Coastal */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                alt="Goa Coastal & Beaches"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_15.jpg"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/80 text-white font-bold text-xs">4 Days / 3 Nights</span>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium truncate">
                Calangute • Baga • Mandovi Sunset Cruise
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-600 block mb-1">Coastal Beach & Leisure</span>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-brand-scarlet transition-colors">Goa Coastal & Water Sports Getaway</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">Direct sleeper coach transit, 4-star beachside resort, scuba & parasailing combo pass, and complimentary Mandovi river cruise.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Package from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-brand-scarlet">₹6,999</span>
                    <span className="text-[11px] text-slate-400">/person</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-scarlet text-white font-bold text-xs transition-colors" type="button">
                  Explore Package
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Jim Corbett & Nainital */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                alt="Jim Corbett Tiger Safari"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/yatrabus_all_india_spiritual_darshan_bus_tickets_holiday_packages_16.jpg"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/80 text-white font-bold text-xs">4 Days / 3 Nights</span>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium truncate">
                Corbett Jungle Zone • Nainital Lake Tour
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-600 block mb-1">Wildlife & Hill Retreat</span>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-brand-scarlet transition-colors">Jim Corbett & Nainital Wildlife Safari</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">Deluxe jungle lodge accommodation, certified naturalist open Gypsy safari, and scenic Nainital lake boating transfers.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Package from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-brand-scarlet">₹7,450</span>
                    <span className="text-[11px] text-slate-400">/person</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-scarlet text-white font-bold text-xs transition-colors" type="button">
                  Explore Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
