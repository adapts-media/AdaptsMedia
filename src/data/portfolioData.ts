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
    tagline: "Brewing a Brand Experience That Stands Out",
    tags: ["Branding", "AI Execution", "Marketing"],
    bgImage: "/images/portfolio/TheCapheVietnam/image 30.png",
    logoSrc: "/images/portfolio/TheCapheVietnam/Layer_1.png",
    industry: "F&B",
    service: "Social Media",
    objective: "Branding",
  },
  {
    id: 3,
    brand: "THE BLISS",
    displayName: "The Bliss",
    tagline: "Turning Vision into Brand Reality",
    tags: ["Branding", "AI Execution", "Marketing"],
    bgImage: "/images/portfolio/TheBliss/Mask group.png",
    logoSrc: "/images/portfolio/TheBliss/thebliss@4x 1.png",
    industry: "Wellness",
    service: "UI/UX Design",
    objective: "Branding",
  },
  {
    id: 4,
    brand: "JAYWAN",
    displayName: "Jaywan",
    tagline: "UAE's Own National Payment",
    tags: ["Branding", "AI Execution", "Marketing"],
    bgImage: "/images/portfolio/Jaywan/Sustenance_KV_V2_07 1.png",
    logoSrc: "/images/portfolio/Jaywan/logo_2 1.png",
    industry: "Finance",
    service: "Branding",
    objective: "Marketing",
  },
];
