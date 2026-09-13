export default function Hospitality() {
  return (
    <section className="w-full py-14 bg-slate-50 border-b border-slate-200" id="hospitalitySection">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-brand-scarlet text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">hotel</span>
              YATRABUS HOSPITALITY STANDARD
            </div>
            <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight font-serif font-semibold">
              Comfortable Stays Aligned to Bus Timings
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Hand-audited 3-star AC hotels synchronized with express coach arrivals.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
            100% On-Ground Audited Hotels
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">restaurant</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Pure Satvik Veg Dining</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated pure vegetarian kitchens with freshly cooked Satvik thalis and morning breakfast before temple aartis.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-brand-scarlet flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">near_me</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Temple Proximity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hotels situated within 5–15 minutes walking radius of main Mandir gates, Shirdi temple complex, or safari gates.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">clean_hands</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">100% Sanitized AC Rooms</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Family-friendly rooms, fresh linens, sanitized western washrooms, 24/7 hot water, and uninterrupted backup.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">schedule</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Early Bus Check-in Priority</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Arrive on overnight sleeper buses without awkward waiting. Coordinated 6:00 AM early freshen-up room access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
