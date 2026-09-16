import Image from "next/image";
import ArrowButton from "../buttons/ArrowButton";
import Tailwind3DCard from "../cards/Tailwind3DCard";
import Link from "next/link";
import { allCaseStudies } from "@/data/portfolioData";

const PortfolioSection = () => {
  // Fetching real data from your WordPress backend via the helper function
//   const insights = await getWordPressPosts(10);
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden font-sans flex flex-col items-start justify-start md:items-center md:justify-center">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-600/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-900/30 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      
      <Image
        src="/images/Maskgroup.png" 
        alt="Decorative Element"
        fill
        sizes="100vw"
        quality={80}
        className="absolute z-10 pointer-events-none object-cover" 
      />

      {/* Removed 'mx-auto' and 'max-w-screen' to pin content to the left.
        Changed to w-full to allow scroll to span the width.
      */}
      <div className="relative z-20 max-w-[1350px] 2xl:max-w-[1600px] px-8 md:px-16 w-full">
        
        {/* Header Section: flex-col below 1300px to keep button left-aligned */}
        <div className="flex flex-col min-[1300px]:flex-row min-[1300px]:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-4">

            
          </div>

          <div className="flex justify-start">
  <Link href="/portfolio">
    <ArrowButton title="View Portfolio"/>
  </Link>
</div>
        </div>

        {/* --- HORIZONTAL SCROLLING GRID --- */}
        {/* Added '-mx-8' and 'px-8' on mobile/tablet range so the scroll 
            goes edge-to-edge but content aligns with the text.
        */}
        <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide px-8 min-[1300px]:mx-0 min-[1300px]:px-0">
          {allCaseStudies.map((project, index: number) => {
            // Only Hyundai Mobis has a real case study page today — link
            // the rest to the listing instead of a slug that 404s (this
            // used to derive a link from the brand name regardless of
            // whether a page existed for it).
            const href = project.detailSlug ? `/case-studies/${project.detailSlug}` : "/portfolio";

            return (
              <Link
                key={project.id}
                href={href}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] snap-start"
              >
                <Tailwind3DCard 
                  title={project.tagline} 
                  image={project.cardImage || project.bgImage} 
                  logo={project.logoSrc}
                  tags={project.tags}
                />
              </Link>
            );
          })}
        </div>
        {/* ---------------------------------- */}

      </div>
    </section>
  );
};

export default PortfolioSection;