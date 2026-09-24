import { teamMembers } from "@/data/teamData";

const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://cms.adaptsmedia.com";

export const WP_CATEGORY_MAP: Record<number, string> = {
  1: "Online Marketing",
  2: "Browser",
  3: "Cryptocurrency",
  4: "Digital Marketing",
  5: "SEO",
  6: "Social Media",
  35: "Meme Marketing",
  37: "Marketing",
  39: "Google Ads",
  48: "Media Planning",
  49: "Services",
  50: "PPC",
  63: "Metaverse",
  80: "Video Marketing",
  94: "Voice Search",
  99: "E-Commerce Marketing",
  131: "Search Engine Marketing",
  140: "Graphic Design",
  152: "KPIs for Digital Marketing",
  154: "Case Study",
  168: "Artificial Intelligence",
  174: "Web Development",
  182: "Email Marketing",
  217: "Ad Operations",
};

export function cleanCategoryOrExpertise(item: any): string | null {
  if (item === null || item === undefined) return null;
  const num = typeof item === 'number' ? item : (!isNaN(Number(item)) && String(item).trim() !== '' ? Number(item) : null);
  if (num !== null) {
    return WP_CATEGORY_MAP[num] || null;
  }
  const str = String(item).trim();
  // Filter out any pure numeric string or strings that are too short
  if (!str || !isNaN(Number(str)) || str.length < 2) return null;
  return decodeHtmlEntities(str);
}

export function sanitizeCategoriesList(items: any[]): string[] {
  if (!Array.isArray(items)) return [];
  const cleaned = items
    .map(cleanCategoryOrExpertise)
    .filter((cat): cat is string => Boolean(cat));
  return Array.from(new Set(cleaned));
}

export function normalizeImageUrl(url?: string): string {
  if (!url) return "/fallback.jpg";
  let trimmed = url.trim();
  if (trimmed.startsWith("//")) {
    trimmed = `https:${trimmed}`;
  } else if (trimmed.startsWith("http://")) {
    trimmed = trimmed.replace(/^http:\/\//i, "https://");
  } else if (!trimmed.startsWith("https://") && !trimmed.startsWith("/")) {
    trimmed = `https://${trimmed}`;
  }
  return trimmed;
}

export function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
}

let memoryPostsCache: any[] | null = null;
let memoryAllPostsCache: any[] | null = null;
let memoryTeamCache: any[] | null = null;

let lastPostsFetchTime = 0;
let lastAllPostsFetchTime = 0;
const POSTS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// WordPress sits behind Cloudflare/hosting-level bot protection that has
// intermittently returned a 200 OK with an HTML challenge page instead of
// JSON. That single bad response, if trusted, used to get baked into
// Next's fetch data cache (`next: { revalidate }`) for the full TTL window
// — silently showing a broken/truncated post list to every visitor until
// it expired. These fetches now opt out of that cache (`cache: "no-store"`)
// and manage their own short-TTL in-memory cache instead, so a bad
// response is never trusted: it's validated (real JSON, plausible
// content) before it's allowed to replace the last-known-good result, and
// any failure just serves what was already cached rather than breaking.
function isJsonResponse(res: Response): boolean {
  return (res.headers.get("content-type") || "").includes("json");
}

