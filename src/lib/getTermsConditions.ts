import { termsConditionsFallback } from "@/data/termsConditionsFallback";

const WORDPRESS_URL =
  process.env.WORDPRESS_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://cms.adaptsmedia.com";

export interface TermsConditionsData {
  id: number;
  title: string;
  modified: string;
  formattedDate: string;
  readingTime: string;
  contentHtml: string;
  yoast?: any;
}

function formatModifiedDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "September 2026";
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "September 2026";
  }
}

export async function getTermsConditions(): Promise<TermsConditionsData> {
  let raw = termsConditionsFallback;

  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=terms-and-conditions`,
      {
        next: { revalidate: 60 }, // Revalidate every 60s for near real-time updates
        signal: AbortSignal.timeout(6000),
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0]?.content?.rendered) {
        raw = {
          id: data[0].id || raw.id,
          title: data[0].title?.rendered || raw.title,
          modified: data[0].modified || raw.modified,
          date: data[0].date || raw.date,
          slug: data[0].slug || raw.slug,
          content: data[0].content.rendered,
          yoast: data[0].yoast_head_json || raw.yoast,
        };
      }
    }
  } catch (error) {
    console.warn("Falling back to local Terms and Conditions snapshot:", (error as Error).message);
  }

  // Clean empty headings or empty paragraphs
  let cleanHtml = raw.content
    .replace(/<h[1-6][^>]*>(?:&nbsp;|\s)*<\/h[1-6]>/gi, "")
    .replace(/<p[^>]*>(?:&nbsp;|\s)*<\/p>/gi, "");

  // Calculate reading time (~200 words per minute)
  const plainText = cleanHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const wordCount = plainText.trim().split(" ").length;
  const minutes = Math.max(3, Math.ceil(wordCount / 200));
  const readingTime = `${minutes} min read`;

  return {
    id: raw.id,
    title: raw.title || "Terms And Conditions",
    modified: raw.modified,
    formattedDate: formatModifiedDate(raw.modified),
    readingTime: raw.yoast?.twitter_misc?.["Est. reading time"] || readingTime,
    contentHtml: cleanHtml,
    yoast: raw.yoast,
  };
}
