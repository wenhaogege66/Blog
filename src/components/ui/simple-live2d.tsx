"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useZenitsuSounds } from "./zenitsu-sounds";

interface SimpleLive2DProps {
  initialX?: number;
  initialY?: number;
  onPositionChange?: (x: number, y: number) => void;
  visible?: boolean;
  soundEnabled?: boolean;
}

interface ChatBubble {
  message: string;
  duration: number;
}

export default function SimpleLive2D({ 
  initialX = 100, 
  initialY = typeof window !== 'undefined' ? window.innerHeight - 200 : 400,
  onPositionChange,
  visible = true,
  soundEnabled = true
}: SimpleLive2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentBubble, setCurrentBubble] = useState<ChatBubble>({ message: "", duration: 0 });
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isLive2DLoaded, setIsLive2DLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseNearby, setIsMouseNearby] = useState(false);
  
  const sounds = useZenitsuSounds();

  // Live2D角色台词
  const characterMessages = useCallback(() => [
    "你好呀！✨",
    "今天过得怎么样？",
    "点击我试试看！",
    "我会跟着你的鼠标哦～",
    "这个网站很棒呢！",
    "一起学习编程吧！",
    "要换个位置吗？",
    "谢谢你的关注！💖"
  ], []);

  // 显示聊天气泡
  const showChatBubble = useCallback((bubble?: ChatBubble) => {
    const messages = characterMessages();
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const bubbleData = bubble || { message: randomMessage, duration: 2500 };
    
    setCurrentBubble(bubbleData);
    setShowBubble(true);
    
    setTimeout(() => {
      setShowBubble(false);
    }, bubbleData.duration);
  }, [characterMessages]);

  // 初始化Live2D（使用脚本方式）
  useEffect(() => {
    const initLive2D = () => {
      if (!containerRef.current || isLive2DLoaded) return;
      
      // 创建Live2D脚本
      const script = document.createElement('script');
      script.src = 'https://fastly.jsdelivr.net/npm/oh-my-live2d@latest/dist/index.min.js';
      script.onload = () => {
        // 初始化Live2D看板娘
        if (window.OhMyLive2D) {
          window.OhMyLive2D.loadOhMyLive2D({
            models: [
              {
                path: 'https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/Live2D/Hiyori/Hiyori.model3.json',
                position: [0, 60],
                scale: 0.08,
                stageStyle: {
                  width: 120,
                  height: 160
                }
              }
            ],
            tips: {
              style: {
                width: 150,
                height: 70,
                left: 130,
                top: -60
              }
            },
            statusBar: {
              disable: true
            },
            menus: {
              disable: true  
            }
          });
          setIsLive2DLoaded(true);
          console.log('Live2D角色加载成功！');
        }
      };
      script.onerror = () => {
        console.error('Live2D脚本加载失败，使用CSS降级方案');
        setIsLive2DLoaded(false);
      };
      document.head.appendChild(script);
    };

    // 延迟初始化避免SSR问题
    const timer = setTimeout(initLive2D, 1000);
    return () => clearTimeout(timer);
  }, [isLive2DLoaded]);

  // 鼠标跟踪
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const centerX = position.x + 60;
      const centerY = position.y + 80;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      );
      
      setIsMouseNearby(distance < 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position]);

  // 点击处理
  const handleClick = useCallback(() => {
    if (isDragging) return;
    
    if (soundEnabled) sounds.playClick();
    showChatBubble();
  }, [isDragging, sounds, showChatBubble, soundEnabled]);

  // 拖拽处理
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (soundEnabled) sounds.playDrag();
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    showChatBubble({ message: "换个地方吧～", duration: 1500 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (soundEnabled) sounds.playDrag();
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    showChatBubble({ message: "换个地方吧～", duration: 1500 });
  };

  // 设备检测和位置加载
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const savedPosition = localStorage.getItem('live2d-position');
    if (savedPosition) {
      try {
        const parsedPosition = JSON.parse(savedPosition);
        setPosition(parsedPosition);
      } catch (error) {
        console.error('Failed to parse saved position:', error);
      }
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 拖拽事件处理
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      };
      
      const maxX = window.innerWidth - (isMobile ? 80 : 120);
      const maxY = window.innerHeight - (isMobile ? 100 : 160);
      
      newPosition.x = Math.max(0, Math.min(maxX, newPosition.x));
      newPosition.y = Math.max(0, Math.min(maxY, newPosition.y));
      
      setPosition(newPosition);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      const newPosition = {
        x: touch.clientX - dragOffset.x,
        y: touch.clientY - dragOffset.y
      };
      
      const maxX = window.innerWidth - (isMobile ? 80 : 120);
      const maxY = window.innerHeight - (isMobile ? 100 : 160);
      
      newPosition.x = Math.max(0, Math.min(maxX, newPosition.x));
      newPosition.y = Math.max(0, Math.min(maxY, newPosition.y));
      
      setPosition(newPosition);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        localStorage.setItem('live2d-position', JSON.stringify(position));
        if (onPositionChange) {
          onPositionChange(position.x, position.y);
        }
        showChatBubble({ message: "这里不错呢～", duration: 2000 });
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragOffset, position, onPositionChange, isMobile, showChatBubble]);

  if (!visible) return null;

  return (
    <>
      {/* 聊天气泡 */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: position.x + (isMobile ? 90 : 130),
              top: position.y - 80,
            }}
          >
            <div className={`relative bg-white dark:bg-gray-800 rounded-2xl px-3 py-2 shadow-2xl border border-pink-200 dark:border-pink-600 ${
              isMobile ? 'max-w-[200px] text-xs' : 'max-w-xs text-sm'
            }`}>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {currentBubble.message}
              </p>
              <div className="absolute bottom-2 -left-2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45 border-l border-b border-pink-200 dark:border-pink-600"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live2D角色容器 */}
      <motion.div 
        ref={containerRef}
        className={`fixed z-40 pointer-events-auto select-none ${
          isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab hover:scale-105'
        } transition-transform duration-200`}
        style={{ 
          left: position.x,
          top: position.y,
          width: isMobile ? '120px' : '150px', 
          height: isMobile ? '150px' : '200px'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Live2D容器 - oh-my-live2d会在这里渲染 */}
        <div 
          id="oh-my-live2d"
          className="w-full h-full"
        />
        
        {/* 加载中或降级显示 */}
        {!isLive2DLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative w-full h-full bg-gradient-to-b from-pink-300 via-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg border-4 border-pink-200"
              animate={{
                y: isDragging ? 0 : [0, -8, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {/* 发光效果 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-100/40 to-transparent rounded-full"
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* 占位角色 */}
              <div className="text-center z-10 relative">
                {/* 眼睛跟随鼠标 */}
                <div className="flex justify-center items-center mb-2 gap-1">
                  <motion.div 
                    className="w-3 h-3 bg-gray-800 rounded-full"
                    animate={{ 
                      x: isMouseNearby ? (mousePosition.x > position.x + 75 ? 2 : -2) : 0,
                      y: isMouseNearby ? (mousePosition.y > position.y + 100 ? 2 : -2) : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="w-3 h-3 bg-gray-800 rounded-full ml-2"
                    animate={{ 
                      x: isMouseNearby ? (mousePosition.x > position.x + 75 ? 2 : -2) : 0,
                      y: isMouseNearby ? (mousePosition.y > position.y + 100 ? 2 : -2) : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </div>
                
                {/* 表情 */}
                <motion.div 
                  className={`${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}
                  animate={{ 
                    rotate: isMouseNearby ? [0, -5, 5, 0] : 0,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {isMouseNearby ? '😊' : '✨'}
                </motion.div>
                
                <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-pink-800 mt-1`}>
                  Live2D
                </div>
              </div>
              
              {/* 害羞时的效果 */}
              {isMouseNearby && (
                <div className="absolute inset-0 bg-rose-300/20 rounded-full animate-pulse" />
              )}
            </motion.div>
          </div>
        )}
      </motion.div>
    </>
  );
}

// 为oh-my-live2d添加类型声明
declare global {
  interface Window {
    OhMyLive2D: {
      loadOhMyLive2D: (config: {
        models: Array<{
          path: string;
          position: number[];
          scale: number;
          stageStyle: {
            width: number;
            height: number;
          };
        }>;
        tips: {
          style: {
            width: number;
            height: number;
            left: number;
            top: number;
          };
        };
        statusBar: {
          disable: boolean;
        };
        menus: {
          disable: boolean;
        };
      }) => void;
    };
  }
}