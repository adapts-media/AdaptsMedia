/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Safety net for the WordPress domain migration to cms.adaptsmedia.com:
      // WordPress writes media/attachment URLs (and inline <img> tags in
      // post content) once, at creation time, and never rewrites them when
      // the site URL changes later — so a lot of existing content still
      // has hardcoded adaptsmedia.com/wp-content/... URLs baked in, even
      // though WordPress itself now correctly lives at cms.adaptsmedia.com.
      // Today that's invisible because adaptsmedia.com still runs
      // WordPress directly. Once this app takes over adaptsmedia.com,
      // those stale URLs would 404 with nothing else running there — this
      // transparently proxies any /wp-content/* request that lands here
      // through to the real location instead. The durable fix is a
      // WordPress-side database search-and-replace (adaptsmedia.com ->
      // cms.adaptsmedia.com) — this is a safety net for whatever that
      // doesn't catch, not a replacement for it.
      {
        source: "/wp-content/:path*",
        destination: "https://cms.adaptsmedia.com/wp-content/:path*",
      },
    ];
  },
  async redirects() {
    return [
      // Redirect deleted/archived blog post to /blogs index
      {
        source: "/blogs/introducing-the-world-of-metaverse-what-should-you-know",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/introducing-the-world-of-metaverse-what-should-you-know/",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog/introducing-the-world-of-metaverse-what-should-you-know",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog/introducing-the-world-of-metaverse-what-should-you-know/",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/test",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/test/",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog/test",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog/test/",
        destination: "/blogs",
        permanent: true,
      },
      // Redirect legacy /article/* and /articles/* permalinks to /blogs
      {
        source: "/article",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/article/:path*",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/articles",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/articles/:path*",
        destination: "/blogs",
        permanent: true,
      },
      // Redirect WordPress blog category archives and category feeds to /blogs
      {
        source: "/blog/category/:path*",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/category/:path*",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/category/:path*",
        destination: "/blogs",
        permanent: true,
      },
      // WordPress's live permalinks are /blog/{slug}/ (singular) — this
      // Next.js app serves the same posts at /blogs/{slug} (plural). Once
      // this app replaces WordPress on adaptsmedia.com, every one of the
      // ~134 currently-indexed /blog/... URLs would 404 without this.
      {
        source: "/blog/:slug",
        destination: "/blogs/:slug",
        permanent: true,
      },
      {
        source: "/blog/:slug/",
        destination: "/blogs/:slug",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      // Redirect previous /search-engine-optimization route to /ai-search-optimization
      {
        source: "/search-engine-optimization",
        destination: "/ai-search-optimization",
        permanent: true,
      },
      {
        source: "/search-engine-optimization/",
        destination: "/ai-search-optimization",
        permanent: true,
      },
      // Old WordPress performance-marketing sub-service permalinks — all
      // consolidated onto the single /performance-marketing page.
      { source: "/sem-services", destination: "/performance-marketing", permanent: true },
      { source: "/sem-services/", destination: "/performance-marketing", permanent: true },
      { source: "/display-campaign-management", destination: "/performance-marketing", permanent: true },
      { source: "/display-campaign-management/", destination: "/performance-marketing", permanent: true },
      { source: "/ad-operations-for-publishers", destination: "/performance-marketing", permanent: true },
      { source: "/ad-operations-for-publishers/", destination: "/performance-marketing", permanent: true },
      { source: "/ad-operations-for-advertising-agencies", destination: "/performance-marketing", permanent: true },
      { source: "/ad-operations-for-advertising-agencies/", destination: "/performance-marketing", permanent: true },
      { source: "/media-planning-and-buying", destination: "/performance-marketing", permanent: true },
      { source: "/media-planning-and-buying/", destination: "/performance-marketing", permanent: true },
      { source: "/programmatic", destination: "/performance-marketing", permanent: true },
      { source: "/programmatic/", destination: "/performance-marketing", permanent: true },
      { source: "/programmatic/amazon-dsp", destination: "/performance-marketing", permanent: true },
      { source: "/programmatic/amazon-dsp/", destination: "/performance-marketing", permanent: true },
      { source: "/seo-services", destination: "/performance-marketing", permanent: true },
      { source: "/seo-services/", destination: "/performance-marketing", permanent: true },
      { source: "/data-analytics", destination: "/performance-marketing", permanent: true },
      { source: "/data-analytics/", destination: "/performance-marketing", permanent: true },
      { source: "/market-research", destination: "/performance-marketing", permanent: true },
      { source: "/market-research/", destination: "/performance-marketing", permanent: true },
      // Redirect /case-studies index to /portfolio (specific /case-studies/:slug pages remain active)
      {
        source: "/case-studies",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/case-studies/",
        destination: "/portfolio",
        permanent: true,
      },
      { source: "/client", destination: "/portfolio", permanent: true },
      { source: "/client/", destination: "/portfolio", permanent: true },
      // Redirect /clients/gree-uae to homepage
      { source: "/clients/gree-uae", destination: "/", permanent: true },
      { source: "/clients/gree-uae/", destination: "/", permanent: true },
      { source: "/clients/gree-uae/:path*", destination: "/", permanent: true },
      { source: "/client/gree-uae", destination: "/", permanent: true },
      { source: "/client/gree-uae/", destination: "/", permanent: true },
      // Redirect former team member profile to /team
      { source: "/team/piyush-maheshwari", destination: "/team", permanent: true },
      { source: "/team/piyush-maheshwari/", destination: "/team", permanent: true },
      { source: "/team/piyush-maheshwari/:path*", destination: "/team", permanent: true },
      // Redirect /contact-us alias to /contact
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us/",
        destination: "/contact",
        permanent: true,
      },
      { source: "/sms-campaign", destination: "/social-content", permanent: true },
      { source: "/sms-campaign/", destination: "/social-content", permanent: true },
      { source: "/e-mail-marketing-services", destination: "/social-content", permanent: true },
      { source: "/e-mail-marketing-services/", destination: "/social-content", permanent: true },
      { source: "/social-media-marketing", destination: "/social-content", permanent: true },
      { source: "/social-media-marketing/", destination: "/social-content", permanent: true },
      { source: "/social-media-marketing/:path*", destination: "/social-content", permanent: true },
      // /digital-marketing-agency-in-uae/ and any sub-path (abu-dhabi, dubai, sharjah, etc.)
      { source: "/digital-marketing-agency-in-uae", destination: "/", permanent: true },
      { source: "/digital-marketing-agency-in-uae/:path*", destination: "/", permanent: true },
      // Redirect /creative-designing to /branding-creative
      { source: "/creative-designing", destination: "/branding-creative", permanent: true },
      { source: "/creative-designing/", destination: "/branding-creative", permanent: true },
      { source: "/creative-designing/:path*", destination: "/branding-creative", permanent: true },
      // Redirect /web-development to /web-digital-experience
      { source: "/web-development", destination: "/web-digital-experience", permanent: true },
      { source: "/web-development/", destination: "/web-digital-experience", permanent: true },
      { source: "/web-development/:path*", destination: "/web-digital-experience", permanent: true },
      // Redirect Cloudflare email-protection URLs to homepage
      { source: "/cdn-cgi/l/email-protection", destination: "/", permanent: true },
      { source: "/cdn-cgi/l/email-protection/", destination: "/", permanent: true },
      { source: "/cdn-cgi/l/email-protection/:path*", destination: "/", permanent: true },
      // Redirect /gsc to homepage
      { source: "/gsc", destination: "/", permanent: true },
      { source: "/gsc/", destination: "/", permanent: true },
      { source: "/gsc/:path*", destination: "/", permanent: true },
      // Redirect /embed, /feed, and /index.php to homepage
      { source: "/embed", destination: "/", permanent: true },
      { source: "/embed/", destination: "/", permanent: true },
      { source: "/embed/:path*", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/feed/", destination: "/", permanent: true },
      { source: "/feed/:path*", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index.php/", destination: "/", permanent: true },
      { source: "/index.php/:path*", destination: "/", permanent: true },
      // Redirect literal "/*" crawled by search engines to homepage
      { source: "/\\*", destination: "/", permanent: true },
      { source: "/\\*/", destination: "/", permanent: true },
      { source: "/\\*/:path*", destination: "/", permanent: true },
      // Redirect WordPress admin and plugin paths to homepage
      { source: "/wp-admin", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-content/plugins", destination: "/", permanent: true },
      { source: "/wp-content/plugins/:path*", destination: "/", permanent: true },
    ];
  },
  images: {
    // Restored — this Vercel project's Image Optimization quota is
    // exhausted (every /_next/image request 402s with
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED), which was breaking
    // images across the live site. Removing this again requires either
    // upgrading the Vercel plan/enabling pay-as-you-go for Image
    // Optimization, or waiting for the usage window to reset — see the
    // conversation for the plan-vs-cost tradeoff; don't just flip this
    // back without addressing that first.
    unoptimized: true,
    qualities: [70, 75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.adaptsmedia.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'cms.adaptsmedia.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'adaptsmedia.info',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'adaptsmedia.com', 
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'adaptsmedia.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.adaptsmedia.com', 
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**.adaptsmedia.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;