import { getPostsByAuthor, getResolvedAuthor, getWordPressTeamMembers } from "@/lib/getPosts";
import { Metadata } from "next";
import AuthorPageClient from "@/components/author/AuthorPageClient";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const posts = await getPostsByAuthor(slug);
  let name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  if (posts.length > 0) {
    const authorData = await getResolvedAuthor(posts[0]);
    name = authorData.name;
  } else {
    const team = await getWordPressTeamMembers();
    const matchingMember = team.find((m: any) => m.slug === slug);
    if (matchingMember) {
      name = matchingMember.name;
    }
  }

  return buildMetadata({
    title: `${name} - Author at Adapts Media`,
    description: `Read articles and insights published by ${name} on Adapts Media's blog.`,
    path: `/author/${slug}`,
  });
}

export default async function AuthorBlogsPage({ params }: Props) {
  const { slug } = await params;
  
  const posts = await getPostsByAuthor(slug);
  
  let authorData = null;
  if (posts.length > 0) {
    authorData = await getResolvedAuthor(posts[0]);
  } else {
    const team = await getWordPressTeamMembers();
    const matchingMember = team.find((m: any) => m.slug === slug);
    if (matchingMember) {
      authorData = {
        name: matchingMember.name,
        slug: matchingMember.slug,
        description: matchingMember.aboutLong || matchingMember.bio,
        avatar: matchingMember.image,
        role: matchingMember.role,
        linkedin: matchingMember.socials?.linkedin || "https://linkedin.com/company/adaptsmedia",
        email: matchingMember.socials?.email || "info@adaptsmedia.com",
      };
    } else {
      const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      authorData = {
        name,
        slug,
        description: "Digital Marketing Specialist and author at Adapts Media.",
        avatar: "/images/team/shruti.jpg",
        role: "Author",
        linkedin: "https://linkedin.com/company/adaptsmedia",
        email: "info@adaptsmedia.com",
      };
    }
  }

  return <AuthorPageClient authorData={authorData} posts={posts} />;
}
