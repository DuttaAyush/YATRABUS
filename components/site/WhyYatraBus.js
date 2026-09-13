export default function WhyYatraBus() {
  return (
    <section className="w-full py-14 bg-white border-b border-slate-200" id="advantageSection">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-scarlet uppercase tracking-wider">The YatraBus Advantage</span>
          <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight mt-1 font-serif font-semibold">
            Why Book Directly on YatraBus?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Direct operator fleet ownership. No aggregator surcharges, 100% genuine bus assignments.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-brand-scarlet flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[24px]">badge</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Instant Bus Plate Allocation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Know your assigned vehicle number plate (e.g. MH-31-AP-4921) immediately on ticket booking, avoiding stand chaos.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[24px]">airline_seat_recline_extra</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Real-Time Live Seat Map</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lock your specific upper or lower sleeper berth with 0 concurrency collisions. What you click is what you board.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[24px]">sync</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Ticket + .ics Calendar Sync</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated WhatsApp boarding pass, print PDF, and instant calendar invite synced to your Google or Apple Calendar.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[24px]">money_off</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">0% Convenience Surcharge</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No surprise ₹80–₹150 convenience fee at final checkout. The base price matches the physical counter depot fare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
