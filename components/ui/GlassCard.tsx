import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  padding?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  delay = 0,
  hoverEffect = true,
  padding = "p-6",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`
        relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl 
        transition-all duration-500 shadow-2xl
        ${hoverEffect ? "hover:shadow-lg hover:-translate-y-1" : ""}
        ${padding}
        ${className}
      `}
    >
      {/* Glossy shine effect at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent opacity-50" />

      {children}
    </motion.div>
  );
};
