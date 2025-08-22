"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import BlogSection from "@/components/blog-section";
import ParticlesBackground from "@/components/ui/particles-background";
import { useEffect, useState } from "react";

// Dynamically import Three.js component to avoid SSR issues
const ThreeBackground = dynamic(
  () => import("@/components/ui/three-background"),
  { ssr: false }
);

// Mock data for now - we'll fetch this client-side
const mockPosts = [
  {
    slug: "welcome-to-my-blog",
    title: "Welcome to My Tech Blog",
    date: "2025-01-22",
    excerpt: "Welcome to my personal blog where I share insights about modern web development, coding tips, and my journey as a full-stack developer.",
    tags: ["welcome", "blog", "tech", "development"],
    author: "wenhaogege",
    published: true,
    readingTime: 3,
  },
  {
    slug: "nextjs-app-router-guide",
    title: "Mastering Next.js App Router: A Complete Guide",
    date: "2025-01-20",
    excerpt: "Deep dive into Next.js App Router features, including nested layouts, server components, and advanced routing patterns.",
    tags: ["nextjs", "react", "app-router", "server-components"],
    author: "wenhaogege",
    published: true,
    readingTime: 8,
  },
];

export default function Home() {
  const [posts, setPosts] = useState(mockPosts);

  useEffect(() => {
    // Fetch posts from API
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        // Keep using mock data as fallback
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="relative min-h-screen bg-background text-foreground">
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
        
        <div id="about">
          <AboutSection />
        </div>
        
        <div id="projects">
          <ProjectsSection />
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
