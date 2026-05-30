"use client";

import { motion } from "framer-motion";
import { usePortfolioData } from "@/lib/DataContext";

export default function Testimonial() {
  const { data } = usePortfolioData();
  const testimonial = data.testimonials[0];

  if (!testimonial) return null;

  return (
    <section id="testimonial" className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header — Centered */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="section-label">Client</p>
          <h2 className="section-heading">What My Client Says</h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          className="glass-card p-8 md:p-10 max-w-[680px] mx-auto mt-12 relative"
        >
          {/* Large Quote Mark */}
          <span
            className="absolute top-6 left-6 text-5xl font-serif select-none"
            style={{ color: "rgba(124,58,237,0.3)" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Quote Text */}
          <p className="italic text-text-primary text-lg leading-relaxed pt-8">
            {testimonial.quote}
          </p>

          {/* Author Section */}
          <div className="flex items-center gap-4 mt-8">
            {/* Avatar */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ background: "var(--gradient-hero)" }}
            >
              {testimonial.authorInitials}
            </div>

            {/* Name & Role */}
            <div>
              <p className="font-semibold text-text-primary">
                {testimonial.authorName}
              </p>
              <p className="text-sm text-text-secondary">
                {testimonial.authorRole}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Note Below Card */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mt-6 text-text-muted text-xs"
        >
          {testimonial.note}
        </motion.p>
      </div>
    </section>
  );
}
