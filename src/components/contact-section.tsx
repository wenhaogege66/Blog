"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Mail, MessageCircle, ExternalLink, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MagneticHover from "@/components/ui/magnetic-hover";
import NeonButton from "@/components/ui/neon-button";
import Image from "next/image";

const contactMethods = [
  {
    name: "Email",
    value: "wenhaogege66@gmail.com",
    icon: Mail,
    href: "mailto:wenhaogege66@gmail.com",
    description: "Best for professional inquiries",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20 hover:border-blue-500/40"
  },
  {
    name: "GitHub",
    value: "@wenhaogege66",
    icon: Github,
    href: "https://github.com/wenhaogege66",
    description: "Check out my projects and contributions",
    color: "from-gray-500 to-slate-500",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/20 hover:border-gray-500/40"
  },
  {
    name: "WeChat",
    value: "Scan QR Code",
    icon: MessageCircle,
    href: "#wechat-qr",
    description: "For casual conversations",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10", 
    borderColor: "border-green-500/20 hover:border-green-500/40"
  }
];

const achievements = [
  {
    title: "Huawei Elite Class Scholarship",
    description: "Second-Class Award for HarmonyOS Development Excellence",
    icon: Award,
    year: "2024"
  },
  {
    title: "ZJU Campus Star",
    description: "Zhejiang University Computer Science Department Recognition",
    icon: Users,
    year: "2024"
  }
];

export default function ContactSection() {
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
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate on exciting projects or discuss tech innovations? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Methods */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method) => (
                <motion.div key={method.name} variants={itemVariants}>
                  <MagneticHover strength={0.2} range={60}>
                    <Card className={`${method.borderColor} bg-background/50 backdrop-blur-sm transition-all duration-300 h-full`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-full ${method.bgColor} border ${method.borderColor.split(' ')[0]}`}>
                            <method.icon className="w-6 h-6 text-current" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-2">
                              {method.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {method.description}
                            </p>
                            <NeonButton
                              href={method.href}
                              variant="secondary"
                              className="text-sm"
                            >
                              {method.value}
                              <ExternalLink className="w-3 h-3 ml-2" />
                            </NeonButton>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </MagneticHover>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* WeChat QR & Xlab Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* WeChat QR Code */}
            <motion.div variants={itemVariants}>
              <MagneticHover strength={0.15} range={40}>
                <Card className="border-green-500/20 bg-background/50 backdrop-blur-sm hover:border-green-500/40 transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-4 text-green-400">
                      WeChat QR Code
                    </h4>
                    <div className="relative mx-auto w-32 h-32 mb-4">
                      <Image
                        src="/Qr_code.jpg"
                        alt="WeChat QR Code"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-lg border border-green-500/20"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scan to add me on WeChat
                    </p>
                  </CardContent>
                </Card>
              </MagneticHover>
            </motion.div>

            {/* Xlab Info */}
            <motion.div variants={itemVariants}>
              <MagneticHover strength={0.15} range={40}>
                <Card className="border-cyan-500/20 bg-background/50 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Image
                        src="/Xlab.png"
                        alt="Xlab Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                      <h4 className="text-lg font-semibold text-cyan-400">
                        Xlab Member
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Qizhen Cross-disciplinary Innovation &amp; Entrepreneurship Lab
                    </p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Zhejiang University
                    </div>
                  </CardContent>
                </Card>
              </MagneticHover>
            </motion.div>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Recent Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <motion.div key={achievement.title} variants={itemVariants}>
                <MagneticHover strength={0.2} range={60}>
                  <Card className="border-yellow-500/20 bg-background/50 backdrop-blur-sm hover:border-yellow-500/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                          <achievement.icon className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-yellow-400">
                              {achievement.title}
                            </h4>
                            <span className="text-sm text-muted-foreground">
                              {achievement.year}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MagneticHover>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="border-purple-500/20 bg-background/50 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">
                Let&apos;s Build Something Amazing Together
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Whether you&apos;re interested in discussing cutting-edge technology, collaborating on innovative projects, 
                or exploring opportunities in HarmonyOS development and AI applications, I&apos;m always excited to connect 
                with fellow tech enthusiasts and professionals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <NeonButton href="mailto:wenhaogege66@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </NeonButton>
                <NeonButton href="https://github.com/wenhaogege66" variant="secondary">
                  <Github className="w-4 h-4 mr-2" />
                  View GitHub
                </NeonButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}