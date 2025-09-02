"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "@/contexts/theme-context";

function StarField() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const { theme } = useTheme();
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);
    
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Theme-aware colors
      if (theme === "light") {
        // Warmer blue tones for light theme
        colors[i * 3] = Math.random() * 0.3 + 0.4;     // Red channel (darker)
        colors[i * 3 + 1] = Math.random() * 0.4 + 0.6; // Green channel
        colors[i * 3 + 2] = Math.random() * 0.2 + 0.8; // Blue channel (bright)
      } else {
        // Cooler cyan-green tones for dark theme  
        colors[i * 3] = Math.random() * 0.3 + 0.2;     // Red channel (low)
        colors[i * 3 + 1] = Math.random() * 0.4 + 0.6; // Green channel
        colors[i * 3 + 2] = Math.random() * 0.3 + 0.7; // Blue channel
      }
    }
    
    return [positions, colors];
  }, [theme]);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });
  
  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <StarField />
      </Canvas>
    </div>
  );
}