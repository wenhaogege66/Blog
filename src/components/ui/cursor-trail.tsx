"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const THROTTLE_DELAY = 8; // ~120fps, more responsive than 16ms

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    if (now - lastTimeRef.current < THROTTLE_DELAY) return;
    
    lastTimeRef.current = now;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: now, // Use performance timestamp for better uniqueness
      };

      setTrail(prev => {
        const updatedTrail = [newPoint, ...prev.slice(0, 11)]; // Reduced to 12 points for better performance
        return updatedTrail;
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50 will-change-transform"
        style={{
          x: mousePos.x - 10,
          y: mousePos.y - 10,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      >
        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-80 blur-sm transform-gpu"></div>
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed pointer-events-none z-50 will-change-transform"
        style={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 bg-transparent transform-gpu"></div>
      </motion.div>

      {/* Trail points */}
      {trail.map((point, index) => {
        const opacity = 1 - (index / trail.length);
        const scale = 1 - (index / trail.length) * 0.4;
        const glowIntensity = Math.max(0, 6 - index * 0.5);
        
        return (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-40 will-change-transform"
            style={{
              x: point.x - 2,
              y: point.y - 2,
              opacity,
              scale,
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div 
              className="w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transform-gpu"
              style={{
                boxShadow: `0 0 ${glowIntensity}px rgba(34, 211, 238, ${opacity * 0.8})`,
              }}
            ></div>
          </motion.div>
        );
      })}

      {/* Particle burst on click */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        body {
          cursor: none !important;
        }
        
        a, button, [role="button"] {
          cursor: none !important;
        }
        
        input, textarea, select {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}