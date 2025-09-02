"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Mail, MessageCircle, ExternalLink, Users, Award, X } from "lucide-react";
import { useState } from "react";
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
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/30 hover:border-blue-500/50",
    iconColor: "text-blue-400"
  },
  {
    name: "GitHub",
    value: "@wenhaogege66",
    icon: Github,
    href: "https://github.com/wenhaogege66",
    description: "Check out my projects and contributions",
    color: "from-gray-500 to-slate-500",
    bgColor: "bg-white/20",
    borderColor: "border-white/30 hover:border-white/50",
    iconColor: "text-white"
  },
  {
    name: "WeChat",
    value: "Scan QR Code",
    icon: MessageCircle,
    href: "wechat-modal",
    description: "For casual conversations",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/20", 
    borderColor: "border-green-500/30 hover:border-green-500/50",
    iconColor: "text-green-400"
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
    year: "2025"
  }
];

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [showWeChatModal, setShowWeChatModal] = useState(false);

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

        {/* Contact Methods Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method) => (
              <motion.div key={method.name} variants={itemVariants}>
                <MagneticHover strength={0.15} range={50}>
                  <Card className={`${method.borderColor} bg-background/50 backdrop-blur-sm transition-all duration-300 h-full`}>
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 p-4 rounded-full ${method.bgColor} border ${method.borderColor.split(' ')[0]} shadow-lg`}>
                        <method.icon className={`w-full h-full ${method.iconColor} drop-shadow-sm`} />
                      </div>
                      <h4 className="text-xl font-semibold mb-3 text-cyan-400">
                        {method.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                        {method.description}
                      </p>
                      {method.href === "wechat-modal" ? (
                        <button
                          onClick={() => setShowWeChatModal(true)}
                          className="w-full px-4 py-2 text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          {method.value}
                          <MessageCircle className="w-3 h-3 flex-shrink-0" />
                        </button>
                      ) : (
                        <NeonButton
                          href={method.href}
                          variant="secondary"
                          className="text-sm w-full justify-center"
                        >
                          {method.value}
                          <ExternalLink className="w-3 h-3 ml-2 flex-shrink-0" />
                        </NeonButton>
                      )}
                    </CardContent>
                  </Card>
                </MagneticHover>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Xlab Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16 flex justify-center"
        >
          <motion.div variants={itemVariants} className="max-w-2xl w-full">
            <MagneticHover strength={0.15} range={40}>
              <Card className="border-cyan-500/20 bg-background/50 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-32 h-12">
                      <Image
                        src="/Xlab.png"
                        alt="Xlab Logo"
                        width={128}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-cyan-400 mb-2">
                    Software Team Lead
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Qizhen Cross-disciplinary Innovation &amp; Entrepreneurship Lab
                  </p>
                  <div className="text-sm text-cyan-300 font-medium">
                    Zhejiang University
                  </div>
                  <div className="mt-4 pt-4 border-t border-cyan-500/20">
                    <p className="text-xs text-muted-foreground">
                      Leading software development initiatives and cross-disciplinary innovation projects
                    </p>
                  </div>
                </CardContent>
              </Card>
            </MagneticHover>
          </motion.div>
        </motion.div>

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
      
      {/* WeChat QR Code Modal */}
      <AnimatePresence>
        {showWeChatModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWeChatModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-background border border-green-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowWeChatModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center hover:bg-green-500/20 transition-colors"
                >
                  <X className="w-4 h-4 text-green-400" />
                </button>
                
                {/* Modal Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-6 text-green-400">
                    WeChat QR Code
                  </h3>
                  <div className="relative mx-auto w-48 h-48 mb-6 p-4 bg-white rounded-2xl shadow-lg">
                    <Image
                      src="/Qr_code.jpg"
                      alt="WeChat QR Code"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Scan to add me on WeChat for casual conversations
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>wenhaogege66</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}