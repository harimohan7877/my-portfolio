"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioData } from "@/lib/DataContext";
import { ContactInfo } from "@/lib/types";
import { Save, Sparkles, Mail, MessageSquare, ShieldAlert } from "lucide-react";
import { Youtube, Github, Instagram } from "@/components/icons";

export default function AdminContact() {
  const { data, updateSection } = usePortfolioData();
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (data?.contact) {
      setContact({ ...data.contact });
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact) {
      updateSection("contact", contact);
      triggerToast();
    }
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  if (!contact) return <div className="text-text-secondary text-sm">Loading...</div>;

  return (
    <div className="max-w-3xl">
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
            Contact Info Saved!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-1">Contact Information</h2>
        <p className="text-text-secondary text-sm">
          Update the contact methods, form receiver endpoint, and social media handles.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Direct Channels */}
        <div className="glass-card p-6">
          <h3 className="text-md font-semibold text-text-primary mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-accent-purple" />
            Core Channels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                WhatsApp Link API URL
              </label>
              <input
                type="text"
                required
                value={contact.whatsappLink}
                onChange={(e) =>
                  setContact({ ...contact, whatsappLink: e.target.value })
                }
                className="form-input"
                placeholder="https://wa.me/919950252138"
              />
              <span className="text-xs text-text-muted mt-1 block">
                Direct WhatsApp link with international country code.
              </span>
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Contact Email
              </label>
              <input
                type="email"
                required
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="form-input"
                placeholder="hm@example.com"
              />
              <span className="text-xs text-text-muted mt-1 block">
                Email address shown on the contact details card.
              </span>
            </div>
          </div>
        </div>

        {/* Social Profile Details */}
        <div className="glass-card p-6">
          <h3 className="text-md font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Github size={18} className="text-accent-blue" />
            Social Profiles & Links
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  GitHub Username
                </label>
                <input
                  type="text"
                  required
                  value={contact.github}
                  onChange={(e) => setContact({ ...contact, github: e.target.value })}
                  className="form-input"
                  placeholder="harimohan7877"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  GitHub Full Link URL
                </label>
                <input
                  type="url"
                  required
                  value={contact.githubLink}
                  onChange={(e) => setContact({ ...contact, githubLink: e.target.value })}
                  className="form-input"
                  placeholder="https://github.com/harimohan7877"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  YouTube Username/Handle
                </label>
                <input
                  type="text"
                  required
                  value={contact.youtube}
                  onChange={(e) => setContact({ ...contact, youtube: e.target.value })}
                  className="form-input"
                  placeholder="@creationhub-b4e"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  YouTube Full Link URL
                </label>
                <input
                  type="url"
                  required
                  value={contact.youtubeLink}
                  onChange={(e) => setContact({ ...contact, youtubeLink: e.target.value })}
                  className="form-input"
                  placeholder="https://youtube.com/@creationhub-b4e"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Instagram Username
                </label>
                <input
                  type="text"
                  required
                  value={contact.instagram}
                  onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
                  className="form-input"
                  placeholder="@harimohan_2006"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Instagram Full Link URL
                </label>
                <input
                  type="url"
                  required
                  value={contact.instagramLink}
                  onChange={(e) => setContact({ ...contact, instagramLink: e.target.value })}
                  className="form-input"
                  placeholder="https://www.instagram.com/harimohan_2006"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Formspree & Location settings */}
        <div className="glass-card p-6">
          <h3 className="text-md font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Mail size={18} className="text-accent-cyan" />
            Backend Forms & Location
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Formspree.io Action URL
              </label>
              <input
                type="text"
                required
                value={contact.formspreeEndpoint}
                onChange={(e) =>
                  setContact({ ...contact, formspreeEndpoint: e.target.value })
                }
                className="form-input text-accent-cyan"
                placeholder="https://formspree.io/f/XXXXXXXX"
              />
              <span className="text-xs text-text-muted mt-1.5 block flex items-start gap-1">
                <ShieldAlert size={14} className="mt-0.5 shrink-0" />
                Go to Formspree.io, create a free form dashboard, and paste the URL here.
              </span>
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Location & Work availability Tagline
              </label>
              <input
                type="text"
                required
                value={contact.locationNote}
                onChange={(e) =>
                  setContact({ ...contact, locationNote: e.target.value })
                }
                className="form-input"
                placeholder="Based in Rajasthan, India. Available for remote work."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 btn-gradient px-8 py-3 rounded-xl font-semibold shadow-lg text-sm"
          >
            <Save size={18} />
            Save Contact Details
          </button>
        </div>
      </form>
    </div>
  );
}
