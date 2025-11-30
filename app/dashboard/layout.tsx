// app/dashboard/layout.tsx
import type { Metadata } from "next";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "ChronoCompass • Write to Know Yourself",
  description:
    "Capture thoughts, see patterns, act with clarity. ChronoCompass helps you write to know yourself through intelligent journaling with your personal insights.",
  keywords: [
    "mood tracker",
    "productivity app",
    "online journal",
    "study timer",
    "task manager",
    "pomodoro session",
    "mental wellness",
    "daily planner",
    "personal growth app",
  ],
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen gap-10 bg-black">
      {/* Navbar */}

      {/* Main content */}
      <main className=" flex-1">{children}</main>
    </div>
  );
}
