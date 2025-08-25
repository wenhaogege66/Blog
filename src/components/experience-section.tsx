"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, Building, Code, Brain, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const experiences = [
  {
    id: 1,
    company: "AI Startup",
    position: "Software Engineer Intern",
    duration: "3 months in 2025",
    location: "Remote/Hybrid",
    type: "Internship",
    description: "Worked on cutting-edge AI applications, contributing to the development of machine learning models and AI-powered features. Gained hands-on experience with the latest AI technologies and startup culture.",
    technologies: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "AI/ML", "Data Science"],
    achievements: [
      "Contributed to core AI model development",
      "Implemented ML algorithms for real-world applications", 
      "Collaborated in fast-paced startup environment",
      "Enhanced skills in AI/ML pipeline development"
    ],
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/20 hover:border-purple-500/40"
  },
  {
    id: 2,
    company: "Huawei Technologies",
    position: "Software Development Intern",
    duration: "2024",
    location: "China",
    type: "Internship",
    description: "Gained valuable experience in large-scale enterprise software development at one of the world's leading technology companies. Worked on enterprise-grade solutions and learned industry best practices.",
    technologies: ["Java", "Spring Boot", "Microservices", "Enterprise Systems", "Cloud Computing", "DevOps"],
    achievements: [
      "Developed enterprise-grade software solutions",
      "Learned large-scale system architecture",
      "Collaborated with international development teams",
      "Gained expertise in enterprise development practices"
    ],
    icon: Building,
    color: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/20 hover:border-cyan-500/40"
  }
];

const education = {
  institution: "Zhejiang University",
  degree: "Software Engineering",
  status: "Bachelor's 2024 → Master's (Continuing)",
  location: "Hangzhou, China",
  description: "One of China's top universities, renowned for engineering and technology programs. Continuing with graduate studies to deepen expertise in software engineering and computer science.",
  achievements: [
    "Strong foundation in software engineering principles",
    "Advanced coursework in algorithms and data structures",
    "Active in university tech communities",
    "Continuing with graduate studies for deeper specialization"
  ]
};

export default function ExperienceSection() {
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
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Professional Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            My journey in the tech industry, from enterprise solutions at Huawei to cutting-edge AI development.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
            Education
          </h2>
          <Card className="border-green-500/20 bg-background/50 backdrop-blur-sm hover:border-green-500/40 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-green-400 mb-2">{education.institution}</h3>
                  <p className="text-lg text-cyan-300 mb-2">{education.degree}</p>
                  <div className="flex items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{education.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{education.location}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{education.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {education.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          <h2 className="text-2xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Professional Journey
          </h2>
          
          {/* Timeline Line */}
          <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500 hidden md:block"></div>
          
          <div className="space-y-8">
            {experiences.map((exp) => (
              <motion.div key={exp.id} variants={itemVariants}>
                <Card className={`${exp.borderColor} bg-background/50 backdrop-blur-sm transition-all duration-300 md:ml-16 relative`}>
                  {/* Timeline Dot */}
                  <div className="absolute -left-20 top-8 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 border-4 border-background hidden md:block"></div>
                  
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center mb-4 lg:mb-0`}>
                          <exp.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-cyan-400 mb-1">{exp.position}</h3>
                            <p className="text-lg text-purple-300 mb-2">{exp.company}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-muted-foreground mb-1 lg:justify-end">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground lg:justify-end">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-6">{exp.description}</p>
                        
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-cyan-300 mb-3">Key Achievements</h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <div key={achIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Rocket className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-cyan-300 mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="border-purple-500/20 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Career Philosophy</h3>
              <blockquote className="text-lg italic text-muted-foreground mb-4">
                &ldquo;夫祸患常积于忽微，而智勇多困于所溺&rdquo;
              </blockquote>
              <p className="text-muted-foreground mb-4">
                This ancient wisdom reminds me to pay attention to details and stay mindful of what I&apos;m passionate about. 
                In my career, I believe in continuous learning, thoughtful problem-solving, and maintaining balance.
              </p>
              <p className="text-cyan-400 font-medium">
                Vibe coding is all you need — letting intuition and creativity guide the development process.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}