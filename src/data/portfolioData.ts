export interface Project {
  id: number;
  brand: string;
  displayName?: string;
  tagline: string;
  tags: string[];
  bgImage: string;
  cardImage?: string;
  logoSrc?: string;
  industry?: string;
  service?: string;
  objective?: string;
  /**
   * Slug of this project's full case study page at /case-studies/{slug},
   * if one exists. Only Hyundai Mobis has one written today — leave this
   * unset for the others rather than deriving a slug from `brand`/
   * `displayName`, which used to generate a link to a page that doesn't
   * exist (e.g. /case-studies/the-bliss, a 404).
   */
  detailSlug?: string;
}

export const allCaseStudies: Project[] = [
  {
    id: 1,
    brand: "HYUNDAI MOBIS",
    displayName: "Hyundai Mobis",
    tagline: "Driving Awareness for Genuine Parts",
    tags: ["Branding", "AI Generation", "Marketing"],
    bgImage: "/images/portfolio/Hyundai/butterfly_2 1.png",
    cardImage: "/images/portfolio/Hyundai/HyundaiPortfolioCardImg2.png",
    logoSrc: "/images/portfolio/Hyundai/Group.png",
    industry: "Automotive",
    service: "Web Development",
    objective: "Performance",
    detailSlug: "hyundai-mobis",
  },
  {
    id: 2,
    brand: "THE CAPHE VIETNAM",
    displayName: "The Caphe Vietnam",
    tagline: "Driving Organic Search Visibility & Traffic in the Specialty Coffee Sector",
    tags: ["Technical SEO", "Keyword Research", "Content Strategy", "Link Building", "Competitor Analysis"],
    bgImage: "/images/Case Studies/The Caphe Vietnam/TCV Hero (1).png",
    cardImage: "/images/Case Studies/The Caphe Vietnam/TCV Hero (1).png",
    logoSrc: "/images/Case Studies/The Caphe Vietnam/TCVwhitelogo.png",
    industry: "F&B",
    service: "SEO",
    objective: "Organic Growth",
    detailSlug: "the-caphe-vietnam",
  },
  {
    id: 10,
    brand: "IWYL",
    displayName: "I’ll Write You a Letter (IWYL)",
    tagline: "Capturing Bold Streetwear Culture Through Visual Design",
    tags: ["Visual Banner Design", "Creative Direction", "Digital Asset Production", "UI Visual Refresh"],
    bgImage: "/images/Case Studies/IWYL/IWYL Mask group (1).png",
    cardImage: "/images/Case Studies/IWYL/IWYL Mask group (1).png",
    logoSrc: "/images/Case Studies/IWYL/IWYL_Logowhitelogo.svg",
    industry: "Fashion / Streetwear",
    service: "Branding",
    objective: "Brand Alignment",
    detailSlug: "iwyl",
  },
  {
    id: 5,
    brand: "ETOILE LA BOUTIQUE",
    displayName: "Etoile La Boutique",
    tagline: "Redefining The Luxury Retail Landscape",
    tags: ["SEO", "Website Management", "Content Writing", "Backlink Building"],
    bgImage: "/images/Case Studies/Etoile la boutique/Etoile la boutique.png",
    cardImage: "/images/Case Studies/Etoile la boutique/Etoile la boutique.png",
    logoSrc: "/images/Case Studies/Etoile la boutique/etoilewhitelogo.svg",
    industry: "Retail / Fashion",
    service: "SEO",
    objective: "Organic Growth",
    detailSlug: "etoile-la-boutique",
  },
  {
    id: 6,
    brand: "MYACCOUNTANT",
    displayName: "myaccountant",
    tagline: "Building a High-Trust, Lead-Generating Digital Brand in Australia",
    tags: ["Technical SEO", "Paid Media", "Social Media", "Email Marketing"],
    bgImage: "/images/Case Studies/My accountant/My accountant.png",
    cardImage: "/images/Case Studies/My accountant/My accountant.png",
    logoSrc: "/images/Case Studies/My accountant/MyAccountant_Logo_09whitelogo.svg",
    industry: "Financial Services / SaaS",
    service: "SEO",
    objective: "Lead Generation",
    detailSlug: "myaccountant",
  },
  {
    id: 7,
    brand: "ALPHA NERO",
    displayName: "Alpha Nero",
    tagline: "Building a Digital Presence to Match Luxury Craftsmanship",
    tags: ["Luxury Fit-Out", "Website Redesign", "Strategic SEO", "Website Maintenance"],
    bgImage: "/images/Case Studies/Alpha Nero/Alpha Nero.png",
    cardImage: "/images/Case Studies/Alpha Nero/Alpha Nero.png",
    logoSrc: "/images/Case Studies/Alpha Nero/Alphanerowhitelogo.png",
    industry: "Luxury Fit-Out",
    service: "Web Development",
    objective: "Organic Growth",
    detailSlug: "alpha-nero",
  },
  {
    id: 8,
    brand: "DAIKIN",
    displayName: "Daikin",
    tagline: "Elevating Amazon E-Commerce Performance Through Visual A+ Content",
    tags: ["Amazon A+", "E-Commerce Copywriting", "Conversion Rate Optimization"],
    bgImage: "/images/Case Studies/Daikin/Daikin.png",
    cardImage: "/images/Case Studies/Daikin/Daikin.png",
    logoSrc: "/images/Case Studies/Daikin/Daikinwhitelogo.svg",
    industry: "Consumer Electronics / HVAC",
    service: "Branding",
    objective: "Performance",
    detailSlug: "daikin",
  },
  {
    id: 9,
    brand: "AANI",
    displayName: "Aani",
    tagline: "Driving Awareness & Adoption for UAE's Instant Payment Platform",
    tags: ["Instant Payments", "Paid Social & Video", "Programmatic & DOOH", "App Installs"],
    bgImage: "/images/Case Studies/Aani/Aani.png",
    cardImage: "/images/Case Studies/Aani/Aani.png",
    logoSrc: "/images/Case Studies/Aani/Aaniwhitelogo.png",
    industry: "Fintech / Digital Payments",
    service: "Paid Media",
    objective: "App Installs",
    detailSlug: "aani",
  },
];

