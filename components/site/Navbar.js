'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const getHref = (hash) => {
    return (pathname === '/bus-tickets' || pathname === '/explore') ? hash : `/bus-tickets${hash}`;
  };

  return (
    <nav className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8 text-xs sm:text-sm font-semibold text-white/90 shrink-0 tracking-wide">
      <Link className="hover:text-white transition-colors duration-200 py-1 flex items-center gap-1 drop-shadow-sm whitespace-nowrap" href={getHref('#popularRoutesSection')}>
        <span>Popular Routes</span>
      </Link>
      <Link className="hover:text-white transition-colors duration-200 py-1 flex items-center gap-1 drop-shadow-sm whitespace-nowrap" href="/packages">
        <span>Curated Packages</span>
      </Link>
      <Link className="hover:text-white transition-colors duration-200 py-1 flex items-center gap-1 drop-shadow-sm whitespace-nowrap" href={getHref('#hospitalitySection')}>
        <span>Hospitality</span>
      </Link>
      <Link className="hover:text-white transition-colors duration-200 py-1 flex items-center gap-1 drop-shadow-sm whitespace-nowrap" href={getHref('#advantageSection')}>
        <span>Why YatraBus</span>
      </Link>
      <Link className="hover:text-white transition-colors duration-200 py-1 flex items-center gap-1 drop-shadow-sm whitespace-nowrap" href="/about">
        <span>About Us</span>
      </Link>
      <Link className="hover:text-white transition-colors duration-200 py-1 flex items-center gap-1 drop-shadow-sm whitespace-nowrap" href={getHref('#faqSection')}>
        <span>FAQ</span>
      </Link>
    </nav>
  );
}
