import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          <div>
            <Link href="/">
              <img
                alt="YatraBus Logo"
                className="h-8 w-auto brightness-0 invert mb-3"
                src="/images/logo.png"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              India&apos;s dedicated bus reservation and curated tour booking network. Fast, reliable, and verified comfort.
            </p>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-brand-scarlet text-[18px]">support_agent</span>
              24/7 Helpline: 1800-209-9287
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Top Bus Routes</h4>
            <ul className="space-y-2 text-xs">
              <li><Link className="hover:text-white transition-colors" href="/#popularRoutesSection">Pune to Nagpur Sleeper</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/#popularRoutesSection">Mumbai to Pune Daily Volvo</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/#popularRoutesSection">Nagpur to Indore Express</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/#popularRoutesSection">Pune to Shirdi Temple Drop</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Tour Packages</h4>
            <ul className="space-y-2 text-xs">
              <li><Link className="hover:text-white transition-colors" href="/international-packages">International Holiday Packages</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/spiritual-yatra">Spiritual Darshan &amp; Jyotirlinga</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/india-local-packages">India Local Escapes &amp; Safaris</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/">Custom Group Charters</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Support &amp; Security</h4>
            <ul className="space-y-2 text-xs">
              <li><Link className="hover:text-white transition-colors" href="/about">About YatraBus</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/profile">Track Bus Live GPS</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/profile">Print / Download E-Ticket</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/about">Depot Station Masters</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>© 2025 YatraBus Technologies India Pvt. Ltd. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-400">lock</span>
            <span>256-Bit SSL Encrypted Booking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
