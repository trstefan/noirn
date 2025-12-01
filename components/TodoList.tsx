"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Check,
  ListTodo,
  CheckCircle2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type { Task } from "@/constants/types";

import {
  getAllTasks,
  addTask as addTaskDB,
  toggleTask as toggleTaskDB,
  deleteTask as deleteTaskDB,
  getTodayCompletedTasksOnly,
} from "@/lib/supabase-tasks";

import { User } from "@supabase/supabase-js";

interface TodoListProps {
  isFocusMode?: boolean;
  user: User;
}

type SortOption = "newest" | "oldest" | "alphabetical";
type TabOption = "pending" | "completed";

const TodoList = ({ isFocusMode = false, user }: TodoListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedToday, setCompletedToday] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTask, setNewTask] = useState("");
  const [activeTab, setActiveTab] = useState<TabOption>("pending");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);

  //
  // ────────────────────────────────────────────────
  //   FETCH ALL TASKS
  // ────────────────────────────────────────────────
  //
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setLoading(true);
      const data = await getAllTasks(user.id);
      setTasks(data);
      setLoading(false);
    };
    load();
  }, [user]);

  //
  // ────────────────────────────────────────────────
  //   FETCH COMPLETED TASKS FOR TODAY
  // ────────────────────────────────────────────────
  //
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const data = await getTodayCompletedTasksOnly(user.id);
      setCompletedToday(data);
    };
    load();
  }, [user, tasks]); // re-check when tasks change

  //
  // ────────────────────────────────────────────────
  //   ADD TASK
  // ────────────────────────────────────────────────
  //
  const addTask = async (text: string) => {
    if (!text.trim() || !user) return;
    const newEntry = await addTaskDB(user.id, text);

    setTasks((prev) => [newEntry, ...prev]);
    setNewTask("");
  };

  //
  // ────────────────────────────────────────────────
  //   DELETE TASK
  // ────────────────────────────────────────────────
  //
  const deleteTask = async (id: string) => {
    await deleteTaskDB(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  //
  // ────────────────────────────────────────────────
  //   TOGGLE COMPLETION
  // ────────────────────────────────────────────────
  //
  const toggleTask = async (id: string, current: boolean) => {
    const updated = await toggleTaskDB(id, !current);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  //
  // ────────────────────────────────────────────────
  //   FILTER TASKS
  // ────────────────────────────────────────────────
  //
  const pendingTasks = tasks.filter((t) => !t.completed);

  const sortTasks = (arr: Task[]) => {
    const sorted = [...arr];
    switch (sortOption) {
      case "newest":
        return sorted.sort((a, b) => Number(b.id) - Number(a.id));
      case "oldest":
        return sorted.sort((a, b) => Number(a.id) - Number(b.id));
      case "alphabetical":
        return sorted.sort((a, b) => a.text.localeCompare(b.text));
      default:
        return arr;
    }
  };

  const displayedTasks =
    activeTab === "pending"
      ? sortTasks(pendingTasks)
      : sortTasks(completedToday);

  //
  // ────────────────────────────────────────────────
  //   SORT ICON
  // ────────────────────────────────────────────────
  //
  const getSortIcon = () => {
    switch (sortOption) {
      case "newest":
        return <ArrowDown size={isFocusMode ? 16 : 14} />;
      case "oldest":
        return <ArrowUp size={isFocusMode ? 16 : 14} />;
      default:
        return <ArrowUpDown size={isFocusMode ? 16 : 14} />;
    }
  };

  return (
    <div
      className={`h-full w-full bg-card text-card-foreground rounded-2xl shadow-lg flex flex-col transition-all duration-500 hover:shadow-xl ${
        isFocusMode ? "p-5 md:p-8" : "p-4 md:p-6"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-secondary rounded-lg">
            <ListTodo
              size={isFocusMode ? 22 : 18}
              className="text-secondary-foreground"
            />
          </span>
          <span className="text-sm font-semibold uppercase tracking-wider">
            Tasks
          </span>
        </div>

        {/* SORT */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-xs"
          >
            {getSortIcon()}
            <span className="hidden sm:inline">Sort</span>
          </button>

          {showSortMenu && (
            <div className="absolute right-0 top-full mt-1 bg-card border rounded-lg shadow-lg z-10 min-w-[150px] overflow-hidden">
              <button
                className="px-3 py-2 text-xs flex gap-2 hover:bg-secondary w-full"
                onClick={() => {
                  setSortOption("newest");
                  setShowSortMenu(false);
                }}
              >
                <ArrowDown size={14} /> Newest First
              </button>
              <button
                className="px-3 py-2 text-xs flex gap-2 hover:bg-secondary w-full"
                onClick={() => {
                  setSortOption("oldest");
                  setShowSortMenu(false);
                }}
              >
                <ArrowUp size={14} /> Oldest First
              </button>
              <button
                className="px-3 py-2 text-xs flex gap-2 hover:bg-secondary w-full"
                onClick={() => {
                  setSortOption("alphabetical");
                  setShowSortMenu(false);
                }}
              >
                <ArrowUpDown size={14} /> A-Z
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 mb-4 bg-secondary/50 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("pending")}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs ${
            activeTab === "pending"
              ? "bg-card shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <ListTodo size={14} /> Pending
          {pendingTasks.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
              {pendingTasks.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs ${
            activeTab === "completed"
              ? "bg-card shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <CheckCircle2 size={14} /> Completed
          {completedToday.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-green-500 text-white text-xs">
              {completedToday.length}
            </span>
          )}
        </button>
      </div>

      {/* LIST */}
      <ul className="grow overflow-y-auto space-y-2 pr-1">
        {displayedTasks.length === 0 ? (
          <li className="h-full flex flex-col items-center justify-center text-muted-foreground py-8">
            {activeTab === "pending"
              ? "No pending tasks."
              : "No completed tasks today."}
          </li>
        ) : (
          displayedTasks.map((task) => (
            <li
              key={task.id}
              className={`group flex items-center gap-3 p-3 rounded-xl border ${
                task.completed ? "bg-muted" : "bg-card hover:border-primary/30"
              }`}
            >
              <button
                onClick={() => toggleTask(task.id, task.completed)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.completed
                    ? "bg-green-500 border-green-500"
                    : "border-muted-foreground"
                }`}
              >
                {task.completed && <Check size={12} className="text-white" />}
              </button>

              <span
                className={`grow text-sm ${
                  task.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.text}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))
        )}
      </ul>

      {/* INPUT */}
      {activeTab === "pending" && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask(newTask)}
            placeholder="Add a task..."
            className="grow bg-secondary rounded-xl px-4 py-3 text-sm"
          />
          <button
            onClick={() => addTask(newTask)}
            disabled={!newTask.trim()}
            className="p-3 bg-primary rounded-xl text-primary-foreground disabled:opacity-50"
          >
            <Plus size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
