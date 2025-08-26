"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Loader2, ExternalLink, Star, Code, Smartphone, Heart } from "lucide-react";
import ProjectCard from "@/components/project-card";
import NeonButton from "@/components/ui/neon-button";
import { fetchGitHubRepos } from "@/lib/github";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        const data = await fetchGitHubRepos();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my latest work, open-source contributions, and experiments with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Featured Project - Medeo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="border-gradient-to-r border-cyan-500/30 bg-background/50 backdrop-blur-sm overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Project Image/Preview */}
                <div className="relative bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-blue-900/10 p-8 flex items-center justify-center min-h-[400px] overflow-hidden">
                  {/* Animated background elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-3/4 left-1/2 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                  </div>
                  
                  {/* Main image container */}
                  <div className="relative z-10 w-full max-w-lg">
                    <div className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20 shadow-2xl">
                      <Image
                        src="/app.avif"
                        alt="Medeo App Screenshot"
                        width={400}
                        height={400}
                        className="w-full h-auto object-contain rounded-2xl drop-shadow-2xl"
                        priority
                      />
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50"></div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                        Medeo App
                      </h3>
                      <p className="text-lg text-cyan-300 mb-2">AI Video Generation & Editing Tool</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>Featured Project</span>
                      </div>
                    </div>
                    <a 
                      href="https://www.medeo.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors group"
                    >
                      <ExternalLink className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    An innovative AI-powered video generation and editing platform that leverages cutting-edge artificial intelligence 
                    to create, enhance, and edit videos. Features intelligent scene generation, automated editing workflows, 
                    and advanced AI-driven video enhancement capabilities for content creators and professionals.
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Heart className="w-3 h-3 text-red-400" />
                        AI Video Generation
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Code className="w-3 h-3 text-cyan-400" />
                        Smart Editing Tools
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Smartphone className="w-3 h-3 text-purple-400" />
                        Scene Generation
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 text-yellow-400" />
                        AI Enhancement
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {["AI/ML", "Computer Vision", "Video Processing", "React", "Python", "Machine Learning"].map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a 
                    href="https://www.medeo.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    Visit Medeo App
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* GitHub Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Open Source Projects
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my contributions to the open source community and personal projects on GitHub.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
              <span className="text-muted-foreground">Loading projects from GitHub...</span>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-red-400 mb-4">
              <Github className="w-12 h-12 mx-auto mb-2" />
              <p>Failed to load projects</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && !error && repos.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {repos.slice(0, 6).map((repo, index) => (
                <ProjectCard
                  key={repo.id}
                  {...repo}
                  index={index}
                />
              ))}
            </div>

            {/* View More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <NeonButton href="https://github.com/wenhaogege66" variant="secondary">
                <Github className="w-5 h-5" />
                View All Projects on GitHub
              </NeonButton>
            </motion.div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && repos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Github className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No projects found</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}