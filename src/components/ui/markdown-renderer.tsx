"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Components } from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// 自定义组件映射
const components: Components = {
  // 标题
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-cyan-400 scroll-mt-20">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold mt-8 mb-4 text-cyan-400 scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold mt-6 mb-3 text-cyan-300 scroll-mt-20">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold mt-4 mb-2 text-cyan-300">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-lg font-semibold mt-4 mb-2">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-base font-semibold mt-4 mb-2">
      {children}
    </h6>
  ),

  // 段落
  p: ({ children }) => (
    <p className="mb-4 leading-7 text-muted-foreground">
      {children}
    </p>
  ),

  // 链接
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || '#'}
        className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
      >
        {children}
      </Link>
    );
  },

  // 列表
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-7">
      {children}
    </li>
  ),

  // 引用块
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-cyan-500/50 pl-4 italic my-4 bg-cyan-500/5 py-2 text-muted-foreground">
      {children}
    </blockquote>
  ),

  // 代码
  code: ({ className, children, ...props }) => {
    const isInline = !className;

    if (isInline) {
      return (
        <code className="text-cyan-300 bg-slate-800/50 px-2 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }

    // 代码块
    const language = className?.replace('language-', '') || 'text';
    return (
      <div className="relative my-4">
        <div className="absolute top-2 right-2 text-xs text-cyan-400 bg-slate-900 px-2 py-1 rounded">
          {language}
        </div>
        <pre className="bg-slate-900 border border-cyan-500/20 rounded-lg p-4 overflow-x-auto">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  },

  // 表格
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-cyan-500/10">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="border border-cyan-500/20 px-4 py-2 text-left font-semibold text-cyan-400">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-cyan-500/20 px-4 py-2 text-muted-foreground">
      {children}
    </td>
  ),

  // 水平线
  hr: () => (
    <hr className="border-t border-cyan-500/20 my-8" />
  ),

  // 图片
  img: ({ src, alt }) => {
    const isExternalImage = typeof src === 'string' && src.startsWith('http');

    return (
      <div className="my-4 rounded-lg overflow-hidden">
        {isExternalImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src as string}
            alt={alt || ''}
            className="w-full h-auto rounded-lg"
          />
        ) : (
          <Image
            src={src as string || ''}
            alt={alt || ''}
            width={800}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        )}
      </div>
    );
  },

  // 粗体
  strong: ({ children }) => (
    <strong className="font-bold text-foreground">
      {children}
    </strong>
  ),

  // 斜体
  em: ({ children }) => (
    <em className="italic">
      {children}
    </em>
  ),

  // 删除线
  del: ({ children }) => (
    <del className="line-through opacity-70">
      {children}
    </del>
  ),
};

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
