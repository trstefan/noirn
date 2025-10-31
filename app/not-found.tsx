"use client";

import { Button } from "@/components/ui/button";
import PulsingBorderShader from "@/components/ui/pulsing-border-shader";
import { Home, Search, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-pulse" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12">
          {/* Animated 404 with shader */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-3xl scale-150 animate-pulse" />

            {/* 404 Text with shader background */}
            <div className="relative flex items-center justify-center">
              <div className="absolute scale-75 sm:scale-100"></div>
              <h1 className="relative text-8xl sm:text-9xl lg:text-[12rem] font-bold tracking-tighter">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  404
                </span>
              </h1>
            </div>
          </div>

          {/* Error message */}
          <div className="text-center space-y-4 max-w-2xl mt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              Page Not Found
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Lost in the{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                digital void
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed px-4">
              The page you're looking for has vanished into the quantum realm.
              Let's get you back on track.
            </p>
          </div>

          {/* Action buttons */}
          <div>
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-full group"
              >
                <Home className="mr-2 w-5 h-5" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
