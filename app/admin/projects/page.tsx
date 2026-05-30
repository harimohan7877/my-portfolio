"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Check, Pencil, X } from "lucide-react";
import { usePortfolioData } from "@/lib/DataContext";
import { Project } from "@/lib/types";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true, margin: "-50px" },
};

const categoryOptions: Project["category"][] = ["Websites", "Content", "Automation"];

const emptyProject: Project = {
  id: "",
  status: "",
  statusColor: "#22C55E",
  title: "",
  description: "",
  techStack: [],
  category: "Websites",
  link: { text: "", href: "" },
  imageUrl: "",
};

export default function ProjectsEditor() {
  const { data, updateSection } = usePortfolioData();
  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Project>(emptyProject);
  const [techInput, setTechInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setProjects(data.projects);
  }, [data.projects]);

  const openEdit = (project: Project) => {
    setEditingId(project.id);
    setForm(project);
    setTechInput(project.techStack.join(", "));
  };

  const openNew = () => {
    const newId = `p${Date.now()}`;
    const newProject = { ...emptyProject, id: newId };
    setEditingId(newId);
    setForm(newProject);
    setTechInput("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyProject);
    setTechInput("");
  };

  const saveProject = () => {
    const updatedProject = {
      ...form,
      techStack: techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const exists = projects.find((p) => p.id === updatedProject.id);
    let updated: Project[];
    if (exists) {
      updated = projects.map((p) =>
        p.id === updatedProject.id ? updatedProject : p
      );
    } else {
      updated = [...projects, updatedProject];
    }

    setProjects(updated);
    updateSection("projects", updated);
    setEditingId(null);
    setForm(emptyProject);
    setTechInput("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    updateSection("projects", updated);
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
              Edit Projects
            </h2>
            <p className="text-text-secondary text-sm">
              Manage your portfolio projects.
            </p>
          </div>
          <button
            onClick={openNew}
            className="border border-dashed border-white/20 text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-purple hover:text-accent-purple transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Project
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
                {projects.find((p) => p.id === editingId)
                  ? "Edit Project"
                  : "New Project"}
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
                  Status Text
                </label>
                <input
                  type="text"
                  value={form.status}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder="🟢 Live"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Status Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.statusColor}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, statusColor: e.target.value }))
                    }
                    className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent shrink-0"
                  />
                  <input
                    type="text"
                    value={form.statusColor}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, statusColor: e.target.value }))
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
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
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
                  Tech Stack (comma-separated)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder="Next.js, MongoDB, Vercel"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      category: e.target.value as Project["category"],
                    }))
                  }
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#0e0e1a]">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Link Text
                </label>
                <input
                  type="text"
                  value={form.link.text}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      link: { ...prev.link, text: e.target.value },
                    }))
                  }
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder="View Live"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Link URL
                </label>
                <input
                  type="text"
                  value={form.link.href}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      link: { ...prev.link, href: e.target.value },
                    }))
                  }
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-text-secondary mb-3 block">
                Project Image (Optional)
              </label>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                {form.imageUrl && (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <img
                      src={form.imageUrl}
                      alt="Project Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, imageUrl: "" }))}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center text-red-400 opacity-0 hover:opacity-100 transition-opacity text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <div className="flex-1 w-full space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement("canvas");
                            let width = img.width;
                            let height = img.height;
                            const MAX_WIDTH = 600;
                            if (width > MAX_WIDTH) {
                              height = Math.round((height * MAX_WIDTH) / width);
                              width = MAX_WIDTH;
                            }
                            canvas.width = width;
                            canvas.height = height;
                            const ctx = canvas.getContext("2d");
                            if (ctx) {
                              ctx.drawImage(img, 0, 0, width, height);
                              setForm((prev) => ({
                                ...prev,
                                imageUrl: canvas.toDataURL("image/jpeg", 0.7),
                              }));
                            }
                          };
                          img.src = event.target?.result as string;
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="hidden"
                      id="project-file-upload"
                    />
                    <label
                      htmlFor="project-file-upload"
                      className="cursor-pointer bg-white/5 border border-white/10 hover:border-accent-purple hover:bg-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm font-semibold transition inline-flex items-center justify-center gap-2 text-center"
                    >
                      Upload Project Screenshot
                    </label>
                    {form.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, imageUrl: "" }))}
                        className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-lg px-4 py-2.5 text-sm transition font-semibold"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={form.imageUrl || ""}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                    }
                    placeholder="Or paste an image URL (e.g. /projects/aasha.png)"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 w-full transition"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={saveProject}
                className="btn-gradient px-6 py-2.5 rounded-lg text-sm"
              >
                Save Project
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

      {/* Projects list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="glass-card p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${project.statusColor}15`,
                    color: project.statusColor,
                  }}
                >
                  {project.status}
                </span>
                <span className="text-xs text-text-muted bg-white/5 px-2 py-0.5 rounded">
                  {project.category}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEdit(project)}
                  className="text-text-secondary hover:text-accent-purple p-1.5 rounded-lg hover:bg-white/5 transition"
                >
                  <Pencil size={14} />
                </button>
                {deleteConfirm === project.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteProject(project.id)}
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
                    onClick={() => setDeleteConfirm(project.id)}
                    className="text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
            <h3 className="text-sm font-semibold text-text-primary mb-1">
              {project.title}
            </h3>
            <p className="text-xs text-text-secondary mb-3 line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-white/5 text-text-secondary px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-text-secondary text-sm">
            No projects yet. Click &quot;Add Project&quot; to create one.
          </p>
        </div>
      )}
    </div>
  );
}
