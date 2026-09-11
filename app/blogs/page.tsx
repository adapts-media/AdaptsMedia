import type { Metadata } from "next";
import { getWordPressPosts } from "@/lib/getPosts";
import BlogList from "@/components/blog/BlogList";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog | Adapts Media",
  description:
    "Insights, guides and strategy from Adapts Media on digital marketing, SEO, branding, and performance advertising.",
  path: "/blogs",
});

export default async function AllBlogsPage() {
  const posts = await getWordPressPosts(100);

  return (
    <main className="bg-[#004dc3] min-h-screen">
      <BlogList posts={posts} />
    </main>
  );
}