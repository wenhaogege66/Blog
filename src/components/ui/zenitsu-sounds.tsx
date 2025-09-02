"use client";

import { useCallback } from "react";

export interface ZenitsuSounds {
  playClick: () => void;
  playDrag: () => void;
  playWelcome: () => void;
}

export function useZenitsuSounds(): ZenitsuSounds {
  // 创建音效（使用Web Audio API生成简单音效）
  const createBeep = useCallback((frequency: number, duration: number) => {
    if (typeof window === 'undefined') return;
    
    try {
      // 修复TypeScript错误
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch {
      // 如果音频API不可用，静默处理
      console.log('Audio not available');
    }
  }, []);

  const playClick = useCallback(() => {
    // 雷电音效：高频快速闪烁
    createBeep(800, 0.1);
    setTimeout(() => createBeep(1200, 0.05), 50);
  }, [createBeep]);

  const playDrag = useCallback(() => {
    // 拖拽音效：低频短音
    createBeep(400, 0.2);
  }, [createBeep]);

  const playWelcome = useCallback(() => {
    // 欢迎音效：上升音调
    createBeep(500, 0.15);
    setTimeout(() => createBeep(700, 0.15), 100);
    setTimeout(() => createBeep(900, 0.15), 200);
  }, [createBeep]);

  return {
    playClick,
    playDrag,
    playWelcome
  };
}