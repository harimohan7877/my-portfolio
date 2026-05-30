"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Globe, Zap } from "lucide-react";
import { Youtube, Instagram, Github } from "@/components/icons";
import { usePortfolioData } from "@/lib/DataContext";
import type { Project } from "@/lib/types";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
  viewport: { once: true, margin: "-50px" },
});

const filterTabs = ["All", "Websites", "Content", "Automation"] as const;

function getProjectIcon(project: Project) {
  const title = project.title.toLowerCase();
  const tech = project.techStack.join(" ").toLowerCase();

  if (title.includes("youtube") || tech.includes("youtube"))
    return <Youtube size={32} className="text-white/30" />;
  if (title.includes("instagram") || tech.includes("instagram"))
    return <Instagram size={32} className="text-white/30" />;
  if (title.includes("github"))
    return <Github size={32} className="text-white/30" />;
  if (project.category === "Automation")
    return <Zap size={32} className="text-white/30" />;
  return <Globe size={32} className="text-white/30" />;
}

export default function Projects() {
  const { data } = usePortfolioData();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects =
    activeFilter === "All"
      ? data.projects
      : data.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div {...fadeUp()}>
          <p className="section-label">Projects</p>
          <h2 className="section-heading">Real Products. Live URLs.</h2>
          <p className="section-sub">
            Not mockups. Not tutorials. Actual deployed products.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-3 mt-8 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`rounded-full px-5 py-2 text-sm transition-all duration-300 ${
                activeFilter === tab
                  ? "btn-gradient"
                  : "border border-slate-200 text-text-secondary hover:text-text-primary hover:border-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                {...fadeUp(index * 0.1)}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className="glass-card p-6"
              >
                {/* Image Area */}
                <div
                  className="h-40 rounded-xl mb-4 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(59,130,246,0.1) 50%, rgba(6,182,212,0.08) 100%)",
                  }}
                >
                  {getProjectIcon(project)}
                </div>

                {/* Status Badge */}
                <span
                  className="inline-flex text-xs rounded-full px-3 py-1"
                  style={{
                    backgroundColor: `${project.statusColor}1A`,
                    color: project.statusColor,
                  }}
                >
                  {project.status}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-text-primary mt-3 mb-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full bg-slate-100 text-text-secondary font-medium border border-slate-200/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent-purple text-sm font-medium hover:underline"
                >
                  {project.link.text}
                  <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
