"use client";

import { useState } from "react";
import ToggleTabs from "@/components/toggle-tabs";
import QuoteComponent from "@/components/quote-component";
import FeelingsForm from "@/components/FeelingsForm";
import HistoryGrid from "@/components/history-grid";
import type { User } from "@supabase/supabase-js";

type ActiveTab = "today" | "history";

interface DashboardClientProps {
  user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("today");

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-linear-to-br from-purple-900/20 via-black to-blue-900/20 pointer-events-none" />
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <main className="relative z-10 container mx-auto px-4 pt-32 pb-20 space-y-12 ">
        {/* Welcome header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Welcome,&nbsp;
            <span className="br-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text">
              {user.email}
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Track your mood and reflect on your day
          </p>
        </header>

        {/* Quote */}
        <QuoteComponent />

        {/* Tabs */}
        <div className="flex justify-center">
          <ToggleTabs onTabChange={setActiveTab} />
        </div>

        {/* Conditional content */}
        <section className="max-w-7xl mx-auto ">
          {activeTab === "today" ? (
            <FeelingsForm user={user} />
          ) : (
            <HistoryGrid user={user} />
          )}
        </section>
      </main>
    </div>
  );
}
