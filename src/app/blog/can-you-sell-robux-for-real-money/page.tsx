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

const post = getPost("can-you-sell-robux-for-real-money");

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.datePublished,
  keywords: [
    "can you sell robux for real money",
    "sell robux for cash",
    "robux to usd",
    "roblox devex",
    "robux scam",
  ],
});

const INTRO =
  "Short answer: no — regular players cannot legitimately sell Robux for real money. Roblox only allows eligible creators to cash out earned Robux through Developer Exchange (DevEx). Here is how that works, why \"sell my Robux\" offers are almost always scams, and what your Robux are really worth.";

const FAQS = [
  {
    question: "Can you sell Robux for real money?",
    answer:
      "Not as a regular player. The only official cashout is DevEx, which is for eligible creators converting earned Robux. Robux you bought or received as a gift cannot be sold or cashed out.",
  },
  {
    question: "Is selling Robux for PayPal or crypto allowed?",
    answer:
      "No. Selling Robux to another person for PayPal, crypto, gift cards or any other payment is outside Roblox's rules and a leading cause of account loss, chargebacks and scams.",
  },
  {
    question: "How much is 1,000 Robux in real money?",
    answer: `It depends on direction. Buying 1,000 Robux on the web costs about $9.99. Cashing out 1,000 earned Robux through DevEx at the standard rate is worth about ${formatUsd(devexUsd(1000))}.`,
  },
  {
    question: "What is the minimum for DevEx?",
    answer: `Creators need at least ${formatRobux(DEVEX_MINIMUM_ROBUX)} earned Robux to request a cashout, plus they must meet Roblox's eligibility requirements.`,
  },
  {
    question: "I was asked to join a group or buy a game pass to get paid. Is that safe?",
    answer:
      "No. Group payout and game pass schemes are common ways scammers collect Robux from you. Do not move Robux for an outsider in exchange for promised money.",
  },
];

