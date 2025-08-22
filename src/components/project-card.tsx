"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NeonButton from "@/components/ui/neon-button";

interface ProjectCardProps {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  index: number;
}

export default function ProjectCard({
  name,
  description,
  html_url,
  homepage,
  topics,
  stargazers_count,
  forks_count,
  language,
  updated_at,
  index,
}: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card className="group relative overflow-hidden border-cyan-500/20 bg-background/50 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 h-full">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
              {name}
            </CardTitle>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                <span>{forks_count}</span>
              </div>
            </div>
          </div>
          
          <CardDescription className="text-muted-foreground line-clamp-2 mb-3">
            {description || "No description available"}
          </CardDescription>

          {/* Language and date */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            {language && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                <span>{language}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Updated {formatDate(updated_at)}</span>
            </div>
          </div>

          {/* Topics/Tags */}
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {topics.slice(0, 3).map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20"
                >
                  {topic}
                </Badge>
              ))}
              {topics.length > 3 && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-muted/50 text-muted-foreground"
                >
                  +{topics.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="relative z-10 pt-0">
          <div className="flex gap-3">
            <NeonButton href={html_url} variant="primary" className="flex-1">
              View Code
            </NeonButton>
            {homepage && (
              <NeonButton href={homepage} variant="secondary">
                <ExternalLink className="w-4 h-4" />
                Demo
              </NeonButton>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}