function formatWpPost(post: any) {
  let authorName = post.yoast_head_json?.author;
  if (!authorName && post._embedded?.author && post._embedded.author.length > 0) {
    authorName = post._embedded.author[0].name;
  }
  if (!authorName) {
    authorName = "Shruti Goswami";
  }

  const schemaPerson = post.yoast_head_json?.schema?.['@graph']?.find(
    (item: any) => item['@type'] === 'Person'
  );
  let authorSlug = "shruti-goswami";
  if (schemaPerson?.url) {
    authorSlug = schemaPerson.url.split('/author/')[1]?.replace(/\//g, '') || authorSlug;
  } else {
    authorSlug = authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  
  const parsedDate = post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "June 30, 2026";
  
  let rawCats = post._embedded?.['wp:term']?.[0]?.filter((t: any) => t.taxonomy === 'category').map((c: any) => c.name) || [];
  if (rawCats.length === 0 && Array.isArray(post.categories)) {
    rawCats = post.categories;
  }
  let cats = sanitizeCategoriesList(rawCats);
  if (cats.length === 0) cats = ["SEO", "Digital Marketing", "Social Media"];

  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const rawImageUrl =
    featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
    featuredMedia?.media_details?.sizes?.large?.source_url ||
    featuredMedia?.source_url ||
    post.yoast_head_json?.og_image?.[0]?.url ||
    "/fallback.jpg";
  const imageUrl = normalizeImageUrl(rawImageUrl);

  // Distilled from yoast_head_json.schema — the only parts of it that
  // getResolvedAuthor() ever reads back out when given a *list* post
  // (i.e. via getPostsByAuthor -> getAllWordPressPosts). Keeping the full
  // raw yoast_head_json + _embedded on every post here was costing ~15KB/
  // post: across ~130+ posts that's a 3.7MB+ list payload, which is over
  // Next's 2MB per-entry data-cache limit — so this fetch was silently
  // never cached and re-fetched in full on every request that needed it
  // (the blog listing, the sitemap, every author page).
  const authorDescription: string | undefined = schemaPerson?.description;
  const authorLinkedIn: string | undefined = schemaPerson?.sameAs?.find((url: string) => url.includes("linkedin.com"));

  return {
    title: decodeHtmlEntities(post.title?.rendered || ""),
    image: imageUrl,
    slug: post.slug,
    date: parsedDate,
    author: authorName,
    authorSlug: authorSlug,
    authorDescription,
    authorLinkedIn,
    categories: cats,
    content: "",
  };
}

export async function getAllWordPressPosts() {
  const isFresh = memoryAllPostsCache && (Date.now() - lastAllPostsFetchTime < POSTS_CACHE_TTL_MS);
  if (isFresh) {
    return memoryAllPostsCache as any[];
  }

  try {
    const p1Promise = fetch(
      `${BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=100&page=1&_fields=title,slug,date,categories,featured_media,_embedded,yoast_head_json`,
      { cache: "no-store", signal: AbortSignal.timeout(10000) }
    );
    const p2Promise = fetch(
      `${BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=100&page=2&_fields=title,slug,date,categories,featured_media,_embedded,yoast_head_json`,
      { cache: "no-store", signal: AbortSignal.timeout(10000) }
    );

    const [res1, res2] = await Promise.allSettled([p1Promise, p2Promise]);
    let allRawPosts: any[] = [];

    if (res1.status === "fulfilled" && res1.value.ok && isJsonResponse(res1.value)) {
      const posts1 = await res1.value.json();
      if (Array.isArray(posts1)) allRawPosts = allRawPosts.concat(posts1);
    }
    if (res2.status === "fulfilled" && res2.value.ok && isJsonResponse(res2.value)) {
      const posts2 = await res2.value.json();
      if (Array.isArray(posts2)) allRawPosts = allRawPosts.concat(posts2);
    }

    // Guard against a partial/blocked response silently regressing an
    // already-good, larger cached list — only accept results that are at
    // least as complete as what we already know is real.
    const previousCount = memoryAllPostsCache?.length ?? 0;
    if (allRawPosts.length > 0 && allRawPosts.length >= previousCount) {
      const formatted = allRawPosts.map(formatWpPost);
      memoryAllPostsCache = formatted;
      lastAllPostsFetchTime = Date.now();
      return formatted;
    }
  } catch (error) {
    console.warn("getAllWordPressPosts warning:", (error as Error).message);
  }

  if (memoryAllPostsCache) return memoryAllPostsCache;
  return getWordPressPosts(100);
}

export async function getWordPressPosts(limit: number = 30) {
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const isFresh = memoryPostsCache && (Date.now() - lastPostsFetchTime < POSTS_CACHE_TTL_MS);
  if (isFresh) {
    return memoryPostsCache as any[];
  }

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=${safeLimit}&_fields=title,slug,date,categories,featured_media,_embedded,yoast_head_json`,
      { cache: "no-store", signal: AbortSignal.timeout(8000) }
    );

    if (!res.ok) throw new Error(`WordPress API returned status: ${res.status}`);
    if (!isJsonResponse(res)) throw new Error("WordPress API returned a non-JSON response (likely a bot-protection challenge page)");

    const posts = await res.json();
    if (!Array.isArray(posts)) throw new Error("WordPress API returned an unexpected shape");

    // Same guard as getAllWordPressPosts — never let a smaller/blocked
    // response overwrite a cache we already know was good.
    const previousCount = memoryPostsCache?.length ?? 0;
    if (posts.length < previousCount) {
      return memoryPostsCache as any[];
    }

    const formattedPosts = posts.map(formatWpPost);
    memoryPostsCache = formattedPosts;
    lastPostsFetchTime = Date.now();
    return formattedPosts;
  } catch (error) {
    if (memoryPostsCache) return memoryPostsCache;
    console.warn("WordPress posts fetch failed, returning empty fallback:", (error as Error).message);
    return [];
  }
}

/**
 * `post` here is either a raw WP post (has yoast_head_json/_embedded — the
 * shape getSinglePost() returns) or an already-formatted one from
 * getWordPressPosts()/getAllWordPressPosts() (has authorDescription/
 * authorLinkedIn instead — see formatWpPost's comment for why the raw
 * blobs aren't kept on those). Prefer the pre-derived fields when present
 * and fall back to extracting from the raw shape otherwise, so this works
 * with both callers.
 */
export async function getResolvedAuthor(post: any) {
  const schemaPerson = post.yoast_head_json?.schema?.['@graph']?.find(
    (item: any) => item['@type'] === 'Person'
  );

  // post.author is a *string name* on formatted list posts, but a numeric
  // WordPress user ID on raw posts (from getSinglePost) — only trust it
  // here when it's actually the string shape.
  const authorName =
    (typeof post.author === "string" ? post.author : undefined) ||
    post.yoast_head_json?.author ||
    schemaPerson?.name ||
    "Shruti Goswami";

  let authorSlug = post.authorSlug;
  if (!authorSlug) {
    if (schemaPerson?.url) {
      authorSlug = schemaPerson.url.split('/author/')[1]?.replace(/\//g, '') || "shruti-goswami";
    } else {
      authorSlug = authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
  }

  const team = await getWordPressTeamMembers();
  const matchingMember = team.find((m: any) =>
    m.name.toLowerCase().trim() === authorName.toLowerCase().trim() ||
    m.slug === authorSlug ||
    (authorSlug === "jailee-cruz" && (m.slug === "jailee-dela-cruz" || m.name.toLowerCase().includes("jailee")))
  );

  const schemaDescription = post.authorDescription ?? schemaPerson?.description;
  const schemaLinkedIn = post.authorLinkedIn ?? schemaPerson?.sameAs?.find((url: string) => url.includes("linkedin.com"));

  let linkedin = "https://www.linkedin.com/company/adaptsmedia/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ae";
  if (schemaLinkedIn) {
    linkedin = schemaLinkedIn;
  } else if (matchingMember?.socials?.linkedin) {
    linkedin = matchingMember.socials.linkedin;
  }

  let email = "info@adaptsmedia.com";
  if (matchingMember?.socials?.email) {
    email = matchingMember.socials.email;
  }

  const embeddedTerms = post?._embedded?.['wp:term']?.[0]?.filter((t: any) => t.taxonomy === 'category').map((c: any) => c.name) || [];
  const rawPostCategories: any[] = embeddedTerms.length > 0 ? embeddedTerms : (post?.categories || []);
  const postCategories = sanitizeCategoriesList(rawPostCategories);

  const expertise = sanitizeCategoriesList([
    ...(matchingMember?.expertise || []),
    ...postCategories,
  ]);

  return {
    name: matchingMember?.name || authorName,
    slug: authorSlug,
    description: schemaDescription || matchingMember?.aboutLong || matchingMember?.bio || "Digital Marketing Expert at Adapts Media.",
    avatar: normalizeImageUrl(matchingMember?.image || post._embedded?.author?.[0]?.avatar_urls?.['96'] || "/images/Team/AshishGupta.png"),
    role: matchingMember?.role || "Digital Marketing Specialist",
    expertise: expertise.length > 0 ? expertise : ["Digital Marketing", "Strategy"],
    linkedin,
    email,
  };
}

export async function getPostsByAuthor(authorSlug: string) {
  const normalized = authorSlug === "jailee-dela-cruz" ? "jailee-cruz" : authorSlug;
  const allPosts = await getAllWordPressPosts();
  return allPosts.filter(
    (post: any) =>
      post.authorSlug === normalized ||
      (normalized === "jailee-cruz" && (post.authorSlug === "jailee-cruz" || post.authorSlug === "jailee-dela-cruz"))
  );
}


// Per-slug last-known-good cache. A transient bot-protection block should
// never 404 a real post that loaded successfully before — better to serve
// a few minutes stale than a hard 404 that search engines and users hit
// directly. Only a genuinely missing post (a real, parsed empty result)
// clears an entry.
const singlePostCache = new Map<string, { post: any; time: number }>();

export async function getSinglePost(slug: string) {
  if (!BASE_URL) return null;

  const url = `${BASE_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`;
  const cached = singlePostCache.get(slug);
  if (cached && Date.now() - cached.time < POSTS_CACHE_TTL_MS) {
    return cached.post;
  }

  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(4000) });

    if (!res.ok || !isJsonResponse(res)) {
      if (cached) return cached.post;
      return null;
    }

    const posts = await res.json();

    if (!Array.isArray(posts) || posts.length === 0) {
      singlePostCache.delete(slug);
      return null;
    }

    singlePostCache.set(slug, { post: posts[0], time: Date.now() });
    return posts[0];
  } catch (error) {
    console.warn(`Single post fetch error [${slug}]:`, (error as Error).message);
    if (cached) return cached.post;
    return null;
  }
}


let lastTeamFetchTime = 0;
const TEAM_CACHE_TTL_MS = 60 * 1000; // 60 seconds

export async function getWordPressTeamMembers(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && memoryTeamCache && (now - lastTeamFetchTime < TEAM_CACHE_TTL_MS)) {
    return memoryTeamCache;
  }

  const { teamMembers } = await import('@/data/teamData');
  const teamUrl = `${BASE_URL}/team/`;

  try {
    const res = await fetch(teamUrl, { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      if (!memoryTeamCache) memoryTeamCache = teamMembers;
      return memoryTeamCache;
    }

    const html = await res.text();
    const cardBlocks = html.split(/<div[^>]*class=["'][^"']*card-wrapper[^"']*["']/gi).slice(1);
    
    if (cardBlocks.length > 0) {
      const parsed: any[] = [];
      let id = 1;

      for (const block of cardBlocks) {
        const imgMatch = block.match(/<img[^>]+src=["']([^"']+)["']/i);
        const nameMatch = block.match(/<h3[^>]*>(.*?)<\/h3>/i);
        const roleMatch = block.match(/<h5[^>]*>(.*?)<\/h5>/i);
        const bioMatch = block.match(/<p[^>]*>([\s\S]*?)<\/p>/i);

        const img = normalizeImageUrl(imgMatch ? imgMatch[1].trim() : '');
        const name = nameMatch ? decodeHtmlEntities(nameMatch[1].replace(/<[^>]+>/g, '').trim()) : '';
        const rawRole = roleMatch ? decodeHtmlEntities(roleMatch[1].replace(/<[^>]+>/g, '').trim()) : '';
        const bio = bioMatch ? decodeHtmlEntities(bioMatch[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')) : '';
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        if (name && img) {
          const existing = teamMembers.find(t => t.slug === slug || t.name.toLowerCase() === name.toLowerCase());
          const role = rawRole || existing?.role || "Team Member";

          const badges = Array.from(new Set([role, ...(existing?.badges || [])])).filter(Boolean);
          const expertise = existing?.expertise && existing.expertise.length > 0
            ? existing.expertise
            : [role, "Digital Strategy", "Client Growth"];

          parsed.push({
            id: id++,
            name,
            slug,
            role,
            image: img || existing?.image || "/fallback.jpg",
            initials: existing?.initials || name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
            initialsBg: existing?.initialsBg || "bg-blue-600",
            bio: bio || existing?.bio || `${role} at Adapts Media.`,
            location: existing?.location || (role.includes('India') || bio.toLowerCase().includes('india') ? "Gurugram, India" : "Dubai, UAE"),
            expertise,
            topics: existing?.topics || ["Digital Marketing"],
            aboutLong: bio || existing?.aboutLong || `${name} is ${role} at Adapts Media.`,
            badges,
            socials: existing?.socials || { linkedin: "https://www.linkedin.com/company/adaptsmedia", email: "info@adaptsmedia.com" }
          });
        }
      }

      if (parsed.length > 0) {
        memoryTeamCache = parsed;
        lastTeamFetchTime = now;
        return parsed;
      }
    }
  } catch (error) {
    console.warn("WordPress team fetch warning, using fallback team data:", (error as Error).message);
  }

  if (!memoryTeamCache) memoryTeamCache = teamMembers;
  return memoryTeamCache;
}

export async function getWordPressTeamMemberBySlug(slug: string) {
  const members = await getWordPressTeamMembers();
  return members.find((m: any) => m.slug === slug || m.slug.toLowerCase() === slug.toLowerCase()) || null;
}


