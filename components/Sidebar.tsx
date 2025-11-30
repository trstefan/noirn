"use client";

import {
  Home,
  Target,
  Brain,
  LogOut,
  ArrowRight,
  ArrowLeft,
  BookOpenText,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ActivePage = "dashboard" | "focus" | "history";

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const navItems = [
    { name: "Dashboard", key: "dashboard", icon: ClipboardList },
    { name: "Study Mode", key: "focus", icon: Brain },
    { name: "History", key: "history", icon: BookOpenText },
  ];

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await supabase.auth.signOut();
      router.replace("/");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <aside
      className={cn(
        "fixed top-0 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 z-20 flex flex-col justify-between transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Top Section: Logo + Toggle */}
      <div className="p-4 flex items-center justify-between">
        <h1
          className={cn(
            "text-xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent transition-all duration-300 overflow-hidden whitespace-nowrap",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}
        >
          ChronoCompass
        </h1>

        {/* Toggle button inside sidebar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl hover:bg-white/20 transition"
        >
          {collapsed ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-2">
        {navItems.map((item) => {
          const active = activePage === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setActivePage(item.key as ActivePage)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all",
                active
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section: Home + Logout */}
      <div className="p-4 border-t border-white/10 flex flex-col gap-2">
        {/* Home button */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl transition-all",
            "text-gray-400 hover:bg-white/5 hover:text-white",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <Home size={20} />
          {!collapsed && <span>Home</span>}
        </Link>

        {/* Logout button */}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className={cn(
            "w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-red-400 transition",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
