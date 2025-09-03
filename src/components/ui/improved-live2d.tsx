"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useZenitsuSounds } from "./zenitsu-sounds";

interface ImprovedLive2DProps {
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

export default function ImprovedLive2D({ 
  initialX = 100, 
  initialY = typeof window !== 'undefined' ? window.innerHeight - 200 : 400,
  onPositionChange,
  visible = true,
  soundEnabled = true
}: ImprovedLive2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentBubble, setCurrentBubble] = useState<ChatBubble>({ message: "", duration: 0 });
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isLive2DReady, setIsLive2DReady] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseNearby, setIsMouseNearby] = useState(false);
  const [currentExpression, setCurrentExpression] = useState<'happy' | 'excited' | 'shy'>('happy');
  
  const sounds = useZenitsuSounds();

  // Live2D角色台词
  const characterMessages = useCallback(() => [
    "你好呀！我是Live2D看板娘～ ✨",
    "今天过得怎么样呢？",
    "点击我试试看更多表情！",
    "我会跟着你的鼠标移动哦～",
    "这个网站设计得真不错！",
    "一起学习编程技术吧！",
    "想要换个位置吗？拖拽我试试！",
    "谢谢你陪伴我～ 💖"
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

  // 模拟Live2D初始化（为将来的真实Live2D做准备）
  useEffect(() => {
    const initLive2D = async () => {
      if (!canvasRef.current) return;
      
      try {
        console.log("正在初始化改进版Live2D组件...");
        
        // 模拟初始化延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 这里将来会是真正的PixiJS + pixi-live2d-display初始化代码
        // 现在先设置为已准备状态
        setIsLive2DReady(true);
        console.log("Live2D组件准备就绪！");
        
      } catch (error) {
        console.error("Live2D初始化失败:", error);
      }
    };

    initLive2D();
  }, []);

  // 鼠标跟踪效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const centerX = position.x + 75;
      const centerY = position.y + 100;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      );
      
      const wasNearby = isMouseNearby;
      const isNearby = distance < 150;
      setIsMouseNearby(isNearby);
      
      // 鼠标接近时改变表情
      if (isNearby && !wasNearby) {
        setCurrentExpression('shy');
      } else if (!isNearby && wasNearby) {
        setCurrentExpression('happy');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position, isMouseNearby]);

  // 点击处理
  const handleClick = useCallback(() => {
    if (isDragging) return;
    
    if (soundEnabled) sounds.playClick();
    
    // 循环切换表情
    const expressions: Array<'happy' | 'excited' | 'shy'> = ['happy', 'excited', 'shy'];
    const currentIndex = expressions.indexOf(currentExpression);
    const nextExpression = expressions[(currentIndex + 1) % expressions.length];
    setCurrentExpression(nextExpression);
    
    showChatBubble();
  }, [isDragging, sounds, showChatBubble, soundEnabled, currentExpression]);

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
    showChatBubble({ message: "换个地方看看吧～", duration: 1500 });
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
    showChatBubble({ message: "换个地方看看吧～", duration: 1500 });
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
      
      const maxX = window.innerWidth - (isMobile ? 100 : 150);
      const maxY = window.innerHeight - (isMobile ? 120 : 180);
      
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
      
      const maxX = window.innerWidth - (isMobile ? 100 : 150);
      const maxY = window.innerHeight - (isMobile ? 120 : 180);
      
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
        showChatBubble({ message: "这里很不错呢～", duration: 2000 });
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

  // 表情配置
  const expressionConfig = {
    happy: {
      emoji: "😊",
      eyeOffset: { x: 0, y: 0 },
      color: "from-pink-300 via-pink-400 to-rose-400",
      glowColor: "pink"
    },
    excited: {
      emoji: "✨",
      eyeOffset: { x: 0, y: -1 },
      color: "from-yellow-300 via-yellow-400 to-orange-400",
      glowColor: "yellow"
    },
    shy: {
      emoji: "😳",
      eyeOffset: { x: isMouseNearby ? (mousePosition.x > position.x + 75 ? 2 : -2) : 0, y: 0 },
      color: "from-rose-300 via-pink-400 to-red-400",
      glowColor: "rose"
    }
  };

  const currentExpressionData = expressionConfig[currentExpression];

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
              left: position.x + (isMobile ? 110 : 160),
              top: position.y - 80,
            }}
          >
            <div className={`relative bg-white dark:bg-gray-800 rounded-2xl px-3 py-2 shadow-2xl border border-${currentExpressionData.glowColor}-200 dark:border-${currentExpressionData.glowColor}-600 ${
              isMobile ? 'max-w-[200px] text-xs' : 'max-w-xs text-sm'
            }`}>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {currentBubble.message}
              </p>
              <div className={`absolute bottom-2 -left-2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45 border-l border-b border-${currentExpressionData.glowColor}-200 dark:border-${currentExpressionData.glowColor}-600`}></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 改进的Live2D角色容器 */}
      <motion.div 
        ref={containerRef}
        className={`fixed z-40 pointer-events-auto select-none ${
          isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab hover:scale-105'
        } transition-transform duration-200`}
        style={{ 
          left: position.x,
          top: position.y,
          width: isMobile ? '100px' : '150px', 
          height: isMobile ? '120px' : '180px'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Canvas容器 - 为将来的真实Live2D预留 */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-0"
          style={{ 
            display: isLive2DReady ? 'block' : 'none'
          }}
        />
        
        {/* 改进的角色显示 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className={`relative w-full h-full bg-gradient-to-b ${currentExpressionData.color} rounded-full flex items-center justify-center shadow-xl border-4 border-white/30`}
            animate={{
              y: isDragging ? 0 : [0, -8, 0],
              scale: isMouseNearby ? 1.05 : 1,
            }}
            transition={{
              y: {
                duration: currentExpression === 'excited' ? 1.5 : 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: {
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
          >
            {/* 动态发光效果 */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br from-${currentExpressionData.glowColor}-100/40 to-transparent rounded-full`}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: currentExpression === 'excited' ? 1 : 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* 角色脸部 */}
            <div className="text-center z-10 relative">
              {/* 眼睛 */}
              <div className="flex justify-center items-center mb-2 gap-2">
                <motion.div 
                  className="w-3 h-3 bg-gray-800 rounded-full"
                  animate={{ 
                    x: currentExpressionData.eyeOffset.x,
                    y: currentExpressionData.eyeOffset.y,
                    scale: currentExpression === 'excited' ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.div 
                  className="w-3 h-3 bg-gray-800 rounded-full"
                  animate={{ 
                    x: currentExpressionData.eyeOffset.x,
                    y: currentExpressionData.eyeOffset.y,
                    scale: currentExpression === 'excited' ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
              
              {/* 表情 */}
              <motion.div 
                className={`${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}
                animate={{ 
                  rotate: currentExpression === 'shy' ? [0, -5, 5, 0] : 0,
                  scale: currentExpression === 'excited' ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 1.5, repeat: currentExpression === 'excited' ? Infinity : 0 }}
              >
                {currentExpressionData.emoji}
              </motion.div>
              
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-gray-800 mt-1`}>
                Live2D
              </div>
            </div>
            
            {/* 特殊效果 */}
            {currentExpression === 'excited' && (
              <>
                <motion.div 
                  className="absolute -top-2 -right-2 text-yellow-200"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ⭐
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-1 -left-2 text-orange-200 text-sm"
                  animate={{ 
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.9, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                >
                  ✨
                </motion.div>
              </>
            )}

            {/* 害羞时的脸红效果 */}
            {currentExpression === 'shy' && (
              <div className="absolute inset-0 bg-red-300/25 rounded-full animate-pulse" />
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}