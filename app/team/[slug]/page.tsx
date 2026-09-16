import { notFound, redirect } from "next/navigation";
import { teamMembers } from "@/data/teamData";
import TeamMemberProfileClient from "@/components/team/TeamMemberProfileClient";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";
import SocialBar from "@/components/layout/SocialBar";
import { isAuthor, getAuthorSlug } from "@/lib/authors";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Authors do not have team profiles — exclude them from static generation
  return teamMembers
    .filter((member) => !isAuthor(member.slug))
    .map((member) => ({
      slug: member.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;

  // If author, no team profile exists
  const authorSlug = getAuthorSlug(resolvedParams.slug);
  if (authorSlug) {
    return {
      title: "Author Profile | Adapts Media",
      robots: { index: false, follow: false },
    };
  }

  const member = teamMembers.find((m) => m.slug === resolvedParams.slug);
  if (!member) {
    return {
      title: "Team Member Not Found | Adapts Media",
    };
  }

  return {
    title: `${member.name} - ${member.role} | Adapts Media`,
    description: member.bio,
    alternates: {
      canonical: `https://adaptsmedia.com/team/${member.slug}`,
    },
    openGraph: {
      title: `${member.name} - ${member.role} | Adapts Media`,
      description: member.bio,
      images: [
        {
          url: member.image,
          width: 800,
          height: 1000,
          alt: member.name,
        },
      ],
      type: "profile",
    },
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const resolvedParams = await params;

  // Authors do not have a team profile — redirect immediately to their author profile
  const authorSlug = getAuthorSlug(resolvedParams.slug);
  if (authorSlug) {
    redirect(`/author/${authorSlug}`);
  }

  const member = teamMembers.find((m) => m.slug === resolvedParams.slug);

  if (!member) {
    notFound();
  }

  return (
    <>
      <TeamMemberProfileClient member={member} />
      <div id="contact">
        <ContactCTA />
      </div>
      <Footer />
    </>
  );
}
