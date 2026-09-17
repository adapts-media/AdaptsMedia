import { Metadata } from 'next';
import { cache } from 'react';
import TeamSection from '@/components/aboutus/TeamSection';
import Footer from '@/components/layout/Footer';
import SocialBar from '@/components/layout/SocialBar';
import ContactCTA from '@/components/homepage/ContactCTA';
import { getWordPressTeamMembers } from '@/lib/getPosts';
import { buildMetadata } from '@/lib/seo';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://cms.adaptsmedia.com";

// Shared per-request cache — generateMetadata() and the page body both
// need this, and calling fetch() twice for the same URL from two places
// is wasted latency (see the equivalent fix in app/page.tsx).
const getTeamYoast = cache(async () => {
  try {
    const res = await fetch(`${WORDPRESS_URL}/wp-json/yoast/v1/get_head?url=${WORDPRESS_URL}/team/`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      return data?.json ?? null;
    }
  } catch (err) {
    console.error('Failed to fetch Yoast metadata for /team:', err);
  }
  return null;
});

export async function generateMetadata(): Promise<Metadata> {
  const yoast = await getTeamYoast();

  return buildMetadata({
    title: yoast?.title || 'Meet Our Expert Team - Driving Innovation Together | Adapts Media',
    description:
      yoast?.description ||
      'Explore the talented individuals behind Adapts Media. Our dedicated team brings passion, expertise, and creativity to every project.',
    // Next.js's default routing has no trailing slash on this route — the
    // previous canonical here (".../team/") pointed at a URL that
    // immediately redirects back to this one, which defeats the point.
    path: '/team',
    image: yoast?.og_image?.[0]?.url,
  });
}

export default async function TeamPage() {
  const teamMembers = await getWordPressTeamMembers();
  const yoast = await getTeamYoast();
  const schema = yoast?.schema ?? null;

  return (
    <main className="min-h-screen bg-[#00224D]">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <TeamSection
        members={teamMembers}
        title="The Minds Behind"
        className="pt-36 md:pt-44"
      />
      <ContactCTA />
      <Footer />
    </main>
  );
}