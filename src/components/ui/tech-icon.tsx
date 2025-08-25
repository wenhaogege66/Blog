"use client";

import Image from "next/image";
import { useState } from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

// Map technology names to go-skill-icons identifiers
const techMapping: Record<string, string> = {
  // Frontend
  "React": "react",
  "Next.js": "nextjs", 
  "TypeScript": "ts",
  "JavaScript": "js",
  "Tailwind CSS": "tailwindcss",
  "Three.js": "threejs",
  "Vue": "vue",
  "HTML": "html",
  "CSS": "css",
  "Element Plus": "elementplus",
  "Material UI": "materialui",

  // Backend
  "Node.js": "nodejs",
  "Python": "py",
  "Java": "java",
  "Spring Boot": "spring",
  "PostgreSQL": "postgresql",
  "MySQL": "mysql",
  "C++": "cpp",
  "C": "c",

  // Mobile
  "HarmonyOS": "react", // Fallback to react for now
  "ArkTS": "ts", // Fallback to TypeScript
  "React Native": "react",
  "Flutter": "flutter",
  "Android": "android",

  // AI & Data
  "Machine Learning": "pytorch",
  "Data Analysis": "jupyter",
  "TensorFlow": "tensorflow",
  "PyTorch": "pytorch",
  "Jupyter": "jupyter",
  "Kaggle": "kaggle",

  // Tools & Others
  "Git": "git",
  "Docker": "docker",
  "Postman": "postman",
  "Figma": "figma",
  "Solana": "solana",
  "Solidity": "solidity",
  "Ganache": "ganache",
  "LeetCode": "leetcode",
  "VMware": "vmwareworkstation",
  "LaTeX": "latex",
  "Steam": "steam",
  "DeepSeek": "deepseek"
};

export default function TechIcon({ name, className = "" }: TechIconProps) {
  const [imageError, setImageError] = useState(false);
  const iconId = techMapping[name] || name.toLowerCase();
  
  // If image fails to load, show fallback
  if (imageError) {
    return (
      <div className={`w-4 h-4 flex items-center justify-center bg-gray-500/10 rounded border border-gray-500/20 ${className}`}>
        <span className="text-xs text-gray-400">{name.charAt(0)}</span>
      </div>
    );
  }

  return (
    <Image
      src={`https://go-skill-icons.vercel.app/api/icons?i=${iconId}`}
      alt={`${name} icon`}
      width={16}
      height={16}
      className={`${className}`}
      onError={() => setImageError(true)}
      unoptimized // For external API images
    />
  );
}