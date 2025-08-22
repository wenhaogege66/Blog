import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  image?: string;
  published: boolean;
  content: string;
  readingTime: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  image?: string;
  published: boolean;
  readingTime: number;
}

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time (approximate)
    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200); // 200 words per minute

    return {
      slug: realSlug,
      title: data.title || "",
      date: data.date || "",
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      author: data.author || "wenhaogege",
      image: data.image,
      published: data.published ?? true,
      content,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  // Return only metadata, not full content
  return posts.map(({ content, ...meta }) => meta);
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const allPosts = getAllPosts();
  const tagCounts: Record<string, number> = {};

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      const normalizedTag = tag.toLowerCase();
      tagCounts[normalizedTag] = (tagCounts[normalizedTag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return result.toString();
}

export function getRecentPosts(limit: number = 5): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostMeta[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);
  
  // Find posts with similar tags
  const relatedPosts = allPosts
    .map((post) => {
      const commonTags = post.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      ).length;
      return { ...post, commonTags };
    })
    .filter((post) => post.commonTags > 0)
    .sort((a, b) => b.commonTags - a.commonTags)
    .slice(0, limit);

  // If we don't have enough related posts, fill with recent posts
  if (relatedPosts.length < limit) {
    const additionalPosts = allPosts
      .filter((post) => !relatedPosts.find((rp) => rp.slug === post.slug))
      .slice(0, limit - relatedPosts.length);
    
    return [...relatedPosts, ...additionalPosts];
  }

  return relatedPosts;
}