'use client'

export default function PopularRoutes() {
  return (
    <section className="w-full py-14 bg-slate-50" id="popularRoutesSection">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-brand-scarlet text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              DIRECT FLEET OPERATOR
            </div>
            <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight font-serif font-semibold">
              Popular Intercity Express Routes
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Guaranteed seats with assigned vehicle registration plates and real-time live seat lock.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Schedule Feeds
            </span>
          </div>
        </div>
        {/* THE 2 MAIN PROMINENT ROUTES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* MAIN ROUTE 1: Nagpur to Pune */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border-2 border-brand-scarlet/25 transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1 bg-brand-scarlet text-white font-bold text-[11px] rounded-bl-2xl uppercase tracking-wider">
              Most Popular Express
            </div>
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-extrabold text-slate-900">Nagpur ⇄ Pune</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-brand-scarlet text-xs font-bold">4 Daily</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="">BharatBenz AC Sleeper (2+1)</span>
                    <span className="">•</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono font-bold">MH-31-AP-4921</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Starts from</span>
                  <span className="text-2xl font-extrabold text-brand-scarlet">₹850</span>
                </div>
              </div>
              {/* Timeline */}
              <div className="grid grid-cols-3 items-center py-3 px-4 bg-slate-50 rounded-2xl mb-4 border border-slate-100 text-center">
                <div className="text-left">
                  <div className="text-lg font-bold text-slate-900">20:30</div>
                  <div className="text-xs text-slate-500 truncate">Dharampeth, Nagpur</div>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block">10h 30m</span>
                  <div className="w-full h-0.5 bg-slate-200 my-1 relative">
                    <span className="material-symbols-outlined text-brand-scarlet text-[16px] absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-50 px-1">directions_bus</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Samruddhi Mahamarg</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900">07:00</div>
                  <div className="text-xs text-slate-500 truncate">Wakad, Pune</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <span className="font-bold text-brand-scarlet bg-red-50 px-2.5 py-1 rounded-full">Only 4 seats left!</span>
                <span className="hidden sm:inline text-slate-400">• Free Water & Blanket</span>
              </div>
              <a href="/select-seats" className="px-5 py-2.5 rounded-xl bg-brand-scarlet text-white hover:bg-brand-hover font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all">
                <span className="">Select Seats</span>
                <span className="material-symbols-outlined text-[16px]">event_seat</span>
              </a>
            </div>
          </div>
          {/* MAIN ROUTE 2: Pune to Mumbai */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border-2 border-brand-scarlet/25 transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1 bg-blue-600 text-white font-bold text-[11px] rounded-bl-2xl uppercase tracking-wider">
              High Frequency Shuttle
            </div>
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-extrabold text-slate-900">Pune ⇄ Mumbai</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">8 Daily</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="">Multi-Axle Volvo B11R AC Seater</span>
                    <span className="">•</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono font-bold">MH-12-QZ-8812</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Starts from</span>
                  <span className="text-2xl font-extrabold text-brand-scarlet">₹450</span>
                </div>
              </div>
              {/* Timeline */}
              <div className="grid grid-cols-3 items-center py-3 px-4 bg-slate-50 rounded-2xl mb-4 border border-slate-100 text-center">
                <div className="text-left">
                  <div className="text-lg font-bold text-slate-900">06:00</div>
                  <div className="text-xs text-slate-500 truncate">Swargate, Pune</div>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block">3h 45m</span>
                  <div className="w-full h-0.5 bg-slate-200 my-1 relative">
                    <span className="material-symbols-outlined text-brand-scarlet text-[16px] absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-50 px-1">directions_bus</span>
                  </div>
                  <span className="text-[10px] text-slate-700 font-bold bg-slate-100 px-1.5 py-0.5 rounded">Mumbai-Pune Expwy</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900">09:45</div>
                  <div className="text-xs text-slate-500 truncate">Dadar TT, Mumbai</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">12 seats available</span>
                <span className="hidden sm:inline text-slate-400">• High Speed Wi-Fi</span>
              </div>
              <a href="/select-seats" className="px-5 py-2.5 rounded-xl bg-brand-scarlet text-white hover:bg-brand-hover font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all">
                <span className="">Select Seats</span>
                <span className="material-symbols-outlined text-[16px]">event_seat</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
