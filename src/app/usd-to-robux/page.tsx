import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  DataTable,
  RelatedTools,
  sectionCardClass,
  proseClass,
  ToolPageSchema,
  UnofficialNote,
  Callout,
} from "@/components/ContentBits";
import FaqSection from "@/components/FaqSection";
import RobuxCalculator from "@/components/RobuxCalculator";
import { buildMetadata } from "@/lib/pageMeta";
import {
  APP_RATE_PER_ROBUX,
  RATES_LAST_VERIFIED,
  ROBUX_PACKS,
  WEB_RATE_PER_ROBUX,
  formatRobux,
  formatUsd,
  maxRobuxForBudget,
  smoothRobuxFromUsd,
} from "@/lib/robuxRates";
const PATH = "/usd-to-robux";
const TITLE = "USD to Robux Calculator — Gift Card & Budget to Robux";
const DESCRIPTION =
  "Free USD to Robux calculator. Enter a dollar budget or gift card value ($10, $25, $50, $100) and see how many Robux you get on the web, with gift cards, or in the mobile app.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "usd to robux",
    "dollars to robux",
    "gift card to robux",
    "how many robux for $10",
    "robux calculator",
  ],
});

const GIFT_CARDS = [10, 25, 50, 100] as const;

const FAQS = [
  {
    question: "How many Robux do I get for $10?",
    answer:
      "On the web or with a gift card, the $9.99 pack gives 1,000 Robux, so a $10 budget lands at about 1,000 Robux. In the mobile app the same $9.99 tier gives 800 Robux. Use the calculator above to switch between channels.",
  },
  {
    question: "Do Roblox gift cards give more Robux than the app?",
    answer:
      "Gift cards and the Roblox website use the web pack table, which gives more Robux per dollar than app-store purchases on iOS, Android and console. For example, the $49.99 tier is 5,250 Robux on the web versus 4,500 in the app.",
  },
  {
    question: "Why does a $25 gift card not equal an exact Robux number?",
    answer:
      "Robux are sold in fixed packs, not by the dollar. A $25 budget is best spent on a combination of whole packs, so a few cents may be left over. The calculator shows both a smooth average and the whole-pack result.",
  },
  {
    question: "Is USD to Robux the same as Robux to USD?",
    answer:
      "No. Buying Robux costs far more than creators receive when they cash out. A Robux costs roughly one cent to buy on the web, while DevEx pays about $0.0038 per Robux for the standard rate. That gap is why Robux are not a store of dollar value.",
  },
  {
    question: "Does Robux to USD sell Robux or take payment?",
    answer:
      "No. This is an unofficial informational calculator. We do not sell Robux, process payments, or ask for your Roblox login. Always purchase directly from Roblox or authorized retailers.",
  },
  {
    question: "How current are these Robux prices?",
    answer: `Pack tables were last verified on ${RATES_LAST_VERIFIED}. Roblox can change prices and bonuses at any time, so confirm the final amount on the checkout screen before you pay.`,
  },
];

