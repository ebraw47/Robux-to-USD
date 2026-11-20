import type { BlogPostMeta } from "@/components/BlogArticle";

export const BLOG_DATE = "2026-11-20";

export type BlogListItem = BlogPostMeta & { excerpt: string };

export const BLOG_POSTS: BlogListItem[] = [
  {
    slug: "can-you-sell-robux-for-real-money",
    title: "Can You Sell Robux for Real Money? What Actually Works in 2026",
    description:
      "Can you sell Robux for real money? Learn why trading Robux for cash is against Roblox rules, which scams to avoid, and the only official route: DevEx for eligible creators.",
    excerpt:
      "Why selling Robux for cash is prohibited, how scams work, and the one legitimate cashout path: DevEx.",
    datePublished: BLOG_DATE,
    readTime: "9 min",
    image: "/blog/can-you-sell-robux.webp",
    imageAlt: "Can you sell Robux — cash trades vs official DevEx",
  },
  {
    slug: "roblox-plus-vs-premium-robux-rates",
    title: "Roblox Plus vs Premium: Robux Rates, Bonuses and Price Changes",
    description:
      "Roblox Plus vs Premium explained: the old 10% Premium Robux bonus has ended, Plus plans cost $4.99, $8.99, $12.99 and $21.99, and here is how to compare real cost per Robux.",
    excerpt:
      "The Premium 10% bonus ended and Plus plans took over. Here is what that means per Robux.",
    datePublished: BLOG_DATE,
    readTime: "8 min",
    image: "/blog/plus-vs-premium.webp",
    imageAlt: "Roblox Plus vs Premium Robux rates comparison",
  },
  {
    slug: "roblox-gift-card-to-robux-chart",
    title: "Roblox Gift Card to Robux Chart: $10, $25, $50 and $100 Cards",
    description:
      "Roblox gift card to Robux chart: see how many Robux a $10, $25, $50 or $100 card buys at web rates, how pack rounding works, and why app purchases give fewer Robux.",
    excerpt:
      "How many Robux you get from $10, $25, $50 and $100 gift cards, with pack-by-pack math.",
    datePublished: BLOG_DATE,
    readTime: "8 min",
    image: "/roblox-gift-card.webp",
    imageAlt: "Roblox $50 gift card — Get Robux and more",
  },
  {
    slug: "web-vs-mobile-robux-prices",
    title: "Web vs Mobile Robux Prices: Why the Same Dollars Buy Less in Apps",
    description:
      "Web vs mobile Robux prices compared tier by tier. See how much extra Robux you get on the web or with gift cards versus app-store purchases, and when the gap is largest.",
    excerpt:
      "Nine tiers, two channels, and a clear answer on where your money goes furthest.",
    datePublished: BLOG_DATE,
    readTime: "7 min",
    image: "/blog/web-vs-mobile.webp",
    imageAlt: "Web vs mobile Robux prices — $9.99 buys 1000 vs 800 Robux",
  },
  {
    slug: "roblox-devex-rates-2026-guide",
    title: "Roblox DevEx Rates 2026: $0.0038, $0.0054 and the 30,000 Robux Minimum",
    description:
      "Roblox DevEx rates in 2026: standard $0.0038 per Robux, $0.0054 for eligible U.S. 18+ creators, $0.0035 legacy, and the 30,000 Robux minimum. Worked examples included.",
    excerpt:
      "Standard, U.S. 18+ and legacy rates side by side, with worked examples at 30k, 100k and 1M Robux.",
    datePublished: BLOG_DATE,
    readTime: "10 min",
    image: "/blog/devex-rates-2026.webp",
    imageAlt: "DevEx rates 2026 — standard, U.S. 18+, and 30,000 minimum",
  },
  {
    slug: "roblox-30-percent-tax-explained",
    title: "Roblox 30% Tax Explained: How the Marketplace Fee Reduces Your Robux",
    description:
      "Roblox 30% tax explained: what the marketplace fee is, how to calculate net Robux after tax, how to price an item to receive a target amount, and examples with USD value.",
    excerpt:
      "Gross vs net Robux, the 70% rule, and how to price items so you receive what you want.",
    datePublished: BLOG_DATE,
    readTime: "7 min",
    image: "/blog/roblox-30-percent-tax.webp",
    imageAlt: "Roblox 30% marketplace fee — keep 70% after tax",
  },
];

export function getPost(slug: string): BlogListItem {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error(`Unknown blog post: ${slug}`);
  return post;
}

export function relatedFor(slug: string, count = 3) {
  return BLOG_POSTS.filter((p) => p.slug !== slug)
    .slice(0, count)
    .map((p) => ({ slug: p.slug, title: p.title }));
}
