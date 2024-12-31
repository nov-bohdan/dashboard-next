"use server";

import { auth, createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { db } from "./data";

export async function signup(
  prevState: unknown,
  formData: FormData
): Promise<{ error?: string; message?: string }> {
  const supabase = await createClient();
  const firstname = formData.get("firstname")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!firstname) return { error: "Empty first name" };
  if (!email || !password) return { error: "Empty email or password" };

  const { data, error } = await auth.signup(email, password, supabase);
  console.log(data);
  console.log(error);

  if (error) return { error: error.message };

  const user_id = data?.user?.id;
  await db.createNewUserSettingsRow(user_id, firstname);

  redirect("/dashboard");
}

export async function login(prevState: unknown, formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) return { error: "Empty email or password" };

  const { error } = await auth.login(email, password, supabase);

  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await auth.logout(supabase);

  redirect("/login");
}
