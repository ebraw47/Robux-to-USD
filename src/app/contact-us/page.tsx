import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { UnofficialNote } from "@/components/ContentBits";
import { buildMetadata } from "@/lib/pageMeta";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Robux to USD Support",
  description: `Contact ${SITE_NAME} at ${CONTACT_EMAIL} for rate corrections, calculator feedback, or business questions. We cannot sell Robux or recover Roblox accounts.`,
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact-us" },
        ]}
      />
      <div className="container mx-auto max-w-3xl px-4 pb-16 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-ink md:text-4xl">Contact us</h1>
        <p className="mb-4 text-lg text-ink/80">
          Found an outdated Robux price, a DevEx rate that looks wrong, or have an idea for a new
          calculator? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-deep underline">
            {CONTACT_EMAIL}
          </a>{" "}
          or use the form below.
        </p>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-white p-5">
            <h2 className="font-display text-lg font-bold text-ink">We can help with</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/70">
              <li>Price or rate corrections</li>
              <li>Calculator bugs and feedback</li>
              <li>Questions about how a number is calculated</li>
              <li>Privacy and business inquiries</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-orange/30 bg-orange/[0.07] p-5">
            <h2 className="font-display text-lg font-bold text-ink">We cannot help with</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/70">
              <li>Selling, buying, or trading Robux</li>
              <li>Recovering or unbanning Roblox accounts</li>
              <li>Refunds or Roblox billing (contact Roblox Support)</li>
              <li>Free Robux requests</li>
            </ul>
          </div>
        </div>

        <p className="mb-8 text-sm text-ink/60">
          Never include your Roblox password, security cookie, or 2FA codes in a message. We will
          never ask for them. Typical reply time is a few business days.
        </p>

        <ContactForm />
        <UnofficialNote className="mt-10" />
      </div>
    </>
  );
}
