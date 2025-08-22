---
title: "Mastering Next.js App Router: A Complete Guide"
date: "2025-01-20"
excerpt: "Deep dive into Next.js App Router features, including nested layouts, server components, and advanced routing patterns."
tags: ["nextjs", "react", "app-router", "server-components"]
author: "wenhaogege"
image: "/images/blog/nextjs-guide.jpg"
published: true
---

# Mastering Next.js App Router: A Complete Guide

The Next.js App Router represents a significant evolution in how we build React applications. With its introduction in Next.js 13, we gained powerful new features like Server Components, nested layouts, and improved data fetching patterns.

## Why App Router?

The new App Router brings several advantages over the traditional Pages Router:

### Server Components by Default
```tsx
// This component runs on the server by default
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

### Nested Layouts
Create shared layouts that persist across route changes:

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <nav>Navigation</nav>
      <main>{children}</main>
    </div>
  );
}
```

## Key Features

### 1. File-Based Routing
The App Router uses a file-system based routing system where folders define routes:

```
app/
├── page.tsx           // /
├── about/page.tsx     // /about
├── blog/
│   ├── page.tsx       // /blog
│   └── [slug]/page.tsx // /blog/[slug]
└── dashboard/
    ├── layout.tsx
    ├── page.tsx       // /dashboard
    └── settings/page.tsx // /dashboard/settings
```

### 2. Server and Client Components
```tsx
// Server Component (default)
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data.title}</div>;
}

// Client Component
'use client';
import { useState } from 'react';

function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 3. Advanced Loading States
```tsx
// app/blog/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  );
}
```

### 4. Error Boundaries
```tsx
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

## Data Fetching Patterns

### Server-Side Data Fetching
```tsx
async function fetchPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

export default async function BlogPage() {
  const posts = await fetchPosts();
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### Dynamic Routes with Data
```tsx
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const post = await fetchPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const post = await fetchPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

## Best Practices

### 1. Use Server Components When Possible
Server Components are rendered on the server, reducing the JavaScript bundle size and improving performance.

### 2. Optimize Loading States
Provide meaningful loading states to improve user experience:

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
```

### 3. Handle Errors Gracefully
Implement error boundaries at different levels:

```tsx
// app/dashboard/error.tsx
'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-semibold mb-4">
        Dashboard temporarily unavailable
      </h2>
      <button 
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
```

### 4. Leverage Streaming
Use React's Suspense for progressive loading:

```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading stats...</div>}>
        <Stats />
      </Suspense>
      <Suspense fallback={<div>Loading charts...</div>}>
        <Charts />
      </Suspense>
    </div>
  );
}
```

## Migration from Pages Router

If you're migrating from the Pages Router, here's a quick comparison:

| Pages Router | App Router |
|--------------|------------|
| `pages/index.js` | `app/page.tsx` |
| `pages/about.js` | `app/about/page.tsx` |
| `pages/blog/[slug].js` | `app/blog/[slug]/page.tsx` |
| `pages/_app.js` | `app/layout.tsx` |
| `pages/_document.js` | Replaced by layout.tsx |

## Conclusion

The App Router is a powerful addition to Next.js that brings us closer to the React 18 vision of Server Components and concurrent features. While there's a learning curve, the benefits in terms of performance, developer experience, and user experience make it worth the investment.

Start small, experiment with Server Components, and gradually adopt the new patterns. The future of React and Next.js is here!

## Resources

- [Official Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [Next.js App Router Examples](https://github.com/vercel/next.js/tree/canary/examples)

Happy coding! 🚀