export default function Page() {
  return (
    <BlogArticle meta={post} intro={INTRO} faqs={FAQS} relatedPosts={relatedFor(post.slug)}>
      <p>{INTRO}</p>

      <h2>The direct answer: players cannot cash out Robux</h2>
      <p>
        Robux is a virtual currency that lives inside Roblox. When you buy Robux, you are paying
        for the right to spend them on Roblox experiences and items — not purchasing a cash-backed
        asset. There is no button that turns Robux you bought back into dollars, and Roblox
        prohibits selling them to other people outside its own systems.
      </p>
      <p>
        The one official route to real money is <strong>Developer Exchange (DevEx)</strong>. It is
        built for creators whose experiences and items <em>earned</em> Robux from other players. If
        that is not you, there is no legitimate way to sell your balance.
      </p>

      <Callout tone="gold" title="Quick reality check">
        <p>
          If a person, site or video offers to pay cash for your Robux, offers more than DevEx
          pays, or asks for your login, treat it as a scam until proven otherwise.
        </p>
      </Callout>

      <h2>Why &ldquo;sell my Robux&rdquo; offers are almost always scams</h2>
      <p>
        Because there is no official player-to-cash market, anyone who advertises one is operating
        outside the rules. The patterns repeat:
      </p>
      <ul>
        <li>
          <strong>Login requests.</strong> A &ldquo;buyer&rdquo; asks for your username and password
          to &ldquo;check your balance.&rdquo; Once they have it, they drain the account.
        </li>
        <li>
          <strong>Overpayment promises.</strong> They quote a price far above any DevEx rate to
          lure you in. No legitimate buyer pays more than Roblox itself would.
        </li>
        <li>
          <strong>Game pass and group tricks.</strong> They ask you to price a pass or join a group
          so they can &ldquo;pay&rdquo; you. Payment fails or reverses; you are the one who lost
          Robux.
        </li>
        <li>
          <strong>Fake payment proof.</strong> Screenshots of PayPal or crypto transfers are easy to
          fake, and real transfers can be reversed later.
        </li>
        <li>
          <strong>Fake converter sites.</strong> Pages claiming to convert Robux to PayPal or Cash
          App are lead-capture or phishing sites.
        </li>
      </ul>
      <p>
        Even a &ldquo;successful&rdquo; peer-to-peer sale can get both accounts moderated and leaves
        you with no recourse. The risk side is lopsided: you can lose your account, items and
        money, and you gain, at best, a small payment.
      </p>

      <h2>The one legitimate path: DevEx</h2>
      <p>
        DevEx lets eligible creators convert <strong>earned</strong> Robux into real currency. The
        key facts, as used in our calculators (data verified November 2026):
      </p>
      <ul>
        <li>
          <strong>Minimum:</strong> {formatRobux(DEVEX_MINIMUM_ROBUX)} earned Robux.
        </li>
        <li>
          <strong>Standard rate:</strong> ${DEVEX_STANDARD} per Robux.
        </li>
        <li>
          <strong>Eligible U.S. 18+ creators:</strong> ${DEVEX_US_18_PLUS} per Robux.
        </li>
        <li>
          <strong>Legacy reference rate:</strong> ${DEVEX_LEGACY} per Robux.
        </li>
        <li>
          <strong>Earned only:</strong> purchased and gifted Robux do not count.
        </li>
      </ul>
      <DataTable
        caption="DevEx value for common Robux amounts"
        headers={["Earned Robux", "Standard", "U.S. 18+", "Legacy"]}
        rows={[30_000, 100_000, 500_000, 1_000_000].map((r) => [
          formatRobux(r),
          formatUsd(devexUsd(r, DEVEX_STANDARD)),
          formatUsd(devexUsd(r, DEVEX_US_18_PLUS)),
          formatUsd(devexUsd(r, DEVEX_LEGACY)),
        ])}
      />
      <p>
        Check your own figures in the <Link href="/devex-calculator">DevEx calculator</Link>, and
        remember Roblox keeps 30% of marketplace sales before you ever hold the Robux — see{" "}
        <Link href="/blog/roblox-30-percent-tax-explained">the 30% tax explained</Link>.
      </p>

      <h2>What your Robux are worth if you are not a creator</h2>
      <p>
        For regular players, Robux are worth what they let you buy inside Roblox. Their dollar
        &ldquo;value&rdquo; is the purchase price: about $0.00999 per Robux on the web or with a
        gift card, and about $0.0125 per Robux in the mobile app. That is the number the{" "}
        <Link href="/#calculator">Robux to USD calculator</Link> shows for buy cost. It is not a
        resale value.
      </p>
      <p>
        Notice the gap: buying 1,000 Robux on the web is about $9.99, while a creator cashing out
        1,000 earned Robux at the standard rate receives about {formatUsd(devexUsd(1000))}. The
        spread is why selling purchased Robux makes no financial sense even if it were allowed.
      </p>

      <h2>Legitimate ways to earn from Roblox</h2>
      <ol>
        <li>
          <strong>Build and publish experiences</strong> that monetize through passes, products and
          engagement-based payouts, then use DevEx once eligible.
        </li>
        <li>
          <strong>Create and sell items</strong> in line with Roblox&apos;s marketplace policies.
        </li>
        <li>
          <strong>Learn the economy first.</strong> Understand the 30% fee and use the{" "}
          <Link href="/robux-tax-calculator">Robux tax calculator</Link> when you price items.
        </li>
      </ol>

      <h2>How to stay safe</h2>
      <ul>
        <li>Never share your password, security cookie or 2FA code with anyone.</li>
        <li>Buy Robux only through Roblox or authorized retailers.</li>
        <li>Ignore any &ldquo;Robux to PayPal&rdquo; or &ldquo;free Robux&rdquo; offer.</li>
        <li>Report scam accounts to Roblox and enable 2-step verification.</li>
      </ul>
      <p>
        Planning a purchase instead? Compare costs in the{" "}
        <Link href="/robux-price-chart">Robux price chart</Link> or{" "}
        <Link href="/usd-to-robux">USD to Robux calculator</Link>.
      </p>
    </BlogArticle>
  );
}
