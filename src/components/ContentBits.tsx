import Link from "next/link";
import type { ReactNode } from "react";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";
import { WEB_APPLICATION_JSON_LD } from "@/lib/appFacts";
import { BRAND_LOGO, CONTACT_EMAIL, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

/** Shared prose wrapper used by tool pages and blog posts. */
export const proseClass =
  "space-y-5 leading-relaxed text-ink/80 " +
  "[&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink md:[&_h2]:text-3xl " +
  "[&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink " +
  "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 " +
  "[&_a]:text-teal-deep [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-teal " +
  "[&_strong]:text-ink";

export const sectionCardClass =
  "rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_18px_50px_-36px_rgba(13,148,136,0.35)] md:p-8";

export function DataTable({
  headers,
  rows,
  caption,
  highlightFirstCol = true,
}: {
  headers: string[];
  rows: ReactNode[][];
  caption?: string;
  highlightFirstCol?: boolean;
}) {
  return (
    <div className="not-prose overflow-x-auto rounded-2xl border border-ink/10 bg-white">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="bg-ink/[0.04]">
            {headers.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-ink/10 odd:bg-white even:bg-[#F8FBFA]">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${
                    j === 0 && highlightFirstCol ? "font-semibold text-ink" : "text-ink/75"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Callout({
  title,
  children,
  tone = "teal",
}: {
  title?: string;
  children: ReactNode;
  tone?: "teal" | "gold";
}) {
  const toneClass =
    tone === "gold"
      ? "border-orange/30 bg-orange/[0.07]"
      : "border-teal/25 bg-teal/[0.06]";
  return (
    <aside className={`rounded-2xl border p-5 ${toneClass}`}>
      {title ? <p className="mb-1 font-display text-lg font-bold text-ink">{title}</p> : null}
      <div className="space-y-2 text-ink/80">{children}</div>
    </aside>
  );
}

/** Standard unofficial / trademark notice. */
export function UnofficialNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rounded-2xl border border-ink/10 bg-ink/[0.03] px-5 py-4 text-sm leading-relaxed text-ink/65 ${className}`}
    >
      <strong className="text-ink/80">Unofficial tool.</strong> {SITE_NAME} is an independent,
      informational calculator. It is not affiliated with, endorsed by, or sponsored by Roblox
      Corporation. Roblox and Robux are trademarks of Roblox Corporation. We never sell Robux, never
      ask for your Roblox password or login, and never promise free Robux. Figures are estimates —
      always confirm prices and cashout terms on Roblox before you buy or cash out. See our{" "}
      <Link href="/disclaimer" className="text-teal-deep underline">
        disclaimer
      </Link>
      .
    </p>
  );
}

export type ToolLink = { href: string; label: string; desc: string };

export const TOOL_LINKS: ToolLink[] = [
  { href: "/#calculator", label: "Robux to USD calculator", desc: "Convert Robux into dollars" },
  { href: "/usd-to-robux", label: "USD to Robux", desc: "How many Robux for your budget" },
  { href: "/robux-price-chart", label: "Robux price chart", desc: "All 9 packs, web vs app" },
  { href: "/devex-calculator", label: "DevEx calculator", desc: "Creator cashout estimates" },
  { href: "/robux-tax-calculator", label: "Robux tax calculator", desc: "30% marketplace fee math" },
];

export function RelatedTools({
  exclude,
  title = "More Robux to USD tools",
}: {
  exclude?: string[];
  title?: string;
}) {
  const links = TOOL_LINKS.filter((l) => !exclude?.includes(l.href));
  return (
    <section className="mt-14" aria-labelledby="related-tools">
      <h2 id="related-tools" className="mb-5 font-display text-2xl font-bold text-ink md:text-3xl">
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group rounded-2xl border border-ink/10 bg-white p-4 transition hover:border-teal/40 hover:shadow-md"
          >
            <p className="font-display text-lg font-bold text-ink group-hover:text-teal-deep">
              {l.label}
            </p>
            <p className="mt-1 text-sm text-ink/60">{l.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** WebPage + SoftwareApplication JSON-LD for tool pages. */
export function ToolPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const url = `${SITE_ORIGIN}${path}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en-US",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_ORIGIN },
        dateModified: "2026-11-20",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE.startsWith("http") ? OG_IMAGE : `${SITE_ORIGIN}${OG_IMAGE}`,
          width: 1200,
          height: 630,
          ...imageObjectLicensing,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_ORIGIN,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_ORIGIN}${BRAND_LOGO}`,
            width: 512,
            height: 512,
            ...imageObjectLicensing,
          },
        },
      },
      { ...WEB_APPLICATION_JSON_LD, name, url, description },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

export function SupportMail() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-deep underline">
      {CONTACT_EMAIL}
    </a>
  );
}
