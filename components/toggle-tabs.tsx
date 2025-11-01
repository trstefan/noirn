"use client";

import { useState } from "react";

interface ToggleTabsProps {
  onTabChange: (tab: "today" | "history") => void;
}

export default function ToggleTabs({ onTabChange }: ToggleTabsProps) {
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");

  const handleTabClick = (tab: "today" | "history") => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="relative inline-flex items-center gap-2 p-1.5 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-full">
      {/* Animated background slider */}
      <div
        className={`absolute top-1.5 h-[calc(100%-12px)] bg-linear-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-300 ease-out ${
          activeTab === "today"
            ? "left-1.5 w-[calc(50%-6px)]"
            : "left-[calc(50%+3px)] w-[calc(50%-6px)]"
        }`}
      />

      {/* Tabs */}
      <button
        onClick={() => handleTabClick("today")}
        className={`relative z-10 px-8 py-3 rounded-full font-medium transition-colors duration-300 ${
          activeTab === "today"
            ? "text-white"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        Today
      </button>
      <button
        onClick={() => handleTabClick("history")}
        className={`relative z-10 px-8 py-3 rounded-full font-medium transition-colors duration-300 ${
          activeTab === "history"
            ? "text-white"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        History
      </button>
    </div>
  );
}
