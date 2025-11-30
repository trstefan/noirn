"use client";

import { X, Clock, Target, CheckCircle2, ListTodo } from "lucide-react";
import type { SavedSession } from "@/constants/types";

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: SavedSession[];
  isLoading: boolean;
  onLoadSession: (sessionId: string) => void;
}

const SessionModal = ({
  isOpen,
  onClose,
  sessions,
  isLoading,
  onLoadSession,
}: SessionModalProps) => {
  if (!isOpen) return null;

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-primary/10 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <ListTodo size={22} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Saved Sessions
              </h2>
              <p className="text-sm text-muted-foreground">
                {sessions.length} session{sessions.length !== 1 ? "s" : ""}{" "}
                available
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">
                Loading sessions...
              </p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <div className="p-4 bg-muted rounded-full">
                <Target size={32} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">No saved sessions</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start a new session and save it to see it here
                </p>
              </div>
            </div>
          ) : (
            <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {sessions.map((session) => (
                <li
                  key={session.id}
                  onClick={() => onLoadSession(session.id)}
                  className="group relative p-4 bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/20 rounded-2xl cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {session.sessionname || "Untitled Session"}
                      </h3>
                      {session.goal && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {session.goal}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock size={14} />
                          <span>{formatDuration(session.timespent)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 size={14} />
                          <span>{formatDate(session.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 p-2 rounded-xl bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <Target size={18} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-muted hover:bg-muted/70 text-foreground font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
