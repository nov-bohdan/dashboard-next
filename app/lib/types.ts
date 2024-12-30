import { PostgrestError } from "@supabase/postgrest-js";

export type TaskType = {
  id?: number;
  title: string;
  is_completed?: boolean;
};

export type DbResponse<Type> = {
  data: Type[] | null;
  error: PostgrestError | null;
};

export type DbDeleteResponse = {
  status: number;
  statusText: string;
};

export type State = {
  error?: string;
  message?: string;
};
