"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { usePortfolioData } from "@/lib/DataContext";

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const { data } = usePortfolioData();
  const { contact } = data;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(contact.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="section-label">Contact</p>
          <h2 className="section-heading">Let&apos;s Build Something</h2>
          <p className="section-sub">
            Got a project? Let&apos;s talk. I reply within 24 hours.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* LEFT Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* WhatsApp Section */}
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              📱 WhatsApp (Fastest)
            </h3>

            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-xl px-6 py-4 text-center font-medium transition-colors"
            >
              <span className="flex items-center justify-center gap-3">
                {/* WhatsApp SVG Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Message me on WhatsApp
              </span>
            </a>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-slate-200/60" />
              <span className="text-text-muted text-sm font-medium">or reach me at</span>
              <div className="flex-1 h-px bg-slate-200/60" />
            </div>

            {/* Contact Links */}
            <div className="space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-text-secondary hover:text-accent-purple transition-colors duration-200 text-sm font-medium"
              >
                <span>📧</span>
                <span>Email</span>
                <span className="ml-auto text-text-muted">{contact.email}</span>
              </a>

              <a
                href={contact.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-accent-purple transition-colors duration-200 text-sm font-medium"
              >
                <span>🎬</span>
                <span>YouTube</span>
                <span className="ml-auto text-text-muted">{contact.youtube}</span>
              </a>

              <a
                href={contact.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-accent-purple transition-colors duration-200 text-sm font-medium"
              >
                <span>📸</span>
                <span>Instagram</span>
                <span className="ml-auto text-text-muted">{contact.instagram}</span>
              </a>

              <a
                href={contact.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-accent-purple transition-colors duration-200 text-sm font-medium"
              >
                <span>💻</span>
                <span>GitHub</span>
                <span className="ml-auto text-text-muted">{contact.github}</span>
              </a>
            </div>

            {/* Location Note */}
            <p className="mt-8 text-text-muted text-sm">
              {contact.locationNote}
            </p>
          </motion.div>

          {/* RIGHT Column — Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="glass-card p-6 md:p-8">
              {status === "sent" ? (
                /* Success State */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={48} className="text-[#22C55E] mb-4" />
                  <p className="text-text-primary text-lg font-semibold">
                    Message sent!
                  </p>
                  <p className="text-text-secondary text-sm mt-2">
                    I&apos;ll reply within 24 hours.
                  </p>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input mb-4"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input mb-4"
                  />

                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="form-input mb-4 appearance-none"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="AI-Powered Website">
                      AI-Powered Website
                    </option>
                    <option value="Instagram Content">Instagram Content</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="AI Content Writing">
                      AI Content Writing
                    </option>
                    <option value="Other">Other</option>
                  </select>

                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input mb-4 resize-none"
                  />

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-gradient w-full rounded-xl py-3.5 text-base font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Sending..." : "Send Message →"}
                  </button>

                  {status === "error" && (
                    <p className="text-red-400 text-sm mt-3 text-center">
                      Something went wrong. Please try again or reach out via
                      WhatsApp.
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
