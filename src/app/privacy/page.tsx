import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { proseClass } from "@/components/ContentBits";
import { buildMetadata } from "@/lib/pageMeta";
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME} at ${SITE_DOMAIN}: what we collect, how calculator inputs are handled, cookies, analytics, and how to contact us. We never ask for Roblox logins.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy", href: "/privacy" },
        ]}
      />
      <div className="container mx-auto max-w-3xl px-4 pb-16 pt-8">
        <h1 className="mb-6 font-display text-3xl font-bold text-ink md:text-4xl">
          Privacy policy
        </h1>
        <div className={proseClass}>
          <p>
            <strong>Last updated: November 20, 2026</strong>
          </p>
          <p>
            {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates {SITE_DOMAIN}, a free,
            unofficial calculator and guide site about Robux prices, DevEx rates and marketplace
            fees. This policy explains what information we handle when you use the site.
          </p>

          <h2>We never ask for Roblox credentials</h2>
          <p>
            We do not require an account, and we will never ask for your Roblox username, password,
            security cookie, 2FA code, or payment details. Do not share them with anyone claiming to
            represent this site.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Calculator inputs.</strong> Amounts such as Robux, dollars or gift card values
              are processed in your browser to show results. We do not store them on a server or tie
              them to an identity.
            </li>
            <li>
              <strong>Messages you send.</strong> If you email {CONTACT_EMAIL} or use the contact
              form, we receive the name, email address and message you provide.
            </li>
            <li>
              <strong>Technical data.</strong> Like most sites, our hosting and measurement tools may
              record IP address, browser and device type, referring page, pages viewed and
              approximate location.
            </li>
          </ul>

          <h2>How we use information</h2>
          <ul>
            <li>To reply to support, correction and feedback requests.</li>
            <li>To keep the site secure and prevent abuse.</li>
            <li>To understand which tools and guides are useful and improve performance.</li>
          </ul>
          <p>We do not sell personal data.</p>

          <h2>Cookies and analytics</h2>
          <p>
            We may use first-party cookies or similar technologies and analytics services to measure
            traffic and performance. You can block or delete cookies in your browser settings;
            calculators keep working without them.
          </p>

          <h2>Advertising and third parties</h2>
          <p>
            If we show advertising or affiliate links in the future, those providers may use cookies
            under their own policies, and we will update this page. Hosting, content delivery and
            analytics providers may process technical data on our behalf to deliver the site.
            External links (for example to Roblox) are governed by the destination site&apos;s
            policy.
          </p>

          <h2>Retention</h2>
          <p>
            Support emails are kept only as long as needed to resolve your request and keep
            reasonable records. Server and analytics logs are retained for limited periods set by our
            providers.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You can use the site without contacting us. To ask about, correct, or delete
            information from a support thread, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Depending on where you live,
            you may have additional rights under laws such as the GDPR or CCPA, and we will respond
            as required by those laws.
          </p>

          <h2>Children</h2>
          <p>
            Robux are popular with young players. {SITE_NAME} is not directed at children under 13
            and does not knowingly collect their personal information. If you believe a child sent
            us personal data, contact us and we will delete it.
          </p>

          <h2>Trademark notice</h2>
          <p>
            We are not affiliated with Roblox Corporation. Roblox and Robux are trademarks of Roblox
            Corporation and are used only to describe what our calculators estimate.
          </p>

          <h2>Changes and contact</h2>
          <p>
            We may update this policy and will change the date above when we do. Privacy questions:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
