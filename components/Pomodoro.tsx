"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain, Zap } from "lucide-react";
import { PomodoroMode } from "@/constants/types";

const TIMER_SETTINGS = {
  [PomodoroMode.FOCUS]: 25 * 60,
  [PomodoroMode.SHORT_BREAK]: 5 * 60,
  [PomodoroMode.LONG_BREAK]: 15 * 60,
};

const MODE_COLORS: Record<PomodoroMode, string> = {
  [PomodoroMode.FOCUS]: "#FF6B6B",
  [PomodoroMode.SHORT_BREAK]: "#4ECDC4",
  [PomodoroMode.LONG_BREAK]: "#FFD93D",
};

const Pomodoro = () => {
  const [mode, setMode] = useState<PomodoroMode>(PomodoroMode.FOCUS);
  const [timeLeft, setTimeLeft] = useState(TIMER_SETTINGS[PomodoroMode.FOCUS]);
  const [isActive, setIsActive] = useState(false);
  const initialTimeRef = useRef(TIMER_SETTINGS[PomodoroMode.FOCUS]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(TIMER_SETTINGS[mode]);
    initialTimeRef.current = TIMER_SETTINGS[mode];
  };

  const changeMode = (newMode: PomodoroMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(TIMER_SETTINGS[newMode]);
    initialTimeRef.current = TIMER_SETTINGS[newMode];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress =
    ((initialTimeRef.current - timeLeft) / initialTimeRef.current) * 100;

  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div
      className="h-full w-full rounded-2xl p-4 md:p-6 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
      style={{ backgroundColor: MODE_COLORS[mode] }}
    >
      {/* Mode Selector */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">
          Timer
        </span>
        <div className="flex gap-1 md:gap-2">
          {[
            { type: PomodoroMode.FOCUS, icon: Brain, title: "Focus" },
            {
              type: PomodoroMode.SHORT_BREAK,
              icon: Coffee,
              title: "Short Break",
            },
            { type: PomodoroMode.LONG_BREAK, icon: Zap, title: "Long Break" },
          ].map(({ type, icon: Icon, title }) => (
            <button
              key={type}
              onClick={() => changeMode(type)}
              className={`p-1.5 rounded-full transition-all border border-white/20 hover:border-white hover:scale-110 ${
                mode === type ? "bg-white/30" : "bg-transparent"
              }`}
              title={title}
            >
              <Icon size={14} className="text-white" />
            </button>
          ))}
        </div>
      </div>

      {/* Timer & Progress - Fixed circle rendering with proper viewBox and pixel values */}
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
          <svg
            className="absolute w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={circleRadius}
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-white/20"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={circleRadius}
              stroke="white"
              strokeWidth="4"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="text-2xl md:text-4xl font-bold tracking-tighter z-10 text-white font-mono">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="p-3 rounded-full shadow-md text-white bg-white/30 transition-all hover:scale-110"
        >
          {isActive ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" />
          )}
        </button>
        <button
          onClick={resetTimer}
          className="p-3 rounded-full shadow-md text-white bg-white/30 transition-all hover:scale-110"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
