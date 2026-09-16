"use client"; // <--- This line fixes the error


import Image from 'next/image';
import AwardCard from '../cards/AwardCard';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, useGSAP);


const awardsData = [
  {
    number: "01",
    
    awardName: "TechBehemoths 2025 Award Winner (UAE)",
    imagePath: "/images/techbehemoths.png"
  },
  {
    number: "02",
    
    awardName: "Top Digital Marketing Company",
    imagePath: "/images/digitalmarketing.png"
  },
  {
    number: "03",
   
    awardName: "Top Web Development Company",
    imagePath: "/images/webdevelopment.png"
  },
  {
    number: "04",

    awardName: "Top Technical SEO Company",
    imagePath: "/images/technicalseo.png"
  },
  {
    number: "05",
   
    awardName: "Top Agency of the Year",
    imagePath: "/images/topagency.png"
  }
];
// --- Sub-component for Award Cards ---


const pageData = {
  services: {
    heading: 'Services Designed to Drive Growth',
    description: 'End-to-end solutions built to help brands grow, connect, and perform across every touchpoint.',
    columns: [
      { number: '01', title: 'Performance Marketing', items: ['Affiliate Channels', 'Cost Per Action', 'ROI Model'] },
      { number: '02', title: 'Social & Content', items: ['Content Strategy', 'Leverage Influencers', 'Paid Social'] },
      { number: '03', title: 'Web & Digital Experience', items: ['UX/UI', 'Front & Back End', 'API Integration'] },
      { number: '04', title: 'Branding & Creative', items: ['Affiliate Channels', 'Cost Per Action', 'ROI Model'] },
      { number: '05', title: 'Public Relations & Activations', items: ['Strategic PR', 'Press Releases', 'Events and Activation'] },
      { number: '06', title: 'Strategy & Consulting', items: ['Industry and Competitor Analysis Tailor-made Growth Strategies Targeted Ads and Email Campaigns', 'Tailor-made Growth Strategies', 'Targeted Ads and Email Campaigns'] },
    ],
  },
  clients: {
    heading: 'Brands We Work With',
    logos: [
      { name: 'OSN', url: 'https://logo.clearbit.com/osn.com' },
      { name: 'Daikin', url: 'https://logo.clearbit.com/daikin.com' },
      { name: 'Braun', url: 'https://logo.clearbit.com/braun.com' },
      { name: 'Toshiba', url: 'https://logo.clearbit.com/toshiba.com' },
      { name: 'Midea', url: 'https://logo.clearbit.com/midea.com' },
      { name: 'Khaleej Times', url: 'https://logo.clearbit.com/khaleejtimes.com' },
      { name: 'Redington', url: 'https://logo.clearbit.com/redingtongroup.com' },
      { name: 'Godiva', url: 'https://logo.clearbit.com/godiva.com' },
      { name: 'Hasbro', url: 'https://logo.clearbit.com/hasbro.com' },
      { name: 'NBK', url: 'https://logo.clearbit.com/nbk.com' },
    ],
  },
  awards: {
    heading: 'Recognized for Excellence',
    list: [
      { number: '01', title: 'TechBehemoths 2025 Award Winner (UAE)', awardName: 'AWARDS', iconColor: 'bg-black' },
      { number: '02', title: 'Top Digital Marketing Company', awardName: 'Clutch' },
      { number: '03', title: 'Top Web Development Company', awardName: 'Clutch' },
      { number: '04', title: 'Top Technical SEO Company', awardName: 'Clutch' },
      { number: '05', title: 'Top Agency of the Year', awardName: '2023', iconColor: 'bg-white' },
    ],
    partners: [
      { name: 'sortlist', color: 'bg-blue-600', text: 'Trusted Partner' },
      { name: 'Digital Agency Network', color: 'bg-white', text: 'VERIFIED AGENCY', textColor: 'text-black' },
      { name: 'Agency Partner', color: 'bg-indigo-700', text: 'Certified Partner' },
    ],
  },
};

export default function Recognized() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".award-card-item", {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotationX: 15,
      stagger: 0.12,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".award-card-grid",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative text-white py-20 w-full flex flex-col items-start justify-start md:items-center md:justify-center">
      <Image
        src="/images/aboutus/RecognizedBg.png"
        alt="Background"
        fill
        priority
        className="object-cover z-0"
        sizes="100vw"
      />
      
      <div className="relative z-10 max-w-[1350px] 2xl:max-w-[1600px] px-8 md:px-16 w-full">
        {/* Header Section */}
        <div className="mb-20">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1 mb-5">
              <span className="text-[10px] text-[#FAC02E] font-bold tracking-[0.2em] uppercase opacity-90">
                Awards & Recognition
              </span>
              <div className="w-12 h-[0.6px] bg-[#FAC02E] translate-y-[3px]" />
            </div>
            <h2 className="text-4xl md:text-7xl min-[1300px]:text-7xl font-heading font-medium leading-[1.05] -tracking-wide max-w-2xl">
              Recognized for <br/> Excellence
            </h2>
          </div>
        </div>

        {/* --- AWARDS GRID FIX --- */}
        {/* Added 'content-start' and 'items-stretch' to ensure rows never collapse 
            into each other during browser zoom calculations. */}
        <div className="award-card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 md:gap-6 items-stretch content-start px-10 md:px-0 lg:px-0">
          {awardsData.map((award, index) => (
            <div key={index} className="award-card-item flex h-full min-h-[200px]">
              <AwardCard 
                awardName={award.awardName}
                imagePath={award.imagePath} 
              />
            </div>
          ))}
        </div>

        {/* --- PROUD PARTNERSHIPS FIX --- */}
        <div className="mt-24 flex flex-col gap-8 items-start">
          <span className="text-sm font-light opacity-90 text-white font-sans uppercase">
            Proud Partnerships
          </span>

          {/* Changed gap to gap-y-12 for better vertical spacing when 
              wrapped during high zoom levels. */}
          <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 md:gap-y-12 lg:gap-y-12">
            
            {/* Sortlist */}
            <div className="relative w-48 h-20 shrink-0">
              <Image 
                src="/images/sortlist.png" 
                alt="Sortlist"
                fill
                sizes="(max-width: 768px) 192px, 192px"
                className="object-contain"
              />
            </div>

            {/* Digital Agency Network */}
            <div className="relative w-32 h-24 shrink-0">
              <Image 
                src="/images/digitalagencynetwork.png" 
                alt="Digital Agency Network"
                fill
                sizes="(max-width: 768px) 128px, 128px"
                className="object-contain"
              />
            </div>

            {/* Semrush */}
            <div className="relative w-22 h-16 shrink-0">
              <Image 
                src="/images/semrush.png" 
                alt="Semrush"
                fill
                sizes="(max-width: 768px) 88px, 88px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}