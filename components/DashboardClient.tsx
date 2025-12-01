"use client";

import { useEffect, useState } from "react";
import ToggleTabs from "@/components/toggle-tabs";
import FeelingsForm from "@/components/FeelingsForm";
import HistoryGrid from "@/components/history-grid";
import PulsingBorderShader from "@/components/ui/pulsing-border-shader";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "@/components/Sidebar";
import FocusContent from "@/components/FocusContent";

type ActiveTab = "today" | "history";
type ActivePage = "dashboard" | "focus" | "history";

interface DashboardClientProps {
  user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("today");
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile name
  useEffect(() => {
    async function loadProfile() {
      const { data } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      setProfileName(data?.name ?? null);
      setLoading(false);
    }
    loadProfile();
  }, [user.id]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-black text-white flex items-center justify-center">
        <PulsingBorderShader />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main content */}
      <div
        className="flex-1 relative transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 80 : 256 }}
      >
        {/* Background effects */}
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

        <main className="relative z-10 px-8 pt-6 pb-16 space-y-12 max-w-full">
          {activePage === "dashboard" && (
            <>
              <header className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  Welcome,&nbsp;
                  <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {profileName || "Friend"}
                  </span>
                </h1>
                <p className="text-gray-400">
                  Track your mood and reflect on your day
                </p>
              </header>

              {/* Tabs */}
              <div className="pt-4">
                <ToggleTabs onTabChange={setActiveTab} />
              </div>

              {/* Views */}
              <section className="pt-4">
                {activeTab === "today" ? (
                  <FeelingsForm user={user} />
                ) : (
                  <HistoryGrid user={user} />
                )}
              </section>
            </>
          )}

          {activePage === "focus" && <FocusContent user={user} />}
          {activePage === "history" && <HistoryGrid user={user} />}
        </main>
      </div>
    </div>
  );
}
