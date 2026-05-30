"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, FolderOpen, Code2, MessageSquare, Rocket, Plus, Download } from "lucide-react";
import { usePortfolioData } from "@/lib/DataContext";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true, margin: "-50px" },
};

export default function AdminDashboard() {
  const { data, exportData } = usePortfolioData();

  const totalSkills = data.skillCategories.reduce(
    (sum, cat) => sum + cat.skills.length,
    0
  );

  const stats = [
    {
      icon: Briefcase,
      value: data.services.length,
      label: "Total Services",
      color: "#7C3AED",
    },
    {
      icon: FolderOpen,
      value: data.projects.length,
      label: "Total Projects",
      color: "#3B82F6",
    },
    {
      icon: Code2,
      value: totalSkills,
      label: "Total Skills",
      color: "#22C55E",
    },
    {
      icon: MessageSquare,
      value: data.testimonials.length,
      label: "Total Testimonials",
      color: "#F59E0B",
    },
  ];

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const quickActions = [
    { label: "Edit Hero", href: "/admin/hero", icon: Rocket },
    { label: "Add Project", href: "/admin/projects", icon: Plus },
    { label: "Add Service", href: "/admin/services", icon: Plus },
  ];

  return (
    <div>
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Dashboard</h2>
        <p className="text-text-secondary text-sm mb-8">
          Overview of your portfolio data and quick actions.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <Icon size={20} style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick actions */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <motion.div
                  className="glass-card p-5 flex items-center gap-3 cursor-pointer"
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <div className="w-9 h-9 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                    <Icon size={18} className="text-accent-purple" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {action.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
          <motion.div
            className="glass-card p-5 flex items-center gap-3 cursor-pointer"
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={handleExport}
          >
            <div className="w-9 h-9 rounded-lg bg-accent-purple/10 flex items-center justify-center">
              <Download size={18} className="text-accent-purple" />
            </div>
            <span className="text-sm font-medium text-text-primary">
              Export Data
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
