import { SITE_ORIGIN } from "@/lib/siteConfig";

function imageLoc(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}

export type SitemapPage = {
  path: string;
  lastMod: string;
  changeFreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  images?: Array<{ loc: string; title: string; caption: string }>;
};

const LASTMOD = "2026-11-20";

export const SITEMAP_PAGES: SitemapPage[] = [
  {
    path: "/",
    lastMod: LASTMOD,
    changeFreq: "daily",
    priority: 1,
    images: [
      {
        loc: imageLoc("/logo-icon.png"),
        title: "Robux to USD logo",
        caption: "Brand mark for robuxtousd.net",
      },
      {
        loc: imageLoc("/robux-to-usd.webp"),
        title: "Robux to USD calculator",
        caption: "Convert Robux to USD with buy and DevEx estimates",
      },
    ],
  },
  {
    path: "/usd-to-robux",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/usd-to-robux.webp"),
        title: "USD to Robux calculator",
        caption: "Gift card and dollar budget to Robux conversion",
      },
      {
        loc: imageLoc("/roblox-gift-card.webp"),
        title: "Roblox gift card",
        caption: "Example $50 Roblox gift card for Robux redemption",
      },
    ],
  },
  {
    path: "/robux-price-chart",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/robux-price-chart.webp"),
        title: "Robux price chart",
        caption: "All nine Robux packs, web vs mobile",
      },
    ],
  },
  {
    path: "/devex-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/devex-calculator.webp"),
        title: "DevEx calculator",
        caption: "Robux to USD DevEx cashout estimates",
      },
    ],
  },
  {
    path: "/robux-tax-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/robux-price-chart.webp"),
        title: "Robux tax calculator",
        caption: "Gross to net Robux after the 30% fee",
      },
    ],
  },
  {
    path: "/about-us",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.7,
    images: [
      {
        loc: imageLoc("/logo-icon.png"),
        title: "About Robux to USD",
        caption: "Logo on the About page",
      },
    ],
  },
  {
    path: "/blog",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.8,
  },
  {
    path: "/blog/can-you-sell-robux-for-real-money",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/blog/can-you-sell-robux.webp"),
        title: "Can you sell Robux for real money",
        caption: "Why only DevEx can turn earned Robux into cash",
      },
    ],
  },
  {
    path: "/blog/roblox-plus-vs-premium-robux-rates",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/blog/plus-vs-premium.webp"),
        title: "Roblox Plus vs Premium Robux rates",
        caption: "Premium bonus ended; Plus plan pricing compared",
      },
    ],
  },
  {
    path: "/blog/roblox-gift-card-to-robux-chart",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/roblox-gift-card.webp"),
        title: "Roblox gift card to Robux chart",
        caption: "Example $50 Roblox gift card and Robux conversion chart",
      },
    ],
  },
  {
    path: "/blog/web-vs-mobile-robux-prices",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/blog/web-vs-mobile.webp"),
        title: "Web vs mobile Robux prices",
        caption: "Tier-by-tier comparison of web and app Robux",
      },
    ],
  },
  {
    path: "/blog/roblox-devex-rates-2026-guide",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/blog/devex-rates-2026.webp"),
        title: "Roblox DevEx rates 2026 guide",
        caption: "Standard, U.S. 18+ and legacy DevEx rates",
      },
    ],
  },
  {
    path: "/blog/roblox-30-percent-tax-explained",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/blog/roblox-30-percent-tax.webp"),
        title: "Roblox 30% tax explained",
        caption: "Gross vs net Robux after the marketplace fee",
      },
    ],
  },
  {
    path: "/contact-us",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.4,
  },
  {
    path: "/disclaimer",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.4,
  },
];

export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}
