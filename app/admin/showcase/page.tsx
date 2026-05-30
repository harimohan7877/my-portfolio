"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioData } from "@/lib/DataContext";
import { SocialCard } from "@/lib/types";
import { Plus, Trash2, Edit, Save, ArrowLeft, Share2, Sparkles } from "lucide-react";

export default function AdminShowcase() {
  const { data, updateSection } = usePortfolioData();
  const [showcase, setShowcase] = useState<SocialCard[]>([]);
  const [editingCard, setEditingCard] = useState<SocialCard | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (data?.socialCards) {
      setShowcase(data.socialCards);
    }
  }, [data]);

  const handleSave = (card: SocialCard) => {
    let updated: SocialCard[];
    if (isAdding) {
      updated = [...showcase, { ...card, id: `sc_${Date.now()}` }];
    } else {
      updated = showcase.map((c) => (c.id === card.id ? card : c));
    }
    setShowcase(updated);
    updateSection("socialCards", updated);
    setEditingCard(null);
    setIsAdding(false);
    triggerToast();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this showcase card?")) {
      const updated = showcase.filter((c) => c.id !== id);
      setShowcase(updated);
      updateSection("socialCards", updated);
      triggerToast();
    }
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const startEdit = (card: SocialCard) => {
    setEditingCard({ ...card });
    setIsAdding(false);
  };

  const startAdd = () => {
    setEditingCard({
      id: "",
      platform: "YouTube",
      icon: "youtube",
      iconColor: "#FF0000",
      handle: "",
      description: "",
      link: "",
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
            Changes Saved Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Showcase Presence</h2>
          <p className="text-text-secondary text-sm">
            Manage links and cards showing your presence across the internet.
          </p>
        </div>
        {!editingCard && (
          <button
            onClick={startAdd}
            className="flex items-center gap-2 btn-gradient px-4 py-2 rounded-lg text-sm"
          >
            <Plus size={16} />
            Add Showcase Card
          </button>
        )}
      </div>

      {editingCard ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setEditingCard(null)}
              className="p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-text-primary transition"
            >
              <ArrowLeft size={18} />
            </button>
            <h3 className="text-lg font-semibold text-text-primary">
              {isAdding ? "Add Showcase Card" : `Edit ${editingCard.platform}`}
            </h3>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(editingCard);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Platform Name
                </label>
                <input
                  type="text"
                  required
                  value={editingCard.platform}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, platform: e.target.value })
                  }
                  className="form-input"
                  placeholder="e.g. YouTube, Instagram, GitHub"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Icon
                </label>
                <select
                  value={editingCard.icon}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, icon: e.target.value })
                  }
                  className="form-input bg-bg-secondary"
                >
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="github">GitHub</option>
                  <option value="globe">Globe/Web</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Handle/Username
                </label>
                <input
                  type="text"
                  required
                  value={editingCard.handle}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, handle: e.target.value })
                  }
                  className="form-input"
                  placeholder="e.g. @harimohan_2006"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Icon Hex Color
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={editingCard.iconColor}
                    onChange={(e) =>
                      setEditingCard({ ...editingCard, iconColor: e.target.value })
                    }
                    className="w-12 h-10 bg-transparent border border-white/10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    required
                    value={editingCard.iconColor}
                    onChange={(e) =>
                      setEditingCard({ ...editingCard, iconColor: e.target.value })
                    }
                    className="form-input"
                    placeholder="#FF0000"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Target URL Link
              </label>
              <input
                type="url"
                required
                value={editingCard.link}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, link: e.target.value })
                }
                className="form-input"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Short Description
              </label>
              <textarea
                required
                rows={3}
                value={editingCard.description}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, description: e.target.value })
                }
                className="form-input"
                placeholder="Describe your content or activity on this platform..."
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={() => setEditingCard(null)}
                className="px-4 py-2 rounded-lg text-sm border border-white/10 text-text-secondary hover:text-text-primary transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 btn-gradient px-6 py-2 rounded-lg text-sm"
              >
                <Save size={16} />
                Save Card
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {showcase.map((card) => (
            <motion.div
              key={card.id}
              className="glass-card p-5 flex flex-col justify-between"
              whileHover={{ y: -2 }}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: `${card.iconColor}15` }}
                  >
                    <Share2 size={20} style={{ color: card.iconColor }} />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(card)}
                      className="p-1.5 rounded bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10 transition"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition animate-pulse-dot"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-1">
                  {card.platform}
                </h4>
                <div className="text-xs text-accent-purple font-medium mb-3">
                  {card.handle}
                </div>
                <p className="text-sm text-text-secondary line-clamp-2">
                  {card.description}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/[0.06] text-xs text-text-muted truncate">
                {card.link}
              </div>
            </motion.div>
          ))}
          {showcase.length === 0 && (
            <div className="col-span-full text-center py-12 glass-card">
              <p className="text-text-secondary text-sm">No showcase cards found. Add one to get started!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
