import type { Metadata } from "next";
import { getPrivacyPolicy } from "@/lib/getPrivacyPolicy";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import PrivacyHero from "@/components/privacy/PrivacyHero";
import PrivacyContent from "@/components/privacy/PrivacyContent";
import Footer from "@/components/layout/Footer";

export const revalidate = 60; // Revalidate every 60 seconds (1 minute) for fresh WordPress updates

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Adapts Media",
  description:
    "Read the official Privacy Policy of Adapts Media. Learn how we collect, handle, protect, and process your personal information across our global digital marketing services.",
  path: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  const policy = await getPrivacyPolicy();

  // Structured Data Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/privacy-policy/#webpage`,
        "url": `${SITE_URL}/privacy-policy`,
        "name": "Privacy Policy | Adapts Media",
        "isPartOf": {
          "@id": `${SITE_URL}/#website`,
        },
        "datePublished": "2021-08-19T07:03:44+00:00",
        "dateModified": policy.modified,
        "description":
          "Official Privacy Policy of Adapts Media outlining our information practices, security measures, and user rights.",
        "breadcrumb": {
          "@id": `${SITE_URL}/privacy-policy/#breadcrumb`,
        },
        "inLanguage": "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/privacy-policy/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_URL,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Privacy Policy",
            "item": `${SITE_URL}/privacy-policy`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#F8FAFC]">
        {/* Hero Section */}
        <PrivacyHero />

        {/* Centered Privacy Policy Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <PrivacyContent contentHtml={policy.contentHtml} />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
