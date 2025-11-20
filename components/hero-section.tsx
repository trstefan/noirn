"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bike,
  Camera,
  Cat,
  Briefcase,
  Zap,
  Heart,
  PenTool,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

// Floating icon components adapted from the "elements.webp" idea but modernized
const FloatingIcon = ({
  icon: Icon,
  delay,
  x,
  y,
  color,
}: {
  icon: any;
  delay: number;
  x: string;
  y: string;
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: 1,
      scale: 1,
      y: [0, -15, 0],
    }}
    transition={{
      opacity: { duration: 0.5, delay },
      scale: { duration: 0.5, delay },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 1 },
    }}
    className={`absolute ${x} ${y} hidden lg:flex items-center justify-center w-16 h-16 rounded-2xl glass-panel border-slate-700 shadow-[0_0_30px_rgba(0,0,0,0.3)] z-10`}
  >
    <Icon className={`w-8 h-8 ${color}`} />
    <div
      className={`absolute inset-0 bg-${
        color.split("-")[1]
      }-500/20 blur-xl -z-10`}
    />
  </motion.div>
);

export const HeroSection: React.FC = () => {
  return (
    <section className=" bg-black text-white relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Floating Elements (From elements.webp concept) */}
        <FloatingIcon
          icon={Cat}
          delay={0.2}
          x="left-[10%]"
          y="top-[20%]"
          color="text-purple-400"
        />
        <FloatingIcon
          icon={Bike}
          delay={0.4}
          x="right-[15%]"
          y="top-[25%]"
          color="text-orange-400"
        />
        <FloatingIcon
          icon={Camera}
          delay={0.6}
          x="left-[15%]"
          y="bottom-[30%]"
          color="text-cyan-400"
        />
        <FloatingIcon
          icon={Briefcase}
          delay={0.8}
          x="right-[10%]"
          y="bottom-[35%]"
          color="text-emerald-400"
        />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Top Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-sm text-slate-300 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Personal Mood Journal
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Your thoughts, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 glow-text">
              unfiltered and unanalyzed
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
          >
            There are no bots, no suggestions, and no unsolicited analysis, just
            a clean, distraction-free environment for you to explore your own
            mind.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-full group hover:cursor-pointer"
              >
                Uncover Your Patterns
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-[#020617] to-transparent z-10" />
    </section>
  );
};
