import { privacyPolicyFallback } from "@/data/privacyPolicyFallback";

const WORDPRESS_URL =
  process.env.WORDPRESS_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://cms.adaptsmedia.com";

export interface TOCSection {
  id: string;
  title: string;
  number: string;
}

export interface PrivacyPolicyData {
  id: number;
  title: string;
  modified: string;
  formattedDate: string;
  readingTime: string;
  contentHtml: string;
  toc: TOCSection[];
  yoast?: any;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

/**
 * Dynamically parses whatever office addresses exist in the WordPress content
 * and renders them into clean, well-formatted cards.
 */
function parseAndFormatOffices(html: string): string {
  const colIdx = html.indexOf("wp-block-columns");
  if (colIdx === -1) return html;

  const colsHtml = html.slice(colIdx);
  const beforeCols = html.slice(0, colIdx);

  // Split by WordPress column block
  const cols = colsHtml
    .split(/<div[^>]*class=["'][^"']*wp-block-column[^"']*["']/gi)
    .slice(1);

  const rawOffices: Array<{ title: string; body: string }> = [];

  for (const col of cols) {
    const h3Matches = [...col.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)];
    const pMatches = [...col.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];

    if (h3Matches.length === 1 && pMatches.length === 1) {
      rawOffices.push({
        title: h3Matches[0][1].replace(/<[^>]+>/g, "").trim(),
        body: pMatches[0][1],
      });
    } else if (h3Matches.length > 1) {
      for (let i = 0; i < h3Matches.length; i++) {
        rawOffices.push({
          title: h3Matches[i][1].replace(/<[^>]+>/g, "").trim(),
          body: pMatches[i] ? pMatches[i][1] : "",
        });
      }
    } else if (pMatches.length > 1) {
      for (const p of pMatches) {
        const strongMatch = p[1].match(/<strong>(.*?):?\s*<\/strong>/i);
        const subTitle = strongMatch
          ? strongMatch[1].replace(/[:]/g, "").trim()
          : h3Matches[0]?.[1]?.replace(/<[^>]+>/g, "").trim() || "India";
        rawOffices.push({
          title: subTitle.toLowerCase().includes("india")
            ? subTitle
            : `India - ${subTitle}`,
          body: p[1],
        });
      }
    }
  }

  // If no columns could be parsed, return original HTML
  if (rawOffices.length === 0) return html;

  const cardsHtml = rawOffices
    .map((office, idx) => {
      const cleanTitle = office.title
        .replace(/\s*Address\s*/i, "")
        .replace(/&nbsp;/g, " ")
        .trim();

      // Extract Email
      const emailMatch = office.body.match(
        /<a[^>]*href=["'](mailto:[^"']+)["'][^>]*>([\s\S]*?)<\/a>/i
      );
      const email = emailMatch
        ? {
            href: emailMatch[1],
            text: emailMatch[2].replace(/<[^>]+>/g, "").trim(),
          }
        : null;

      // Extract Phone Numbers
      const telMatches = [
        ...office.body.matchAll(
          /<a[^>]*href=["'](tel:[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
        ),
      ];
      const phones = telMatches.map((m) => ({
        href: m[1],
        text: m[2]
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .trim(),
      }));

      // Extract Address lines (strip out email / phone lines)
      let addressText = office.body
        .replace(/<strong>(.*?):?\s*<\/strong>/i, "")
        .split(/<br\s*\/?>/i)[0]
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();

      // Determine appropriate badge
      let badge = "Global";
      const titleLower = cleanTitle.toLowerCase();
      if (titleLower.includes("dubai") || titleLower.includes("uae")) badge = "HQ";
      else if (titleLower.includes("india") || titleLower.includes("gurugram") || titleLower.includes("bilaspur")) badge = "India";
      else if (titleLower.includes("london") || titleLower.includes("uk")) badge = "UK";
      else if (titleLower.includes("united states") || titleLower.includes("dallas") || titleLower.includes("usa")) badge = "USA";
      else if (titleLower.includes("philippines")) badge = "Philippines";
      else if (titleLower.includes("indonesia") || titleLower.includes("jakarta")) badge = "Indonesia";

      const isLast = idx === rawOffices.length - 1;
      const colSpan = isLast && rawOffices.length % 2 !== 0 ? "md:col-span-2 lg:col-span-1" : "";

      return `
      <div class="privacy-office-card bg-slate-50/70 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between ${colSpan}">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-200/80">
            <h4 class="text-base font-bold text-[#07476B] m-0 tracking-tight">${cleanTitle}</h4>
            <span class="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
              badge === "HQ"
                ? "bg-blue-100/90 text-blue-700"
                : "bg-slate-200/70 text-slate-700"
            }">${badge}</span>
          </div>
          <p class="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed mb-4">
            ${addressText}
          </p>
        </div>

        <div class="space-y-2 pt-3 border-t border-slate-200/70 text-xs sm:text-[13px]">
          ${
            email
              ? `
          <div class="flex items-center gap-2 text-slate-700">
            <span class="text-slate-400 font-medium w-16 shrink-0">Email:</span>
            <a href="${email.href}" class="text-blue-600 hover:underline font-medium truncate">${email.text}</a>
          </div>`
              : ""
          }
          ${phones
            .map(
              (p, pIdx) => `
          <div class="flex items-center gap-2 text-slate-700">
            <span class="text-slate-400 font-medium w-16 shrink-0">${
              pIdx === 0 && phones.length > 1 ? "Mobile:" : pIdx === 1 ? "Landline:" : "Phone:"
            }</span>
            <a href="${p.href}" class="text-slate-800 hover:text-blue-600 font-medium">${p.text}</a>
          </div>`
            )
            .join("")}
        </div>
      </div>
      `;
    })
    .join("");

  return `${beforeCols}
    <div class="privacy-offices-grid grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 my-6 not-prose">
      ${cardsHtml}
    </div>
  `;
}

export async function getPrivacyPolicy(): Promise<PrivacyPolicyData> {
  let raw = privacyPolicyFallback;

  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=privacy-policy`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds (1 minute) for near real-time updates
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
    console.warn("Falling back to local Privacy Policy snapshot:", (error as Error).message);
  }

  // Parse and process HTML content
  const toc: TOCSection[] = [];
  let sectionIndex = 1;

  // Remove redundant first paragraph if it's "Last Updated"
  let cleanHtml = raw.content.replace(
    /<p class="wp-block-paragraph">\s*<strong>Last Updated:<\/strong>[\s\S]*?<\/p>/i,
    ""
  );

  // Inject IDs into <h2> headings for Table of Contents anchors
  cleanHtml = cleanHtml.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (match, inner) => {
    const plainText = inner
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .trim();

    const id = slugify(plainText);
    const numStr = sectionIndex < 10 ? `0${sectionIndex}` : `${sectionIndex}`;
    toc.push({
      id,
      title: plainText,
      number: numStr,
    });
    sectionIndex++;

    return `<h2 id="${id}" class="privacy-section-heading scroll-mt-32">${inner}</h2>`;
  });

  // Dynamically parse and format whatever addresses WordPress serves
  cleanHtml = parseAndFormatOffices(cleanHtml);

  // Calculate reading time (~200 words per minute)
  const plainText = cleanHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const wordCount = plainText.trim().split(" ").length;
  const minutes = Math.max(3, Math.ceil(wordCount / 200));
  const readingTime = `${minutes} min read`;

  return {
    id: raw.id,
    title: raw.title || "Adapts Media Privacy Policy",
    modified: raw.modified,
    formattedDate: formatModifiedDate(raw.modified),
    readingTime: raw.yoast?.twitter_misc?.["Est. reading time"] || readingTime,
    contentHtml: cleanHtml,
    toc,
    yoast: raw.yoast,
  };
}
