"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Youtube, Instagram } from "@/components/icons";
import { usePortfolioData } from "@/lib/DataContext";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
  viewport: { once: true, margin: "-50px" },
});

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function getSocialIcon(platform: string) {
  switch (platform) {
    case "github":
      return <Github size={20} />;
    case "youtube":
      return <Youtube size={20} />;
    case "instagram":
    case "instagram2":
      return <Instagram size={20} />;
    default:
      return <Github size={20} />;
  }
}

export default function Hero() {
  const { data } = usePortfolioData();
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % data.hero.rotatingTitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [data.hero.rotatingTitles.length]);

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center justify-center flex-col text-center"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Blob 1 */}
        <div
          className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] opacity-10 animate-float rounded-full"
          style={{
            background: "var(--gradient-hero)",
            filter: "blur(120px)",
          }}
        />
        {/* Blob 2 */}
        <div
          className="absolute -bottom-[100px] -right-[100px] w-[400px] h-[400px] bg-accent-blue opacity-[0.08] animate-float rounded-full"
          style={{
            filter: "blur(80px)",
            animationDelay: "4s",
          }}
        />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl mx-auto px-4">
        {/* Badge */}
        <motion.div {...fadeUp(0.5)}>
          <span
            className="inline-block rounded-full px-4 py-2 text-sm"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#A78BFA",
            }}
          >
            {data.hero.badge}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.7)}
          className="gradient-text font-bold leading-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          {data.hero.name}
        </motion.h1>

        {/* Rotating title */}
        <motion.div
          {...fadeUp(0.9)}
          className="h-10 flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={titleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl md:text-2xl font-medium text-text-secondary"
            >
              {data.hero.rotatingTitles[titleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Tagline */}
        <motion.p
          {...fadeUp(1.1)}
          className="text-text-secondary max-w-2xl whitespace-pre-line"
        >
          {data.hero.tagline}
        </motion.p>

        {/* Stats Row */}
        <motion.div
          {...fadeUp(1.3)}
          className="flex gap-4 md:gap-8"
        >
          {data.hero.stats.map((stat) => (
            <div key={stat.label} className="border-t-2 border-accent-purple pt-3 text-center">
              <div className="font-bold text-2xl text-text-primary">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Row */}
        <motion.div {...fadeUp(1.5)} className="flex gap-4 flex-wrap justify-center">
          <a
            href={data.hero.ctaPrimary.href}
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector(data.hero.ctaPrimary.href);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gradient rounded-xl px-8 py-3.5 text-base"
          >
            {data.hero.ctaPrimary.text}
          </a>
          <a
            href={data.hero.ctaSecondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline rounded-xl px-8 py-3.5 flex items-center gap-2 text-base"
          >
            <WhatsAppIcon size={18} />
            {data.hero.ctaSecondary.text}
          </a>
        </motion.div>

        {/* Social Links Row */}
        <motion.div {...fadeUp(1.7)} className="flex gap-5">
          {data.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-text-muted hover:text-accent-purple transition-colors duration-300"
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
