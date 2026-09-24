import type { Metadata } from "next";
import { getTermsConditions } from "@/lib/getTermsConditions";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import TermsHero from "@/components/terms/TermsHero";
import TermsContent from "@/components/terms/TermsContent";
import Footer from "@/components/layout/Footer";

export const revalidate = 60; // Revalidate every 60 seconds (1 minute) for fresh WordPress updates

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions | Adapts Media",
  description:
    "Read the official Terms and Conditions of Adapts Media. Understand the rules, rights, and responsibilities governing your use of our digital marketing services and website.",
  path: "/terms-and-conditions",
  noindex: true,
});

export default async function TermsAndConditionsPage() {
  const terms = await getTermsConditions();

  // Structured Data Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/terms-and-conditions/#webpage`,
        "url": `${SITE_URL}/terms-and-conditions`,
        "name": "Terms and Conditions | Adapts Media",
        "isPartOf": {
          "@id": `${SITE_URL}/#website`,
        },
        "datePublished": "2021-08-19T07:03:44+00:00",
        "dateModified": terms.modified,
        "description":
          "Official Terms and Conditions of Adapts Media outlining website usage, intellectual property, liability, and governing law.",
        "breadcrumb": {
          "@id": `${SITE_URL}/terms-and-conditions/#breadcrumb`,
        },
        "inLanguage": "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/terms-and-conditions/#breadcrumb`,
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
            "name": "Terms and Conditions",
            "item": `${SITE_URL}/terms-and-conditions`,
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
        <TermsHero />

        {/* Centered Terms and Conditions Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <TermsContent contentHtml={terms.contentHtml} />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
