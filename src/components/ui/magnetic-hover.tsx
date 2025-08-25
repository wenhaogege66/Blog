"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticHoverProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  range?: number;
}

export default function MagneticHover({ 
  children, 
  className = "", 
  strength = 0.3,
  range = 100 
}: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(y, [-range, range], [10, -10]);
  const rotateY = useTransform(x, [-range, range], [-10, 10]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      x.set(deltaX);
      y.set(deltaY);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      window.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      window.removeEventListener("mousemove", handleMouseMove);
      x.set(0);
      y.set(0);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y, strength]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      animate={{
        boxShadow: isHovered 
          ? "0 20px 40px rgba(34, 211, 238, 0.3), 0 0 0 1px rgba(34, 211, 238, 0.1)"
          : "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Hover glow effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: "radial-gradient(circle at center, rgba(34, 211, 238, 0.1) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      )}
      
      {/* Scan line effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{
              y: [0, "400px", 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}
      
      {children}
    </motion.div>
  );
}