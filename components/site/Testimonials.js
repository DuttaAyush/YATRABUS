export default function Testimonials() {
  return (
    <section className="w-full py-16 bg-white border-b border-slate-200" id="testimonialsSection">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-brand-scarlet text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>VERIFIED PASSENGER REVIEWS
          </div>
          <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight font-serif font-semibold">Real Stories from Verified Travelers</h2>
          <p className="text-sm text-slate-600 mt-2">Hear how direct fleet booking, punctuality, and spotless sleeper berths transform highway journeys across India.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-400">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold inline-flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">verified</span>Verified Trip</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">"Knowing the exact bus registration number MH-31-AP-4921 beforehand meant zero confusion at Dharampeth. The BharatBenz AC sleeper was pristine, blanket was fresh, and we reached Pune right at 07:00 AM sharp!"</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-scarlet text-white font-bold flex items-center justify-center text-xs shadow-sm">RP</div>
                <div><h4 className="text-xs font-bold text-slate-900">Rajesh Patel</h4><p className="text-[11px] text-slate-500">Nagpur → Pune BharatBenz Sleeper</p></div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-400">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold inline-flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">verified</span>Verified Trip</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">"I shuttle weekly between Pune and Mumbai for meetings. Zero convenience fee checkout and live GPS tracking sent directly via WhatsApp made this far superior to other aggregators. Seamless Volvo experience."</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">SM</div>
                <div><h4 className="text-xs font-bold text-slate-900">Sneha Mukherjee</h4><p className="text-[11px] text-slate-500">Pune → Mumbai Volvo Multi-Axle</p></div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-400">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold inline-flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">verified</span>Verified Trip</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">"Booked a female sleeper berth for my mother traveling to Indore. The live seat lock and depot coordination gave us complete peace of mind. Safe, spotless wash stops, and extremely polite crew."</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">AK</div>
                <div><h4 className="text-xs font-bold text-slate-900">Anand Kulkarni</h4><p className="text-[11px] text-slate-500">Nagpur → Indore Overnight</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
