"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-background/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon container */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: theme === "light" ? 0 : 180,
            scale: theme === "light" ? 1 : 0,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Sun className="w-5 h-5 text-yellow-500" />
        </motion.div>
        
        {/* Moon icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: theme === "dark" ? 0 : -180,
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Moon className="w-5 h-5 text-cyan-400" />
        </motion.div>
      </div>
      
      {/* Rotating ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          background: theme === "light" 
            ? "linear-gradient(45deg, #fbbf24, #f59e0b)"
            : "linear-gradient(45deg, #06b6d4, #8b5cf6)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        whileHover={{ animationPlayState: "paused" }}
      />
    </motion.button>
  );
}