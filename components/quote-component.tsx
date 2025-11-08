"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Sparkles } from "lucide-react";

export default function QuoteComponent() {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      setIsLoading(true);

      try {
        // Get total count of quotes first
        const { count, error: countError } = await supabase
          .from("quotes")
          .select("*", { count: "exact", head: true });

        if (countError) throw countError;
        if (!count || count === 0) throw new Error("No quotes found.");

        // Generate a random offset
        const randomOffset = Math.floor(Math.random() * count);

        // Fetch one random quote using the offset
        const { data, error } = await supabase
          .from("quotes")
          .select("quote, author")
          .range(randomOffset, randomOffset)
          .single();

        if (error) throw error;

        setQuote(data.quote);
        setAuthor(data.author || "");
      } catch (err) {
        console.error("Error fetching quote:", err);
        setQuote(
          "The magic you are looking for is in the work you're avoiding."
        );
        setAuthor("");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="relative group text-center">
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
                {author && (
                  <p className="text-sm text-purple-400 font-medium">
                    {author}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
