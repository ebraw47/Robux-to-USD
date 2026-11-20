import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import FaqSection from "@/components/FaqSection";
import RobuxCalculator from "@/components/RobuxCalculator";
import CtaButton from "@/components/CtaButton";
import {
  Callout,
  DataTable,
  RelatedTools,
  UnofficialNote,
  proseClass,
  sectionCardClass,
} from "@/components/ContentBits";
import { WEB_APPLICATION_JSON_LD } from "@/lib/appFacts";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";
import {
  APP_RATE_PER_ROBUX,
  DEVEX_MINIMUM_ROBUX,
  DEVEX_STANDARD,
  DEVEX_US_18_PLUS,
  POPULAR_ROBUX,
  POPULAR_USD,
  RATES_LAST_VERIFIED,
  ROBUX_PACKS,
  WEB_RATE_PER_ROBUX,
  afterMarketplaceFee,
  cheapestPackCombo,
  devexUsd,
  formatRobux,
  formatUsd,
  maxRobuxForBudget,
  smoothBuyUsd,
} from "@/lib/robuxRates";
import {
  BRAND_FEATURE_2,
  BRAND_FEATURE_3,
  BRAND_FEATURE_4,
  BRAND_HERO,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_RATING,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "Robux to USD Calculator — Free Buy Cost & DevEx Converter",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free Robux to USD calculator. Estimate web, gift card, and mobile buy cost, compare DevEx cashout value, and convert USD budgets to Robux. No signup.",
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Robux to USD Calculator — Free Buy Cost & DevEx Converter",
    description:
      "Convert Robux to dollars and dollars to Robux. See pack costs, DevEx rates, and the 30% marketplace fee in one place.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Robux to USD calculator — buy cost vs DevEx value",
      },
    ],
  },
};

const faqs = [
  {
    question: "How much is 1 Robux worth in USD?",
    answer:
      "It depends on the direction of money. Buying on the Roblox website or with a gift card averages about $0.01 per Robux near the $9.99 / 1,000 tier. Mobile and console packs average about $0.0125 per Robux at $9.99 / 800. Official DevEx pays creators $0.0038 per eligible Earned Robux (or $0.0054 for qualifying U.S. 18+ spend).",
  },
  {
    question: "How many Robux is $1 / $10 / $25 / $100?",
    answer:
      "At the smooth app rate, $1 ≈ 80 Robux. Whole packs matter more: $9.99 buys 1,000 Robux on the web (800 in the app), a $25 gift card usually funds about 2,500 web Robux, and $100 often maps to the 11,000 web / 10,000 app tier. Use the USD → Robux tab for exact pack combos.",
  },
  {
    question: "How much is 1,000 Robux in dollars?",
    answer:
      "Buying 1,000 Robux on the web is one $9.99 pack. On mobile/console the smooth estimate is about $12.49, though the nearest whole packs may overshoot. Through standard DevEx, 1,000 Earned Robux is only $3.80—and you still need 30,000 Earned Robux minimum to cash out.",
  },
  {
    question: "How much is 10,000 / 100,000 / 1,000,000 Robux worth?",
    answer:
      "Buy cost (web packs) is roughly $97–$100 for ~10,000 Robux and about $840 for ~100,000. DevEx at $0.0038 pays $38 for 10,000 (below the 30k minimum alone), $380 for 100,000, and $3,800 for 1,000,000 Earned Robux before Tipalti fees and tax.",
  },
  {
    question: "Why do I get more Robux on roblox.com and gift cards than in the mobile app?",
    answer:
      "App stores take a cut, so Roblox lists fewer Robux for the same sticker price on iOS, Android, and console. The website and gift-card redemption use the higher “up to 25% more” web table—for example 1,000 vs 800 Robux at $9.99.",
  },
  {
    question: "Can you convert or sell Robux back into real money (USD)?",
    answer:
      "Purchased Robux, gift cards, and most transfers cannot be sold for cash under Roblox Terms of Use. The only official cashout is Developer Exchange (DevEx) for eligible Earned Robux. Third-party “Robux to cash” sites are usually scams or ToS violations.",
  },
  {
    question: "Do Roblox Premium or Roblox Plus members get a 10% bonus on Robux packs?",
    answer:
      "The old Premium 10% Robux purchase bonus has ended. Roblox Plus plans ($4.99–$21.99) may include monthly Robux stipends on higher tiers, but those stipend Robux are not the same as a pack bonus and typically do not count as Earned Robux for DevEx.",
  },
  {
    question: "What is the Roblox 30% marketplace tax?",
    answer:
      "When someone buys your game pass or developer product, Roblox keeps 30% and you receive 70% (floored). To net 1,000 Robux you must list about 1,429 Robux. Use our Robux tax calculator for exact gross ↔ net math.",
  },
  {
    question: "Does this calculator include sales tax or regional currency pricing?",
    answer:
      "No. Figures are US dollar list prices before sales tax/VAT and before regional store differences. Always confirm the final total on Roblox checkout.",
  },
  {
    question: "Is Robux to USD free on robuxtousd.net?",
    answer:
      "Yes. The converter runs free in your browser with no account, no Roblox login, and no payment. We never ask for passwords or gift-card PINs.",
  },
];

