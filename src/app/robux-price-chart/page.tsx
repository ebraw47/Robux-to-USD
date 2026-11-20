import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Callout,
  DataTable,
  proseClass,
  RelatedTools,
  sectionCardClass,
  ToolPageSchema,
  UnofficialNote,
} from "@/components/ContentBits";
import FaqSection from "@/components/FaqSection";
import { buildMetadata } from "@/lib/pageMeta";
import {
  RATES_LAST_VERIFIED,
  ROBUX_PACKS,
  formatRobux,
  formatUsd,
} from "@/lib/robuxRates";
import { BRAND_FEATURE_3 } from "@/lib/siteConfig";

const PATH = "/robux-price-chart";
const TITLE = "Robux Price Chart 2026 — Web vs App Prices for All 9 Packs";
const DESCRIPTION =
  "Full Robux price chart for 2026: all nine U.S. packs from $2.99 to $199.99, web/gift card vs mobile Robux, cost per Robux, plus a Roblox Plus note. Updated November 2026.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "robux price chart",
    "robux prices",
    "robux cost",
    "how much is 1000 robux",
    "web vs app robux",
  ],
});

const PLUS_PLANS = [
  { price: "$4.99", note: "Entry plan" },
  { price: "$8.99", note: "Mid plan" },
  { price: "$12.99", note: "Upper plan" },
  { price: "$21.99", note: "Top plan" },
];

const FAQS = [
  {
    question: "How much is 1,000 Robux in USD?",
    answer:
      "On the web or with a gift card, the $9.99 pack gives 1,000 Robux, which is about $0.00999 per Robux. In the mobile app the $9.99 tier gives 800 Robux, so 1,000 Robux costs roughly $12.49 if you scale up that rate.",
  },
  {
    question: "Which Robux pack is the best value?",
    answer:
      "Per Robux, the $199.99 pack on the web is the lowest-cost tier in this chart, followed by the $99.99 pack. The best choice still depends on what you need; buying a larger pack than you will use is not a saving.",
  },
  {
    question: "Why are Robux cheaper on the website than in the app?",
    answer:
      "App-store purchases on iOS, Android and console include platform fees, so the same dollar amount buys fewer Robux than the web checkout or a gift card. The gap runs from about 10% to 25% depending on the tier.",
  },
  {
    question: "Does Roblox Premium still give a 10% Robux bonus?",
    answer:
      "No. The 10% Robux bonus that used to come with Premium purchases has ended. Roblox now offers Roblox Plus plans at $4.99, $8.99, $12.99 and $21.99. Check the Roblox site for exactly what your plan includes before subscribing.",
  },
  {
    question: "Are these prices the same outside the United States?",
    answer:
      "No. This chart uses U.S. dollar pricing. Other countries see local-currency prices and sometimes different Robux amounts, so use it as a reference rather than an exact quote.",
  },
  {
    question: "How often is the Robux price chart updated?",
    answer: `The chart was last verified on ${RATES_LAST_VERIFIED}. We review it whenever Roblox announces pricing changes, but you should always confirm the final amount at checkout.`,
  },
];

