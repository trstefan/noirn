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
    <html lang="en">
      <body className="flex flex-col min-h-screen gap-10 bg-yellow-500">
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
