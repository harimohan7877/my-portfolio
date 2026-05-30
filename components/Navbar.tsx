"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePortfolioData } from "@/lib/DataContext";

export default function Navbar() {
  const { data } = usePortfolioData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  // Scroll shadow detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = data.navLinks.map((link) => link.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${id}`);
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [data.navLinks]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled ? "shadow-md shadow-slate-200/50 border-b border-slate-200/40" : "border-b border-slate-200/20"
        }`}
        style={{
          background: "rgba(248, 250, 252, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* LEFT — Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex-shrink-0"
          >
            <div className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center border border-accent-purple/10 bg-white/70 shadow-sm overflow-hidden group-hover:border-accent-purple/30 transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple">
                  <path d="M6 4v16M18 4v16M6 12h12" />
                  <path d="M6 20l6-7 6 7" stroke="url(#nav-logo-grad)" strokeWidth="2" opacity="0.85" />
                  <defs>
                    <linearGradient id="nav-logo-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse-dot" />
              </div>
              <span className="text-sm font-bold text-text-primary tracking-tight">
                Harimohan<span className="text-accent-purple">.</span>
              </span>
            </div>
          </a>

          {/* CENTER — Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {data.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.href
                    ? "gradient-text"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* RIGHT — Badge + CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Available badge — hidden on mobile */}
            <div
              className="hidden md:flex items-center gap-2 rounded-full px-3 py-1 text-xs"
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "#16A34A",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
              <span>Available for Work</span>
            </div>

            {/* Hire Me button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="btn-gradient rounded-lg px-5 py-2 text-sm"
            >
              Hire Me
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-bg-primary border-l border-slate-200/40 flex flex-col"
            >
              {/* Close button */}
              <div className="flex items-center justify-between p-4 h-16 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-lg flex items-center justify-center border border-accent-purple/10 bg-white/70 shadow-sm overflow-hidden">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple">
                      <path d="M6 4v16M18 4v16M6 12h12" />
                      <path d="M6 20l6-7 6 7" stroke="url(#mob-logo-grad)" strokeWidth="2" opacity="0.85" />
                      <defs>
                        <linearGradient id="mob-logo-grad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-text-primary">Harimohan</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-1.5 px-4 mt-4">
                {data.navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`text-base font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
                      activeSection === link.href
                        ? "gradient-text bg-accent-purple/5 font-semibold"
                        : "text-text-secondary hover:text-text-primary hover:bg-slate-100"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Mobile available badge */}
              <div className="px-4 mt-auto mb-8">
                <div
                  className="flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-xs"
                  style={{
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    color: "#16A34A",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                  <span>Available for Work</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
