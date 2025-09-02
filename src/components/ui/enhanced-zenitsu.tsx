"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useZenitsuSounds } from "./zenitsu-sounds";

interface ZenitsuCharacterProps {
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

interface ZenitsuExpression {
  emoji: string;
  color: string;
  animation?: {
    [key: string]: number | number[];
  };
}

const expressions: Record<string, ZenitsuExpression> = {
  happy: { emoji: "😊", color: "from-yellow-300 to-yellow-400", animation: { scale: [1, 1.1, 1] } },
  excited: { emoji: "⚡", color: "from-yellow-200 to-orange-400", animation: { rotate: [0, 10, -10, 0] } },
  shy: { emoji: "😳", color: "from-pink-300 to-red-400", animation: { x: [-2, 2, -2, 0] } },
  scared: { emoji: "😰", color: "from-blue-300 to-blue-400", animation: { y: [-3, 3, -3, 0] } },
  determined: { emoji: "😤", color: "from-orange-300 to-red-400", animation: { scale: [1, 1.2, 1] } },
  sleeping: { emoji: "😴", color: "from-purple-300 to-purple-400", animation: { y: [0, -2, 0] } }
};

export default function EnhancedZenitsu({ 
  initialX = 100, 
  initialY = typeof window !== 'undefined' ? window.innerHeight - 200 : 400,
  onPositionChange,
  visible = true,
  soundEnabled = true
}: ZenitsuCharacterProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentBubble, setCurrentBubble] = useState<ChatBubble>({ message: "", duration: 0 });
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [currentExpression, setCurrentExpression] = useState<keyof typeof expressions>('happy');
  const [clickCount, setClickCount] = useState(0);
  
  const sounds = useZenitsuSounds();

  // 扩展的善逸台词库 - 使用useCallback记忆化
  const expressionMessages = useCallback(() => ({
    happy: [
      "今天天气真好呢！⚡",
      "编程让我快乐！",
      "和大家一起学习真开心～"
    ],
    excited: [
      "雷の呼吸！⚡",
      "我要变强！",
      "看我的雷电速度！",
      "全力以赴！⚡⚡"
    ],
    shy: [
      "别、别看我...好害羞",
      "你在夸我吗？",
      "我、我会努力的...",
    ],
    scared: [
      "呜呜呜...好可怕",
      "不要离开我！",
      "我需要勇气...",
    ],
    determined: [
      "我会保护大家！",
      "绝对不会放弃！",
      "这是我的承诺！",
    ],
    sleeping: [
      "呼...呼...正在休息",
      "梦到了禰豆子炭...",
      "zzz...编程梦..."
    ]
  }), []);

