"use client";

import { motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";
import Pomodoro from "./Pomodoro";
import TodoList from "./TodoList";

import AmbientDock from "./AmbientDock";
import Clock from "./Clock";
import SessionTracker from "./SessionTracker";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FocusContentProps {
  user: User;
}

export default function FocusContent({ user }: FocusContentProps) {
  const [focusMode, setFocusMode] = useState(false);
  //console.log(user);

  return (
    <div className="min-h-screen  pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Header - dimmed in focus mode */}
        <header
          className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-500 ${
            focusMode ? "opacity-30 blur-[1px] pointer-events-none" : ""
          }`}
        >
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-bold text-foreground">
              Focus Mode
            </h1>
            <p className="text-muted-foreground font-medium text-sm md:text-base mt-1">
              Stay productive with all your tools in one place
            </p>
          </div>
          <Clock />
        </header>

        <div className="flex justify-end">
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 relative ${
              focusMode
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {focusMode ? (
              <>
                <EyeOff size={16} />
                Exit Focus
              </>
            ) : (
              <>
                <Eye size={16} />
                Focus Mode
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - SessionTracker & TodoList stacked */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Session Tracker - highlighted in focus mode */}
            <div
              className={`transition-all duration-500 ${
                focusMode
                  ? "ring-2 ring-primary/40 rounded-2xl scale-[1.01] z-10"
                  : ""
              }`}
            >
              <SessionTracker user={user} isFocusMode={focusMode} />
            </div>

            {/* Todo List - highlighted in focus mode */}
            <div
              className={`transition-all duration-500 ${
                focusMode
                  ? "ring-2 ring-primary/40 rounded-2xl scale-[1.01] z-10"
                  : ""
              }`}
            >
              <TodoList isFocusMode={focusMode} />
            </div>
          </div>

          {/* Right Column - Pomodoro fixed in sidebar */}
          <div
            className={`lg:w-80 xl:w-96 shrink-0 transition-all duration-500 ${
              focusMode
                ? "opacity-25 blur-[2px] pointer-events-none scale-95"
                : ""
            }`}
          >
            <div className="lg:sticky lg:top-6">
              <Pomodoro />
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Dock - dimmed in focus mode */}
      <div
        className={`transition-all duration-500 ${
          focusMode ? "opacity-25 blur-[1px] pointer-events-none" : ""
        }`}
      >
        <AmbientDock />
      </div>
    </div>
  );
}
