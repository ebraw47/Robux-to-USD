import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import BlogArticle from "@/components/BlogArticle";
import { Callout, DataTable } from "@/components/ContentBits";
import { getPost, relatedFor } from "@/lib/blogPosts";
import { buildMetadata } from "@/lib/pageMeta";
import { formatRobux, formatUsd, maxRobuxForBudget } from "@/lib/robuxRates";

const post = getPost("roblox-gift-card-to-robux-chart");

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.datePublished,
  keywords: [
    "roblox gift card to robux",
    "roblox gift card robux chart",
    "how many robux is a $25 gift card",
    "$10 roblox gift card robux",
    "$100 roblox gift card robux",
  ],
});

const INTRO =
  "A Roblox gift card does not convert at a single flat rate — Robux come in fixed packs, so what you get depends on the card value and how you spend it. This chart shows $10, $25, $50 and $100 cards at web rates, compares them with mobile purchases, and explains the rounding.";

const FAQS = [
  {
    question: "How many Robux is a $10 Roblox gift card?",
    answer:
      "Spent on the web, a $10 budget buys 1,000 Robux — either one $9.99 pack or two $4.99 packs, with a few cents left over. In the mobile app the same spend gives 800 Robux.",
  },
  {
    question: "How many Robux is a $25 gift card?",
    answer:
      "At web rates the best whole-pack combination for $25 is shown in the chart above — it lands at roughly 2,500 Robux. The calculator tells you the exact packs and any leftover balance.",
  },
  {
    question: "Is it better to redeem a gift card or buy in the app?",
    answer:
      "Redeeming and buying on the web gives more Robux at every tier. The gap is 10–25% depending on the pack, so a gift card is the better value for most people.",
  },
  {
    question: "Why is there leftover money on my card?",
    answer:
      "Packs have fixed prices. If your balance cannot be split exactly into packs, a few cents remain. It stays available for future purchases.",
  },
  {
    question: "Can I convert a gift card to Robux on a third-party site?",
    answer:
      "No. Redeem codes only on Roblox's own redeem page while signed in. Sites that ask for a code or login to \"convert\" cards are scams.",
  },
];

const CARDS = [10, 25, 50, 100] as const;

export default function Page() {
  const rows = CARDS.map((usd) => {
    const web = maxRobuxForBudget(usd, "web");
    const app = maxRobuxForBudget(usd, "app");
    const spent = web?.totalCost ?? 0;
    return { usd, web, app, spent };
  });

  return (
    <BlogArticle meta={post} intro={INTRO} faqs={FAQS} relatedPosts={relatedFor(post.slug)}>
      <p>{INTRO}</p>

      <h2>Roblox gift card to Robux chart (web rates)</h2>
      <p>
        These figures use the nine standard U.S. packs, verified November 2026, and pick the
        combination that yields the most Robux without exceeding the card value. A typical retail
        card (like the $50 example below) redeems as Roblox Credit, then you spend that credit on
        whole packs at the web rate.
      </p>
      <figure className="not-prose mx-auto my-8 max-w-xs">
        <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.03] p-4 shadow-[0_18px_40px_-28px_rgba(11,18,40,0.45)]">
          <Image
            src="/roblox-gift-card.webp"
            alt="Roblox $50 gift card — Get Robux and more"
            width={480}
            height={720}
            className="mx-auto h-auto w-full object-contain"
            sizes="(max-width: 768px) 70vw, 280px"
          />
        </div>
        <figcaption className="mt-3 text-center text-sm text-ink/55">
          Example $50 Roblox gift card — redeem on Roblox, then buy packs for the web Robux amounts
          in the chart.
        </figcaption>
      </figure>
      <DataTable
        caption="Robux from $10, $25, $50 and $100 gift cards"
        headers={["Gift card", "Best web combo", "Robux (web)", "Spent", "Left over", "Robux (app)"]}
        rows={rows.map((r) => [
          formatUsd(r.usd, 0),
          r.web && r.web.packs.length
            ? r.web.packs.map((p) => `${p.count}× ${formatUsd(p.priceUsd)}`).join(" + ")
            : "—",
          formatRobux(r.web?.totalRobux ?? 0),
          formatUsd(r.spent),
          formatUsd(r.usd - r.spent),
          formatRobux(r.app?.totalRobux ?? 0),
        ])}
      />
      <p>
        Want a different amount? The <Link href="/usd-to-robux">USD to Robux calculator</Link> runs
        the same math for any budget.
      </p>

      <h2>Why a card is not &ldquo;X Robux per dollar&rdquo;</h2>
      <p>
        If Robux were sold by the dollar, a $25 card would simply multiply. They are not. Every
        purchase is a combination of nine packs — $2.99, $4.99, $9.99, $14.99, $19.99, $34.99,
        $49.99, $99.99 and $199.99. Your card is spent on the best combination that fits, which is
        why the &ldquo;Left over&rdquo; column exists.
      </p>
      <p>
        Larger cards often get better rates because bigger packs have a lower cost per Robux. For
        example, the $99.99 web pack gives 11,000 Robux, about $0.0091 each, while the $9.99 pack is
        about $0.00999 each.
      </p>

      <Callout title="Rule of thumb">
        <p>
          On the web, a $10 card is about 1,000 Robux, and every extra $10 is roughly another
          1,000 Robux, with a small bonus on larger packs.
        </p>
      </Callout>

      <h2>Gift card vs mobile: the cost of buying in-app</h2>
      <p>
        If you skip the card and buy in an app store, the same price tier gives fewer Robux. The
        $9.99 tier is 1,000 on the web versus 800 on mobile; the $49.99 tier is 5,250 versus 4,500.
        For a $50 card, that is a difference of hundreds of Robux. See the tier-by-tier breakdown
        in <Link href="/blog/web-vs-mobile-robux-prices">web vs mobile Robux prices</Link> or open
        the full <Link href="/robux-price-chart">Robux price chart</Link>.
      </p>

      <h2>How to redeem safely</h2>
      <ol>
        <li>Buy cards from Roblox or authorized retailers.</li>
        <li>Sign in to your own account on Roblox&apos;s official redeem page.</li>
        <li>Enter the code once and check the credit or Robux added.</li>
        <li>Spend through the Robux purchase screen and pick the pack combination you want.</li>
      </ol>
      <p>
        Never send a code to someone who offers to &ldquo;convert&rdquo; it for you, and never give
        out your password. Gift card codes are as good as cash: if a stranger has the code, the
        money is gone.
      </p>

      <h2>What a card is worth in dollars</h2>
      <p>
        A gift card gives you the buy rate, not a cash-out rate. Spending $9.99 gets 1,000 Robux,
        but a creator holding 1,000 earned Robux receives about $3.80 through DevEx at the standard
        rate. If you wonder whether you can turn card-bought Robux back into money, read{" "}
        <Link href="/blog/can-you-sell-robux-for-real-money">
          can you sell Robux for real money
        </Link>
        .
      </p>
    </BlogArticle>
  );
}
