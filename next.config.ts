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
      // WordPress permalink for SEO services is /seo-services/ — map it to Next.js route
      {
        source: "/seo-services",
        destination: "/ai-search-optimization",
        permanent: true,
      },
      {
        source: "/seo-services/",
        destination: "/ai-search-optimization",
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