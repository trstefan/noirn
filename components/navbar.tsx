"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await supabase.auth.signOut();
      router.replace("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <h1 className="text-xl italic font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-blue-400">
                Noirn
              </h1>
            </div>
          </Link>

          {/* Desktop Buttons */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-6 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>

          {/* Mobile Menu Button (future) */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (optional expansion later) */}
      {/* Add dropdown here if you want mobile navigation */}

      {/* Animated border bottom */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
      )}
    </nav>
  );
}
