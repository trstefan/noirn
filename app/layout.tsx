import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
