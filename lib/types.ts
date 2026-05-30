// ============================================
// Portfolio Data Types
// ============================================

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroData {
  badge: string;
  name: string;
  rotatingTitles: string[];
  tagline: string;
  stats: { value: string; label: string }[];
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
}

export interface AboutData {
  paragraphs: string[];
  highlightedQuote: string;
  currently: { emoji: string; text: string }[];
  tools: { name: string; color: string }[];
}

export interface Service {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  tags: string[];
  price: string;
}

export interface Project {
  id: string;
  status: string;
  statusColor: string;
  title: string;
  description: string;
  techStack: string[];
  category: "Websites" | "Content" | "Automation";
  link: { text: string; href: string };
  imageUrl?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  accent: string;
  accentLight: string;
  skills: string[];
}

export interface SocialCard {
  id: string;
  platform: string;
  icon: string;
  iconColor: string;
  handle: string;
  description: string;
  link: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorInitials: string;
  authorName: string;
  authorRole: string;
  note: string;
}

export interface ContactInfo {
  whatsappLink: string;
  email: string;
  youtube: string;
  youtubeLink: string;
  instagram: string;
  instagramLink: string;
  github: string;
  githubLink: string;
  formspreeEndpoint: string;
  locationNote: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  label: string;
}

export interface PortfolioData {
  navLinks: NavLink[];
  hero: HeroData;
  about: AboutData;
  services: Service[];
  projects: Project[];
  skillCategories: SkillCategory[];
  socialCards: SocialCard[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  socialLinks: SocialLink[];
  siteSettings: {
    siteName: string;
    tagline: string;
    footerNote: string;
  };
}