export default function UsdToRobuxPage() {
  const giftRows = GIFT_CARDS.map((usd) => {
    const web = maxRobuxForBudget(usd, "web");
    const app = maxRobuxForBudget(usd, "app");
    return {
      usd,
      web,
      app,
      smoothWeb: smoothRobuxFromUsd(usd, "web"),
      smoothApp: smoothRobuxFromUsd(usd, "app"),
    };
  });

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "USD to Robux", href: PATH },
        ]}
      />
      <ToolPageSchema name="USD to Robux Calculator" description={DESCRIPTION} path={PATH} />

      <div className="container mx-auto max-w-5xl px-4 pb-16 pt-6">
        <header className="mb-8 grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep">
              Gift card & budget calculator
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
              USD to Robux calculator
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">
              Type a dollar amount or gift card value and see how many Robux you can buy. We use the
              nine standard U.S. pack tiers, so you get a realistic whole-pack answer instead of a
              rounded guess — for both web/gift card and mobile/console purchases.
            </p>
          </div>
          <div className="relative mx-auto flex aspect-[3/4] max-w-[280px] items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.03] p-4 md:max-w-none">
            <Image
              src="/roblox-gift-card.webp"
              alt="Roblox $50 gift card used for USD to Robux conversion"
              width={480}
              height={720}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 70vw, 280px"
              priority
            />
          </div>
        </header>

        <RobuxCalculator id="calculator" title="USD to Robux Calculator" defaultMode="usd-to-robux" />

        <section className="mt-14" aria-labelledby="gift-cards">
          <h2 id="gift-cards" className="mb-2 font-display text-2xl font-bold text-ink md:text-3xl">
            Roblox gift card to Robux table
          </h2>
          <p className="mb-5 text-ink/70">
            Best whole-pack result for the four most common gift card values. Web/gift card rates
            apply when you redeem a card and buy on roblox.com; app rates apply to in-app purchases.
          </p>
          <div className="mb-6 grid items-start gap-6 md:grid-cols-[180px_1fr]">
            <figure className="mx-auto w-full max-w-[180px]">
              <div className="overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.03] p-3">
                <Image
                  src="/roblox-gift-card.webp"
                  alt="Roblox $50 gift card example"
                  width={360}
                  height={540}
                  className="h-auto w-full object-contain"
                  sizes="180px"
                />
              </div>
              <figcaption className="mt-2 text-center text-xs text-ink/50">
                Example $50 card
              </figcaption>
            </figure>
            <div>
              <DataTable
                caption="Robux for $10, $25, $50 and $100 on web versus mobile"
                headers={[
                  "Gift card",
                  "Web / gift card Robux",
                  "Packs used (web)",
                  "Mobile / console Robux",
                  "Extra on web",
                ]}
                rows={giftRows.map((r) => [
                  formatUsd(r.usd, 0),
                  formatRobux(r.web?.totalRobux ?? 0),
                  r.web && r.web.packs.length
                    ? r.web.packs
                        .map((p) => `${p.count}× ${formatUsd(p.priceUsd)}`)
                        .join(" + ")
                    : "—",
                  formatRobux(r.app?.totalRobux ?? 0),
                  `+${formatRobux((r.web?.totalRobux ?? 0) - (r.app?.totalRobux ?? 0))}`,
                ])}
              />
              <p className="mt-3 text-sm text-ink/55">
                Smooth averages: about {formatRobux(giftRows[0].smoothWeb)} Robux per $10 on the web
                ({formatUsd(WEB_RATE_PER_ROBUX, 4)} per Robux) versus{" "}
                {formatRobux(giftRows[0].smoothApp)} in the app (
                {formatUsd(APP_RATE_PER_ROBUX, 4)} per Robux).
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="pack-tiers">
          <h2 id="pack-tiers" className="mb-2 font-display text-2xl font-bold text-ink md:text-3xl">
            Pack tiers behind the calculator
          </h2>
          <p className="mb-5 text-ink/70">
            Every USD to Robux answer on this page is built from these nine packs. See the full{" "}
            <Link href="/robux-price-chart" className="text-teal-deep underline">
              Robux price chart
            </Link>{" "}
            for cost-per-Robux details.
          </p>
          <DataTable
            caption="Robux pack tiers"
            headers={["Price", "Web Robux", "App Robux", "Web $ / Robux"]}
            rows={ROBUX_PACKS.map((p) => [
              formatUsd(p.priceUsd),
              formatRobux(p.webRobux),
              formatRobux(p.appRobux),
              formatUsd(p.priceUsd / p.webRobux, 4),
            ])}
          />
        </section>

        <section className={`mt-14 ${sectionCardClass}`}>
          <div className={proseClass}>
            <h2 className="!mt-0">How to convert USD to Robux correctly</h2>
            <p>
              A USD to Robux conversion is not a single exchange rate. Roblox sells Robux in fixed
              packs, and the rate you get depends on <strong>where</strong> you buy and{" "}
              <strong>which pack</strong> you pick. Three rules cover almost every case:
            </p>
            <ol>
              <li>
                <strong>Buy on the web or with a gift card when you can.</strong> The web table
                gives roughly 10–25% more Robux than iOS or Android at the same price tier,
                with the biggest gaps (25%) on the $4.99, $9.99 and $14.99 packs.
              </li>
              <li>
                <strong>Spend in whole packs.</strong> A $25 budget cannot buy a fractional pack.
                The calculator finds the combination that gets the most Robux without exceeding
                your budget.
              </li>
              <li>
                <strong>Compare against the larger tiers.</strong> Stepping up a tier often raises
                the Robux-per-dollar ratio. If you are a few dollars short of the next pack,
                check whether waiting is worth it.
              </li>
            </ol>
            <Callout title="Looking for the opposite direction?">
              <p>
                If you want to know what a pile of Robux is worth in dollars, use the{" "}
                <Link href="/#calculator">Robux to USD calculator</Link>. If you earn Robux as a
                creator, the <Link href="/devex-calculator">DevEx calculator</Link> shows
                cashout value, and the <Link href="/robux-tax-calculator">Robux tax calculator</Link>{" "}
                shows what remains after the 30% marketplace fee.
              </p>
            </Callout>
            <h2>Gift cards: what to know before you redeem</h2>
            <ul>
              <li>
                Buy gift cards only from Roblox-authorized retailers. Anyone asking you to send
                card codes by chat, DM or email is running a scam.
              </li>
              <li>
                Never give your Roblox password to a site promising a &ldquo;gift card to Robux
                converter.&rdquo; Legitimate redemption happens on roblox.com/redeem while signed
                in to your own account.
              </li>
              <li>
                Card amounts in a retailer&apos;s currency or region can produce different Robux
                totals. The tables here assume U.S. dollar pricing.
              </li>
              <li>
                Read our full{" "}
                <Link href="/blog/roblox-gift-card-to-robux-chart">gift card to Robux chart</Link>{" "}
                for a walkthrough of each card value.
              </li>
            </ul>
          </div>
        </section>

        <FaqSection items={FAQS} title="USD to Robux FAQ" />
        <RelatedTools exclude={[PATH]} />
        <UnofficialNote className="mt-10" />
      </div>
    </>
  );
}
