import Link from 'next/link';
import CtaButton from '@/components/CtaButton';
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_TAGLINE } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-ink/10 bg-white pt-8 pb-2 px-4 text-ink md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h2 className="mb-4 font-display text-xl font-bold text-ink">{SITE_NAME}</h2>
            <p className="mb-4 text-sm text-ink/65">{SITE_TAGLINE}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-teal underline hover:no-underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-ink">Tools</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-ink/70 hover:text-ink hover:underline">Robux to USD Calculator</Link></li>
              <li><Link href="/usd-to-robux" className="text-ink/70 hover:text-ink hover:underline">USD to Robux</Link></li>
              <li><Link href="/robux-price-chart" className="text-ink/70 hover:text-ink hover:underline">Robux Price Chart</Link></li>
              <li><Link href="/devex-calculator" className="text-ink/70 hover:text-ink hover:underline">DevEx Calculator</Link></li>
              <li><Link href="/robux-tax-calculator" className="text-ink/70 hover:text-ink hover:underline">Robux Tax (30%)</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-ink">Guides</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/can-you-sell-robux-for-real-money" className="text-ink/70 hover:text-ink hover:underline">Can you sell Robux?</Link></li>
              <li><Link href="/blog/roblox-gift-card-to-robux-chart" className="text-ink/70 hover:text-ink hover:underline">Gift card to Robux</Link></li>
              <li><Link href="/blog/web-vs-mobile-robux-prices" className="text-ink/70 hover:text-ink hover:underline">Web vs mobile prices</Link></li>
              <li><Link href="/blog/roblox-devex-rates-2026-guide" className="text-ink/70 hover:text-ink hover:underline">DevEx rates 2026</Link></li>
              <li><Link href="/about-us" className="text-ink/70 hover:text-ink hover:underline">About</Link></li>
              <li><Link href="/contact-us" className="text-ink/70 hover:text-ink hover:underline">Contact</Link></li>
              <li><Link href="/privacy" className="text-ink/70 hover:text-ink hover:underline">Privacy</Link></li>
              <li><Link href="/disclaimer" className="text-ink/70 hover:text-ink hover:underline">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-ink">Convert instantly</h2>
            <p className="mb-4 text-sm text-ink/65">
              Estimate Robux buy cost and DevEx value free in your browser—no login required.
            </p>
            <CtaButton
              href="/#calculator"
              size="sm"
              ariaLabel="Open the free Robux to USD Calculator"
              icon="arrow"
            >
              OPEN CALCULATOR
            </CtaButton>
          </div>
        </div>

        <div className="mt-8 border-t border-ink/10 pt-4 pb-3 text-center text-sm text-ink/55">
          <p className="mb-0">
            © 2026 {SITE_NAME}. All rights reserved. |{' '}
            <Link href="/" className="underline hover:no-underline text-ink/80">{SITE_DOMAIN}</Link>
          </p>
          <p className="mt-2 text-xs text-ink/40">
            Unofficial informational calculator. Not affiliated with Roblox Corporation. Roblox® and Robux® are trademarks of Roblox Corporation.
          </p>
        </div>
      </div>
    </footer>
  );
}
