"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Coffee, Heart, Zap, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
  { name: "Frontend", icon: Code, items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "Backend", icon: Zap, items: ["Node.js", "Python", "PostgreSQL", "Redis"] },
  { name: "DevOps", icon: Globe, items: ["Docker", "AWS", "Vercel", "GitHub Actions"] },
  { name: "Other", icon: Heart, items: ["Git", "Linux", "Figma", "Open Source"] },
];

const stats = [
  { number: "3+", label: "Years Experience" },
  { number: "50+", label: "Projects Built" },
  { number: "10+", label: "Technologies" },
  { number: "∞", label: "Coffee Consumed" },
];

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] },
    },
  };

  return (
    <section ref={ref} className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate full-stack developer who loves turning ideas into reality through clean, efficient code.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          {/* About Text */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hey there! I&apos;m <span className="text-cyan-400 font-semibold">wenhaogege</span>, 
                a passionate full-stack developer with a love for creating digital experiences 
                that make a difference.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey started with curiosity about how websites work, and it evolved into 
                a deep passion for building scalable, user-friendly applications. I enjoy the 
                entire process - from designing intuitive interfaces to architecting robust 
                backend systems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing 
                to open source projects, or sharing my knowledge through blog posts and tutorials.
              </p>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Coffee className="w-5 h-5 text-cyan-400" />
              <span>Fueled by coffee and curiosity</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-lg border border-cyan-500/20 bg-background/50 backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={itemVariants}>
              <Card className="group border-cyan-500/20 bg-background/50 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <skill.icon className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-cyan-400">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {skill.items.map((item) => (
                      <div
                        key={item}
                        className="text-sm text-muted-foreground bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}