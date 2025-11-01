"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Heart, Zap, Sparkles } from "lucide-react";

const moodOptions = [
  { icon: Smile, label: "Happy", color: "from-yellow-400 to-orange-400" },
  { icon: Heart, label: "Loved", color: "from-pink-400 to-red-400" },
  { icon: Zap, label: "Energetic", color: "from-purple-400 to-blue-400" },
  { icon: Meh, label: "Neutral", color: "from-gray-400 to-gray-500" },
  { icon: Frown, label: "Sad", color: "from-blue-400 to-indigo-400" },
];

const activityTags = [
  { label: "Work", color: "from-blue-500 to-cyan-500" },
  { label: "Exercise", color: "from-green-500 to-emerald-500" },
  { label: "Social", color: "from-pink-500 to-rose-500" },
  { label: "Creative", color: "from-purple-500 to-violet-500" },
  { label: "Relax", color: "from-yellow-500 to-amber-500" },
  { label: "Learn", color: "from-orange-500 to-red-500" },
  { label: "Music", color: "from-indigo-500 to-blue-500" },
  { label: "Reading", color: "from-teal-500 to-cyan-500" },
];

export default function FeelingsForm() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = () => {
    if (!selectedMood) return;

    // Here you would save to database
    console.log("[v0] Submitting:", { selectedMood, selectedActivities, note });
    setHasSubmittedToday(true);
  };

  if (hasSubmittedToday) {
    return (
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20" />
        <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            All set for today!
          </h3>
          <p className="text-gray-400">
            You already filled a form today. Come back tomorrow!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />

      {/* Form card */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 sm:p-8 space-y-8">
        {/* Mood selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            How are you feeling?
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.label;
              return (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`relative group/mood p-4 rounded-xl transition-all ${
                    isSelected
                      ? "bg-linear-to-r " + mood.color + " scale-105"
                      : "bg-gray-800/50 hover:bg-gray-700/50"
                  }`}
                >
                  {isSelected && (
                    <div
                      className={`absolute -inset-0.5 bg-linear-to-r ${mood.color} rounded-xl blur opacity-50`}
                    />
                  )}
                  <div className="relative flex flex-col items-center gap-2">
                    <Icon
                      className={`w-6 h-6 ${
                        isSelected ? "text-white" : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        isSelected ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {mood.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Activity tags */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            What did you do today?
          </h3>
          <div className="flex flex-wrap gap-2">
            {activityTags.map((tag) => {
              const isSelected = selectedActivities.includes(tag.label);
              return (
                <button
                  key={tag.label}
                  onClick={() => toggleActivity(tag.label)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isSelected
                      ? `bg-linear-to-r ${tag.color} text-white scale-105`
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                  }`}
                >
                  {isSelected && (
                    <div
                      className={`absolute -inset-0.5 bg-linear-to-r ${tag.color} rounded-full blur opacity-50`}
                    />
                  )}
                  <span className="relative">{tag.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Note textarea */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Add a note</h3>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur" />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How was your day? What's on your mind?"
              className="relative w-full h-32 bg-gray-900/50 border border-purple-500/20 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/40 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          disabled={!selectedMood}
          className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed group/btn"
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Submit Entry
          </span>
        </Button>
      </div>
    </div>
  );
}
