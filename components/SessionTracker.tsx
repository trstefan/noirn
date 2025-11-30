"use client";

import { useState, useEffect } from "react";
import {
  Target,
  Plus,
  Check,
  Trash2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  FolderOpenDot,
  Save,
  FolderOpen,
} from "lucide-react";
import type { Session, Subtask } from "@/constants/types";
import { Progress } from "@/components/ui/progress";
import { User } from "@supabase/supabase-js";
import { createBrowserClient } from "@/lib/browser";
import SessionModal from "./SessionModal";

interface SessionTrackerProps {
  isFocusMode?: boolean;
  user: User;
}

const SessionTracker = ({ isFocusMode = false, user }: SessionTrackerProps) => {
  const supabase = createBrowserClient();

  const [session, setSession] = useState<Session>({
    id: undefined, // <-- Use undefined for new sessions
    isActive: false,
    sessionname: "",
    goal: "",
    starttime: null,
    timespent: 0,
    subtasks: [],
  });

  const [newSubtask, setNewSubtask] = useState("");
  const [savedSessions, setSavedSessions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);

  // TIMER
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (session.isActive) {
      interval = setInterval(() => {
        setSession((prev) => ({
          ...prev,
          timespent: prev.timespent + 1,
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [session.isActive]);

  const toggleSession = () => {
    if (!session.isActive) {
      setSession((prev) => ({
        ...prev,
        isActive: true,
        starttime: prev.starttime
          ? new Date(prev.starttime).getTime()
          : new Date().getTime(),
      }));
    } else {
      setSession((prev) => ({ ...prev, isActive: false }));
    }
  };

  const resetSession = () => {
    setSession({
      id: undefined, // <-- reset to undefined
      sessionname: "",
      goal: "",
      starttime: null,
      timespent: 0,
      isActive: false,
      subtasks: [],
    });
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ---------- SAVE SESSION ----------
  const saveSession = async () => {
    if (!session.sessionname.trim()) return alert("Session name is required");

    const { data: saved, error } = await supabase
      .from("sessions")
      .upsert({
        id: session.id || undefined, // <-- undefined for new sessions
        user_id: user.id,
        sessionname: session.sessionname,
        goal: session.goal,
        starttime: session.starttime ? new Date(session.starttime) : new Date(),
        timespent: session.timespent,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Error saving session");
      return;
    }

    setSession((prev) => ({ ...prev, id: saved.id }));

    // SAVE SUBTASKS
    await supabase.from("session_subtasks").delete().eq("session_id", saved.id);

    const subtasksPayload = session.subtasks.map((s) => ({
      session_id: saved.id,
      text: s.text,
      completed: s.completed,
    }));

    await supabase.from("session_subtasks").insert(subtasksPayload);

    alert("Session saved!");
  };

  // ---------- FETCH SAVED SESSIONS ----------
  const fetchSavedSessions = async () => {
    setLoadingSessions(true);

    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) console.error(error);

    setSavedSessions(data || []);
    setShowModal(true);
    setLoadingSessions(false);
    console.log("test");
  };

  // ---------- LOAD SESSION ----------
  const loadSession = async (sessionId: string) => {
    setShowModal(false);

    const { data: sdata } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    const { data: subtasks } = await supabase
      .from("session_subtasks")
      .select("*")
      .eq("session_id", sessionId);

    setSession({
      id: sdata.id,
      sessionname: sdata.sessionname,
      goal: sdata.goal,
      starttime: sdata.starttime ? new Date(sdata.starttime).getTime() : null,
      timespent: sdata.timespent,
      isActive: false,
      subtasks:
        subtasks?.map((st) => ({
          id: st.id,
          text: st.text,
          completed: st.completed,
        })) ?? [],
    });
  };

  // ---------- SUBTASK HANDLING ----------
  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    const subtask: Subtask = {
      id: Date.now().toString() + Math.random().toString(),
      text: newSubtask,
      completed: false,
    };
    setSession((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, subtask],
    }));
    setNewSubtask("");
  };

  const toggleSubtask = (id: string) => {
    setSession((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((s) =>
        s.id === id ? { ...s, completed: !s.completed } : s
      ),
    }));
  };

  const deleteSubtask = (id: string) => {
    setSession((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((s) => s.id !== id),
    }));
  };

  const completedCount = session.subtasks.filter((s) => s.completed).length;
  const totalCount = session.subtasks.length;
  const progressPercent =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <>
      <SessionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        sessions={savedSessions}
        isLoading={loadingSessions}
        onLoadSession={loadSession}
      />

      {/* ---------------- MAIN COMPONENT ---------------- */}
      <div
        className={`h-full w-full bg-card text-card-foreground rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden ${
          isFocusMode
            ? "p-6 md:p-8 lg:p-10 ring-2 ring-primary/20"
            : "p-4 md:p-6 lg:p-8"
        }`}
      >
        {/* ----- Header ----- */}
        <div className="flex flex-col gap-4 mb-6 z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`bg-secondary rounded-xl ${
                  isFocusMode ? "p-3" : "p-2"
                }`}
              >
                <Target size={isFocusMode ? 24 : 20} className="text-primary" />
              </div>
              <div>
                <h2
                  className={`font-semibold tracking-tight text-foreground ${
                    isFocusMode
                      ? "text-xl sm:text-2xl md:text-3xl"
                      : "text-lg sm:text-xl md:text-2xl"
                  }`}
                >
                  Current Session
                </h2>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Track your progress
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 ${
                session.isActive
                  ? "bg-green-500/10 text-green-600"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  session.isActive
                    ? "bg-green-500 animate-pulse"
                    : "bg-muted-foreground"
                }`}
              />
              {session.isActive ? "ACTIVE" : "IDLE"}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={saveSession}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-xs sm:text-sm font-medium transition-all hover:cursor-pointer"
            >
              <Save size={16} />
              <span className="hidden xs:inline">Save</span>
            </button>
            <button
              onClick={fetchSavedSessions}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/70 text-foreground text-xs sm:text-sm font-medium transition-all hover:cursor-pointer"
            >
              <FolderOpen size={16} />
              <span className="hidden xs:inline">Load</span>
            </button>
          </div>
        </div>

        {/* --- Grid Layout --- */}
        <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT SIDE: Timer + Metadata */}
          <div className="flex flex-col gap-4">
            {/* Session Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Session Name
              </label>
              <input
                type="text"
                placeholder="e.g., Deep Work: API Integration"
                className={`w-full bg-transparent border-b-2 border-border font-medium text-foreground focus:outline-none focus:border-primary pb-2 ${
                  isFocusMode ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                }`}
                value={session.sessionname}
                onChange={(e) =>
                  setSession({ ...session, sessionname: e.target.value })
                }
              />
            </div>

            {/* Goal */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Primary Goal
              </label>
              <input
                type="text"
                placeholder="What do you want to achieve?"
                className="w-full bg-transparent border-b-2 border-border text-base font-medium text-foreground focus:outline-none focus:border-primary pb-2"
                value={session.goal}
                onChange={(e) =>
                  setSession({ ...session, goal: e.target.value })
                }
              />
            </div>

            {/* Timer */}
            <div className="mt-auto pt-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Time Elapsed
                </span>
              </div>

              <div
                className={`font-bold tracking-tighter font-mono ${
                  isFocusMode
                    ? "text-5xl md:text-6xl lg:text-7xl bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                    : "text-4xl md:text-5xl lg:text-6xl text-foreground"
                }`}
              >
                {formatDuration(session.timespent)}
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={toggleSession}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all hover:cursor-pointer ${
                    session.isActive
                      ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {session.isActive ? (
                    <>
                      <Pause size={16} /> Pause
                    </>
                  ) : session.timespent > 0 ? (
                    <>
                      <Play size={16} /> Resume
                    </>
                  ) : (
                    <>
                      <Play size={16} /> Start
                    </>
                  )}
                </button>

                {session.timespent > 0 && (
                  <button
                    onClick={resetSession}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all hover:cursor-pointer"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Subtasks */}
          <div className="flex flex-col bg-secondary/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Subtasks
              </h3>
              <span className="text-xs text-muted-foreground font-mono">
                {completedCount}/{totalCount}
              </span>
            </div>

            {totalCount > 0 && (
              <div className="mb-4">
                <Progress value={progressPercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {Math.round(progressPercent)}% complete
                </p>
              </div>
            )}

            <ul className="grow overflow-y-auto space-y-2 max-h-48">
              {session.subtasks.length === 0 ? (
                <li className="text-center text-muted-foreground text-sm py-4">
                  No subtasks yet. Break down your goal!
                </li>
              ) : (
                session.subtasks.map((subtask) => (
                  <li
                    key={subtask.id}
                    className={`group flex items-center gap-2 p-2 rounded-lg transition-all ${
                      subtask.completed ? "bg-green-500/10" : "bg-card"
                    }`}
                  >
                    <button
                      onClick={() => toggleSubtask(subtask.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                        subtask.completed
                          ? "bg-green-500 border-green-500"
                          : "border-muted-foreground hover:border-primary"
                      }`}
                    >
                      {subtask.completed && (
                        <Check size={12} className="text-white" />
                      )}
                    </button>

                    <span
                      className={`grow text-sm ${
                        subtask.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {subtask.text}
                    </span>

                    <button
                      onClick={() => deleteSubtask(subtask.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))
              )}
            </ul>

            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSubtask()}
                placeholder="Add a subtask..."
                className="grow bg-card text-foreground rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={addSubtask}
                disabled={!newSubtask.trim()}
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 hover:cursor-pointer"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionTracker;
