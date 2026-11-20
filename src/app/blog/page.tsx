import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { RelatedTools, UnofficialNote } from "@/components/ContentBits";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { buildMetadata } from "@/lib/pageMeta";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Robux to USD Guides",
  description:
    "Robux to USD guides: can you sell Robux, Roblox Plus vs Premium, gift card to Robux chart, web vs mobile prices, DevEx rates 2026, and the 30% tax explained.",
  path: "/blog",
});

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} blog`,
    url: `${SITE_ORIGIN}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: BLOG_POSTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_ORIGIN}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <div className="container mx-auto max-w-5xl px-4 pb-16 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-ink md:text-5xl">
          Robux to USD blog
        </h1>
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-ink/75">
          Six focused guides on the questions people actually search: whether you can sell Robux,
          what gift cards buy, how web and mobile prices differ, what DevEx pays, and how the 30%
          fee works. Every guide links to a live calculator.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-colors hover:border-teal/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              <article>
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/45">
                    <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time> ·{" "}
                    {post.readTime}
                  </p>
                  <h2 className="font-display text-xl font-bold text-ink group-hover:text-teal-deep">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink/70">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <RelatedTools title="Jump straight to a calculator" />
        <UnofficialNote className="mt-10" />
      </div>
    </>
  );
}
