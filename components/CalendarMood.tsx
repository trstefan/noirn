"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { moodCalendarColors } from "@/constants";

// Mood colors mapping

interface MoodEntry {
  id: string;
  mood: string;
  note: string;
  activities: string[] | null;
  created_at: string;
}

interface MoodCalendarProps {
  entries?: MoodEntry[];
}

export default function CalendarMood({ entries = [] }: MoodCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Create a map of dates to moods
  const moodMap = new Map<string, string>();
  entries.forEach((entry) => {
    const date = new Date(entry.created_at);
    const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    moodMap.set(dayKey, entry.mood);
  });

  const getMoodForDate = (day: number) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    return moodMap.get(dateKey);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Create array of day cells
  const dayCells = [];

  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    dayCells.push(<div key={`empty-${i}`} className="aspect-square p-2" />);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const mood = getMoodForDate(day);
    const today = isToday(day);

    dayCells.push(
      <div
        key={day}
        className={`aspect-square p-2 flex flex-col items-center justify-center gap-1 rounded-lg transition-all ${
          today
            ? "bg-purple-500/20 border border-purple-500/40"
            : "hover:bg-gray-800/30"
        }`}
      >
        <span
          className={`text-sm font-medium ${
            today ? "text-white" : "text-gray-300"
          }`}
        >
          {day}
        </span>
        {mood && (
          <div
            className={`w-2 h-2 rounded-full ${moodCalendarColors[mood]} shadow-lg`}
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative group h-fit ">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20" />

      <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 space-y-4">
        {/* Header with month/year and navigation */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{monthName}</h3>
          <div className="flex items-center gap-1">
            <Button
              onClick={previousMonth}
              variant="outline"
              size="icon"
              className="border-purple-500/30 bg-gray-900/50 hover:bg-purple-500/10 text-purple-400 rounded-lg h-8 w-8"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={nextMonth}
              variant="outline"
              size="icon"
              className="border-purple-500/30 bg-gray-900/50 hover:bg-purple-500/10 text-purple-400 rounded-lg h-8 w-8"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-400 pb-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">{dayCells}</div>

        {/* Legend */}
        <div className="pt-3 border-t border-purple-500/20">
          <h4 className="text-xs font-semibold text-gray-400 mb-2">
            Mood Legend
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(moodCalendarColors).map(([mood, color]) => (
              <div key={mood} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-xs text-gray-400">{mood}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
