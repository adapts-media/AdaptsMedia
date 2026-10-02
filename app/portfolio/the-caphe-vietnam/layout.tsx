import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "The Caphe Vietnam Case Study | Adapts Media",
  description:
    "Building search authority, cleaning technical indexation issues, and acquiring high-quality backlinks to boost organic traffic and conversions.",
  path: "/portfolio/the-caphe-vietnam",
  canonicalPath: "/case-studies/the-caphe-vietnam",
  image: "/images/Case Studies/The Caphe Vietnam/TCV Hero (1).png",
  type: "article",
});

export default function TheCapheVietnamPortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