  // 根据页面位置和时间显示不同的提示消息
  const getBubbleMessage = useCallback((): ChatBubble => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercent = scrollY / (documentHeight - windowHeight);
    const hour = new Date().getHours();

    // 根据时间调整善逸状态
    if (hour >= 22 || hour <= 6) {
      setCurrentExpression('sleeping');
      return { message: "晚安，记得早点休息哦～", duration: 3000 };
    }

    if (scrollPercent < 0.1) {
      setCurrentExpression('excited');
      return { message: "欢迎来到我的博客！⚡", duration: 3000 };
    } else if (scrollPercent < 0.3) {
      setCurrentExpression('happy');
      return { message: "一起了解我的故事吧～", duration: 2500 };
    } else if (scrollPercent < 0.6) {
      setCurrentExpression('excited');
      return { message: "看看这些厉害的项目！", duration: 2500 };
    } else if (scrollPercent < 0.85) {
      setCurrentExpression('determined');
      return { message: "一起学习编程知识吧～", duration: 2500 };
    } else {
      setCurrentExpression('shy');
      return { message: "有什么想聊的吗？", duration: 2500 };
    }
  }, []);

  // 显示聊天气泡
  const showChatBubble = useCallback((bubble?: ChatBubble, expression?: keyof typeof expressions) => {
    const bubbleData = bubble || getBubbleMessage();
    setCurrentBubble(bubbleData);
    setShowBubble(true);
    
    if (expression) {
      setCurrentExpression(expression);
    }
    
    setTimeout(() => {
      setShowBubble(false);
    }, bubbleData.duration);
  }, [getBubbleMessage]);

  // 初始化和欢迎消息
  useEffect(() => {
    setTimeout(() => {
      if (soundEnabled) sounds.playWelcome();
      showChatBubble({ message: "欢迎来到我的博客！我是吾妻善逸⚡", duration: 4000 }, 'excited');
    }, 3000);
  }, [showChatBubble, sounds, soundEnabled]);

  // 监听滚动事件
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (Math.random() > 0.85) {
          showChatBubble();
        }
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [showChatBubble]);

  // 处理角色点击 - 增强版
  const handleClick = useCallback(() => {
    if (isDragging) return;
    
    setClickCount(prev => prev + 1);
    if (soundEnabled) sounds.playClick();

    // 根据点击次数显示不同反应
    let selectedExpression: keyof typeof expressions;
    let message: string;

    if (clickCount > 5) {
      selectedExpression = 'shy';
      message = "你很喜欢我吗？好害羞...";
    } else if (clickCount > 3) {
      selectedExpression = 'excited';  
      message = "你点击得好快！就像雷电一样⚡";
    } else {
      const expressionKeys = Object.keys(expressions) as (keyof typeof expressions)[];
      selectedExpression = expressionKeys[Math.floor(Math.random() * expressionKeys.length)];
      const messages = expressionMessages()[selectedExpression as keyof ReturnType<typeof expressionMessages>];
      message = messages[Math.floor(Math.random() * messages.length)];
    }

    showChatBubble({ message, duration: 2500 }, selectedExpression);
  }, [isDragging, clickCount, sounds, showChatBubble, expressionMessages, soundEnabled]);

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
    showChatBubble({ message: "要搬家了吗？⚡", duration: 1500 }, 'excited');
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
    showChatBubble({ message: "要搬家了吗？⚡", duration: 1500 }, 'excited');
  };

  // 设备检测和位置加载
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
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

  // 拖拽事件处理
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      };
      
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
      
      const maxX = window.innerWidth - (isMobile ? 80 : 120);
      const maxY = window.innerHeight - (isMobile ? 100 : 150);
      
      newPosition.x = Math.max(0, Math.min(maxX, newPosition.x));
      newPosition.y = Math.max(0, Math.min(maxY, newPosition.y));
      
      setPosition(newPosition);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        localStorage.setItem('zenitsu-position', JSON.stringify(position));
        if (onPositionChange) {
          onPositionChange(position.x, position.y);
        }
        showChatBubble({ message: "这里不错呢～", duration: 2000 }, 'happy');
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

  // 重置点击计数
  useEffect(() => {
    const resetTimer = setTimeout(() => setClickCount(0), 10000);
    return () => clearTimeout(resetTimer);
  }, [clickCount]);

  const currentExpr = expressions[currentExpression];

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
            <div className={`relative bg-white dark:bg-gray-800 rounded-2xl px-3 py-2 shadow-2xl border border-yellow-200 dark:border-yellow-600 ${
              isMobile ? 'max-w-[200px] text-xs' : 'max-w-xs text-sm'
            }`}>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {currentBubble.message}
              </p>
              <div className="absolute bottom-2 -left-2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45 border-l border-b border-yellow-200 dark:border-yellow-600"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 增强版善逸角色 */}
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
        <motion.div
          className="relative w-full h-full"
          animate={{
            y: isDragging ? 0 : [0, -8, 0],
          }}
          transition={{
            y: {
              duration: currentExpression === 'sleeping' ? 3 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {/* 主体 - 根据表情变化颜色 */}
          <motion.div 
            className={`relative w-full h-full bg-gradient-to-b ${currentExpr.color} rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-200`}
            animate={currentExpr.animation}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          >
            {/* 发光效果 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-100/40 to-transparent rounded-full"
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: currentExpression === 'excited' ? 0.8 : 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* 表情和文字 */}
            <div className="text-center z-10">
              <motion.div 
                className={`${isMobile ? 'text-xl' : 'text-3xl'} mb-1`}
                animate={{ 
                  rotate: currentExpression === 'shy' ? [0, -10, 10, 0] : 0,
                  scale: currentExpression === 'excited' ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {currentExpr.emoji}
              </motion.div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-yellow-800`}>
                善逸
              </div>
            </div>
            
            {/* 动态装饰雷电 */}
            {currentExpression === 'excited' && (
              <>
                <motion.div 
                  className="absolute -top-2 -right-2 text-yellow-200"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ⚡
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-1 -left-2 text-yellow-200 text-xs"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                >
                  ⚡
                </motion.div>
              </>
            )}

            {/* 害羞时的脸红效果 */}
            {currentExpression === 'shy' && (
              <div className="absolute inset-0 bg-pink-300/20 rounded-full animate-pulse" />
            )}

            {/* 睡觉时的Z字效果 */}
            {currentExpression === 'sleeping' && (
              <motion.div 
                className="absolute -top-4 -right-4 text-purple-400 text-sm"
                animate={{ 
                  y: [-5, -15],
                  opacity: [1, 0],
                  scale: [0.8, 1.2]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                z z z
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}