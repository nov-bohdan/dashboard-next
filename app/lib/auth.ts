import { auth, createClient } from "@/utils/supabase/server";

export async function isAuthorized() {
  const supabase = await createClient();
  const { data } = await auth.getUser(supabase);
  return data?.user;
}
