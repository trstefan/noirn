export interface JournalEntry {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  mood: string;
  moodColor: string;
  activity: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category?: "work" | "study" | "personal";
}

export enum PomodoroMode {
  FOCUS = "FOCUS",
  SHORT_BREAK = "SHORT_BREAK",
  LONG_BREAK = "LONG_BREAK",
}

export interface AmbientSound {
  id: string;
  name: string;
  icon: string;
  active: boolean;
}

export interface AmbientSound {
  id: string;
  name: string;
  icon: string;
  active: boolean;
}

export interface Task {
  id: string;
  user_id: string;
  text: string;
  completed: boolean;
  created_at: string;
  completed_at: string | null;
}

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Session {
  id: string | undefined;
  isActive: boolean;
  sessionname: string; // <-- matches DB
  goal: string; // <-- matches DB
  starttime: number | null; // store timestamp locally as ms
  timespent: number; // <-- matches DB
  subtasks: Subtask[];
}

export interface SavedSession {
  id: string;
  sessionname: string;
  goal: string;
  timespent: number;
  created_at: string;
}
