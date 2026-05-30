"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Check, Pencil, X } from "lucide-react";
import { usePortfolioData } from "@/lib/DataContext";
import { SkillCategory } from "@/lib/types";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true, margin: "-50px" },
};

const emptyCategory: SkillCategory = {
  id: "",
  title: "",
  accent: "#7C3AED",
  accentLight: "#A78BFA",
  skills: [],
};

export default function SkillsEditor() {
  const { data, updateSection } = usePortfolioData();
  const [categories, setCategories] = useState<SkillCategory[]>(data.skillCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<SkillCategory>(emptyCategory);
  const [newSkill, setNewSkill] = useState("");
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setCategories(data.skillCategories);
  }, [data.skillCategories]);

  const openEdit = (cat: SkillCategory) => {
    setEditingId(cat.id);
    setForm({ ...cat });
    setNewSkill("");
  };

  const openNew = () => {
    const newId = `sk${Date.now()}`;
    setEditingId(newId);
    setForm({ ...emptyCategory, id: newId });
    setNewSkill("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyCategory);
    setNewSkill("");
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setForm((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill("");
  };

  const removeSkill = (index: number) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const saveCategory = () => {
    const exists = categories.find((c) => c.id === form.id);
    let updated: SkillCategory[];
    if (exists) {
      updated = categories.map((c) => (c.id === form.id ? form : c));
    } else {
      updated = [...categories, form];
    }

    setCategories(updated);
    updateSection("skillCategories", updated);
    setEditingId(null);
    setForm(emptyCategory);
    setNewSkill("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    updateSection("skillCategories", updated);
    setDeleteConfirm(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <motion.div {...fadeUp}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Edit Skills
            </h2>
            <p className="text-text-secondary text-sm">
              Manage skill categories and individual skills.
            </p>
          </div>
          <button
            onClick={openNew}
            className="border border-dashed border-white/20 text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-purple hover:text-accent-purple transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>
      </motion.div>

      {/* Saved toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-lg w-fit"
          >
            <Check size={14} />
            Saved!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit form */}
      <AnimatePresence>
        {editingId && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-6 mb-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                {categories.find((c) => c.id === editingId)
                  ? "Edit Category"
                  : "New Category"}
              </h3>
              <button
                onClick={cancelEdit}
                className="text-text-secondary hover:text-text-primary transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Category Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                placeholder="e.g., AI Tools"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Accent Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.accent}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, accent: e.target.value }))
                    }
                    className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent shrink-0"
                  />
                  <input
                    type="text"
                    value={form.accent}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, accent: e.target.value }))
                    }
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Accent Light Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.accentLight}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        accentLight: e.target.value,
                      }))
                    }
                    className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent shrink-0"
                  />
                  <input
                    type="text"
                    value={form.accentLight}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        accentLight: e.target.value,
                      }))
                    }
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  />
                </div>
              </div>
            </div>

            {/* Skills list */}
            <div className="mb-4">
              <label className="text-sm font-medium text-text-secondary mb-2 block">
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {form.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-text-primary"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(i)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder="Type a skill and press Enter"
                />
                <button
                  onClick={addSkill}
                  className="border border-dashed border-white/20 text-text-secondary px-4 py-2.5 rounded-lg text-sm hover:border-accent-purple hover:text-accent-purple transition shrink-0"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={saveCategory}
                className="btn-gradient px-6 py-2.5 rounded-lg text-sm"
              >
                Save Category
              </button>
              <button
                onClick={cancelEdit}
                className="text-text-secondary hover:text-text-primary text-sm px-4 py-2.5 rounded-lg border border-white/10 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            className="glass-card p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cat.accent }}
                />
                <h3 className="text-base font-semibold text-text-primary">
                  {cat.title}
                </h3>
                <span className="text-xs text-text-muted">
                  {cat.skills.length} skills
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEdit(cat)}
                  className="text-text-secondary hover:text-accent-purple p-1.5 rounded-lg hover:bg-white/5 transition"
                >
                  <Pencil size={14} />
                </button>
                {deleteConfirm === cat.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded transition hover:bg-red-500/30"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="text-xs text-text-secondary px-2 py-1 rounded hover:bg-white/5 transition"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(cat.id)}
                    className="text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 rounded-md border border-white/10 text-text-secondary"
                  style={{ borderColor: `${cat.accent}30` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-text-secondary text-sm">
            No skill categories yet. Click &quot;Add Category&quot; to create one.
          </p>
        </div>
      )}
    </div>
  );
}
