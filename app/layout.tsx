import type { Metadata } from "next";
import { Roboto, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ScrollArrow from "@/components/layout/ScrollArrow";
import CookieConsent from "@/components/layout/CookieConsent";

import SmoothScroll from "@/components/providers/SmoothScroll";
import Script from "next/script";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

import localFont from "next/font/local";

const openSans = localFont({
  src: [
    {
      path: "../public/fonts/OpenSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  preload: true,
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// Site-wide defaults only — this used to fetch the *homepage's* Yoast SEO
// data unconditionally and apply it to every route that didn't define its
// own metadata (about-us, services, portfolio, etc. all inherited the
// homepage's title/description with no canonical, which is a duplicate
// content problem). The homepage now sets its own metadata in app/page.tsx,
// and every other page sets its own via src/lib/seo.ts's buildMetadata() —
// this is purely the last-resort fallback for anything that somehow
// doesn't, plus the values (metadataBase, default OG image) every page
// inherits unless it overrides them.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Adapts Media | AI-Powered Marketing Agency and Solutions",
    template: `%s`,
  },
  description: "Expert digital marketing solutions in Dubai and globally.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  verification: {
    google: "f2Dv_CyeV7dVoWumnbyKkd6cu5x7NfL_HHLakbyQYxs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${roboto.variable} ${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body>
        {/* Google Tag Manager (noscript) — per Google's install instructions,
            placed immediately after the opening <body> tag so GTM (and tags
            wired through it) still fire for users with JavaScript disabled. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WQDF4T6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <SmoothScroll>
          <Navbar />
          <main style={{ paddingTop: '0px' }}>
            {children}
          </main>
          <ScrollArrow />
          <CookieConsent />
        </SmoothScroll>
        {/* Google Tag Manager - Loads only after the page is interactive */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WQDF4T6');`}
        </Script>

        {/*
          Google tag (gtag.js) — Universal Analytics (UA-126226610-1) and
          Google Ads conversion tracking (AW-823750854). Loaded once and
          configured for both IDs on the shared dataLayer/gtag, rather than
          loading gtag.js twice (once per ID) — same tracking outcome,
          Google's own recommended pattern when running multiple gtag
          products on one page.
        */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-823750854"
          strategy="afterInteractive"
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-126226610-1');
          gtag('config', 'AW-823750854');`}
        </Script>
      </body>
    </html>
  );
}

