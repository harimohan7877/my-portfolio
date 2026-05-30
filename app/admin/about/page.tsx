"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Check } from "lucide-react";
import { usePortfolioData } from "@/lib/DataContext";
import { AboutData } from "@/lib/types";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true, margin: "-50px" },
};

export default function AboutEditor() {
  const { data, updateSection } = usePortfolioData();
  const [form, setForm] = useState<AboutData>(data.about);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(data.about);
  }, [data.about]);

  const handleSave = () => {
    updateSection("about", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  /* Paragraphs */
  const updateParagraph = (index: number, value: string) => {
    const updated = [...form.paragraphs];
    updated[index] = value;
    setForm((prev) => ({ ...prev, paragraphs: updated }));
  };

  const addParagraph = () => {
    setForm((prev) => ({ ...prev, paragraphs: [...prev.paragraphs, ""] }));
  };

  const removeParagraph = (index: number) => {
    setForm((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }));
  };

  /* Currently */
  const updateCurrently = (index: number, field: "emoji" | "text", value: string) => {
    const updated = [...form.currently];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, currently: updated }));
  };

  const addCurrently = () => {
    setForm((prev) => ({
      ...prev,
      currently: [...prev.currently, { emoji: "🔹", text: "" }],
    }));
  };

  const removeCurrently = (index: number) => {
    setForm((prev) => ({
      ...prev,
      currently: prev.currently.filter((_, i) => i !== index),
    }));
  };

  /* Tools */
  const updateTool = (index: number, field: "name" | "color", value: string) => {
    const updated = [...form.tools];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, tools: updated }));
  };

  const addTool = () => {
    setForm((prev) => ({
      ...prev,
      tools: [...prev.tools, { name: "", color: "#7C3AED" }],
    }));
  };

  const removeTool = (index: number) => {
    setForm((prev) => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Edit About Section</h2>
        <p className="text-text-secondary text-sm mb-8">
          Update your bio, currently items, and tools.
        </p>
      </motion.div>

      <motion.div {...fadeUp} className="space-y-6">
        {/* Paragraphs */}
        <div className="glass-card p-6">
          <label className="text-sm font-medium text-text-secondary mb-3 block">
            Bio Paragraphs
          </label>
          <div className="space-y-3">
            {form.paragraphs.map((para, i) => (
              <div key={i} className="flex items-start gap-3">
                <textarea
                  value={para}
                  onChange={(e) => updateParagraph(i, e.target.value)}
                  rows={3}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition resize-none"
                  placeholder={`Paragraph ${i + 1}`}
                />
                <button
                  onClick={() => removeParagraph(i)}
                  className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-2.5 rounded-lg text-sm hover:bg-red-500/20 transition shrink-0 mt-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addParagraph}
            className="mt-3 border border-dashed border-white/20 text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-purple hover:text-accent-purple transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Paragraph
          </button>
        </div>

        {/* Highlighted Quote */}
        <div className="glass-card p-6">
          <label className="text-sm font-medium text-text-secondary mb-1.5 block">
            Highlighted Quote
          </label>
          <textarea
            value={form.highlightedQuote}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, highlightedQuote: e.target.value }))
            }
            rows={3}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition resize-none"
          />
        </div>

        {/* Currently Items */}
        <div className="glass-card p-6">
          <label className="text-sm font-medium text-text-secondary mb-3 block">
            Currently Items
          </label>
          <div className="space-y-3">
            {form.currently.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="text"
                  value={item.emoji}
                  onChange={(e) => updateCurrently(i, "emoji", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-16 transition text-center"
                  placeholder="🔹"
                />
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => updateCurrently(i, "text", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder="Description"
                />
                <button
                  onClick={() => removeCurrently(i)}
                  className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-2.5 rounded-lg text-sm hover:bg-red-500/20 transition shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addCurrently}
            className="mt-3 border border-dashed border-white/20 text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-purple hover:text-accent-purple transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Currently Item
          </button>
        </div>

        {/* Tools */}
        <div className="glass-card p-6">
          <label className="text-sm font-medium text-text-secondary mb-3 block">
            Tools & Technologies
          </label>
          <div className="space-y-3">
            {form.tools.map((tool, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="text"
                  value={tool.name}
                  onChange={(e) => updateTool(i, "name", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder="Tool name"
                />
                <div className="relative shrink-0">
                  <input
                    type="color"
                    value={tool.color}
                    onChange={(e) => updateTool(i, "color", e.target.value)}
                    className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent"
                  />
                </div>
                <button
                  onClick={() => removeTool(i)}
                  className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-2.5 rounded-lg text-sm hover:bg-red-500/20 transition shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addTool}
            className="mt-3 border border-dashed border-white/20 text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-purple hover:text-accent-purple transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Tool
          </button>
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
