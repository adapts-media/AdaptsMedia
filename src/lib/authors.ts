/**
 * Author definitions and routing helpers.
 * Authors have public author archives (/author/[slug]) instead of standard team profiles (/team/[slug]).
 */

export interface AuthorMapping {
  authorSlug: string; // The canonical /author/[slug] URL slug
  name: string;
  teamSlug?: string; // Matching slug in teamData.ts (if in team data)
  wpAuthorId?: number;
}

export const WORDPRESS_AUTHORS: AuthorMapping[] = [
  {
    authorSlug: "shruti-goswami",
    teamSlug: "shruti-goswami",
    name: "Shruti Goswami",
    wpAuthorId: 12,
  },
  {
    authorSlug: "peter-razumovsky",
    name: "Peter Razumovsky",
    wpAuthorId: 15,
  },
  {
    authorSlug: "prakhar-kirsali",
    name: "Prakhar Kirsali",
    wpAuthorId: 13,
  },
  {
    authorSlug: "jyoti-chaudhary",
    teamSlug: "jyoti-chaudhary",
    name: "Jyoti Chaudhary",
    wpAuthorId: 14,
  },
  {
    authorSlug: "sachin-mishra",
    teamSlug: "sachin-mishra",
    name: "Sachin Mishra",
    wpAuthorId: 17,
  },
  {
    authorSlug: "jailee-cruz",
    teamSlug: "jailee-dela-cruz",
    name: "Jailee Dela Cruz",
    wpAuthorId: 18,
  },
  {
    authorSlug: "dharmendra-vishwakarma",
    teamSlug: "dharmendra-vishwakarma",
    name: "Dharmendra Vishwakarma",
    wpAuthorId: 16,
  },
];

// Lookup maps for fast, canonical slug matching
const SLUG_TO_AUTHOR: Record<string, string> = {
  "shruti-goswami": "shruti-goswami",
  "peter-razumovsky": "peter-razumovsky",
  "prakhar-kirsali": "prakhar-kirsali",
  "jyoti-chaudhary": "jyoti-chaudhary",
  "sachin-mishra": "sachin-mishra",
  "jailee-cruz": "jailee-cruz",
  "jailee-dela-cruz": "jailee-cruz",
  "dharmendra-vishwakarma": "dharmendra-vishwakarma",
};

const NAME_TO_AUTHOR: Record<string, string> = {
  "shruti goswami": "shruti-goswami",
  "peter razumovsky": "peter-razumovsky",
  "prakhar kirsali": "prakhar-kirsali",
  "jyoti chaudhary": "jyoti-chaudhary",
  "sachin mishra": "sachin-mishra",
  "jailee dela cruz": "jailee-cruz",
  "jailee cruz": "jailee-cruz",
  "dharmendra vishwakarma": "dharmendra-vishwakarma",
};

/**
 * Returns the canonical author slug if the given slug or name belongs to an author.
 * Returns null if the person is a regular team member.
 */
export function getAuthorSlug(identifier?: string | null): string | null {
  if (!identifier) return null;
  const clean = identifier.toLowerCase().trim();

  if (SLUG_TO_AUTHOR[clean]) {
    return SLUG_TO_AUTHOR[clean];
  }

  if (NAME_TO_AUTHOR[clean]) {
    return NAME_TO_AUTHOR[clean];
  }

  const slugified = clean.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (SLUG_TO_AUTHOR[slugified]) {
    return SLUG_TO_AUTHOR[slugified];
  }

  return null;
}

/**
 * Returns true if the person is an author on WordPress.
 */
export function isAuthor(identifier?: string | null): boolean {
  return getAuthorSlug(identifier) !== null;
}

/**
 * Returns the destination URL for a team member:
 * - If the person is an author, returns `/author/${authorSlug}`
 * - Otherwise returns `/team/${member.slug}`
 */
export function getMemberProfileUrl(member: { slug: string; name?: string }): string {
  const authorSlug = getAuthorSlug(member.slug) || (member.name ? getAuthorSlug(member.name) : null);
  if (authorSlug) {
    return `/author/${authorSlug}`;
  }
  return `/team/${member.slug}`;
}
