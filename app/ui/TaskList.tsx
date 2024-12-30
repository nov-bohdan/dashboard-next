import { DbResponse, TaskType } from "@/app/lib/types";
import Task from "./Task";
import { use } from "react";

export default function TaskList({
  responsePromise,
}: {
  responsePromise: Promise<DbResponse<TaskType>>;
}) {
  const response = use(responsePromise);
  return (
    <>
      {response.error?.message}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {response.data?.map((task: TaskType) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>
    </>
  );
}
