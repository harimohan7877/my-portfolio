"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Check, Pencil, X } from "lucide-react";
import { usePortfolioData } from "@/lib/DataContext";
import { Service } from "@/lib/types";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true, margin: "-50px" },
};

const iconOptions = ["globe", "instagram", "zap", "sparkles"];

const emptyService: Service = {
  id: "",
  icon: "globe",
  iconColor: "#7C3AED",
  title: "",
  description: "",
  tags: [],
  price: "",
};

export default function ServicesEditor() {
  const { data, updateSection } = usePortfolioData();
  const [services, setServices] = useState<Service[]>(data.services);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Service>(emptyService);
  const [tagsInput, setTagsInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setServices(data.services);
  }, [data.services]);

  const openEdit = (service: Service) => {
    setEditingId(service.id);
    setForm(service);
    setTagsInput(service.tags.join(", "));
  };

  const openNew = () => {
    const newId = `s${Date.now()}`;
    const newService = { ...emptyService, id: newId };
    setEditingId(newId);
    setForm(newService);
    setTagsInput("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyService);
    setTagsInput("");
  };

  const saveService = () => {
    const updatedService = {
      ...form,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const exists = services.find((s) => s.id === updatedService.id);
    let updated: Service[];
    if (exists) {
      updated = services.map((s) => (s.id === updatedService.id ? updatedService : s));
    } else {
      updated = [...services, updatedService];
    }

    setServices(updated);
    updateSection("services", updated);
    setEditingId(null);
    setForm(emptyService);
    setTagsInput("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    updateSection("services", updated);
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
              Edit Services
            </h2>
            <p className="text-text-secondary text-sm">
              Add, edit, or remove your offered services.
            </p>
          </div>
          <button
            onClick={openNew}
            className="border border-dashed border-white/20 text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-purple hover:text-accent-purple transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Service
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
                {services.find((s) => s.id === editingId) ? "Edit Service" : "New Service"}
              </h3>
              <button
                onClick={cancelEdit}
                className="text-text-secondary hover:text-text-primary transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Icon
                </label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0e0e1a]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Icon Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.iconColor}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, iconColor: e.target.value }))
                    }
                    className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent shrink-0"
                  />
                  <input
                    type="text"
                    value={form.iconColor}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, iconColor: e.target.value }))
                    }
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={3}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder="Next.js, Supabase, Vercel"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Price
                </label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder="Starting ₹8,000"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={saveService}
                className="btn-gradient px-6 py-2.5 rounded-lg text-sm"
              >
                Save Service
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

      {/* Services list */}
      <div className="space-y-4">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            className="glass-card p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                    style={{ backgroundColor: `${service.iconColor}15`, color: service.iconColor }}
                  >
                    {service.icon === "globe" && "🌐"}
                    {service.icon === "instagram" && "📸"}
                    {service.icon === "zap" && "⚡"}
                    {service.icon === "sparkles" && "✨"}
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/5 text-text-secondary px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-xs text-accent-purple font-medium ml-2">
                    {service.price}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <button
                  onClick={() => openEdit(service)}
                  className="text-text-secondary hover:text-accent-purple p-2 rounded-lg hover:bg-white/5 transition"
                >
                  <Pencil size={16} />
                </button>
                {deleteConfirm === service.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteService(service.id)}
                      className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded transition hover:bg-red-500/30"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="text-xs text-text-secondary px-2 py-1 rounded hover:bg-white/5 transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(service.id)}
                    className="bg-red-500/10 text-red-400 border border-red-500/20 p-2 rounded-lg text-sm hover:bg-red-500/20 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-text-secondary text-sm">
            No services yet. Click &quot;Add Service&quot; to create one.
          </p>
        </div>
      )}
    </div>
  );
}
