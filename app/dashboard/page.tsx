// app/dashboard/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import ToggleTabs from "@/components/toggle-tabs";
import QuoteComponent from "@/components/quote-component";
import FeelingsForm from "@/components/feelings-form";
import HistoryGrid from "@/components/history-grid";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      if (!data.user) {
        router.push("/auth");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    });

    // Optional: listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) router.push("/auth");
      }
    );

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, [router]);

  if (loading) return <div className="p-6">Checking session...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-linear-to-br from-purple-900/20 via-black to-blue-900/20" />
      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <main className="container mx-auto px-4 pt-32 pb-20 space-y-12">
          {/* Welcome header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Welcome,{" "}
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {user.email}
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Track your mood and reflect on your day
            </p>
          </div>

          {/* Quote */}
          <QuoteComponent />

          {/* Toggle tabs */}
          <div className="flex justify-center">
            <ToggleTabs onTabChange={setActiveTab} />
          </div>

          {/* Content based on active tab */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "today" ? <FeelingsForm /> : <HistoryGrid />}
          </div>
        </main>
      </div>
    </div>
  );
}
