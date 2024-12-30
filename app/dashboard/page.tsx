import { db } from "@/app/lib/data";
import { DbResponse, TaskType } from "@/app/lib/types";
import Dashboard from "../ui/Dashboard";

export default async function Page() {
  const response: Promise<DbResponse<TaskType>> = db.getAllTasks();
  return <Dashboard responsePromise={response} />;
}
