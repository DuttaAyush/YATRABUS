export default function StatsStrip() {
  return (
    <section className="w-full bg-slate-50 border-b border-slate-200 py-6">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="flex items-center gap-3.5 pt-2 md:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-brand-scarlet flex items-center justify-center font-bold shrink-0">
              <span className="material-symbols-outlined text-[26px]">directions_bus</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">15+ Luxury Fleet</div>
              <div className="text-xs text-slate-500 font-medium">BharatBenz & Volvo Coaches</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5 pt-2 md:pt-0 md:pl-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
              <span className="material-symbols-outlined text-[26px]">alt_route</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">45+ Daily Routes</div>
              <div className="text-xs text-slate-500 font-medium">Direct Highway Corridors</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5 pt-2 md:pt-0 md:pl-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">
              <span className="material-symbols-outlined text-[26px]">groups</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">1,20,000+</div>
              <div className="text-xs text-slate-500 font-medium">Happy Pilgrims & Guests</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5 pt-2 md:pt-0 md:pl-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">
              <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">4.8 ★ Rated</div>
              <div className="text-xs text-slate-500 font-medium">Verified Passenger Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
