/** @type {import('next').NextConfig} */
const nextConfig = {
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
        destination: "/search-engine-optimization",
        permanent: true,
      },
      {
        source: "/seo-services/",
        destination: "/search-engine-optimization",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [70, 75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'adaptsmedia.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
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