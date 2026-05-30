"use client";

import { motion } from "framer-motion";
import { usePortfolioData } from "@/lib/DataContext";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
  viewport: { once: true, margin: "-50px" },
});

export default function About() {
  const { data, theme } = usePortfolioData();

  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div {...fadeUp()}>
          <p className="section-label">About</p>
          <h2 className="section-heading whitespace-pre-line">
            {"I Build With AI,\nNot Just Learn It"}
          </h2>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid md:grid-cols-5 gap-12 mt-12">
          {/* Left Column */}
          <motion.div {...fadeUp()} className="md:col-span-3">
            {data.about.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-text-secondary mb-6">
                {paragraph}
              </p>
            ))}

            {/* Highlighted Quote */}
            <blockquote className="border-l-2 border-accent-purple pl-4 text-text-primary italic">
              {data.about.highlightedQuote}
            </blockquote>
          </motion.div>

          {/* Right Column */}
          <motion.div {...fadeUp(0.2)} className="md:col-span-2">
            <div className="glass-card p-6">
              {/* Currently */}
              <h3 className="text-sm font-semibold text-text-primary mb-4">
                Currently:
              </h3>
              <div className="space-y-3">
                {data.about.currently.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-base">{item.emoji}</span>
                    <span className="text-text-secondary text-sm">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <hr className="border-t border-slate-200/50 my-5" />

              {/* Tools */}
              <h3 className="text-sm font-semibold text-text-primary mb-4">
                I work with:
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.about.tools.map((tool) => {
                  const isWhite = tool.color.toUpperCase() === "#FFFFFF" || tool.color.toUpperCase() === "#FFF";
                  const activeColor = isWhite && theme === "light" ? "#0F172A" : tool.color;
                  return (
                    <span
                      key={tool.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-border bg-bg-secondary/30 text-text-secondary shadow-sm hover:text-text-primary hover:border-accent-purple/40 transition-all duration-300"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: activeColor }}
                      />
                      <span>{tool.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
