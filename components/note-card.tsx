"use client";

import { Calendar } from "lucide-react";

interface NoteCardProps {
  date: string;
  feeling: string;
  activities: string[];
  note: string;
}

const moodColors: Record<string, string> = {
  Happy: "from-yellow-400 to-orange-400",
  Loved: "from-pink-400 to-red-400",
  Energetic: "from-purple-400 to-blue-400",
  Neutral: "from-gray-400 to-gray-500",
  Sad: "from-blue-400 to-indigo-400",
};

const activityColors: Record<string, string> = {
  Work: "from-blue-500 to-cyan-500",
  Exercise: "from-green-500 to-emerald-500",
  Social: "from-pink-500 to-rose-500",
  Creative: "from-purple-500 to-violet-500",
  Relax: "from-yellow-500 to-amber-500",
  Learn: "from-orange-500 to-red-500",
  Music: "from-indigo-500 to-blue-500",
  Reading: "from-teal-500 to-cyan-500",
};

export default function NoteCard({
  date,
  feeling,
  activities,
  note,
}: NoteCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
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
          {/* Feeling tag */}
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-linear-to-r ${
              moodColors[feeling] || moodColors.Neutral
            }`}
          >
            {feeling}
          </span>

          {/* Activity tags */}
          {activities.map((activity) => (
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
        <p className="text-gray-300 leading-relaxed line-clamp-3">{note}</p>
      </div>
    </div>
  );
}
