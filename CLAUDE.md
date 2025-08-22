# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern personal blog built with Next.js 14 (App Router), designed with a tech-focused aesthetic and personal branding elements. The blog uses a file-based content system with Markdown/MDX for articles and integrates with GitHub API for showcasing projects.

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Content**: Markdown/MDX files in `/content` directory
- **Animations**: Framer Motion for interactive effects
- **Icons**: Lucide React
- **Deployment**: Vercel with custom domain
- **Server**: Alibaba Cloud ECS (Ubuntu 22.04) at 47.99.201.130

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

## Project Structure

```
/
├── app/                 # Next.js 14 App Router pages
├── components/          # Reusable React components
├── content/            # Markdown blog posts
├── lib/                # Utility functions and configurations
├── public/             # Static assets
└── styles/             # Global styles and Tailwind config
```

## Content Management

- Blog posts are stored as Markdown files in `/content/posts/`
- Frontmatter format:
  ```yaml
  ---
  title: "Post Title"
  date: "2025-01-01"
  excerpt: "Brief description"
  tags: ["tech", "personal"]
  ---
  ```
- Use `gray-matter` for parsing frontmatter
- MDX support for embedding React components in content

## Key Features

- **Personal Branding**: GitHub API integration for project showcase
- **Tech Aesthetic**: Dark theme with neon accents and smooth animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Next.js App Router with proper meta tags
- **Performance**: Static generation for blog posts

## Styling Guidelines

- Use shadcn/ui components as base, customize with Tailwind
- Consistent color scheme: dark backgrounds with cyan/blue accents
- Framer Motion for page transitions and interactive elements
- Typography: Clean, modern fonts for readability

## GitHub Integration

- Fetch repositories via GitHub API
- Display tech stack, stars, and project links
- Cache API responses for performance

## Server Configuration

- Ubuntu 22.04 on Alibaba Cloud ECS
- SSH access configured with key-based authentication
- Suitable for hosting additional services if needed