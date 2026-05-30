"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Check } from "lucide-react";
import { usePortfolioData } from "@/lib/DataContext";
import { HeroData } from "@/lib/types";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true, margin: "-50px" },
};

export default function HeroEditor() {
  const { data, updateSection } = usePortfolioData();
  const [form, setForm] = useState<HeroData>(data.hero);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(data.hero);
  }, [data.hero]);

  const handleSave = () => {
    updateSection("hero", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = <K extends keyof HeroData>(key: K, value: HeroData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateTitle = (index: number, value: string) => {
    const updated = [...form.rotatingTitles];
    updated[index] = value;
    updateField("rotatingTitles", updated);
  };

  const addTitle = () => {
    updateField("rotatingTitles", [...form.rotatingTitles, ""]);
  };

  const removeTitle = (index: number) => {
    updateField(
      "rotatingTitles",
      form.rotatingTitles.filter((_, i) => i !== index)
    );
  };

  const updateStat = (index: number, field: "value" | "label", value: string) => {
    const updated = [...form.stats];
    updated[index] = { ...updated[index], [field]: value };
    updateField("stats", updated);
  };

  const addStat = () => {
    updateField("stats", [...form.stats, { value: "", label: "" }]);
  };

  const removeStat = (index: number) => {
    updateField(
      "stats",
      form.stats.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Edit Hero Section</h2>
        <p className="text-text-secondary text-sm mb-8">
          Customize the hero section of your portfolio landing page.
        </p>
      </motion.div>

      <motion.div {...fadeUp} className="space-y-6">
        {/* Badge */}
        <div className="glass-card p-6">
          <label className="text-sm font-medium text-text-secondary mb-1.5 block">
            Badge Text
          </label>
          <input
            type="text"
            value={form.badge}
            onChange={(e) => updateField("badge", e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
          />
        </div>

        {/* Name */}
        <div className="glass-card p-6">
          <label className="text-sm font-medium text-text-secondary mb-1.5 block">
            Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
          />
        </div>

        {/* Rotating Titles */}
        <div className="glass-card p-6">
          <label className="text-sm font-medium text-text-secondary mb-3 block">
            Rotating Titles
          </label>
          <div className="space-y-3">
            {form.rotatingTitles.map((title, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => updateTitle(i, e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder={`Title ${i + 1}`}
                />
                <button
                  onClick={() => removeTitle(i)}
                  className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-2.5 rounded-lg text-sm hover:bg-red-500/20 transition shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addTitle}
            className="mt-3 border border-dashed border-white/20 text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-purple hover:text-accent-purple transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Title
          </button>
        </div>

        {/* Tagline */}
        <div className="glass-card p-6">
          <label className="text-sm font-medium text-text-secondary mb-1.5 block">
            Tagline
          </label>
          <textarea
            value={form.tagline}
            onChange={(e) => updateField("tagline", e.target.value)}
            rows={3}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition resize-none"
          />
        </div>

        {/* Stats */}
        <div className="glass-card p-6">
          <label className="text-sm font-medium text-text-secondary mb-3 block">
            Stats
          </label>
          <div className="space-y-3">
            {form.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(i, "value", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder="Value (e.g., 5+)"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(i, "label", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder="Label (e.g., Live Projects)"
                />
                <button
                  onClick={() => removeStat(i)}
                  className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-2.5 rounded-lg text-sm hover:bg-red-500/20 transition shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addStat}
            className="mt-3 border border-dashed border-white/20 text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-purple hover:text-accent-purple transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Stat
          </button>
        </div>

        {/* CTA Primary */}
        <div className="glass-card p-6">
          <label className="text-sm font-medium text-text-secondary mb-3 block">
            CTA Primary Button
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-text-muted mb-1 block">Button Text</label>
              <input
                type="text"
                value={form.ctaPrimary.text}
                onChange={(e) =>
                  updateField("ctaPrimary", { ...form.ctaPrimary, text: e.target.value })
                }
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Link / Href</label>
              <input
                type="text"
                value={form.ctaPrimary.href}
                onChange={(e) =>
                  updateField("ctaPrimary", { ...form.ctaPrimary, href: e.target.value })
                }
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
              />
            </div>
          </div>
        </div>

        {/* CTA Secondary */}
        <div className="glass-card p-6">
          <label className="text-sm font-medium text-text-secondary mb-3 block">
            CTA Secondary Button
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-text-muted mb-1 block">Button Text</label>
              <input
                type="text"
                value={form.ctaSecondary.text}
                onChange={(e) =>
                  updateField("ctaSecondary", {
                    ...form.ctaSecondary,
                    text: e.target.value,
                  })
                }
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Link / Href</label>
              <input
                type="text"
                value={form.ctaSecondary.href}
                onChange={(e) =>
                  updateField("ctaSecondary", {
                    ...form.ctaSecondary,
                    href: e.target.value,
                  })
                }
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
              />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button onClick={handleSave} className="btn-gradient px-6 py-2.5 rounded-lg text-sm">
            Save Changes
          </button>
          <AnimatePresence>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg"
              >
                <Check size={14} />
                Saved!
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
