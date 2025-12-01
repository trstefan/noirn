import { createBrowserClient } from "@/lib/browser";

const supabase = createBrowserClient();

export const getAllTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const addTask = async (userId: string, text: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ user_id: userId, text })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const toggleTask = async (id: string, completed: boolean) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteTask = async (id: string) => {
  await supabase.from("tasks").delete().eq("id", id);
};

// Get tasks completed today
export async function getTodayCompletedTasksOnly(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("completed", true)
    .gte("completed_at", today.toISOString())
    .lt("completed_at", tomorrow.toISOString())
    .order("completed_at", { ascending: false });

  if (error) {
    console.error("Error fetching today's completed tasks:", error);
    return [];
  }

  return data ?? [];
}
