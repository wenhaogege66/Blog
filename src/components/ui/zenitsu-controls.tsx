"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Volume2, VolumeX, Eye, EyeOff } from "lucide-react";

interface ZenitsuControlsProps {
  onToggleVisible?: (visible: boolean) => void;
  onToggleSound?: (enabled: boolean) => void;
}

export default function ZenitsuControls({
  onToggleVisible,
  onToggleSound
}: ZenitsuControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zenitsuVisible, setZenitsuVisible] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleToggleVisible = () => {
    const newVisible = !zenitsuVisible;
    setZenitsuVisible(newVisible);
    onToggleVisible?.(newVisible);
  };

  const handleToggleSound = () => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    onToggleSound?.(newSoundEnabled);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* 控制按钮 */}
      <motion.button
        className="p-3 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-lg border-2 border-yellow-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-5 h-5 text-yellow-800" />
      </motion.button>

      {/* 控制面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="absolute top-16 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-yellow-200 dark:border-yellow-600 p-4 min-w-[200px]"
          >
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
              善逸控制面板 ⚡
            </h3>
            
            <div className="space-y-3">
              {/* 显示/隐藏控制 */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  显示善逸
                </span>
                <button
                  onClick={handleToggleVisible}
                  className={`p-2 rounded-lg transition-colors ${
                    zenitsuVisible
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  {zenitsuVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* 音效控制 */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  音效
                </span>
                <button
                  onClick={handleToggleSound}
                  className={`p-2 rounded-lg transition-colors ${
                    soundEnabled
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>

              {/* 使用说明 */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  💡 拖拽善逸移动位置<br />
                  🖱️ 点击善逸进行互动<br />
                  📜 滚动页面获得提示
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}