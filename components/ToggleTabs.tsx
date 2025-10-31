// components/ToggleTabs.tsx
"use client";
import React from "react";

export default function ToggleTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <div className="flex gap-2 bg-gray-800 p-1 rounded-full w-max">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-4 py-2 rounded-full transition ${
            active === t ? "bg-white text-black" : "text-white/80"
          }`}
          aria-pressed={active === t}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
