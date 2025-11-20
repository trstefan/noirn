"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { moodOptions, activityTags } from "@/constants";

interface FeelingsFormProps {
  user: User;
}

export default function FeelingsForm({ user }: FeelingsFormProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔍 Check if user has already submitted today on mount
  useEffect(() => {
    const checkExistingSubmission = async () => {
      const today = new Date().toISOString().split("T")[0];

      const { data: existingForms, error } = await supabase
        .from("submittedMoodForms")
        .select("id, created_at")
        .eq("user_id", user.id)
        .gte("created_at", `${today}T00:00:00.000Z`)
        .lte("created_at", `${today}T23:59:59.999Z`);

      if (error) console.error("❌ Error checking today's form:", error);

      if (existingForms && existingForms.length > 0) {
        setHasSubmittedToday(true);
      }
      setLoading(false);
    };

    checkExistingSubmission();
  }, [user.id]);

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;

    try {
      const { error } = await supabase.from("submittedMoodForms").insert([
        {
          user_id: user.id,
          mood: selectedMood,
          activities: selectedActivities,
          note,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setHasSubmittedToday(true);
      console.log("✅ Mood form submitted successfully!");
    } catch (error) {
      console.error("❌ Error submitting mood form:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10">
        Checking your mood entry for today...
      </div>
    );
  }

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

  // Normal form UI
  return (
    <div className="relative group  max-w-2xl mx-auto ">
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
            <Send className="w-5 h-5" />
            Submit Entry
          </span>
        </Button>
      </div>
    </div>
  );
}
