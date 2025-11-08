"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NoteCard from "./note-card";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { Calendar } from "lucide-react";
import CalendarMood from "./CalendarMood";

interface HistoryGridProps {
  user: User;
}

interface MoodForm {
  id: string;
  mood: string;
  note: string;
  activities: string[] | null;
  created_at: string;
}

export default function HistoryGrid({ user }: HistoryGridProps) {
  const [notes, setNotes] = useState<MoodForm[]>([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("submittedMoodForms")
          .select("id, mood, note, activities, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Parse activities if stored as JSON text
        const parsedData =
          data?.map((entry) => ({
            ...entry,
            activities:
              typeof entry.activities === "string"
                ? JSON.parse(entry.activities)
                : entry.activities,
          })) || [];

        setNotes(parsedData);
      } catch (error) {
        console.error("❌ Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

  const loadMore = () => setDisplayCount((prev) => prev + 8);

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10">
        Loading your mood history...
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No mood entries yet — start by submitting your first one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Calendar - appears first on mobile (top), right side on desktop */}
      <div className="lg:col-span-1 order-1 lg:order-2">
        <CalendarMood entries={notes} />
      </div>

      {/* Notes grid - appears second on mobile (bottom), left side on desktop */}
      <div className="lg:col-span-2 order-2 lg:order-1 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {notes.slice(0, displayCount).map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>

        {/* Load more button */}
        {displayCount < notes.length && (
          <div className="flex justify-center">
            <Button
              onClick={loadMore}
              variant="outline"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 rounded-full px-8 py-6 text-lg bg-black/40 backdrop-blur-xl"
            >
              Load more notes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
