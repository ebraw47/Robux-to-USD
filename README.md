# Robux to USD

Free Robux to USD calculator for [robuxtousd.net](https://robuxtousd.net) — estimate what Robux cost to buy on the web, with gift cards, or in mobile apps, and what eligible creators can cash out through DevEx. Contact: support@robuxtousd.net.

> Unofficial informational tool. Not affiliated with Roblox Corporation. Roblox and Robux are trademarks of Roblox Corporation. The site never sells Robux, never asks for Roblox logins, and does not promise free Robux.

## Tools & routes

| Route | Purpose |
|-------|---------|
| `/` | Robux to USD calculator (homepage) |
| `/usd-to-robux` | USD / gift card to Robux |
| `/robux-price-chart` | All 9 packs, web vs app |
| `/devex-calculator` | DevEx cashout estimates |
| `/robux-tax-calculator` | 30% marketplace fee (gross ↔ net) |
| `/blog` | 6 SERP guides |
| `/about-us`, `/contact-us`, `/privacy`, `/disclaimer` | Trust pages |

## Data sources in code

- `src/lib/robuxRates.ts` — pack tables, DevEx rates, fee helpers (`RATES_LAST_VERIFIED`)
- `src/lib/taxMath.ts` — integer-safe 30% fee math
- `src/lib/siteConfig.ts` — brand, domain, assets
- `src/lib/sitemapData.ts` — sitemap routes (`LASTMOD`)
- `src/lib/blogPosts.ts` — blog metadata used by the hub and posts

When Roblox changes prices or DevEx terms, update `robuxRates.ts` first, bump `RATES_LAST_VERIFIED`, then refresh the sitemap `LASTMOD`.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Static SEO routes (sitemap index, robots Content-Signals)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```
