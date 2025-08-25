"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface Particle {
  x: number;
  y: number;
  id: number;
  angle: number;
  velocity: number;
}

export default function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      // Create particles
      const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + i,
        angle: (i / 8) * Math.PI * 2,
        velocity: Math.random() * 100 + 50,
      }));

      setRipples(prev => [...prev, newRipple]);
      setParticles(prev => [...prev, ...newParticles]);

      // Clean up after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
      }, 1000);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-40"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-12 h-12 rounded-full border-2 border-cyan-400 bg-transparent" />
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-40"
            style={{
              left: particle.x - 2,
              top: particle.y - 2,
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos(particle.angle) * particle.velocity,
              y: Math.sin(particle.angle) * particle.velocity,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div 
              className="w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
              style={{
                boxShadow: "0 0 6px rgba(34, 211, 238, 0.8)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}