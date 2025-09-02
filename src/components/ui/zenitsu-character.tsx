"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ZenitsuCharacterProps {
  initialX?: number;
  initialY?: number;
  onPositionChange?: (x: number, y: number) => void;
}

interface ChatBubble {
  message: string;
  duration: number;
}

export default function ZenitsuCharacter({ 
  initialX = 100, 
  initialY = typeof window !== 'undefined' ? window.innerHeight - 200 : 400,
  onPositionChange 
}: ZenitsuCharacterProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentBubble, setCurrentBubble] = useState<ChatBubble>({ message: "", duration: 0 });
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // 根据页面位置显示不同的提示消息
  const getBubbleMessage = (): ChatBubble => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercent = scrollY / (documentHeight - windowHeight);

    if (scrollPercent < 0.1) {
      return { message: "欢迎来到我的博客！⚡", duration: 3000 };
    } else if (scrollPercent < 0.3) {
      return { message: "一起了解我的故事吧～", duration: 2500 };
    } else if (scrollPercent < 0.6) {
      return { message: "看看这些厉害的项目！", duration: 2500 };
    } else if (scrollPercent < 0.85) {
      return { message: "一起学习编程知识吧～", duration: 2500 };
    } else {
      return { message: "有什么想聊的吗？", duration: 2500 };
    }
  };

  // 显示聊天气泡
  const showChatBubble = useCallback((bubble?: ChatBubble) => {
    const bubbleData = bubble || getBubbleMessage();
    setCurrentBubble(bubbleData);
    setShowBubble(true);
    
    setTimeout(() => {
      setShowBubble(false);
    }, bubbleData.duration);
  }, []);

  // 初始化和欢迎消息
  useEffect(() => {
    // 3秒后显示欢迎消息
    setTimeout(() => {
      showChatBubble({ message: "欢迎来到我的博客！我是吾妻善逸⚡", duration: 4000 });
    }, 3000);
  }, [showChatBubble]);

  // 监听滚动事件，显示相关提示
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // 防抖处理
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (Math.random() > 0.8) { // 20% 概率显示提示
          showChatBubble();
        }
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [showChatBubble]);

  // 处理角色点击
  const handleClick = useCallback(() => {
    if (isDragging) return; // 拖拽时不触发点击
    
    const expressions = [
      { msg: "雷の呼吸！⚡" },
      { msg: "别、别看我...好害羞" },
      { msg: "我要变强！" },
      { msg: "禰豆子炭！" },
      { msg: "呜呜呜...好可怕" }
    ];
    
    const randomExpr = expressions[Math.floor(Math.random() * expressions.length)];
    showChatBubble({ message: randomExpr.msg, duration: 2500 });
  }, [isDragging, showChatBubble]);

  // 处理拖拽开始
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    showChatBubble({ message: "要搬家了吗？⚡", duration: 1500 });
  };

  // 处理触摸开始（移动端）
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    showChatBubble({ message: "要搬家了吗？⚡", duration: 1500 });
  };

  // 检测移动设备和从本地存储加载位置
  useEffect(() => {
    // 检测是否为移动设备
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // 加载保存的位置
    const savedPosition = localStorage.getItem('zenitsu-position');
    if (savedPosition) {
      try {
        const parsedPosition = JSON.parse(savedPosition);
        setPosition(parsedPosition);
      } catch (error) {
        console.error('Failed to parse saved position:', error);
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 处理全局鼠标移动和松开事件
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      };
      
      // 边界检查
      const maxX = window.innerWidth - (isMobile ? 80 : 120);
      const maxY = window.innerHeight - (isMobile ? 100 : 150);
      
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
      
      // 边界检查
      const maxX = window.innerWidth - (isMobile ? 80 : 120);
      const maxY = window.innerHeight - (isMobile ? 100 : 150);
      
      newPosition.x = Math.max(0, Math.min(maxX, newPosition.x));
      newPosition.y = Math.max(0, Math.min(maxY, newPosition.y));
      
      setPosition(newPosition);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // 保存位置到本地存储
        localStorage.setItem('zenitsu-position', JSON.stringify(position));
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
  }, [isDragging, dragOffset, position, onPositionChange, isMobile]);

  return (
    <>
      {/* 自定义聊天气泡 */}
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
            <div className={`relative bg-white dark:bg-gray-800 rounded-2xl px-3 py-2 shadow-2xl border border-yellow-200 dark:border-yellow-600 ${
              isMobile ? 'max-w-[200px] text-xs' : 'max-w-xs text-sm'
            }`}>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {currentBubble.message}
              </p>
              {/* 气泡尾巴 */}
              <div className="absolute bottom-2 -left-2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45 border-l border-b border-yellow-200 dark:border-yellow-600"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 可拖拽的善逸角色 */}
      <motion.div 
        className={`fixed z-40 pointer-events-auto select-none ${
          isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab hover:scale-105'
        } transition-transform duration-200`}
        style={{ 
          left: position.x,
          top: position.y,
          width: isMobile ? '80px' : '120px', 
          height: isMobile ? '100px' : '150px'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* 善逸角色设计 */}
        <motion.div
          className="relative w-full h-full"
          animate={{
            y: isDragging ? 0 : [0, -5, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {/* 主体 - 黄色雷电风格 */}
          <div className="relative w-full h-full bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-200">
            {/* 闪电效果 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 to-transparent rounded-full"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* 善逸表情 */}
            <div className="text-center">
              <div className={`${isMobile ? 'text-xl' : 'text-3xl'} mb-1`}>⚡</div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-yellow-800`}>
                善逸
              </div>
            </div>
            
            {/* 装饰性雷电 */}
            <motion.div 
              className="absolute -top-2 -right-2 text-yellow-200"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ⚡
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-1 -left-2 text-yellow-200 text-xs"
              animate={{ 
                rotate: [0, -10, 10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.8, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              ⚡
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}