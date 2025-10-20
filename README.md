# Wenhao's Personal Blog 🚀

A modern, interactive personal blog built with Next.js 14, showcasing my journey as a full-stack developer, projects, and personal experiences.

![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎨 Modern Design
- **Dark Theme**: Cyberpunk-inspired design with neon accents
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **3D Graphics**: Three.js integration for immersive backgrounds
- **Responsive Layout**: Mobile-first design that works on all devices

### 📸 Personal Touch
- **Photo Gallery**: Interactive lightbox gallery showcasing personal moments, anime favorites, and travel memories
- **About Section**: Comprehensive profile with skills, experience, and interests
- **Project Showcase**: GitHub integration displaying my latest work
- **Blog Posts**: Markdown/MDX support for writing technical articles

### ⚡ Performance
- **Next.js 15 App Router**: Latest routing and rendering features
- **Image Optimization**: Automatic image compression and lazy loading
- **Static Generation**: Pre-rendered pages for lightning-fast loads
- **SEO Optimized**: Proper meta tags and structured data

### 🎯 Interactive Elements
- **Cursor Effects**: Custom cursor trail and click ripples
- **Scroll Animations**: Elements animate into view as you scroll
- **Smooth Scrolling**: Enhanced scroll behavior for better UX
- **Back to Top**: Quick navigation button

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.0 with App Router
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Animations**: Framer Motion 12
- **3D Graphics**: Three.js + React Three Fiber

### Content Management
- **Format**: Markdown/MDX
- **Parser**: gray-matter for frontmatter
- **Processing**: remark + rehype plugins
- **Syntax Highlighting**: rehype-highlight

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript strict mode

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/blog.git
cd blog

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

### Build for Production

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Homepage
│   │   ├── blog/           # Blog pages
│   │   └── experience/     # Experience page
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── about-section.tsx
│   │   ├── hero-section.tsx
│   │   └── ...
│   └── lib/               # Utility functions
├── public/                # Static assets
│   ├── personal/         # Personal photo gallery
│   └── ...
├── content/              # Markdown blog posts
│   └── posts/
└── CLAUDE.md            # AI assistant guidelines
```

## 📝 Adding Content

### Blog Posts

Create a new `.md` file in `content/posts/`:

```markdown
---
title: "Your Post Title"
date: "2025-01-22"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
published: true
---

Your content here...
```

### Personal Photos

Add images to `public/personal/` and they'll automatically appear in the gallery on the About page.

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color scheme.

### Components
All components are in `src/components/` and can be modified independently.

### Content Sections
Edit section components in `src/components/` to customize layout and content.

## 🌐 Deployment

### Vercel (Recommended)
This project is optimized for Vercel deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/blog)

### Manual Deployment
1. Build the project: `pnpm build`
2. Deploy the `.next` folder to your hosting provider
3. Ensure Node.js 20+ is available on the server

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/blog/issues).

## 👤 Author

**Wenhao (wenhaogege)**
- GitHub: [@yourusername](https://github.com/yourusername)
- University: Zhejiang University (ZJU)
- Graduation: 2026

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Three.js](https://threejs.org/) - 3D graphics library

---

⭐ If you found this project helpful, please consider giving it a star!
