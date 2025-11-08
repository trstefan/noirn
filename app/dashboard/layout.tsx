// app/dashboard/layout.tsx
import type { Metadata } from "next";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Noirn Layout",
  description: "Noirn - Mood based journal app",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen gap-10 bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="pt-20 flex-1">{children}</main>
    </div>
  );
}
