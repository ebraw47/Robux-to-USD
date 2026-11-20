import Link from "next/link";
import type { Metadata } from "next";
import BlogArticle from "@/components/BlogArticle";
import { Callout, DataTable } from "@/components/ContentBits";
import { getPost, relatedFor } from "@/lib/blogPosts";
import { buildMetadata } from "@/lib/pageMeta";
import {
  DEVEX_LEGACY,
  DEVEX_MINIMUM_ROBUX,
  DEVEX_STANDARD,
  DEVEX_US_18_PLUS,
  devexUsd,
  formatRobux,
  formatUsd,
} from "@/lib/robuxRates";
import { grossFromNet, netFromGross } from "@/lib/taxMath";

const post = getPost("roblox-devex-rates-2026-guide");

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.datePublished,
  keywords: [
    "roblox devex rates 2026",
    "devex rate",
    "devex 30000 robux",
    "0.0038 devex",
    "0.0054 devex",
    "how much is 100k robux",
  ],
});

const INTRO =
  "Developer Exchange (DevEx) is the only official way for eligible Roblox creators to turn earned Robux into real money. This 2026 guide covers the standard $0.0038 rate, the $0.0054 rate for eligible U.S. 18+ creators, the $0.0035 legacy rate, the 30,000 Robux minimum, and worked examples.";

const FAQS = [
  {
    question: "What is the DevEx rate per Robux?",
    answer:
      "Our calculator uses $0.0038 per Robux as the standard rate, $0.0054 for eligible U.S. creators aged 18 or older, and $0.0035 as the legacy reference rate.",
  },
  {
    question: "How many Robux do I need for DevEx?",
    answer: `You need at least ${formatRobux(DEVEX_MINIMUM_ROBUX)} earned Robux. That is about ${formatUsd(devexUsd(DEVEX_MINIMUM_ROBUX))} at the standard rate and ${formatUsd(devexUsd(DEVEX_MINIMUM_ROBUX, DEVEX_US_18_PLUS))} at the U.S. 18+ rate.`,
  },
  {
    question: "How much is 1 million Robux in USD with DevEx?",
    answer: `At $0.0038 per Robux, 1,000,000 Robux is ${formatUsd(devexUsd(1_000_000))}. At the U.S. 18+ rate of $0.0054 it is ${formatUsd(devexUsd(1_000_000, DEVEX_US_18_PLUS))}.`,
  },
  {
    question: "Can I DevEx Robux I purchased?",
    answer:
      "No. Only earned Robux count. Robux purchased with money or a gift card cannot be cashed out.",
  },
  {
    question: "Does the 30% fee reduce my DevEx payout?",
    answer:
      "The fee is taken when a sale happens, so you earn 70% of the sale price. DevEx then converts the Robux you hold. Plan with the net figure, not the sale price.",
  },
  {
    question: "Are DevEx payouts guaranteed?",
    answer:
      "No. Eligibility, review, payout partner fees and taxes are controlled by Roblox and local law. Treat calculator figures as estimates and confirm in your creator dashboard.",
  },
];

const AMOUNTS = [30_000, 50_000, 100_000, 250_000, 500_000, 1_000_000];

