import dotenv from "dotenv";
// import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SupabaseClient } from "@supabase/supabase-js";
dotenv.config();

const url = process.env.SUPABASE_URL || "";
const key = process.env.SUPABASE_KEY || "";

console.log(url);

if (!url) throw new Error("Invalid supabase URL");
if (!key) throw new Error("Invalid supabase KEY");

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {}
      },
    },
  });
}

export const auth = {
  async signup(email: string, password: string, supabase: SupabaseClient) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    return { data, error };
  },

  async login(email: string, password: string, supabase: SupabaseClient) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  },

  async getUser(supabase: SupabaseClient) {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },

  async logout(supabase: SupabaseClient) {
    const { error } = await supabase.auth.signOut();
    return error;
  },
};
