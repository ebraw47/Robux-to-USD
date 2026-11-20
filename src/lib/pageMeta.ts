import type { Metadata } from "next";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN, TWITTER_IMAGE } from "@/lib/siteConfig";

function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_ORIGIN}${path}`;
}

type BuildMetaInput = {
  /** Page title WITHOUT the site name (layout template appends it). */
  title: string;
  description: string;
  /** Path beginning with "/" */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

/** Shared Metadata builder: canonical, Open Graph, Twitter. */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
}: BuildMetaInput): Metadata {
  const url = abs(path);
  const ogTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [{ url: abs(OG_IMAGE), width: 1200, height: 630, alt: ogTitle }],
      ...(type === "article"
        ? {
            publishedTime: publishedTime ?? "2026-11-20",
            modifiedTime: modifiedTime ?? publishedTime ?? "2026-11-20",
            authors: [SITE_NAME],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [abs(TWITTER_IMAGE)],
    },
  };
}
