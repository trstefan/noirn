"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Trash2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Reminder {
  id: number;
  text: string;
}

interface RemindersProps {
  user: User;
}

export default function Reminders({ user }: RemindersProps) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [input, setInput] = useState("");

  const addReminder = () => {
    if (!input.trim()) return;
    setReminders([...reminders, { id: Date.now(), text: input }]);
    setInput("");
  };

  const deleteReminder = (id: number) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <motion.div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New Reminder"
          className="flex-1 px-3 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={addReminder}
          className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 max-h-60 overflow-y-auto">
        <AnimatePresence>
          {reminders.map((reminder) => (
            <motion.li
              key={reminder.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-between items-center bg-white/10 p-2 rounded-xl"
            >
              <div className="flex items-center gap-2 text-white">
                <Bell size={18} />
                {reminder.text}
              </div>
              <button onClick={() => deleteReminder(reminder.id)}>
                <Trash2
                  size={18}
                  className="text-red-400 hover:text-red-600 transition"
                />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}
