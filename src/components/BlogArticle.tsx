import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import BlogPostSchema from "@/components/BlogPostSchema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { proseClass, RelatedTools, UnofficialNote } from "@/components/ContentBits";
import FaqSection from "@/components/FaqSection";
import { RATES_LAST_VERIFIED } from "@/lib/robuxRates";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  readTime: string;
  image: string;
  imageAlt: string;
};

export default function BlogArticle({
  meta,
  headline,
  intro,
  faqs,
  relatedPosts,
  children,
}: {
  meta: BlogPostMeta;
  /** On-page H1 (can differ slightly from <title>). */
  headline?: string;
  intro: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedPosts: Array<{ slug: string; title: string }>;
  children: ReactNode;
}) {
  const formatted = new Date(`${meta.datePublished}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: meta.title, href: `/blog/${meta.slug}` },
        ]}
      />
      <BlogPostSchema
        title={meta.title}
        description={meta.description}
        slug={meta.slug}
        datePublished={meta.datePublished}
        image={`${SITE_ORIGIN}${meta.image}`}
        articleBody={intro}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-16 pt-6">
        <header className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep">
            Guide · {formatted} · {meta.readTime} read
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
            {headline ?? meta.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">{intro}</p>
          <p className="mt-3 text-sm text-ink/50">
            Rates last verified {RATES_LAST_VERIFIED}. Published {formatted} by the editorial team
            at Robux to USD.
          </p>
        </header>

        <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-ink/10 bg-white">
          <Image
            src={meta.image}
            alt={meta.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className={proseClass}>{children}</div>

        <FaqSection items={faqs} title="Frequently asked questions" />

        <section className="mt-14">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">Keep reading</h2>
          <ul className="space-y-2">
            {relatedPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="font-semibold text-teal-deep underline underline-offset-2"
                >
                  {p.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog" className="text-ink/60 underline underline-offset-2">
                All Robux to USD guides
              </Link>
            </li>
          </ul>
        </section>

        <RelatedTools />
        <UnofficialNote className="mt-10" />
      </article>
    </>
  );
}
