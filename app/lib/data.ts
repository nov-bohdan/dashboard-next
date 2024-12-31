import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import {
  auth,
  createClient as createSupabaseClient,
} from "@/utils/supabase/server";
import { DbDeleteResponse, DbResponse, TaskType, UserSettings } from "./types";
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
  async getAllTasks(user_id: string) {
    const response: DbResponse<TaskType> = await supabase
      .from("tasks")
      .select()
      .filter("user_id", "eq", user_id)
      .order("id", { ascending: false });

    return response;
  },

  async newTask(task: TaskType, user_id: string) {
    const response: DbResponse<TaskType> = await supabase
      .from("tasks")
      .insert({ title: task.title, user_id })
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

  async createNewUserSettingsRow(
    user_id: string | undefined,
    first_name: string
  ) {
    const response: DbResponse<UserSettings> = await supabase
      .from("user_settings")
      .insert({
        user_id,
        first_name,
      });
    return response;
  },

  async getUserSettings(user_id: string) {
    const response: DbResponse<UserSettings> = await supabase
      .from("user_settings")
      .select()
      .eq("user_id", user_id);
    return response;
  },

  async updateUserFirstName(user_id: string, first_name: string) {
    const response: DbResponse<UserSettings> = await supabase
      .from("user_settings")
      .update({ first_name: first_name })
      .eq("user_id", user_id)
      .select();
    return response;
  },
};

export const userData = {
  async getUser() {
    const supabase = await createSupabaseClient();
    const { data, error } = await auth.getUser(supabase);
    if (error) return;
    if (!data.user) return { error: "Invalid data" };
    const response = await db.getUserSettings(data.user.id);
    if (response.error) return { error: response.error.message };
    if (!response.data) return { error: "Unknown error" };
    if (response.data.length === 0) return { error: "Settings not found" };
    const settings = response.data[0];
    return { data: data.user, settings };
  },
};
