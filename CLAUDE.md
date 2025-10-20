# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern personal blog built with Next.js 15 (App Router), designed with a tech-focused aesthetic and personal branding elements. The blog uses a file-based content system with Markdown/MDX for articles and integrates with GitHub API for showcasing projects.

## Tech Stack

- **Frontend**: Next.js 15.5.0 with App Router, React 19.1.0, TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Animations**: Framer Motion 12 for interactive effects
- **3D Graphics**: Three.js + React Three Fiber for immersive backgrounds
- **Content**: Markdown/MDX files in `/content` directory, parsed with gray-matter
- **Icons**: Lucide React
- **Deployment**: Vercel with custom domain
- **Server**: Alibaba Cloud ECS (Ubuntu 22.04) at 47.99.201.130

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (with Turbopack)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Project Structure

```
/
├── src/
│   ├── app/                    # Next.js 15 App Router pages
│   │   ├── page.tsx           # Homepage with all sections
│   │   ├── blog/              # Blog listing and article pages
│   │   │   ├── page.tsx       # Blog index
│   │   │   └── [slug]/        # Dynamic blog post pages
│   │   └── experience/        # Experience timeline page
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── personal-gallery.tsx  # Photo gallery with lightbox
│   │   │   ├── three-background.tsx  # 3D background
│   │   │   ├── particles-background.tsx
│   │   │   ├── cursor-trail.tsx
│   │   │   └── ...
│   │   ├── about-section.tsx  # About page with gallery
│   │   ├── hero-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── blog-section.tsx
│   │   ├── contact-section.tsx
│   │   └── navigation.tsx
│   └── lib/                   # Utility functions and configurations
│       ├── blog.ts           # Blog post parsing utilities
│       └── utils.ts          # General utilities
├── public/                    # Static assets
│   ├── personal/             # Personal photo gallery images
│   │   ├── 鬼灭1.jpg
│   │   ├── 鬼灭2.jpg
│   │   ├── 鬼灭3.jpg
│   │   ├── 进击.jpg
│   │   ├── 上海行1.jpg
│   │   ├── 上海行2.jpg
│   │   ├── 瓦.jpg
│   │   └── 舟山.jpg
│   ├── wenhaogege.jpeg       # Profile picture
│   └── ...                   # Other static assets
├── content/                   # Markdown blog posts
│   └── posts/
└── styles/                    # Global styles and Tailwind config
```

## Key Features

### 1. Personal Photo Gallery
- **Location**: Integrated into About Section (`src/components/about-section.tsx`)
- **Component**: `src/components/ui/personal-gallery.tsx`
- **Features**:
  - Responsive grid layout (2/3/4 columns based on screen size)
  - Lightbox modal with keyboard navigation (←/→/ESC)
  - Image counter and captions
  - Smooth animations with Framer Motion
  - Next.js Image optimization
- **Adding Photos**: Simply add images to `public/personal/` and update the `galleryImages` array in `personal-gallery.tsx`

### 2. Content Management
- Blog posts are stored as Markdown files in `/content/posts/`
- Frontmatter format:
  ```yaml
  ---
  title: "Post Title"
  date: "2025-01-22"
  excerpt: "Brief description"
  tags: ["tech", "personal"]
  published: true
  readingTime: 5
  ---
  ```
- Use `gray-matter` for parsing frontmatter
- MDX support for embedding React components in content
- Blog utilities in `src/lib/blog.ts` for fetching and parsing posts

### 3. Interactive UI Elements
- **Cursor Effects**: Custom cursor trail and click ripples
- **3D Background**: Three.js animated background with particles
- **Smooth Animations**: Framer Motion for page transitions and scroll animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme Toggle**: Dark/light mode support

### 4. GitHub Integration
- Fetch repositories via GitHub API
- Display tech stack, stars, and project links
- Cache API responses for performance
- Located in Projects Section

## Styling Guidelines

- Use shadcn/ui components as base, customize with Tailwind
- Consistent color scheme: dark backgrounds with cyan/blue accents
- Primary accent: `cyan-400`, secondary: `purple-600`
- Framer Motion for page transitions and interactive elements
- Typography: Clean, modern fonts for readability
- Border styling: `border-cyan-500/20` for subtle borders

## Component Patterns

### Page Structure
```tsx
// Standard page component pattern
export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      {/* Navigation */}
      {/* Main content */}
      {/* Footer/Contact */}
    </div>
  );
}
```

### Section Structure
```tsx
// Standard section component pattern
export default function Section() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Section content */}
      </motion.div>
    </section>
  );
}
```

## Performance Considerations

- Use `dynamic()` from `next/dynamic` for heavy components (Three.js, etc.)
- Set `{ ssr: false }` for client-only components
- Optimize images with Next.js Image component
- Use `priority` prop for above-the-fold images
- Implement lazy loading for below-the-fold content
- Static generation for blog posts when possible

## SEO Optimization

- Proper meta tags in layout and page components
- Structured data for blog posts
- Semantic HTML structure
- Alt tags for all images
- Clean URLs with meaningful slugs

## Server Configuration

- Ubuntu 22.04 on Alibaba Cloud ECS
- IP: 47.99.201.130
- SSH access configured with key-based authentication
- Suitable for hosting additional services if needed
- Main deployment is on Vercel for optimal performance

## Development Workflow

1. **Local Development**: Use `pnpm dev` with Turbopack for fast refresh
2. **Content Creation**: Add Markdown files to `content/posts/`
3. **Component Development**: Create components in `src/components/`
4. **Styling**: Use Tailwind utility classes, avoid custom CSS when possible
5. **Testing**: Run `pnpm build` before deploying to catch errors
6. **Deployment**: Push to main branch for automatic Vercel deployment

## Best Practices

- **TypeScript**: Use strict mode, define proper types for all components
- **React Hooks**: Follow rules of hooks, use custom hooks for reusable logic
- **Performance**: Memoize expensive calculations with `useMemo`/`useCallback`
- **Accessibility**: Include proper ARIA labels and keyboard navigation
- **Error Handling**: Implement error boundaries for client components
- **Code Organization**: Keep components focused and single-responsibility

## Common Tasks

### Adding a New Blog Post
1. Create `content/posts/your-post.md`
2. Add frontmatter with required fields
3. Write content in Markdown/MDX
4. Build will automatically pick up the new post

### Adding Photos to Gallery
1. Add images to `public/personal/`
2. Update `galleryImages` array in `src/components/ui/personal-gallery.tsx`
3. Include proper alt text and category

### Creating a New Page
1. Create `src/app/your-page/page.tsx`
2. Add to navigation in `src/components/navigation.tsx`
3. Follow existing page structure patterns

### Customizing Theme
1. Edit Tailwind config for global color changes
2. Update component-specific colors inline
3. Maintain cyan/purple accent consistency

## Troubleshooting

- **Build Errors**: Check TypeScript types and Next.js console
- **Image Issues**: Ensure images are in `public/` and paths start with `/`
- **Animation Performance**: Use `will-change` CSS property sparingly
- **Hydration Errors**: Ensure client and server rendered HTML matches

## Notes

- This blog emphasizes personal branding and aesthetic over complex functionality
- The design is inspired by cyberpunk themes with modern tech aesthetics
- Code philosophy: "vibe coding is all you need" - creativity and intuition guide development
- The project showcases both technical skills and personal interests/experiences
