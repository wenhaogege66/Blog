import { Metadata } from "next";
import ExperienceSection from "@/components/experience-section";
import CursorTrail from "@/components/ui/cursor-trail";
import ClickRipple from "@/components/ui/click-ripple";

export const metadata: Metadata = {
  title: "Experience - Wenhao's Blog",
  description: "Professional experience and internships in tech industry, including Huawei and AI startup roles.",
  keywords: ["experience", "internship", "Huawei", "AI startup", "software engineer", "career"],
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3E%3Cpath d='m0 .5 32 32M31.5 0 0 32'/%3E%3C/svg%3E")`
      }}></div>
      
      {/* Cursor Effects */}
      <CursorTrail />
      <ClickRipple />
      
      <div className="relative z-10">
        <ExperienceSection />
      </div>
    </main>
  );
}