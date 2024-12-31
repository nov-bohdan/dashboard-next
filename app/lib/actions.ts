"use server";

import { db, userData } from "@/app/lib/data";
import {
  DbDeleteResponse,
  DbResponse,
  TaskType,
  UserSettings,
} from "@/app/lib/types";
import { revalidatePath } from "next/cache";

export async function createNewTask(
  prevState: unknown,
  formData: FormData
): Promise<{ error?: string; message?: string }> {
  const user = await userData.getUser();
  if (user?.error) return { error: user.error };
  if (!user?.settings?.user_id) return { error: "No user id" };

  const title = formData.get("title")?.toString();
  if (!title) {
    return { error: "Please enter title" };
  }
  const task: TaskType = {
    title,
  };
  const response: DbResponse<TaskType> = await db.newTask(
    task,
    user.settings.user_id
  );
  console.log(response.data);
  if (response.data) {
    revalidatePath("/");
    return { message: "Task created" };
  }
  return { error: "Unknown error" };
}

export async function deleteTask(
  prevState: unknown,
  id: string | number
): Promise<{ error?: string; message?: string }> {
  id = String(id);
  if (!id) {
    return { error: "Empty Task ID" };
  }
  const response: DbDeleteResponse = await db.deleteTask(id);

  if (response.status === 204) {
    revalidatePath("/");
    return { message: "Task deleted" };
  }

  return { error: "Unknown error" };
}

export async function updateTaskStatus(
  prevState: unknown,
  { id, is_completed }: { id: string | number; is_completed: boolean }
) {
  id = String(id);
  if (!id) {
    return { error: "Empty Task ID" };
  }
  const response: DbResponse<TaskType> = await db.updateTaskStatus(
    id,
    is_completed
  );
  if (response.data) {
    revalidatePath("/");
    return { message: "Task status updated" };
  }
  return { error: "Unknown error" };
}

export async function updateTaskTitle(
  id: string | number,
  prevState: unknown,
  formData: FormData
) {
  const title = formData.get("title")?.toString();
  id = String(id);
  if (!id) {
    return { error: "Empty Task ID" };
  }
  if (!title) {
    return { error: "Empty title" };
  }
  const response: DbResponse<TaskType> = await db.updateTaskTitle(id, title);
  if (response.data) {
    revalidatePath("/");
    return { message: "Task title updated" };
  }
  return { error: "Unknown error" };
}

// Profile settings
export async function updateUserName(prevState: unknown, formData: FormData) {
  const user = await userData.getUser();
  if (!user?.settings) return { error: "Invalid user" };

  const newFirstName = formData.get("firstname")?.toString();
  if (!newFirstName) return { error: "Empty first name" };

  const response: DbResponse<UserSettings> = await db.updateUserFirstName(
    user.settings.user_id,
    newFirstName
  );

  if (response.data) {
    revalidatePath("/");
    return { message: "First name updated" };
  }

  return { error: "Unknown error" };
}
