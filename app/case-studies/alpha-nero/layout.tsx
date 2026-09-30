import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Alpha Nero Case Study | Adapts Media",
  description:
    "Implementing a full website rebuild and SEO program that took Alpha Nero from almost no digital footprint to a growing base of engaged, organic traffic.",
  path: "/case-studies/alpha-nero",
  image: "/images/Case Studies/Alpha Nero/Alpha Nero.png",
  type: "article",
});

export default function AlphaNeroCaseStudyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
