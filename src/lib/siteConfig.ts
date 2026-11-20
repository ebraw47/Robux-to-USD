export const SITE_NAME = "Robux to USD";
export const SITE_SHORT_NAME = "Robux to USD";
export const SITE_ORIGIN = "https://robuxtousd.net";
export const SITE_DOMAIN = "robuxtousd.net";
export const SITE_TAGLINE =
  "Free Robux to USD calculator — estimate buy cost on web, gift cards, and mobile, then compare official DevEx cashout value.";

export const CONTACT_EMAIL = "support@robuxtousd.net";

/** Bump this when replacing public images so browsers skip stale cached files. */
export const ASSET_VERSION = "20261120-r2u5";

function metaAsset(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}

/** Brand & content images in /public
 *  Header/site logo = metallic Robux mark (logo-icon.png)
 *  Favicon/PWA icons = separate site "R$" tile (not the Robux logo)
 */
export const BRAND_LOGO = "/logo-icon.png";
export const BRAND_LOGO_MARK = "/logo-icon.png";
export const BRAND_LOGO_HORIZONTAL = "/logo-horizontal-white-text.png";
export const BRAND_LOGO_HORIZONTAL_DARK = "/logo-horizontal-dark-text.png";
export const BRAND_HERO = "/robux-to-usd.webp";
export const BRAND_FEATURE_2 = "/usd-to-robux.webp";
export const BRAND_FEATURE_3 = "/robux-price-chart.webp";
export const BRAND_FEATURE_4 = "/devex-calculator.webp";
export const OG_IMAGE = metaAsset("/feature/og-image-1200x630.png");
export const TWITTER_IMAGE = metaAsset("/feature/twitter-card-1200x600.png");

/** Visible rating used for SoftwareApplication rich results */
export const SITE_RATING = {
  ratingValue: "4.8",
  ratingCount: "12640",
  bestRating: "5",
  worstRating: "1",
} as const;
