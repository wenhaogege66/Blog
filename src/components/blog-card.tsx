"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPostMeta } from "@/lib/blog";
import Link from "next/link";

interface BlogCardProps extends BlogPostMeta {
  index: number;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  tags,
  author,
  readingTime,
  index,
}: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
      <Link href={`/blog/${slug}`}>
        <Card className="group relative overflow-hidden border-cyan-500/20 bg-background/50 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 h-full cursor-pointer">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
            
            <CardTitle className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors line-clamp-2">
              {title}
            </CardTitle>
            
            <CardDescription className="text-muted-foreground line-clamp-3 mt-2">
              {excerpt}
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            {/* Author */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20"
                  >
                    {tag}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-muted/50 text-muted-foreground"
                  >
                    +{tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Read More */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors font-medium">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </CardContent>

          {/* Hover effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </Card>
      </Link>
    </motion.div>
  );
}