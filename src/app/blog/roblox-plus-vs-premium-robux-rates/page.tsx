import Link from "next/link";
import type { Metadata } from "next";
import BlogArticle from "@/components/BlogArticle";
import { Callout, DataTable } from "@/components/ContentBits";
import { getPost, relatedFor } from "@/lib/blogPosts";
import { buildMetadata } from "@/lib/pageMeta";
import { ROBUX_PACKS, formatRobux, formatUsd } from "@/lib/robuxRates";

const post = getPost("roblox-plus-vs-premium-robux-rates");

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.datePublished,
  keywords: [
    "roblox plus vs premium",
    "roblox premium robux bonus",
    "roblox plus price",
    "roblox premium 10% bonus ended",
    "robux rates",
  ],
});

const INTRO =
  "The 10% Robux bonus that used to come with Roblox Premium purchases has ended, and Roblox Plus plans at $4.99, $8.99, $12.99 and $21.99 now sit alongside the normal Robux packs. This guide explains what changed, how to compare real cost per Robux, and where old Premium math no longer applies.";

const FAQS = [
  {
    question: "Does Roblox Premium still give 10% more Robux?",
    answer:
      "No. The 10% bonus on Robux purchases that used to come with Premium has ended. Use the standard pack table for web or app purchases and do not add a bonus on top.",
  },
  {
    question: "How much does Roblox Plus cost?",
    answer:
      "Roblox Plus plans are listed at $4.99, $8.99, $12.99 and $21.99. Benefits differ between plans and can change, so read the plan details on Roblox before subscribing.",
  },
  {
    question: "Is Roblox Plus a cheaper way to buy Robux?",
    answer:
      "Treat it as a separate subscription, not a discount on Robux packs. Compare your cost per Robux using the web pack table first, then decide whether the subscription benefits justify the monthly price.",
  },
  {
    question: "Where do I get the most Robux per dollar now?",
    answer:
      "The web or gift card column, and larger packs within it. The $199.99 web pack is the lowest cost per Robux in our table at about $0.0083.",
  },
  {
    question: "Do old Premium bonus guides still apply?",
    answer:
      "Any guide that adds 10% to Robux totals for Premium members is out of date. Treat those numbers as historic only.",
  },
];

export default function Page() {
  const bonusExamples = [
    { price: 9.99, base: 1000 },
    { price: 19.99, base: 2000 },
    { price: 49.99, base: 5250 },
    { price: 99.99, base: 11000 },
  ];

  return (
    <BlogArticle meta={post} intro={INTRO} faqs={FAQS} relatedPosts={relatedFor(post.slug)}>
      <p>{INTRO}</p>

      <h2>What changed: the Premium bonus is gone</h2>
      <p>
        For years, many Robux price guides included a line like &ldquo;Premium members get 10% extra
        Robux when they buy.&rdquo; That meant a $9.99 web pack worth 1,000 Robux became 1,100 for a
        Premium member, and a $99.99 pack worth 11,000 became 12,100. That bonus <strong>has
        ended</strong>. The numbers in the pack table are now what you get, whether or not you
        subscribe.
      </p>
      <p>
        If you read a calculator, spreadsheet or video that still adds 10%, it is using retired
        rules and will overstate your Robux. The calculators on this site use the current pack
        table only.
      </p>

      <h2>Roblox Plus pricing</h2>
      <p>
        Roblox now lists <strong>Roblox Plus</strong> plans at four price points:
      </p>
      <DataTable
        caption="Roblox Plus plan prices"
        headers={["Plan price", "What to do before buying"]}
        rows={[
          ["$4.99", "Read the plan benefits on Roblox and check renewal terms"],
          ["$8.99", "Compare benefits to the $4.99 plan"],
          ["$12.99", "Confirm what you gain over lower plans"],
          ["$21.99", "Top tier — confirm it matches how you play"],
        ]}
      />
      <p>
        We deliberately do not list plan perks here: Roblox adjusts them, and an out-of-date perk
        list is worse than none. Open the plan page on Roblox for the current inclusions.
      </p>
      <Callout title="The key point">
        <p>
          Plus is a subscription. It does not change the Robux you receive from a pack purchase in
          our tables, and it should not be modeled as a 10% discount.
        </p>
      </Callout>

      <h2>How to compare real cost per Robux</h2>
      <p>
        The honest method has two steps. First, work out your <strong>pack cost per Robux</strong>.
        Second, treat any subscription as a separate monthly cost whose value depends on what you
        use.
      </p>
      <h3>Step 1: pick the cheapest channel</h3>
      <p>
        Web and gift-card purchases give more Robux than app-store purchases at every tier. For
        example, the $9.99 pack gives 1,000 Robux on the web and 800 in the app — a 25% difference
        that is larger than the old Premium bonus ever was.
      </p>
      <h3>Step 2: compare tiers</h3>
      <DataTable
        caption="Web Robux per pack and cost per Robux"
        headers={["Pack", "Web Robux", "Web $ / Robux", "App Robux", "App $ / Robux"]}
        rows={ROBUX_PACKS.map((p) => [
          formatUsd(p.priceUsd),
          formatRobux(p.webRobux),
          formatUsd(p.priceUsd / p.webRobux, 4),
          formatRobux(p.appRobux),
          formatUsd(p.priceUsd / p.appRobux, 4),
        ])}
      />

      <h2>The old bonus vs today: what a missing 10% costs</h2>
      <p>
        Here is how much extra Robux the old bonus would have added on common web packs — and what
        you are <em>not</em> getting now.
      </p>
      <DataTable
        caption="Old 10% Premium bonus illustrated"
        headers={["Web pack", "Today", "Old with +10%", "Difference"]}
        rows={bonusExamples.map((e) => [
          formatUsd(e.price),
          formatRobux(e.base),
          formatRobux(Math.round(e.base * 1.1)),
          `${formatRobux(Math.round(e.base * 0.1))} Robux`,
        ])}
      />
      <p>
        The most reliable way to recover value is therefore to choose the right channel, not to
        look for a bonus. Moving from app to web at the $9.99 tier gains you 200 Robux — double
        what the old bonus would have added to that pack.
      </p>

      <h2>Should you subscribe?</h2>
      <p>
        That depends on the plan benefits, not on Robux math. Ask yourself:
      </p>
      <ol>
        <li>Will I use the perks every month, or only occasionally?</li>
        <li>Can I cancel easily, and when does renewal happen?</li>
        <li>Is the money better spent on a larger web pack?</li>
      </ol>
      <p>
        If your only goal is more Robux per dollar, skip the subscription logic and compare packs
        in the <Link href="/robux-price-chart">Robux price chart</Link>. To budget a purchase, type
        your amount into the <Link href="/usd-to-robux">USD to Robux calculator</Link>.
      </p>

      <h2>Creators: focus on DevEx rates and the 30% fee</h2>
      <p>
        If you are a creator, the numbers that matter for cashing out are the DevEx rate and the
        30% marketplace fee. The DevEx rates in our calculators are not tied to a subscription
        tier; confirm your own eligibility with Roblox. See the{" "}
        <Link href="/blog/roblox-devex-rates-2026-guide">DevEx rates 2026 guide</Link> and the{" "}
        <Link href="/devex-calculator">DevEx calculator</Link>.
      </p>
    </BlogArticle>
  );
}
