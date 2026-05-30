"use client";

import { usePortfolioData } from "@/lib/DataContext";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function getSocialIcon(platform: string, size = 16) {
  switch (platform) {
    case "github":
      return <GithubIcon size={size} />;
    case "youtube":
      return <YoutubeIcon size={size} />;
    case "instagram":
    case "instagram2":
      return <InstagramIcon size={size} />;
    default:
      return <GithubIcon size={size} />;
  }
}

export default function Footer() {
  const { data } = usePortfolioData();

  return (
    <footer
      className="py-10 border-t border-slate-200/40"
      style={{
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left — Logo + Name */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center border border-accent-purple/10 bg-white shadow-sm overflow-hidden">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple">
                <path d="M6 4v16M18 4v16M6 12h12" />
                <path d="M6 20l6-7 6 7" stroke="url(#footer-logo-grad)" strokeWidth="2" opacity="0.85" />
                <defs>
                  <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div>
              <p className="font-semibold text-text-primary">
                {data.siteSettings.siteName}
              </p>
              <p className="text-text-muted text-sm">
                {data.siteSettings.tagline}
              </p>
            </div>
          </div>

          {/* Right — Built With + Socials */}
          <div className="text-text-muted text-sm text-center md:text-right">
            <p>{data.siteSettings.footerNote}</p>
            <div className="flex gap-4 mt-2 justify-center md:justify-end">
              {data.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-text-muted hover:text-accent-purple transition-colors duration-200"
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-6 border-t border-slate-200/40"
        />

        {/* Bottom */}
        <p className="text-center text-text-muted text-xs">
          © 2025 {data.siteSettings.siteName}. Available for freelance work.
        </p>
      </div>
    </footer>
  );
}
