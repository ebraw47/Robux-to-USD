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
import RobuxTaxCalculator from "@/components/RobuxTaxCalculator";
import { buildMetadata } from "@/lib/pageMeta";
import {
  DEVEX_STANDARD,
  RATES_LAST_VERIFIED,
  formatRobux,
  formatUsd,
} from "@/lib/robuxRates";
import { grossFromNet, netFromGross } from "@/lib/taxMath";
import { BRAND_FEATURE_3 } from "@/lib/siteConfig";

const PATH = "/robux-tax-calculator";
const TITLE = "Robux Tax Calculator — Roblox 30% Fee: Gross to Net";
const DESCRIPTION =
  "Free Robux tax calculator for the 30% Roblox marketplace fee. Convert sale price to Robux you receive (floor of 70%), or find the price needed to net a target, with USD equivalents.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "robux tax calculator",
    "roblox 30% tax",
    "robux after tax",
    "roblox marketplace fee calculator",
    "how much robux after tax",
  ],
});

const TABLE_ROWS = [100, 500, 1000, 5000, 10000, 100000];

const FAQS = [
  {
    question: "How much Robux do I get after the 30% tax?",
    answer:
      "You keep 70%, rounded down to a whole Robux. A 1,000 Robux sale pays you 700 Robux. A 999 Robux sale pays floor(999 × 0.7) = 699 Robux.",
  },
  {
    question: "What price should I set to receive an exact amount?",
    answer:
      "Divide the Robux you want by 0.7 and round up. To receive 700 Robux, set the price at 1,000. To receive 1,000, set it at ceil(1,000 ÷ 0.7) = 1,429.",
  },
  {
    question: "Is the Roblox 30% fee the same as a tax?",
    answer:
      "It is a marketplace fee that Roblox keeps from sales, not a government tax. People often call it the Roblox tax. Your creator earnings may also be subject to real taxes in your country, which this calculator does not estimate.",
  },
  {
    question: "Does the fee apply to every Robux transaction?",
    answer:
      "The calculator assumes the standard 30% marketplace fee on a sale. Different products, group payouts, or special programs can behave differently, so check the Roblox documentation for your situation.",
  },
  {
    question: "How do I turn net Robux into dollars?",
    answer: `Eligible creators can use DevEx. At the standard $${DEVEX_STANDARD} per Robux, 700 net Robux is worth about ${formatUsd(700 * DEVEX_STANDARD)}. The calculator shows standard and U.S. 18+ values for you.`,
  },
  {
    question: "Does Robux to USD collect fees or payments?",
    answer:
      "No. This is an unofficial informational calculator. We do not handle Robux, accounts, or payments, and we never ask for your Roblox login.",
  },
];

export default function RobuxTaxCalculatorPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Robux tax calculator", href: PATH },
        ]}
      />
      <ToolPageSchema name="Robux Tax Calculator" description={DESCRIPTION} path={PATH} />

      <div className="container mx-auto max-w-5xl px-4 pb-16 pt-6">
        <header className="mb-8 grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep">
              30% marketplace fee · verified {RATES_LAST_VERIFIED}
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
              Robux tax calculator
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">
              See exactly how many Robux you receive after Roblox&apos;s 30% marketplace fee — or work
              backwards to the price you need to set. Results use whole-Robux rounding and show a USD
              equivalent so you can plan a DevEx cashout.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-white">
            <Image
              src={BRAND_FEATURE_3}
              alt="Robux tax calculator showing gross and net Robux after the 30% fee"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
              priority
            />
          </div>
        </header>

        <RobuxTaxCalculator />

        <section className="mt-14" aria-labelledby="formulas">
          <h2 id="formulas" className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
            The two formulas
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className={sectionCardClass}>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-deep">
                Gross → net
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-ink">
                net = floor(gross × 0.7)
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Use when you know the item&apos;s sale price and want the Robux that reach your
                balance.
              </p>
            </div>
            <div className={sectionCardClass}>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-deep">
                Net → gross
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-ink">
                gross = ceil(net ÷ 0.7)
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Use when you want to receive a target amount and need the price to set.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="table">
          <h2 id="table" className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
            Robux after tax: quick reference
          </h2>
          <DataTable
            caption="Net Robux and DevEx value after the 30% fee"
            headers={[
              "Sale price (gross)",
              "You receive (net)",
              "Fee",
              "Net at DevEx standard",
              "Price to net this amount",
            ]}
            rows={TABLE_ROWS.map((g) => {
              const net = netFromGross(g);
              return [
                formatRobux(g),
                formatRobux(net),
                formatRobux(g - net),
                formatUsd(net * DEVEX_STANDARD),
                formatRobux(grossFromNet(g)),
              ];
            })}
          />
          <p className="mt-3 text-sm text-ink/55">
            The last column shows the price you would set to receive that Robux figure as net.
          </p>
        </section>

        <section className={`mt-14 ${sectionCardClass}`}>
          <div className={proseClass}>
            <h2 className="!mt-0">Understanding the Roblox 30% fee</h2>
            <p>
              When a player buys your item, pass or product with Robux, Roblox keeps 30% and you
              receive 70%. Because Robux are whole numbers, the amount you receive is rounded
              down. That is why the calculator uses <strong>floor</strong> when going from gross to
              net, and <strong>ceil</strong> when going from net to gross — it makes sure your
              target is never undershot.
            </p>
            <Callout title="Example">
              <p>
                You want to receive at least 1,000 Robux per sale. Setting a price of 1,429 gives
                floor(1,429 × 0.7) = 1,000. Setting 1,428 would give only 999.
              </p>
            </Callout>
            <h3>Why the fee matters for DevEx</h3>
            <p>
              DevEx cashouts start at 30,000 earned Robux. If you have to earn 30,000 net Robux,
              your buyers must spend about {formatRobux(grossFromNet(30_000))} Robux in
              total. At the standard rate, those 30,000 net Robux convert to{" "}
              {formatUsd(30_000 * DEVEX_STANDARD)}. Use the{" "}
              <Link href="/devex-calculator">DevEx calculator</Link> for different rate scenarios.
            </p>
            <p>
              Want the full explanation, including how the fee changes your pricing strategy? Read{" "}
              <Link href="/blog/roblox-30-percent-tax-explained">Roblox 30% tax explained</Link>.
            </p>
          </div>
        </section>

        <FaqSection items={FAQS} title="Robux tax calculator FAQ" />
        <RelatedTools exclude={[PATH]} />
        <UnofficialNote className="mt-10" />
      </div>
    </>
  );
}
