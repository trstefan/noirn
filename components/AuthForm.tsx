// components/AuthForm.tsx
"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation"; // Next.js App Router client navigation

export default function AuthForm({ mode }: { mode: "signup" | "login" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${location.origin}/dashboard` },
        }); // optional redirect
        if (error) throw error;
        // Supabase can send confirmation email if configured.
        setInfo(
          "Check your email to confirm your account (if email confirmations are enabled)."
        );
      } else {
        // login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // On success, session is stored automatically. Redirect to dashboard.
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message ?? "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <label className="block">
        <span className="text-sm text-gray-300">Email</span>
        <input
          className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-300">Password</span>
        <input
          className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </label>

      {error && <div className="text-sm text-red-400">{error}</div>}
      {info && <div className="text-sm text-yellow-300">{info}</div>}

      <button
        type="submit"
        className="px-4 py-2 rounded bg-white text-black disabled:opacity-50"
        disabled={loading}
      >
        {loading
          ? "Working..."
          : mode === "signup"
          ? "Create account"
          : "Sign in"}
      </button>

      <div className="text-xs text-gray-400 mt-2">
        {mode === "signup"
          ? "By signing up, you agree to the app's terms."
          : "Forgot your password? Use the reset link."}
      </div>
    </form>
  );
}
