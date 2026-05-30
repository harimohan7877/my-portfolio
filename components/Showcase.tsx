"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { usePortfolioData } from "@/lib/DataContext";

function YoutubeIcon({ size = 32, color = "#FF0000" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function InstagramIcon({ size = 32, color = "#E4405F" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function getCardIcon(iconName: string, color: string) {
  switch (iconName) {
    case "youtube":
      return <YoutubeIcon size={32} color={color} />;
    case "instagram":
      return <InstagramIcon size={32} color={color} />;
    default:
      return <InstagramIcon size={32} color={color} />;
  }
}

export default function Showcase() {
  const { data } = usePortfolioData();

  return (
    <section id="showcase" className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="section-label">Presence</p>
          <h2 className="section-heading">Find Me Across The Internet</h2>
          <p className="section-sub">
            I build, create, and share — publicly.
          </p>
        </motion.div>

        {/* Social Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {data.socialCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-card p-6"
            >
              {getCardIcon(card.icon, card.iconColor)}

              <h3 className="text-lg font-semibold text-text-primary mt-4">
                {card.handle}
              </h3>

              <p className="text-sm text-text-secondary mt-2 mb-4">
                {card.description}
              </p>

              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent-purple text-sm font-medium hover:underline"
              >
                Visit {card.platform}
                <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
