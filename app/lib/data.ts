import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { DbDeleteResponse, DbResponse, TaskType } from "./types";
dotenv.config();

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

const url = process.env.SUPABASE_URL || "";
const key = process.env.SUPABASE_KEY || "";

console.log(url);

if (!url) throw new Error("Invalid supabase URL");
if (!key) throw new Error("Invalid supabase KEY");

const supabase = createClient(url, key);

export const db = {
  async getAllTasks() {
    // await sleep(1000);
    const response: DbResponse<TaskType> = await supabase
      .from("tasks")
      .select()
      .order("id", { ascending: false });

    return response;
  },

  async newTask(task: TaskType) {
    const response: DbResponse<TaskType> = await supabase
      .from("tasks")
      .insert({ title: task.title })
      .select();
    return response;
  },

  async deleteTask(id: string) {
    const response: DbDeleteResponse = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);
    return response;
  },

  async updateTaskStatus(id: string, is_completed: boolean) {
    const response: DbResponse<TaskType> = await supabase
      .from("tasks")
      .update({ is_completed })
      .eq("id", id)
      .select();
    return response;
  },

  async updateTaskTitle(id: string, title: string) {
    const response: DbResponse<TaskType> = await supabase
      .from("tasks")
      .update({ title })
      .eq("id", id)
      .select();
    return response;
  },
};
