"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Mail, ArrowDown } from "lucide-react";
import TypingAnimation from "@/components/ui/typing-animation";
import NeonButton from "@/components/ui/neon-button";

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10 pointer-events-none" />
      
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <div className="mb-6">
          <TypingAnimation
            text="wenhaogege"
            duration={150}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {/* Subtitle */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light"
          >
            Full Stack Developer & Tech Enthusiast
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Crafting digital experiences with modern technologies. 
            Passionate about clean code, innovative solutions, and continuous learning.
          </motion.p>

          {/* Tech Stack Tags */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
          >
            <NeonButton href="#projects" variant="primary">
              View My Work
            </NeonButton>
            <NeonButton href="#contact" variant="secondary">
              Get In Touch
            </NeonButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 mt-8"
          >
            <NeonButton href="https://github.com/wenhaogege66" variant="ghost">
              <Github className="w-5 h-5" />
            </NeonButton>
            <NeonButton href="mailto:wenhaogege66@gmail.com" variant="ghost">
              <Mail className="w-5 h-5" />
            </NeonButton>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-6 h-6 text-cyan-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}