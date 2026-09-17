import { notFound, redirect } from "next/navigation";
import { teamMembers as fallbackTeamMembers } from "@/data/teamData";
import { getWordPressTeamMembers, getWordPressTeamMemberBySlug } from "@/lib/getPosts";
import PersonProfileClient from "@/components/profile/PersonProfileClient";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";
import { isAuthor, getAuthorSlug, getMemberProfileUrl } from "@/lib/authors";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Authors do not have team profiles — exclude them from static generation
  return fallbackTeamMembers
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

  const member = (await getWordPressTeamMemberBySlug(resolvedParams.slug)) ||
    fallbackTeamMembers.find((m) => m.slug === resolvedParams.slug);

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

  const allMembers = await getWordPressTeamMembers();
  const member = allMembers.find((m: any) => m.slug === resolvedParams.slug) ||
    fallbackTeamMembers.find((m) => m.slug === resolvedParams.slug);

  if (!member) {
    notFound();
  }

  const otherPeople = allMembers
    .filter((m: any) => m.slug !== member.slug)
    .map((m: any) => ({
      slug: m.slug,
      name: m.name,
      image: m.image,
      href: getMemberProfileUrl(m),
    }));

  return (
    <>
      <PersonProfileClient
        kicker="Team Member"
        person={{
          name: member.name,
          slug: member.slug,
          role: member.role,
          image: member.image,
          bio: member.bio,
          aboutLong: member.aboutLong,
          location: member.location,
          badges: member.badges,
          expertise: member.expertise,
          email: member.socials?.email,
          linkedin: member.socials?.linkedin,
        }}
        otherPeople={otherPeople}
      />
      <div id="contact">
        <ContactCTA />
      </div>
      <Footer />
    </>
  );
}

