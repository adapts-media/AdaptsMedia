"use client"; // <--- This line fixes the error


import Image from 'next/image';
import ApproachCard from '../cards/ApproachCard';


const approachSteps = [
  {
    title: "Discover",
    description: "We dive deep into your brand, market, and audience.",
    icon: '/images/services/discover.png'
  },
  {
    title: "Define",
    description: "We build a clear, actionable strategy aligned to your goals.",
    icon: '/images/services/definenew.png'
  },
  {
    title: "Create",
    description: "We craft ideas, content, and experiences that connect.",
    icon: '/images/services/create.png'
  },
  {
    title: "Deploy",
    description: "We execute across the right platforms with precision.",
    icon: '/images/services/deploy.png'
  },
  {
    title: "Optimize",
    description: "We measure, learn, and continuously improve performance.",
    icon: '/images/services/optimize.png'
  }
];
// --- Sub-component for Award Cards ---

export default function PerformSection() {
  return (
    <section className="relative min-h-screen text-white bg-black py-20 w-full flex flex-col items-start justify-start md:items-center md:justify-center">
       <Image
              src="/images/Maskgroup.png" 
              alt="Decorative Element"
              fill
              sizes="100vw"
              quality={80}
              className="absolute z-10 pointer-events-none object-cover" 
            />
      
      <div className="relative z-10 max-w-[1350px] 2xl:max-w-[1600px] px-8 md:px-16 w-full">
        {/* Header Section */}
        <div className="flex flex-col min-[1300px]:flex-row min-[1300px]:items-end min-[1300px]:justify-between gap-12 mb-20">
          <div className="flex flex-col items-start">

            <h2 className="text-4xl md:text-7xl min-[1300px]:text-7xl font-medium leading-[1.05] -tracking-wide max-w-2xl">
              Built to Perform, <br/> Designed to Scale.
            </h2>
          </div>
        </div>

        {/* --- AWARDS GRID FIX --- */}
        {/* Added 'content-start' and 'items-stretch' to ensure rows never collapse 
            into each other during browser zoom calculations. */}
        <div className="px-10 md:px-0 lg:px-0">
  <ApproachCard steps={approachSteps} />
</div>

       
      </div>
    </section>
  );
}