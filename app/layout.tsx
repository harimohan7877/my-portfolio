import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/lib/DataContext";

export const metadata: Metadata = {
  title: "Harimohan Sharma — AI Developer & Web Builder",
  description:
    "BCA student from Rajasthan building AI-powered websites, Instagram content, and automation. Real projects. Real results.",
  keywords: [
    "AI developer India",
    "freelance web developer Rajasthan",
    "Next.js developer",
    "Instagram reels creator",
    "n8n automation",
  ],
  openGraph: {
    title: "Harimohan Sharma — AI Developer",
    description: "I build with AI what takes teams weeks.",
    url: "https://your-portfolio.vercel.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-inter antialiased">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
