import Link from "next/link";
import type { Metadata } from "next";
import BlogArticle from "@/components/BlogArticle";
import { Callout, DataTable } from "@/components/ContentBits";
import { getPost, relatedFor } from "@/lib/blogPosts";
import { buildMetadata } from "@/lib/pageMeta";
import {
  DEVEX_MINIMUM_ROBUX,
  DEVEX_STANDARD,
  DEVEX_US_18_PLUS,
  formatRobux,
  formatUsd,
} from "@/lib/robuxRates";
import { grossFromNet, netFromGross } from "@/lib/taxMath";

const post = getPost("roblox-30-percent-tax-explained");

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.datePublished,
  keywords: [
    "roblox 30% tax",
    "roblox tax calculator",
    "robux after tax",
    "roblox marketplace fee",
    "how to price roblox items",
  ],
});

const INTRO =
  "When someone buys your item with Robux, Roblox keeps 30% and you receive 70%, rounded down to a whole Robux. This guide explains the fee, gives both formulas — net = floor(gross × 0.7) and gross = ceil(net ÷ 0.7) — and shows what the numbers mean in dollars.";

const FAQS = [
  {
    question: "How much Robux do I get after the 30% tax?",
    answer:
      "You get 70% rounded down. A 1,000 Robux sale gives you 700. A 999 Robux sale gives floor(999 × 0.7) = 699.",
  },
  {
    question: "How do I price an item to receive a specific amount?",
    answer:
      "Divide your target by 0.7 and round up. To receive 1,000 Robux, set the price to ceil(1,000 ÷ 0.7) = 1,429.",
  },
  {
    question: "Is the Roblox tax a government tax?",
    answer:
      "No. It is a marketplace fee that Roblox retains. Your earnings may also be subject to normal taxes in your country, which this guide does not calculate.",
  },
  {
    question: "Why does the calculator use floor and ceil?",
    answer:
      "Robux are whole numbers. Going from sale price to net, the fractional Robux is dropped (floor). Going from a target to a price, we round up (ceil) so you never fall short.",
  },
  {
    question: "Does the 30% fee apply when I buy Robux?",
    answer:
      "No. The fee applies to sales through the marketplace, not to purchasing Robux packs with real money.",
  },
];

const PRICE_ROWS = [100, 250, 499, 999, 1000, 2500, 10000];
const TARGET_ROWS = [100, 500, 1000, 5000, 10000, DEVEX_MINIMUM_ROBUX];

export default function Page() {
  return (
    <BlogArticle meta={post} intro={INTRO} faqs={FAQS} relatedPosts={relatedFor(post.slug)}>
      <p>{INTRO}</p>

      <h2>What the 30% Roblox tax actually is</h2>
      <p>
        The &ldquo;Roblox tax&rdquo; is the marketplace fee Roblox keeps on Robux sales. If a buyer
        spends 100 Robux on your item, <strong>30 Robux go to Roblox and 70 reach you</strong>. It
        is not a government tax, and it is separate from any income tax you may owe on real-money
        payouts. In this guide, <em>gross</em> means the price the buyer pays and <em>net</em>{" "}
        means what you receive.
      </p>

      <h2>The two formulas</h2>
      <DataTable
        caption="Robux tax formulas"
        headers={["Direction", "Formula", "Use it when"]}
        rows={[
          ["Gross → net", "net = floor(gross × 0.7)", "You know the sale price"],
          ["Net → gross", "gross = ceil(net ÷ 0.7)", "You know what you want to receive"],
        ]}
      />
      <p>
        Both formulas round to whole Robux. Dropping the fraction when you receive Robux and
        rounding up when you price an item is what keeps your numbers honest.
      </p>

      <h2>Sale price → what you receive</h2>
      <DataTable
        caption="Net Robux after 30% fee"
        headers={["Sale price", "You receive", "Roblox keeps", "Net at DevEx standard"]}
        rows={PRICE_ROWS.map((g) => {
          const net = netFromGross(g);
          return [
            formatRobux(g),
            formatRobux(net),
            formatRobux(g - net),
            formatUsd(net * DEVEX_STANDARD),
          ];
        })}
      />
      <p>
        Notice 499 and 999: the fee never gives you a fractional Robux, so odd prices round against
        you slightly. Prices ending where 70% is a whole number — such as multiples of 10 — keep
        the math clean.
      </p>

      <h2>Target → price to set</h2>
      <DataTable
        caption="Price needed to receive a target amount"
        headers={["You want to receive", "Set price to", "Check: you receive"]}
        rows={TARGET_ROWS.map((n) => {
          const g = grossFromNet(n);
          return [formatRobux(n), formatRobux(g), formatRobux(netFromGross(g))];
        })}
      />
      <Callout title="Example: receive 1,000 Robux">
        <p>
          1,000 ÷ 0.7 = 1,428.57, so you round up to <strong>1,429</strong>. At 1,429 you receive
          floor(1,000.3) = 1,000. At 1,428 you would receive only 999.
        </p>
      </Callout>

      <h2>What the fee means in dollars</h2>
      <p>
        Robux become dollars only through DevEx, and only for eligible creators with at least{" "}
        {formatRobux(DEVEX_MINIMUM_ROBUX)} earned Robux. At the standard ${DEVEX_STANDARD} rate, each
        Robux you keep is worth about a third of a cent; at the U.S. 18+ rate of $
        {DEVEX_US_18_PLUS}, a bit more than half a cent. The fee comes <em>before</em> that:
      </p>
      <ul>
        <li>
          A 1,000 Robux sale: you keep 700, worth {formatUsd(700 * DEVEX_STANDARD)} (standard) or{" "}
          {formatUsd(700 * DEVEX_US_18_PLUS)} (U.S. 18+).
        </li>
        <li>
          To reach the {formatRobux(DEVEX_MINIMUM_ROBUX)} minimum: buyers must spend about{" "}
          {formatRobux(grossFromNet(DEVEX_MINIMUM_ROBUX))} Robux in total.
        </li>
      </ul>
      <p>
        Run your numbers in the <Link href="/robux-tax-calculator">Robux tax calculator</Link> or
        see the DevEx side in the <Link href="/devex-calculator">DevEx calculator</Link>. The full
        rate breakdown is in the{" "}
        <Link href="/blog/roblox-devex-rates-2026-guide">DevEx rates 2026 guide</Link>.
      </p>

      <h2>Pricing strategy with a 30% fee</h2>
      <ol>
        <li>
          <strong>Decide your target net first.</strong> Price from what you want to receive, not
          what looks nice.
        </li>
        <li>
          <strong>Use clean numbers.</strong> A price of 100 nets exactly 70; 99 nets 69.
        </li>
        <li>
          <strong>Add margin for the dollar view.</strong> Remember net Robux are worth only a
          fraction of what buyers paid in dollars.
        </li>
        <li>
          <strong>Re-check when rules change.</strong> Fees and programs can change; verify with
          Roblox.
        </li>
      </ol>

      <h2>A common misunderstanding</h2>
      <p>
        Players who buy Robux for $9.99 per 1,000 sometimes assume a creator earns that dollar
        value. In reality the creator receives 70% of the sale, and only eligible, earned Robux can
        be cashed out through DevEx at about {formatUsd(DEVEX_STANDARD, 4)} each. The gap between
        buy price and creator income is large, and it is the same reason{" "}
        <Link href="/blog/can-you-sell-robux-for-real-money">
          you cannot sell Robux for real money
        </Link>{" "}
        as a regular player.
      </p>
    </BlogArticle>
  );
}
