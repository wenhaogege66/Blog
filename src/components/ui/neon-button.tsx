"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeonButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export default function NeonButton({ 
  children, 
  href, 
  onClick, 
  className = "",
  variant = "primary" 
}: NeonButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-3 font-semibold text-sm rounded-lg overflow-hidden transition-all duration-300 group";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105",
    secondary: "border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-500/25",
    ghost: "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
  };

  const Component = href ? "a" : "button";
  const extraProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };

  return (
    <Component
      {...extraProps}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        style={{ transform: "skewX(-20deg)" }}
      />
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {variant === "primary" && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
      )}
    </Component>
  );
}