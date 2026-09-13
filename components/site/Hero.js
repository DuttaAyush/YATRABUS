'use client';

export default function Hero() {
  return (
    <section className="relative min-h-[580px] lg:min-h-[620px] flex items-center justify-center overflow-hidden pb-14 pt-10" id="heroSearch">
      <div className="absolute inset-0 z-0">
        <img
          alt="Modern BharatBenz luxury coach on scenic highway"
          className="w-full h-full object-cover object-center"
          src="/images/screen.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-brand-scarlet/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-red-200 font-bold text-xs uppercase tracking-wider mb-4 border border-white/20">
          <span className="material-symbols-outlined text-[16px] text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>
            stars
          </span>
          India&apos;s Dedicated Fleet & Pilgrimage Network
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4 max-w-4xl mx-auto font-serif font-semibold">
          India&apos;s Dedicated Intercity Bus Network
        </h1>
        <p className="text-base md:text-lg text-slate-200 max-w-2xl mx-auto mb-8 font-medium">
          Daily direct luxury BharatBenz & Volvo sleeper coaches with assigned bus numbers and zero hidden aggregator fees.
        </p>

        {/* Search Matrix */}
        <div className="bg-white rounded-3xl hero-shadow p-3 md:p-4 max-w-7xl mx-auto mb-6 text-left">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 items-center">
            <div className="md:col-span-3 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/80 focus-within:border-brand-scarlet focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-brand-scarlet mr-3 text-[22px]">departure_board</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">From</label>
                <input
                  className="w-full bg-transparent font-bold text-slate-900 text-base outline-none p-0 border-0 focus:ring-0"
                  type="text"
                  defaultValue="Nagpur"
                />
                <p className="text-[11px] text-slate-500 truncate">Chatrapati Sq, Dharampeth</p>
              </div>
            </div>
            <div className="md:col-span-1 flex justify-center -my-3 md:my-0">
              <button
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-brand-scarlet hover:bg-red-50 hover:scale-105 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
              </button>
            </div>
            <div className="md:col-span-3 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/80 focus-within:border-brand-scarlet focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-brand-scarlet mr-3 text-[22px]">pin_drop</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">To</label>
                <input
                  className="w-full bg-transparent font-bold text-slate-900 text-base outline-none p-0 border-0 focus:ring-0"
                  type="text"
                  defaultValue="Pune"
                />
                <p className="text-[11px] text-slate-500 truncate">Wakad, Swargate, Viman Nagar</p>
              </div>
            </div>
            <div className="md:col-span-2 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/80 cursor-pointer">
              <span className="material-symbols-outlined text-brand-scarlet mr-2.5 text-[22px]">calendar_month</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Date of Journey</label>
                <div className="text-sm font-bold text-slate-900 truncate">Tomorrow, 24 Oct</div>
                <p className="text-[11px] text-emerald-600 font-semibold truncate">Thursday</p>
              </div>
            </div>
            <div className="md:col-span-1 flex items-center bg-slate-50 rounded-2xl px-3 py-3 border border-slate-200/80 text-center cursor-pointer">
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Seats</label>
                <div className="text-xs font-bold text-slate-900">1 Seat</div>
                <p className="text-[10px] text-slate-500">All</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                className="w-full min-h-[58px] rounded-2xl bg-brand-scarlet text-white hover:bg-brand-hover transition-all flex items-center justify-center gap-2 font-bold text-sm tracking-wider uppercase shadow-lg shadow-red-600/30"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>SEARCH BUSES</span>
              </button>
            </div>
          </form>
        </div>

        {/* Trust Badges Bar */}
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-3 px-6 py-3.5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-white text-xs font-semibold tracking-wide shadow-md">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span> Assigned Bus Plate Instantly
          </div>
          <span className="hidden sm:inline text-white/40">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-amber-300 text-[18px]">money_off</span> 0% Convenience Markup
          </div>
          <span className="hidden md:inline text-white/40">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-cyan-300 text-[18px]">event_seat</span> Real-Time Live Seat Lock
          </div>
          <span className="hidden lg:inline text-white/40">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-pink-300 text-[18px]">send_to_mobile</span> Instant WhatsApp & .ics Sync
          </div>
        </div>
      </div>
    </section>
  );
}
