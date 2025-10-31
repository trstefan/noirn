// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

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
    <div className="p-6">
      <h2 className="text-xl mb-4">Welcome back, {user.email}</h2>
      <p>Here you'll eventually create and view your mood entries.</p>
    </div>
  );
}
