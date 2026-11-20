import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { proseClass } from "@/components/ContentBits";
import { buildMetadata } from "@/lib/pageMeta";
import { RATES_LAST_VERIFIED } from "@/lib/robuxRates";
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description: `${SITE_NAME} (${SITE_DOMAIN}) is an unofficial Robux calculator. Not affiliated with Roblox Corporation. Estimates only; we do not sell Robux or ask for logins.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Disclaimer", href: "/disclaimer" },
        ]}
      />
      <div className="container mx-auto max-w-3xl px-4 pb-16 pt-8">
        <h1 className="mb-6 font-display text-3xl font-bold text-ink md:text-4xl">Disclaimer</h1>
        <div className={proseClass}>
          <p>
            <strong>Last updated: November 20, 2026</strong>
          </p>

          <h2>Not affiliated with Roblox</h2>
          <p>
            {SITE_NAME} on {SITE_DOMAIN} is an independent, unofficial informational website. It is
            not affiliated with, endorsed by, sponsored by, or connected to Roblox Corporation.
            Roblox, Robux and related names and logos are trademarks of Roblox Corporation. We use
            them only to describe what our calculators estimate.
          </p>

          <h2>What this site does not do</h2>
          <ul>
            <li>We do not sell, buy, trade, or give away Robux.</li>
            <li>We do not provide a legitimate way to convert Robux into cash outside Roblox&apos;s own programs.</li>
            <li>We never ask for your Roblox password, cookie, 2FA code, or payment details.</li>
            <li>We do not offer or endorse &ldquo;free Robux&rdquo; generators, hacks, or exploits.</li>
          </ul>

          <h2>Estimates, not guarantees</h2>
          <p>
            Prices, Robux amounts, DevEx rates ($0.0038 standard, $0.0054 for eligible U.S. 18+
            creators, $0.0035 legacy), the 30,000 Robux minimum and the 30% marketplace fee are
            shown for general information. Our data was last verified on{" "}
            <strong>{RATES_LAST_VERIFIED}</strong>. Roblox can change prices, bonuses, eligibility
            and policies at any time without notice, and regional pricing differs. Always confirm
            current terms on Roblox before buying Robux, setting prices, or requesting a cashout.
          </p>
          <p>
            Calculator outputs do not account for taxes, payout partner fees, currency conversion,
            chargebacks, account actions, or eligibility reviews. We are not responsible for any
            decision or loss that relies on these estimates.
          </p>

          <h2>Not financial, tax or legal advice</h2>
          <p>
            Content is for education and entertainment. Robux is an in-game virtual currency, not an
            investment or a dollar-pegged asset. Consult a qualified professional about taxes or
            legal questions related to creator earnings.
          </p>

          <h2>Scam and safety warning</h2>
          <p>
            Anyone who offers to buy your Robux for cash, asks you to move Robux through
            &ldquo;group payouts&rdquo; or game passes for an outsider, or requests your login is
            likely attempting fraud. Read more in{" "}
            <Link href="/blog/can-you-sell-robux-for-real-money">
              can you sell Robux for real money
            </Link>
            .
          </p>

          <h2>External links</h2>
          <p>
            Links to Roblox or other sites are provided for convenience. We do not control and are
            not responsible for their content or practices.
          </p>

          <h2>Contact</h2>
          <p>
            Questions or corrections? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
