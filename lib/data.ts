import { PortfolioData } from "./types";

export const defaultData: PortfolioData = {
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    badge: "👨‍💻 BCA Final Year • Rajasthan, India",
    name: "Harimohan Sharma",
    rotatingTitles: [
      "AI-Powered Web Developer",
      "Content Creator & Automation Builder",
      "Instagram & YouTube Growth Expert",
      "Turning Ideas Into Live Products",
    ],
    tagline:
      "I build in days what takes teams weeks — using AI as my superpower.\nReal websites. Real results. Real clients.",
    stats: [
      { value: "5+", label: "Live Projects" },
      { value: "2", label: "Real Clients" },
      { value: "AI-First", label: "Approach" },
    ],
    ctaPrimary: { text: "View My Work", href: "#projects" },
    // WhatsApp number: 9950252138
    ctaSecondary: {
      text: "WhatsApp Me",
      href: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER 
        ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` 
        : "https://wa.me/91XXXXXXXXXX"
    },
  },

  about: {
    paragraphs: [
      "I'm a BCA Final Year student who figured out something most developers take years to learn — that the fastest way to build real products is to combine sharp thinking with powerful AI tools.",
      "While others are still watching tutorials, I've shipped real websites like aashatextile.com and multiple Vercel projects. I create AI-generated YouTube content, manage Instagram reels for clients, and build n8n automations — all self-taught, all production-ready.",
    ],
    highlightedQuote:
      "I don't just use AI — I orchestrate it. Multiple AI APIs, Claude Code, automation workflows, content pipelines — I'm the one-person team your startup actually needs.",
    currently: [
      { emoji: "🎓", text: "BCA Final Year" },
      { emoji: "💼", text: "Open to freelance projects" },
      { emoji: "🚀", text: "Building with AI daily" },
      { emoji: "📍", text: "Rajasthan, India" },
    ],
    tools: [
      { name: "Claude", color: "#D97706" },
      { name: "ChatGPT", color: "#10A37F" },
      { name: "Gemini", color: "#4285F4" },
      { name: "ElevenLabs", color: "#F59E0B" },
      { name: "n8n", color: "#EA4B71" },
      { name: "Next.js", color: "#FFFFFF" },
      { name: "Supabase", color: "#3ECF8E" },
      { name: "Vercel", color: "#FFFFFF" },
      { name: "GitHub", color: "#C9D1D9" },
    ],
  },

  services: [
    {
      id: "s1",
      icon: "globe",
      iconColor: "#7C3AED",
      title: "AI-Powered Websites",
      description:
        "Full-stack websites built with Next.js, Supabase, and AI assistance. From portfolio to e-commerce — deployed, live, and fast.",
      tags: ["Next.js", "Supabase", "Vercel"],
      price: "Starting ₹8,000",
    },
    {
      id: "s2",
      icon: "instagram",
      iconColor: "#EC4899",
      title: "Instagram Content & Reels",
      description:
        "Scroll-stopping reels, consistent posting strategy, and AI-assisted caption writing. I already manage reels for real businesses.",
      tags: ["Video Editing", "AI Content", "Growth"],
      price: "Starting ₹3,000/month",
    },
    {
      id: "s3",
      icon: "zap",
      iconColor: "#F59E0B",
      title: "AI Automation & Workflows",
      description:
        "n8n-powered automations that save hours of manual work. Connect your tools, automate repetitive tasks, scale without extra effort.",
      tags: ["n8n", "API Integration", "Workflows"],
      price: "Starting ₹5,000",
    },
    {
      id: "s4",
      icon: "sparkles",
      iconColor: "#06B6D4",
      title: "AI Research & Content Writing",
      description:
        "Deep research on any topic, AI-assisted long-form content, YouTube scripts, blogs, and social media copy — fast and accurate.",
      tags: ["AI Research", "Content", "YouTube"],
      price: "Starting ₹2,000",
    },
  ],

  projects: [
    {
      id: "p1",
      status: "🟢 Live",
      statusColor: "#22C55E",
      title: "Aasha Textile — E-commerce Website",
      description:
        "Full-stack textile e-commerce site. Product listings, clean UI, deployed and serving real customers.",
      techStack: ["Next.js", "MongoDB", "Vercel"],
      category: "Websites",
      link: { text: "View Live", href: "https://aashatextile.com" },
    },
    {
      id: "p2",
      status: "🟢 Live",
      statusColor: "#22C55E",
      title: "Sarkari Sathi — Government Jobs Portal",
      description:
        "A job listings platform for government jobs with clean navigation and mobile-responsive design.",
      techStack: ["Next.js", "Vercel"],
      category: "Websites",
      link: {
        text: "View Live",
        href: "https://sarkari-sathi-ecru.vercel.app/",
      },
    },
    {
      id: "p3",
      status: "🟡 Growing",
      statusColor: "#EAB308",
      title: "Creation Hub — AI YouTube Channel",
      description:
        "Educational YouTube channel about AI tools, completely produced using AI — scripts, voiceovers (ElevenLabs), and editing.",
      techStack: ["ElevenLabs", "AI Video", "YouTube"],
      category: "Content",
      link: {
        text: "View Channel",
        href: "https://youtube.com/@creationhub-b4e",
      },
    },
    {
      id: "p4",
      status: "🟢 Active Client",
      statusColor: "#22C55E",
      title: "Client Work — Instagram Reels Management",
      description:
        "Managing and creating Instagram reels for a textile shop owner. Daily content extraction, editing, and posting for extra reach.",
      techStack: ["Video Editing", "Instagram", "Content Strategy"],
      category: "Content",
      link: {
        text: "View Profile",
        href: "https://www.instagram.com/dekrishansharma",
      },
    },
    {
      id: "p5",
      status: "🔵 Open Source",
      statusColor: "#3B82F6",
      title: "5+ GitHub Projects",
      description:
        "Multiple experimental and real projects on GitHub — web apps, automation scripts, and AI integrations. All code public.",
      techStack: ["GitHub", "Next.js", "APIs"],
      category: "Websites",
      link: {
        text: "View GitHub",
        href: "https://github.com/harimohan7877",
      },
    },
  ],

  skillCategories: [
    {
      id: "sk1",
      title: "AI Tools",
      accent: "#7C3AED",
      accentLight: "#A78BFA",
      skills: [
        "Claude Code",
        "ChatGPT",
        "Gemini",
        "ElevenLabs",
        "Midjourney",
        "DALL-E",
        "Cursor",
        "n8n",
      ],
    },
    {
      id: "sk2",
      title: "Development",
      accent: "#3B82F6",
      accentLight: "#60A5FA",
      skills: [
        "Next.js",
        "React",
        "HTML/CSS",
        "JavaScript",
        "Tailwind CSS",
        "Node.js",
        "REST APIs",
      ],
    },
    {
      id: "sk3",
      title: "Databases & Deploy",
      accent: "#22C55E",
      accentLight: "#4ADE80",
      skills: [
        "Supabase",
        "MongoDB",
        "PostgreSQL basics",
        "Vercel",
        "Railway",
        "GitHub",
        "VS Code",
      ],
    },
    {
      id: "sk4",
      title: "Content & Creative",
      accent: "#EC4899",
      accentLight: "#F472B6",
      skills: [
        "Video Editing",
        "Instagram Reels",
        "YouTube",
        "AI Content Writing",
        "Research",
        "Prompt Engineering",
      ],
    },
  ],

  socialCards: [
    {
      id: "sc1",
      platform: "YouTube",
      icon: "youtube",
      iconColor: "#FF0000",
      handle: "Creation Hub",
      description:
        "AI-powered educational content about tools, tips, and automation",
      link: "https://youtube.com/@creationhub-b4e",
    },
    {
      id: "sc2",
      platform: "Instagram",
      icon: "instagram",
      iconColor: "#E4405F",
      handle: "@harimohan_2006",
      description:
        "Comedy reels and AI experiments — growing audience organically",
      link: "https://www.instagram.com/harimohan_2006",
    },
    {
      id: "sc3",
      platform: "Instagram",
      icon: "instagram",
      iconColor: "#E4405F",
      handle: "@hm_sharma00",
      description:
        "AI + original clips editing showcase — creative experiments",
      link: "https://www.instagram.com/hm_sharma00",
    },
  ],

  testimonials: [
    {
      id: "t1",
      quote:
        "Harimohan has been managing my Instagram account and creating reels from my daily shop content. The consistency and creativity he brings has genuinely helped my reach. I didn't have to worry about social media at all — he handles everything.",
      authorInitials: "KS",
      authorName: "Krishna Sharma",
      authorRole: "Textile Shop Owner, Rajasthan",
      note: "Real client. Real work. Real results.",
    },
  ],

  contact: {
    // WhatsApp number: 9950252138
    whatsappLink: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER 
      ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` 
      : "https://wa.me/91XXXXXXXXXX",
    email: process.env.NEXT_PUBLIC_EMAIL || "hm@example.com",
    youtube: "@creationhub-b4e",
    youtubeLink: "https://youtube.com/@creationhub-b4e",
    instagram: "@harimohan_2006",
    instagramLink: "https://www.instagram.com/harimohan_2006",
    github: "harimohan7877",
    githubLink: "https://github.com/harimohan7877",
    // Replace with your Formspree form ID after creating a free account at formspree.io
    formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/XXXXXXXX",
    locationNote: "Based in Rajasthan, India. Available for remote work.",
  },

  socialLinks: [
    {
      platform: "github",
      href: "https://github.com/harimohan7877",
      label: "GitHub",
    },
    {
      platform: "youtube",
      href: "https://youtube.com/@creationhub-b4e",
      label: "YouTube",
    },
    {
      platform: "instagram",
      href: "https://www.instagram.com/harimohan_2006",
      label: "Instagram (harimohan_2006)",
    },
    {
      platform: "instagram2",
      href: "https://www.instagram.com/hm_sharma00",
      label: "Instagram (hm_sharma00)",
    },
  ],

  siteSettings: {
    siteName: "Harimohan Sharma",
    tagline: "AI Developer • Content Creator • Rajasthan, India",
    footerNote: "Built with Next.js + AI • 2025",
  },
};
