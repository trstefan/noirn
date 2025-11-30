"use client";

import { useState } from "react";
import { Plus, Trash2, Check, ListTodo } from "lucide-react";
import type { Task } from "@/constants/types";

interface TodoListProps {
  isFocusMode?: boolean;
}

const TodoList = ({ isFocusMode = false }: TodoListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = (text: string) => {
    if (!text.trim()) return;
    const task: Task = {
      id: Date.now().toString() + Math.random().toString(),
      text,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const markAllComplete = () => {
    setTasks(tasks.map((t) => ({ ...t, completed: true })));
  };

  const deleteAll = () => {
    setTasks([]);
  };

  return (
    <div
      className={`h-full w-full bg-card text-card-foreground rounded-2xl shadow-lg flex flex-col transition-all duration-500 hover:shadow-xl ${
        isFocusMode ? "p-5 md:p-8 shadow-xl" : "p-4 md:p-6"
      }`}
      role="region"
      aria-label="Todo List"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`p-2 bg-secondary rounded-lg ${
              isFocusMode ? "p-3" : ""
            }`}
          >
            <ListTodo
              size={isFocusMode ? 22 : 18}
              className="text-secondary-foreground"
            />
          </span>
          <span
            className={`text-sm font-semibold tracking-wider text-foreground uppercase ${
              isFocusMode ? "text-base" : ""
            }`}
          >
            Tasks
          </span>
        </div>
        <span
          className={`text-xs text-muted-foreground font-mono ${
            isFocusMode ? "text-sm" : ""
          }`}
          aria-live="polite"
        >
          {tasks.filter((t) => !t.completed).length} Pending
        </span>
      </div>

      {/* Task List */}
      <ul className="grow overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        {tasks.length === 0 ? (
          <li className="h-full flex flex-col items-center justify-center text-muted-foreground text-center py-8">
            <ListTodo
              size={isFocusMode ? 40 : 32}
              className="mb-2 opacity-50"
            />
            <p className={isFocusMode ? "text-base" : "text-sm"}>
              No tasks yet.
            </p>
            <p className={`mt-1 ${isFocusMode ? "text-sm" : "text-xs"}`}>
              Add a task to get started.
            </p>
          </li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={`group flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                task.completed
                  ? "bg-muted border-transparent"
                  : "bg-card border-border hover:border-primary/30"
              } ${isFocusMode ? "p-4" : ""}`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? "bg-green-500 border-green-500"
                    : "border-muted-foreground hover:border-primary"
                } ${isFocusMode ? "w-6 h-6" : ""}`}
              >
                {task.completed && (
                  <Check size={isFocusMode ? 14 : 12} className="text-white" />
                )}
              </button>

              <span
                className={`grow text-sm ${
                  task.completed
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                } ${isFocusMode ? "text-base" : ""}`}
              >
                {task.text}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
              >
                <Trash2 size={isFocusMode ? 18 : 16} />
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Input and Buttons */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask(newTask)}
            placeholder="Add a new task..."
            className={`grow bg-secondary text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground ${
              isFocusMode ? "px-5 py-4 text-base" : ""
            }`}
          />
          <button
            onClick={() => addTask(newTask)}
            disabled={!newTask.trim()}
            className={`p-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all disabled:opacity-50 ${
              isFocusMode ? "p-4" : ""
            }`}
          >
            <Plus size={isFocusMode ? 22 : 20} />
          </button>
        </div>

        {tasks.length > 0 && (
          <div className="flex gap-2 justify-end">
            <button
              onClick={markAllComplete}
              className={`flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-xs ${
                isFocusMode ? "px-4 py-2.5 text-sm" : ""
              }`}
            >
              <Check size={isFocusMode ? 16 : 14} /> All Done
            </button>
            <button
              onClick={deleteAll}
              className={`flex items-center gap-1 px-3 py-2 bg-destructive text-white rounded-xl hover:opacity-90 transition-colors text-xs ${
                isFocusMode ? "px-4 py-2.5 text-sm" : ""
              }`}
            >
              <Trash2 size={isFocusMode ? 16 : 14} /> Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
