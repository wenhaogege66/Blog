"use client";

import Giscus from "@giscus/react";
import { useTheme } from "@/contexts/theme-context";

interface GiscusCommentsProps {
  className?: string;
}

export default function GiscusComments({ className = "" }: GiscusCommentsProps) {
  const { theme } = useTheme();

  return (
    <div className={className}>
      <Giscus
        id="comments"
        repo="wenhaogege66/Blog"
        repoId="R_kgDONdxAJw" // You'll need to get this from https://giscus.app
        category="General"
        categoryId="DIC_kwDONdxAJ84CleKu" // You'll need to get this from https://giscus.app
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
