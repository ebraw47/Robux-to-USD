import Link from "next/link";
import type { Metadata } from "next";
import BlogArticle from "@/components/BlogArticle";
import { Callout, DataTable } from "@/components/ContentBits";
import { getPost, relatedFor } from "@/lib/blogPosts";
import { buildMetadata } from "@/lib/pageMeta";
import {
  APP_RATE_PER_ROBUX,
  ROBUX_PACKS,
  WEB_RATE_PER_ROBUX,
  formatRobux,
  formatUsd,
} from "@/lib/robuxRates";

const post = getPost("web-vs-mobile-robux-prices");

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.datePublished,
  keywords: [
    "web vs mobile robux prices",
    "robux cheaper on website",
    "roblox app vs web robux",
    "why is robux cheaper on pc",
    "robux price difference",
  ],
});

const INTRO =
  "The same dollars buy fewer Robux in an app store than on roblox.com or with a gift card. The gap is between 10% and 25% depending on the tier. Here is every tier side by side, the reason for the difference, and how to avoid overpaying.";

const FAQS = [
  {
    question: "Are Robux cheaper on the website than on mobile?",
    answer:
      "Yes. At every one of the nine standard tiers the web or gift card pack gives more Robux than the app pack at the same price. For example, $9.99 gives 1,000 Robux on the web and 800 in the app.",
  },
  {
    question: "Why do mobile Robux cost more?",
    answer:
      "In-app purchases on iOS, Android and consoles go through the platform's store, which charges its own fees, so fewer Robux are included at each price.",
  },
  {
    question: "Which tier has the biggest web vs mobile gap?",
    answer:
      "The $4.99, $9.99 and $14.99 tiers show the largest gap at 25% more Robux on the web. The $99.99 tier has the smallest gap at 10%.",
  },
  {
    question: "Do gift cards use the web or the mobile rate?",
    answer:
      "Gift cards use the web rate. Redeem them on Roblox's own website and buy there rather than in the app store to keep the higher Robux amounts.",
  },
  {
    question: "Can I buy on the web and play on mobile?",
    answer:
      "Yes. Robux belong to your account, not to the device. Buy through the web, then spend them on any platform where you sign in.",
  },
];

export default function Page() {
  const rows = ROBUX_PACKS.map((p) => {
    const diff = p.webRobux - p.appRobux;
    const pct = (diff / p.appRobux) * 100;
    return [
      formatUsd(p.priceUsd),
      formatRobux(p.webRobux),
      formatRobux(p.appRobux),
      `+${formatRobux(diff)}`,
      `+${pct.toFixed(1)}%`,
    ];
  });

  return (
    <BlogArticle meta={post} intro={INTRO} faqs={FAQS} relatedPosts={relatedFor(post.slug)}>
      <p>{INTRO}</p>

      <h2>Web vs mobile Robux prices: all nine tiers</h2>
      <DataTable
        caption="Web vs mobile Robux by pack price"
        headers={["Price", "Web / gift card", "Mobile / console", "Extra on web", "Web advantage"]}
        rows={rows}
      />
      <p>
        Data verified November 2026 for U.S. pricing. For cost-per-Robux columns see the full{" "}
        <Link href="/robux-price-chart">Robux price chart</Link>.
      </p>

      <h2>The headline numbers</h2>
      <ul>
        <li>
          <strong>Web benchmark:</strong> the $9.99 pack is 1,000 Robux, or{" "}
          {formatUsd(WEB_RATE_PER_ROBUX, 5)} per Robux.
        </li>
        <li>
          <strong>Mobile benchmark:</strong> the $9.99 pack is 800 Robux, or{" "}
          {formatUsd(APP_RATE_PER_ROBUX, 5)} per Robux — 25% more per Robux than on the web.
        </li>
        <li>
          <strong>Smallest gap:</strong> the $99.99 pack, 11,000 vs 10,000 (10% more on the web).
        </li>
        <li>
          <strong>Biggest gap:</strong> $4.99, $9.99 and $14.99, each 25% more on the web.
        </li>
      </ul>

      <Callout title="What this means in dollars">
        <p>
          To get 1,000 Robux on mobile at the $9.99 rate you would need about{" "}
          {formatUsd(1000 * APP_RATE_PER_ROBUX)} instead of {formatUsd(1000 * WEB_RATE_PER_ROBUX)}{" "}
          on the web — an extra {formatUsd(1000 * (APP_RATE_PER_ROBUX - WEB_RATE_PER_ROBUX))} per
          1,000 Robux.
        </p>
      </Callout>

      <h2>Why the prices are different</h2>
      <p>
        Robux are a Roblox product, but the place you pay changes who takes a cut. When you buy on
        roblox.com, Roblox handles payment directly. When you tap to buy inside an iOS, Android or
        console app, the platform&apos;s store processes the payment and charges its own fee. To
        keep its revenue steady, Roblox includes fewer Robux in each in-app pack. That is why the
        gap exists at every tier and why it narrows only on the largest packs.
      </p>

      <h2>How to get the web rate</h2>
      <ol>
        <li>
          <strong>Buy through the website.</strong> Sign in on Roblox&apos;s official site in a
          browser and open the Robux purchase page.
        </li>
        <li>
          <strong>Use a gift card.</strong> Buy a card from an authorized retailer and redeem it on
          Roblox&apos;s redeem page. See the{" "}
          <Link href="/blog/roblox-gift-card-to-robux-chart">gift card to Robux chart</Link>.
        </li>
        <li>
          <strong>Spend on any device.</strong> Robux belong to your account, so you can still use
          them on your phone.
        </li>
      </ol>

      <h2>When mobile can still make sense</h2>
      <p>
        If you only have a phone and need a small amount right now, the app is convenient. Just
        know the price: the $2.99 tier is 240 Robux in the app versus 270 on the web, and the
        difference grows as you spend more. If you are buying a few thousand Robux or more, moving
        the purchase to the web almost always pays for the extra step.
      </p>

      <h2>Scenarios: how much extra does the web give?</h2>
      <DataTable
        caption="Web advantage across typical budgets"
        headers={["Budget", "Pack", "Web Robux", "App Robux", "Extra Robux on web"]}
        rows={[
          ["$10", "$9.99", "1,000", "800", "200"],
          ["$20", "$19.99", "2,000", "1,700", "300"],
          ["$50", "$49.99", "5,250", "4,500", "750"],
          ["$100", "$99.99", "11,000", "10,000", "1,000"],
        ]}
      />
      <p>
        Plug your own number into the <Link href="/usd-to-robux">USD to Robux calculator</Link> and
        toggle between Web / Gift Card and Mobile / Console to see the difference for any budget.
      </p>

      <h2>Selling doesn&apos;t work the other way</h2>
      <p>
        A lower buy price does not create cash value. Robux you buy cannot be sold, and DevEx pays
        only on earned Robux at roughly $0.0038 each. Read{" "}
        <Link href="/blog/can-you-sell-robux-for-real-money">
          can you sell Robux for real money
        </Link>{" "}
        or try the <Link href="/devex-calculator">DevEx calculator</Link>.
      </p>
    </BlogArticle>
  );
}
