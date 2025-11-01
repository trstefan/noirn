"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import NoteCard from "./note-card";

// Mock data - replace with actual data from database
const mockNotes = [
  {
    id: 1,
    date: "2024-01-15",
    feeling: "Happy",
    activities: ["Work", "Exercise"],
    note: "Had a great day at work! Finished the project ahead of schedule and went for a run in the evening.",
  },
  {
    id: 2,
    date: "2024-01-14",
    feeling: "Energetic",
    activities: ["Social", "Music"],
    note: "Spent time with friends and discovered some amazing new music. Feeling inspired!",
  },
  {
    id: 3,
    date: "2024-01-13",
    feeling: "Neutral",
    activities: ["Work", "Reading"],
    note: "Regular day. Got through my tasks and read a few chapters of my book.",
  },
  {
    id: 4,
    date: "2024-01-12",
    feeling: "Loved",
    activities: ["Social", "Relax"],
    note: "Quality time with family. We had dinner together and watched a movie.",
  },
  {
    id: 5,
    date: "2024-01-11",
    feeling: "Happy",
    activities: ["Creative", "Learn"],
    note: "Started learning a new skill today. Excited about the possibilities!",
  },
  {
    id: 6,
    date: "2024-01-10",
    feeling: "Energetic",
    activities: ["Exercise", "Music"],
    note: "Morning workout was intense! Listened to my favorite playlist.",
  },
  {
    id: 7,
    date: "2024-01-09",
    feeling: "Sad",
    activities: ["Relax"],
    note: "Not feeling my best today. Taking it easy and being kind to myself.",
  },
  {
    id: 8,
    date: "2024-01-08",
    feeling: "Happy",
    activities: ["Work", "Social", "Creative"],
    note: "Productive day! Collaborated with the team on a creative project.",
  },
];

export default function HistoryGrid() {
  const [displayCount, setDisplayCount] = useState(8);
  const [notes] = useState(mockNotes);

  const loadMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  return (
    <div className="space-y-8">
      {/* Grid */}
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
  );
}
