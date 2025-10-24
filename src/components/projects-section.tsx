"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Loader2, ExternalLink, Star, Code, Smartphone, Heart } from "lucide-react";
import ProjectCard from "@/components/project-card";
import NeonButton from "@/components/ui/neon-button";
import { fetchGitHubRepos } from "@/lib/github";
import { Card, CardContent } from "@/components/ui/card";
import LazyImage from "@/components/ui/lazy-image";

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
                {/* Project Image/Preview - Modern Clean Design */}
                <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8 sm:p-12 flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                  {/* Animated gradient orbs */}
                  <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                  {/* Image container */}
                  <div className="relative z-10 w-full max-w-md">
                    <div className="relative group">
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Main image */}
                      <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-4 border border-cyan-500/20 backdrop-blur-sm shadow-2xl">
                        <LazyImage
                          src="/app.avif"
                          alt="Medeo App Screenshot"
                          width={1000}
                          height={1000}
                          className="w-full h-auto object-contain rounded-xl"
                          priority
                          unoptimized
                        />
                      </div>

                      {/* Floating badge */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
                        Featured
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-4 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
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

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    An innovative AI-powered video generation and editing platform that leverages cutting-edge artificial intelligence
                    to create, enhance, and edit videos. Features intelligent scene generation, automated editing workflows,
                    and advanced AI-driven video enhancement capabilities for content creators and professionals.
                  </p>

                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      My Role & Contributions
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      As a Software Engineer at Medeo, I focused on <span className="text-cyan-400 font-medium">Infrastructure Backend Development</span>,
                      designing and implementing scalable backend systems. I worked extensively on <span className="text-cyan-400 font-medium">AI Workflow
                      Orchestration</span>, building robust pipelines for video processing and generation. Additionally, I contributed to
                      <span className="text-cyan-400 font-medium"> AI Agent Development</span>, creating intelligent agents that automate
                      complex video editing tasks and enhance user experience.
                    </p>
                  </div>

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