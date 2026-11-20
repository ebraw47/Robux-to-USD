'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileNavigation from './MobileNavigation';
import { BRAND_LOGO_MARK, SITE_NAME } from '@/lib/siteConfig';

const navLinks = [
  { href: '/', label: 'Calculator' },
  { href: '/usd-to-robux', label: 'USD to Robux' },
  { href: '/robux-price-chart', label: 'Price Chart' },
  { href: '/devex-calculator', label: 'DevEx' },
  { href: '/robux-tax-calculator', label: 'Tax (30%)' },
  { href: '/blog', label: 'Guides' },
  { href: '/about-us', label: 'About' },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/85 py-2.5 px-3 backdrop-blur-xl sm:py-3 sm:px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center gap-3">
        <Link href="/" className="flex items-center min-w-0 group">
          <div className="relative mr-2.5 h-9 w-9 flex-shrink-0 sm:h-10 sm:w-10">
            <Image
              src={BRAND_LOGO_MARK}
              alt="Robux to USD logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <span className="truncate font-display text-base sm:text-lg md:text-xl font-extrabold tracking-tight leading-none brand-gradient-text">
            <span className="hidden sm:inline">{SITE_NAME}</span>
            <span className="sm:hidden">R$ → USD</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative rounded-lg px-2.5 py-1.5 font-medium transition-colors text-sm ${
                isActive(href)
                  ? 'bg-teal/10 font-semibold text-teal-deep'
                  : 'text-ink/65 hover:bg-ink/5 hover:text-ink'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link
            href="/#calculator"
            className="inline-flex items-center rounded-xl bg-teal px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(13,148,136,0.7)] transition hover:bg-teal-deep"
          >
            Open calculator
          </Link>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
