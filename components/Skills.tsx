"use client";

import { motion } from "framer-motion";
import { usePortfolioData } from "@/lib/DataContext";

export default function Skills() {
  const { data } = usePortfolioData();

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="section-label">Skills</p>
          <h2 className="section-heading">My Tech Stack</h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {data.skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
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
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.accent }}
                />
                <h3 className="text-lg font-semibold text-text-primary">
                  {category.title}
                </h3>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      border: `1px solid rgba(${hexToRgb(category.accent)}, 0.3)`,
                      backgroundColor: `rgba(${hexToRgb(category.accent)}, 0.08)`,
                      color: category.accentLight,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Convert hex color to comma-separated RGB string for use in rgba() */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "124,58,237";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}
