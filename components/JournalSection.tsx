"use client";

import React from "react";
import { GlassCard } from "./ui/GlassCard";
import { JournalEntry } from "../constants/types";
import { Clock, Activity } from "lucide-react";

const entries: JournalEntry[] = [
  {
    id: 1,
    title: "Night ride through Tokyo",
    date: "2 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    mood: "Energetic",
    moodColor: "amber",
    activity: "Fitness",
  },
  {
    id: 2,
    title: "Golden hour by the beach",
    date: "Yesterday",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    mood: "Peaceful",
    moodColor: "violet",
    activity: "Relax",
  },
  {
    id: 3,
    title: "New cafe discovery",
    date: "Oct 24",
    imageUrl:
      "https://images.unsplash.com/photo-1463797221720-6b07e6426c24?q=80&w=1000&auto=format&fit=crop",
    mood: "Inspired",
    moodColor: "rose",
    activity: "Food",
  },
  {
    id: 4,
    title: "Late night coding session",
    date: "Oct 22",
    imageUrl:
      "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=1000&auto=format&fit=crop",
    mood: "Focused",
    moodColor: "cyan",
    activity: "Work",
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<
    string,
    { bg: string; text: string; border: string; shadow: string; glow: string }
  > = {
    amber: {
      bg: "bg-amber-500",
      text: "text-amber-400",
      border: "group-hover:border-amber-500/50",
      shadow: "shadow-amber-500/20",
      glow: "from-amber-500/20",
    },
    violet: {
      bg: "bg-violet-500",
      text: "text-violet-400",
      border: "group-hover:border-violet-500/50",
      shadow: "shadow-violet-500/20",
      glow: "from-violet-500/20",
    },
    rose: {
      bg: "bg-rose-500",
      text: "text-rose-400",
      border: "group-hover:border-rose-500/50",
      shadow: "shadow-rose-500/20",
      glow: "from-rose-500/20",
    },
    cyan: {
      bg: "bg-cyan-500",
      text: "text-cyan-400",
      border: "group-hover:border-cyan-500/50",
      shadow: "shadow-cyan-500/20",
      glow: "from-cyan-500/20",
    },
  };
  return colors[color] || colors.cyan;
};

const JournalSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-slate-950" id="journal">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight text-white">
            Your Life,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              Curated.
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            Every moment is a piece of art. We help you organize your chaos into
            a beautiful gallery of memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {entries.map((entry, index) => {
            const theme = getColorClasses(entry.moodColor);

            return (
              <GlassCard
                key={entry.id}
                delay={index * 0.1}
                padding="p-0"
                className={`
                  group h-[420px] cursor-pointer 
                  hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] 
                  border-white/10 ${theme.border} transition-all duration-500
                `}
              >
                {/* Full Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={entry.imageUrl}
                    alt={entry.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient Overlay: Dark at bottom, lighter at top */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Colored glow on hover from bottom */}
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${theme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </div>

                {/* Content Layer */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Top Tags */}
                  <div className="flex justify-between items-start translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 group-hover:border-white/20 transition-colors">
                      <Clock className="w-3 h-3 text-slate-300" />
                      <span className="text-xs font-medium text-slate-200">
                        {entry.date}
                      </span>
                    </div>

                    <div
                      className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md
                      bg-white/10 border-white/10 ${theme.text}
                      group-hover:bg-white/20 transition-all
                    `}
                    >
                      <span className="text-xs font-bold uppercase tracking-wide">
                        {entry.mood}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="mb-3">
                      <span
                        className={`
                          inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                          bg-white/5 border border-white/10 text-slate-300 mb-3 backdrop-blur-sm
                       `}
                      >
                        <Activity className="w-3 h-3" />
                        {entry.activity}
                      </span>
                      <h3 className="text-2xl font-bold leading-tight text-white group-hover:text-white transition-colors drop-shadow-lg">
                        {entry.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JournalSection;