const howToSteps = [
  {
    title: "Pick a direction",
    body: "Choose Robux → USD to value a balance, or USD → Robux to plan a gift card or budget.",
  },
  {
    title: "Select the channel",
    body: "Web / gift card uses the higher Robux table. Mobile / console uses the lower app-store tiers.",
  },
  {
    title: "Enter an amount",
    body: "Type any Robux or dollar figure, or tap a preset like 1,000 Robux or $25.",
  },
  {
    title: "Read both answers",
    body: "Smooth rate values the balance; whole-pack cost shows what checkout actually charges.",
  },
];

const featureCards = [
  {
    title: "Buy cost vs DevEx",
    body: "See why $9.99 buys 1,000 Robux while DevEx pays $3.80 for the same amount of Earned Robux.",
  },
  {
    title: "Whole-pack solver",
    body: "We search the nine US packs for the cheapest combination that reaches your target.",
  },
  {
    title: "Tax & creator tools",
    body: "Jump to the 30% fee calculator and DevEx guide when you price passes or plan cashouts.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...WEB_APPLICATION_JSON_LD,
      description:
        "Free Robux to USD calculator to estimate buy cost and DevEx cashout value from official-style US pack rates.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: SITE_RATING.ratingValue,
        ratingCount: SITE_RATING.ratingCount,
        bestRating: SITE_RATING.bestRating,
        worstRating: SITE_RATING.worstRating,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: SITE_NAME,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_ORIGIN}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "HowTo",
      name: "How to convert Robux to USD",
      description:
        "Estimate the US dollar buy cost of Robux and compare official DevEx cashout value.",
      step: howToSteps.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.title,
        text: step.body,
      })),
    },
    {
      "@type": "ImageObject",
      contentUrl: `${SITE_ORIGIN}${BRAND_HERO}`,
      ...imageObjectLicensing,
    },
  ],
};

const packRows = ROBUX_PACKS.map((p) => {
  const bonus = p.webRobux - p.appRobux;
  const bonusPct = ((bonus / p.appRobux) * 100).toFixed(1);
  return [
    formatUsd(p.priceUsd),
    formatRobux(p.webRobux),
    formatRobux(p.appRobux),
    `+${formatRobux(bonus)} (${bonusPct}%)`,
    formatUsd(p.priceUsd / (p.webRobux / 1000)),
    (p.webRobux / p.priceUsd).toFixed(1),
  ];
});

const robuxTableRows = POPULAR_ROBUX.map((r) => {
  const webCombo = cheapestPackCombo(r, "web");
  const appEst = smoothBuyUsd(r, "app");
  const dx = devexUsd(r, DEVEX_STANDARD);
  const net = afterMarketplaceFee(r);
  return [
    formatRobux(r),
    webCombo ? formatUsd(webCombo.totalCost) : "—",
    formatUsd(appEst),
    r < DEVEX_MINIMUM_ROBUX ? "Below min*" : formatUsd(dx),
    formatRobux(net),
  ];
});