export default function Page() {
  return (
    <BlogArticle meta={post} intro={INTRO} faqs={FAQS} relatedPosts={relatedFor(post.slug)}>
      <p>{INTRO}</p>

      <h2>DevEx rates at a glance</h2>
      <DataTable
        caption="DevEx rates used in this guide"
        headers={["Rate type", "USD per Robux", "Who it applies to"]}
        rows={[
          ["Standard", `$${DEVEX_STANDARD}`, "Default estimate for most eligible creators"],
          [
            "U.S. 18+ eligible",
            `$${DEVEX_US_18_PLUS}`,
            "Eligible creators in the United States aged 18 or older",
          ],
          ["Legacy", `$${DEVEX_LEGACY}`, "Older reference rate for comparison"],
        ]}
      />
      <p>
        The minimum cashout is <strong>{formatRobux(DEVEX_MINIMUM_ROBUX)} earned Robux</strong>.
        Rates and rules are verified as of November 2026; confirm yours in your Roblox creator
        dashboard before acting.
      </p>

      <h2>The formula</h2>
      <p>
        <strong>USD = Robux × rate.</strong> There are no tiers in the formula itself — a rate
        applies to your whole cashout. The difference between $0.0038 and $0.0054 is{" "}
        {Math.round((DEVEX_US_18_PLUS / DEVEX_STANDARD - 1) * 100)}% more money for the same Robux,
        which is why the rate you qualify for matters.
      </p>

      <h2>Worked examples</h2>
      <DataTable
        caption="DevEx value at each rate"
        headers={["Earned Robux", "Standard $0.0038", "U.S. 18+ $0.0054", "Legacy $0.0035"]}
        rows={AMOUNTS.map((r) => [
          formatRobux(r),
          formatUsd(devexUsd(r, DEVEX_STANDARD)),
          formatUsd(devexUsd(r, DEVEX_US_18_PLUS)),
          formatUsd(devexUsd(r, DEVEX_LEGACY)),
        ])}
      />
      <p>
        Try your own number in the <Link href="/devex-calculator">DevEx calculator</Link>.
      </p>

      <h2>Earned Robux only</h2>
      <p>
        DevEx exists to pay creators, so the balance counted toward the {formatRobux(DEVEX_MINIMUM_ROBUX)}{" "}
        minimum is Robux earned through experiences, passes, developer products and items. If you
        bought Robux or received them as a gift, those do not qualify. This surprises many players
        who search for how to cash out their balance, and it is the reason{" "}
        <Link href="/blog/can-you-sell-robux-for-real-money">
          selling Robux for real money
        </Link>{" "}
        is not possible for a normal account.
      </p>

      <h2>How the 30% fee changes your target</h2>
      <p>
        Roblox keeps 30% of marketplace sales, so a buyer&apos;s Robux are not all yours. To end up
        with {formatRobux(DEVEX_MINIMUM_ROBUX)} Robux at the minimum, buyers must spend about{" "}
        {formatRobux(grossFromNet(DEVEX_MINIMUM_ROBUX))} Robux in total. In reverse, if buyers spend{" "}
        {formatRobux(100_000)}, you receive {formatRobux(netFromGross(100_000))}, which is worth{" "}
        {formatUsd(devexUsd(netFromGross(100_000)))} at the standard rate or{" "}
        {formatUsd(devexUsd(netFromGross(100_000), DEVEX_US_18_PLUS))} at the U.S. 18+ rate. Use the{" "}
        <Link href="/robux-tax-calculator">Robux tax calculator</Link> to run this for any price.
      </p>
      <Callout tone="gold" title="Same Robux, different dollars">
        <p>
          A player buying 100,000 Robux on the web pays roughly $999. A creator who earns the same
          100,000 Robux gets $380 at the standard rate. Do not use DevEx value as a measure of
          what Robux cost to buy.
        </p>
      </Callout>

      <h2>Step-by-step: preparing for a DevEx cashout</h2>
      <ol>
        <li>
          <strong>Check eligibility.</strong> Read Roblox&apos;s current DevEx requirements for your
          account, age and region.
        </li>
        <li>
          <strong>Track earned Robux net of fees.</strong> Count the 70% you actually received.
        </li>
        <li>
          <strong>Hit the minimum.</strong> {formatRobux(DEVEX_MINIMUM_ROBUX)} earned Robux is the
          floor.
        </li>
        <li>
          <strong>Estimate the payout.</strong> Multiply by the rate that applies to you.
        </li>
        <li>
          <strong>Plan for fees and taxes.</strong> Payout partners and tax rules vary, so keep a
          margin.
        </li>
      </ol>

      <h2>Common DevEx mistakes</h2>
      <ul>
        <li>Counting purchased Robux toward the minimum.</li>
        <li>Forgetting that sale price is gross and you receive 70%.</li>
        <li>Assuming the U.S. 18+ rate applies without checking eligibility.</li>
        <li>Trusting third-party &ldquo;DevEx accelerators&rdquo; or buyers who ask for logins.</li>
      </ul>

      <h2>Where to go next</h2>
      <p>
        If you are buying rather than cashing out, compare channels in{" "}
        <Link href="/blog/web-vs-mobile-robux-prices">web vs mobile Robux prices</Link> or run a
        budget in the <Link href="/usd-to-robux">USD to Robux calculator</Link>. To see your
        Robux in both directions at once, use the main{" "}
        <Link href="/#calculator">Robux to USD calculator</Link>.
      </p>
    </BlogArticle>
  );
}
