"use client";

import { motion } from "framer-motion";
import { Globe, Zap, Sparkles } from "lucide-react";
import { Instagram } from "@/components/icons";
import { usePortfolioData } from "@/lib/DataContext";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
  viewport: { once: true, margin: "-50px" },
});

const iconMap: Record<string, React.ComponentType<any>> = {
  globe: Globe,
  instagram: Instagram,
  zap: Zap,
  sparkles: Sparkles,
};

export default function Services() {
  const { data } = usePortfolioData();

  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div {...fadeUp()}>
          <p className="section-label">Services</p>
          <h2 className="section-heading">What I Build For You</h2>
          <p className="section-sub">
            Every service is AI-enhanced — faster delivery, better results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Globe;

            return (
              <motion.div
                key={service.id}
                {...fadeUp(index * 0.1)}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-6"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${service.iconColor}1A`,
                  }}
                >
                  <IconComponent size={24} style={{ color: service.iconColor }} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-text-primary mt-4 mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary mb-4">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full border border-slate-200 bg-slate-100 text-text-secondary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <p className="text-accent-purple font-semibold text-sm">
                  {service.price}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
