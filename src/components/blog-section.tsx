"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import BlogCard from "@/components/blog-card";
import NeonButton from "@/components/ui/neon-button";
import { BlogPostMeta } from "@/lib/blog";

interface BlogSectionProps {
  posts: BlogPostMeta[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const recentPosts = posts.slice(0, 3);

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
            Latest Blog Posts
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on modern web development, technology trends, and my coding journey.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        {recentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {recentPosts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  {...post}
                  index={index}
                />
              ))}
            </div>

            {/* View All Posts Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <NeonButton href="/blog" variant="secondary">
                <BookOpen className="w-5 h-5" />
                View All Posts
                <ArrowRight className="w-4 h-4" />
              </NeonButton>
            </motion.div>
          </>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-4 text-muted-foreground">
              No Posts Yet
            </h3>
            <p className="text-muted-foreground mb-8">
              I'm working on some amazing content. Check back soon!
            </p>
            <NeonButton href="/contact" variant="primary">
              Get Notified
            </NeonButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}