export default function RobuxPriceChartPage() {
  const rows = ROBUX_PACKS.map((p) => {
    const webRate = p.priceUsd / p.webRobux;
    const appRate = p.priceUsd / p.appRobux;
    const extraPct = ((p.webRobux - p.appRobux) / p.appRobux) * 100;
    return [
      formatUsd(p.priceUsd),
      formatRobux(p.webRobux),
      formatRobux(p.appRobux),
      formatUsd(webRate, 4),
      formatUsd(appRate, 4),
      `+${extraPct.toFixed(1)}%`,
    ];
  });

  const bestWeb = [...ROBUX_PACKS].sort(
    (a, b) => a.priceUsd / a.webRobux - b.priceUsd / b.webRobux
  )[0];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Robux price chart", href: PATH },
        ]}
      />
      <ToolPageSchema name="Robux Price Chart" description={DESCRIPTION} path={PATH} />

      <div className="container mx-auto max-w-5xl px-4 pb-16 pt-6">
        <header className="mb-8 grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep">
              Verified {RATES_LAST_VERIFIED}
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
              Robux price chart: web vs app
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">
              All nine standard U.S. Robux packs in one table — how many Robux each price buys on
              the web or with a gift card, how many in the mobile app, and what each Robux really
              costs in dollars.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-white">
            <Image
              src={BRAND_FEATURE_3}
              alt="Robux price chart comparing web and app pack sizes"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
              priority
            />
          </div>
        </header>

        <section aria-labelledby="chart">
          <h2 id="chart" className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
            Full Robux pack table (9 tiers)
          </h2>
          <DataTable
            caption="Robux packs: web/gift card vs mobile/console"
            headers={[
              "Price (USD)",
              "Web / gift card Robux",
              "Mobile / console Robux",
              "Web $ per Robux",
              "App $ per Robux",
              "Extra Robux on web",
            ]}
            rows={rows}
          />
          <p className="mt-3 text-sm text-ink/55">
            Lowest web cost per Robux in this table: {formatUsd(bestWeb.priceUsd)} pack at{" "}
            {formatUsd(bestWeb.priceUsd / bestWeb.webRobux, 4)} per Robux. Prices in USD for the
            United States; verified {RATES_LAST_VERIFIED}.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              h: "Web & gift cards",
              p: "Redeem a gift card or pay on roblox.com to use the web column. This is almost always the best USD to Robux rate.",
            },
            {
              h: "Mobile & console",
              p: "iOS, Android, Xbox and similar stores use the app column. Expect 10–25% fewer Robux at the same price.",
            },
            {
              h: "Cost per Robux",
              p: "Divide price by Robux. The $9.99 web pack is the easy benchmark at $0.00999 per Robux.",
            },
          ].map((c) => (
            <div key={c.h} className={sectionCardClass}>
              <h3 className="font-display text-lg font-bold text-ink">{c.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{c.p}</p>
            </div>
          ))}
        </section>

        <section className={`mt-12 ${sectionCardClass}`} aria-labelledby="plus">
          <div className={proseClass}>
            <h2 id="plus" className="!mt-0">
              Roblox Plus note: Premium&apos;s 10% bonus has ended
            </h2>
            <p>
              Older Robux price guides mention a 10% Robux bonus for Roblox Premium members. That
              bonus <strong>has ended</strong>, so you should not add 10% to the tables above.
              Roblox now sells <strong>Roblox Plus</strong> subscription plans at the prices below.
              The chart on this page reflects one-time pack prices only — subscription benefits
              are separate and can change, so check Roblox for the current list.
            </p>
            <div className="grid gap-3 sm:grid-cols-4">
              {PLUS_PLANS.map((plan) => (
                <div
                  key={plan.price}
                  className="rounded-xl border border-orange/30 bg-orange/[0.07] p-4 text-center"
                >
                  <p className="font-display text-2xl font-bold text-ink">{plan.price}</p>
                  <p className="text-xs text-ink/60">{plan.note}</p>
                </div>
              ))}
            </div>
            <p>
              For a full comparison of old Premium rates versus Plus, read{" "}
              <Link href="/blog/roblox-plus-vs-premium-robux-rates">
                Roblox Plus vs Premium Robux rates
              </Link>
              .
            </p>
          </div>
        </section>

        <section className={`mt-12 ${sectionCardClass}`}>
          <div className={proseClass}>
            <h2 className="!mt-0">How to read a Robux price chart</h2>
            <p>
              Robux pricing looks simple until you compare channels. Here is what actually matters
              when you scan the table:
            </p>
            <ul>
              <li>
                <strong>Channel first, tier second.</strong> The difference between web and app
                at the same dollar amount is often bigger than the difference between neighbouring
                tiers on the same channel.
              </li>
              <li>
                <strong>Larger packs lower the unit price.</strong> The $2.99 web pack costs about
                $0.0111 per Robux, while the $199.99 pack is under $0.0084.
              </li>
              <li>
                <strong>Robux are not worth their buy price when you sell.</strong> Creators who
                cash out through DevEx earn about $0.0038 per Robux at the standard rate, which is
                a fraction of the $0.00999 you pay on the web.
              </li>
            </ul>
            <Callout tone="gold" title="Not a way to sell Robux">
              <p>
                This site cannot buy or sell Robux. Trading Robux for cash outside Roblox&apos;s
                own programs breaks the rules and is a common scam. Read{" "}
                <Link href="/blog/can-you-sell-robux-for-real-money">
                  can you sell Robux for real money
                </Link>{" "}
                for the legitimate route.
              </p>
            </Callout>
            <p>
              Need a quick answer for a specific amount? Use the{" "}
              <Link href="/usd-to-robux">USD to Robux calculator</Link> or the{" "}
              <Link href="/#calculator">Robux to USD calculator</Link>. For tier-by-tier
              comparisons, see{" "}
              <Link href="/blog/web-vs-mobile-robux-prices">web vs mobile Robux prices</Link>.
            </p>
          </div>
        </section>

        <FaqSection items={FAQS} title="Robux price chart FAQ" />
        <RelatedTools exclude={[PATH]} />
        <UnofficialNote className="mt-10" />
      </div>
    </>
  );
}
