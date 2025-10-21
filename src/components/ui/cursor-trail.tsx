"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

interface ClickParticle {
  x: number;
  y: number;
  id: number;
  vx: number;
  vy: number;
  life: number;
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [clickParticles, setClickParticles] = useState<ClickParticle[]>([]);
  const [lastClick, setLastClick] = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth cursor following with springs - faster response
  const cursorX = useSpring(mouseX, { stiffness: 1000, damping: 40 });
  const cursorY = useSpring(mouseY, { stiffness: 1000, damping: 40 });
  
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const particleAnimationRef = useRef<number | undefined>(undefined);
  
  // Enhanced mouse move handler with electromagnetic effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    if (now - lastTimeRef.current < 32) return; // ~30fps for better performance

    lastTimeRef.current = now;

    mouseX.set(e.clientX);
    mouseY.set(e.clientY);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: now,
        timestamp: now,
      };

      setTrail(prev => {
        const updatedTrail = [newPoint, ...prev.slice(0, 5)]; // Reduced to 6 points for better performance
        return updatedTrail;
      });
    });
  }, [mouseX, mouseY]);

  // Click particle burst effect
  const handleClick = useCallback((e: MouseEvent) => {
    setLastClick({ x: e.clientX, y: e.clientY });

    const particleCount = 6; // Reduced from 12 to 6
    const newParticles: ClickParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = 50 + Math.random() * 100;
      newParticles.push({
        x: e.clientX,
        y: e.clientY,
        id: performance.now() + i,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
      });
    }

    setClickParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Hover detection for interactive elements
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as Element;
    const isInteractive = target.closest('a, button, [role="button"], input, textarea, select');
    setIsHovering(!!isInteractive);
  }, []);

  // Animate click particles and fade trail
  useEffect(() => {
    const animateParticles = () => {
      setClickParticles(prev => {
        return prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx * 0.02,
          y: particle.y + particle.vy * 0.02,
          vx: particle.vx * 0.98, // Friction
          vy: particle.vy * 0.98,
          life: particle.life - 0.03,
        })).filter(particle => particle.life > 0);
      });
      
      // Auto-fade trail points after some time
      const now = performance.now();
      setTrail(prev => prev.filter(point => now - point.timestamp < 800)); // Remove points older than 800ms
      
      particleAnimationRef.current = requestAnimationFrame(animateParticles);
    };
    
    particleAnimationRef.current = requestAnimationFrame(animateParticles);
    
    return () => {
      if (particleAnimationRef.current) {
        cancelAnimationFrame(particleAnimationRef.current);
      }
    };
  }, [clickParticles.length, trail.length]);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth <= 768 
        || ('ontouchstart' in window);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (!isMobile) {
      const options = { passive: true };
      
      window.addEventListener("mousemove", handleMouseMove, options);
      window.addEventListener("mouseover", handleMouseOver, options);
      window.addEventListener("click", handleClick, options);
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseover", handleMouseOver);
        window.removeEventListener("click", handleClick);
        window.removeEventListener('resize', checkMobile);
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (particleAnimationRef.current) {
          cancelAnimationFrame(particleAnimationRef.current);
        }
      };
    } else {
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, [handleMouseMove, handleMouseOver, handleClick, isMobile]);

  // Don't render cursor effects on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Main cursor core with electromagnetic field */}
      <motion.div
        className="fixed pointer-events-none z-[9999] will-change-transform mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <div className="relative">
          {/* Core dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white"
            animate={isHovering ? { scale: 2 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Electromagnetic rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              rotate: 360,
              scale: isHovering ? 1.5 : 1,
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.3 }
            }}
          >
            <div className="w-8 h-8 border border-cyan-400/40 rounded-full" />
          </motion.div>
          
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              rotate: -360,
              scale: isHovering ? 1.8 : 1.2,
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.3 }
            }}
          >
            <div className="w-12 h-12 border border-purple-400/20 rounded-full" />
          </motion.div>
          
          {/* Hover pulse effect */}
          {isHovering && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              <div className="w-16 h-16 border-2 border-cyan-400/60 rounded-full" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Quantum trail particles */}
      {trail.map((point, index) => {
        const opacity = Math.max(0, 1 - (index / trail.length));
        const scale = Math.max(0.2, 1 - (index / trail.length) * 0.6);
        const hue = 180 + (index * 15) % 180; // Cyan to purple spectrum
        
        return (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-[9998] will-change-transform"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale,
              opacity,
              rotate: index * 45,
            }}
            style={{
              x: point.x - 3,
              y: point.y - 3,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full transform-gpu"
              style={{
                background: `hsl(${hue}, 70%, 60%)`,
                boxShadow: `0 0 4px hsl(${hue}, 70%, 60%, ${opacity * 0.6})`, // Simplified shadow
              }}
            />
          </motion.div>
        );
      })}

      {/* Click burst particles */}
      {clickParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[9997] will-change-transform"
          style={{
            x: particle.x - 2,
            y: particle.y - 2,
          }}
        >
          <motion.div
            className="w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
            style={{
              opacity: particle.life,
              scale: particle.life,
              boxShadow: `0 0 4px rgba(34, 211, 238, ${particle.life * 0.5})`, // Simplified shadow
            }}
          />
        </motion.div>
      ))}

      {/* Click ripple effect */}
      {lastClick && (
        <motion.div
          className="fixed pointer-events-none z-[9996]"
          style={{
            x: lastClick.x - 25,
            y: lastClick.y - 25,
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => setLastClick(null)}
        >
          <div className="w-12 h-12 border-2 border-cyan-400/60 rounded-full" />
        </motion.div>
      )}

      {/* Hide default cursor */}
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