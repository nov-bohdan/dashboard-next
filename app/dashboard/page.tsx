import { db, userData } from "@/app/lib/data";
import { DbResponse, TaskType } from "@/app/lib/types";
import Dashboard from "../ui/Dashboard";

export default async function Page() {
  const user = await userData.getUser();
  let user_id = "0";
  if (user?.settings?.user_id) user_id = user.settings.user_id;
  const response: Promise<DbResponse<TaskType>> = db.getAllTasks(user_id);
  return <Dashboard responsePromise={response} />;
}
