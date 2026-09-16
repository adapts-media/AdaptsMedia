import Image from "next/image";
import ArrowButton from "../buttons/ArrowButton";
import BlogCardWrapper from "../cards/BlogCardWrapper";
import { getWordPressPosts } from "@/lib/getPosts";
import Link from "next/link";

interface Insight {
  title: string;
  image: string;
  slug?: string;
  date?: string;
  categories?: string[];
  author?: string;
}

const InsightsSection = async () => {
  // Fetching real data from your WordPress backend via the helper function
  const insights = await getWordPressPosts(10);
  return (
    <>
      <section className="relative bg-black text-white py-20 overflow-hidden font-sans flex flex-col items-start justify-start md:items-center md:justify-center">
        {/* Background Radial Glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-600/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-900/30 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />

        <Image
          src="/images/Maskgroup.png"
          alt="Decorative Element"
          fill
          className="absolute z-10 pointer-events-none object-cover"
        />

        {/* Removed 'mx-auto' and 'max-w-screen' to pin content to the left.
        Changed to w-full to allow scroll to span the width.
      */}
        <div className="relative z-20 max-w-[1350px] 2xl:max-w-[1600px] px-8 md:px-16 w-full">

          {/* Header Section: flex-col below 1300px to keep button left-aligned */}
          <div className="flex flex-col min-[1300px]:flex-row min-[1300px]:items-end justify-between gap-8 mb-16">
            <div className="flex flex-col gap-4">

              <h2 className="text-3xl md:text-6xl min-[1300px]:text-7xl tracking-wide font-heading font-medium leading-[1.1] tracking-tight md:max-w-full lg:max-w-full">
                Ideas, Trends & <br className="hidden md:block" /> Industry Insights
              </h2>
            </div>

            <div className="flex justify-start">
              <Link href="/blogs">
                <ArrowButton title="Read More" />
              </Link>
            </div>
          </div>

          {/* --- HORIZONTAL SCROLLING GRID --- */}
          {insights.length === 0 ? (
            <div className="py-12 px-8 border border-dashed border-zinc-800 rounded-2xl text-center bg-zinc-950/20 max-w-lg">
              <p className="text-zinc-500 text-sm">No insights available at the moment.</p>
              {!process.env.NEXT_PUBLIC_WORDPRESS_URL && (
                <p className="text-zinc-700 text-xs mt-1">
                  Please set the <code className="text-zinc-500 font-mono">NEXT_PUBLIC_WORDPRESS_URL</code> environment variable.
                </p>
              )}
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide px-8 min-[1300px]:mx-0 min-[1300px]:px-0">
              {insights.map((item: Insight, index: number) => (
                <BlogCardWrapper
                  key={item.slug || index}
                  slug={item.slug || ""}
                  title={item.title}
                  image={item.image}
                  date={item.date}
                  category={item.categories?.[0]}
                />
              ))}
            </div>
          )}
          

        </div>
      </section>
    </>
  );
};

export default InsightsSection;