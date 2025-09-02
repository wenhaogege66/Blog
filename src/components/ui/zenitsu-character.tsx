"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadOml2d } from "oh-my-live2d";
import Draggable from "react-draggable";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentBubble, setCurrentBubble] = useState<ChatBubble>({ message: "", duration: 0 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const oml2dInstance = useRef<any>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
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

  // 初始化Live2D
  useEffect(() => {
    const initLive2D = async () => {
      try {
        // 使用oh-my-live2d库初始化，暂时使用默认模型
        oml2dInstance.current = await loadOml2d({
          dockedPosition: "left",
          menus: {
            items: []
          },
          mobileDisplay: true,
          models: [
            {
              "path": "https://model.oml2d.com/shizuku/shizuku.model.json",
              "scale": 0.15,
              "position": [0, 50],
              "mobileScale": 0.1,
              "mobilePosition": [0, 30]
            }
          ],
          tips: {
            messageLine: 3,
            idleTips: {
              wordTheDay: false
            }
          }
        });

        // 3秒后显示欢迎消息
        setTimeout(() => {
          showChatBubble({ message: "欢迎来到我的博客！我是吾妻善逸⚡", duration: 4000 });
        }, 3000);

      } catch (error) {
        console.error("Failed to load Live2D model:", error);
      }
    };

    initLive2D();

    // 清理函数
    return () => {
      if (oml2dInstance.current) {
        oml2dInstance.current.destroy?.();
      }
    };
  }, []);

  // 监听滚动事件，显示相关提示
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // 防抖处理
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (Math.random() > 0.7) { // 30% 概率显示提示
          showChatBubble();
        }
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // 处理拖拽开始
  const handleDragStart = () => {
    setIsDragging(true);
    showChatBubble({ message: "要搬家了吗？⚡", duration: 1500 });
  };

  // 处理拖拽结束
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStop = (_e: any, data: any) => {
    setIsDragging(false);
    const newPosition = { x: data.x, y: data.y };
    setDragPosition(newPosition);
    
    // 保存位置到本地存储
    localStorage.setItem('zenitsu-position', JSON.stringify(newPosition));
    
    if (onPositionChange) {
      onPositionChange(newPosition.x, newPosition.y);
    }
    
    showChatBubble({ message: "这里不错呢～", duration: 2000 });
  };

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
        setDragPosition(parsedPosition);
      } catch (error) {
        console.error('Failed to parse saved position:', error);
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
              left: dragPosition.x + 120,
              top: dragPosition.y - 80,
            }}
          >
            <div className={`relative bg-white dark:bg-gray-800 rounded-2xl px-3 py-2 shadow-2xl border border-yellow-200 dark:border-yellow-600 ${
              isMobile ? 'max-w-[240px] text-xs' : 'max-w-xs text-sm'
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
      <Draggable
        defaultPosition={{ x: initialX, y: initialY }}
        position={dragPosition}
        onStart={handleDragStart}
        onStop={handleDragStop}
        bounds="parent"
      >
        <div 
          ref={containerRef}
          className={`fixed z-40 pointer-events-auto cursor-move select-none ${
            isDragging ? 'scale-110' : 'hover:scale-105'
          } transition-transform duration-200`}
          onClick={handleClick}
          style={{ 
            width: isMobile ? '80px' : '120px', 
            height: isMobile ? '100px' : '150px',
            left: 0,
            top: 0 
          }}
        >
          {/* 临时善逸占位图标，后续替换为Live2D模型 */}
          <motion.div
            className={`w-full h-full bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg ${
              isMobile ? 'text-2xl' : 'text-4xl'
            }`}
            whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ⚡
          </motion.div>
        </div>
      </Draggable>
    </>
  );
}