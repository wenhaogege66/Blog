"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category: "hobbies" | "life";
  description?: string;
}

interface GallerySection {
  title: string;
  icon: typeof Heart;
  gradient: string;
  images: GalleryImage[];
}

// 爱好相关 - 动漫、游戏
const hobbiesImages: GalleryImage[] = [
  { src: "/personal/鬼灭1.jpg", alt: "鬼灭之刃 1", category: "hobbies", description: "最喜欢的动漫之一" },
  { src: "/personal/鬼灭2.jpg", alt: "鬼灭之刃 2", category: "hobbies", description: "精彩的战斗场景" },
  { src: "/personal/鬼灭3.jpg", alt: "鬼灭之刃 3", category: "hobbies", description: "经典角色" },
  { src: "/personal/进击.jpg", alt: "进击的巨人", category: "hobbies", description: "震撼的剧情" },
  { src: "/personal/无畏契约.jpg", alt: "无畏契约", category: "hobbies", description: "喜欢的FPS游戏" },
];

// 个人生活照 - 按时间顺序
const lifeImages: GalleryImage[] = [
  { src: "/personal/上海行1.jpg", alt: "上海之行 1", category: "life", description: "大一 - 上海探索" },
  { src: "/personal/上海行2.jpg", alt: "上海之行 2", category: "life", description: "大一 - 城市风光" },
  { src: "/personal/创赛.jpg", alt: "创新创业大赛", category: "life", description: "大二 - 创赛参赛" },
  { src: "/personal/舟山行1.jpg", alt: "舟山之旅 1", category: "life", description: "大三清明 - 舟山海边" },
  { src: "/personal/舟山行2.jpg", alt: "舟山之旅 2", category: "life", description: "大三清明 - 美丽风景" },
  { src: "/personal/入院仪式.jpg", alt: "Xlab入院仪式", category: "life", description: "大三5月 - Xlab入院仪式" },
  { src: "/personal/黑客松.jpg", alt: "黑客松活动", category: "life", description: "假期 - 黑客松比赛" },
  { src: "/personal/一拖二.jpg", alt: "健身日常", category: "life", description: "最近 - 带室友健身" },
];

const gallerySections: GallerySection[] = [
  {
    title: "兴趣爱好",
    icon: Heart,
    gradient: "from-pink-500 to-purple-600",
    images: hobbiesImages,
  },
  {
    title: "生活点滴",
    icon: Sparkles,
    gradient: "from-cyan-500 to-blue-600",
    images: lifeImages,
  },
];

const allImages = [...hobbiesImages, ...lifeImages];

export default function PersonalGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + allImages.length) % allImages.length);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % allImages.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedImage(null);
  };

  return (
    <div className="space-y-16">
      {gallerySections.map((section, sectionIndex) => (
        <div key={section.title}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className={`p-2 rounded-lg bg-gradient-to-r ${section.gradient} bg-opacity-10`}>
              <section.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-xl font-bold bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
              {section.title}
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 to-transparent"></div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {section.images.map((image, index) => {
              const globalIndex = allImages.findIndex(img => img.src === image.src);
              return (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                  onClick={() => setSelectedImage(globalIndex)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium mb-1">{image.alt}</p>
                      {image.description && (
                        <p className="text-white/70 text-xs">{image.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="关闭"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="上一张"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="下一张"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allImages[selectedImage].src}
                alt={allImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Image Counter & Title */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full max-w-md">
              <p className="text-white text-sm font-medium text-center">
                {allImages[selectedImage].alt}
              </p>
              {allImages[selectedImage].description && (
                <p className="text-white/70 text-xs text-center mt-1">
                  {allImages[selectedImage].description}
                </p>
              )}
              <p className="text-white/50 text-xs text-center mt-2">
                {selectedImage + 1} / {allImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
