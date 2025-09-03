"use client";

import { useState } from "react";
import ImprovedLive2D from "@/components/ui/improved-live2d";
import ZenitsuControls from "@/components/ui/zenitsu-controls";

export default function DebugPage() {
  const [zenitsuVisible, setZenitsuVisible] = useState(true);
  const [zenitsuSoundEnabled, setZenitsuSoundEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-cyan-400">Live2D Debug Page</h1>
        
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Component Status</h2>
            <div className="space-y-2">
              <p>✅ ImprovedLive2D组件已加载</p>
              <p>✅ ZenitsuControls组件已加载</p>
              <p>当前时间: {new Date().toLocaleString()}</p>
              <p>角色可见: {zenitsuVisible ? '是' : '否'}</p>
              <p>声音启用: {zenitsuSoundEnabled ? '是' : '否'}</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Live2D Test</h2>
            <p className="mb-4">如果您看到一个智能的Live2D角色而不是椭圆，说明组件工作正常。</p>
            <p className="text-sm text-muted-foreground">
              尝试点击角色切换表情，拖拽移动位置，鼠标靠近观察眼神跟随效果。
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">部署信息</h2>
            <div className="space-y-2 text-sm">
              <p>最新提交: feat: 全面优化Live2D角色和Medeo App布局体验</p>
              <p>构建状态: 正常</p>
              <p>如果Vercel上仍显示旧版本，请尝试:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>硬刷新浏览器 (Ctrl+F5 或 Cmd+Shift+R)</li>
                <li>清除浏览器缓存</li>
                <li>等待Vercel完成重新部署 (2-5分钟)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Live2D Character */}
      <ImprovedLive2D 
        visible={zenitsuVisible}
        soundEnabled={zenitsuSoundEnabled}
      />
      
      {/* Control Panel */}
      <ZenitsuControls
        onToggleVisible={setZenitsuVisible}
        onToggleSound={setZenitsuSoundEnabled}
      />
    </div>
  );
}