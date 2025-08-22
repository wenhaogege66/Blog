import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, markdownToHtml, getRelatedPosts, getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/blog-card";
import NeonButton from "@/components/ui/neon-button";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const htmlContent = await markdownToHtml(post.content);
  const relatedPosts = getRelatedPosts(params.slug);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="mb-16">
          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <Tag className="w-4 h-4 text-cyan-400" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-invert prose-cyan max-w-none prose-headings:text-cyan-400 prose-links:text-cyan-400 prose-code:text-cyan-300 prose-pre:bg-slate-800 prose-pre:border prose-pre:border-cyan-500/20"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-cyan-500/20 pt-16">
            <h2 className="text-2xl font-bold mb-8 text-cyan-400">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard
                  key={relatedPost.slug}
                  {...relatedPost}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 pt-16 border-t border-cyan-500/20">
          <h3 className="text-2xl font-bold mb-4 text-cyan-400">
            Enjoyed this post?
          </h3>
          <p className="text-muted-foreground mb-6">
            Check out more posts or get in touch to discuss your projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NeonButton href="/blog" variant="secondary">
              More Posts
            </NeonButton>
            <NeonButton href="/contact" variant="primary">
              Get In Touch
            </NeonButton>
          </div>
        </div>
      </div>
    </div>
  );
}