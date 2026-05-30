"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioData } from "@/lib/DataContext";
import { SocialLink } from "@/lib/types";
import { Save, Sparkles, Download, Upload, Trash2, Plus, AlertTriangle, RotateCcw } from "lucide-react";

export default function AdminSettings() {
  const { data, updateSection, resetToDefault, exportData, importData } = usePortfolioData();
  const [siteName, setSiteName] = useState("");
  const [tagline, setTagline] = useState("");
  const [footerNote, setFooterNote] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [importJson, setImportJson] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (data?.siteSettings) {
      setSiteName(data.siteSettings.siteName);
      setTagline(data.siteSettings.tagline);
      setFooterNote(data.siteSettings.footerNote);
    }
    if (data?.socialLinks) {
      setSocialLinks([...data.socialLinks]);
    }
  }, [data]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("siteSettings", {
      siteName,
      tagline,
      footerNote,
    });
    triggerToast("General Settings Saved!");
  };

  const handleSaveSocials = () => {
    updateSection("socialLinks", socialLinks);
    triggerToast("Social Links Saved!");
  };

  const handleAddSocial = () => {
    setSocialLinks([
      ...socialLinks,
      { platform: "github", href: "https://", label: "My Profile" },
    ]);
  };

  const handleRemoveSocial = (index: number) => {
    const updated = socialLinks.filter((_, idx) => idx !== index);
    setSocialLinks(updated);
  };

  const handleSocialChange = (index: number, key: keyof SocialLink, val: string) => {
    const updated = socialLinks.map((link, idx) =>
      idx === index ? { ...link, [key]: val } : link
    );
    setSocialLinks(updated);
  };

  const handleExport = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${siteName.toLowerCase().replace(/\s+/g, "-")}-portfolio.json`;
    link.click();
    URL.revokeObjectURL(url);
    triggerToast("JSON Export Initiated!");
  };

  const handleImport = () => {
    if (!importJson.trim()) {
      alert("Please paste some valid JSON data first.");
      return;
    }
    const success = importData(importJson);
    if (success) {
      triggerToast("Data Imported Successfully!");
      setImportJson("");
    } else {
      alert("Failed to parse JSON. Please make sure the structure is correct.");
    }
  };

  const handleResetData = () => {
    resetToDefault();
    setShowResetConfirm(false);
    triggerToast("Data Reset to Default!");
  };

  return (
    <div className="max-w-4xl space-y-6">
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
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-1">Global settings</h2>
        <p className="text-text-secondary text-sm">
          Backup, import data, reset configurations, and manage basic site properties.
        </p>
      </div>

      {/* General Settings */}
      <form onSubmit={handleSaveGeneral} className="glass-card p-6">
        <h3 className="text-md font-semibold text-text-primary mb-4">General Settings</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Site Name (Appears in title/branding)
              </label>
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="form-input"
                placeholder="e.g. Harimohan Sharma"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Short Footer Note / copyright
              </label>
              <input
                type="text"
                required
                value={footerNote}
                onChange={(e) => setFooterNote(e.target.value)}
                className="form-input"
                placeholder="Built with Next.js + AI • 2025"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">
              Default Site Description/Tagline
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="form-input"
              placeholder="AI Developer • Content Creator • Rajasthan, India"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 btn-gradient px-4 py-2 rounded-lg text-sm"
          >
            <Save size={16} />
            Save General Settings
          </button>
        </div>
      </form>

      {/* Social Links List */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-text-primary">Header/Footer Social Links</h3>
          <button
            onClick={handleAddSocial}
            className="flex items-center gap-2 border border-dashed border-white/20 text-text-secondary hover:text-accent-purple hover:border-accent-purple px-3 py-1.5 rounded-lg text-xs transition"
          >
            <Plus size={14} />
            Add Social Link
          </button>
        </div>

        <div className="space-y-3">
          {socialLinks.map((link, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-3 items-center">
              <div className="w-full md:w-1/4">
                <input
                  type="text"
                  required
                  value={link.platform}
                  onChange={(e) => handleSocialChange(idx, "platform", e.target.value)}
                  className="form-input text-xs"
                  placeholder="Platform (e.g. github, youtube)"
                />
              </div>
              <div className="w-full md:w-1/3">
                <input
                  type="text"
                  required
                  value={link.label}
                  onChange={(e) => handleSocialChange(idx, "label", e.target.value)}
                  className="form-input text-xs"
                  placeholder="Label (e.g. GitHub)"
                />
              </div>
              <div className="w-full md:flex-1">
                <input
                  type="url"
                  required
                  value={link.href}
                  onChange={(e) => handleSocialChange(idx, "href", e.target.value)}
                  className="form-input text-xs"
                  placeholder="https://..."
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSocial(idx)}
                className="p-2.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {socialLinks.length === 0 && (
            <p className="text-text-muted text-xs italic py-2 text-center">
              No social links configured.
            </p>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSaveSocials}
            className="flex items-center gap-2 btn-gradient px-4 py-2 rounded-lg text-sm"
          >
            <Save size={16} />
            Save Social Links
          </button>
        </div>
      </div>

      {/* Export & Import Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-semibold text-text-primary mb-2">Export Data Backup</h3>
            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              Download your entire portfolio configuration (About, Projects, Services, Settings) as a JSON file. Keep it safe as a backup.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 btn-outline py-3 px-4 rounded-xl text-sm font-semibold w-full mt-4"
          >
            <Download size={16} />
            Export Portfolio JSON
          </button>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-md font-semibold text-text-primary mb-2">Import Data Restore</h3>
          <p className="text-xs text-text-secondary mb-3 leading-relaxed">
            Paste a valid portfolio JSON export below to restore your configurations.
          </p>
          <textarea
            rows={4}
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            placeholder='Paste JSON content here...'
            className="form-input text-xs font-mono mb-3"
          />
          <button
            onClick={handleImport}
            className="flex items-center justify-center gap-2 btn-gradient py-2.5 px-4 rounded-lg text-xs font-semibold w-full"
          >
            <Upload size={14} />
            Restore from JSON
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6">
        <h3 className="text-md font-semibold text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle size={18} />
          Danger Zone
        </h3>
        <p className="text-xs text-text-secondary mb-6 leading-relaxed">
          Resetting will wipe out all customizations you made via this dashboard and restore all cards, testimonials, and links back to the original default setup.
        </p>

        {showResetConfirm ? (
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-bg-primary p-4 rounded-xl border border-white/5">
            <span className="text-xs text-red-400 font-medium">Are you absolutely sure? This cannot be undone!</span>
            <div className="flex gap-2 sm:ml-auto w-full sm:w-auto">
              <button
                onClick={handleResetData}
                className="flex-1 sm:flex-none text-xs bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Yes, Wipe Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 sm:flex-none text-xs text-text-secondary hover:text-text-primary bg-white/5 border border-white/10 px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/25 py-2.5 px-4 rounded-xl text-xs font-semibold"
          >
            <RotateCcw size={14} />
            Reset all Portfolio Data to Defaults
          </button>
        )}
      </div>
    </div>
  );
}
