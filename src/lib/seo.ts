import type { Metadata } from "next";

export const SITE_NAME = "Adapts Media";

// Canonical production origin — used for canonical URLs, OG/Twitter image
// URLs, and the sitemap, regardless of what host the app happens to be
// running on (localhost, a Vercel preview, etc). Override via env if the
// production domain ever changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://adaptsmedia.com").replace(/\/$/, "");

// TODO: no dedicated Open Graph share image exists in the repo yet — add a
// real 1200x630 image at public/default-og.jpg (branded, with a headline/
// logo) and this fallback starts working everywhere automatically. Until
// then, pages that don't pass their own `image` share this (currently
// missing) file when unfurled on social platforms.
export const DEFAULT_OG_IMAGE = "/default-og.jpg";

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Route path this page is served at, e.g. "/about-us" or "/blogs/my-post". */
  path: string;
  /** Absolute or root-relative image URL for OG/Twitter cards. Defaults to DEFAULT_OG_IMAGE. */
  image?: string;
  /** Keep this page out of search results (e.g. internal tools, thin/duplicate pages). */
  noindex?: boolean;
  /**
   * Point the canonical tag at a different URL than `path` — for pages that
   * intentionally duplicate another page's content (e.g. /portfolio mirrors
   * /case-studies) so search engines consolidate ranking signal onto one
   * URL instead of splitting it across near-duplicates.
   */
  canonicalPath?: string;
  type?: "website" | "article" | "profile";
}

/**
 * Builds a consistent Metadata object (title, description, canonical,
 * Open Graph, Twitter card, robots) for a page. Use this instead of a bare
 * `export const metadata = {...}` so every page gets a canonical URL and
 * social preview without repeating the boilerplate.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
  canonicalPath,
  type = "website",
}: BuildMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(canonicalPath ?? path);
  const ogImage = absoluteUrl(image || DEFAULT_OG_IMAGE);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
