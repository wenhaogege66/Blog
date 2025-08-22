import dynamic from "next/dynamic";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import BlogSection from "@/components/blog-section";
import ParticlesBackground from "@/components/ui/particles-background";
import { getAllPosts } from "@/lib/blog";

// Dynamically import Three.js component to avoid SSR issues
const ThreeBackground = dynamic(
  () => import("@/components/ui/three-background"),
  { ssr: false }
);

// Dynamically import client components that use the blog data
const ClientHeroSection = dynamic(() => import("@/components/hero-section"), { ssr: false });
const ClientAboutSection = dynamic(() => import("@/components/about-section"), { ssr: false });
const ClientProjectsSection = dynamic(() => import("@/components/projects-section"), { ssr: false });
const ClientNavigation = dynamic(() => import("@/components/navigation"), { ssr: false });

export default function Home() {
  const posts = getAllPosts();
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Animated Backgrounds */}
      <ThreeBackground />
      <ParticlesBackground />
      
      {/* Navigation */}
      <ClientNavigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <div id="home">
          <ClientHeroSection />
        </div>
        
        <div id="about">
          <ClientAboutSection />
        </div>
        
        <div id="projects">
          <ClientProjectsSection />
        </div>
        
        <div id="blog">
          <BlogSection posts={posts} />
        </div>
        
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
