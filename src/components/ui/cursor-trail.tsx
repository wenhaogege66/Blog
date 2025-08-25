"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setTrail(prev => {
        const updatedTrail = [newPoint, ...prev.slice(0, 15)]; // Keep only last 16 points
        return updatedTrail;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{ x: mousePos.x - 10, y: mousePos.y - 10 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-80 blur-sm"></div>
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{ x: mousePos.x - 20, y: mousePos.y - 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 bg-transparent"></div>
      </motion.div>

      {/* Trail points */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-40"
          initial={{ x: point.x - 2, y: point.y - 2, opacity: 1, scale: 1 }}
          animate={{
            x: point.x - 2,
            y: point.y - 2,
            opacity: 1 - (index / trail.length),
            scale: 1 - (index / trail.length) * 0.5,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className="w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
            style={{
              boxShadow: `0 0 ${8 - index}px rgba(34, 211, 238, 0.6)`,
            }}
          ></div>
        </motion.div>
      ))}

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