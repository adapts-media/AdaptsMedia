import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "myaccountant Case Study | Adapts Media",
  description:
    "A phased digital growth partnership combining technical SEO, content, social media, email & performance marketing to create a scalable acquisition engine in Australia.",
  path: "/case-studies/myaccountant",
  image: "/images/Case Studies/My accountant/My accountant.png",
  type: "article",
});

export default function MyAccountantCaseStudyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
