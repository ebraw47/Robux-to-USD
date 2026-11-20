import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import { proseClass, UnofficialNote } from "@/components/ContentBits";
import { buildMetadata } from "@/lib/pageMeta";
import { RATES_LAST_VERIFIED } from "@/lib/robuxRates";
import { BRAND_LOGO, CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Free Robux to USD Calculator",
  description: `About ${SITE_NAME} at ${SITE_DOMAIN}: an independent, free calculator that estimates Robux buy cost and DevEx cashout value. Unofficial, no login, no Robux sales.`,
  path: "/about-us",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about-us" },
        ]}
      />
      <div className="container mx-auto max-w-4xl px-4 pb-16 pt-8">
        <div className="mb-10 flex flex-col items-start gap-8 md:flex-row">
          <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border border-ink/10 bg-white">
            <Image
              src={BRAND_LOGO}
              alt={`${SITE_NAME} logo`}
              fill
              sizes="160px"
              className="object-contain p-3"
              priority
            />
          </div>
          <div>
            <h1 className="mb-4 font-display text-3xl font-bold text-ink md:text-4xl">
              About {SITE_NAME}
            </h1>
            <p className="text-lg leading-relaxed text-ink/80">
              {SITE_NAME} is a free calculator and guide hub that explains what Robux are worth in
              real dollars — what they cost to buy, what creators can cash out through DevEx, and how
              the 30% marketplace fee changes the math. We operate at{" "}
              <strong className="text-ink">{SITE_DOMAIN}</strong>.
            </p>
          </div>
        </div>

        <div className={proseClass}>
          <p>
            Robux pricing is confusing because web packs, gift cards, mobile packs and creator
            payouts all use different rates. We built one place that shows them side by
            side so a player can answer &ldquo;how much is this in USD?&rdquo; and a creator can
            answer &ldquo;what will I actually receive?&rdquo; without a spreadsheet.
          </p>

          <h2>What we are — and are not</h2>
          <ul>
            <li>
              <strong>Independent and unofficial.</strong> We are not affiliated with, endorsed by,
              or sponsored by Roblox Corporation. Roblox and Robux are trademarks of Roblox
              Corporation.
            </li>
            <li>
              <strong>Informational only.</strong> Our tools produce estimates. We do not sell
              Robux, trade Robux, or process payments.
            </li>
            <li>
              <strong>No login, ever.</strong> We will never ask for your Roblox username, password,
              cookie, or 2FA code. Anyone claiming to be us and asking for these is an impostor.
            </li>
            <li>
              <strong>No free Robux promises.</strong> There is no legitimate &ldquo;free Robux
              generator,&rdquo; and we do not publish one.
            </li>
          </ul>

          <h2>What we publish</h2>
          <ul>
            <li>
              The <Link href="/#calculator">Robux to USD calculator</Link> and{" "}
              <Link href="/usd-to-robux">USD to Robux calculator</Link>
            </li>
            <li>
              The full <Link href="/robux-price-chart">Robux price chart</Link> for web, gift card,
              and mobile packs
            </li>
            <li>
              The <Link href="/devex-calculator">DevEx calculator</Link> and{" "}
              <Link href="/robux-tax-calculator">Robux tax calculator</Link>
            </li>
            <li>
              Plain-language <Link href="/blog">guides</Link> on selling Robux, gift cards, Roblox
              Plus, web vs mobile prices, DevEx rates, and the 30% fee
            </li>
          </ul>

          <h2>How we keep numbers accurate</h2>
          <p>
            Pack tables, DevEx rates, and fee rules are stored in a single shared data file and used
            by every tool and article, so a page never contradicts another. We re-check these
            figures against public Roblox listings and documentation. The current data set was last
            verified on <strong>{RATES_LAST_VERIFIED}</strong>. Roblox can change prices and
            programs without notice, so every page tells you to confirm final amounts on Roblox.
          </p>

          <h2>Contact and corrections</h2>
          <p>
            Spotted an outdated price or an unclear explanation? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the{" "}
            <Link href="/contact-us">contact page</Link>. We aim to fix verified errors quickly.
          </p>
          <div className="pt-2">
            <CtaButton href="/#calculator" size="sm">
              OPEN CALCULATOR
            </CtaButton>
          </div>
        </div>
        <UnofficialNote className="mt-10" />
      </div>
    </>
  );
}
