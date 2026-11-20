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
import RobuxCalculator from "@/components/RobuxCalculator";
import { buildMetadata } from "@/lib/pageMeta";
import {
  DEVEX_LEGACY,
  DEVEX_MINIMUM_ROBUX,
  DEVEX_STANDARD,
  DEVEX_US_18_PLUS,
  RATES_LAST_VERIFIED,
  devexUsd,
  formatRobux,
  formatUsd,
} from "@/lib/robuxRates";
import { BRAND_FEATURE_4 } from "@/lib/siteConfig";

const PATH = "/devex-calculator";
const TITLE = "DevEx Calculator 2026 — Robux to USD Cashout Rates";
const DESCRIPTION =
  "Roblox DevEx calculator: convert Robux to USD at $0.0038 standard, $0.0054 for eligible U.S. 18+ creators, or $0.0035 legacy. Includes the 30,000 Robux minimum and worked examples.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "devex calculator",
    "roblox devex rate",
    "robux to usd devex",
    "devex 30000 robux",
    "how much is 100k robux",
  ],
});

const EXAMPLES = [30_000, 50_000, 100_000, 250_000, 500_000, 1_000_000];

const FAQS = [
  {
    question: "What is the Roblox DevEx rate in 2026?",
    answer:
      "The standard DevEx rate used in this calculator is $0.0038 per Robux. Eligible U.S. creators aged 18 or older are shown at $0.0054 per Robux, and a legacy rate of $0.0035 per Robux is included for older reference calculations.",
  },
  {
    question: "What is the DevEx minimum?",
    answer:
      "The minimum cashout is 30,000 earned Robux. Robux you purchased with real money do not count toward DevEx; only Robux earned through the creator ecosystem are eligible.",
  },
  {
    question: "How much is 100,000 Robux in USD through DevEx?",
    answer:
      "At the standard $0.0038 rate, 100,000 Robux is $380.00. At the U.S. 18+ rate of $0.0054 it is $540.00. At the legacy $0.0035 rate it is $350.00.",
  },
  {
    question: "Can I DevEx Robux I bought?",
    answer:
      "No. DevEx is for Robux earned from experiences, items and other creator activity. Buying Robux and trying to convert them into dollars is both impossible through DevEx and a common scam setup.",
  },
  {
    question: "Does the 30% marketplace fee apply before DevEx?",
    answer:
      "Yes, in practice. When someone buys your item, Roblox keeps 30% and you receive 70% as earned Robux. DevEx then converts the Robux you hold. Use the Robux tax calculator to estimate the net amount before cashing out.",
  },
  {
    question: "Does this calculator guarantee my payout?",
    answer:
      "No. It is an unofficial estimate. Eligibility, taxes, payout partner fees, review times and policies are controlled by Roblox, so confirm your own numbers in your creator dashboard.",
  },
];

