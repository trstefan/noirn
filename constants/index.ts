import {
  Smile,
  Heart,
  Zap,
  Meh,
  Frown,
  Moon,
  Sun,
  CloudRain,
  BookOpen,
  Leaf,
} from "lucide-react";

export interface MoodOption {
  icon: React.ComponentType<any>;
  label: string;
  color: string;
}

export interface ActivityTag {
  label: string;
  color: string;
}

//FeelingsForm constants moved to constants/index.ts

const moodOptions = [
  { icon: Smile, label: "Happy", color: "from-yellow-400 to-orange-400" },
  { icon: Heart, label: "Loved", color: "from-pink-400 to-red-400" },
  { icon: Zap, label: "Energetic", color: "from-[#f3722c] to-[#f8961e]" },
  { icon: Meh, label: "Neutral", color: "from-gray-400 to-gray-500" },
  { icon: Frown, label: "Sad", color: "from-[#00406c] to-[#003a61]" },
  { icon: Moon, label: "Tired", color: "from-[#364156] to-[#485265]" },
  { icon: Sun, label: "Grateful", color: "from-[#a30262] to-[#b55690]" },
  { icon: CloudRain, label: "Stressed", color: "from-rose-500 to-red-500" },
  { icon: BookOpen, label: "Reflective", color: "from-sky-400 to-indigo-500" },
  { icon: Leaf, label: "Peaceful", color: "from-emerald-400 to-green-500" },
];

const activityTags = [
  { label: "Walk", color: "from-green-400 to-emerald-500" },
  { label: "Music", color: "from-indigo-500 to-blue-500" },
  { label: "Friends", color: "from-pink-500 to-rose-500" },
  { label: "Reading", color: "from-teal-500 to-cyan-500" },
  { label: "Tea", color: "from-amber-400 to-yellow-500" },
  { label: "Meditation", color: "from-lime-500 to-green-600" },
  { label: "Work", color: "from-blue-500 to-cyan-500" },
  { label: "Gym", color: "from-emerald-500 to-green-500" },
  { label: "Planning", color: "from-orange-400 to-red-500" },
  { label: "Journaling", color: "from-purple-500 to-violet-500" },
  { label: "Coding", color: "from-blue-600 to-indigo-600" },
  { label: "Coffee", color: "from-yellow-600 to-amber-600" },
  { label: "Study", color: "from-orange-500 to-amber-500" },
  { label: "Family", color: "from-pink-400 to-rose-500" },
  { label: "Cooking", color: "from-red-400 to-orange-500" },
  { label: "Deadlines", color: "from-red-500 to-rose-600" },
  { label: "Emails", color: "from-cyan-500 to-blue-600" },
  { label: "Bath", color: "from-yellow-400 to-amber-500" },
  { label: "Scrolling", color: "from-gray-400 to-neutral-500" },
  { label: "TV", color: "from-indigo-400 to-violet-500" },
  { label: "Cleaning", color: "from-lime-500 to-green-500" },
  { label: "Movie", color: "from-rose-400 to-pink-500" },

  { label: "Run", color: "from-emerald-500 to-green-400" },
];

// Note Card constants moved to constants/index.ts

const moodColors: Record<string, string> = {
  Happy: "from-yellow-400 to-orange-400",
  Loved: "from-pink-400 to-red-400",
  Energetic: "from-purple-400 to-blue-400",
  Neutral: "from-gray-400 to-gray-500",
  Sad: "from-blue-400 to-indigo-400",
  Tired: "from-slate-500 to-gray-600",
  Grateful: "from-amber-400 to-yellow-500",
  Stressed: "from-rose-500 to-red-500",
  Reflective: "from-sky-400 to-indigo-500",
  Peaceful: "from-emerald-400 to-green-500",
};

const activityColors: Record<string, string> = {
  Walk: "from-green-400 to-emerald-500",
  Music: "from-indigo-500 to-blue-500",
  Friends: "from-pink-500 to-rose-500",
  Reading: "from-teal-500 to-cyan-500",
  Tea: "from-amber-400 to-yellow-500",
  Meditation: "from-lime-500 to-green-600",
  Work: "from-blue-500 to-cyan-500",
  Gym: "from-emerald-500 to-green-500",
  Planning: "from-orange-400 to-red-500",
  Journaling: "from-purple-500 to-violet-500",
  Coding: "from-blue-600 to-indigo-600",
  Coffee: "from-yellow-600 to-amber-600",
  Study: "from-orange-500 to-amber-500",
  Family: "from-pink-400 to-rose-500",
  Cooking: "from-red-400 to-orange-500",
  Deadlines: "from-red-500 to-rose-600",
  Emails: "from-cyan-500 to-blue-600",
  Bath: "from-yellow-400 to-amber-500",
  Scrolling: "from-gray-400 to-neutral-500",
  TV: "from-indigo-400 to-violet-500",
  Cleaning: "from-lime-500 to-green-500",
  Movie: "from-rose-400 to-pink-500",
  Run: "from-emerald-500 to-green-400",
};

// Calrendar Mood constants moved to constants/index.ts

const moodCalendarColors: Record<string, string> = {
  Happy: "bg-yellow-400",
  Loved: "bg-pink-400",
  Energetic: "bg-purple-400",
  Neutral: "bg-gray-400",
  Sad: "bg-blue-400",
  Tired: "bg-slate-500",
  Grateful: "bg-amber-400",
  Stressed: "bg-rose-500",
  Reflective: "bg-sky-400",
  Peaceful: "bg-emerald-400",
};

export {
  moodOptions,
  activityTags,
  moodColors,
  activityColors,
  moodCalendarColors,
};
