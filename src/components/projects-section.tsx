"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Loader2 } from "lucide-react";
import ProjectCard from "@/components/project-card";
import NeonButton from "@/components/ui/neon-button";
import { fetchGitHubRepos } from "@/lib/github";

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