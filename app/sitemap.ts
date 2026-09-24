import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { teamMembers } from "@/data/teamData";
import { isAuthor, WORDPRESS_AUTHORS } from "@/lib/authors";

const WORDPRESS_URL = process.env.WORDPRESS_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://cms.adaptsmedia.com";

// Static marketing routes — everything under app/ that isn't dynamic,
// admin-only, or intentionally duplicate content pointed elsewhere via
// canonical (e.g. /portfolio/hyundai-mobis → /case-studies/hyundai-mobis).
const STATIC_ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ai-emerging-media", changeFrequency: "monthly", priority: 0.7 },
  { path: "/branding-creative", changeFrequency: "monthly", priority: 0.7 },
  { path: "/performance-marketing", changeFrequency: "monthly", priority: 0.7 },
  { path: "/public-relations", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ai-search-optimization", changeFrequency: "monthly", priority: 0.7 },
  { path: "/social-content", changeFrequency: "monthly", priority: 0.7 },
  { path: "/strategy-consulting", changeFrequency: "monthly", priority: 0.7 },
  { path: "/web-digital-experience", changeFrequency: "monthly", priority: 0.7 },
  { path: "/online-reputation-management", changeFrequency: "monthly", priority: 0.7 },
  { path: "/case-studies/hyundai-mobis", changeFrequency: "yearly", priority: 0.6 },
  // /portfolio now has its own copy (see PortfolioHero/PortfolioList's
  // `variant` prop) rather than duplicating /case-studies, so it's back
  // to self-canonical and belongs in the sitemap again. Its
  // /portfolio/hyundai-mobis sub-page still mirrors /case-studies/
  // hyundai-mobis exactly, though, so that one stays excluded.
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.7 },
  { path: "/team", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blogs", changeFrequency: "daily", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/start-project", changeFrequency: "yearly", priority: 0.6 },
];

type WPPostSummary = { slug: string; modified: string };

async function getAllPostSlugs(): Promise<WPPostSummary[]> {
  const posts: WPPostSummary[] = [];
  const perPage = 100;

  for (let page = 1; page <= 5; page++) {
    try {
      const res = await fetch(
        `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_fields=slug,modified`,
        { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
      );
      if (!res.ok) break;
      const batch: WPPostSummary[] = await res.json();
      posts.push(...batch);
      if (batch.length < perPage) break;
    } catch {
      break;
    }
  }

  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostSlugs();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const teamEntries: MetadataRoute.Sitemap = teamMembers
    .filter((member) => !isAuthor(member.slug))
    .map((member) => ({
      url: `${SITE_URL}/team/${member.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    }));

  const authorEntries: MetadataRoute.Sitemap = WORDPRESS_AUTHORS.map((author) => ({
    url: `${SITE_URL}/author/${author.authorSlug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries, ...teamEntries, ...authorEntries];
}
