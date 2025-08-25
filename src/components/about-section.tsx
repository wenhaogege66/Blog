"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Code, Heart, Zap, Globe, Briefcase, BookOpen, Dumbbell, Gamepad2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MagneticHover from "@/components/ui/magnetic-hover";
import TechIcon from "@/components/ui/tech-icon";
import Image from "next/image";

const skills = [
  { name: "Frontend", icon: Code, items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"] },
  { name: "Backend", icon: Zap, items: ["Node.js", "Python", "Java", "Spring Boot", "PostgreSQL"] },
  { name: "Mobile", icon: Globe, items: ["HarmonyOS", "ArkTS", "React Native", "Flutter", "Android"] },
  { name: "AI & Data", icon: Heart, items: ["Machine Learning", "Data Analysis", "TensorFlow", "PyTorch"] },
];

const stats = [
  { number: "21", label: "Years Old" },
  { number: "ZJU", label: "University" },
  { number: "2026", label: "Graduation Year" },
  { number: "2+", label: "Internships" },
];

const interests = [
  { name: "Fitness", icon: Dumbbell, description: "Staying healthy and strong" },
  { name: "Anime", icon: BookOpen, description: "Cyberpunk 2077 & more" },
  { name: "Gaming", icon: Gamepad2, description: "Strategy & adventure games" },
  { name: "Investment", icon: Briefcase, description: "Financial markets & tech stocks" },
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
      transition: { duration: 0.6 },
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16"
        >
          {/* Profile Image */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                <Image
                  src="/wenhaogege.jpeg"
                  alt="wenhaogege Profile"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 pointer-events-none"></div>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div variants={itemVariants} className="space-y-6 lg:col-span-2">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hi! I&apos;m <span className="text-cyan-400 font-semibold">Wenhao</span>, 
                a passionate 21-year-old Software Engineering student at <span className="text-cyan-400 font-semibold">Zhejiang University</span>. 
                Enrolled in 2022, I&apos;m set to graduate in 2026 before continuing with graduate studies.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey includes a rewarding internship at <span className="text-cyan-400 font-semibold">Huawei Technologies</span> in 2024, 
                where I focused on <span className="text-cyan-400 font-semibold">HarmonyOS</span> development using <span className="text-cyan-400 font-semibold">ArkTS</span>, 
                contributing to fundamental rendering libraries and testing frameworks. This achievement earned me the 
                <span className="text-yellow-400 font-semibold">Huawei Elite Class Second-Class Scholarship</span>. 
                Additionally, I completed a dynamic 3-month stint at an AI startup in 2025, gaining cutting-edge AI/ML experience.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Beyond coding, I&apos;m passionate about fitness, anime (especially Cyberpunk 2077), gaming, investment, 
                and exploring history. I believe in the philosophy: 
                <em className="text-cyan-300 block mt-2 text-center font-medium">
                  &ldquo;夫祸患常积于忽微，而智勇多困于所溺&rdquo;
                </em>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My coding philosophy is simple: <span className="text-cyan-400 font-semibold">vibe coding is all you need</span> — 
                letting creativity and intuition guide the development process.
              </p>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Lifelong learner, always growing</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
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
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={itemVariants}>
              <MagneticHover strength={0.2} range={80}>
                <Card className="group border-cyan-500/20 bg-background/50 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <skill.icon className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-cyan-400">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {skill.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground bg-cyan-500/10 px-3 py-2 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                      >
                        <TechIcon name={item} className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                  </CardContent>
                </Card>
              </MagneticHover>
            </motion.div>
          ))}
        </motion.div>

        {/* Personal Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Personal Interests
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Life is about balance. Here&apos;s what keeps me inspired outside of coding.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {interests.map((interest) => (
            <motion.div key={interest.name} variants={itemVariants}>
              <MagneticHover strength={0.2} range={80}>
                <Card className="group border-purple-500/20 bg-background/50 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 h-full text-center">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
                      <interest.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-400">
                      {interest.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {interest.description}
                    </p>
                  </div>
                </CardContent>
                </Card>
              </MagneticHover>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}