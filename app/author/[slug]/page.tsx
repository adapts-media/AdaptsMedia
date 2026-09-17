import { getPostsByAuthor, getResolvedAuthor, getWordPressTeamMembers, sanitizeCategoriesList } from "@/lib/getPosts";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import PersonProfileClient from "@/components/profile/PersonProfileClient";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/seo";
import { WORDPRESS_AUTHORS, getMemberProfileUrl } from "@/lib/authors";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return WORDPRESS_AUTHORS.map((author) => ({
    slug: author.authorSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "jailee-dela-cruz") {
    return buildMetadata({
      title: "Jailee Cruz - Author at Adapts Media",
      description: "Read articles and insights published by Jailee Cruz on Adapts Media's blog.",
      path: "/author/jailee-cruz",
    });
  }
  
  const posts = await getPostsByAuthor(slug);
  let name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  if (posts.length > 0) {
    const authorData = await getResolvedAuthor(posts[0]);
    name = authorData.name;
  } else {
    const team = await getWordPressTeamMembers();
    const matchingMember = team.find((m: any) => 
      m.slug === slug || 
      (slug === "jailee-cruz" && (m.slug === "jailee-dela-cruz" || m.name.toLowerCase().includes("jailee")))
    );
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

  if (slug === "jailee-dela-cruz") {
    redirect("/author/jailee-cruz");
  }
  
  const posts = await getPostsByAuthor(slug);
  
  // Collect all unique categories from all posts by this author from WordPress
  const wpPostCategories = sanitizeCategoriesList(
    posts.flatMap((p: any) => (Array.isArray(p.categories) ? p.categories : []))
  );

  let authorData = null;
  if (posts.length > 0) {
    authorData = await getResolvedAuthor(posts[0]);
    // Merge team expertise with all unique post categories from WordPress
    const mergedExpertise = sanitizeCategoriesList([
      ...(authorData.expertise || []),
      ...wpPostCategories,
    ]);
    authorData = {
      ...authorData,
      expertise: mergedExpertise.length > 0 ? mergedExpertise : ["Digital Marketing", "Strategy"],
    };
  } else {
    const team = await getWordPressTeamMembers();
    const matchingMember = team.find((m: any) => 
      m.slug === slug || 
      (slug === "jailee-cruz" && (m.slug === "jailee-dela-cruz" || m.name.toLowerCase().includes("jailee")))
    );
    if (matchingMember) {
      authorData = {
        name: matchingMember.name,
        slug: matchingMember.slug,
        description: matchingMember.aboutLong || matchingMember.bio,
        avatar: matchingMember.image,
        role: matchingMember.role,
        expertise: matchingMember.expertise && matchingMember.expertise.length > 0 ? matchingMember.expertise : (wpPostCategories.length > 0 ? wpPostCategories : ["Digital Marketing", "Strategy"]),
        linkedin: matchingMember.socials?.linkedin || "https://linkedin.com/company/adaptsmedia",
        email: matchingMember.socials?.email || "info@adaptsmedia.com",
      };
    } else {
      const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      authorData = {
        name,
        slug,
        description: "Digital Marketing Specialist and author at Adapts Media.",
        avatar: "/images/Team/AshishGupta.png",
        role: "Author",
        expertise: wpPostCategories.length > 0 ? wpPostCategories : ["Digital Marketing", "Strategy"],
        linkedin: "https://linkedin.com/company/adaptsmedia",
        email: "info@adaptsmedia.com",
      };
    }
  }

  // "More voices" — same team-directory nudge as /team/[slug], so the
  // author page's slug doesn't need its own separate "other authors" list.
  const team = await getWordPressTeamMembers();
  const otherPeople = team
    .filter((m: any) => m.slug !== authorData!.slug)
    .map((m: any) => ({
      slug: m.slug,
      name: m.name,
      image: m.image,
      href: getMemberProfileUrl(m),
    }));

  return (
    <>
      <PersonProfileClient
        kicker="Author"
        person={{
          name: authorData!.name,
          slug: authorData!.slug,
          role: authorData!.role,
          image: authorData!.avatar,
          bio: authorData!.description,
          aboutLong: authorData!.description,
          expertise: authorData!.expertise,
          email: authorData!.email,
          linkedin: authorData!.linkedin,
        }}
        posts={posts.map((p: any) => ({
          slug: p.slug,
          title: p.title,
          image: p.image,
          author: p.author,
          authorSlug: p.authorSlug || slug,
          date: p.date,
          categories: p.categories,
        }))}
        otherPeople={otherPeople}
      />
      <div id="contact">
        <ContactCTA />
      </div>
      <Footer />
    </>
  );
}

