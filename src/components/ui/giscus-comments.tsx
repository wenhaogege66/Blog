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
        repoId="R_kgDOPiapOw"
        category="Announcements"
        categoryId="DIC_kwDOPiapO84Cw63l"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === "dark" ? "dark" : "light"}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
