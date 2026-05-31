"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Rocket,
  User,
  Briefcase,
  FolderOpen,
  Code2,
  Share2,
  MessageSquare,
  Mail,
  Settings,
  ExternalLink,
  Download,
  Menu,
  X,
  RotateCcw,
  Lock,
} from "lucide-react";
import { usePortfolioData } from "@/lib/DataContext";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/hero", icon: Rocket },
  { label: "About", href: "/admin/about", icon: User },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Skills", href: "/admin/skills", icon: Code2 },
  { label: "Showcase", href: "/admin/showcase", icon: Share2 },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Contact", href: "/admin/contact", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function getPageTitle(pathname: string): string {
  if (pathname === "/admin") return "Dashboard";
  const segment = pathname.replace("/admin/", "");
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { exportData, resetToDefault } = usePortfolioData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "harimohan787799";
    if (password === correctPassword) {
      sessionStorage.setItem("admin_auth", "true");
      sessionStorage.setItem("admin_password", password);
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect Password! Access Denied.");
    }
  };

  const handleExport = useCallback(() => {
    const json = exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [exportData]);

  const handleReset = useCallback(() => {
    resetToDefault();
    setShowResetConfirm(false);
  }, [resetToDefault]);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  // 1. Session verification fallback
  if (isChecking) {
    return (
      <div className="admin-theme min-h-screen flex items-center justify-center bg-bg-primary text-text-primary">
        <div className="text-sm font-semibold tracking-wide">Authenticating Session...</div>
      </div>
    );
  }

  // 2. Unauthenticated Login screen
  if (!isAuthenticated) {
    return (
      <div className="admin-theme min-h-screen flex items-center justify-center bg-bg-primary p-4 text-text-primary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 w-full max-w-md text-center"
        >
          <div className="w-16 h-16 rounded-full bg-accent-purple/10 flex items-center justify-center mx-auto mb-6 text-accent-purple">
            <Lock size={28} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Admin Dashboard</h2>
          <p className="text-text-secondary text-sm mb-6">
            Please enter your password to edit your portfolio.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="form-input text-center py-3 font-semibold text-lg tracking-widest bg-white/5 border-white/10"
              />
            </div>
            
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs font-semibold"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="btn-gradient w-full py-3.5 rounded-xl font-bold tracking-wide shadow-lg text-sm transition"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // 3. Authenticated Admin View
  return (
    <div className="admin-theme flex min-h-screen">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 min-h-screen bg-bg-secondary border-r border-white/[0.06] p-6 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white font-bold text-sm">
            HM
          </div>
          <div>
            <div className="text-sm font-semibold text-text-primary">Admin Panel</div>
            <div className="text-xs text-text-secondary">Portfolio Manager</div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-text-secondary hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  active
                    ? "bg-accent-purple/10 text-accent-purple"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="mt-auto pt-6 border-t border-white/[0.06] space-y-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all duration-200"
          >
            <ExternalLink size={18} />
            View Site
          </Link>
          <button
            onClick={handleExport}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all duration-200 w-full"
          >
            <Download size={18} />
            Export Data
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-white/[0.06] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-text-secondary hover:text-text-primary"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-text-primary">
              {getPageTitle(pathname)}
            </h1>
          </div>
          <div className="relative">
            {showResetConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-secondary">Are you sure?</span>
                <button
                  onClick={handleReset}
                  className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="text-xs text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-lg border border-white/10 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 transition"
              >
                <RotateCcw size={14} />
                Reset to Defaults
              </button>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
