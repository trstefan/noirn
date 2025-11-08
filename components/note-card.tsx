"use client";

import { Calendar } from "lucide-react";
import { moodColors, activityColors } from "@/constants";

interface NoteCardProps {
  id: string;
  mood: string;
  activities: string[] | null;
  note: string;
  created_at: string;
}

export default function NoteCard({
  mood,
  activities,
  note,
  created_at,
}: NoteCardProps) {
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Card */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 space-y-4 hover:border-purple-500/40 transition-colors">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {/* Mood tag */}
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-linear-to-r ${
              moodColors[mood] || moodColors.Neutral
            }`}
          >
            {mood}
          </span>

          {/* Activity tags */}
          {Array.isArray(activities) &&
            activities.map((activity) => (
              <span
                key={activity}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-linear-to-r ${
                  activityColors[activity] || "from-gray-500 to-gray-600"
                }`}
              >
                {activity}
              </span>
            ))}
        </div>

        {/* Note content */}
        {note && (
          <p className="text-gray-300 leading-relaxed line-clamp-3">{note}</p>
        )}
      </div>
    </div>
  );
}
