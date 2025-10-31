// app/auth/page.tsx
"use client";

import React, { useState } from "react";
import ToggleTabs from "@/components/ToggleTabs";
import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  const [active, setActive] = useState<"signup" | "login">("signup");

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-900 text-white p-6">
      <div className="w-full max-w-3xl bg-gray-900 rounded-xl p-8 shadow-lg">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Welcome to Noirn</h1>
          <ToggleTabs
            tabs={["signup", "login"]}
            active={active}
            onChange={(t) => setActive(t as "signup" | "login")}
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            {/* Left column: marketing copy / elevator pitch */}
            <p className="text-gray-300 mb-4">
              Save micro-journals tied to your mood. Private by default. Nights
              when you need them.
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Private mood tracking</li>
              <li>• Add notes and reflections</li>
              <li>• Export or sync later</li>
            </ul>
          </div>

          <div>
            <AuthForm mode={active} />
            <div className="text-xs text-gray-500 mt-3">
              Want to use Google/GitHub? You can enable OAuth later in Supabase
              and add buttons here.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
