"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ParticlesBackground from "@/components/ui/particles-background";

// Dynamically import Three.js component to avoid SSR issues
const ThreeBackground = dynamic(
  () => import("@/components/ui/three-background"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Animated Backgrounds */}
      <ThreeBackground />
      <ParticlesBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <div id="home">
          <HeroSection />
        </div>
        
        {/* Placeholder sections for future development */}
        <section id="about" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-muted-foreground text-lg">Coming soon...</p>
          </div>
        </section>
        
        <section id="projects" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </h2>
            <p className="text-muted-foreground text-lg">Coming soon...</p>
          </div>
        </section>
        
        <section id="blog" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Blog
            </h2>
            <p className="text-muted-foreground text-lg">Coming soon...</p>
          </div>
        </section>
        
        <section id="contact" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Contact
            </h2>
            <p className="text-muted-foreground text-lg">Coming soon...</p>
          </div>
        </section>
      </main>
    </div>
  );
}
