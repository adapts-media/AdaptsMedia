import Footer from "@/components/layout/Footer";
import ClientsSection from "@/components/homepage/ClientsSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import InsightsSection from "@/components/homepage/InsightsSection";
import LocationSection from "@/components/homepage/LocationSection";
import PortfolioShowcase from "@/components/homepage/PortfolioShowcase";
import RecreateDesign from "@/components/homepage/RecognizedSection";
import ServicesSection from "@/components/homepage/ServicesSection";
import HeroVideo from "@/components/videos/HeroVideo";
import OrangeSection from "@/components/videos/OrangeSection";
import SocialBar from "@/components/layout/SocialBar";
import { Metadata } from "next";
import { cache } from "react";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ParallaxSection from "@/components/homepage/ParallaxSection";
import HeroSection from "@/components/homepage/HeroSection";
import { buildMetadata } from "@/lib/seo";

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://cms.adaptsmedia.com";

// cache() memoizes this per request, so generateMetadata() and the page
// body below share a single fetch instead of hitting WordPress twice for
// the same data (the previous version issued two near-identical requests
// that Next couldn't dedupe, since each passed its own AbortSignal.timeout()
// instance — a different object each call, which breaks fetch memoization).
const getHomepageYoast = cache(async () => {
  try {
    const res = await fetch(`${WORDPRESS_URL}/wp-json/yoast/v1/get_head?url=${WORDPRESS_URL}/`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      return data?.json ?? null;
    }
  } catch (err) {
    console.error("Failed to fetch homepage Yoast data:", err);
  }
  return null;
});

export async function generateMetadata(): Promise<Metadata> {
  const yoast = await getHomepageYoast();

  return buildMetadata({
    title: yoast?.title || "Adapts Media | AI-Powered Digital Marketing Agency in Dubai",
    // Hardcoded rather than sourced from Yoast — WordPress's current value
    // is close but not this exact wording, and the live site was actually
    // showing the fallback string below anyway (the Yoast fetch here has
    // a 4s timeout against a Cloudflare-fronted origin; a static
    // regeneration pass that missed that window bakes the fallback in
    // until the next one, same class of staleness as the /wp-admin
    // reliability issues on that WP install). Fixing it here guarantees
    // this exact copy regardless of WordPress's state.
    description: "Adapts Media provides full-service marketing solutions, including SEO, paid media, programmatic and web development for brands across the UAE, UK, US, and Asia.",
    path: "/",
    image: yoast?.og_image?.[0]?.url,
  });
}

export default async function Home() {
  const yoast = await getHomepageYoast();
  const schema = yoast?.schema ?? null;

  return (
    <>
      {/* Homepage specific Schema (Organization, WebSite, etc.) */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <main>

        <HeroVideo/>
        {/* <HeroSection /> */}
        {/* <ParallaxSection /> */}

        <OrangeSection />
        
        <ServicesSection />

        <PortfolioShowcase/>

        <ClientsSection />

        <RecreateDesign />

        <InsightsSection />

        <ContactCTA />

        <LocationSection />

        <Footer />
      </main>
    </>
  );
}
