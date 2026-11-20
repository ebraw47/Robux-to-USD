# SEO Strategy — Robux to USD

Primary domain: `https://robuxtousd.net`  
Primary keyword: **robux to usd**  
Positioning: unofficial, informational calculator (never sells Robux, never asks for login).

## SERP intents covered

| Intent | Route |
|--------|-------|
| Robux to USD calculator | `/` |
| USD / gift card to Robux | `/usd-to-robux` |
| Robux price chart (web vs app) | `/robux-price-chart` |
| DevEx calculator / rates | `/devex-calculator` |
| Robux tax calculator (30% fee) | `/robux-tax-calculator` |
| Can you sell Robux for real money | `/blog/can-you-sell-robux-for-real-money` |
| Roblox Plus vs Premium rates | `/blog/roblox-plus-vs-premium-robux-rates` |
| Gift card to Robux chart | `/blog/roblox-gift-card-to-robux-chart` |
| Web vs mobile Robux prices | `/blog/web-vs-mobile-robux-prices` |
| DevEx rates 2026 guide | `/blog/roblox-devex-rates-2026-guide` |
| Roblox 30% tax explained | `/blog/roblox-30-percent-tax-explained` |

## Rules

- Keep only these Robux-to-USD topics in the blog; no off-topic posts.
- All numbers come from `src/lib/robuxRates.ts` and `src/lib/taxMath.ts`; bump `RATES_LAST_VERIFIED` and sitemap `LASTMOD` on any change.
- Every page carries canonical + Open Graph metadata, breadcrumbs, FAQ schema where relevant, and the unofficial/trademark disclaimer.
- Internal links: every blog post links to at least two calculators; every tool links to the related guides.
