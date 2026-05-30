"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioData } from "@/lib/DataContext";
import { Testimonial } from "@/lib/types";
import { Plus, Trash2, Edit, Save, ArrowLeft, MessageSquare, Sparkles } from "lucide-react";

export default function AdminTestimonials() {
  const { data, updateSection } = usePortfolioData();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (data?.testimonials) {
      setTestimonials(data.testimonials);
    }
  }, [data]);

  const handleSave = (item: Testimonial) => {
    let updated: Testimonial[];
    if (isAdding) {
      updated = [...testimonials, { ...item, id: `t_${Date.now()}` }];
    } else {
      updated = testimonials.map((t) => (t.id === item.id ? item : t));
    }
    setTestimonials(updated);
    updateSection("testimonials", updated);
    setEditingTestimonial(null);
    setIsAdding(false);
    triggerToast();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const updated = testimonials.filter((t) => t.id !== id);
      setTestimonials(updated);
      updateSection("testimonials", updated);
      triggerToast();
    }
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const startEdit = (item: Testimonial) => {
    setEditingTestimonial({ ...item });
    setIsAdding(false);
  };

  const startAdd = () => {
    setEditingTestimonial({
      id: "",
      quote: "",
      authorInitials: "",
      authorName: "",
      authorRole: "",
      note: "Real client. Real work. Real results.",
    });
    setIsAdding(true);
  };

  return (
    <div className="max-w-4xl">
      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg z-50 flex items-center gap-2"
          >
            <Sparkles size={16} />
            Testimonial Saved Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Testimonials</h2>
          <p className="text-text-secondary text-sm">
            Manage feedback from clients, employers, or collaborators.
          </p>
        </div>
        {!editingTestimonial && (
          <button
            onClick={startAdd}
            className="flex items-center gap-2 btn-gradient px-4 py-2 rounded-lg text-sm"
          >
            <Plus size={16} />
            Add Testimonial
          </button>
        )}
      </div>

      {editingTestimonial ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setEditingTestimonial(null)}
              className="p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-text-primary transition"
            >
              <ArrowLeft size={18} />
            </button>
            <h3 className="text-lg font-semibold text-text-primary">
              {isAdding ? "Add Testimonial" : `Edit Testimonial by ${editingTestimonial.authorName}`}
            </h3>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(editingTestimonial);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Author Name
                </label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.authorName}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, authorName: e.target.value })
                  }
                  className="form-input"
                  placeholder="e.g. Krishna Sharma"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Initials (for Avatar)
                </label>
                <input
                  type="text"
                  required
                  maxLength={3}
                  value={editingTestimonial.authorInitials}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, authorInitials: e.target.value.toUpperCase() })
                  }
                  className="form-input"
                  placeholder="e.g. KS"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Author Role / Designation
                </label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.authorRole}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, authorRole: e.target.value })
                  }
                  className="form-input"
                  placeholder="e.g. Textile Shop Owner, Rajasthan"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Sub-Note / Status (displays at bottom)
                </label>
                <input
                  type="text"
                  value={editingTestimonial.note}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, note: e.target.value })
                  }
                  className="form-input"
                  placeholder="e.g. Real client. Real work."
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Quote Content
              </label>
              <textarea
                required
                rows={5}
                value={editingTestimonial.quote}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })
                }
                className="form-input"
                placeholder="Paste client feedback here..."
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={() => setEditingTestimonial(null)}
                className="px-4 py-2 rounded-lg text-sm border border-white/10 text-text-secondary hover:text-text-primary transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 btn-gradient px-6 py-2 rounded-lg text-sm"
              >
                <Save size={16} />
                Save Testimonial
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              className="glass-card p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {item.authorInitials}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">
                      {item.authorName}
                    </h4>
                    <p className="text-sm text-text-secondary">{item.authorRole}</p>
                    <p className="text-xs text-text-muted mt-1">{item.note}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="p-2 rounded bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10 transition"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.06] text-sm italic text-text-secondary relative pl-6">
                <MessageSquare size={16} className="absolute left-0 top-4 text-accent-purple/40" />
                &ldquo;{item.quote}&rdquo;
              </div>
            </motion.div>
          ))}

          {testimonials.length === 0 && (
            <div className="text-center py-12 glass-card">
              <p className="text-text-secondary text-sm">No testimonials yet. Add one to show social proof!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