const usdTableRows = POPULAR_USD.map((u) => {
  const web = maxRobuxForBudget(u, "web");
  const app = maxRobuxForBudget(u, "app");
  return [
    formatUsd(u, 0),
    web && web.totalRobux > 0 ? formatRobux(web.totalRobux) : "No pack",
    app && app.totalRobux > 0 ? formatRobux(app.totalRobux) : "No pack",
  ];
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-glow absolute -left-24 top-0 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-orange/15 blur-3xl" />
        </div>

        <div className="container mx-auto grid items-center gap-10 px-4 pb-10 pt-10 md:grid-cols-2 md:gap-12 md:px-8 md:pb-14 md:pt-14">
          <div className="animate-fade-up">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-deep">
              robuxtousd.net
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-ink sm:text-5xl md:text-[3.25rem]">
              <span className="brand-gradient-text">Robux to USD</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink/70">
              Estimate the US dollar cost to buy Robux on web, gift cards, or mobile—then compare
              official Creator DevEx rates in the same calculator.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CtaButton href="/#calculator" ariaLabel="Open Robux to USD calculator">
                Convert Robux now
              </CtaButton>
              <Link
                href="/robux-price-chart"
                className="rounded-xl border border-ink/10 bg-white/80 px-4 py-3 text-sm font-semibold text-ink/80 transition hover:border-teal/30 hover:text-teal-deep"
              >
                View price chart
              </Link>
            </div>
            <p className="mt-4 text-xs text-ink/45">
              Rates verified {RATES_LAST_VERIFIED} against public Roblox pack listings & Creator Hub
              docs · Informational only · Not affiliated with Roblox
            </p>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
            <RobuxCalculator />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Web / gift card",
              value: `~${formatUsd(WEB_RATE_PER_ROBUX, 4)}`,
              hint: "per Robux · ~100 R$ / $1 near $9.99",
            },
            {
              label: "Mobile / console",
              value: `~${formatUsd(APP_RATE_PER_ROBUX, 4)}`,
              hint: "per Robux · ~80 R$ / $1 near $9.99",
            },
            {
              label: "DevEx cashout",
              value: formatUsd(DEVEX_STANDARD, 4),
              hint: `per Earned Robux · U.S. 18+ ${formatUsd(DEVEX_US_18_PLUS, 4)}`,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-ink/10 bg-white/90 px-5 py-4 shadow-[0_18px_40px_-34px_rgba(13,148,136,0.45)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">
                {stat.label}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">{stat.value}</p>
              <p className="mt-1 text-sm text-ink/55">{stat.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-14 px-4 md:px-8">
        <div className="mb-6 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            How the Robux to USD calculator works
          </h2>
          <p className="mt-2 text-ink/65">
            Four quick steps—no Roblox login, no downloads, no “free Robux” claims.
          </p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howToSteps.map((step, i) => (
            <li key={step.title} className={`${sectionCardClass} !p-5`}>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal/15 text-sm font-bold text-teal-deep">
                {i + 1}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm text-ink/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container mx-auto mt-16 px-4 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className={proseClass}>
            <h2>Why Robux has more than one “USD rate”</h2>
            <p>
              Searching “Robux to USD” usually means one of three questions: what did my Robux{" "}
              <strong>cost to buy</strong>, what would they be <strong>worth if I could cash
              out</strong>, or how many Robux does a <strong>gift card</strong> buy. Those answers
              use different math.
            </p>
            <p>
              Roblox sells Robux in fixed packs. On the website and gift-card redemption, packs
              include an “up to 25% more” bonus versus the mobile/console table. Creators who
              later qualify for DevEx receive far less per Robux than buyers pay—because DevEx is
              a payout on <em>Earned</em> Robux, not a refund window for purchases.
            </p>
            <Callout title="Quick example: 1,000 Robux">
              <p>
                Web buy: one $9.99 pack. App smooth estimate: ~{formatUsd(smoothBuyUsd(1000, "app"))}.
                Standard DevEx: {formatUsd(devexUsd(1000))} (still below the{" "}
                {formatRobux(DEVEX_MINIMUM_ROBUX)} minimum alone).
              </p>
            </Callout>
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-[0_28px_70px_-40px_rgba(234,140,0,0.35)]">
            <Image
              src={BRAND_HERO}
              alt="Robux to USD converter showing buy cost and DevEx comparison"
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-16 px-4 md:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              2026 Robux price chart (US packs)
            </h2>
            <p className="mt-2 max-w-2xl text-ink/65">
              Nine one-time tiers. Web / gift card Robux include the bonus; mobile / console use the
              base amounts.
            </p>
          </div>
          <Link href="/robux-price-chart" className="text-sm font-semibold text-teal-deep underline">
            Full price chart →
          </Link>
        </div>
        <DataTable
          caption="US Robux packages web versus mobile"
          headers={[
            "Price",
            "Web / gift card",
            "Mobile / console",
            "Web bonus",
            "$ / 1k (web)",
            "R$ / $1 (web)",
          ]}
          rows={packRows}
        />
        <p className="mt-3 text-sm text-ink/50">
          Best web value on the chart is usually the {formatUsd(199.99)} pack (
          {formatRobux(24000)} Robux). Smallest US pack is {formatUsd(2.99)}.
        </p>
      </section>

      <section className="container mx-auto mt-16 px-4 md:px-8">
        <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
          Popular Robux → USD amounts
        </h2>
        <p className="mt-2 mb-6 max-w-2xl text-ink/65">
          Cheapest web packs vs smooth app estimate vs standard DevEx. *Amounts under{" "}
          {formatRobux(DEVEX_MINIMUM_ROBUX)} cannot cash out alone.
        </p>
        <DataTable
          caption="Popular Robux amounts converted to USD"
          headers={[
            "Robux",
            "Cheapest web packs",
            "App smooth buy",
            "DevEx $0.0038",
            "After 30% fee",
          ]}
          rows={robuxTableRows}
        />
      </section>

      <section className="container mx-auto mt-16 px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              Popular USD & gift card budgets
            </h2>
            <p className="mt-2 mb-6 text-ink/65">
              Whole-pack Robux you can buy with a round dollar budget on each channel.
            </p>
            <DataTable
              caption="USD budgets to Robux"
              headers={["USD budget", "Web / gift card", "Mobile / console"]}
              rows={usdTableRows}
            />
            <p className="mt-3 text-sm text-ink/50">
              Need a deeper gift-card walkthrough? See the{" "}
              <Link href="/blog/roblox-gift-card-to-robux-chart" className="font-semibold text-teal-deep underline">
                gift card to Robux chart
              </Link>{" "}
              or open the{" "}
              <Link href="/usd-to-robux" className="font-semibold text-teal-deep underline">
                USD to Robux calculator
              </Link>
              .
            </p>
          </div>
          <div className="space-y-4">
            <Image
              src={BRAND_FEATURE_2}
              alt="USD to Robux gift card and budget converter"
              width={1200}
              height={800}
              className="h-auto w-full rounded-[1.5rem] border border-ink/10 object-cover"
            />
            <Callout title="Safety note" tone="gold">
              <p>
                This site never asks for your Roblox username, password, 2FA code, or gift-card PIN.
                Any page that promises free Robux after a “conversion” is a scam.
              </p>
            </Callout>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-16 px-4 md:px-8">
        <div className="mb-6 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            What makes this Robux to USD calculator different
          </h2>
          <p className="mt-2 text-ink/65">
            Built to close the gaps outdated converters leave: dual channels, pack solver, and
            current DevEx framing.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((card) => (
            <div key={card.title} className={sectionCardClass}>
              <h3 className="font-display text-xl font-bold text-ink">{card.title}</h3>
              <p className="mt-2 text-ink/65">{card.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { href: "/usd-to-robux", img: BRAND_FEATURE_2, label: "USD to Robux" },
            { href: "/robux-price-chart", img: BRAND_FEATURE_3, label: "Price chart" },
            { href: "/devex-calculator", img: BRAND_FEATURE_4, label: "DevEx calculator" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:border-teal/30"
            >
              <Image
                src={item.img}
                alt={item.label}
                width={800}
                height={520}
                className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <p className="px-4 py-3 text-sm font-semibold text-ink group-hover:text-teal-deep">
                {item.label} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-16 px-4 md:px-8">
        <div className={`${sectionCardClass} ${proseClass}`}>
          <h2>Buying rate vs DevEx vs the 30% fee</h2>
          <p>
            When money goes <strong>into</strong> Roblox, you pay pack prices. When eligible{" "}
            <strong>Earned Robux</strong> leave through DevEx, Roblox pays{" "}
            {formatUsd(DEVEX_STANDARD, 4)} each (standard) or {formatUsd(DEVEX_US_18_PLUS, 4)} for
            qualifying U.S. 18+ spend. Between those poles sits the marketplace: creators keep 70%
            of listed game-pass prices.
          </p>
          <ul>
            <li>
              <Link href="/devex-calculator">DevEx calculator</Link> — minimums, rate tiers, worked
              examples.
            </li>
            <li>
              <Link href="/robux-tax-calculator">Robux tax calculator</Link> — gross ↔ net after 30%.
            </li>
            <li>
              <Link href="/blog/can-you-sell-robux-for-real-money">
                Can you sell Robux for real money?
              </Link>{" "}
              — ToS, scams, and what DevEx actually allows.
            </li>
          </ul>
          <UnofficialNote />
        </div>
      </section>

      <section className="container mx-auto mt-16 px-4 md:px-8">
        <RelatedTools exclude={["/#calculator"]} />
      </section>

      <section className="container mx-auto mt-6 px-4 pb-8 md:px-8">
        <FaqSection title="Robux to USD FAQs" items={faqs} />
      </section>

      <section className="border-t border-ink/10 bg-white/70">
        <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center md:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              Ready to convert Robux to USD?
            </h2>
            <p className="mt-2 max-w-xl text-ink/65">
              Open the free calculator, switch channels, and see buy cost next to DevEx—right in
              your browser on robuxtousd.net.
            </p>
          </div>
          <CtaButton href="/#calculator" ariaLabel="Jump to Robux to USD calculator">
            Open calculator
          </CtaButton>
        </div>
      </section>
    </>
  );
}
