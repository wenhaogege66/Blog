import { getAllPosts, getAllTags } from "@/lib/blog";
import BlogCard from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Tag } from "lucide-react";

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Blog Posts
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on modern web development, technology trends, and my coding journey.
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-cyan-400">Topics</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map(({ tag, count }) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20 cursor-pointer"
                >
                  {tag} ({count})
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard
                key={post.slug}
                {...post}
                index={index}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-4 text-muted-foreground">
              No Posts Yet
            </h3>
            <p className="text-muted-foreground">
              I'm working on some amazing content. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}