export default function DevexCalculatorPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "DevEx calculator", href: PATH },
        ]}
      />
      <ToolPageSchema name="DevEx Calculator" description={DESCRIPTION} path={PATH} />

      <div className="container mx-auto max-w-5xl px-4 pb-16 pt-6">
        <header className="mb-8 grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep">
              For Roblox creators · verified {RATES_LAST_VERIFIED}
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
              DevEx calculator: Robux to USD cashout
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">
              Estimate what your earned Robux could be worth through Roblox&apos;s Developer Exchange.
              Enter your Robux below — the results panel shows the standard rate, the U.S. 18+ rate
              and what remains after the 30% marketplace fee. DevEx requires at least{" "}
              <strong>{formatRobux(DEVEX_MINIMUM_ROBUX)} Robux</strong>.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-white">
            <Image
              src={BRAND_FEATURE_4}
              alt="DevEx calculator converting earned Robux to USD"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
              priority
            />
          </div>
        </header>

        <RobuxCalculator id="calculator" title="DevEx & Robux to USD Calculator" defaultMode="robux-to-usd" />

        <section className="mt-14" aria-labelledby="rates">
          <h2 id="rates" className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
            DevEx rates at a glance
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Standard",
                rate: DEVEX_STANDARD,
                body: "The default rate used for most estimates.",
              },
              {
                label: "U.S. 18+ eligible",
                rate: DEVEX_US_18_PLUS,
                body: "Higher rate shown for eligible U.S. creators aged 18 or older.",
              },
              {
                label: "Legacy",
                rate: DEVEX_LEGACY,
                body: "Older reference rate; useful for comparing historic payouts.",
              },
            ].map((r) => (
              <div key={r.label} className={sectionCardClass}>
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-deep">
                  {r.label}
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-ink">
                  {formatUsd(r.rate, 4)}
                </p>
                <p className="text-sm text-ink/55">per Robux</p>
                <p className="mt-3 text-sm text-ink/70">{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="examples">
          <h2 id="examples" className="mb-2 font-display text-2xl font-bold text-ink md:text-3xl">
            DevEx payout examples
          </h2>
          <p className="mb-5 text-ink/70">
            Gross DevEx value at each rate. These examples ignore payout partner fees, taxes and
            the 30% marketplace fee you may already have paid when earning the Robux.
          </p>
          <DataTable
            caption="DevEx value by Robux amount"
            headers={["Robux", "Standard $0.0038", "U.S. 18+ $0.0054", "Legacy $0.0035"]}
            rows={EXAMPLES.map((r) => [
              formatRobux(r),
              formatUsd(devexUsd(r, DEVEX_STANDARD)),
              formatUsd(devexUsd(r, DEVEX_US_18_PLUS)),
              formatUsd(devexUsd(r, DEVEX_LEGACY)),
            ])}
          />
        </section>

        <section className={`mt-14 ${sectionCardClass}`}>
          <div className={proseClass}>
            <h2 className="!mt-0">How DevEx works in plain English</h2>
            <p>
              Developer Exchange (DevEx) is the only official way for eligible creators to turn
              earned Robux into real money. You apply through your Roblox account, meet the
              eligibility rules, and request a cashout once you hold at least{" "}
              <strong>{formatRobux(DEVEX_MINIMUM_ROBUX)} earned Robux</strong>. The payout equals
              your Robux multiplied by the DevEx rate that applies to you.
            </p>
            <h3>Quick formula</h3>
            <p>
              <strong>USD = Robux × rate.</strong> For 45,000 Robux at the standard rate that is
              45,000 × $0.0038 = <strong>{formatUsd(devexUsd(45_000))}</strong>. At the U.S. 18+
              rate it would be <strong>{formatUsd(devexUsd(45_000, DEVEX_US_18_PLUS))}</strong>.
            </p>
            <h3>What counts toward the minimum</h3>
            <ul>
              <li>Earned Robux from experiences, game passes, developer products and items.</li>
              <li>
                Not purchased Robux. Robux you bought with dollars or a gift card cannot be cashed
                out.
              </li>
              <li>
                Robux after the marketplace fee. If an item sold for 1,000 Robux, you only received
                700 — see the{" "}
                <Link href="/robux-tax-calculator">Robux tax calculator</Link>.
              </li>
            </ul>
            <Callout tone="gold" title="Buying vs cashing out">
              <p>
                Buying 1,000 Robux on the web costs about $9.99. Cashing out 1,000 earned Robux at
                the standard DevEx rate pays about $3.80. That roughly 2.6× gap is normal — Robux
                are a closed in-game currency, not a dollar-pegged asset.
              </p>
            </Callout>
            <p>
              For a long-form walkthrough with timelines and eligibility notes, read our{" "}
              <Link href="/blog/roblox-devex-rates-2026-guide">DevEx rates 2026 guide</Link>.
              If you wonder whether regular players can sell Robux, see{" "}
              <Link href="/blog/can-you-sell-robux-for-real-money">
                can you sell Robux for real money
              </Link>
              .
            </p>
          </div>
        </section>

        <FaqSection items={FAQS} title="DevEx calculator FAQ" />
        <RelatedTools exclude={[PATH]} />
        <UnofficialNote className="mt-10" />
      </div>
    </>
  );
}
