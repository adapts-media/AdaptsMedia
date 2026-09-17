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

  return {
    title: decodeHtmlEntities(post.title?.rendered || ""),
    image: imageUrl,
    slug: post.slug,
    date: parsedDate,
    author: authorName,
    authorSlug: authorSlug,
    categories: cats,
    content: "",
    yoast_head_json: post.yoast_head_json,
    _embedded: post._embedded,
  };
}

export async function getAllWordPressPosts() {
  if (memoryAllPostsCache && memoryAllPostsCache.length > 0) {
    return memoryAllPostsCache;
  }

  try {
    const p1Promise = fetch(
      `${BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=100&page=1&_fields=title,slug,date,categories,featured_media,_links,_embedded,yoast_head_json`,
      { next: { revalidate: 1800 }, signal: AbortSignal.timeout(10000) }
    );
    const p2Promise = fetch(
      `${BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=100&page=2&_fields=title,slug,date,categories,featured_media,_links,_embedded,yoast_head_json`,
      { next: { revalidate: 1800 }, signal: AbortSignal.timeout(10000) }
    );

    const [res1, res2] = await Promise.allSettled([p1Promise, p2Promise]);
    let allRawPosts: any[] = [];

    if (res1.status === "fulfilled" && res1.value.ok) {
      const posts1 = await res1.value.json();
      if (Array.isArray(posts1)) allRawPosts = allRawPosts.concat(posts1);
    }
    if (res2.status === "fulfilled" && res2.value.ok) {
      const posts2 = await res2.value.json();
      if (Array.isArray(posts2)) allRawPosts = allRawPosts.concat(posts2);
    }

    if (allRawPosts.length > 0) {
      const formatted = allRawPosts.map(formatWpPost);
      memoryAllPostsCache = formatted;
      return formatted;
    }
  } catch (error) {
    console.warn("getAllWordPressPosts warning:", (error as Error).message);
  }

  return getWordPressPosts(100);
}

export async function getWordPressPosts(limit: number = 30) {
  const safeLimit = Math.min(Math.max(limit, 1), 100);

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=${safeLimit}&_fields=title,slug,date,categories,featured_media,_links,_embedded,yoast_head_json`,
      { next: { revalidate: 1800 }, signal: AbortSignal.timeout(8000) }
    );

    if (!res.ok) throw new Error(`WordPress API returned status: ${res.status}`);

    const posts = await res.json();
    const formattedPosts = posts.map(formatWpPost);

    memoryPostsCache = formattedPosts;
    return formattedPosts;
  } catch (error) {
    if (memoryPostsCache) return memoryPostsCache;
    console.warn("WordPress posts fetch failed, returning empty fallback:", (error as Error).message);
    return [];
  }
}

export async function getResolvedAuthor(post: any) {
  const schemaPerson = post.yoast_head_json?.schema?.['@graph']?.find(
    (item: any) => item['@type'] === 'Person'
  );

  const authorName = post.yoast_head_json?.author || schemaPerson?.name || "Shruti Goswami";

  let authorSlug = "shruti-goswami";
  if (schemaPerson?.url) {
    authorSlug = schemaPerson.url.split('/author/')[1]?.replace(/\//g, '') || authorSlug;
  } else {
    authorSlug = authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  const team = await getWordPressTeamMembers();
  const matchingMember = team.find((m: any) => 
    m.name.toLowerCase().trim() === authorName.toLowerCase().trim() ||
    m.slug === authorSlug ||
    (authorSlug === "jailee-cruz" && (m.slug === "jailee-dela-cruz" || m.name.toLowerCase().includes("jailee")))
  );

  let linkedin = "https://www.linkedin.com/company/adaptsmedia/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ae";
  if (schemaPerson?.sameAs) {
    const li = schemaPerson.sameAs.find((url: string) => url.includes("linkedin.com"));
    if (li) linkedin = li;
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
    description: schemaPerson?.description || matchingMember?.aboutLong || matchingMember?.bio || "Digital Marketing Expert at Adapts Media.",
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


export async function getSinglePost(slug: string) {
  if (!BASE_URL) return null;

  const url = `${BASE_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`;

  try {
    const res = await fetch(url, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(4000) });

    if (!res.ok) return null;

    const posts = await res.json();

    if (!posts || posts.length === 0) {
      return null;
    }

    return posts[0];
  } catch (error) {
    console.warn(`Single post fetch error [${slug}]:`, (error as Error).message);
    return null;
  }
}


export async function getWordPressTeamMembers() {
  if (memoryTeamCache) return memoryTeamCache;

  const { teamMembers } = await import('@/data/teamData');
  const teamUrl = `${BASE_URL}/team/`;

  try {
    const res = await fetch(teamUrl, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      memoryTeamCache = teamMembers;
      return teamMembers;
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
          const role = rawRole || existing?.role || "Digital Marketing Specialist";

          parsed.push({
            id: id++,
            name,
            slug,
            role,
            image: img,
            initials: existing?.initials || name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
            initialsBg: existing?.initialsBg || "bg-blue-600",
            bio: bio || existing?.bio || `${role} at Adapts Media.`,
            location: existing?.location || (role.includes('India') ? "Gurugram, India" : "Dubai, UAE"),
            memberSince: existing?.memberSince || 2023,
            expertise: existing?.expertise || [role, "Digital Marketing", "Strategy"],
            topics: existing?.topics || ["Digital Marketing"],
            aboutLong: bio || existing?.aboutLong || `${name} is ${role} at Adapts Media.`,
            badges: existing?.badges || [role],
            socials: existing?.socials || { linkedin: "https://www.linkedin.com/company/adaptsmedia/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ae", email: "info@adaptsmedia.com" }
          });
        }
      }

      if (parsed.length > 0) {
        memoryTeamCache = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.warn("WordPress team fetch warning, using local team data:", (error as Error).message);
  }

  memoryTeamCache = teamMembers;
  return teamMembers;
}


