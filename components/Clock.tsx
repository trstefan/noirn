"use client";

import { useState, useEffect } from "react";

interface ClockProps {
  showOnlyTime?: boolean;
}

const Clock = ({ showOnlyTime }: ClockProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="text-right">
      <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter transition-transform text-white font-bold font-mono">
        {formatTime(time)}
      </h2>
      <p className="text-muted-foreground font-medium text-sm md:text-base">
        {formatDate(time)}
      </p>
    </div>
  );
};

export default Clock;
