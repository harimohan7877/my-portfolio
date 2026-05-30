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

export const defaultDataHI: PortfolioData = {
  navLinks: [
    { label: "मुख्य", href: "#home" },
    { label: "सेवाएं", href: "#services" },
    { label: "प्रोजेक्ट्स", href: "#projects" },
    { label: "कौशल", href: "#skills" },
    { label: "संपर्क", href: "#contact" },
  ],
  hero: {
    badge: "👨‍💻 BCA अंतिम वर्ष • राजस्थान, भारत",
    name: "हरिमोहन शर्मा",
    rotatingTitles: [
      "AI-संचालित वेब डेवलपर",
      "कंटेंट क्रिएटर और ऑटोमेशन बिल्डर",
      "इंस्टाग्राम और यूट्यूब ग्रोथ एक्सपर्ट",
      "विचारों को लाइव प्रोडक्ट्स में बदलना",
    ],
    tagline:
      "मैं वो काम दिनों में बनाता हूँ जिसमें टीमों को हफ़्तों लगते हैं — AI को अपनी महाशक्ति के रूप में उपयोग करके।\nअसली वेबसाइटें। असली परिणाम। असली क्लाइंट्स।",
    stats: [
      { value: "5+", label: "लाइव प्रोजेक्ट्स" },
      { value: "2", label: "असली क्लाइंट्स" },
      { value: "AI-प्रथम", label: "दृष्टिकोण" },
    ],
    ctaPrimary: { text: "मेरा काम देखें", href: "#projects" },
    ctaSecondary: {
      text: "व्हाट्सएप करें",
      href: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER 
        ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` 
        : "https://wa.me/91XXXXXXXXXX"
    },
  },
  about: {
    paragraphs: [
      "मैं बीसीए अंतिम वर्ष का छात्र हूँ जिसने वह बात समझ ली है जिसे सीखने में अधिकांश डेवलपर्स को सालों लग जाते हैं — कि असली प्रोडक्ट्स बनाने का सबसे तेज़ तरीका तेज़ सोच को शक्तिशाली AI टूल्स के साथ जोड़ना है।",
      "जब दूसरे लोग अभी भी ट्यूटोरियल देख रहे हैं, मैंने aashatextile.com जैसी असली वेबसाइटें और कई वर्सेल प्रोजेक्ट्स शिप किए हैं। मैं AI-जनरेटेड यूट्यूब कंटेंट बनाता हूँ, क्लाइंट्स के लिए इंस्टाग्राम रील्स मैनेज करता हूँ, और n8n ऑटोमेशंस बनाता हूँ — सब स्व-शिक्षित, सब प्रोडक्शन-रेडी।",
    ],
    highlightedQuote:
      "मैं सिर्फ AI का उपयोग नहीं करता — मैं इसे व्यवस्थित करता हूँ। मल्टीपल AI APIs, क्लाउड कोड, ऑटोमेशन वर्कफ़्लो, कंटेंट पाइपलाइन — मैं वह वन-पर्सन टीम हूँ जिसकी आपके स्टार्टअप को वास्तव में आवश्यकता है।",
    currently: [
      { emoji: "🎓", text: "BCA अंतिम वर्ष" },
      { emoji: "💼", text: "फ्रीलांस प्रोजेक्ट्स के लिए उपलब्ध" },
      { emoji: "🚀", text: "दैनिक आधार पर AI के साथ बिल्डिंग" },
      { emoji: "📍", text: "राजस्थान, भारत" },
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
      title: "AI-संचालित वेबसाइटें",
      description:
        "Next.js, Supabase, और AI सहायता से बनी फुल-स्टैक वेबसाइटें। पोर्टफोलियो से लेकर ई-कॉमर्स तक — लाइव और सुपर फ़ास्ट।",
      tags: ["Next.js", "Supabase", "Vercel"],
      price: "शुरुआत ₹8,000",
    },
    {
      id: "s2",
      icon: "instagram",
      iconColor: "#EC4899",
      title: "इंस्टाग्राम कंटेंट और रील्स",
      description:
        "ध्यान खींचने वाली रील्स, लगातार पोस्टिंग स्ट्रेटेजी, और AI-असिस्टेड कैप्शन राइटिंग। मैं पहले से ही असली व्यवसायों के लिए रील्स मैनेज करता हूँ।",
      tags: ["वीडियो एडिटिंग", "AI कंटेंट", "ग्रोथ"],
      price: "शुरुआत ₹3,000/माह",
    },
    {
      id: "s3",
      icon: "zap",
      iconColor: "#F59E0B",
      title: "AI ऑटोमेशन और वर्कफ़्लो",
      description:
        "n8n-संचालित ऑटोमेशन जो घंटों के मैन्युअल काम को बचाते हैं। अपने टूल्स को कनेक्ट करें, बार-बार होने वाले कार्यों को ऑटोमेट करें।",
      tags: ["n8n", "API इंटीग्रेशन", "वर्कफ़्लो"],
      price: "शुरुआत ₹5,000",
    },
    {
      id: "s4",
      icon: "sparkles",
      iconColor: "#06B6D4",
      title: "AI रिसर्च और कंटेंट राइटिंग",
      description:
        "किसी भी विषय पर गहरी रिसर्च, AI-असिस्टेड लॉन्ग-फॉर्म कंटेंट, यूट्यूब स्क्रिप्ट, ब्लॉग और सोशल मीडिया कॉपी — तेज़ और सटीक।",
      tags: ["AI रिसर्च", "कंटेंट", "यूट्यूब"],
      price: "शुरुआत ₹2,000",
    },
  ],
  projects: [
    {
      id: "p1",
      status: "🟢 लाइव",
      statusColor: "#22C55E",
      title: "आशा टेक्सटाइल — ई-कॉमर्स वेबसाइट",
      description:
        "फुल-स्टैक टेक्सटाइल ई-कॉमर्स साइट। प्रोडक्ट लिस्टिंग, साफ UI, लाइव और असली ग्राहकों की सेवा में।",
      techStack: ["Next.js", "MongoDB", "Vercel"],
      category: "Websites",
      link: { text: "लाइव देखें", href: "https://aashatextile.com" },
    },
    {
      id: "p2",
      status: "🟢 लाइव",
      statusColor: "#22C55E",
      title: "सरकारी साथी — सरकारी नौकरी पोर्टल",
      description:
        "साफ नेविगेशन और मोबाइल-रिस्पॉन्सिव डिज़ाइन के साथ सरकारी नौकरियों के लिए एक जॉब लिस्टिंग प्लेटफॉर्म।",
      techStack: ["Next.js", "Vercel"],
      category: "Websites",
      link: {
        text: "लाइव देखें",
        href: "https://sarkari-sathi-ecru.vercel.app/",
      },
    },
    {
      id: "p3",
      status: "🟡 बढ़ रहा है",
      statusColor: "#EAB308",
      title: "क्रिएशन हब — AI यूट्यूब चैनल",
      description:
        "AI टूल्स के बारे में शैक्षिक यूट्यूब चैनल, पूरी तरह से AI का उपयोग करके निर्मित — स्क्रिप्ट, वॉयसओवर (ElevenLabs), और एडिटिंग।",
      techStack: ["ElevenLabs", "AI वीडियो", "यूट्यूब"],
      category: "Content",
      link: {
        text: "चैनल देखें",
        href: "https://youtube.com/@creationhub-b4e",
      },
    },
    {
      id: "p4",
      status: "🟢 सक्रिय क्लाइंट",
      statusColor: "#22C55E",
      title: "क्लाइंट वर्क — इंस्टाग्राम रील्स मैनेजमेंट",
      description:
        "एक टेक्सटाइल शॉप ओनर के लिए इंस्टाग्राम रील्स का प्रबंधन और निर्माण। अतिरिक्त रीच के लिए दैनिक कंटेंट पोस्टिंग।",
      techStack: ["वीडियो एडिटिंग", "इंस्टाग्राम", "कंटेंट स्ट्रेटेजी"],
      category: "Content",
      link: {
        text: "प्रोफाइल देखें",
        href: "https://www.instagram.com/dekrishansharma",
      },
    },
    {
      id: "p5",
      status: "🔵 ओपन सोर्स",
      statusColor: "#3B82F6",
      title: "5+ गिटहब प्रोजेक्ट्स",
      description:
        "गिटहब पर कई प्रायोगिक और वास्तविक प्रोजेक्ट्स — वेब ऐप्स, ऑटोमेशन स्क्रिप्ट्स, और AI इंटीग्रेशन्स। सारा कोड पब्लिक है।",
      techStack: ["GitHub", "Next.js", "APIs"],
      category: "Websites",
      link: {
        text: "गिटहब देखें",
        href: "https://github.com/harimohan7877",
      },
    },
  ],
  skillCategories: [
    {
      id: "sk1",
      title: "AI टूल्स",
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
      title: "वेब डेवलपमेंट",
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
      title: "डेटाबेस और डिप्लॉय",
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
      title: "क्रिएटिव और कंटेंट",
      accent: "#EC4899",
      accentLight: "#F472B6",
      skills: [
        "वीडियो एडिटिंग",
        "इंस्टाग्राम रील्स",
        "यूट्यूब",
        "AI कंटेंट राइटिंग",
        "रिसर्च",
        "प्रॉम्प्ट इंजीनियरिंग",
      ],
    },
  ],
  socialCards: [
    {
      id: "sc1",
      platform: "यूट्यूब",
      icon: "youtube",
      iconColor: "#FF0000",
      handle: "क्रिएशन हब",
      description:
        "AI-संचालित शैक्षिक कंटेंट - टूल्स, टिप्स और ऑटोमेशन के बारे में",
      link: "https://youtube.com/@creationhub-b4e",
    },
    {
      id: "sc2",
      platform: "इंस्टाग्राम",
      icon: "instagram",
      iconColor: "#E4405F",
      handle: "@harimohan_2006",
      description:
        "कॉमेडी रील्स और AI प्रयोग — ऑर्गेनिक तरीके से दर्शकों को बढ़ाना",
      link: "https://www.instagram.com/harimohan_2006",
    },
    {
      id: "sc3",
      platform: "इंस्टाग्राम",
      icon: "instagram",
      iconColor: "#E4405F",
      handle: "@hm_sharma00",
      description:
        "AI + ओरिजिनल क्लिप्स एडिटिंग शोकेस — रचनात्मक प्रयोग",
      link: "https://www.instagram.com/hm_sharma00",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "हरिमोहन मेरे इंस्टाग्राम अकाउंट को मैनेज कर रहे हैं और मेरे दैनिक दुकान के कंटेंट से रील्स बना रहे हैं। उनकी निरंतरता और रचनात्मकता ने वास्तव में मेरी रीच को बढ़ाने में मदद की है। मुझे सोशल मीडिया की बिल्कुल चिंता नहीं करनी पड़ी — वह सब कुछ संभालते हैं।",
      authorInitials: "KS",
      authorName: "कृष्णा शर्मा",
      authorRole: "कपड़े की दुकान के मालिक, राजस्थान",
      note: "असली ग्राहक। असली काम। असली परिणाम।",
    },
  ],
  contact: {
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
    formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/XXXXXXXX",
    locationNote: "राजस्थान, भारत में स्थित। रिमोट काम के लिए उपलब्ध।",
  },
  socialLinks: [
    {
      platform: "github",
      href: "https://github.com/harimohan7877",
      label: "गिटहब",
    },
    {
      platform: "youtube",
      href: "https://youtube.com/@creationhub-b4e",
      label: "यूट्यूब",
    },
    {
      platform: "instagram",
      href: "https://www.instagram.com/harimohan_2006",
      label: "इंस्टाग्राम (harimohan_2006)",
    },
    {
      platform: "instagram2",
      href: "https://www.instagram.com/hm_sharma00",
      label: "इंस्टाग्राम (hm_sharma00)",
    },
  ],
  siteSettings: {
    siteName: "हरिमोहन शर्मा",
    tagline: "AI डेवलपर • कंटेंट क्रिएटर • राजस्थान, भारत",
    footerNote: "Next.js + AI द्वारा निर्मित • 2025",
  },
};
