"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function QuoteComponent() {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated quote fetch - replace with actual Supabase call
    const fetchQuote = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with: const { data } = await supabase.from('quotes').select('*').single()
      setQuote(
        "The future belongs to those who believe in the beauty of their dreams."
      );
      setAuthor("Eleanor Roosevelt");
      setIsLoading(false);
    };

    fetchQuote();
  }, []);

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />

      {/* Card */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg blur-md opacity-50" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            {isLoading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-700 rounded w-1/3" />
              </div>
            ) : (
              <>
                <p className="text-gray-200 text-lg leading-relaxed italic">
                  "{quote}"
                </p>
                <p className="text-sm text-purple-400 font-medium">
                  — {author}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
